export const SESSION_COOKIE_NAME = 'stemized_sid'
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30

export const PROFILE_CACHE_KEY = 'stemized_profile_cache_v1'
export const PROFILE_HINT_KEY = 'stemized_profile_hint_v1'

export const LEGACY_PROGRESS_KEY = 'dpa-user-progress'
export const LEGACY_ONBOARDING_KEY = 'onboarding-storage'

export const PROFILE_STATE_VERSION = 1
export const PROFILE_STATE_FILENAME = 'state.enc.json'

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024

export const RECOVERY_KEY_PREFIX = 'stz_1_'
export const RECOVERY_KEY_REGEX = /^stz_1_[a-z2-7]{39}$/

export const PROFILE_ENCRYPTION_INFO = 'stemized-profile-encryption-v1'
export const SESSION_ENCRYPTION_INFO = 'stemized-session-cookie-v1'

export const PROFILE_FEATURE_ENABLED =
  process.env.ANON_PROFILE_ENABLED === 'true' ||
  process.env.NEXT_PUBLIC_ANON_PROFILE_ENABLED === 'true'

export const PROFILE_PUBLIC_FEATURE_ENABLED =
  process.env.NEXT_PUBLIC_ANON_PROFILE_ENABLED === 'true'

export const PROFILE_API_BASE_URL =
  process.env.BLOB_API_URL ?? 'https://blob.vercel-storage.com'

export const ALLOWED_FILE_MIME_TYPES = new Set([
  'application/pdf',
  'text/plain',
  'text/markdown',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/gif',
  'image/webp',
  'image/svg+xml',
])
