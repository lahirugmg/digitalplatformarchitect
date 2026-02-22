import assert from 'node:assert/strict'
import test from 'node:test'
import { mergeProfileState } from '@/lib/profile/merge'
import { createEmptyProfileState } from '@/lib/profile/types'

test('mergeProfileState personalization picks latest override and dismissal timestamps', () => {
  const server = createEmptyProfileState()
  const client = createEmptyProfileState()

  server.personalization.contextOverride = {
    role: 'ea',
    goal: 'design-system',
    updatedAt: '2026-01-01T00:00:00.000Z',
  }

  client.personalization.contextOverride = {
    role: 'security',
    goal: 'security-review',
    updatedAt: '2026-01-02T00:00:00.000Z',
  }

  server.personalization.dismissed.homeA = {
    until: '2026-02-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  }

  client.personalization.dismissed.homeA = {
    until: '2026-03-01T00:00:00.000Z',
    updatedAt: '2026-01-05T00:00:00.000Z',
  }

  server.personalization.dismissed.homeB = {
    until: '2026-02-15T00:00:00.000Z',
    updatedAt: '2026-01-03T00:00:00.000Z',
  }

  client.personalization.dismissed.homeC = {
    until: '2026-04-01T00:00:00.000Z',
    updatedAt: '2026-01-04T00:00:00.000Z',
  }

  const merged = mergeProfileState(server, client)

  assert.equal(merged.personalization.contextOverride?.role, 'security')
  assert.equal(merged.personalization.contextOverride?.goal, 'security-review')
  assert.equal(
    merged.personalization.dismissed.homeA.until,
    '2026-03-01T00:00:00.000Z',
  )
  assert.equal(merged.personalization.dismissed.homeB.until, '2026-02-15T00:00:00.000Z')
  assert.equal(merged.personalization.dismissed.homeC.until, '2026-04-01T00:00:00.000Z')
})

test('mergeProfileState personalization uses latest per-surface timestamp', () => {
  const server = createEmptyProfileState()
  const client = createEmptyProfileState()

  server.personalization.surfaces.home = {
    lastSeenAt: '2026-01-01T00:00:00.000Z',
    lastRecommendationIds: ['server-home'],
    updatedAt: '2026-01-01T00:00:00.000Z',
  }

  client.personalization.surfaces.home = {
    lastSeenAt: '2026-01-03T00:00:00.000Z',
    lastRecommendationIds: ['client-home'],
    updatedAt: '2026-01-03T00:00:00.000Z',
  }

  server.personalization.surfaces.playgrounds = {
    lastSeenAt: '2026-01-04T00:00:00.000Z',
    lastRecommendationIds: ['server-playgrounds'],
    updatedAt: '2026-01-04T00:00:00.000Z',
  }

  client.personalization.surfaces.playgrounds = {
    lastSeenAt: '2026-01-02T00:00:00.000Z',
    lastRecommendationIds: ['client-playgrounds'],
    updatedAt: '2026-01-02T00:00:00.000Z',
  }

  const merged = mergeProfileState(server, client)

  assert.deepEqual(merged.personalization.surfaces.home.lastRecommendationIds, ['client-home'])
  assert.deepEqual(merged.personalization.surfaces.playgrounds.lastRecommendationIds, ['server-playgrounds'])
})

test('mergeProfileState personalization is commutative for personalization branch', () => {
  const first = createEmptyProfileState()
  const second = createEmptyProfileState()

  first.personalization.contextOverride = {
    role: 'qa',
    goal: 'assess-readiness',
    updatedAt: '2026-01-10T00:00:00.000Z',
  }

  second.personalization.contextOverride = {
    role: 'implementation',
    goal: 'hands-on-practice',
    updatedAt: '2026-01-11T00:00:00.000Z',
  }

  first.personalization.dismissed.recA = {
    until: '2026-04-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  }

  second.personalization.dismissed.recA = {
    until: '2026-05-01T00:00:00.000Z',
    updatedAt: '2026-01-02T00:00:00.000Z',
  }

  const mergedAB = mergeProfileState(first, second)
  const mergedBA = mergeProfileState(second, first)

  assert.deepEqual(mergedAB.personalization, mergedBA.personalization)
})
