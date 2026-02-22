import { getCatalogForSurface } from '@/lib/personalization/catalog'
import {
  getGoalLabel,
  getPersonaLabel,
} from '@/lib/personalization/context'
import type {
  BuildRecommendationsInput,
  PersonalizationCatalogItem,
  ProgressSnapshot,
  RankedRecommendation,
  RecommendationScoreBreakdown,
} from '@/lib/personalization/types'

const ROLE_MATCH_SCORE = 35
const GOAL_MATCH_SCORE = 30
const PROGRESS_ALIGNMENT_SCORE = 20
const NOVELTY_SCORE = 10
const PRIORITY_SCORE = 5
const DISMISSAL_PENALTY = -1000
const HIGH_PRIORITY_THRESHOLD = 80

function toTimestamp(value: string | undefined): number {
  if (!value) {
    return 0
  }

  const parsed = Date.parse(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function isDismissed(itemId: string, dismissed: Record<string, { until: string }>, now: Date): boolean {
  const record = dismissed[itemId]
  if (!record) {
    return false
  }

  const untilTs = toTimestamp(record.until)
  return untilTs > now.getTime()
}

function getProgressSnapshot(completedNodes: string[] | undefined): ProgressSnapshot {
  return {
    completedCount: completedNodes?.length ?? 0,
    progress: null,
  }
}

function alignsWithProgress(item: PersonalizationCatalogItem, snapshot: ProgressSnapshot): boolean {
  const hints = item.progressHints
  if (!hints) {
    return false
  }

  const completedCount = snapshot.completedCount

  if (typeof hints.minCompletedLessons === 'number' && completedCount < hints.minCompletedLessons) {
    return false
  }

  if (typeof hints.maxCompletedLessons === 'number' && completedCount > hints.maxCompletedLessons) {
    return false
  }

  if (!hints.stage) {
    return true
  }

  if (hints.stage === 'early') {
    return completedCount <= 4
  }

  if (hints.stage === 'mid') {
    return completedCount >= 3 && completedCount <= 10
  }

  return completedCount >= 8
}

function buildReasonChips(
  recommendation: PersonalizationCatalogItem,
  context: BuildRecommendationsInput['context'],
  breakdown: RecommendationScoreBreakdown,
): string[] {
  const chips: string[] = []

  if (breakdown.roleMatch > 0 && context.role) {
    chips.push(`Role: ${getPersonaLabel(context.role)}`)
  }

  if (breakdown.goalMatch > 0 && context.goal) {
    chips.push(`Goal: ${getGoalLabel(context.goal)}`)
  }

  if (breakdown.progressAlignment > 0) {
    chips.push('Aligned to current progress')
  }

  if (breakdown.novelty > 0) {
    chips.push('New for you')
  }

  if (breakdown.productPriority > 0) {
    chips.push('Team priority')
  }

  if (chips.length === 0) {
    chips.push('Popular starting point')
  }

  return chips.slice(0, 3)
}

function scoreRecommendation(
  recommendation: PersonalizationCatalogItem,
  input: BuildRecommendationsInput,
  lastSeenIds: string[],
  progressSnapshot: ProgressSnapshot,
): RecommendationScoreBreakdown {
  const roleMatch =
    input.context.role && recommendation.roles.includes(input.context.role) ? ROLE_MATCH_SCORE : 0

  const goalMatch =
    input.context.goal && recommendation.goals.includes(input.context.goal) ? GOAL_MATCH_SCORE : 0

  const progressAlignment = alignsWithProgress(recommendation, progressSnapshot)
    ? PROGRESS_ALIGNMENT_SCORE
    : 0

  const novelty = lastSeenIds.includes(recommendation.id) ? 0 : NOVELTY_SCORE

  const productPriority = recommendation.priority >= HIGH_PRIORITY_THRESHOLD ? PRIORITY_SCORE : 0

  const dismissalPenalty = isDismissed(
    recommendation.id,
    input.profileState.personalization.dismissed,
    input.now ?? new Date(),
  )
    ? DISMISSAL_PENALTY
    : 0

  return {
    roleMatch,
    goalMatch,
    progressAlignment,
    novelty,
    productPriority,
    dismissalPenalty,
    total:
      roleMatch +
      goalMatch +
      progressAlignment +
      novelty +
      productPriority +
      dismissalPenalty,
  }
}

export function buildRankedRecommendations(input: BuildRecommendationsInput): RankedRecommendation[] {
  const catalog = getCatalogForSurface(input.surface)
  const now = input.now ?? new Date()
  const surfaceState = input.profileState.personalization.surfaces[input.surface]
  const lastSeenIds = surfaceState?.lastRecommendationIds ?? []
  const progressSnapshot = getProgressSnapshot(input.profileState.progress?.completedNodes)

  return catalog
    .filter((item) => (item.requiresSession ? input.sessionActive : true))
    .map((item) => {
      const score = scoreRecommendation(item, { ...input, now }, lastSeenIds, progressSnapshot)
      return {
        id: item.id,
        surface: item.surface,
        title: item.title,
        description: item.description,
        href: item.href,
        type: item.type,
        priority: item.priority,
        reasonChips: buildReasonChips(item, input.context, score),
        score,
      }
    })
    .filter((item) => item.score.total > DISMISSAL_PENALTY)
    .sort((left, right) => {
      if (right.score.total !== left.score.total) {
        return right.score.total - left.score.total
      }

      if (right.priority !== left.priority) {
        return right.priority - left.priority
      }

      return left.id.localeCompare(right.id)
    })
}
