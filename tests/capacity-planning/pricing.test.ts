import assert from 'node:assert/strict'
import test from 'node:test'
import {
  CAPACITY_PRICING_METADATA,
  getNeutralRatePerCUMonth,
  selectAwsEquivalentTier,
} from '@/lib/capacity-planning/pricing'

test('neutral pricing rates exist for template and custom workloads', () => {
  assert.ok(getNeutralRatePerCUMonth('ecommerce-api') > 0)
  assert.ok(getNeutralRatePerCUMonth('custom') > 0)
})

test('selectAwsEquivalentTier scales to larger instance bands for larger CU requirements', () => {
  const low = selectAwsEquivalentTier(10)
  const high = selectAwsEquivalentTier(300)

  assert.ok(high.cuPerNode >= low.cuPerNode)
  assert.ok(high.monthlyCostUSD >= low.monthlyCostUSD)
})

test('pricing metadata exposes version and last-updated marker', () => {
  assert.ok(CAPACITY_PRICING_METADATA.version.length > 0)
  assert.ok(Date.parse(CAPACITY_PRICING_METADATA.lastUpdated) > 0)
  assert.equal(CAPACITY_PRICING_METADATA.confidenceLabel, 'directional')
})

