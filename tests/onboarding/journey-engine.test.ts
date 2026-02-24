import assert from 'node:assert/strict'
import test from 'node:test'
import { generateJourney } from '@/lib/onboarding/journey-engine'

test('generateJourney returns progress recommendation for business build-roadmap path', () => {
  const journey = generateJourney('business', 'build-roadmap')

  const progressRecommendation = journey.recommendations.find(
    (recommendation) => recommendation.type === 'progress',
  )

  assert.ok(progressRecommendation)
  assert.equal(progressRecommendation?.url, '/progress')
})

test('generateJourney fallback recommendations include progress hub instead of skill-tree', () => {
  const journey = generateJourney('uxdesigner', 'cloud-migration')

  const progressRecommendation = journey.recommendations.find(
    (recommendation) => recommendation.type === 'progress',
  )

  assert.ok(progressRecommendation)
  assert.equal(progressRecommendation?.url, '/progress')
  assert.equal(journey.recommendations.some((recommendation) => recommendation.url === '/skill-tree'), false)
})
