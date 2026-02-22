import { PERSONA_PROFILES } from '@/lib/architecture-playground/constants'
import { GOALS } from '@/lib/onboarding/goals'
import type { GoalId } from '@/lib/onboarding/types'
import type { Persona } from '@/lib/architecture-playground/types'
import type { ProfileState } from '@/lib/profile/types'
import type { ResolvedPersonalizationContext } from '@/lib/personalization/types'

const GENERIC_CONTEXT_LABEL = 'Generic recommendations'

function isPersona(value: string | null | undefined): value is Persona {
  return Boolean(value && value in PERSONA_PROFILES)
}

function isGoalId(value: string | null | undefined): value is GoalId {
  return Boolean(value && value in GOALS)
}

export function resolvePersonalizationContext(
  profileState: ProfileState,
): ResolvedPersonalizationContext {
  const override = profileState.personalization.contextOverride
  if (override && (override.role || override.goal)) {
    return {
      role: override.role,
      goal: override.goal,
      source: 'override',
    }
  }

  const onboardingRole = isPersona(profileState.onboarding?.selectedRole)
    ? profileState.onboarding?.selectedRole
    : null
  const onboardingGoal = isGoalId(profileState.onboarding?.selectedGoal)
    ? profileState.onboarding?.selectedGoal
    : null

  if (onboardingRole || onboardingGoal) {
    return {
      role: onboardingRole,
      goal: onboardingGoal,
      source: 'onboarding',
    }
  }

  return {
    role: null,
    goal: null,
    source: 'fallback',
  }
}

export function getPersonaLabel(role: Persona | null): string {
  if (!role) {
    return 'Any role'
  }

  return PERSONA_PROFILES[role]?.name ?? role
}

export function getGoalLabel(goal: GoalId | null): string {
  if (!goal) {
    return 'Any goal'
  }

  return GOALS[goal]?.title ?? goal
}

export function buildContextSummary(context: ResolvedPersonalizationContext): string {
  if (!context.role && !context.goal) {
    return GENERIC_CONTEXT_LABEL
  }

  if (context.role && context.goal) {
    return `${getPersonaLabel(context.role)} + ${getGoalLabel(context.goal)}`
  }

  if (context.role) {
    return getPersonaLabel(context.role)
  }

  return getGoalLabel(context.goal)
}
