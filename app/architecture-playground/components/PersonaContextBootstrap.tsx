'use client'

import { useEffect, useState } from 'react'
import { PERSONA_PROFILES } from '@/lib/architecture-playground/constants'
import type { Persona } from '@/lib/architecture-playground/types'
import { usePlaygroundStore } from '@/lib/architecture-playground/store'
import { usePersonalization } from '@/lib/personalization/use-personalization'

const SESSION_KEY = 'stemized_arch_persona_bootstrap_v1'

interface AppliedState {
  applied: Persona
  previous: Persona
}

export default function PersonaContextBootstrap() {
  const [appliedState, setAppliedState] = useState<AppliedState | null>(null)
  const persona = usePlaygroundStore((state) => state.persona)
  const setPersona = usePlaygroundStore((state) => state.setPersona)
  const { enabled, context } = usePersonalization({
    surface: 'architecture-playground',
    limit: 1,
  })

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') {
      return
    }

    if (sessionStorage.getItem(SESSION_KEY) === '1') {
      return
    }

    sessionStorage.setItem(SESSION_KEY, '1')

    if (!context.role || context.role === persona) {
      return
    }

    setPersona(context.role)
    setAppliedState({
      applied: context.role,
      previous: persona,
    })
  }, [context.role, enabled, persona, setPersona])

  if (!enabled || !appliedState) {
    return null
  }

  return (
    <div className="rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-900">
      <div className="flex flex-wrap items-center gap-2">
        <span>
          Set persona from your context: <strong>{PERSONA_PROFILES[appliedState.applied].name}</strong>
        </span>
        <button
          type="button"
          onClick={() => {
            setPersona(appliedState.previous)
            setAppliedState(null)
          }}
          className="rounded border border-blue-300 bg-white px-2 py-0.5 font-semibold text-blue-700 transition hover:bg-blue-100"
        >
          Undo
        </button>
      </div>
    </div>
  )
}
