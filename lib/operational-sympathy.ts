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

export interface ChecklistResult {
  totalScore: number // 0-100 weighted
  maxScore: number // always 100
  percentage: number // 0-100
  interpretation: string
  categoryScores: Record<string, { score: number; max: number }>
}

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'production-aware',
    element: 'Production-Aware Design',
    weight: 10,
    guidance: 'Is production environment, deployment, rollback, and runtime behavior clearly understood and designed for?',
    category: 'design'
  },
  {
    id: 'load-scale',
    element: 'Load and Scale Consciousness',
    weight: 15,
    guidance: 'Does the design explicitly handle peak load, burst traffic, limits, and back-pressure?',
    category: 'reliability'
  },
  {
    id: 'failure-aware',
    element: 'Failure-Aware Architecture',
    weight: 15,
    guidance: 'Are failure modes identified and handled with graceful degradation instead of catastrophic failure?',
    category: 'reliability'
  },
  {
    id: 'observability',
    element: 'Built-In Observability',
    weight: 15,
    guidance: 'Are meaningful metrics, logs, traces, and actionable alerts designed into the system?',
    category: 'observability'
  },
  {
    id: 'operability',
    element: 'Operability and Recovery',
    weight: 15,
    guidance: 'Can operators mitigate, rollback, and recover quickly without code changes?',
    category: 'operations'
  },
  {
    id: 'security-runtime',
    element: 'Security as a Runtime Concern',
    weight: 10,
    guidance: 'Are security failures detectable, credentials rotatable, and blast radius controlled at runtime?',
    category: 'security'
  },
  {
    id: 'cost-awareness',
    element: 'Cost Awareness by Design',
    weight: 10,
    guidance: 'Is cost behavior under scale understood, bounded, and monitored?',
    category: 'cost'
  },
  {
    id: 'runbook-driven',
    element: 'Runbook-Driven Thinking',
    weight: 5,
    guidance: 'Are known failure scenarios documented with clear diagnosis and remediation steps?',
    category: 'operations'
  },
  {
    id: 'shared-ownership',
    element: 'Shared Ownership of Outcomes',
    weight: 5,
    guidance: 'Do architects and developers share accountability for production incidents and outcomes?',
    category: 'culture'
  }
]

// Verify weights sum to 100
const totalWeight = CHECKLIST_ITEMS.reduce((sum, item) => sum + item.weight, 0)
if (totalWeight !== 100) {
  console.warn(`Checklist weights sum to ${totalWeight}, expected 100`)
}

/**
 * Calculate weighted score for the entire checklist
 */
export function calculateChecklistScore(scores: ChecklistScore[]): ChecklistResult {
  const scoreMap = new Map(scores.map(s => [s.itemId, s.score]))

  let totalScore = 0
  const categoryScores: Record<string, { score: number; max: number }> = {}

  for (const item of CHECKLIST_ITEMS) {
    const score = scoreMap.get(item.id) ?? 0
    const weightedScore = (score / 5) * item.weight // Convert 0-5 to 0-weight
    totalScore += weightedScore

    // Track category scores
    if (!categoryScores[item.category]) {
      categoryScores[item.category] = { score: 0, max: 0 }
    }
    categoryScores[item.category].score += weightedScore
    categoryScores[item.category].max += item.weight
  }

  const percentage = Math.round(totalScore)

  return {
    totalScore: Math.round(totalScore * 10) / 10, // Round to 1 decimal
    maxScore: 100,
    percentage,
    interpretation: getInterpretation(percentage),
    categoryScores
  }
}

/**
 * Get interpretation text based on score
 */
function getInterpretation(percentage: number): string {
  if (percentage >= 90) {
    return 'Excellent operational sympathy. This architecture is production-ready with comprehensive operational considerations.'
  } else if (percentage >= 75) {
    return 'Good operational sympathy. Most production concerns are addressed, with minor gaps to close.'
  } else if (percentage >= 60) {
    return 'Moderate operational sympathy. Key operational concerns are present but significant improvements needed.'
  } else if (percentage >= 40) {
    return 'Basic operational sympathy. Critical gaps exist that could impact production reliability.'
  } else if (percentage >= 20) {
    return 'Limited operational sympathy. Major operational concerns are missing. Not recommended for production.'
  } else {
    return 'Insufficient operational sympathy. This architecture lacks essential production-ready characteristics.'
  }
}

/**
 * Get color based on score percentage
 */
export function getScoreColor(percentage: number): string {
  if (percentage >= 90) return 'green'
  if (percentage >= 75) return 'blue'
  if (percentage >= 60) return 'yellow'
  if (percentage >= 40) return 'orange'
  return 'red'
}

/**
 * Get category color
 */
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    design: 'blue',
    reliability: 'purple',
    observability: 'cyan',
    operations: 'green',
    security: 'red',
    cost: 'orange',
    culture: 'pink'
  }
  return colors[category] || 'slate'
}
