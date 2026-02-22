import type { Persona } from '@/lib/architecture-playground/types'
import type { GoalId } from '@/lib/onboarding/types'
import type { PersonalizationSurfaceId, ProfileProgressState, ProfileState } from '@/lib/profile/types'

export type PersonalizationContextSource = 'override' | 'onboarding' | 'fallback'
export type RecommendationType = 'playground' | 'assessment' | 'resource' | 'workflow'
export type ProgressStage = 'early' | 'mid' | 'late'

export interface ResolvedPersonalizationContext {
  role: Persona | null
  goal: GoalId | null
  source: PersonalizationContextSource
}

export interface RecommendationProgressHints {
  stage?: ProgressStage
  minCompletedLessons?: number
  maxCompletedLessons?: number
}

export interface PersonalizationCatalogItem {
  id: string
  surface: PersonalizationSurfaceId
  title: string
  description: string
  href: string
  type: RecommendationType
  roles: Persona[]
  goals: GoalId[]
  priority: number
  requiresSession: boolean
  progressHints?: RecommendationProgressHints
}

export interface RecommendationScoreBreakdown {
  roleMatch: number
  goalMatch: number
  progressAlignment: number
  novelty: number
  productPriority: number
  dismissalPenalty: number
  total: number
}

export interface RankedRecommendation {
  id: string
  surface: PersonalizationSurfaceId
  title: string
  description: string
  href: string
  type: RecommendationType
  priority: number
  reasonChips: string[]
  score: RecommendationScoreBreakdown
}

export interface BuildRecommendationsInput {
  surface: PersonalizationSurfaceId
  context: ResolvedPersonalizationContext
  profileState: ProfileState
  sessionActive: boolean
  now?: Date
}

export interface ProgressSnapshot {
  completedCount: number
  progress: ProfileProgressState | null
}
