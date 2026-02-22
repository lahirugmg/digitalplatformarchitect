import { Buffer } from 'node:buffer'
import { type NextRequest } from 'next/server'
import {
  assertAllowedOrigin,
  assertFeatureEnabled,
  handleRouteError,
  jsonError,
  jsonResponse,
  ProfileApiError,
  requireSession,
} from '@/lib/profile/api-helpers'
import {
  createFileId,
  assertAllowedFileSize,
  assertAllowedMimeType,
  sanitizeFilename,
} from '@/lib/profile/file-validation'
import {
  deriveProfileEncryptionKey,
  encryptBytes,
  sha256Base64Url,
} from '@/lib/profile/crypto'
import {
  createEmptyProfileState,
  type VaultFileMetadata,
} from '@/lib/profile/types'
import {
  readProfileState,
  writeEncryptedFilePayload,
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

    const files = Object.values(state.files).sort((a, b) => {
      return Date.parse(b.createdAt) - Date.parse(a.createdAt)
    })

    return jsonResponse({ files })
  } catch (error) {
    return handleRouteError(error)
  }
}

export async function POST(request: NextRequest) {
  const rateLimit = checkRateLimit(request, 'profile-files-upload', {
    maxAttempts: 30,
    windowMs: 5 * 60 * 1000,
    blockMs: 60 * 1000,
  })

  if (!rateLimit.allowed) {
    return jsonError(429, 'RATE_LIMITED', 'Too many upload attempts. Try again soon.')
  }

  try {
    assertFeatureEnabled()
    assertAllowedOrigin(request)

    const session = requireSession(request)
    const formData = await request.formData()
    const candidate = formData.get('file')

    if (!(candidate instanceof File)) {
      throw new ProfileApiError(400, 'FILE_REQUIRED', 'No file was provided')
    }

    assertAllowedFileSize(candidate.size)
    assertAllowedMimeType(candidate.type)

    const plaintext = Buffer.from(await candidate.arrayBuffer())
    const checksum = sha256Base64Url(plaintext)
    const fileId = createFileId()
    const profileKey = deriveProfileEncryptionKey(session.recoveryKey)
    const encryptedPayload = encryptBytes(plaintext, profileKey)

    const stored = await writeEncryptedFilePayload(session.profileId, fileId, encryptedPayload)

    const metadata: VaultFileMetadata = {
      fileId,
      name: sanitizeFilename(candidate.name),
      mime: candidate.type,
      size: candidate.size,
      createdAt: new Date().toISOString(),
      blobPath: stored.blobPath,
      blobUrl: stored.blobUrl,
      checksum,
    }

    const currentState = (await readProfileState(session)) ?? createEmptyProfileState()

    const nextState = {
      ...currentState,
      updatedAt: new Date().toISOString(),
      files: {
        ...currentState.files,
        [fileId]: metadata,
      },
    }

    await writeProfileState(session, nextState)

    registerRateLimitSuccess(rateLimit.key)
    return jsonResponse({ file: metadata }, 201)
  } catch (error) {
    registerRateLimitFailure(rateLimit.key, {
      maxAttempts: 30,
      windowMs: 5 * 60 * 1000,
      blockMs: 60 * 1000,
    })
    return handleRouteError(error)
  }
}
