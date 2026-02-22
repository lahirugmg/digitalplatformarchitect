'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Download, Trash2, Upload, AlertCircle, FileText } from 'lucide-react'
import { toast } from 'sonner'
import {
  downloadProfileFile,
  hydrateStateFromServer,
  listProfileFiles,
  uploadProfileFile,
  deleteProfileFile,
  isProfileFeatureEnabled,
  getCachedHint,
} from '@/lib/profile/profile-client'
import type { ProfileHint, VaultFileMetadata } from '@/lib/profile/types'

const ACCEPT_TYPES = [
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
  'image/gif',
  'image/webp',
  'image/svg+xml',
].join(',')

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDate(value: string): string {
  const parsed = Date.parse(value)
  if (!Number.isFinite(parsed)) {
    return 'Unknown'
  }

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(parsed)
}

export default function FileVault() {
  const [files, setFiles] = useState<VaultFileMetadata[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [sessionActive, setSessionActive] = useState(false)
  const [profileHint, setProfileHint] = useState<ProfileHint | null>(null)

  const featureEnabled = isProfileFeatureEnabled()

  const sortedFiles = useMemo(() => {
    return [...files].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
  }, [files])

  const refreshFiles = useCallback(async () => {
    if (!featureEnabled) {
      setLoading(false)
      setSessionActive(false)
      return
    }

    setLoading(true)
    try {
      const hydrated = await hydrateStateFromServer()
      const hint = getCachedHint()
      setProfileHint(hint)
      setSessionActive(Boolean(hydrated))

      if (!hydrated) {
        setFiles([])
        return
      }

      const nextFiles = await listProfileFiles()
      setFiles(nextFiles)
    } catch {
      setFiles([])
      setSessionActive(false)
    } finally {
      setLoading(false)
    }
  }, [featureEnabled])

  useEffect(() => {
    void refreshFiles()

    const onStatusChange = () => {
      setProfileHint(getCachedHint())
      void refreshFiles()
    }

    window.addEventListener('stemized:profile-status-change', onStatusChange)
    return () => window.removeEventListener('stemized:profile-status-change', onStatusChange)
  }, [refreshFiles])

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const candidate = event.target.files?.[0]
    event.target.value = ''

    if (!candidate) {
      return
    }

    setUploading(true)
    try {
      await uploadProfileFile(candidate)
      toast.success('File uploaded to secure vault')
      await refreshFiles()
    } catch {
      toast.error('Upload failed. Check session, file type, and size limit (10MB).')
    } finally {
      setUploading(false)
    }
  }

  const handleDownload = async (file: VaultFileMetadata) => {
    try {
      const blob = await downloadProfileFile(file.fileId)
      const objectUrl = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = objectUrl
      anchor.download = file.name
      document.body.appendChild(anchor)
      anchor.click()
      anchor.remove()
      URL.revokeObjectURL(objectUrl)
    } catch {
      toast.error('Download failed')
    }
  }

  const handleDelete = async (file: VaultFileMetadata) => {
    const confirmed = window.confirm(`Delete ${file.name}?`)
    if (!confirmed) {
      return
    }

    try {
      await deleteProfileFile(file.fileId)
      setFiles((prev) => prev.filter((item) => item.fileId !== file.fileId))
      toast.success('File deleted')
    } catch {
      toast.error('Delete failed')
    }
  }

  if (!featureEnabled) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
          File Vault is disabled. Set `NEXT_PUBLIC_ANON_PROFILE_ENABLED=true` and `ANON_PROFILE_ENABLED=true` to enable.
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Secure File Vault</h1>
          <p className="text-sm text-slate-600">
            Private documents and images encrypted before blob storage.
          </p>
          {profileHint && (
            <p className="mt-1 text-xs text-slate-500">
              Active profile hint: <span className="font-mono">{profileHint.profileIdPrefix}</span>
            </p>
          )}
        </div>

        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50">
          <Upload className="h-4 w-4" />
          <span>{uploading ? 'Uploading...' : 'Upload File'}</span>
          <input
            type="file"
            className="hidden"
            accept={ACCEPT_TYPES}
            onChange={handleUpload}
            disabled={!sessionActive || uploading}
          />
        </label>
      </header>

      {!sessionActive && !loading && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <AlertCircle className="mt-0.5 h-4 w-4" />
          <p>
            No active profile session. Use the header&apos;s <strong>Restore Key</strong> action to unlock vault access.
          </p>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
          Stored Files
        </div>

        {loading ? (
          <div className="px-4 py-10 text-center text-sm text-slate-500">Loading files...</div>
        ) : sortedFiles.length === 0 ? (
          <div className="px-4 py-10 text-center text-sm text-slate-500">
            {sessionActive
              ? 'No files uploaded yet.'
              : 'Sign in with your recovery key to view files.'}
          </div>
        ) : (
          <ul className="divide-y divide-slate-200">
            {sortedFiles.map((file) => (
              <li key={file.fileId} className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <FileText className="h-4 w-4 text-slate-500" />
                    <span className="truncate">{file.name}</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {formatBytes(file.size)} • {file.mime} • Uploaded {formatDate(file.createdAt)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleDownload(file)}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(file)}
                    className="inline-flex items-center gap-2 rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Supported file types: documents and images up to 10MB.
      </p>
    </section>
  )
}
