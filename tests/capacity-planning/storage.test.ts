import assert from 'node:assert/strict'
import test from 'node:test'
import {
  CAPACITY_PLANNING_STORAGE_KEY,
  clearCapacityPlanningSession,
  loadCapacityPlanningSession,
  parseCapacityPlanningSession,
  saveCapacityPlanningSession,
} from '@/lib/capacity-planning/storage'
import { createScenarioPairFromTemplate } from '@/lib/capacity-planning/templates'

class MockStorage implements Storage {
  private readonly values = new Map<string, string>()

  get length(): number {
    return this.values.size
  }

  clear(): void {
    this.values.clear()
  }

  getItem(key: string): string | null {
    return this.values.get(key) ?? null
  }

  key(index: number): string | null {
    return [...this.values.keys()][index] ?? null
  }

  removeItem(key: string): void {
    this.values.delete(key)
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value)
  }
}

test('save and load roundtrip session payload', () => {
  const storage = new MockStorage()
  const pair = createScenarioPairFromTemplate('ecommerce-api', 'neutral')

  saveCapacityPlanningSession(
    {
      baseline: pair.baseline,
      optimized: pair.optimized,
      activeTemplateId: 'ecommerce-api',
    },
    storage,
    new Date('2026-02-24T00:00:00.000Z'),
  )

  const loaded = loadCapacityPlanningSession(storage)
  assert.ok(loaded)
  assert.equal(loaded?.activeTemplateId, 'ecommerce-api')
  assert.equal(loaded?.baseline.providerMode, 'neutral')
})

test('parse and load ignore malformed payloads', () => {
  const storage = new MockStorage()
  storage.setItem(CAPACITY_PLANNING_STORAGE_KEY, '{not-json')

  assert.equal(parseCapacityPlanningSession('{not-json'), null)
  assert.equal(loadCapacityPlanningSession(storage), null)
})

test('version mismatch payload is ignored', () => {
  const storage = new MockStorage()
  storage.setItem(
    CAPACITY_PLANNING_STORAGE_KEY,
    JSON.stringify({
      version: 2,
      baseline: {},
      optimized: {},
      activeTemplateId: 'custom',
      updatedAt: '2026-02-24T00:00:00.000Z',
    }),
  )

  assert.equal(loadCapacityPlanningSession(storage), null)
})

test('clear removes cached session key', () => {
  const storage = new MockStorage()
  const pair = createScenarioPairFromTemplate('ecommerce-api', 'aws-equivalent')
  saveCapacityPlanningSession(
    {
      baseline: pair.baseline,
      optimized: pair.optimized,
      activeTemplateId: 'ecommerce-api',
    },
    storage,
  )
  assert.ok(loadCapacityPlanningSession(storage))

  clearCapacityPlanningSession(storage)
  assert.equal(loadCapacityPlanningSession(storage), null)
})

