// Security Assessment Matrix — data model and scoring logic

export interface SecurityControl {
  id: string
  element: string
  weight: number
  guidance: string
  category: 'identity' | 'network' | 'data' | 'application' | 'cloud' | 'incident' | 'compliance' | 'supply-chain'
}

export interface SecurityControlScore {
  controlId: string
  score: number // 0-5
}

export interface SecurityScoreBand {
  label: string
  min: number
  max: number
}

export interface SecurityRiskGap {
  controlId: string
  gap: number
  weightedGap: number
}

export interface SecurityAssessmentResult {
  totalScore: number
  maxScore: number
  percentage: number
  interpretation: string
  band: SecurityScoreBand
  categoryScores: Record<string, { score: number; max: number }>
  topRisks: SecurityRiskGap[]
}

export const SECURITY_SCORE_BANDS: SecurityScoreBand[] = [
  {
    min: 90,
    max: 100,
    label: 'Strong Security Posture',
  },
  {
    min: 75,
    max: 89,
    label: 'Adequate, with known gaps',
  },
  {
    min: 50,
    max: 74,
    label: 'Significant vulnerabilities present',
  },
  {
    min: 0,
    max: 49,
    label: 'Critical risk',
  },
]

export const SECURITY_CONTROLS: SecurityControl[] = [
  {
    id: 'identity-access',
    element: 'Identity & Access Management',
    weight: 15,
    guidance:
      'Are MFA, RBAC, and least-privilege enforced for all human and service identities? Are access reviews conducted regularly?',
    category: 'identity',
  },
  {
    id: 'network-segmentation',
    element: 'Network Segmentation & Zero Trust',
    weight: 10,
    guidance:
      'Are network boundaries enforced with a Zero Trust model? Is lateral movement blocked between segments without explicit policy?',
    category: 'network',
  },
  {
    id: 'data-encryption',
    element: 'Data Encryption & Classification',
    weight: 15,
    guidance:
      'Is data classified by sensitivity and encrypted at rest and in transit? Are encryption keys managed separately from data?',
    category: 'data',
  },
  {
    id: 'secrets-management',
    element: 'Secrets & Credentials Management',
    weight: 10,
    guidance:
      'Are secrets stored in a dedicated vault with dynamic issuance and automatic rotation? Are static credentials eliminated?',
    category: 'data',
  },
  {
    id: 'application-security',
    element: 'Application Security Testing',
    weight: 10,
    guidance:
      'Are SAST, DAST, and dependency scanning integrated into the CI/CD pipeline? Are findings tracked and resolved within SLAs?',
    category: 'application',
  },
  {
    id: 'vulnerability-management',
    element: 'Vulnerability & Patch Management',
    weight: 10,
    guidance:
      'Is there a process to track CVEs, prioritise critical patches, and measure mean-time-to-remediate across all components?',
    category: 'cloud',
  },
  {
    id: 'incident-detection',
    element: 'Threat Detection & SIEM',
    weight: 10,
    guidance:
      'Are logs centralised and correlated in a SIEM? Do detection rules cover key attack techniques and generate actionable alerts?',
    category: 'incident',
  },
  {
    id: 'incident-response',
    element: 'Incident Response & Recovery',
    weight: 10,
    guidance:
      'Is there a tested incident response plan with defined roles, communication channels, and documented recovery runbooks?',
    category: 'incident',
  },
  {
    id: 'compliance-governance',
    element: 'Compliance & Security Governance',
    weight: 5,
    guidance:
      'Are security policies documented, reviewed annually, and mapped to applicable regulatory requirements (e.g. SOC 2, ISO 27001)?',
    category: 'compliance',
  },
  {
    id: 'supply-chain-security',
    element: 'Supply Chain & Dependency Security',
    weight: 5,
    guidance:
      'Are third-party libraries scanned for known vulnerabilities? Are SBOMs generated and vendor security practices reviewed?',
    category: 'supply-chain',
  },
]

const totalWeight = SECURITY_CONTROLS.reduce((sum, control) => sum + control.weight, 0)
if (totalWeight !== 100) {
  console.warn(`Security control weights sum to ${totalWeight}, expected 100`)
}

export function clampSecurityScore(score: number): number {
  if (!Number.isFinite(score)) {
    return 0
  }

  return Math.min(5, Math.max(0, Math.round(score)))
}

export function createDefaultSecurityScores(): SecurityControlScore[] {
  return SECURITY_CONTROLS.map((control) => ({ controlId: control.id, score: 0 }))
}

export function toSecurityScoreMap(scores: SecurityControlScore[]): Record<string, number> {
  const map: Record<string, number> = {}

  for (const control of SECURITY_CONTROLS) {
    map[control.id] = 0
  }

  for (const score of scores) {
    map[score.controlId] = clampSecurityScore(score.score)
  }

  return map
}

export function toSecurityControlScores(scoreMap: Record<string, number>): SecurityControlScore[] {
  return SECURITY_CONTROLS.map((control) => ({
    controlId: control.id,
    score: clampSecurityScore(scoreMap[control.id] ?? 0),
  }))
}

export function getSecurityScoreBand(percentage: number): SecurityScoreBand {
  return (
    SECURITY_SCORE_BANDS.find((band) => percentage >= band.min && percentage <= band.max) ??
    SECURITY_SCORE_BANDS[SECURITY_SCORE_BANDS.length - 1]
  )
}

export function calculateSecurityScore(scores: SecurityControlScore[]): SecurityAssessmentResult {
  const scoreMap = toSecurityScoreMap(scores)

  let totalScore = 0
  const categoryScores: Record<string, { score: number; max: number }> = {}
  const topRisks: SecurityRiskGap[] = []

  for (const control of SECURITY_CONTROLS) {
    const score = clampSecurityScore(scoreMap[control.id] ?? 0)
    const weightedScore = (score / 5) * control.weight

    totalScore += weightedScore

    if (!categoryScores[control.category]) {
      categoryScores[control.category] = { score: 0, max: 0 }
    }
    categoryScores[control.category].score += weightedScore
    categoryScores[control.category].max += control.weight

    const gap = 5 - score
    const weightedGap = (gap / 5) * control.weight
    if (weightedGap > 0) {
      topRisks.push({
        controlId: control.id,
        gap,
        weightedGap: Math.round(weightedGap * 10) / 10,
      })
    }
  }

  const roundedScore = Math.round(totalScore * 10) / 10
  const percentage = Math.round(roundedScore)
  const band = getSecurityScoreBand(percentage)

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

export function getSecurityScoreColor(percentage: number): string {
  if (percentage >= 90) return 'green'
  if (percentage >= 75) return 'blue'
  if (percentage >= 50) return 'yellow'
  return 'red'
}

export function getSecurityCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    identity: 'blue',
    network: 'blue',
    data: 'blue',
    application: 'blue',
    cloud: 'blue',
    incident: 'red',
    compliance: 'slate',
    'supply-chain': 'slate',
  }
  return colors[category] || 'slate'
}
