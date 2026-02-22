import {
  createEmptyPersonalizationState,
  createEmptyProfileState,
  normalizeProfileState,
  PERSONALIZATION_SURFACES,
  type PersonalizationSurfaceId,
  type PersonalizationContextOverride,
  type PersonalizationDismissal,
  type PersonalizationState,
  type ProfileOnboardingState,
  type ProfileProgressState,
  type ProfileState,
  type SurfacePersonalizationState,
  type VaultFileMetadata,
} from '@/lib/profile/types'

function toTimestamp(value?: string): number {
  if (!value) return 0
  const parsed = Date.parse(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function maxIso(a?: string, b?: string): string | undefined {
  const aTs = toTimestamp(a)
  const bTs = toTimestamp(b)

  if (aTs === 0 && bTs === 0) return undefined
  return aTs >= bTs ? a : b
}

function pickLatestByUpdatedAt<T extends { updatedAt?: string }>(
  first: T | null,
  second: T | null,
): T | null {
  if (!first && !second) return null
  if (!first) return second
  if (!second) return first

  const firstTs = toTimestamp(first.updatedAt)
  const secondTs = toTimestamp(second.updatedAt)

  if (firstTs > secondTs) return first
  if (secondTs > firstTs) return second

  const firstJson = JSON.stringify(first)
  const secondJson = JSON.stringify(second)
  return firstJson >= secondJson ? first : second
}

function mergeCompletedAtMaps(
  server: Record<string, string> = {},
  client: Record<string, string> = {},
): Record<string, string> {
  const merged: Record<string, string> = {}

  for (const nodeId of new Set([...Object.keys(server), ...Object.keys(client)])) {
    const winner = maxIso(server[nodeId], client[nodeId])
    if (winner) {
      merged[nodeId] = winner
    }
  }

  return merged
}

export function mergeProgress(
  serverProgress: ProfileProgressState | null,
  clientProgress: ProfileProgressState | null,
): ProfileProgressState | null {
  if (!serverProgress && !clientProgress) return null
  if (!serverProgress) {
    return {
      ...clientProgress!,
      updatedAt: new Date().toISOString(),
    }
  }
  if (!clientProgress) {
    return {
      ...serverProgress,
      updatedAt: new Date().toISOString(),
    }
  }

  const serverTs = Math.max(
    toTimestamp(serverProgress.updatedAt),
    toTimestamp(serverProgress.lastActivityDate),
  )
  const clientTs = Math.max(
    toTimestamp(clientProgress.updatedAt),
    toTimestamp(clientProgress.lastActivityDate),
  )

  const winner = serverTs >= clientTs ? serverProgress : clientProgress

  const completedNodes = Array.from(
    new Set([...serverProgress.completedNodes, ...clientProgress.completedNodes]),
  )

  const unlockedNodes = Array.from(
    new Set([...serverProgress.unlockedNodes, ...clientProgress.unlockedNodes]),
  )

  return {
    ...winner,
    completedNodes,
    unlockedNodes,
    completedAtByNode: mergeCompletedAtMaps(
      serverProgress.completedAtByNode,
      clientProgress.completedAtByNode,
    ),
    tokens: Math.max(serverProgress.tokens, clientProgress.tokens),
    totalXP: Math.max(serverProgress.totalXP, clientProgress.totalXP),
    level: Math.max(serverProgress.level, clientProgress.level),
    streakDays: Math.max(serverProgress.streakDays, clientProgress.streakDays),
    lastActivityDate:
      maxIso(serverProgress.lastActivityDate, clientProgress.lastActivityDate) ??
      winner.lastActivityDate,
    lastTokenGrant:
      maxIso(serverProgress.lastTokenGrant, clientProgress.lastTokenGrant) ??
      winner.lastTokenGrant,
    updatedAt: new Date().toISOString(),
  }
}

function pickOnboardingWinner(
  serverOnboarding: ProfileOnboardingState,
  clientOnboarding: ProfileOnboardingState,
): {
  winner: ProfileOnboardingState
  older: ProfileOnboardingState
} {
  const serverCompleted = toTimestamp(serverOnboarding.completedAt)
  const clientCompleted = toTimestamp(clientOnboarding.completedAt)

  if (serverCompleted !== clientCompleted) {
    if (serverCompleted > clientCompleted) {
      return { winner: serverOnboarding, older: clientOnboarding }
    }
    return { winner: clientOnboarding, older: serverOnboarding }
  }

  const serverUpdated = toTimestamp(serverOnboarding.updatedAt)
  const clientUpdated = toTimestamp(clientOnboarding.updatedAt)

  if (serverUpdated >= clientUpdated) {
    return { winner: serverOnboarding, older: clientOnboarding }
  }

  return { winner: clientOnboarding, older: serverOnboarding }
}

export function mergeOnboarding(
  serverOnboarding: ProfileOnboardingState | null,
  clientOnboarding: ProfileOnboardingState | null,
): ProfileOnboardingState | null {
  if (!serverOnboarding && !clientOnboarding) return null
  if (!serverOnboarding) {
    return {
      ...clientOnboarding!,
      updatedAt: new Date().toISOString(),
    }
  }
  if (!clientOnboarding) {
    return {
      ...serverOnboarding,
      updatedAt: new Date().toISOString(),
    }
  }

  const { winner, older } = pickOnboardingWinner(serverOnboarding, clientOnboarding)

  return {
    currentStep: winner.currentStep ?? older.currentStep,
    selectedRole: winner.selectedRole ?? older.selectedRole,
    selectedGoal: winner.selectedGoal ?? older.selectedGoal,
    journey: winner.journey ?? older.journey,
    isComplete: winner.isComplete || older.isComplete,
    completedAt: maxIso(winner.completedAt, older.completedAt),
    updatedAt: new Date().toISOString(),
  }
}

export function mergeFiles(
  serverFiles: Record<string, VaultFileMetadata>,
  clientFiles: Record<string, VaultFileMetadata>,
): Record<string, VaultFileMetadata> {
  return {
    ...clientFiles,
    ...serverFiles,
  }
}

function mergeContextOverride(
  serverOverride: PersonalizationContextOverride | null,
  clientOverride: PersonalizationContextOverride | null,
): PersonalizationContextOverride | null {
  const winner = pickLatestByUpdatedAt(serverOverride, clientOverride)
  if (!winner) {
    return null
  }

  return {
    role: winner.role,
    goal: winner.goal,
    updatedAt: winner.updatedAt ?? new Date().toISOString(),
  }
}

function mergeDismissals(
  serverDismissed: Record<string, PersonalizationDismissal>,
  clientDismissed: Record<string, PersonalizationDismissal>,
): Record<string, PersonalizationDismissal> {
  const merged: Record<string, PersonalizationDismissal> = {}

  for (const recommendationId of new Set([
    ...Object.keys(serverDismissed),
    ...Object.keys(clientDismissed),
  ])) {
    const winner = pickLatestByUpdatedAt(
      serverDismissed[recommendationId] ?? null,
      clientDismissed[recommendationId] ?? null,
    )

    if (winner) {
      merged[recommendationId] = {
        until: winner.until,
        updatedAt: winner.updatedAt,
      }
    }
  }

  return merged
}

function mergeSurfaceState(
  serverSurface: SurfacePersonalizationState,
  clientSurface: SurfacePersonalizationState,
): SurfacePersonalizationState {
  const winner = pickLatestByUpdatedAt(serverSurface, clientSurface) ?? serverSurface
  return {
    lastSeenAt: winner.lastSeenAt,
    lastRecommendationIds: [...winner.lastRecommendationIds],
    updatedAt: winner.updatedAt,
  }
}

export function mergePersonalization(
  serverPersonalization: PersonalizationState | null,
  clientPersonalization: PersonalizationState | null,
): PersonalizationState {
  const serverState = serverPersonalization ?? createEmptyPersonalizationState()
  const clientState = clientPersonalization ?? createEmptyPersonalizationState()
  const mergedUpdatedAtTs = Math.max(
    toTimestamp(serverState.updatedAt),
    toTimestamp(clientState.updatedAt),
  )

  const surfaces = PERSONALIZATION_SURFACES.reduce(
    (acc, surfaceId) => {
      acc[surfaceId] = mergeSurfaceState(
        serverState.surfaces[surfaceId],
        clientState.surfaces[surfaceId],
      )
      return acc
    },
    {} as Record<PersonalizationSurfaceId, SurfacePersonalizationState>,
  )

  return {
    version: 1,
    updatedAt:
      mergedUpdatedAtTs > 0 ? new Date(mergedUpdatedAtTs).toISOString() : new Date().toISOString(),
    contextOverride: mergeContextOverride(
      serverState.contextOverride,
      clientState.contextOverride,
    ),
    dismissed: mergeDismissals(serverState.dismissed, clientState.dismissed),
    surfaces,
  }
}

export function mergeProfileState(
  serverStateInput: ProfileState | null,
  clientStateInput: ProfileState | null,
): ProfileState {
  const serverState = serverStateInput ?? createEmptyProfileState()
  const clientState = clientStateInput ?? createEmptyProfileState()

  return {
    version: Math.max(serverState.version, clientState.version),
    updatedAt: new Date().toISOString(),
    onboarding: mergeOnboarding(serverState.onboarding, clientState.onboarding),
    progress: mergeProgress(serverState.progress, clientState.progress),
    files: mergeFiles(serverState.files, clientState.files),
    personalization: mergePersonalization(
      serverState.personalization,
      clientState.personalization,
    ),
  }
}

export function normalizeIncomingProfileState(input: unknown): ProfileState | null {
  if (!input || typeof input !== 'object') {
    return null
  }

  const state = normalizeProfileState(input)
  return state
}
