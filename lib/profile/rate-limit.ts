import type { NextRequest } from 'next/server'

interface RateLimitEntry {
  attempts: number
  firstAttemptAt: number
  blockedUntil: number
}

interface RateLimitOptions {
  maxAttempts: number
  windowMs: number
  blockMs: number
}

const DEFAULT_OPTIONS: RateLimitOptions = {
  maxAttempts: 8,
  windowMs: 5 * 60 * 1000,
  blockMs: 60 * 1000,
}

const entries = new Map<string, RateLimitEntry>()

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  return request.headers.get('x-real-ip') ?? 'unknown'
}

function getRateLimitKey(request: NextRequest, scope: string): string {
  return `${scope}:${getClientIp(request)}`
}

export function checkRateLimit(
  request: NextRequest,
  scope: string,
  options?: Partial<RateLimitOptions>,
): { allowed: boolean; retryAfterSeconds?: number; key: string } {
  const merged: RateLimitOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
  }

  const key = getRateLimitKey(request, scope)
  const now = Date.now()
  const current = entries.get(key)

  if (!current) {
    entries.set(key, {
      attempts: 0,
      firstAttemptAt: now,
      blockedUntil: 0,
    })
    return { allowed: true, key }
  }

  if (current.blockedUntil > now) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((current.blockedUntil - now) / 1000),
      key,
    }
  }

  if (now - current.firstAttemptAt > merged.windowMs) {
    entries.set(key, {
      attempts: 0,
      firstAttemptAt: now,
      blockedUntil: 0,
    })
  }

  return { allowed: true, key }
}

export function registerRateLimitFailure(
  key: string,
  options?: Partial<RateLimitOptions>,
): void {
  const merged: RateLimitOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
  }

  const now = Date.now()
  const current = entries.get(key) ?? {
    attempts: 0,
    firstAttemptAt: now,
    blockedUntil: 0,
  }

  const withinWindow = now - current.firstAttemptAt <= merged.windowMs
  const attempts = withinWindow ? current.attempts + 1 : 1

  const next: RateLimitEntry = {
    attempts,
    firstAttemptAt: withinWindow ? current.firstAttemptAt : now,
    blockedUntil: attempts >= merged.maxAttempts ? now + merged.blockMs : 0,
  }

  entries.set(key, next)
}

export function registerRateLimitSuccess(key: string): void {
  entries.delete(key)
}
