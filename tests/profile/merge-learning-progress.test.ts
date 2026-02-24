import assert from 'node:assert/strict'
import test from 'node:test'
import { mergeLearningProgress } from '@/lib/profile/merge'
import { createEmptyLearningProgressState } from '@/lib/progress/tracker'
import type { LearningProgressActivity } from '@/lib/progress/types'

function activity(
  id: string,
  at: string,
  path: string,
  kind: LearningProgressActivity['kind'] = 'visit',
): LearningProgressActivity {
  return {
    id,
    kind,
    path,
    at,
  }
}

test('mergeLearningProgress prefers higher milestone status and latest timestamps', () => {
  const server = createEmptyLearningProgressState('2026-02-23T00:00:00.000Z')
  const client = createEmptyLearningProgressState('2026-02-24T00:00:00.000Z')

  server.milestones['design-data-pipeline'] = {
    status: 'in_progress',
    startedAt: '2026-02-20T00:00:00.000Z',
    source: 'route',
  }

  client.milestones['design-data-pipeline'] = {
    status: 'completed',
    startedAt: '2026-02-21T00:00:00.000Z',
    completedAt: '2026-02-22T00:00:00.000Z',
    source: 'manual',
  }

  const merged = mergeLearningProgress(server, client)
  assert.ok(merged)
  assert.equal(merged?.milestones['design-data-pipeline']?.status, 'completed')
  assert.equal(
    merged?.milestones['design-data-pipeline']?.startedAt,
    '2026-02-21T00:00:00.000Z',
  )
  assert.equal(
    merged?.milestones['design-data-pipeline']?.completedAt,
    '2026-02-22T00:00:00.000Z',
  )
  assert.equal(merged?.milestones['design-data-pipeline']?.source, 'manual')
})

test('mergeLearningProgress de-duplicates activity by id and enforces 50-event cap', () => {
  const server = createEmptyLearningProgressState('2026-02-23T00:00:00.000Z')
  const client = createEmptyLearningProgressState('2026-02-24T00:00:00.000Z')

  server.activity = Array.from({ length: 30 }, (_, index) =>
    activity(
      `server-${index}`,
      new Date(Date.parse('2026-02-01T00:00:00.000Z') + index * 60_000).toISOString(),
      `/server/${index}`,
    ),
  )
  server.activity.push(activity('dup-1', '2026-02-01T01:00:00.000Z', '/server/dup'))

  client.activity = Array.from({ length: 30 }, (_, index) =>
    activity(
      `client-${index}`,
      new Date(Date.parse('2026-02-02T00:00:00.000Z') + index * 60_000).toISOString(),
      `/client/${index}`,
      'start',
    ),
  )
  client.activity.push(activity('dup-1', '2026-02-02T02:00:00.000Z', '/client/dup', 'complete'))

  const merged = mergeLearningProgress(server, client)
  assert.ok(merged)
  assert.equal(merged?.activity.length, 50)

  const duplicateWinner = merged?.activity.find((item) => item.id === 'dup-1')
  assert.ok(duplicateWinner)
  assert.equal(duplicateWinner?.path, '/client/dup')
  assert.equal(duplicateWinner?.kind, 'complete')
})

test('mergeLearningProgress preserves latest migration timestamp and handles null states', () => {
  assert.equal(mergeLearningProgress(null, null), null)

  const server = createEmptyLearningProgressState('2026-02-23T00:00:00.000Z')
  const client = createEmptyLearningProgressState('2026-02-24T00:00:00.000Z')

  server.migration = {
    legacySkillTreeImportedAt: '2026-02-20T00:00:00.000Z',
  }
  client.migration = {
    legacySkillTreeImportedAt: '2026-02-22T00:00:00.000Z',
  }

  const merged = mergeLearningProgress(server, client)
  assert.equal(
    merged?.migration?.legacySkillTreeImportedAt,
    '2026-02-22T00:00:00.000Z',
  )
})
