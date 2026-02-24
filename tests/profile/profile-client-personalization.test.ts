import assert from 'node:assert/strict'
import { afterEach, beforeEach, test } from 'node:test'
import {
  clearExpiredDismissals,
  completeLearningProgressMilestone,
  dismissRecommendation,
  ensureLearningProgressState,
  getCachedState,
  getResolvedPersonalizationContext,
  markSurfaceSeen,
  setCachedState,
  setPersonalizationContextOverride,
  startLearningMilestoneFromPath,
} from '@/lib/profile/profile-client'
import { LEGACY_PROGRESS_KEY } from '@/lib/profile/constants'
import { createEmptyProfileState } from '@/lib/profile/types'

class MockStorage implements Storage {
  private readonly values = new Map<string, string>()

  get length(): number {
    return this.values.size
  }

  clear(): void {
    this.values.clear()
  }

  getItem(key: string): string | null {
    return this.values.has(key) ? this.values.get(key)! : null
  }

  key(index: number): string | null {
    return [...this.values.keys()][index] ?? null
  }

  removeItem(key: string): void {
    this.values.delete(key)
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value)
  }
}

class MockCustomEvent<T = unknown> {
  readonly detail: T

  constructor(
    readonly type: string,
    init?: {
      detail?: T
    },
  ) {
    this.detail = (init?.detail ?? null) as T
  }
}

type GlobalShape = typeof globalThis & {
  window?: unknown
  localStorage?: unknown
  CustomEvent?: unknown
}

const originalWindow = (globalThis as GlobalShape).window
const originalLocalStorage = (globalThis as GlobalShape).localStorage
const originalCustomEvent = (globalThis as GlobalShape).CustomEvent

function restoreGlobal(name: 'window' | 'localStorage' | 'CustomEvent', value: unknown): void {
  if (typeof value === 'undefined') {
    Reflect.deleteProperty(globalThis, name)
    return
  }

  Object.defineProperty(globalThis, name, {
    configurable: true,
    writable: true,
    value,
  })
}

beforeEach(() => {
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    writable: true,
    value: {
      dispatchEvent: () => true,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
    },
  })

  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    writable: true,
    value: new MockStorage(),
  })

  Object.defineProperty(globalThis, 'CustomEvent', {
    configurable: true,
    writable: true,
    value: MockCustomEvent,
  })
})

afterEach(() => {
  restoreGlobal('window', originalWindow)
  restoreGlobal('localStorage', originalLocalStorage)
  restoreGlobal('CustomEvent', originalCustomEvent)
})

test('setPersonalizationContextOverride updates resolved context with override precedence', () => {
  const state = createEmptyProfileState()
  state.onboarding = {
    currentStep: 'goal',
    selectedRole: 'ea',
    selectedGoal: 'design-system',
    journey: null,
    isComplete: false,
  }

  setCachedState(state)
  assert.equal(getResolvedPersonalizationContext().source, 'onboarding')

  setPersonalizationContextOverride('security', 'security-review')

  const withOverride = getResolvedPersonalizationContext()
  assert.equal(withOverride.source, 'override')
  assert.equal(withOverride.role, 'security')
  assert.equal(withOverride.goal, 'security-review')

  setPersonalizationContextOverride(null, null)

  const cleared = getResolvedPersonalizationContext()
  assert.equal(cleared.source, 'onboarding')
  assert.equal(cleared.role, 'ea')
})

test('dismissRecommendation stores dismissal with future TTL timestamp', () => {
  setCachedState(createEmptyProfileState())

  dismissRecommendation('home-architecture-playground', 10)

  const state = getCachedState()
  const dismissal = state.personalization.dismissed['home-architecture-playground']

  assert.ok(dismissal)
  assert.ok(Date.parse(dismissal.until) > Date.now())
  assert.ok(Date.parse(dismissal.updatedAt) > 0)
})

test('markSurfaceSeen records recommendation ids once and returns change signal', () => {
  setCachedState(createEmptyProfileState())

  const first = markSurfaceSeen('home', ['rec-1', 'rec-2'])
  const second = markSurfaceSeen('home', ['rec-1', 'rec-2'])

  assert.equal(first, true)
  assert.equal(second, false)

  const state = getCachedState()
  assert.deepEqual(state.personalization.surfaces.home.lastRecommendationIds, ['rec-1', 'rec-2'])
  assert.ok(state.personalization.surfaces.home.lastSeenAt)
})

test('clearExpiredDismissals removes expired entries and keeps active entries', () => {
  const state = createEmptyProfileState()
  state.personalization.dismissed.active = {
    until: '2099-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  }
  state.personalization.dismissed.expired = {
    until: '2001-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  }
  setCachedState(state)

  const changed = clearExpiredDismissals(new Date('2026-02-22T00:00:00.000Z'))

  assert.equal(changed, true)

  const next = getCachedState()
  assert.ok(next.personalization.dismissed.active)
  assert.equal(next.personalization.dismissed.expired, undefined)
})

test('ensureLearningProgressState migrates legacy skill tree cache into learningProgress', () => {
  localStorage.setItem(
    LEGACY_PROGRESS_KEY,
    JSON.stringify({
      userId: 'legacy-user',
      completedNodes: ['int-core'],
      unlockedNodes: ['data-lab'],
      tokens: 30,
      lastTokenGrant: '2026-02-20T00:00:00.000Z',
      streakDays: 3,
      lastActivityDate: '2026-02-20T00:00:00.000Z',
      totalXP: 120,
      level: 2,
      completedAtByNode: {
        'int-core': '2026-02-20T00:00:00.000Z',
      },
    }),
  )

  const first = ensureLearningProgressState()
  const second = ensureLearningProgressState()

  assert.ok(first.migration?.legacySkillTreeImportedAt)
  assert.equal(first.milestones['run-enterprise-integration']?.status, 'completed')
  assert.equal(first.milestones['design-data-pipeline']?.status, 'in_progress')
  assert.equal(second.milestones['run-enterprise-integration']?.status, 'completed')
  assert.equal(second.milestones['design-data-pipeline']?.status, 'in_progress')
  assert.equal(second.migration?.legacySkillTreeImportedAt, first.migration?.legacySkillTreeImportedAt)

  const cached = getCachedState()
  assert.ok(cached.learningProgress)
  assert.equal(cached.learningProgress?.milestones['run-enterprise-integration']?.status, 'completed')
})

test('learning progress milestone start and completion mutate cached learningProgress state', () => {
  setCachedState(createEmptyProfileState())

  const started = startLearningMilestoneFromPath('/playgrounds/data-pipeline')
  assert.equal(started.milestones['design-data-pipeline']?.status, 'in_progress')

  const completed = completeLearningProgressMilestone('design-data-pipeline')
  assert.equal(completed.milestones['design-data-pipeline']?.status, 'completed')

  const cached = getCachedState()
  assert.equal(cached.learningProgress?.milestones['design-data-pipeline']?.status, 'completed')
  assert.equal(
    cached.learningProgress?.activity.some(
      (item) => item.kind === 'complete' && item.milestoneId === 'design-data-pipeline',
    ),
    true,
  )
})
