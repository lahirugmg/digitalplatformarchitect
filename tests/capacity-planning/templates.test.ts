import assert from 'node:assert/strict'
import test from 'node:test'
import {
  createScenarioFromTemplate,
  createScenarioPairFromTemplate,
  getCapacityTemplates,
} from '@/lib/capacity-planning/templates'

test('template catalog contains core five workloads', () => {
  const templates = getCapacityTemplates()
  assert.equal(templates.length, 5)
  assert.deepEqual(
    templates.map((template) => template.id).sort(),
    [
      'b2b-saas-backend',
      'ecommerce-api',
      'fintech-payments-api',
      'social-feed-api',
      'video-streaming-api',
    ],
  )
})

test('createScenarioPairFromTemplate clones baseline into optimized scenario', () => {
  const pair = createScenarioPairFromTemplate('social-feed-api', 'neutral')

  assert.equal(pair.baseline.id, 'baseline')
  assert.equal(pair.optimized.id, 'optimized')
  assert.equal(pair.baseline.providerMode, 'neutral')
  assert.equal(pair.optimized.providerMode, 'neutral')
  assert.deepEqual(pair.optimized.workload, pair.baseline.workload)
})

test('custom template path returns editable default scenario', () => {
  const customScenario = createScenarioFromTemplate(
    'baseline',
    'custom',
    'Custom',
    'aws-equivalent',
  )

  assert.equal(customScenario.templateId, 'custom')
  assert.equal(customScenario.providerMode, 'aws-equivalent')
  assert.ok(customScenario.workload.avgRps > 0)
})

