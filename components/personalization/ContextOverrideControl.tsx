'use client'

import { useEffect, useMemo, useState } from 'react'
import { PERSONA_PROFILES } from '@/lib/architecture-playground/constants'
import type { Persona } from '@/lib/architecture-playground/types'
import { GOALS } from '@/lib/onboarding/goals'
import type { GoalId } from '@/lib/onboarding/types'
import { useOnboardingStore } from '@/lib/onboarding/store'
import type { PersonalizationContextSource } from '@/lib/personalization/types'

interface ContextOverrideControlProps {
  role: Persona | null
  goal: GoalId | null
  source: PersonalizationContextSource
  onApply: (role: Persona | null, goal: GoalId | null) => void
  onDone?: () => void
}

const PERSONA_OPTIONS = Object.entries(PERSONA_PROFILES)
  .map(([id, profile]) => ({
    id: id as Persona,
    label: profile.name,
  }))
  .sort((left, right) => left.label.localeCompare(right.label))

const GOAL_OPTIONS = Object.values(GOALS)
  .map((goal) => ({
    id: goal.id,
    label: goal.title,
  }))
  .sort((left, right) => left.label.localeCompare(right.label))

export default function ContextOverrideControl({
  role,
  goal,
  source,
  onApply,
  onDone,
}: ContextOverrideControlProps) {
  const setRole = useOnboardingStore((state) => state.setRole)
  const setGoal = useOnboardingStore((state) => state.setGoal)

  const [draftRole, setDraftRole] = useState<string>(role ?? '')
  const [draftGoal, setDraftGoal] = useState<string>(goal ?? '')

  useEffect(() => {
    setDraftRole(role ?? '')
  }, [role])

  useEffect(() => {
    setDraftGoal(goal ?? '')
  }, [goal])

  const hasOverride = useMemo(() => source === 'override', [source])

  const applyChanges = () => {
    const nextRole = draftRole ? (draftRole as Persona) : null
    const nextGoal = draftGoal ? (draftGoal as GoalId) : null

    if (nextRole) {
      setRole(nextRole)
    }

    if (nextGoal) {
      setGoal(nextGoal)
    }

    onApply(nextRole, nextGoal)
    onDone?.()
  }

  const clearOverride = () => {
    onApply(null, null)
    onDone?.()
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 sm:p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
          Role
          <select
            value={draftRole}
            onChange={(event) => setDraftRole(event.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-2 py-2 text-sm text-slate-800"
          >
            <option value="">Use onboarding/default</option>
            {PERSONA_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
          Goal
          <select
            value={draftGoal}
            onChange={(event) => setDraftGoal(event.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-2 py-2 text-sm text-slate-800"
          >
            <option value="">Use onboarding/default</option>
            {GOAL_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={applyChanges}
          className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Apply context
        </button>

        {hasOverride && (
          <button
            type="button"
            onClick={clearOverride}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Use onboarding context
          </button>
        )}
      </div>
    </div>
  )
}
