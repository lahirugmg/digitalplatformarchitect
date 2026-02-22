import {
  createCipheriv,
  createDecipheriv,
  createHash,
  hkdfSync,
  randomBytes,
} from 'node:crypto'
import {
  PROFILE_ENCRYPTION_INFO,
  RECOVERY_KEY_PREFIX,
  RECOVERY_KEY_REGEX,
} from '@/lib/profile/constants'

const BASE32_ALPHABET = 'abcdefghijklmnopqrstuvwxyz234567'
const AES_GCM_IV_LENGTH = 12
const AES_GCM_TAG_LENGTH = 16

export interface EncryptedJsonPayload {
  v: number
  iv: string
  tag: string
  data: string
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
  const padding = normalized.length % 4
  const padded = padding === 0 ? normalized : normalized + '='.repeat(4 - padding)
  return Buffer.from(padded, 'base64')
}

function base32Encode(input: Buffer): string {
  let bits = 0
  let value = 0
  let output = ''

  for (const byte of input) {
    value = (value << 8) | byte
    bits += 8

    while (bits >= 5) {
      output += BASE32_ALPHABET[(value >>> (bits - 5)) & 31]
      bits -= 5
    }
  }

  if (bits > 0) {
    output += BASE32_ALPHABET[(value << (5 - bits)) & 31]
  }

  return output
}

function readBase64Secret(name: string): Buffer {
  const value = process.env[name]
  if (!value) {
    throw new Error(`${name} is required`)
  }

  let decoded: Buffer
  try {
    decoded = Buffer.from(value, 'base64')
  } catch {
    throw new Error(`${name} must be base64 encoded`) // pragma: no cover
  }

  if (decoded.length !== 32) {
    throw new Error(`${name} must decode to 32 bytes`)
  }

  return decoded
}

export function generateRecoveryKey(): string {
  const entropy = randomBytes(24)
  return `${RECOVERY_KEY_PREFIX}${base32Encode(entropy)}`
}

export function isValidRecoveryKeyFormat(recoveryKey: string): boolean {
  return RECOVERY_KEY_REGEX.test(recoveryKey)
}

export function deriveProfileId(recoveryKey: string): string {
  const digest = createHash('sha256').update(recoveryKey, 'utf8').digest()
  return toBase64Url(digest)
}

export function deriveProfileEncryptionKey(recoveryKey: string): Buffer {
  const secret = readBase64Secret('STEMIZED_ENCRYPTION_SECRET')
  const key = hkdfSync(
    'sha256',
    secret,
    Buffer.from(recoveryKey, 'utf8'),
    Buffer.from(PROFILE_ENCRYPTION_INFO, 'utf8'),
    32,
  )

  return Buffer.from(key)
}

export function encryptJson(value: unknown, key: Buffer): EncryptedJsonPayload {
  const iv = randomBytes(AES_GCM_IV_LENGTH)
  const cipher = createCipheriv('aes-256-gcm', key, iv)
  const plaintext = Buffer.from(JSON.stringify(value), 'utf8')
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()])
  const tag = cipher.getAuthTag()

  return {
    v: 1,
    iv: toBase64Url(iv),
    tag: toBase64Url(tag),
    data: toBase64Url(ciphertext),
  }
}

export function decryptJson<T>(payload: EncryptedJsonPayload, key: Buffer): T {
  if (!payload || payload.v !== 1) {
    throw new Error('Unsupported payload version')
  }

  const iv = fromBase64Url(payload.iv)
  const tag = fromBase64Url(payload.tag)
  const ciphertext = fromBase64Url(payload.data)

  const decipher = createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(tag)

  const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()])
  return JSON.parse(plaintext.toString('utf8')) as T
}

export function encryptBytes(plaintext: Uint8Array, key: Buffer): Buffer {
  const iv = randomBytes(AES_GCM_IV_LENGTH)
  const cipher = createCipheriv('aes-256-gcm', key, iv)
  const ciphertext = Buffer.concat([cipher.update(Buffer.from(plaintext)), cipher.final()])
  const tag = cipher.getAuthTag()

  return Buffer.concat([iv, tag, ciphertext])
}

export function decryptBytes(payload: Uint8Array, key: Buffer): Buffer {
  const buffer = Buffer.from(payload)

  if (buffer.length <= AES_GCM_IV_LENGTH + AES_GCM_TAG_LENGTH) {
    throw new Error('Encrypted payload is too small')
  }

  const iv = buffer.subarray(0, AES_GCM_IV_LENGTH)
  const tag = buffer.subarray(AES_GCM_IV_LENGTH, AES_GCM_IV_LENGTH + AES_GCM_TAG_LENGTH)
  const ciphertext = buffer.subarray(AES_GCM_IV_LENGTH + AES_GCM_TAG_LENGTH)

  const decipher = createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(tag)

  return Buffer.concat([decipher.update(ciphertext), decipher.final()])
}

export function sha256Base64Url(payload: Uint8Array): string {
  const digest = createHash('sha256').update(payload).digest()
  return toBase64Url(digest)
}
