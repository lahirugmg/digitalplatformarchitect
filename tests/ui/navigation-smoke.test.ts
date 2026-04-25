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
  const capacityRedirect = read('app/capacity-planning/page.tsx')

  assert.match(homepage, /href="\/playgrounds"/)
  assert.match(homepage, /Personalized guidance/)
  assert.match(homepage, /\/playgrounds\/system-design-framework/)
  assert.match(playgrounds, /\/playgrounds\/operational-sympathy/)
  assert.match(playgrounds, /Interactive Playgrounds/)
  assert.match(header, /href: '\/playgrounds\/system-design-framework'/)
  assert.match(header, /href: '\/blueprints'/)
  assert.doesNotMatch(header, /Digital Platform Architect<\/span>\{' '\}\s*<span[^>]*>Platform/)
  assert.doesNotMatch(header, /\/skill-tree/)
  assert.match(footer, /href="\/playgrounds\/system-design-framework"/)
  assert.match(footer, /href="\/blueprints"/)
  assert.doesNotMatch(footer, /\/skill-tree/)
  assert.match(
    skillTreeRedirect,
    /permanentRedirect\('\/playgrounds\/system-design-framework'\)/,
  )
  assert.match(capacityRedirect, /permanentRedirect\('\/playgrounds\/capacity-planning'\)/)
})

test('homepage uses a simplified enterprise architecture playground', () => {
  const homepage = read('app/page.tsx')
  const enterpriseMap = read('components/home/EnterpriseArchitectureMap.tsx')

  assert.match(homepage, /EnterpriseArchitectureMap/)
  assert.doesNotMatch(homepage, /PlaygroundCanvas/)
  assert.doesNotMatch(homepage, /ContextPanel/)
  assert.match(enterpriseMap, /Explore enterprise architecture at a glance/)
  assert.match(enterpriseMap, /Users & Channels/)
  assert.match(enterpriseMap, /Security & Governance/)
  assert.match(enterpriseMap, /href="\/architecture-playground"/)
})

test('production readiness workflow routes do not point to missing pages', () => {
  const readinessCatalog = read('lib/production-readiness.ts')
  const costRedirect = read('app/playgrounds/production-readiness/cost-estimation/page.tsx')
  const securityRedirect = read('app/playgrounds/production-readiness/security-assessment/page.tsx')
  const capacityRedirect = read('app/playgrounds/production-readiness/capacity-planning/page.tsx')
  const operationalRedirect = read('app/playgrounds/production-readiness/operational-sympathy/page.tsx')
  const costEstimatorRedirect = read('app/playgrounds/production-readiness/cost-estimator/page.tsx')
  const opSympathyRedirect = read('app/playgrounds/production-readiness/op-sympathy/page.tsx')

  assert.match(readinessCatalog, /playgroundLink: '\/playgrounds\/capacity-planning'/)
  assert.match(readinessCatalog, /playgroundLink: '\/playgrounds\/security-assessment'/)
  assert.doesNotMatch(readinessCatalog, /playgroundLink: '\/playgrounds\/production-readiness\/cost-estimation'/)
  assert.doesNotMatch(readinessCatalog, /playgroundLink: '\/playgrounds\/production-readiness\/security-assessment'/)
  assert.match(costRedirect, /permanentRedirect\('\/playgrounds\/capacity-planning'\)/)
  assert.match(securityRedirect, /permanentRedirect\('\/playgrounds\/security-assessment'\)/)
  assert.match(capacityRedirect, /permanentRedirect\('\/playgrounds\/capacity-planning'\)/)
  assert.match(operationalRedirect, /permanentRedirect\('\/playgrounds\/operational-sympathy'\)/)
  assert.match(costEstimatorRedirect, /permanentRedirect\('\/playgrounds\/capacity-planning'\)/)
  assert.match(opSympathyRedirect, /permanentRedirect\('\/playgrounds\/operational-sympathy'\)/)
})

test('onboarding modal keeps accessibility dialog semantics', () => {
  const onboardingModal = read('components/onboarding/OnboardingModal.tsx')

  assert.match(onboardingModal, /role="dialog"/)
  assert.match(onboardingModal, /aria-modal="true"/)
  assert.match(onboardingModal, /aria-labelledby="onboarding-title"/)
})
