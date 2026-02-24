import { PROGRESS_MILESTONE_CATALOG } from '@/lib/progress/catalog'
import { createEmptyLearningProgressState, deriveLearningStageFromMilestones } from '@/lib/progress/tracker'
import type {
  LearningMilestoneState,
  LearningProgressActivity,
  LearningProgressState,
} from '@/lib/progress/types'
import type { ProfileProgressState } from '@/lib/profile/types'

const LEGACY_PREFIX_MAP: Record<string, string> = {
  'int-': 'run-enterprise-integration',
  'data-': 'design-data-pipeline',
  'cloud-': 'plan-capacity',
  'sec-': 'assess-operational-sympathy',
  'res-': 'complete-production-readiness-workflow',
  'obs-': 'complete-production-readiness-workflow',
}

function resolveMilestoneForLegacyNode(nodeId: string): string | undefined {
  return Object.entries(LEGACY_PREFIX_MAP).find(([prefix]) => nodeId.startsWith(prefix))?.[1]
}

function isMeaningfulLegacyProgress(legacyProgress: ProfileProgressState | null): boolean {
  if (!legacyProgress) {
    return false
  }

  return legacyProgress.completedNodes.length > 0 || legacyProgress.unlockedNodes.length > 0
}

function parseIso(value: string | undefined): number {
  if (!value) {
    return 0
  }

  const parsed = Date.parse(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function maxIso(a: string | undefined, b: string | undefined): string | undefined {
  const aTs = parseIso(a)
  const bTs = parseIso(b)

  if (aTs === 0 && bTs === 0) {
    return undefined
  }

  return aTs >= bTs ? a : b
}

function applyLegacyMilestone(
  milestones: Record<string, LearningMilestoneState>,
  milestoneId: string,
  status: LearningMilestoneState['status'],
  at: string,
): void {
  const existing = milestones[milestoneId]

  if (!existing) {
    milestones[milestoneId] = {
      status,
      startedAt: at,
      completedAt: status === 'completed' ? at : undefined,
      source: 'migration',
    }
    return
  }

  if (existing.status === 'completed') {
    return
  }

  if (status === 'completed') {
    milestones[milestoneId] = {
      ...existing,
      status: 'completed',
      startedAt: existing.startedAt ?? at,
      completedAt: maxIso(existing.completedAt, at) ?? at,
      source: 'migration',
    }
    return
  }

  if (existing.status === 'not_started') {
    milestones[milestoneId] = {
      ...existing,
      status: 'in_progress',
      startedAt: existing.startedAt ?? at,
      source: 'migration',
    }
  }
}

export function migrateLegacySkillTreeProgressToLearningProgress(
  legacyProgress: ProfileProgressState | null,
  existingLearningProgress: LearningProgressState | null,
  now = new Date().toISOString(),
): LearningProgressState | null {
  if (existingLearningProgress) {
    return existingLearningProgress
  }

  if (!isMeaningfulLegacyProgress(legacyProgress)) {
    return null
  }

  const base = createEmptyLearningProgressState(now)
  const milestones = { ...base.milestones }

  const completedAtByNode = legacyProgress?.completedAtByNode ?? {}

  for (const nodeId of legacyProgress?.unlockedNodes ?? []) {
    const milestoneId = resolveMilestoneForLegacyNode(nodeId)
    if (!milestoneId) {
      continue
    }

    const startedAt = completedAtByNode[nodeId] ?? legacyProgress?.lastActivityDate ?? now
    applyLegacyMilestone(milestones, milestoneId, 'in_progress', startedAt)
  }

  for (const nodeId of legacyProgress?.completedNodes ?? []) {
    const milestoneId = resolveMilestoneForLegacyNode(nodeId)
    if (!milestoneId) {
      continue
    }

    const completedAt = completedAtByNode[nodeId] ?? legacyProgress?.lastActivityDate ?? now
    applyLegacyMilestone(milestones, milestoneId, 'completed', completedAt)
  }

  const activity: LearningProgressActivity[] = Object.entries(milestones)
    .filter(([, milestone]) => milestone.status !== 'not_started')
    .map(([milestoneId, milestone]) => {
      const milestoneDef = PROGRESS_MILESTONE_CATALOG.find((item) => item.id === milestoneId)
      const timestamp = milestone.completedAt ?? milestone.startedAt ?? now
      const kind: LearningProgressActivity['kind'] =
        milestone.status === 'completed' ? 'complete' : 'start'

      return {
        id: `migration:${milestoneId}:${timestamp}`,
        kind,
        path: milestoneDef?.href ?? '/progress',
        milestoneId,
        at: timestamp,
      }
    })
    .sort((left, right) => parseIso(right.at) - parseIso(left.at))

  return {
    ...base,
    milestones,
    activity,
    stage: deriveLearningStageFromMilestones(milestones),
    migration: {
      legacySkillTreeImportedAt: now,
    },
    updatedAt: now,
  }
}
