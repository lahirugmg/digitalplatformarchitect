export type ApplicationTemplateId =
  | 'ecommerce-api'
  | 'social-feed-api'
  | 'video-streaming-api'
  | 'fintech-payments-api'
  | 'b2b-saas-backend'

export type CapacityTemplateId = ApplicationTemplateId | 'custom'
export type ScenarioId = 'baseline' | 'optimized'
export type ProviderMode = 'neutral' | 'aws-equivalent'
export type AvailabilityTarget = 99 | 99.9 | 99.95 | 99.99
export type ScenarioMode = 'single' | 'compare'

export type TemplateWorkloadClass =
  | 'general-api'
  | 'event-heavy'
  | 'media-heavy'
  | 'latency-critical'
  | 'saas-multi-tenant'

export interface CapacityWorkloadInput {
  avgRps: number
  peakMultiplier: number
  payloadKB: number
  concurrentUsers: number
  readPercent: number
  availabilityTarget: AvailabilityTarget
  annualGrowthPercent: number
}

export interface CapacityAdvancedInput {
  cacheHitPercent?: number
  asyncOffloadPercent?: number
  dbOffloadPercent?: number
  utilizationTargetPercent?: number
}

export interface CapacityScenarioInput {
  id: ScenarioId
  name: string
  templateId: CapacityTemplateId
  providerMode: ProviderMode
  workload: CapacityWorkloadInput
  advanced?: CapacityAdvancedInput
}

export interface CapacityEstimate {
  requiredCU: number
  nodeCount: number
  throughputMBps: number
  latencyP95Ms: number
  latencyP99Ms: number
  monthlyCostUSD: number
  annualCostUSD: number
  awsEquivalent?: {
    instanceType: string
    nodes: number
  }
  warnings: string[]
  recommendations: string[]
  assumptions: string[]
}

export interface CapacityScenarioOutput {
  now: CapacityEstimate
  month12: CapacityEstimate
}

export interface ScenarioComparisonOutput {
  costDeltaMonthlyUSD: number
  costDeltaPercent: number
  latencyP95DeltaMs: number
  latencyP95DeltaPercent: number
  requiredCUDelta: number
  nodeCountDelta: number
  summary: string[]
}

export interface CapacityTemplateDefinition {
  id: ApplicationTemplateId
  title: string
  shortDescription: string
  workloadClass: TemplateWorkloadClass
  defaults: {
    workload: CapacityWorkloadInput
    advanced: Required<CapacityAdvancedInput>
  }
}

export interface AwsEquivalentTier {
  instanceType: string
  maxPreferredCU: number
  cuPerNode: number
  monthlyCostUSD: number
  cpuCores: number
  memoryGB: number
  networkGbps: number
}

export interface CapacityPricingMetadata {
  version: string
  lastUpdated: string
  confidenceLabel: 'directional'
}

export interface CapacityPlanningSession {
  version: 1
  baseline: CapacityScenarioInput
  optimized: CapacityScenarioInput
  activeTemplateId: CapacityTemplateId
  updatedAt: string
}

/**
 * @deprecated Use CapacityScenarioInput from lib/capacity-planning/types.
 */
export interface CapacityInputs {
  messageSizeKB: number
  targetTPS: number
  concurrentUsers: number
  peakMultiplier: number
  availabilityTarget: number
  readWriteRatio: number
}

/**
 * @deprecated Use CapacityScenarioOutput from lib/capacity-planning/types.
 */
export interface CapacityResults {
  nodeCount: number
  instanceType: string
  totalCPUCores: number
  totalMemoryGB: number
  networkBandwidthGbps: number
  annualCostUSD: number
  latencyP50Ms: number
  latencyP95Ms: number
  latencyP99Ms: number
  throughputMBps: number
  warnings: string[]
  recommendations: string[]
}

