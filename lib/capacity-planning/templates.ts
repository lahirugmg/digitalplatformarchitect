import type {
  ApplicationTemplateId,
  CapacityScenarioInput,
  CapacityTemplateDefinition,
  CapacityTemplateId,
  ProviderMode,
} from '@/lib/capacity-planning/types'

export const DEFAULT_TEMPLATE_ID: ApplicationTemplateId = 'ecommerce-api'

const TEMPLATE_DEFINITIONS: Record<ApplicationTemplateId, CapacityTemplateDefinition> = {
  'ecommerce-api': {
    id: 'ecommerce-api',
    title: 'E-commerce API',
    shortDescription: 'Read-heavy storefront and checkout APIs with campaign-driven peaks.',
    workloadClass: 'general-api',
    defaults: {
      workload: {
        avgRps: 1200,
        peakMultiplier: 3,
        payloadKB: 12,
        concurrentUsers: 1500,
        readPercent: 80,
        availabilityTarget: 99.9,
        annualGrowthPercent: 20,
      },
      advanced: {
        cacheHitPercent: 20,
        asyncOffloadPercent: 10,
        dbOffloadPercent: 10,
        utilizationTargetPercent: 70,
      },
    },
  },
  'social-feed-api': {
    id: 'social-feed-api',
    title: 'Social Feed API',
    shortDescription: 'Fan-out heavy traffic with viral burst patterns and high read ratios.',
    workloadClass: 'event-heavy',
    defaults: {
      workload: {
        avgRps: 2500,
        peakMultiplier: 4,
        payloadKB: 20,
        concurrentUsers: 4000,
        readPercent: 90,
        availabilityTarget: 99.9,
        annualGrowthPercent: 35,
      },
      advanced: {
        cacheHitPercent: 35,
        asyncOffloadPercent: 20,
        dbOffloadPercent: 10,
        utilizationTargetPercent: 70,
      },
    },
  },
  'video-streaming-api': {
    id: 'video-streaming-api',
    title: 'Video Streaming API',
    shortDescription: 'Session and metadata APIs for playback orchestration with high concurrency.',
    workloadClass: 'media-heavy',
    defaults: {
      workload: {
        avgRps: 1800,
        peakMultiplier: 2.8,
        payloadKB: 64,
        concurrentUsers: 6000,
        readPercent: 85,
        availabilityTarget: 99.95,
        annualGrowthPercent: 30,
      },
      advanced: {
        cacheHitPercent: 40,
        asyncOffloadPercent: 15,
        dbOffloadPercent: 10,
        utilizationTargetPercent: 70,
      },
    },
  },
  'fintech-payments-api': {
    id: 'fintech-payments-api',
    title: 'Fintech Payments API',
    shortDescription: 'Latency-sensitive and write-heavy transaction processing under strict uptime targets.',
    workloadClass: 'latency-critical',
    defaults: {
      workload: {
        avgRps: 900,
        peakMultiplier: 3,
        payloadKB: 6,
        concurrentUsers: 1200,
        readPercent: 35,
        availabilityTarget: 99.99,
        annualGrowthPercent: 25,
      },
      advanced: {
        cacheHitPercent: 10,
        asyncOffloadPercent: 30,
        dbOffloadPercent: 20,
        utilizationTargetPercent: 70,
      },
    },
  },
  'b2b-saas-backend': {
    id: 'b2b-saas-backend',
    title: 'B2B SaaS Backend',
    shortDescription: 'Multi-tenant business workflows with predictable daytime load and enterprise SLAs.',
    workloadClass: 'saas-multi-tenant',
    defaults: {
      workload: {
        avgRps: 700,
        peakMultiplier: 2.2,
        payloadKB: 10,
        concurrentUsers: 900,
        readPercent: 70,
        availabilityTarget: 99.95,
        annualGrowthPercent: 18,
      },
      advanced: {
        cacheHitPercent: 20,
        asyncOffloadPercent: 10,
        dbOffloadPercent: 15,
        utilizationTargetPercent: 70,
      },
    },
  },
}

function cloneScenarioInput(input: CapacityScenarioInput): CapacityScenarioInput {
  return {
    ...input,
    workload: { ...input.workload },
    advanced: input.advanced ? { ...input.advanced } : undefined,
  }
}

export function getCapacityTemplates(): CapacityTemplateDefinition[] {
  return Object.values(TEMPLATE_DEFINITIONS)
}

export function getCapacityTemplateById(
  templateId: ApplicationTemplateId,
): CapacityTemplateDefinition {
  return TEMPLATE_DEFINITIONS[templateId]
}

export function createScenarioFromTemplate(
  scenarioId: CapacityScenarioInput['id'],
  templateId: CapacityTemplateId,
  name: string,
  providerMode: ProviderMode,
): CapacityScenarioInput {
  if (templateId === 'custom') {
    return {
      id: scenarioId,
      name,
      templateId: 'custom',
      providerMode,
      workload: {
        avgRps: 1000,
        peakMultiplier: 2,
        payloadKB: 10,
        concurrentUsers: 500,
        readPercent: 70,
        availabilityTarget: 99.9,
        annualGrowthPercent: 20,
      },
      advanced: {
        cacheHitPercent: 0,
        asyncOffloadPercent: 0,
        dbOffloadPercent: 0,
        utilizationTargetPercent: 70,
      },
    }
  }

  const template = getCapacityTemplateById(templateId)
  return {
    id: scenarioId,
    name,
    templateId,
    providerMode,
    workload: { ...template.defaults.workload },
    advanced: { ...template.defaults.advanced },
  }
}

export function createScenarioPairFromTemplate(
  templateId: CapacityTemplateId,
  providerMode: ProviderMode = 'aws-equivalent',
): {
  baseline: CapacityScenarioInput
  optimized: CapacityScenarioInput
} {
  const baseline = createScenarioFromTemplate(
    'baseline',
    templateId,
    'Baseline',
    providerMode,
  )

  const optimized = cloneScenarioInput({
    ...baseline,
    id: 'optimized',
    name: 'Optimized',
  })

  return {
    baseline,
    optimized,
  }
}

