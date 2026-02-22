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
  decryptBytes,
  deriveProfileEncryptionKey,
  sha256Base64Url,
} from '@/lib/profile/crypto'
import { sanitizeFilename } from '@/lib/profile/file-validation'
import {
  deleteFileBlob,
  readEncryptedFilePayload,
  readProfileState,
  writeProfileState,
} from '@/lib/profile/profile-store'
import {
  checkRateLimit,
  registerRateLimitFailure,
  registerRateLimitSuccess,
} from '@/lib/profile/rate-limit'

export const runtime = 'nodejs'

function extractFileId(request: NextRequest): string {
  const pathname = request.nextUrl.pathname
  const fileId = pathname.split('/').pop() ?? ''
  try {
    return decodeURIComponent(fileId).trim()
  } catch {
    return fileId.trim()
  }
}

export async function GET(request: NextRequest) {
  try {
    assertFeatureEnabled()

    const session = requireSession(request)
    const fileId = extractFileId(request)

    if (!fileId) {
      throw new ProfileApiError(400, 'INVALID_FILE_ID', 'File ID is required')
    }

    const state = await readProfileState(session)
    if (!state) {
      throw new ProfileApiError(404, 'PROFILE_NOT_FOUND', 'Profile state not found')
    }

    const metadata = state.files[fileId]
    if (!metadata) {
      throw new ProfileApiError(404, 'FILE_NOT_FOUND', 'File was not found')
    }

    const encryptedPayload = await readEncryptedFilePayload(session.profileId, metadata)
    const profileKey = deriveProfileEncryptionKey(session.recoveryKey)
    const plaintext = decryptBytes(encryptedPayload, profileKey)

    if (metadata.checksum) {
      const actual = sha256Base64Url(plaintext)
      if (actual !== metadata.checksum) {
        throw new ProfileApiError(500, 'CHECKSUM_MISMATCH', 'File integrity check failed')
      }
    }

    return new Response(new Uint8Array(plaintext), {
      status: 200,
      headers: {
        'content-type': metadata.mime || 'application/octet-stream',
        'content-length': String(plaintext.byteLength),
        'content-disposition': `attachment; filename="${sanitizeFilename(metadata.name)}"`,
        'cache-control': 'no-store',
      },
    })
  } catch (error) {
    return handleRouteError(error)
  }
}

export async function DELETE(request: NextRequest) {
  const rateLimit = checkRateLimit(request, 'profile-files-delete', {
    maxAttempts: 30,
    windowMs: 5 * 60 * 1000,
    blockMs: 60 * 1000,
  })

  if (!rateLimit.allowed) {
    return jsonError(429, 'RATE_LIMITED', 'Too many delete attempts. Try again soon.')
  }

  try {
    assertFeatureEnabled()
    assertAllowedOrigin(request)

    const session = requireSession(request)
    const fileId = extractFileId(request)

    if (!fileId) {
      throw new ProfileApiError(400, 'INVALID_FILE_ID', 'File ID is required')
    }

    const state = await readProfileState(session)
    if (!state) {
      throw new ProfileApiError(404, 'PROFILE_NOT_FOUND', 'Profile state not found')
    }

    const metadata = state.files[fileId]
    if (!metadata) {
      throw new ProfileApiError(404, 'FILE_NOT_FOUND', 'File was not found')
    }

    await deleteFileBlob(metadata)

    const nextFiles = { ...state.files }
    delete nextFiles[fileId]

    await writeProfileState(session, {
      ...state,
      files: nextFiles,
      updatedAt: new Date().toISOString(),
    })

    registerRateLimitSuccess(rateLimit.key)
    return jsonResponse({ deleted: true, fileId })
  } catch (error) {
    registerRateLimitFailure(rateLimit.key, {
      maxAttempts: 30,
      windowMs: 5 * 60 * 1000,
      blockMs: 60 * 1000,
    })
    return handleRouteError(error)
  }
}
