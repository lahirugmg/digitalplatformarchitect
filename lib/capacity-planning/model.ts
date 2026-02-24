import {
  CAPACITY_PRICING_METADATA,
  getNeutralRatePerCUMonth,
  selectAwsEquivalentTier,
} from '@/lib/capacity-planning/pricing'
import type {
  AvailabilityTarget,
  CapacityAdvancedInput,
  CapacityEstimate,
  CapacityScenarioInput,
  CapacityScenarioOutput,
  CapacityWorkloadInput,
} from '@/lib/capacity-planning/types'

const BASELINE_RPS_PER_CU = 120
const BASELINE_UTILIZATION_TARGET = 70
const NEUTRAL_CU_PER_NODE = 12

const AVAILABILITY_FACTORS: Record<AvailabilityTarget, number> = {
  99: 1,
  99.9: 1.15,
  99.95: 1.35,
  99.99: 1.6,
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function normalizeAvailabilityTarget(value: number): AvailabilityTarget {
  const allowed: AvailabilityTarget[] = [99, 99.9, 99.95, 99.99]
  const exact = allowed.find((candidate) => candidate === value)
  if (exact) {
    return exact
  }

  return 99.9
}

function normalizeWorkload(workload: CapacityWorkloadInput): CapacityWorkloadInput {
  return {
    avgRps: clamp(workload.avgRps, 1, 500000),
    peakMultiplier: clamp(workload.peakMultiplier, 1, 10),
    payloadKB: clamp(workload.payloadKB, 1, 4096),
    concurrentUsers: clamp(workload.concurrentUsers, 1, 500000),
    readPercent: clamp(workload.readPercent, 0, 100),
    availabilityTarget: normalizeAvailabilityTarget(workload.availabilityTarget),
    annualGrowthPercent: clamp(workload.annualGrowthPercent, 0, 200),
  }
}

function normalizeAdvanced(input: CapacityAdvancedInput | undefined): Required<CapacityAdvancedInput> {
  return {
    cacheHitPercent: clamp(input?.cacheHitPercent ?? 0, 0, 100),
    asyncOffloadPercent: clamp(input?.asyncOffloadPercent ?? 0, 0, 100),
    dbOffloadPercent: clamp(input?.dbOffloadPercent ?? 0, 0, 100),
    utilizationTargetPercent: clamp(
      input?.utilizationTargetPercent ?? BASELINE_UTILIZATION_TARGET,
      50,
      85,
    ),
  }
}

function minNodesForAvailability(target: AvailabilityTarget): number {
  if (target >= 99.99) {
    return 3
  }

  if (target >= 99.9) {
    return 2
  }

  return 1
}

function buildAssumptions(scenario: CapacityScenarioInput): string[] {
  return [
    'Directional estimate for architecture planning, not procurement-grade quoting.',
    `Pricing uses static ${CAPACITY_PRICING_METADATA.version} table (last updated ${CAPACITY_PRICING_METADATA.lastUpdated}).`,
    'Cost excludes managed services, data transfer, licensing, and support plans.',
    `Provider mode: ${scenario.providerMode}.`,
    'Capacity Unit baseline: 1 CU = 120 rps @ 8KB payload @ 70% utilization.',
  ]
}

function buildWarningsAndRecommendations(
  scenario: CapacityScenarioInput,
  requiredCU: number,
  monthlyCostUSD: number,
  advanced: Required<CapacityAdvancedInput>,
): {
  warnings: string[]
  recommendations: string[]
} {
  const warnings: string[] = []
  const recommendations: string[] = []
  const { workload } = scenario

  if (workload.peakMultiplier >= 4) {
    warnings.push('High burst multiplier detected. Validate autoscaling and queue buffering under traffic spikes.')
  }

  if (workload.payloadKB > 512) {
    warnings.push('Large payload size may add serialization and network overhead at peak load.')
  }

  if (workload.annualGrowthPercent > 40) {
    warnings.push('Aggressive annual growth assumption. Recalculate quarterly with observed telemetry.')
  }

  if (advanced.utilizationTargetPercent > 80) {
    warnings.push('Utilization target above 80% reduces failure headroom during incidents and deploys.')
  }

  if (workload.readPercent < 30) {
    warnings.push('Write-heavy profile can create storage and consistency bottlenecks.')
  }

  if (requiredCU > 300) {
    warnings.push('Large CU footprint. Add load-test validation before production budgeting.')
  }

  if (workload.readPercent >= 75 && advanced.cacheHitPercent < 35) {
    recommendations.push('Increase cache strategy (target >=35% hit ratio) to reduce compute pressure.')
  }

  if (workload.peakMultiplier > 2) {
    recommendations.push('Use autoscaling and admission controls to absorb burst traffic safely.')
  }

  if (workload.availabilityTarget >= 99.95) {
    recommendations.push('Plan active-active or multi-AZ failover drills for higher SLA targets.')
  }

  if (workload.payloadKB > 256) {
    recommendations.push('Introduce compression/chunking to reduce payload transfer costs and latency.')
  }

  if (workload.readPercent < 40) {
    recommendations.push('Consider async write pipelines and idempotent retriable operations.')
  }

  if (monthlyCostUSD > 25000) {
    recommendations.push('Evaluate commitment discounts or reserved capacity for predictable baseline load.')
  }

  if (workload.annualGrowthPercent > 20) {
    recommendations.push('Create a quarterly recalibration schedule for growth and cost assumptions.')
  }

  return {
    warnings,
    recommendations,
  }
}

function calculateEstimateForRps(
  scenario: CapacityScenarioInput,
  avgRps: number,
): CapacityEstimate {
  const workload = normalizeWorkload({
    ...scenario.workload,
    avgRps,
  })
  const advanced = normalizeAdvanced(scenario.advanced)

  const peakRps = workload.avgRps * workload.peakMultiplier
  const payloadFactor = clamp((workload.payloadKB / 8) ** 0.35, 0.6, 3.0)
  const writeFactor = 1 + ((100 - workload.readPercent) / 100) * 0.45
  const concurrencyFactor = 1 + Math.min(workload.concurrentUsers / 50000, 1) * 0.25
  const availabilityFactor = AVAILABILITY_FACTORS[workload.availabilityTarget]
  const cacheHit = advanced.cacheHitPercent / 100
  const asyncOffload = advanced.asyncOffloadPercent / 100
  const dbOffload = advanced.dbOffloadPercent / 100
  const advancedReduction = clamp(
    1 - (cacheHit * 0.35 + asyncOffload * 0.25 + dbOffload * 0.2),
    0.55,
    1,
  )
  const utilizationFactor = BASELINE_UTILIZATION_TARGET / advanced.utilizationTargetPercent

  const requiredCU = Math.max(
    1,
    Math.ceil(
      (peakRps / BASELINE_RPS_PER_CU) *
        payloadFactor *
        writeFactor *
        concurrencyFactor *
        availabilityFactor *
        advancedReduction *
        utilizationFactor,
    ),
  )

  const minNodes = minNodesForAvailability(workload.availabilityTarget)

  let nodeCount = Math.max(minNodes, Math.ceil(requiredCU / NEUTRAL_CU_PER_NODE))
  let monthlyCostUSD = Math.round(requiredCU * getNeutralRatePerCUMonth(scenario.templateId))
  let awsEquivalent: CapacityEstimate['awsEquivalent']

  if (scenario.providerMode === 'aws-equivalent') {
    const tier = selectAwsEquivalentTier(requiredCU)
    nodeCount = Math.max(minNodes, Math.ceil(requiredCU / tier.cuPerNode))
    monthlyCostUSD = nodeCount * tier.monthlyCostUSD
    awsEquivalent = {
      instanceType: tier.instanceType,
      nodes: nodeCount,
    }
  }

  const annualCostUSD = monthlyCostUSD * 12
  const throughputMBps = Math.round(((peakRps * workload.payloadKB) / 1024) * 10) / 10
  const latencyP95Ms = Math.round(
    35 + requiredCU * 0.08 + workload.payloadKB * 0.04 + (100 - workload.readPercent) * 0.15,
  )
  const latencyP99Ms = Math.round(latencyP95Ms * 1.35)

  const { warnings, recommendations } = buildWarningsAndRecommendations(
    { ...scenario, workload },
    requiredCU,
    monthlyCostUSD,
    advanced,
  )

  return {
    requiredCU,
    nodeCount,
    throughputMBps,
    latencyP95Ms,
    latencyP99Ms,
    monthlyCostUSD,
    annualCostUSD,
    awsEquivalent,
    warnings,
    recommendations,
    assumptions: buildAssumptions(scenario),
  }
}

export function calculateScenarioOutput(
  scenario: CapacityScenarioInput,
): CapacityScenarioOutput {
  const now = calculateEstimateForRps(scenario, scenario.workload.avgRps)
  const month12AvgRps =
    scenario.workload.avgRps * (1 + scenario.workload.annualGrowthPercent / 100)
  const month12 = calculateEstimateForRps(scenario, month12AvgRps)

  return {
    now,
    month12,
  }
}

