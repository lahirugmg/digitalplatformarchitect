/**
 * SLA & Availability Targets - Calculation Engine
 */

import { ErrorBudget, SLOTarget, TrafficProfile, IncidentScenario, BurnRateAlert, AssessmentResult } from './types'

/**
 * Get total minutes in a period
 */
export function getPeriodMinutes(period: string): number {
  switch (period) {
    case '7d':
      return 7 * 24 * 60
    case '28d':
      return 28 * 24 * 60
    case '30d':
      return 30 * 24 * 60
    default:
      return 30 * 24 * 60
  }
}

/**
 * Calculate error budget from SLO target and traffic
 */
export function calculateErrorBudget(
  sloTarget: SLOTarget,
  trafficProfile: TrafficProfile,
  consumedFailures: number = 0,
  consumedDowntimeMinutes: number = 0
): ErrorBudget {
  // Convert SLO percentage to decimal (99.9 -> 0.999)
  const sloDecimal = sloTarget.percentage / 100

  // Error budget ratio (1 - SLO)
  const budgetRatio = 1 - sloDecimal

  // Time-based calculations
  const totalMinutes = getPeriodMinutes(sloTarget.period)
  const allowedDowntimeMinutes = totalMinutes * budgetRatio

  // Request-based calculations
  const periodDays = sloTarget.period === '7d' ? 7 : sloTarget.period === '28d' ? 28 : 30
  const totalRequests = trafficProfile.requestsPerDay * periodDays
  const allowedFailures = totalRequests * budgetRatio

  // Remaining budgets
  const remainingFailures = Math.max(0, allowedFailures - consumedFailures)
  const remainingDowntimeMinutes = Math.max(0, allowedDowntimeMinutes - consumedDowntimeMinutes)

  // Percentage consumed (use worst case between failures and downtime)
  const failurePercentConsumed = (consumedFailures / allowedFailures) * 100
  const downtimePercentConsumed = (consumedDowntimeMinutes / allowedDowntimeMinutes) * 100
  const percentConsumed = Math.max(failurePercentConsumed, downtimePercentConsumed)

  return {
    budgetRatio,
    totalRequests,
    allowedFailures,
    totalMinutes,
    allowedDowntimeMinutes,
    consumedFailures,
    consumedDowntimeMinutes,
    remainingFailures,
    remainingDowntimeMinutes,
    percentConsumed: Math.min(100, percentConsumed),
  }
}

/**
 * Calculate burn rate from observed error ratio
 * Burn rate = observed_error_ratio / (1 - SLO)
 */
export function calculateBurnRate(errorRate: number, sloTarget: SLOTarget): number {
  const sloDecimal = sloTarget.percentage / 100
  const budgetRatio = 1 - sloDecimal
  return errorRate / budgetRatio
}

/**
 * Calculate incident impact on error budget
 */
export function calculateIncidentImpact(
  incident: IncidentScenario,
  trafficProfile: TrafficProfile,
  sloTarget: SLOTarget
): {
  affectedRequests: number
  failedRequests: number
  budgetConsumed: number
  burnRate: number
} {
  // Calculate requests during incident window
  const requestsPerMinute = trafficProfile.requestsPerDay / (24 * 60)
  const affectedRequests = requestsPerMinute * incident.durationMinutes
  const failedRequests = affectedRequests * incident.errorRate

  // Calculate burn rate
  const burnRate = calculateBurnRate(incident.errorRate, sloTarget)

  // Calculate budget consumed
  const sloDecimal = sloTarget.percentage / 100
  const budgetRatio = 1 - sloDecimal
  const totalPeriodMinutes = getPeriodMinutes(sloTarget.period)
  const allowedDowntimeMinutes = totalPeriodMinutes * budgetRatio

  // Budget consumed = (incident_minutes * error_rate) / allowed_downtime
  const effectiveDowntime = incident.durationMinutes * incident.errorRate
  const budgetConsumed = (effectiveDowntime / allowedDowntimeMinutes) * 100

  return {
    affectedRequests,
    failedRequests,
    budgetConsumed,
    burnRate,
  }
}

/**
 * Generate burn rate alert recommendations
 */
export function generateBurnRateAlerts(
  incidents: IncidentScenario[],
  errorBudget: ErrorBudget
): BurnRateAlert[] {
  const alerts: BurnRateAlert[] = []

  // Calculate max burn rate from incidents
  const maxBurnRate = Math.max(...incidents.map((i) => i.burnRate || 0), 0)

  // Budget exhaustion alerts
  if (errorBudget.percentConsumed >= 90) {
    alerts.push({
      severity: 'critical',
      threshold: 90,
      message: `Error budget ${errorBudget.percentConsumed.toFixed(1)}% consumed`,
      action: 'Implement change freeze and focus on reliability improvements',
    })
  } else if (errorBudget.percentConsumed >= 75) {
    alerts.push({
      severity: 'warning',
      threshold: 75,
      message: `Error budget ${errorBudget.percentConsumed.toFixed(1)}% consumed`,
      action: 'Review recent changes and increase monitoring',
    })
  } else if (errorBudget.percentConsumed >= 50) {
    alerts.push({
      severity: 'warning',
      threshold: 50,
      message: `Error budget ${errorBudget.percentConsumed.toFixed(1)}% consumed`,
      action: 'Monitor closely and prepare mitigation plans',
    })
  }

  // Burn rate alerts
  if (maxBurnRate >= 10) {
    alerts.push({
      severity: 'critical',
      threshold: 10,
      message: `Burn rate ${maxBurnRate.toFixed(1)}x - budget will exhaust in ${(100 / maxBurnRate).toFixed(1)}% of period`,
      action: 'Immediate incident response required',
    })
  } else if (maxBurnRate >= 5) {
    alerts.push({
      severity: 'critical',
      threshold: 5,
      message: `Burn rate ${maxBurnRate.toFixed(1)}x - elevated budget consumption`,
      action: 'Escalate to on-call team and investigate root cause',
    })
  } else if (maxBurnRate >= 2) {
    alerts.push({
      severity: 'warning',
      threshold: 2,
      message: `Burn rate ${maxBurnRate.toFixed(1)}x - above normal consumption`,
      action: 'Review recent deployments and dependencies',
    })
  }

  return alerts
}

/**
 * Assess overall readiness and generate recommendations
 */
export function assessSLOReadiness(
  errorBudget: ErrorBudget,
  incidents: IncidentScenario[],
  sloTarget: SLOTarget
): AssessmentResult {
  const recommendations: string[] = []
  let score = 100
  let canMeetSLO = true
  let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low'

  // Check if incidents would violate SLO
  const totalBudgetConsumed = incidents.reduce((sum, i) => sum + (i.budgetConsumed || 0), 0)

  if (totalBudgetConsumed > 100) {
    score -= 40
    canMeetSLO = false
    riskLevel = 'critical'
    recommendations.push(
      'CRITICAL: Simulated incidents exceed error budget. Current architecture cannot meet SLO target.'
    )
    recommendations.push(
      `Consider lowering SLO target from ${sloTarget.percentage}% or improving system reliability.`
    )
  } else if (totalBudgetConsumed > 80) {
    score -= 25
    riskLevel = 'high'
    recommendations.push(
      'HIGH RISK: Simulated incidents consume >80% of error budget. Little margin for unexpected issues.'
    )
    recommendations.push('Implement redundancy and automated failover to improve resilience.')
  } else if (totalBudgetConsumed > 50) {
    score -= 15
    riskLevel = 'medium'
    recommendations.push(
      'MEDIUM RISK: Simulated incidents consume >50% of error budget. Monitor carefully.'
    )
  }

  // SLO strictness assessment
  if (sloTarget.percentage >= 99.99) {
    score -= 10
    recommendations.push(
      '4-nines SLO (99.99%) requires mature incident response, automated failover, and multi-region deployment.'
    )
    recommendations.push('Ensure you have comprehensive monitoring, alerting, and runbooks in place.')
  } else if (sloTarget.percentage >= 99.95) {
    score -= 5
    recommendations.push(
      '3.5-nines SLO (99.95%) requires strong operational practices and automated recovery mechanisms.'
    )
  }

  // Period assessment
  if (sloTarget.period === '7d') {
    recommendations.push('7-day measurement window provides quick feedback but less room for recovery.')
  } else if (sloTarget.period === '30d') {
    recommendations.push('30-day measurement window smooths out short incidents but delays feedback.')
  }

  // Monitoring recommendations
  recommendations.push('Set up multi-window burn-rate alerts (1h, 6h, 24h) to catch issues early.')
  recommendations.push('Create SLO dashboard with error budget remaining and burn-rate trends.')
  recommendations.push('Document incident response procedures and practice with game days.')

  // Error budget policy
  if (errorBudget.percentConsumed === 0) {
    recommendations.push(
      'Define error budget policy: what actions to take at 50%, 75%, and 90% consumption thresholds.'
    )
  }

  // Reasoning
  let reasoning = ''
  if (canMeetSLO) {
    reasoning = `System can meet ${sloTarget.percentage}% SLO target with current design. `
    reasoning += `Simulated incidents consume ${totalBudgetConsumed.toFixed(1)}% of error budget, `
    reasoning += `leaving ${(100 - totalBudgetConsumed).toFixed(1)}% margin for unexpected issues.`
  } else {
    reasoning = `System CANNOT meet ${sloTarget.percentage}% SLO target with current design. `
    reasoning += `Simulated incidents would consume ${totalBudgetConsumed.toFixed(1)}% of error budget, `
    reasoning += `exceeding the allowed 100%. Reliability improvements required.`
  }

  const alerts = generateBurnRateAlerts(incidents, errorBudget)

  return {
    score: Math.max(0, score),
    riskLevel,
    recommendations,
    alerts,
    canMeetSLO,
    reasoning,
  }
}

/**
 * Format downtime for display
 */
export function formatDowntime(minutes: number): string {
  if (minutes < 1) {
    return `${(minutes * 60).toFixed(1)} seconds`
  } else if (minutes < 60) {
    return `${minutes.toFixed(1)} minutes`
  } else {
    const hours = Math.floor(minutes / 60)
    const mins = Math.floor(minutes % 60)
    return `${hours}h ${mins}m`
  }
}

/**
 * Format large numbers with K/M/B suffixes
 */
export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(2)}B`
  } else if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(2)}M`
  } else if (num >= 1_000) {
    return `${(num / 1_000).toFixed(2)}K`
  }
  return num.toFixed(0)
}
