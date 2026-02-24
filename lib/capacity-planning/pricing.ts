import { getCapacityTemplateById } from '@/lib/capacity-planning/templates'
import type {
  ApplicationTemplateId,
  AwsEquivalentTier,
  CapacityPricingMetadata,
  TemplateWorkloadClass,
} from '@/lib/capacity-planning/types'

export const CAPACITY_PRICING_METADATA: CapacityPricingMetadata = {
  version: '2026.02.v1',
  lastUpdated: '2026-02-24',
  confidenceLabel: 'directional',
}

const NEUTRAL_CU_MONTHLY_RATE: Record<TemplateWorkloadClass, number> = {
  'general-api': 15,
  'event-heavy': 17,
  'media-heavy': 21,
  'latency-critical': 24,
  'saas-multi-tenant': 16,
}

export const AWS_EQUIVALENT_TIERS: AwsEquivalentTier[] = [
  {
    instanceType: 't3.large',
    maxPreferredCU: 24,
    cuPerNode: 4,
    monthlyCostUSD: 60,
    cpuCores: 2,
    memoryGB: 8,
    networkGbps: 5,
  },
  {
    instanceType: 'c6i.xlarge',
    maxPreferredCU: 60,
    cuPerNode: 10,
    monthlyCostUSD: 136,
    cpuCores: 4,
    memoryGB: 8,
    networkGbps: 12.5,
  },
  {
    instanceType: 'c6i.2xlarge',
    maxPreferredCU: 120,
    cuPerNode: 20,
    monthlyCostUSD: 272,
    cpuCores: 8,
    memoryGB: 16,
    networkGbps: 12.5,
  },
  {
    instanceType: 'c6i.4xlarge',
    maxPreferredCU: 240,
    cuPerNode: 40,
    monthlyCostUSD: 544,
    cpuCores: 16,
    memoryGB: 32,
    networkGbps: 12.5,
  },
  {
    instanceType: 'c6i.8xlarge',
    maxPreferredCU: 480,
    cuPerNode: 80,
    monthlyCostUSD: 1088,
    cpuCores: 32,
    memoryGB: 64,
    networkGbps: 25,
  },
]

export function getNeutralRatePerCUMonth(
  templateId: ApplicationTemplateId | 'custom',
): number {
  if (templateId === 'custom') {
    return NEUTRAL_CU_MONTHLY_RATE['general-api']
  }

  const workloadClass = getCapacityTemplateById(templateId).workloadClass
  return NEUTRAL_CU_MONTHLY_RATE[workloadClass]
}

export function selectAwsEquivalentTier(requiredCU: number): AwsEquivalentTier {
  const safeRequiredCU = Math.max(1, requiredCU)
  return (
    AWS_EQUIVALENT_TIERS.find((tier) => safeRequiredCU <= tier.maxPreferredCU) ??
    AWS_EQUIVALENT_TIERS[AWS_EQUIVALENT_TIERS.length - 1]
  )
}

