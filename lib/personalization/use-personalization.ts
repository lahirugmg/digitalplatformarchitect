'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Persona } from '@/lib/architecture-playground/types'
import type { GoalId } from '@/lib/onboarding/types'
import {
  clearExpiredDismissals,
  dismissRecommendation,
  getCachedHint,
  getCachedState,
  getResolvedPersonalizationContext,
  markSurfaceSeen,
  setPersonalizationContextOverride,
} from '@/lib/profile/profile-client'
import type { PersonalizationSurfaceId, ProfileState } from '@/lib/profile/types'
import { buildRankedRecommendations } from '@/lib/personalization/engine'
import type {
  RankedRecommendation,
  ResolvedPersonalizationContext,
} from '@/lib/personalization/types'
import { emitPersonalizationEvent } from '@/lib/personalization/telemetry'

interface PersonalizationSnapshot {
  state: ProfileState
  context: ResolvedPersonalizationContext
  sessionActive: boolean
}

export interface UsePersonalizationOptions {
  surface: PersonalizationSurfaceId
  limit?: number
}

export interface UsePersonalizationResult {
  enabled: boolean
  context: ResolvedPersonalizationContext
  sessionActive: boolean
  recommendations: RankedRecommendation[]
  dismiss: (recommendationId: string, ttlDays?: number) => void
  setOverride: (role: Persona | null, goal: GoalId | null) => void
  refresh: () => void
}

const PERSONALIZATION_ENABLED = process.env.NEXT_PUBLIC_PERSONALIZATION_ENABLED === 'true'

function readSnapshot(): PersonalizationSnapshot {
  return {
    state: getCachedState(),
    context: getResolvedPersonalizationContext(),
    sessionActive: Boolean(getCachedHint()),
  }
}

const FALLBACK_CONTEXT: ResolvedPersonalizationContext = {
  role: null,
  goal: null,
  source: 'fallback',
}

export function usePersonalization({ surface, limit = 3 }: UsePersonalizationOptions): UsePersonalizationResult {
  const [snapshot, setSnapshot] = useState<PersonalizationSnapshot>(readSnapshot)
  const impressionKeyRef = useRef<string>('')

  const refresh = useCallback(() => {
    setSnapshot(readSnapshot())
  }, [])

  useEffect(() => {
    if (!PERSONALIZATION_ENABLED || typeof window === 'undefined') {
      return
    }

    clearExpiredDismissals()
    refresh()

    const onProfileStateChange = () => {
      refresh()
    }

    window.addEventListener('stemized:profile-status-change', onProfileStateChange)

    return () => {
      window.removeEventListener('stemized:profile-status-change', onProfileStateChange)
    }
  }, [refresh])

  const recommendations = useMemo(() => {
    if (!PERSONALIZATION_ENABLED) {
      return []
    }

    return buildRankedRecommendations({
      surface,
      context: snapshot.context,
      profileState: snapshot.state,
      sessionActive: snapshot.sessionActive,
    }).slice(0, limit)
  }, [limit, snapshot.context, snapshot.sessionActive, snapshot.state, surface])

  useEffect(() => {
    if (!PERSONALIZATION_ENABLED || recommendations.length === 0) {
      return
    }

    const recommendationIds = recommendations.map((item) => item.id)
    const impressionKey = `${surface}:${recommendationIds.join('|')}`

    if (impressionKeyRef.current === impressionKey) {
      return
    }

    impressionKeyRef.current = impressionKey

    markSurfaceSeen(surface, recommendationIds)

    recommendations.forEach((item) => {
      emitPersonalizationEvent('personalization_reco_impression', {
        surface,
        recommendation_id: item.id,
        role: snapshot.context.role,
        goal: snapshot.context.goal,
        session_active: snapshot.sessionActive,
      })
    })
  }, [recommendations, snapshot.context.goal, snapshot.context.role, snapshot.sessionActive, surface])

  const dismiss = useCallback(
    (recommendationId: string, ttlDays = 14) => {
      dismissRecommendation(recommendationId, ttlDays)

      emitPersonalizationEvent('personalization_reco_dismiss', {
        surface,
        recommendation_id: recommendationId,
        role: snapshot.context.role,
        goal: snapshot.context.goal,
        session_active: snapshot.sessionActive,
      })

      refresh()
    },
    [refresh, snapshot.context.goal, snapshot.context.role, snapshot.sessionActive, surface],
  )

  const setOverride = useCallback(
    (role: Persona | null, goal: GoalId | null) => {
      setPersonalizationContextOverride(role, goal)

      emitPersonalizationEvent('personalization_context_override', {
        surface,
        role,
        goal,
        session_active: snapshot.sessionActive,
      })

      refresh()
    },
    [refresh, snapshot.sessionActive, surface],
  )

  return {
    enabled: PERSONALIZATION_ENABLED,
    context: snapshot.context ?? FALLBACK_CONTEXT,
    sessionActive: snapshot.sessionActive,
    recommendations,
    dismiss,
    setOverride,
    refresh,
  }
}

export function trackRecommendationClick(
  surface: PersonalizationSurfaceId,
  recommendation: RankedRecommendation,
  context: ResolvedPersonalizationContext,
  sessionActive: boolean,
): void {
  emitPersonalizationEvent('personalization_reco_click', {
    surface,
    recommendation_id: recommendation.id,
    role: context.role,
    goal: context.goal,
    session_active: sessionActive,
  })
}
