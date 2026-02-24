import assert from 'node:assert/strict'
import test from 'node:test'
import { migrateLegacySkillTreeProgressToLearningProgress } from '@/lib/progress/migrate-legacy'
import { createEmptyLearningProgressState } from '@/lib/progress/tracker'
import type { ProfileProgressState } from '@/lib/profile/types'

function createLegacyProgress(overrides?: Partial<ProfileProgressState>): ProfileProgressState {
  return {
    userId: 'legacy-user',
    completedNodes: [],
    unlockedNodes: [],
    tokens: 0,
    lastTokenGrant: '2026-02-01T00:00:00.000Z',
    streakDays: 0,
    lastActivityDate: '2026-02-01T00:00:00.000Z',
    totalXP: 0,
    level: 1,
    completedAtByNode: {},
    ...overrides,
  }
}

test('migrateLegacySkillTreeProgressToLearningProgress maps legacy node prefixes to milestones', () => {
  const now = '2026-02-24T00:00:00.000Z'
  const legacy = createLegacyProgress({
    unlockedNodes: ['int-routing', 'cloud-scale'],
    completedNodes: ['data-etl', 'sec-runtime', 'obs-alerting'],
    completedAtByNode: {
      'data-etl': '2026-02-20T00:00:00.000Z',
      'sec-runtime': '2026-02-21T00:00:00.000Z',
      'obs-alerting': '2026-02-22T00:00:00.000Z',
    },
    lastActivityDate: '2026-02-23T00:00:00.000Z',
  })

  const migrated = migrateLegacySkillTreeProgressToLearningProgress(legacy, null, now)

  assert.ok(migrated)
  assert.equal(migrated?.version, 1)
  assert.equal(migrated?.migration?.legacySkillTreeImportedAt, now)

  assert.equal(migrated?.milestones['run-enterprise-integration']?.status, 'in_progress')
  assert.equal(migrated?.milestones['plan-capacity']?.status, 'in_progress')
  assert.equal(migrated?.milestones['design-data-pipeline']?.status, 'completed')
  assert.equal(migrated?.milestones['assess-operational-sympathy']?.status, 'completed')
  assert.equal(
    migrated?.milestones['complete-production-readiness-workflow']?.status,
    'completed',
  )
})

test('migrateLegacySkillTreeProgressToLearningProgress runs once when learningProgress already exists', () => {
  const legacy = createLegacyProgress({
    completedNodes: ['int-routing'],
    unlockedNodes: ['data-etl'],
  })

  const existing = createEmptyLearningProgressState('2026-02-23T00:00:00.000Z')
  existing.milestones['foundations-patterns'] = {
    status: 'completed',
    startedAt: '2026-02-10T00:00:00.000Z',
    completedAt: '2026-02-11T00:00:00.000Z',
    source: 'manual',
  }

  const migrated = migrateLegacySkillTreeProgressToLearningProgress(
    legacy,
    existing,
    '2026-02-24T00:00:00.000Z',
  )

  assert.equal(migrated, existing)
  assert.equal(migrated?.milestones['run-enterprise-integration'], undefined)
})

test('migrateLegacySkillTreeProgressToLearningProgress returns null when no meaningful legacy progress exists', () => {
  const legacy = createLegacyProgress()
  const migrated = migrateLegacySkillTreeProgressToLearningProgress(
    legacy,
    null,
    '2026-02-24T00:00:00.000Z',
  )

  assert.equal(migrated, null)
})
