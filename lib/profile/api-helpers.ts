import { type NextRequest, NextResponse } from 'next/server'
import { PROFILE_FEATURE_ENABLED } from '@/lib/profile/constants'
import { readSessionFromRequest, type SessionPayload } from '@/lib/profile/session'

export class ProfileApiError extends Error {
  status: number
  code: string

  constructor(status: number, code: string, message: string) {
    super(message)
    this.status = status
    this.code = code
  }
}

export function featureDisabledResponse(): NextResponse {
  return NextResponse.json(
    {
      error: {
        code: 'FEATURE_DISABLED',
        message: 'Anonymous profile feature is disabled',
      },
    },
    { status: 404 },
  )
}

export function assertFeatureEnabled(): void {
  if (!PROFILE_FEATURE_ENABLED) {
    throw new ProfileApiError(404, 'FEATURE_DISABLED', 'Anonymous profile feature is disabled')
  }
}

export function jsonError(status: number, code: string, message: string): NextResponse {
  return NextResponse.json(
    {
      error: {
        code,
        message,
      },
    },
    { status },
  )
}

export function jsonResponse<T>(data: T, status = 200): NextResponse {
  return NextResponse.json(data, { status })
}

export function getRequestOrigin(request: NextRequest): string | null {
  return request.headers.get('origin')
}

export function assertAllowedOrigin(request: NextRequest): void {
  const origin = getRequestOrigin(request)
  if (!origin) {
    return
  }

  const expected = request.nextUrl.origin
  if (origin !== expected) {
    throw new ProfileApiError(401, 'ORIGIN_MISMATCH', 'Origin is not allowed')
  }
}

export function requireSession(request: NextRequest): SessionPayload {
  const session = readSessionFromRequest(request)
  if (!session) {
    throw new ProfileApiError(401, 'UNAUTHORIZED', 'Missing or invalid session')
  }

  return session
}

export async function parseJsonBody<T>(request: NextRequest): Promise<T> {
  try {
    return (await request.json()) as T
  } catch {
    throw new ProfileApiError(400, 'INVALID_JSON', 'Invalid JSON payload')
  }
}

export function handleRouteError(error: unknown): NextResponse {
  if (error instanceof ProfileApiError) {
    return jsonError(error.status, error.code, error.message)
  }

  return jsonError(500, 'INTERNAL_ERROR', 'Unexpected server error')
}
