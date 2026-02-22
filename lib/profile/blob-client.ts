import { PROFILE_API_BASE_URL } from '@/lib/profile/constants'

export interface BlobListItem {
  url: string
  pathname: string
  contentType?: string
  uploadedAt?: string
  size?: number
}

export interface PutBlobResult {
  url: string
  pathname: string
  contentType?: string
  contentDisposition?: string
  downloadUrl?: string
}

function getBlobToken(): string {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) {
    throw new Error('BLOB_READ_WRITE_TOKEN is required')
  }

  return token
}

function buildBlobPathname(pathname: string): string {
  return pathname
    .split('/')
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join('/')
}

function getAuthHeaders(): HeadersInit {
  return {
    authorization: `Bearer ${getBlobToken()}`,
  }
}

function assertOk(status: number, action: string): void {
  if (status >= 200 && status < 300) {
    return
  }
  throw new Error(`Blob API ${action} failed with status ${status}`)
}

export async function putPrivateBlob(
  pathname: string,
  body: BodyInit,
  contentType: string,
): Promise<PutBlobResult> {
  const query = new URLSearchParams({
    access: 'private',
    addRandomSuffix: 'false',
    allowOverwrite: 'true',
  })

  const normalizedPath = buildBlobPathname(pathname)
  const response = await fetch(`${PROFILE_API_BASE_URL}/${normalizedPath}?${query.toString()}`, {
    method: 'PUT',
    headers: {
      ...getAuthHeaders(),
      'x-content-type': contentType,
    },
    body,
  })

  assertOk(response.status, 'put')
  const payload = (await response.json()) as PutBlobResult

  return payload
}

export async function listBlobs(prefix: string): Promise<BlobListItem[]> {
  const query = new URLSearchParams({
    prefix,
    mode: 'expanded',
  })

  const response = await fetch(`${PROFILE_API_BASE_URL}?${query.toString()}`, {
    method: 'GET',
    headers: getAuthHeaders(),
    cache: 'no-store',
  })

  assertOk(response.status, 'list')
  const payload = (await response.json()) as {
    blobs?: BlobListItem[]
  }

  return payload.blobs ?? []
}

export async function findBlobByPath(pathname: string): Promise<BlobListItem | null> {
  const blobs = await listBlobs(pathname)
  return blobs.find((blob) => blob.pathname === pathname) ?? null
}

export async function deleteBlobUrls(urls: string[]): Promise<void> {
  if (urls.length === 0) {
    return
  }

  const response = await fetch(`${PROFILE_API_BASE_URL}/delete`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
      'content-type': 'application/json',
    },
    body: JSON.stringify({ urls }),
  })

  assertOk(response.status, 'delete')
}

async function getDownloadUrl(url: string): Promise<string> {
  const query = new URLSearchParams({ url })

  const response = await fetch(`${PROFILE_API_BASE_URL}/download?${query.toString()}`, {
    method: 'GET',
    headers: getAuthHeaders(),
    cache: 'no-store',
  })

  assertOk(response.status, 'download-url')

  const payload = (await response.json()) as { url: string }
  return payload.url
}

export async function downloadPrivateBlob(url: string): Promise<Buffer> {
  const signedUrl = await getDownloadUrl(url)
  const response = await fetch(signedUrl, {
    method: 'GET',
    cache: 'no-store',
  })

  assertOk(response.status, 'download')
  return Buffer.from(await response.arrayBuffer())
}
