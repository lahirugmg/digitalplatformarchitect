import assert from 'node:assert/strict'
import test from 'node:test'
import {
  OPERATIONAL_SYMPATHY_STORAGE_KEY,
  clearOperationalSympathySession,
  loadOperationalSympathySession,
  parseOperationalSympathySession,
  saveOperationalSympathySession,
} from '@/lib/operational-sympathy-storage'

class MockStorage implements Storage {
  private readonly values = new Map<string, string>()

  get length(): number {
    return this.values.size
  }

  clear(): void {
    this.values.clear()
  }

  getItem(key: string): string | null {
    return this.values.has(key) ? this.values.get(key)! : null
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

test('save + load restores a valid score session', () => {
  const storage = new MockStorage()

  const saved = saveOperationalSympathySession(
    {
      'production-aware': 4,
      'load-scale': 2,
    },
    storage,
    new Date('2026-02-23T00:00:00.000Z'),
  )

  assert.ok(saved)
  const loaded = loadOperationalSympathySession(storage)
  assert.ok(loaded)
  assert.equal(loaded?.scores['production-aware'], 4)
  assert.equal(loaded?.scores['load-scale'], 2)
})

test('malformed JSON is ignored during parse/load', () => {
  const storage = new MockStorage()
  storage.setItem(OPERATIONAL_SYMPATHY_STORAGE_KEY, '{broken-json')

  assert.equal(parseOperationalSympathySession('{broken-json'), null)
  assert.equal(loadOperationalSympathySession(storage), null)
})

test('version mismatch payload is ignored', () => {
  const storage = new MockStorage()
  storage.setItem(
    OPERATIONAL_SYMPATHY_STORAGE_KEY,
    JSON.stringify({
      version: 2,
      scores: { 'production-aware': 5 },
      updatedAt: new Date('2026-02-23T00:00:00.000Z').toISOString(),
    }),
  )

  assert.equal(loadOperationalSympathySession(storage), null)
})

test('clear resets persisted state', () => {
  const storage = new MockStorage()
  saveOperationalSympathySession({ 'production-aware': 5 }, storage)
  assert.ok(loadOperationalSympathySession(storage))

  clearOperationalSympathySession(storage)
  assert.equal(loadOperationalSympathySession(storage), null)
})
