import assert from 'node:assert/strict'
import test from 'node:test'
import { resolvePersonalizationContext, buildContextSummary } from '@/lib/personalization/context'
import { createEmptyProfileState } from '@/lib/profile/types'

test('resolvePersonalizationContext prefers override over onboarding values', () => {
  const state = createEmptyProfileState()
  state.onboarding = {
    currentStep: 'journey',
    selectedRole: 'ea',
    selectedGoal: 'design-system',
    journey: null,
    isComplete: true,
  }
  state.personalization.contextOverride = {
    role: 'security',
    goal: 'security-review',
    updatedAt: '2026-01-10T00:00:00.000Z',
  }

  const resolved = resolvePersonalizationContext(state)

  assert.equal(resolved.source, 'override')
  assert.equal(resolved.role, 'security')
  assert.equal(resolved.goal, 'security-review')
})

test('resolvePersonalizationContext falls back to onboarding values when no override exists', () => {
  const state = createEmptyProfileState()
  state.onboarding = {
    currentStep: 'goal',
    selectedRole: 'data',
    selectedGoal: 'data-strategy',
    journey: null,
    isComplete: false,
  }

  const resolved = resolvePersonalizationContext(state)

  assert.equal(resolved.source, 'onboarding')
  assert.equal(resolved.role, 'data')
  assert.equal(resolved.goal, 'data-strategy')
})

test('resolvePersonalizationContext returns generic fallback when neither override nor onboarding is available', () => {
  const state = createEmptyProfileState()

  const resolved = resolvePersonalizationContext(state)

  assert.equal(resolved.source, 'fallback')
  assert.equal(resolved.role, null)
  assert.equal(resolved.goal, null)
})

test('buildContextSummary renders generic and specific labels', () => {
  assert.equal(
    buildContextSummary({ role: null, goal: null, source: 'fallback' }),
    'Generic recommendations',
  )

  assert.equal(
    buildContextSummary({ role: 'ea', goal: 'design-system', source: 'onboarding' }),
    'Enterprise Architect + Design a New System',
  )
})
