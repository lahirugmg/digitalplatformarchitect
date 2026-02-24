import type { GoalId } from '@/lib/onboarding/types'
import type { Persona } from '@/lib/architecture-playground/types'
import type { PersonalizationSurfaceId } from '@/lib/profile/types'

export type PersonalizationEventName =
  | 'personalization_reco_impression'
  | 'personalization_reco_click'
  | 'personalization_context_override'
  | 'personalization_reco_dismiss'
  | 'personalization_next_step_completed'
  | 'ux_theme_applied'
  | 'ux_compact_mode_toggled'
  | 'ux_home_cta_click'

export interface PersonalizationTelemetryPayload {
  surface: PersonalizationSurfaceId
  recommendation_id?: string
  role: Persona | null
  goal: GoalId | null
  session_active: boolean
  ux_variant?: string
}

export function emitPersonalizationEvent(
  eventName: PersonalizationEventName,
  payload: PersonalizationTelemetryPayload,
): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    const analytics = (window as Window & { va?: { track?: (name: string, data: Record<string, unknown>) => void } }).va
    if (!analytics || typeof analytics.track !== 'function') {
      return
    }

    analytics.track(eventName, payload as unknown as Record<string, unknown>)
  } catch {
    // Analytics wiring is optional.
  }
}
