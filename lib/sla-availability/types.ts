/**
 * SLA & Availability Targets - Type Definitions
 */

export type ServiceType = 'public-api' | 'internal-api' | 'batch-worker' | 'streaming-service'

export type SLIType = 'availability' | 'latency'

export type TimePeriod = '7d' | '28d' | '30d'

export type IncidentType = '5xx-spike' | 'latency-degradation' | 'dependency-timeout' | 'deploy-regression'

export interface SLI {
  id: string
  name: string
  type: SLIType
  description: string
  // For availability: threshold is % (e.g., 99.9 = 99.9%)
  // For latency: threshold is ms (e.g., 200 = 200ms)
  threshold: number
  enabled: boolean
}

export interface SLOTarget {
  percentage: number // e.g., 99.9 for 99.9%
  period: TimePeriod
}

export interface TrafficProfile {
  requestsPerDay: number
  peakMultiplier: number // e.g., 2.0 for 2x peak
}

export interface ErrorBudget {
  // Ratio form (e.g., 0.001 for 99.9% SLO)
  budgetRatio: number

  // Request-based budget
  totalRequests: number
  allowedFailures: number

  // Time-based budget
  totalMinutes: number
  allowedDowntimeMinutes: number

  // Current consumption
  consumedFailures: number
  consumedDowntimeMinutes: number

  // Remaining
  remainingFailures: number
  remainingDowntimeMinutes: number

  // Percentage consumed
  percentConsumed: number
}

export interface IncidentScenario {
  id: string
  type: IncidentType
  name: string
  description: string

  // Impact parameters
  durationMinutes: number
  errorRate: number // 0-1 (e.g., 0.05 = 5% errors)
  latencyMultiplier: number // e.g., 2.5 = 2.5x normal latency

  // Calculated impact
  affectedRequests?: number
  budgetConsumed?: number
  burnRate?: number
}

export interface BurnRateAlert {
  severity: 'warning' | 'critical'
  threshold: number
  message: string
  action: string
}

export interface AssessmentResult {
  score: number // 0-100
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  recommendations: string[]
  alerts: BurnRateAlert[]
  canMeetSLO: boolean
  reasoning: string
}

export interface SLASession {
  serviceType: ServiceType
  serviceName: string
  slis: SLI[]
  sloTarget: SLOTarget
  trafficProfile: TrafficProfile
  incidents: IncidentScenario[]
  errorBudget: ErrorBudget
  assessment?: AssessmentResult
}

export interface ServiceTemplate {
  type: ServiceType
  name: string
  icon: string
  description: string
  defaultSLIs: Omit<SLI, 'id'>[]
  defaultSLO: SLOTarget
  defaultTraffic: TrafficProfile
}
