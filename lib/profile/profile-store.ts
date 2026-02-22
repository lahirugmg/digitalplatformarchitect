import {
  deleteBlobUrls,
  downloadPrivateBlob,
  findBlobByPath,
  putPrivateBlob,
} from '@/lib/profile/blob-client'
import {
  decryptJson,
  deriveProfileEncryptionKey,
  encryptJson,
  type EncryptedJsonPayload,
} from '@/lib/profile/crypto'
import { PROFILE_STATE_FILENAME } from '@/lib/profile/constants'
import {
  normalizeProfileState,
  type ProfileState,
  type VaultFileMetadata,
} from '@/lib/profile/types'

export interface ProfileAccess {
  profileId: string
  recoveryKey: string
}

export function getProfileStatePath(profileId: string): string {
  return `${profileId}/${PROFILE_STATE_FILENAME}`
}

export function getProfileFilePath(profileId: string, fileId: string): string {
  return `${profileId}/${fileId}.bin`
}

export async function resolveBlobUrl(pathname: string): Promise<string | null> {
  const existing = await findBlobByPath(pathname)
  return existing?.url ?? null
}

async function readEncryptedPayload(pathname: string): Promise<EncryptedJsonPayload | null> {
  const blob = await findBlobByPath(pathname)
  if (!blob) {
    return null
  }

  const encryptedBytes = await downloadPrivateBlob(blob.url)
  const encryptedText = encryptedBytes.toString('utf8')
  const payload = JSON.parse(encryptedText) as EncryptedJsonPayload

  return payload
}

export async function readProfileState(access: ProfileAccess): Promise<ProfileState | null> {
  const pathname = getProfileStatePath(access.profileId)
  const encryptedPayload = await readEncryptedPayload(pathname)

  if (!encryptedPayload) {
    return null
  }

  const key = deriveProfileEncryptionKey(access.recoveryKey)
  const decryptedState = decryptJson<ProfileState>(encryptedPayload, key)

  return normalizeProfileState(decryptedState)
}

export async function writeProfileState(
  access: ProfileAccess,
  state: ProfileState,
): Promise<void> {
  const key = deriveProfileEncryptionKey(access.recoveryKey)
  const encryptedPayload = encryptJson(state, key)
  const pathname = getProfileStatePath(access.profileId)

  await putPrivateBlob(pathname, JSON.stringify(encryptedPayload), 'application/json')
}

export async function readEncryptedFilePayload(
  profileId: string,
  metadata: VaultFileMetadata,
): Promise<Buffer> {
  const pathname = metadata.blobPath || getProfileFilePath(profileId, metadata.fileId)
  const blobUrl = metadata.blobUrl ?? (await resolveBlobUrl(pathname))

  if (!blobUrl) {
    throw new Error('Blob not found')
  }

  return downloadPrivateBlob(blobUrl)
}

export async function writeEncryptedFilePayload(
  profileId: string,
  fileId: string,
  payload: Buffer,
): Promise<{ blobPath: string; blobUrl: string }> {
  const blobPath = getProfileFilePath(profileId, fileId)
  const uploaded = await putPrivateBlob(
    blobPath,
    new Uint8Array(payload),
    'application/octet-stream',
  )

  return {
    blobPath,
    blobUrl: uploaded.url,
  }
}

export async function deleteFileBlob(metadata: VaultFileMetadata): Promise<void> {
  if (metadata.blobUrl) {
    await deleteBlobUrls([metadata.blobUrl])
    return
  }

  const blobUrl = await resolveBlobUrl(metadata.blobPath)
  if (blobUrl) {
    await deleteBlobUrls([blobUrl])
  }
}

export async function deleteProfileStateAndFiles(
  access: ProfileAccess,
  state: ProfileState | null,
): Promise<void> {
  const urlsToDelete: string[] = []

  const stateBlobUrl = await resolveBlobUrl(getProfileStatePath(access.profileId))
  if (stateBlobUrl) {
    urlsToDelete.push(stateBlobUrl)
  }

  if (state) {
    for (const metadata of Object.values(state.files)) {
      if (metadata.blobUrl) {
        urlsToDelete.push(metadata.blobUrl)
      } else {
        const blobUrl = await resolveBlobUrl(metadata.blobPath)
        if (blobUrl) {
          urlsToDelete.push(blobUrl)
        }
      }
    }
  }

  if (urlsToDelete.length > 0) {
    await deleteBlobUrls(Array.from(new Set(urlsToDelete)))
  }
}
