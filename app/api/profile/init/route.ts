import { type NextRequest } from 'next/server'
import {
  assertAllowedOrigin,
  assertFeatureEnabled,
  handleRouteError,
  jsonError,
  jsonResponse,
  requireSession,
} from '@/lib/profile/api-helpers'
import {
  deriveProfileId,
  generateRecoveryKey,
} from '@/lib/profile/crypto'
import {
  mergeProfileState,
  normalizeIncomingProfileState,
} from '@/lib/profile/merge'
import {
  profileHintFromProfileId,
  type ProfileState,
} from '@/lib/profile/types'
import {
  buildSessionPayload,
  readSessionFromRequest,
  setSessionCookie,
} from '@/lib/profile/session'
import {
  readProfileState,
  writeProfileState,
  type ProfileAccess,
} from '@/lib/profile/profile-store'
import {
  checkRateLimit,
  registerRateLimitFailure,
  registerRateLimitSuccess,
} from '@/lib/profile/rate-limit'

export const runtime = 'nodejs'

type InitBody = {
  localState?: unknown
}

async function parseInitBody(request: NextRequest): Promise<InitBody> {
  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.includes('application/json')) {
    return {}
  }

  try {
    return (await request.json()) as InitBody
  } catch {
    return {}
  }
}

function toAccess(profileId: string, recoveryKey: string): ProfileAccess {
  return {
    profileId,
    recoveryKey,
  }
}

async function mergeAndPersistState(
  access: ProfileAccess,
  localState: ProfileState | null,
): Promise<ProfileState> {
  const serverState = await readProfileState(access)
  const mergedState = mergeProfileState(serverState, localState)
  await writeProfileState(access, mergedState)
  return mergedState
}

export async function POST(request: NextRequest) {
  const rateLimit = checkRateLimit(request, 'profile-init', {
    maxAttempts: 20,
    windowMs: 5 * 60 * 1000,
    blockMs: 30 * 1000,
  })

  if (!rateLimit.allowed) {
    return jsonError(429, 'RATE_LIMITED', 'Too many requests. Try again soon.')
  }

  try {
    assertFeatureEnabled()
    assertAllowedOrigin(request)

    const body = await parseInitBody(request)
    const normalizedLocalState = normalizeIncomingProfileState(body.localState)

    const existingSession = readSessionFromRequest(request)
    if (existingSession) {
      const access = requireSession(request)
      const state = await mergeAndPersistState(access, normalizedLocalState)

      registerRateLimitSuccess(rateLimit.key)
      return jsonResponse({
        created: false,
        hint: profileHintFromProfileId(access.profileId),
        state,
      })
    }

    const recoveryKey = generateRecoveryKey()
    const profileId = deriveProfileId(recoveryKey)
    const access = toAccess(profileId, recoveryKey)

    const state = await mergeAndPersistState(access, normalizedLocalState)

    const response = jsonResponse({
      created: true,
      recoveryKey,
      hint: profileHintFromProfileId(profileId),
      state,
    })

    setSessionCookie(response, buildSessionPayload(profileId, recoveryKey))
    registerRateLimitSuccess(rateLimit.key)

    return response
  } catch (error) {
    registerRateLimitFailure(rateLimit.key, {
      maxAttempts: 20,
      windowMs: 5 * 60 * 1000,
      blockMs: 30 * 1000,
    })
    return handleRouteError(error)
  }
}
