export type LearningStage = 'early' | 'mid' | 'late'

export type LearningMilestoneStatus = 'not_started' | 'in_progress' | 'completed'

export type LearningProgressSource =
  | 'route'
  | 'recommendation'
  | 'manual'
  | 'migration'

export type LearningActivityKind = 'visit' | 'start' | 'complete'

export interface LearningMilestoneState {
  status: LearningMilestoneStatus
  startedAt?: string
  completedAt?: string
  source?: LearningProgressSource
}

export interface LearningProgressActivity {
  id: string
  kind: LearningActivityKind
  path: string
  milestoneId?: string
  at: string
}

export interface LearningProgressMigrationState {
  legacySkillTreeImportedAt?: string
}

export interface LearningProgressState {
  version: 1
  stage: LearningStage
  milestones: Record<string, LearningMilestoneState>
  activity: LearningProgressActivity[]
  migration?: LearningProgressMigrationState
  updatedAt: string
}

export interface ProgressMilestone {
  id: string
  title: string
  description: string
  href: string
  category: 'foundation' | 'playground' | 'workflow' | 'resource'
  countsTowardStage?: boolean
  relatedPaths?: string[]
}

export interface LearningProgressSnapshot {
  stage: LearningStage
  totalMilestones: number
  completedMilestones: number
  inProgressMilestones: number
  completionPercentage: number
}
