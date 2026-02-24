import {
  AWS_EQUIVALENT_TIERS,
  calculateScenarioOutput,
  selectAwsEquivalentTier,
} from '@/lib/capacity-planning/index'
import type {
  AvailabilityTarget,
  CapacityInputs,
  CapacityResults,
} from '@/lib/capacity-planning/types'

export type { CapacityInputs, CapacityResults } from '@/lib/capacity-planning/types'

/**
 * @deprecated Use calculateScenarioOutput from lib/capacity-planning/model.
 * This adapter is retained for backwards compatibility with existing imports.
 */
export function calculateCapacity(inputs: CapacityInputs): CapacityResults {
  const availabilityTarget: AvailabilityTarget =
    inputs.availabilityTarget >= 99.99
      ? 99.99
      : inputs.availabilityTarget >= 99.95
      ? 99.95
      : inputs.availabilityTarget >= 99.9
      ? 99.9
      : 99

  const scenario = {
    id: 'baseline' as const,
    name: 'Legacy Scenario',
    templateId: 'custom' as const,
    providerMode: 'aws-equivalent' as const,
    workload: {
      avgRps: inputs.targetTPS,
      peakMultiplier: inputs.peakMultiplier,
      payloadKB: inputs.messageSizeKB,
      concurrentUsers: inputs.concurrentUsers,
      readPercent: inputs.readWriteRatio,
      availabilityTarget,
      annualGrowthPercent: 20,
    },
    advanced: {
      cacheHitPercent: inputs.readWriteRatio >= 80 ? 25 : 10,
      asyncOffloadPercent: inputs.readWriteRatio <= 40 ? 20 : 10,
      dbOffloadPercent: 10,
      utilizationTargetPercent: 70,
    },
  }

  const output = calculateScenarioOutput(scenario)
  const now = output.now
  const selectedTier = selectAwsEquivalentTier(now.requiredCU)

  return {
    nodeCount: now.nodeCount,
    instanceType: now.awsEquivalent?.instanceType ?? selectedTier.instanceType,
    totalCPUCores: now.nodeCount * selectedTier.cpuCores,
    totalMemoryGB: now.nodeCount * selectedTier.memoryGB,
    networkBandwidthGbps: selectedTier.networkGbps,
    annualCostUSD: now.annualCostUSD,
    latencyP50Ms: Math.round(now.latencyP95Ms * 0.62),
    latencyP95Ms: now.latencyP95Ms,
    latencyP99Ms: now.latencyP99Ms,
    throughputMBps: now.throughputMBps,
    warnings: now.warnings,
    recommendations: now.recommendations,
  }
}

interface LegacyInstanceSpec {
  name: string
  cpuCores: number
  memoryGB: number
  networkGbps: number
  monthlyCostUSD: number
  maxTPSPerInstance: number
}

export function getInstanceTypes(): LegacyInstanceSpec[] {
  return AWS_EQUIVALENT_TIERS.map((tier) => ({
    name: tier.instanceType,
    cpuCores: tier.cpuCores,
    memoryGB: tier.memoryGB,
    networkGbps: tier.networkGbps,
    monthlyCostUSD: tier.monthlyCostUSD,
    maxTPSPerInstance: tier.cuPerNode * 120,
  }))
}
