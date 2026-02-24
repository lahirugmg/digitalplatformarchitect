import assert from 'node:assert/strict'
import test from 'node:test'
import { compareScenarioOutputs } from '@/lib/capacity-planning/compare'
import { calculateScenarioOutput } from '@/lib/capacity-planning/model'
import { createScenarioFromTemplate } from '@/lib/capacity-planning/templates'

test('compareScenarioOutputs produces expected delta signs', () => {
  const baseline = createScenarioFromTemplate(
    'baseline',
    'ecommerce-api',
    'Baseline',
    'aws-equivalent',
  )
  baseline.advanced = {
    cacheHitPercent: 0,
    asyncOffloadPercent: 0,
    dbOffloadPercent: 0,
    utilizationTargetPercent: 70,
  }

  const optimized = createScenarioFromTemplate(
    'optimized',
    'ecommerce-api',
    'Optimized',
    'aws-equivalent',
  )
  optimized.advanced = {
    cacheHitPercent: 45,
    asyncOffloadPercent: 25,
    dbOffloadPercent: 20,
    utilizationTargetPercent: 70,
  }

  const comparison = compareScenarioOutputs(
    calculateScenarioOutput(baseline),
    calculateScenarioOutput(optimized),
  )

  assert.ok(comparison.costDeltaMonthlyUSD <= 0)
  assert.ok(comparison.requiredCUDelta <= 0)
  assert.ok(comparison.summary.length > 0)
})

test('compareScenarioOutputs reports neutral summary when outputs are equal', () => {
  const scenario = createScenarioFromTemplate(
    'baseline',
    'b2b-saas-backend',
    'Baseline',
    'neutral',
  )

  const output = calculateScenarioOutput(scenario)
  const comparison = compareScenarioOutputs(output, output)

  assert.equal(comparison.costDeltaMonthlyUSD, 0)
  assert.equal(comparison.requiredCUDelta, 0)
  assert.equal(comparison.summary[0], 'Both scenarios are currently equivalent under the selected assumptions.')
})

