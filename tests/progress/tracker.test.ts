import assert from 'node:assert/strict'
import test from 'node:test'
import {
  createEmptyLearningProgressState,
  deriveLearningStageFromMilestones,
  getNextMilestones,
  markMilestoneCompleted,
  trackRecommendationStart,
  trackRouteVisit,
} from '@/lib/progress/tracker'
import type { LearningMilestoneState, ProgressMilestone } from '@/lib/progress/types'

test('deriveLearningStageFromMilestones follows <35 / 35-74 / >=75 boundaries', () => {
  const catalog: ProgressMilestone[] = [
    { id: 'm1', title: 'M1', description: 'M1', href: '/m1', category: 'foundation' },
    { id: 'm2', title: 'M2', description: 'M2', href: '/m2', category: 'foundation' },
    { id: 'm3', title: 'M3', description: 'M3', href: '/m3', category: 'foundation' },
    { id: 'm4', title: 'M4', description: 'M4', href: '/m4', category: 'foundation' },
  ]

  const milestones: Record<string, LearningMilestoneState> = {}
  assert.equal(deriveLearningStageFromMilestones(milestones, catalog), 'early')

  milestones.m1 = { status: 'completed' } // 25%
  assert.equal(deriveLearningStageFromMilestones(milestones, catalog), 'early')

  milestones.m2 = { status: 'completed' } // 50%
  assert.equal(deriveLearningStageFromMilestones(milestones, catalog), 'mid')

  milestones.m3 = { status: 'completed' } // 75%
  assert.equal(deriveLearningStageFromMilestones(milestones, catalog), 'late')
})

test('trackRouteVisit starts milestones and deduplicates visits inside 12-hour window', () => {
  let state = createEmptyLearningProgressState('2026-02-23T00:00:00.000Z')

  state = trackRouteVisit(
    state,
    '/playgrounds/data-pipeline',
    'route',
    '2026-02-23T01:00:00.000Z',
  )

  assert.equal(state.milestones['design-data-pipeline']?.status, 'in_progress')
  assert.equal(state.activity.length, 1)

  const deduped = trackRouteVisit(
    state,
    '/playgrounds/data-pipeline',
    'route',
    '2026-02-23T02:00:00.000Z',
  )
  assert.equal(deduped.activity.length, 1)

  const afterWindow = trackRouteVisit(
    deduped,
    '/playgrounds/data-pipeline',
    'route',
    '2026-02-23T14:30:00.000Z',
  )
  assert.equal(afterWindow.activity.length, 2)
})

test('completed milestones are not downgraded by recommendation starts', () => {
  let state = createEmptyLearningProgressState('2026-02-23T00:00:00.000Z')

  state = trackRouteVisit(
    state,
    '/playgrounds/data-pipeline',
    'route',
    '2026-02-23T01:00:00.000Z',
  )
  state = markMilestoneCompleted(
    state,
    'design-data-pipeline',
    '2026-02-23T02:00:00.000Z',
    'manual',
  )
  state = trackRecommendationStart(
    state,
    '/playgrounds/data-pipeline',
    '2026-02-23T03:00:00.000Z',
  )

  assert.equal(state.milestones['design-data-pipeline']?.status, 'completed')
})

test('getNextMilestones prioritizes in-progress items and excludes completed milestones', () => {
  let state = createEmptyLearningProgressState('2026-02-23T00:00:00.000Z')
  state = markMilestoneCompleted(
    state,
    'foundations-patterns',
    '2026-02-23T01:00:00.000Z',
    'manual',
  )
  state = trackRouteVisit(
    state,
    '/playgrounds/data-pipeline',
    'route',
    '2026-02-23T02:00:00.000Z',
  )

  const next = getNextMilestones(state, 5)

  assert.equal(next[0]?.id, 'design-data-pipeline')
  assert.equal(next.some((item) => item.id === 'foundations-patterns'), false)
  assert.equal(next.every((item) => item.state.status !== 'completed'), true)
})

test('activity log caps at 50 entries', () => {
  let state = createEmptyLearningProgressState('2026-02-01T00:00:00.000Z')
  const start = Date.parse('2026-02-01T00:00:00.000Z')

  for (let index = 0; index < 60; index += 1) {
    const at = new Date(start + index * 13 * 60 * 60 * 1000).toISOString()
    state = trackRouteVisit(state, '/playgrounds/data-pipeline', 'route', at)
  }

  assert.equal(state.activity.length, 50)
})
