import { Persona } from '../architecture-playground/types';

/**
 * Goal represents what a user wants to achieve
 */
export type GoalId =
  | 'learn-patterns'
  | 'design-system'
  | 'evaluate-architecture'
  | 'build-roadmap'
  | 'assess-readiness'
  | 'understand-trade-offs'
  | 'explore-technologies'
  | 'hands-on-practice'
  | 'validate-design'
  | 'create-documentation'
  | 'security-review'
  | 'data-strategy'
  | 'performance-optimization'
  | 'integration-design'
  | 'cloud-migration';

export interface Goal {
  id: GoalId;
  title: string;
  description: string;
  icon: string;
  category: 'learn' | 'design' | 'evaluate' | 'build';
  relevantRoles: Persona[];
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

/**
 * Journey represents a recommended path based on role + goal
 */
export interface Journey {
  role: Persona;
  goal: GoalId;
  recommendations: Recommendation[];
  nextSteps: string[];
}

export interface Recommendation {
  type: 'playground' | 'pattern' | 'article' | 'skill-tree' | 'building-block';
  title: string;
  description: string;
  url: string;
  priority: 'primary' | 'secondary' | 'optional';
  estimatedTime?: string;
}

/**
 * Onboarding state
 */
export interface OnboardingState {
  currentStep: 'role' | 'goal' | 'journey';
  selectedRole: Persona | null;
  selectedGoal: GoalId | null;
  journey: Journey | null;
  isComplete: boolean;
}
