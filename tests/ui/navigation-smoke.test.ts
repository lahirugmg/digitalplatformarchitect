import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const ROOT = process.cwd()

function read(relativePath: string): string {
  return readFileSync(path.join(ROOT, relativePath), 'utf8')
}

test('homepage and playground surfaces keep core navigation paths', () => {
  const homepage = read('app/page.tsx')
  const playgrounds = read('app/playgrounds/components/PlaygroundsClient.tsx')

  assert.match(homepage, /href="\/playgrounds"/)
  assert.match(homepage, /Get Personalized Guidance/)
  assert.match(playgrounds, /\/playgrounds\/operational-sympathy/)
  assert.match(playgrounds, /Interactive Playgrounds/)
})

test('onboarding modal keeps accessibility dialog semantics', () => {
  const onboardingModal = read('components/onboarding/OnboardingModal.tsx')

  assert.match(onboardingModal, /role="dialog"/)
  assert.match(onboardingModal, /aria-modal="true"/)
  assert.match(onboardingModal, /aria-labelledby="onboarding-title"/)
})
