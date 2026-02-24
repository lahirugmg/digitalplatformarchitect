'use client'

import type { Persona } from '@/lib/architecture-playground/types'
import type { GoalId } from '@/lib/onboarding/types'
import {
  LEGACY_ONBOARDING_KEY,
  LEGACY_PROGRESS_KEY,
  PROFILE_CACHE_KEY,
  PROFILE_HINT_KEY,
  PROFILE_PUBLIC_FEATURE_ENABLED,
} from '@/lib/profile/constants'
import { mergeProfileState } from '@/lib/profile/merge'
import {
  createEmptyProfileState,
  normalizeLearningProgressState,
  normalizeOnboardingState,
  normalizeProfileState,
  normalizeProgressState,
  PERSONALIZATION_SURFACES,
  type PersonalizationSurfaceId,
  type ProfileHint,
  type ProfileOnboardingState,
  type ProfileProgressState,
  type ProfileState,
  type VaultFileMetadata,
} from '@/lib/profile/types'
import { migrateLegacySkillTreeProgressToLearningProgress } from '@/lib/progress/migrate-legacy'
import {
  createEmptyLearningProgressState,
  markMilestoneCompleted,
  trackRecommendationStart,
  trackRouteVisit,
} from '@/lib/progress/tracker'
import type { LearningProgressSource, LearningProgressState } from '@/lib/progress/types'

const SYNC_DEBOUNCE_MS = 1200
const DEFAULT_DISMISSAL_TTL_DAYS = 14

const VALID_PERSONAS = new Set<string>([
  'business',
  'product',
  'ba',
  'uxdesigner',
  'ea',
  'security',
  'data',
  'implementation',
  'qa',
])

const VALID_GOALS = new Set<string>([
  'learn-patterns',
  'design-system',
  'evaluate-architecture',
  'build-roadmap',
  'assess-readiness',
  'understand-trade-offs',
  'explore-technologies',
  'hands-on-practice',
  'validate-design',
  'create-documentation',
  'security-review',
  'data-strategy',
  'performance-optimization',
  'integration-design',
  'cloud-migration',
])

let pendingRecoveryKey: string | null = null
let queuedSyncTimer: ReturnType<typeof setTimeout> | null = null
let syncInFlight: Promise<void> | null = null

export type PersonalizationContextSource = 'override' | 'onboarding' | 'fallback'

export interface ResolvedPersonalizationContext {
  role: Persona | null
  goal: GoalId | null
  source: PersonalizationContextSource
}

function canUseDom(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined'
}

function readStorage<T>(key: string): T | null {
  if (!canUseDom()) {
    return null
  }

  const raw = localStorage.getItem(key)
  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

function writeStorage(key: string, value: unknown): void {
  if (!canUseDom()) {
    return
  }

  localStorage.setItem(key, JSON.stringify(value))
}

function removeStorage(key: string): void {
  if (!canUseDom()) {
    return
  }

  localStorage.removeItem(key)
}

function dispatchProfileStatusEvent(): void {
  if (!canUseDom()) return

  window.dispatchEvent(
    new CustomEvent('stemized:profile-status-change', {
      detail: {
        hint: getCachedHint(),
      },
    }),
  )
}

function dispatchRecoveryKeyEvent(recoveryKey: string): void {
  if (!canUseDom()) return

  window.dispatchEvent(
    new CustomEvent('stemized:recovery-key-created', {
      detail: {
        recoveryKey,
      },
    }),
  )
}

function parseLegacyProgress(): ProfileProgressState | null {
  const parsed = readStorage<unknown>(LEGACY_PROGRESS_KEY)
  return normalizeProgressState(parsed)
}

function parseLegacyOnboarding(): ProfileOnboardingState | null {
  const parsed = readStorage<
    | {
        state?: unknown
      }
    | ProfileOnboardingState
  >(LEGACY_ONBOARDING_KEY)

  if (!parsed) {
    return null
  }

  if ('state' in parsed && parsed.state) {
    return normalizeOnboardingState(parsed.state)
  }

  return normalizeOnboardingState(parsed)
}

function buildLocalStateForSync(): ProfileState {
  const cached = getCachedState()
  const legacyProgress = parseLegacyProgress()

  const legacyState = createEmptyProfileState()
  legacyState.progress = legacyProgress
  legacyState.learningProgress = migrateLegacySkillTreeProgressToLearningProgress(
    legacyProgress,
    cached.learningProgress,
  )
  legacyState.onboarding = parseLegacyOnboarding()

  return mergeProfileState(cached, legacyState)
}

function setCachedStateInternal(state: ProfileState, hint?: ProfileHint | null): void {
  writeStorage(PROFILE_CACHE_KEY, state)

  if (hint) {
    writeStorage(PROFILE_HINT_KEY, hint)
  }

  dispatchProfileStatusEvent()
}

function clearPendingSyncTimer(): void {
  if (queuedSyncTimer) {
    clearTimeout(queuedSyncTimer)
    queuedSyncTimer = null
  }
}

function normalizePersona(value: unknown): Persona | null {
  if (typeof value !== 'string') {
    return null
  }
  return VALID_PERSONAS.has(value) ? (value as Persona) : null
}

function normalizeGoalId(value: unknown): GoalId | null {
  if (typeof value !== 'string') {
    return null
  }
  return VALID_GOALS.has(value) ? (value as GoalId) : null
}

function normalizeRecommendationIds(recommendationIds: string[]): string[] {
  return Array.from(
    new Set(
      recommendationIds
        .map((id) => id.trim())
        .filter((id): id is string => id.length > 0),
    ),
  )
}

function arraysEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) {
    return false
  }

  for (let index = 0; index < a.length; index += 1) {
    if (a[index] !== b[index]) {
      return false
    }
  }

  return true
}

export function isProfileFeatureEnabled(): boolean {
  return PROFILE_PUBLIC_FEATURE_ENABLED
}

export function getCachedState(): ProfileState {
  const parsed = readStorage<unknown>(PROFILE_CACHE_KEY)
  return normalizeProfileState(parsed)
}

export function getCachedHint(): ProfileHint | null {
  const parsed = readStorage<unknown>(PROFILE_HINT_KEY)
  if (!parsed || typeof parsed !== 'object') {
    return null
  }

  const hint = parsed as Partial<ProfileHint>
  if (typeof hint.profileIdPrefix !== 'string' || typeof hint.updatedAt !== 'string') {
    return null
  }

  return {
    profileIdPrefix: hint.profileIdPrefix,
    updatedAt: hint.updatedAt,
  }
}

export function setCachedState(state: ProfileState, hint?: ProfileHint | null): void {
  setCachedStateInternal(normalizeProfileState(state), hint)
}

export function clearCachedState(): void {
  removeStorage(PROFILE_CACHE_KEY)
  removeStorage(PROFILE_HINT_KEY)
  dispatchProfileStatusEvent()
}

function getBaseLearningProgress(state: ProfileState): LearningProgressState {
  const migrated = migrateLegacySkillTreeProgressToLearningProgress(
    parseLegacyProgress(),
    state.learningProgress,
  )

  return migrated ?? createEmptyLearningProgressState()
}

export function updateCachedLearningProgress(learningProgress: LearningProgressState): void {
  const current = getCachedState()
  const normalizedLearningProgress = normalizeLearningProgressState(learningProgress)

  if (!normalizedLearningProgress) {
    return
  }

  const now = new Date().toISOString()
  const nextState: ProfileState = {
    ...current,
    learningProgress: {
      ...normalizedLearningProgress,
      updatedAt: now,
    },
    updatedAt: now,
  }

  setCachedStateInternal(nextState)
}

function mutateLearningProgress(
  mutator: (learningProgress: LearningProgressState) => LearningProgressState,
): LearningProgressState {
  const current = getCachedState()
  const base = getBaseLearningProgress(current)
  const next = mutator(base)

  const shouldPersist = next !== base || current.learningProgress === null

  if (!shouldPersist) {
    return base
  }

  updateCachedLearningProgress(next)
  queueSync()
  return next
}

export function ensureLearningProgressState(): LearningProgressState {
  return mutateLearningProgress((learningProgress) => learningProgress)
}

export function trackLearningPathVisit(
  path: string,
  source: LearningProgressSource = 'route',
): LearningProgressState {
  return mutateLearningProgress((learningProgress) =>
    trackRouteVisit(learningProgress, path, source),
  )
}

export function startLearningMilestoneFromPath(path: string): LearningProgressState {
  return mutateLearningProgress((learningProgress) =>
    trackRecommendationStart(learningProgress, path),
  )
}

export function completeLearningProgressMilestone(milestoneId: string): LearningProgressState {
  return mutateLearningProgress((learningProgress) =>
    markMilestoneCompleted(learningProgress, milestoneId),
  )
}

export function getResolvedPersonalizationContext(): ResolvedPersonalizationContext {
  const state = getCachedState()
  const override = state.personalization.contextOverride

  if (override && (override.role || override.goal)) {
    return {
      role: normalizePersona(override.role),
      goal: normalizeGoalId(override.goal),
      source: 'override',
    }
  }

  const onboardingRole = normalizePersona(state.onboarding?.selectedRole ?? null)
  const onboardingGoal = normalizeGoalId(state.onboarding?.selectedGoal ?? null)

  if (onboardingRole || onboardingGoal) {
    return {
      role: onboardingRole,
      goal: onboardingGoal,
      source: 'onboarding',
    }
  }

  return {
    role: null,
    goal: null,
    source: 'fallback',
  }
}

export function setPersonalizationContextOverride(
  role: Persona | null,
  goal: GoalId | null,
): void {
  const state = getCachedState()
  const now = new Date().toISOString()
  const nextContext = role || goal ? { role, goal, updatedAt: now } : null

  setCachedStateInternal({
    ...state,
    personalization: {
      ...state.personalization,
      updatedAt: now,
      contextOverride: nextContext,
    },
    updatedAt: now,
  })

  queueSync()
}

export function dismissRecommendation(
  recommendationId: string,
  ttlDays = DEFAULT_DISMISSAL_TTL_DAYS,
): void {
  const normalizedId = recommendationId.trim()
  if (!normalizedId) {
    return
  }

  const safeTtlDays = Number.isFinite(ttlDays) && ttlDays > 0 ? ttlDays : DEFAULT_DISMISSAL_TTL_DAYS
  const now = new Date()
  const until = new Date(now.getTime() + safeTtlDays * 24 * 60 * 60 * 1000).toISOString()
  const updatedAt = now.toISOString()
  const state = getCachedState()

  setCachedStateInternal({
    ...state,
    personalization: {
      ...state.personalization,
      updatedAt,
      dismissed: {
        ...state.personalization.dismissed,
        [normalizedId]: {
          until,
          updatedAt,
        },
      },
    },
    updatedAt,
  })

  queueSync()
}

export function markSurfaceSeen(
  surfaceId: PersonalizationSurfaceId,
  recommendationIds: string[],
): boolean {
  if (!PERSONALIZATION_SURFACES.includes(surfaceId)) {
    return false
  }

  const normalizedIds = normalizeRecommendationIds(recommendationIds)
  const state = getCachedState()
  const previousSurface = state.personalization.surfaces[surfaceId]
  const hasChanged = !arraysEqual(previousSurface.lastRecommendationIds, normalizedIds)

  if (!hasChanged && previousSurface.lastSeenAt) {
    return false
  }

  const now = new Date().toISOString()

  setCachedStateInternal({
    ...state,
    personalization: {
      ...state.personalization,
      updatedAt: now,
      surfaces: {
        ...state.personalization.surfaces,
        [surfaceId]: {
          lastSeenAt: now,
          lastRecommendationIds: normalizedIds,
          updatedAt: now,
        },
      },
    },
    updatedAt: now,
  })

  queueSync()
  return true
}

export function clearExpiredDismissals(now = new Date()): boolean {
  const currentState = getCachedState()
  const nextDismissed: typeof currentState.personalization.dismissed = {}
  let changed = false

  for (const [recommendationId, dismissal] of Object.entries(currentState.personalization.dismissed)) {
    const expiresAt = Date.parse(dismissal.until)
    if (Number.isFinite(expiresAt) && expiresAt > now.getTime()) {
      nextDismissed[recommendationId] = dismissal
      continue
    }

    changed = true
  }

  if (!changed) {
    return false
  }

  const updatedAt = now.toISOString()

  setCachedStateInternal({
    ...currentState,
    personalization: {
      ...currentState.personalization,
      dismissed: nextDismissed,
      updatedAt,
    },
    updatedAt,
  })

  queueSync()
  return true
}

function setPendingRecoveryKey(recoveryKey: string): void {
  pendingRecoveryKey = recoveryKey
  dispatchRecoveryKeyEvent(recoveryKey)
}

export function consumePendingRecoveryKey(): string | null {
  const key = pendingRecoveryKey
  pendingRecoveryKey = null
  return key
}

async function requestJson<T>(input: string, init?: RequestInit): Promise<{ status: number; data: T | null }> {
  const response = await fetch(input, {
    ...init,
    headers: {
      'content-type': 'application/json',
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  })

  if (response.status === 204) {
    return { status: response.status, data: null }
  }

  try {
    const data = (await response.json()) as T
    return {
      status: response.status,
      data,
    }
  } catch {
    return {
      status: response.status,
      data: null,
    }
  }
}

type StateResponse = {
  hint?: ProfileHint
  state?: ProfileState
  created?: boolean
  recoveryKey?: string
}

export async function ensureProfile(): Promise<{ created: boolean; state: ProfileState }> {
  if (!isProfileFeatureEnabled()) {
    return {
      created: false,
      state: getCachedState(),
    }
  }

  const existing = await requestJson<StateResponse>('/api/profile/state', {
    method: 'GET',
  })

  if (existing.status === 200 && existing.data?.state) {
    const normalized = normalizeProfileState(existing.data.state)
    setCachedStateInternal(normalized, existing.data.hint ?? null)

    return {
      created: false,
      state: normalized,
    }
  }

  if (existing.status !== 401 && existing.status !== 404) {
    throw new Error('Failed to check profile session')
  }

  const initPayload = {
    localState: buildLocalStateForSync(),
  }

  const initialized = await requestJson<StateResponse>('/api/profile/init', {
    method: 'POST',
    body: JSON.stringify(initPayload),
  })

  if (initialized.status !== 200 || !initialized.data?.state) {
    throw new Error('Failed to initialize profile')
  }

  const normalized = normalizeProfileState(initialized.data.state)
  setCachedStateInternal(normalized, initialized.data.hint ?? null)

  if (initialized.data.recoveryKey) {
    setPendingRecoveryKey(initialized.data.recoveryKey)
  }

  return {
    created: Boolean(initialized.data.created),
    state: normalized,
  }
}

export async function restoreProfile(recoveryKey: string): Promise<ProfileState> {
  if (!isProfileFeatureEnabled()) {
    throw new Error('Profile feature is disabled')
  }

  const response = await requestJson<StateResponse>('/api/profile/restore', {
    method: 'POST',
    body: JSON.stringify({
      recoveryKey,
      localState: buildLocalStateForSync(),
    }),
  })

  if (response.status !== 200 || !response.data?.state) {
    throw new Error('Failed to restore profile')
  }

  const normalized = normalizeProfileState(response.data.state)
  setCachedStateInternal(normalized, response.data.hint ?? null)

  return normalized
}

export async function hydrateStateFromServer(): Promise<ProfileState | null> {
  if (!isProfileFeatureEnabled()) {
    return null
  }

  const response = await requestJson<StateResponse>('/api/profile/state', {
    method: 'GET',
  })

  if (response.status !== 200 || !response.data?.state) {
    return null
  }

  const normalized = normalizeProfileState(response.data.state)
  setCachedStateInternal(normalized, response.data.hint ?? null)
  return normalized
}

export function updateCachedProgress(progress: ProfileProgressState): void {
  const current = getCachedState()
  const normalizedProgress = normalizeProgressState(progress)

  if (!normalizedProgress) {
    return
  }

  const nextState: ProfileState = {
    ...current,
    progress: {
      ...normalizedProgress,
      updatedAt: new Date().toISOString(),
    },
    updatedAt: new Date().toISOString(),
  }

  setCachedStateInternal(nextState)
}

export function updateCachedOnboarding(onboarding: ProfileOnboardingState): void {
  const current = getCachedState()
  const normalizedOnboarding = normalizeOnboardingState(onboarding)

  if (!normalizedOnboarding) {
    return
  }

  const nextState: ProfileState = {
    ...current,
    onboarding: {
      ...normalizedOnboarding,
      updatedAt: new Date().toISOString(),
    },
    updatedAt: new Date().toISOString(),
  }

  setCachedStateInternal(nextState)
}

export async function syncStateNow(): Promise<void> {
  if (!isProfileFeatureEnabled()) {
    return
  }

  if (syncInFlight) {
    return syncInFlight
  }

  syncInFlight = (async () => {
    await ensureProfile()

    const response = await requestJson<StateResponse>('/api/profile/state', {
      method: 'PUT',
      body: JSON.stringify({ state: buildLocalStateForSync() }),
    })

    if (response.status !== 200 || !response.data?.state) {
      throw new Error('Failed to sync profile state')
    }

    const normalized = normalizeProfileState(response.data.state)
    setCachedStateInternal(normalized, response.data.hint ?? null)
  })()

  try {
    await syncInFlight
  } finally {
    syncInFlight = null
  }
}

export function queueSync(): void {
  if (!isProfileFeatureEnabled()) {
    return
  }

  clearPendingSyncTimer()
  queuedSyncTimer = setTimeout(() => {
    void syncStateNow().catch(() => {
      // Sync failures are retried on the next mutation.
    })
  }, SYNC_DEBOUNCE_MS)
}

export async function logoutProfile(options?: { clearLocalCache?: boolean }): Promise<void> {
  if (!isProfileFeatureEnabled()) {
    return
  }

  await fetch('/api/profile/logout', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    cache: 'no-store',
  })

  clearPendingSyncTimer()

  if (options?.clearLocalCache) {
    clearCachedState()
  } else {
    dispatchProfileStatusEvent()
  }
}

export async function deleteProfile(): Promise<void> {
  if (!isProfileFeatureEnabled()) {
    return
  }

  const response = await fetch('/api/profile/state', {
    method: 'DELETE',
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Failed to delete profile')
  }

  clearPendingSyncTimer()
  clearCachedState()
}

export async function listProfileFiles(): Promise<VaultFileMetadata[]> {
  const response = await requestJson<{ files?: VaultFileMetadata[] }>('/api/profile/files', {
    method: 'GET',
  })

  if (response.status !== 200 || !response.data?.files) {
    if (response.status === 401) {
      return []
    }
    throw new Error('Failed to list files')
  }

  return response.data.files
}

export async function uploadProfileFile(file: File): Promise<VaultFileMetadata> {
  const form = new FormData()
  form.set('file', file)

  const response = await fetch('/api/profile/files', {
    method: 'POST',
    body: form,
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Failed to upload file')
  }

  const payload = (await response.json()) as {
    file?: VaultFileMetadata
  }

  if (!payload.file) {
    throw new Error('Upload response is missing file metadata')
  }

  const state = getCachedState()
  setCachedStateInternal({
    ...state,
    files: {
      ...state.files,
      [payload.file.fileId]: payload.file,
    },
    updatedAt: new Date().toISOString(),
  })

  return payload.file
}

export async function deleteProfileFile(fileId: string): Promise<void> {
  const response = await fetch(`/api/profile/files/${encodeURIComponent(fileId)}`, {
    method: 'DELETE',
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Failed to delete file')
  }

  const state = getCachedState()
  const nextFiles = { ...state.files }
  delete nextFiles[fileId]

  setCachedStateInternal({
    ...state,
    files: nextFiles,
    updatedAt: new Date().toISOString(),
  })
}

export async function downloadProfileFile(fileId: string): Promise<Blob> {
  const response = await fetch(`/api/profile/files/${encodeURIComponent(fileId)}`, {
    method: 'GET',
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Failed to download file')
  }

  return response.blob()
}
