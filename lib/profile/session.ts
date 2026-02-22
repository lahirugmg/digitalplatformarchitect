import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto'
import { type NextRequest, NextResponse } from 'next/server'
import {
  SESSION_COOKIE_NAME,
  SESSION_ENCRYPTION_INFO,
  SESSION_MAX_AGE_SECONDS,
} from '@/lib/profile/constants'

const SESSION_IV_LENGTH = 12
const SESSION_TAG_LENGTH = 16

type SessionVersion = 1

export interface SessionPayload {
  v: SessionVersion
  profileId: string
  recoveryKey: string
  issuedAt: number
  expiresAt: number
}

function toBase64Url(input: Buffer): string {
  return input
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

function fromBase64Url(input: string): Buffer {
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/')
  const padLen = normalized.length % 4
  const padded = padLen === 0 ? normalized : normalized + '='.repeat(4 - padLen)
  return Buffer.from(padded, 'base64')
}

function getSessionSecret(): Buffer {
  const secret = process.env.STEMIZED_SESSION_SECRET
  if (!secret) {
    throw new Error('STEMIZED_SESSION_SECRET is required')
  }

  const decoded = Buffer.from(secret, 'base64')
  if (decoded.length !== 32) {
    throw new Error('STEMIZED_SESSION_SECRET must decode to 32 bytes')
  }

  return decoded
}

function getSessionAad(): Buffer {
  return Buffer.from(SESSION_ENCRYPTION_INFO, 'utf8')
}

export function buildSessionPayload(profileId: string, recoveryKey: string): SessionPayload {
  const issuedAt = Date.now()

  return {
    v: 1,
    profileId,
    recoveryKey,
    issuedAt,
    expiresAt: issuedAt + SESSION_MAX_AGE_SECONDS * 1000,
  }
}

export function sealSession(payload: SessionPayload): string {
  const secret = getSessionSecret()
  const iv = randomBytes(SESSION_IV_LENGTH)
  const cipher = createCipheriv('aes-256-gcm', secret, iv)
  cipher.setAAD(getSessionAad())

  const plaintext = Buffer.from(JSON.stringify(payload), 'utf8')
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()])
  const tag = cipher.getAuthTag()

  return toBase64Url(Buffer.concat([iv, tag, ciphertext]))
}

export function unsealSession(token: string): SessionPayload | null {
  try {
    const secret = getSessionSecret()
    const raw = fromBase64Url(token)

    if (raw.length <= SESSION_IV_LENGTH + SESSION_TAG_LENGTH) {
      return null
    }

    const iv = raw.subarray(0, SESSION_IV_LENGTH)
    const tag = raw.subarray(SESSION_IV_LENGTH, SESSION_IV_LENGTH + SESSION_TAG_LENGTH)
    const ciphertext = raw.subarray(SESSION_IV_LENGTH + SESSION_TAG_LENGTH)

    const decipher = createDecipheriv('aes-256-gcm', secret, iv)
    decipher.setAAD(getSessionAad())
    decipher.setAuthTag(tag)

    const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()])
    const payload = JSON.parse(plaintext.toString('utf8')) as SessionPayload

    if (
      payload.v !== 1 ||
      typeof payload.profileId !== 'string' ||
      typeof payload.recoveryKey !== 'string' ||
      typeof payload.issuedAt !== 'number' ||
      typeof payload.expiresAt !== 'number'
    ) {
      return null
    }

    if (payload.expiresAt <= Date.now()) {
      return null
    }

    return payload
  } catch {
    return null
  }
}

export function setSessionCookie(response: NextResponse, payload: SessionPayload): void {
  const sealed = sealSession(payload)

  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: sealed,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  })
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
    expires: new Date(0),
  })
}

export function readSessionFromRequest(request: NextRequest): SessionPayload | null {
  const cookie = request.cookies.get(SESSION_COOKIE_NAME)?.value
  if (!cookie) {
    return null
  }

  return unsealSession(cookie)
}
