import assert from 'node:assert/strict'
import test from 'node:test'
import { buildRankedRecommendations } from '@/lib/personalization/engine'
import type { ResolvedPersonalizationContext } from '@/lib/personalization/types'
import { createEmptyProfileState } from '@/lib/profile/types'
import { createEmptyLearningProgressState } from '@/lib/progress/tracker'

function context(role: ResolvedPersonalizationContext['role'], goal: ResolvedPersonalizationContext['goal']): ResolvedPersonalizationContext {
  return {
    role,
    goal,
    source: role || goal ? 'onboarding' : 'fallback',
  }
}

test('buildRankedRecommendations applies deterministic ranking for home surface', () => {
  const state = createEmptyProfileState()

  const recommendations = buildRankedRecommendations({
    surface: 'home',
    context: context('ea', 'design-system'),
    profileState: state,
    sessionActive: true,
  })

  assert.ok(recommendations.length > 0)
  assert.deepEqual(
    recommendations.slice(0, 3).map((item) => item.id),
    ['home-architecture-playground', 'home-patterns-library', 'home-production-readiness'],
  )

  const top = recommendations[0]
  assert.equal(top.score.roleMatch, 35)
  assert.equal(top.score.goalMatch, 30)
  assert.equal(top.score.progressAlignment, 20)
  assert.equal(top.score.novelty, 10)
  assert.equal(top.score.productPriority, 5)
  assert.equal(top.score.total, 100)
})

test('buildRankedRecommendations excludes active dismissals', () => {
  const state = createEmptyProfileState()
  state.personalization.dismissed['home-architecture-playground'] = {
    until: '2099-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  }

  const recommendations = buildRankedRecommendations({
    surface: 'home',
    context: context('ea', 'design-system'),
    profileState: state,
    sessionActive: true,
    now: new Date('2026-02-22T00:00:00.000Z'),
  })

  assert.equal(
    recommendations.some((item) => item.id === 'home-architecture-playground'),
    false,
  )
})

test('buildRankedRecommendations filters session-required items when session is inactive', () => {
  const state = createEmptyProfileState()

  const recommendations = buildRankedRecommendations({
    surface: 'home',
    context: context(null, null),
    profileState: state,
    sessionActive: false,
  })

  assert.equal(recommendations.some((item) => item.id === 'home-progress-hub'), false)
  assert.equal(recommendations.some((item) => item.id === 'home-file-vault'), false)
})

test('buildRankedRecommendations removes novelty boost for previously seen recommendation ids', () => {
  const state = createEmptyProfileState()
  state.personalization.surfaces.home.lastRecommendationIds = ['home-architecture-playground']

  const recommendations = buildRankedRecommendations({
    surface: 'home',
    context: context('ea', 'design-system'),
    profileState: state,
    sessionActive: true,
  })

  const top = recommendations.find((item) => item.id === 'home-architecture-playground')
  assert.ok(top)
  assert.equal(top.score.novelty, 0)
})

test('buildRankedRecommendations uses learningProgress as primary progress signal', () => {
  const state = createEmptyProfileState()
  const learningProgress = createEmptyLearningProgressState('2026-02-24T00:00:00.000Z')

  for (const milestoneId of [
    'foundations-patterns',
    'foundations-blocks',
    'explore-architecture-playground',
    'document-architecture',
  ]) {
    learningProgress.milestones[milestoneId] = {
      status: 'completed',
      startedAt: '2026-02-20T00:00:00.000Z',
      completedAt: '2026-02-21T00:00:00.000Z',
      source: 'manual',
    }
  }

  state.learningProgress = learningProgress
  state.progress = null

  const recommendations = buildRankedRecommendations({
    surface: 'home',
    context: context(null, null),
    profileState: state,
    sessionActive: true,
  })

  const progressHub = recommendations.find((item) => item.id === 'home-progress-hub')
  assert.ok(progressHub)
  assert.equal(progressHub.score.progressAlignment, 20)
})
