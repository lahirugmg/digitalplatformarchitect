import { PROFILE_STATE_VERSION } from '@/lib/profile/constants'
import type { Persona } from '@/lib/architecture-playground/types'
import type { GoalId } from '@/lib/onboarding/types'

export type OnboardingStep = 'role' | 'goal' | 'journey'
export type PersonalizationSurfaceId =
  | 'home'
  | 'playgrounds'
  | 'architecture-playground'
  | 'production-readiness'

export interface PersonalizationContextOverride {
  role: Persona | null
  goal: GoalId | null
  updatedAt: string
}

export interface PersonalizationDismissal {
  until: string
  updatedAt: string
}

export interface SurfacePersonalizationState {
  lastSeenAt?: string
  lastRecommendationIds: string[]
  updatedAt: string
}

export interface PersonalizationState {
  version: 1
  updatedAt: string
  contextOverride: PersonalizationContextOverride | null
  dismissed: Record<string, PersonalizationDismissal>
  surfaces: Record<PersonalizationSurfaceId, SurfacePersonalizationState>
}

const VALID_PERSONAS: readonly Persona[] = [
  'business',
  'product',
  'ba',
  'uxdesigner',
  'ea',
  'security',
  'data',
  'implementation',
  'qa',
]

const VALID_GOALS: readonly GoalId[] = [
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
]

const PERSONA_SET = new Set<string>(VALID_PERSONAS)
const GOAL_SET = new Set<string>(VALID_GOALS)

export const PERSONALIZATION_SURFACES: PersonalizationSurfaceId[] = [
  'home',
  'playgrounds',
  'architecture-playground',
  'production-readiness',
]

export interface ProfileProgressState {
  userId: string
  completedNodes: string[]
  unlockedNodes: string[]
  tokens: number
  lastTokenGrant: string
  streakDays: number
  lastActivityDate: string
  totalXP: number
  level: number
  completedAtByNode?: Record<string, string>
  updatedAt?: string
}

export interface ProfileOnboardingState {
  currentStep: OnboardingStep
  selectedRole: string | null
  selectedGoal: string | null
  journey: unknown | null
  isComplete: boolean
  completedAt?: string
  updatedAt?: string
}

export interface VaultFileMetadata {
  fileId: string
  name: string
  mime: string
  size: number
  createdAt: string
  blobPath: string
  blobUrl?: string
  checksum: string
}

export interface ProfileState {
  version: number
  updatedAt: string
  onboarding: ProfileOnboardingState | null
  progress: ProfileProgressState | null
  files: Record<string, VaultFileMetadata>
  personalization: PersonalizationState
}

export interface ProfileHint {
  profileIdPrefix: string
  updatedAt: string
}

export interface ProfileCacheEnvelope {
  state: ProfileState
  hint: ProfileHint | null
}

function coerceString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback
}

function coerceNumber(value: unknown, fallback = 0): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

function coerceStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is string => typeof item === 'string')
}

function coerceRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {}
  }
  return value as Record<string, unknown>
}

export function createEmptyProfileState(): ProfileState {
  return {
    version: PROFILE_STATE_VERSION,
    updatedAt: new Date().toISOString(),
    onboarding: null,
    progress: null,
    files: {},
    personalization: createEmptyPersonalizationState(),
  }
}

export function createEmptySurfacePersonalizationState(): SurfacePersonalizationState {
  return {
    lastRecommendationIds: [],
    updatedAt: new Date().toISOString(),
  }
}

export function createEmptyPersonalizationState(): PersonalizationState {
  const surfaces = PERSONALIZATION_SURFACES.reduce(
    (acc, surfaceId) => {
      acc[surfaceId] = createEmptySurfacePersonalizationState()
      return acc
    },
    {} as Record<PersonalizationSurfaceId, SurfacePersonalizationState>,
  )

  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    contextOverride: null,
    dismissed: {},
    surfaces,
  }
}

function normalizePersona(input: unknown): Persona | null {
  if (typeof input !== 'string') {
    return null
  }
  return PERSONA_SET.has(input) ? (input as Persona) : null
}

function normalizeGoalId(input: unknown): GoalId | null {
  if (typeof input !== 'string') {
    return null
  }
  return GOAL_SET.has(input) ? (input as GoalId) : null
}

export function normalizeContextOverride(input: unknown): PersonalizationContextOverride | null {
  if (!input || typeof input !== 'object') {
    return null
  }

  const value = input as Record<string, unknown>
  return {
    role: normalizePersona(value.role),
    goal: normalizeGoalId(value.goal),
    updatedAt: coerceString(value.updatedAt, new Date().toISOString()),
  }
}

export function normalizePersonalizationDismissal(input: unknown): PersonalizationDismissal | null {
  if (!input || typeof input !== 'object') {
    return null
  }

  const value = input as Record<string, unknown>
  const until = coerceString(value.until)
  if (!until) {
    return null
  }

  return {
    until,
    updatedAt: coerceString(value.updatedAt, new Date().toISOString()),
  }
}

export function normalizeSurfacePersonalizationState(
  input: unknown,
): SurfacePersonalizationState {
  const value = coerceRecord(input)

  return {
    lastSeenAt: typeof value.lastSeenAt === 'string' ? value.lastSeenAt : undefined,
    lastRecommendationIds: coerceStringArray(value.lastRecommendationIds),
    updatedAt: coerceString(value.updatedAt, new Date().toISOString()),
  }
}

export function normalizePersonalizationState(input: unknown): PersonalizationState {
  const defaults = createEmptyPersonalizationState()
  if (!input || typeof input !== 'object') {
    return defaults
  }

  const value = input as Record<string, unknown>
  const dismissedRaw = coerceRecord(value.dismissed)
  const dismissed: Record<string, PersonalizationDismissal> = {}

  for (const [recommendationId, dismissal] of Object.entries(dismissedRaw)) {
    const normalizedDismissal = normalizePersonalizationDismissal(dismissal)
    if (normalizedDismissal) {
      dismissed[recommendationId] = normalizedDismissal
    }
  }

  const surfacesRaw = coerceRecord(value.surfaces)
  const surfaces = PERSONALIZATION_SURFACES.reduce(
    (acc, surfaceId) => {
      acc[surfaceId] = normalizeSurfacePersonalizationState(
        surfacesRaw[surfaceId] ?? defaults.surfaces[surfaceId],
      )
      return acc
    },
    {} as Record<PersonalizationSurfaceId, SurfacePersonalizationState>,
  )

  return {
    version: 1,
    updatedAt: coerceString(value.updatedAt, defaults.updatedAt),
    contextOverride: normalizeContextOverride(value.contextOverride),
    dismissed,
    surfaces,
  }
}

export function normalizeProgressState(input: unknown): ProfileProgressState | null {
  if (!input || typeof input !== 'object') {
    return null
  }

  const value = input as Record<string, unknown>
  const completedAtByNodeRaw = coerceRecord(value.completedAtByNode)
  const completedAtByNode: Record<string, string> = {}

  for (const [nodeId, completedAt] of Object.entries(completedAtByNodeRaw)) {
    if (typeof completedAt === 'string') {
      completedAtByNode[nodeId] = completedAt
    }
  }

  return {
    userId: coerceString(value.userId, 'default'),
    completedNodes: coerceStringArray(value.completedNodes),
    unlockedNodes: coerceStringArray(value.unlockedNodes),
    tokens: coerceNumber(value.tokens, 0),
    lastTokenGrant: coerceString(value.lastTokenGrant, new Date().toISOString()),
    streakDays: coerceNumber(value.streakDays, 0),
    lastActivityDate: coerceString(value.lastActivityDate, new Date().toISOString()),
    totalXP: coerceNumber(value.totalXP, 0),
    level: coerceNumber(value.level, 1),
    completedAtByNode,
    updatedAt: typeof value.updatedAt === 'string' ? value.updatedAt : undefined,
  }
}

export function normalizeOnboardingState(input: unknown): ProfileOnboardingState | null {
  if (!input || typeof input !== 'object') {
    return null
  }

  const value = input as Record<string, unknown>
  const currentStep =
    value.currentStep === 'role' || value.currentStep === 'goal' || value.currentStep === 'journey'
      ? value.currentStep
      : 'role'

  return {
    currentStep,
    selectedRole: typeof value.selectedRole === 'string' ? value.selectedRole : null,
    selectedGoal: typeof value.selectedGoal === 'string' ? value.selectedGoal : null,
    journey: value.journey ?? null,
    isComplete: Boolean(value.isComplete),
    completedAt: typeof value.completedAt === 'string' ? value.completedAt : undefined,
    updatedAt: typeof value.updatedAt === 'string' ? value.updatedAt : undefined,
  }
}

export function normalizeFileMetadata(input: unknown): VaultFileMetadata | null {
  if (!input || typeof input !== 'object') {
    return null
  }

  const value = input as Record<string, unknown>
  const fileId = coerceString(value.fileId)
  const blobPath = coerceString(value.blobPath)

  if (!fileId || !blobPath) {
    return null
  }

  return {
    fileId,
    name: coerceString(value.name, 'file'),
    mime: coerceString(value.mime, 'application/octet-stream'),
    size: coerceNumber(value.size, 0),
    createdAt: coerceString(value.createdAt, new Date().toISOString()),
    blobPath,
    blobUrl: typeof value.blobUrl === 'string' ? value.blobUrl : undefined,
    checksum: coerceString(value.checksum),
  }
}

export function normalizeProfileState(input: unknown): ProfileState {
  if (!input || typeof input !== 'object') {
    return createEmptyProfileState()
  }

  const value = input as Record<string, unknown>
  const filesRecord = coerceRecord(value.files)
  const files: Record<string, VaultFileMetadata> = {}

  for (const [fileId, metadata] of Object.entries(filesRecord)) {
    const normalized = normalizeFileMetadata(metadata)
    if (normalized) {
      files[fileId] = normalized
    }
  }

  return {
    version: coerceNumber(value.version, PROFILE_STATE_VERSION),
    updatedAt: coerceString(value.updatedAt, new Date().toISOString()),
    onboarding: normalizeOnboardingState(value.onboarding),
    progress: normalizeProgressState(value.progress),
    files,
    personalization: normalizePersonalizationState(value.personalization),
  }
}

export function profileHintFromProfileId(profileId: string): ProfileHint {
  return {
    profileIdPrefix: profileId.slice(0, 12),
    updatedAt: new Date().toISOString(),
  }
}
