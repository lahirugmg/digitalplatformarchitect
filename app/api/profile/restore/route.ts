import { type NextRequest } from 'next/server'
import {
  assertAllowedOrigin,
  assertFeatureEnabled,
  handleRouteError,
  jsonError,
  jsonResponse,
  ProfileApiError,
} from '@/lib/profile/api-helpers'
import {
  deriveProfileId,
  isValidRecoveryKeyFormat,
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
  clearSessionCookie,
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

type RestoreBody = {
  recoveryKey?: string
  localState?: unknown
}

async function parseRestoreBody(request: NextRequest): Promise<RestoreBody> {
  try {
    return (await request.json()) as RestoreBody
  } catch {
    throw new ProfileApiError(400, 'INVALID_JSON', 'Invalid JSON payload')
  }
}

function toAccess(recoveryKey: string): ProfileAccess {
  return {
    profileId: deriveProfileId(recoveryKey),
    recoveryKey,
  }
}

async function mergeAndPersistState(
  access: ProfileAccess,
  localState: ProfileState | null,
): Promise<ProfileState> {
  const serverState = await readProfileState(access)

  if (!serverState) {
    throw new ProfileApiError(401, 'INVALID_RECOVERY_KEY', 'Recovery key is invalid')
  }

  const mergedState = mergeProfileState(serverState, localState)
  await writeProfileState(access, mergedState)

  return mergedState
}

export async function POST(request: NextRequest) {
  const rateLimit = checkRateLimit(request, 'profile-restore', {
    maxAttempts: 10,
    windowMs: 5 * 60 * 1000,
    blockMs: 90 * 1000,
  })

  if (!rateLimit.allowed) {
    return jsonError(429, 'RATE_LIMITED', 'Too many restore attempts. Try again soon.')
  }

  try {
    assertFeatureEnabled()
    assertAllowedOrigin(request)

    const body = await parseRestoreBody(request)
    const recoveryKey = body.recoveryKey?.trim()

    if (!recoveryKey || !isValidRecoveryKeyFormat(recoveryKey)) {
      throw new ProfileApiError(400, 'INVALID_RECOVERY_KEY_FORMAT', 'Recovery key format is invalid')
    }

    const access = toAccess(recoveryKey)
    const localState = normalizeIncomingProfileState(body.localState)
    const state = await mergeAndPersistState(access, localState)

    const response = jsonResponse({
      restored: true,
      hint: profileHintFromProfileId(access.profileId),
      state,
    })

    setSessionCookie(response, buildSessionPayload(access.profileId, recoveryKey))
    registerRateLimitSuccess(rateLimit.key)

    return response
  } catch (error) {
    registerRateLimitFailure(rateLimit.key, {
      maxAttempts: 10,
      windowMs: 5 * 60 * 1000,
      blockMs: 90 * 1000,
    })

    const response = handleRouteError(error)

    if (
      error instanceof ProfileApiError &&
      (error.code === 'INVALID_RECOVERY_KEY' || error.code === 'INVALID_RECOVERY_KEY_FORMAT')
    ) {
      clearSessionCookie(response)
    }

    return response
  }
}
