'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { KeyRound, ShieldCheck, Trash2, LogOut } from 'lucide-react'
import { toast } from 'sonner'
import {
  consumePendingRecoveryKey,
  deleteProfile,
  getCachedHint,
  hydrateStateFromServer,
  isProfileFeatureEnabled,
  logoutProfile,
  restoreProfile,
} from '@/lib/profile/profile-client'

function maskHint(hint: string | undefined): string {
  if (!hint) {
    return 'No active session'
  }

  if (hint.length <= 6) {
    return hint
  }

  return `${hint.slice(0, 6)}...`
}

export default function ProfileKeyManager() {
  const [isOpen, setIsOpen] = useState(false)
  const [sessionActive, setSessionActive] = useState(false)
  const [hint, setHint] = useState<string | undefined>(undefined)
  const [restoreKeyInput, setRestoreKeyInput] = useState('')
  const [isBusy, setIsBusy] = useState(false)
  const [recoveryKeyToReveal, setRecoveryKeyToReveal] = useState<string | null>(null)
  const [keepLocalCacheOnLogout, setKeepLocalCacheOnLogout] = useState(true)

  const featureEnabled = isProfileFeatureEnabled()

  const buttonLabel = useMemo(() => {
    if (sessionActive) {
      return `Profile ${maskHint(hint)}`
    }

    return 'Restore Key'
  }, [sessionActive, hint])

  useEffect(() => {
    if (!featureEnabled) {
      return
    }

    const refresh = async () => {
      const state = await hydrateStateFromServer().catch(() => null)
      setSessionActive(Boolean(state))

      const nextHint = getCachedHint()?.profileIdPrefix
      setHint(nextHint)

      const pendingKey = consumePendingRecoveryKey()
      if (pendingKey) {
        setRecoveryKeyToReveal(pendingKey)
        setIsOpen(true)
      }
    }

    void refresh()

    const onStatusChange = () => {
      setHint(getCachedHint()?.profileIdPrefix)
    }

    const onRecoveryKeyCreated = () => {
      const pendingKey = consumePendingRecoveryKey()
      if (!pendingKey) {
        return
      }

      setRecoveryKeyToReveal(pendingKey)
      setIsOpen(true)
      setSessionActive(true)
      setHint(getCachedHint()?.profileIdPrefix)
    }

    window.addEventListener('stemized:profile-status-change', onStatusChange)
    window.addEventListener('stemized:recovery-key-created', onRecoveryKeyCreated)

    return () => {
      window.removeEventListener('stemized:profile-status-change', onStatusChange)
      window.removeEventListener('stemized:recovery-key-created', onRecoveryKeyCreated)
    }
  }, [featureEnabled])

  if (!featureEnabled) {
    return null
  }

  const handleRestore = async () => {
    const key = restoreKeyInput.trim()
    if (!key) {
      toast.error('Enter your recovery key to continue')
      return
    }

    setIsBusy(true)
    try {
      await restoreProfile(key)
      toast.success('Profile restored')
      setSessionActive(true)
      setHint(getCachedHint()?.profileIdPrefix)
      setIsOpen(false)
      window.location.reload()
    } catch {
      toast.error('Recovery key is invalid')
    } finally {
      setIsBusy(false)
    }
  }

  const handleLogout = async () => {
    setIsBusy(true)
    try {
      await logoutProfile({ clearLocalCache: !keepLocalCacheOnLogout })
      setSessionActive(false)
      setHint(getCachedHint()?.profileIdPrefix)
      setIsOpen(false)
      toast.success('Logged out')
    } catch {
      toast.error('Failed to log out')
    } finally {
      setIsBusy(false)
    }
  }

  const handleDeleteProfile = async () => {
    const confirmed = window.confirm(
      'Delete this profile and all files permanently? This cannot be undone.'
    )
    if (!confirmed) {
      return
    }

    setIsBusy(true)
    try {
      await deleteProfile()
      setSessionActive(false)
      setHint(undefined)
      setIsOpen(false)
      toast.success('Profile deleted')
    } catch {
      toast.error('Failed to delete profile')
    } finally {
      setIsBusy(false)
    }
  }

  const closeModal = () => {
    setIsOpen(false)
    setRecoveryKeyToReveal(null)
  }

  const copyRecoveryKey = async () => {
    if (!recoveryKeyToReveal) {
      return
    }

    try {
      await navigator.clipboard.writeText(recoveryKeyToReveal)
      toast.success('Recovery key copied')
    } catch {
      toast.error('Failed to copy recovery key')
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
        aria-label="Manage profile recovery key"
      >
        <KeyRound className="h-4 w-4" />
        <span className="hidden lg:inline">{buttonLabel}</span>
        <span className="lg:hidden">Profile</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            {recoveryKeyToReveal ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-600" />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Save Your Recovery Key</h3>
                    <p className="mt-1 text-sm text-slate-600">
                      This key is shown once. If lost, your profile cannot be recovered.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 font-mono text-sm text-amber-900 break-all">
                  {recoveryKeyToReveal}
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={copyRecoveryKey}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Copy Key
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    I Saved It
                  </button>
                </div>
              </div>
            ) : sessionActive ? (
              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Profile Session</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Active profile hint: <span className="font-mono text-slate-800">{maskHint(hint)}</span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/vault"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    onClick={closeModal}
                  >
                    Open File Vault
                  </Link>
                </div>

                <label className="flex items-start gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={keepLocalCacheOnLogout}
                    onChange={(event) => setKeepLocalCacheOnLogout(event.target.checked)}
                  />
                  <span>Keep local cached progress after logout</span>
                </label>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isBusy}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Log Out
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteProfile}
                    disabled={isBusy}
                    className="inline-flex items-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Profile
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Restore Profile</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Enter your recovery key to restore progress and onboarding on this device.
                  </p>
                </div>

                <input
                  type="text"
                  value={restoreKeyInput}
                  onChange={(event) => setRestoreKeyInput(event.target.value)}
                  placeholder="stz_1_..."
                  autoComplete="off"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none"
                />

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleRestore}
                    disabled={isBusy}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    Restore With Key
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
