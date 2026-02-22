import { randomBytes } from 'node:crypto'
import {
  ALLOWED_FILE_MIME_TYPES,
  MAX_FILE_SIZE_BYTES,
} from '@/lib/profile/constants'
import { ProfileApiError } from '@/lib/profile/api-helpers'

const SAFE_FILENAME_CHARS = /[^a-zA-Z0-9._ -]/g

export function sanitizeFilename(name: string): string {
  const trimmed = name.trim().replace(/[/\\]+/g, '-')
  const sanitized = trimmed.replace(SAFE_FILENAME_CHARS, '_')
  const bounded = sanitized.slice(0, 120)
  return bounded || 'file'
}

export function assertAllowedMimeType(mimeType: string): void {
  if (!ALLOWED_FILE_MIME_TYPES.has(mimeType)) {
    throw new ProfileApiError(415, 'UNSUPPORTED_FILE_TYPE', 'File type is not supported')
  }
}

export function assertAllowedFileSize(size: number): void {
  if (size > MAX_FILE_SIZE_BYTES) {
    throw new ProfileApiError(413, 'FILE_TOO_LARGE', 'File exceeds 10MB limit')
  }
}

export function createFileId(): string {
  return randomBytes(12).toString('hex')
}
