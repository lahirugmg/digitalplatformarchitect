import { type NextRequest } from 'next/server'
import {
  assertAllowedOrigin,
  assertFeatureEnabled,
  handleRouteError,
  jsonError,
  jsonResponse,
  parseJsonBody,
  ProfileApiError,
  requireSession,
} from '@/lib/profile/api-helpers'
import {
  mergeProfileState,
  normalizeIncomingProfileState,
} from '@/lib/profile/merge'
import { profileHintFromProfileId } from '@/lib/profile/types'
import {
  clearSessionCookie,
} from '@/lib/profile/session'
import {
  deleteProfileStateAndFiles,
  readProfileState,
  writeProfileState,
} from '@/lib/profile/profile-store'
import {
  checkRateLimit,
  registerRateLimitFailure,
  registerRateLimitSuccess,
} from '@/lib/profile/rate-limit'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    assertFeatureEnabled()
    const session = requireSession(request)

    const state = await readProfileState(session)
    if (!state) {
      throw new ProfileApiError(404, 'PROFILE_NOT_FOUND', 'Profile state not found')
    }

    return jsonResponse({
      hint: profileHintFromProfileId(session.profileId),
      state,
    })
  } catch (error) {
    return handleRouteError(error)
  }
}

export async function PUT(request: NextRequest) {
  const rateLimit = checkRateLimit(request, 'profile-state-put', {
    maxAttempts: 30,
    windowMs: 5 * 60 * 1000,
    blockMs: 45 * 1000,
  })

  if (!rateLimit.allowed) {
    return jsonError(429, 'RATE_LIMITED', 'Too many profile updates. Try again soon.')
  }

  try {
    assertFeatureEnabled()
    assertAllowedOrigin(request)

    const session = requireSession(request)
    const body = await parseJsonBody<{ state?: unknown }>(request)

    const incomingState = normalizeIncomingProfileState(body.state)
    if (!incomingState) {
      throw new ProfileApiError(400, 'INVALID_STATE', 'State payload is required')
    }

    const serverState = await readProfileState(session)
    const mergedState = mergeProfileState(serverState, incomingState)

    await writeProfileState(session, mergedState)
    registerRateLimitSuccess(rateLimit.key)

    return jsonResponse({
      state: mergedState,
      hint: profileHintFromProfileId(session.profileId),
    })
  } catch (error) {
    registerRateLimitFailure(rateLimit.key, {
      maxAttempts: 30,
      windowMs: 5 * 60 * 1000,
      blockMs: 45 * 1000,
    })
    return handleRouteError(error)
  }
}

export async function DELETE(request: NextRequest) {
  const rateLimit = checkRateLimit(request, 'profile-state-delete', {
    maxAttempts: 10,
    windowMs: 10 * 60 * 1000,
    blockMs: 90 * 1000,
  })

  if (!rateLimit.allowed) {
    return jsonError(429, 'RATE_LIMITED', 'Too many delete requests. Try again soon.')
  }

  try {
    assertFeatureEnabled()
    assertAllowedOrigin(request)

    const session = requireSession(request)
    const existingState = await readProfileState(session)

    await deleteProfileStateAndFiles(session, existingState)

    const response = jsonResponse({
      deleted: true,
    })

    clearSessionCookie(response)
    registerRateLimitSuccess(rateLimit.key)

    return response
  } catch (error) {
    registerRateLimitFailure(rateLimit.key, {
      maxAttempts: 10,
      windowMs: 10 * 60 * 1000,
      blockMs: 90 * 1000,
    })
    return handleRouteError(error)
  }
}
