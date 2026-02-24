import {
  findMilestoneByPath,
  getMilestoneById,
  isKnownLearningPath,
  normalizeLearningPath,
  PROGRESS_MILESTONE_CATALOG,
} from '@/lib/progress/catalog'
import type {
  LearningActivityKind,
  LearningMilestoneState,
  LearningProgressSnapshot,
  LearningProgressSource,
  LearningProgressState,
  LearningStage,
  ProgressMilestone,
} from '@/lib/progress/types'

const ACTIVITY_CAP = 50
const VISIT_DEDUPE_HOURS = 12

function parseIso(value: string | undefined): number {
  if (!value) {
    return 0
  }

  const parsed = Date.parse(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function statusWeight(status: LearningMilestoneState['status']): number {
  if (status === 'completed') {
    return 2
  }

  if (status === 'in_progress') {
    return 1
  }

  return 0
}

function copyMilestones(milestones: LearningProgressState['milestones']): LearningProgressState['milestones'] {
  return Object.fromEntries(
    Object.entries(milestones).map(([milestoneId, state]) => [milestoneId, { ...state }]),
  )
}

function getMilestoneState(
  state: LearningProgressState,
  milestoneId: string,
): LearningMilestoneState {
  return state.milestones[milestoneId] ?? { status: 'not_started' }
}

function addActivity(
  state: LearningProgressState,
  params: {
    kind: LearningActivityKind
    path: string
    milestoneId?: string
    at: string
  },
): LearningProgressState {
  const event = {
    id: `${params.kind}:${params.path}:${params.milestoneId ?? 'none'}:${params.at}`,
    kind: params.kind,
    path: params.path,
    milestoneId: params.milestoneId,
    at: params.at,
  }

  const activity = [event, ...state.activity]
    .sort((left, right) => parseIso(right.at) - parseIso(left.at))
    .slice(0, ACTIVITY_CAP)

  return {
    ...state,
    activity,
    updatedAt: params.at,
  }
}

function hasRecentVisit(
  state: LearningProgressState,
  path: string,
  milestoneId: string | undefined,
  at: string,
): boolean {
  const nowTs = parseIso(at)
  if (nowTs === 0) {
    return false
  }

  const thresholdMs = VISIT_DEDUPE_HOURS * 60 * 60 * 1000

  return state.activity.some((item) => {
    if (item.kind !== 'visit') {
      return false
    }

    if (item.path !== path) {
      return false
    }

    if ((item.milestoneId ?? undefined) !== milestoneId) {
      return false
    }

    const diff = nowTs - parseIso(item.at)
    return diff >= 0 && diff < thresholdMs
  })
}

export function createEmptyLearningProgressState(now = new Date().toISOString()): LearningProgressState {
  return {
    version: 1,
    stage: 'early',
    milestones: {},
    activity: [],
    migration: {},
    updatedAt: now,
  }
}

export function deriveLearningStageFromMilestones(
  milestones: Record<string, LearningMilestoneState>,
  catalog: ProgressMilestone[] = PROGRESS_MILESTONE_CATALOG,
): LearningStage {
  const stageMilestones = catalog.filter((item) => item.countsTowardStage !== false)
  if (stageMilestones.length === 0) {
    return 'early'
  }

  const completed = stageMilestones.filter((milestone) => {
    const state = milestones[milestone.id]
    return state?.status === 'completed'
  }).length

  const percentage = (completed / stageMilestones.length) * 100
  if (percentage < 35) {
    return 'early'
  }

  if (percentage < 75) {
    return 'mid'
  }

  return 'late'
}

export function getLearningProgressSnapshot(
  state: LearningProgressState,
  catalog: ProgressMilestone[] = PROGRESS_MILESTONE_CATALOG,
): LearningProgressSnapshot {
  const stageMilestones = catalog.filter((item) => item.countsTowardStage !== false)
  const totalMilestones = stageMilestones.length

  const completedMilestones = stageMilestones.filter((item) => {
    return getMilestoneState(state, item.id).status === 'completed'
  }).length

  const inProgressMilestones = stageMilestones.filter((item) => {
    return getMilestoneState(state, item.id).status === 'in_progress'
  }).length

  const completionPercentage = totalMilestones === 0
    ? 0
    : Math.round((completedMilestones / totalMilestones) * 100)

  return {
    stage: deriveLearningStageFromMilestones(state.milestones, catalog),
    totalMilestones,
    completedMilestones,
    inProgressMilestones,
    completionPercentage,
  }
}

export function trackRouteVisit(
  state: LearningProgressState,
  rawPath: string,
  source: LearningProgressSource = 'route',
  at = new Date().toISOString(),
): LearningProgressState {
  const path = normalizeLearningPath(rawPath)
  const milestone = findMilestoneByPath(path)

  if (!milestone && !isKnownLearningPath(path)) {
    return state
  }

  if (hasRecentVisit(state, path, milestone?.id, at)) {
    return state
  }

  const milestones = copyMilestones(state.milestones)

  if (milestone) {
    const current = getMilestoneState(state, milestone.id)
    if (current.status === 'not_started') {
      milestones[milestone.id] = {
        status: 'in_progress',
        startedAt: current.startedAt ?? at,
        source,
      }
    }
  }

  const withVisit = addActivity(
    {
      ...state,
      milestones,
      stage: deriveLearningStageFromMilestones(milestones),
      updatedAt: at,
    },
    {
      kind: 'visit',
      path,
      milestoneId: milestone?.id,
      at,
    },
  )

  return withVisit
}

export function trackRecommendationStart(
  state: LearningProgressState,
  rawPath: string,
  at = new Date().toISOString(),
): LearningProgressState {
  const path = normalizeLearningPath(rawPath)
  const milestone = findMilestoneByPath(path)

  if (!milestone && !isKnownLearningPath(path)) {
    return state
  }

  const milestones = copyMilestones(state.milestones)

  if (milestone) {
    const current = getMilestoneState(state, milestone.id)
    if (current.status === 'not_started') {
      milestones[milestone.id] = {
        status: 'in_progress',
        startedAt: at,
        source: 'recommendation',
      }
    }
  }

  return addActivity(
    {
      ...state,
      milestones,
      stage: deriveLearningStageFromMilestones(milestones),
      updatedAt: at,
    },
    {
      kind: 'start',
      path,
      milestoneId: milestone?.id,
      at,
    },
  )
}

export function markMilestoneCompleted(
  state: LearningProgressState,
  milestoneId: string,
  at = new Date().toISOString(),
  source: LearningProgressSource = 'manual',
): LearningProgressState {
  const milestone = getMilestoneById(milestoneId)
  if (!milestone) {
    return state
  }

  const current = getMilestoneState(state, milestoneId)
  if (current.status === 'completed') {
    return state
  }

  const milestones = copyMilestones(state.milestones)
  milestones[milestoneId] = {
    status: 'completed',
    startedAt: current.startedAt ?? at,
    completedAt: at,
    source,
  }

  return addActivity(
    {
      ...state,
      milestones,
      stage: deriveLearningStageFromMilestones(milestones),
      updatedAt: at,
    },
    {
      kind: 'complete',
      path: normalizeLearningPath(milestone.href),
      milestoneId,
      at,
    },
  )
}

export function getRecentActivity(state: LearningProgressState, limit = 10): LearningProgressState['activity'] {
  return [...state.activity]
    .sort((left, right) => parseIso(right.at) - parseIso(left.at))
    .slice(0, limit)
}

export function getMilestoneTimeline(
  state: LearningProgressState,
  catalog: ProgressMilestone[] = PROGRESS_MILESTONE_CATALOG,
): Array<ProgressMilestone & { state: LearningMilestoneState }> {
  return catalog.map((milestone) => ({
    ...milestone,
    state: getMilestoneState(state, milestone.id),
  }))
}

export function getNextMilestones(
  state: LearningProgressState,
  limit = 4,
  catalog: ProgressMilestone[] = PROGRESS_MILESTONE_CATALOG,
): Array<ProgressMilestone & { state: LearningMilestoneState }> {
  return getMilestoneTimeline(state, catalog)
    .filter((item) => item.countsTowardStage !== false)
    .filter((item) => item.state.status !== 'completed')
    .sort((left, right) => {
      const statusDelta = statusWeight(right.state.status) - statusWeight(left.state.status)
      if (statusDelta !== 0) {
        return statusDelta
      }

      return catalog.findIndex((item) => item.id === left.id) - catalog.findIndex((item) => item.id === right.id)
    })
    .slice(0, limit)
}
