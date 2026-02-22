import { type NextRequest } from 'next/server'
import {
  assertAllowedOrigin,
  assertFeatureEnabled,
  handleRouteError,
  jsonResponse,
} from '@/lib/profile/api-helpers'
import { clearSessionCookie } from '@/lib/profile/session'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    assertFeatureEnabled()
    assertAllowedOrigin(request)

    const response = jsonResponse({ loggedOut: true })
    clearSessionCookie(response)
    return response
  } catch (error) {
    return handleRouteError(error)
  }
}
