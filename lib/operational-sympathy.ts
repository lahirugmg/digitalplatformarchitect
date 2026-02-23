// Operational Sympathy Checklist Data and Scoring Logic

export interface ChecklistItem {
  id: string
  element: string
  weight: number
  guidance: string
  category: 'design' | 'reliability' | 'observability' | 'operations' | 'security' | 'cost' | 'culture'
}

export interface ChecklistScore {
  itemId: string
  score: number // 0-5
}

export interface ScoreBand {
  label: string
  min: number
  max: number
}

export interface ChecklistRiskGap {
  itemId: string
  gap: number
  weightedGap: number
}

export interface ChecklistResult {
  totalScore: number // 0-100 weighted
  maxScore: number // always 100
  percentage: number // 0-100
  interpretation: string
  band: ScoreBand
  categoryScores: Record<string, { score: number; max: number }>
  topRisks: ChecklistRiskGap[]
}

export const SCORE_BANDS: ScoreBand[] = [
  {
    min: 85,
    max: 100,
    label: 'Strong Operational Sympathy',
  },
  {
    min: 70,
    max: 84,
    label: 'Acceptable, but risks exist',
  },
  {
    min: 50,
    max: 69,
    label: 'Incidents likely',
  },
  {
    min: 0,
    max: 49,
    label: 'High risk',
  },
]

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'production-aware',
    element: 'Production-Aware Design',
    weight: 10,
    guidance: 'Is production environment, deployment, rollback, and runtime behavior clearly understood and designed for?',
    category: 'design',
  },
  {
    id: 'load-scale',
    element: 'Load and Scale Consciousness',
    weight: 15,
    guidance: 'Does the design explicitly handle peak load, burst traffic, limits, and back-pressure?',
    category: 'reliability',
  },
  {
    id: 'failure-aware',
    element: 'Failure-Aware Architecture',
    weight: 15,
    guidance: 'Are failure modes identified and handled with graceful degradation instead of catastrophic failure?',
    category: 'reliability',
  },
  {
    id: 'observability',
    element: 'Built-In Observability',
    weight: 15,
    guidance: 'Are meaningful metrics, logs, traces, and actionable alerts designed into the system?',
    category: 'observability',
  },
  {
    id: 'operability',
    element: 'Operability and Recovery',
    weight: 15,
    guidance: 'Can operators mitigate, rollback, and recover quickly without code changes?',
    category: 'operations',
  },
  {
    id: 'security-runtime',
    element: 'Security as a Runtime Concern',
    weight: 10,
    guidance: 'Are security failures detectable, credentials rotatable, and blast radius controlled at runtime?',
    category: 'security',
  },
  {
    id: 'cost-awareness',
    element: 'Cost Awareness by Design',
    weight: 10,
    guidance: 'Is cost behavior under scale understood, bounded, and monitored?',
    category: 'cost',
  },
  {
    id: 'runbook-driven',
    element: 'Runbook-Driven Thinking',
    weight: 5,
    guidance: 'Are known failure scenarios documented with clear diagnosis and remediation steps?',
    category: 'operations',
  },
  {
    id: 'shared-ownership',
    element: 'Shared Ownership of Outcomes',
    weight: 5,
    guidance: 'Do architects and developers share accountability for production incidents and outcomes?',
    category: 'culture',
  },
]

const totalWeight = CHECKLIST_ITEMS.reduce((sum, item) => sum + item.weight, 0)
if (totalWeight !== 100) {
  console.warn(`Checklist weights sum to ${totalWeight}, expected 100`)
}

export function clampChecklistScore(score: number): number {
  if (!Number.isFinite(score)) {
    return 0
  }

  return Math.min(5, Math.max(0, Math.round(score)))
}

export function createDefaultChecklistScores(): ChecklistScore[] {
  return CHECKLIST_ITEMS.map((item) => ({ itemId: item.id, score: 0 }))
}

export function toChecklistScoreMap(scores: ChecklistScore[]): Record<string, number> {
  const map: Record<string, number> = {}

  for (const item of CHECKLIST_ITEMS) {
    map[item.id] = 0
  }

  for (const score of scores) {
    map[score.itemId] = clampChecklistScore(score.score)
  }

  return map
}

export function toChecklistScores(scoreMap: Record<string, number>): ChecklistScore[] {
  return CHECKLIST_ITEMS.map((item) => ({
    itemId: item.id,
    score: clampChecklistScore(scoreMap[item.id] ?? 0),
  }))
}

export function getScoreBand(percentage: number): ScoreBand {
  return (
    SCORE_BANDS.find((band) => percentage >= band.min && percentage <= band.max) ??
    SCORE_BANDS[SCORE_BANDS.length - 1]
  )
}

/**
 * Calculate weighted score for the entire checklist.
 */
export function calculateChecklistScore(scores: ChecklistScore[]): ChecklistResult {
  const scoreMap = toChecklistScoreMap(scores)

  let totalScore = 0
  const categoryScores: Record<string, { score: number; max: number }> = {}
  const topRisks: ChecklistRiskGap[] = []

  for (const item of CHECKLIST_ITEMS) {
    const score = clampChecklistScore(scoreMap[item.id] ?? 0)
    const weightedScore = (score / 5) * item.weight // Convert 0-5 to 0-weight
    totalScore += weightedScore

    if (!categoryScores[item.category]) {
      categoryScores[item.category] = { score: 0, max: 0 }
    }
    categoryScores[item.category].score += weightedScore
    categoryScores[item.category].max += item.weight

    const gap = 5 - score
    const weightedGap = (gap / 5) * item.weight
    if (weightedGap > 0) {
      topRisks.push({
        itemId: item.id,
        gap,
        weightedGap: Math.round(weightedGap * 10) / 10,
      })
    }
  }

  const roundedScore = Math.round(totalScore * 10) / 10
  const percentage = Math.round(roundedScore)
  const band = getScoreBand(percentage)

  return {
    totalScore: roundedScore,
    maxScore: 100,
    percentage,
    interpretation: band.label,
    band,
    categoryScores,
    topRisks: topRisks.sort((left, right) => {
      if (right.weightedGap !== left.weightedGap) {
        return right.weightedGap - left.weightedGap
      }

      return right.gap - left.gap
    }),
  }
}

/**
 * Get color token based on score percentage.
 */
export function getScoreColor(percentage: number): string {
  if (percentage >= 85) return 'green'
  if (percentage >= 70) return 'blue'
  if (percentage >= 50) return 'yellow'
  return 'red'
}

/**
 * Get category color.
 */
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    design: 'blue',
    reliability: 'blue',
    observability: 'blue',
    operations: 'blue',
    security: 'red',
    cost: 'yellow',
    culture: 'slate',
  }
  return colors[category] || 'slate'
}
