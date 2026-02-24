import assert from 'node:assert/strict'
import test from 'node:test'
import { calculateScenarioOutput } from '@/lib/capacity-planning/model'
import { createScenarioFromTemplate } from '@/lib/capacity-planning/templates'
import type { CapacityScenarioInput } from '@/lib/capacity-planning/types'

function createScenario(
  overrides?: Omit<Partial<CapacityScenarioInput>, 'workload' | 'advanced'> & {
    workload?: Partial<CapacityScenarioInput['workload']>
    advanced?: Partial<NonNullable<CapacityScenarioInput['advanced']>>
  },
): CapacityScenarioInput {
  const base = createScenarioFromTemplate(
    'baseline',
    'ecommerce-api',
    'Baseline',
    'aws-equivalent',
  )

  return {
    ...base,
    ...overrides,
    workload: {
      ...base.workload,
      ...(overrides?.workload ?? {}),
    },
    advanced: {
      ...base.advanced,
      ...(overrides?.advanced ?? {}),
    },
  }
}

test('required CU increases with higher average RPS', () => {
  const low = calculateScenarioOutput(
    createScenario({
      workload: {
        avgRps: 1000,
      },
    }),
  )

  const high = calculateScenarioOutput(
    createScenario({
      workload: {
        avgRps: 2000,
      },
    }),
  )

  assert.ok(high.now.requiredCU > low.now.requiredCU)
})

test('higher payload size does not reduce capacity requirement', () => {
  const smallPayload = calculateScenarioOutput(
    createScenario({
      workload: {
        payloadKB: 8,
      },
    }),
  )

  const largePayload = calculateScenarioOutput(
    createScenario({
      workload: {
        payloadKB: 128,
      },
    }),
  )

  assert.ok(largePayload.now.requiredCU >= smallPayload.now.requiredCU)
})

test('availability tiers increase required CU and cost', () => {
  const lowAvailability = calculateScenarioOutput(
    createScenario({
      workload: {
        availabilityTarget: 99,
      },
    }),
  )

  const highAvailability = calculateScenarioOutput(
    createScenario({
      workload: {
        availabilityTarget: 99.99,
      },
    }),
  )

  assert.ok(highAvailability.now.requiredCU >= lowAvailability.now.requiredCU)
  assert.ok(highAvailability.now.monthlyCostUSD >= lowAvailability.now.monthlyCostUSD)
})

test('advanced reduction is clamped and cannot over-reduce CU below 55 percent of baseline', () => {
  const baseline = calculateScenarioOutput(
    createScenario({
      advanced: {
        cacheHitPercent: 0,
        asyncOffloadPercent: 0,
        dbOffloadPercent: 0,
      },
    }),
  )

  const aggressive = calculateScenarioOutput(
    createScenario({
      advanced: {
        cacheHitPercent: 100,
        asyncOffloadPercent: 100,
        dbOffloadPercent: 100,
      },
    }),
  )

  const ratio = aggressive.now.requiredCU / baseline.now.requiredCU
  assert.ok(ratio >= 0.55)
  assert.ok(ratio <= 1)
})

test('month-12 projection applies annual growth', () => {
  const scenario = createScenario({
    workload: {
      annualGrowthPercent: 30,
    },
  })

  const output = calculateScenarioOutput(scenario)
  assert.ok(output.month12.requiredCU > output.now.requiredCU)
  assert.ok(output.month12.monthlyCostUSD >= output.now.monthlyCostUSD)
})
