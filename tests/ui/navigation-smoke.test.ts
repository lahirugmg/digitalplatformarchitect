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
  const header = read('components/Header.tsx')
  const footer = read('components/Footer.tsx')
  const skillTreeRedirect = read('app/skill-tree/page.tsx')

  assert.match(homepage, /href="\/playgrounds"/)
  assert.match(homepage, /Get Personalized Guidance/)
  assert.match(playgrounds, /\/playgrounds\/operational-sympathy/)
  assert.match(playgrounds, /Interactive Playgrounds/)
  assert.match(header, /href: '\/progress'/)
  assert.doesNotMatch(header, /\/skill-tree/)
  assert.match(footer, /href="\/progress"/)
  assert.doesNotMatch(footer, /\/skill-tree/)
  assert.match(skillTreeRedirect, /permanentRedirect\('\/progress'\)/)
})

test('onboarding modal keeps accessibility dialog semantics', () => {
  const onboardingModal = read('components/onboarding/OnboardingModal.tsx')

  assert.match(onboardingModal, /role="dialog"/)
  assert.match(onboardingModal, /aria-modal="true"/)
  assert.match(onboardingModal, /aria-labelledby="onboarding-title"/)
})
