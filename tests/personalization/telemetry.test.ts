import assert from 'node:assert/strict'
import { afterEach, beforeEach, test } from 'node:test'
import { emitPersonalizationEvent } from '@/lib/personalization/telemetry'

type GlobalShape = typeof globalThis & {
  window?: unknown
}

const originalWindow = (globalThis as GlobalShape).window

function setWindow(value: unknown): void {
  if (typeof value === 'undefined') {
    Reflect.deleteProperty(globalThis, 'window')
    return
  }

  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    writable: true,
    value,
  })
}

beforeEach(() => {
  setWindow({
    va: {
      track: () => undefined,
    },
  })
})

afterEach(() => {
  setWindow(originalWindow)
})

test('emitPersonalizationEvent forwards new UX telemetry events with optional ux_variant', () => {
  const calls: Array<{ eventName: string; payload: Record<string, unknown> }> = []
  setWindow({
    va: {
      track: (eventName: string, payload: Record<string, unknown>) => {
        calls.push({ eventName, payload })
      },
    },
  })

  emitPersonalizationEvent('ux_theme_applied', {
    surface: 'home',
    role: null,
    goal: null,
    session_active: false,
    ux_variant: 'neutral-first',
  })

  emitPersonalizationEvent('ux_home_cta_click', {
    surface: 'home',
    role: null,
    goal: null,
    session_active: true,
  })

  assert.equal(calls.length, 2)
  assert.equal(calls[0]?.eventName, 'ux_theme_applied')
  assert.equal(calls[0]?.payload.ux_variant, 'neutral-first')
  assert.equal(calls[1]?.eventName, 'ux_home_cta_click')
})

test('emitPersonalizationEvent remains no-op when analytics is unavailable', () => {
  setWindow({})

  assert.doesNotThrow(() =>
    emitPersonalizationEvent('ux_compact_mode_toggled', {
      surface: 'playgrounds',
      role: null,
      goal: null,
      session_active: false,
    }),
  )
})
