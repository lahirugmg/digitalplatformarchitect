import { Goal } from './types';

export const GOALS: Record<Goal['id'], Goal> = {
  'learn-patterns': {
    id: 'learn-patterns',
    title: 'Learn Architecture Patterns',
    description: 'Understand core patterns, their trade-offs, and when to apply them',
    icon: '📚',
    category: 'learn',
    relevantRoles: ['business', 'product', 'ba', 'uxdesigner', 'ea', 'implementation'],
    estimatedTime: '2-4 hours',
    difficulty: 'beginner',
  },
  'design-system': {
    id: 'design-system',
    title: 'Design a New System',
    description: 'Architect a system from scratch using proven patterns and principles',
    icon: '🏗️',
    category: 'design',
    relevantRoles: ['ea', 'ba', 'data', 'security', 'implementation'],
    estimatedTime: '4-8 hours',
    difficulty: 'intermediate',
  },
  'evaluate-architecture': {
    id: 'evaluate-architecture',
    title: 'Evaluate Existing Architecture',
    description: 'Assess current architecture for scalability, reliability, and maintainability',
    icon: '🔍',
    category: 'evaluate',
    relevantRoles: ['ea', 'security', 'implementation', 'qa'],
    estimatedTime: '3-6 hours',
    difficulty: 'advanced',
  },
  'build-roadmap': {
    id: 'build-roadmap',
    title: 'Build Architecture Roadmap',
    description: 'Create a phased plan for architecture evolution and modernization',
    icon: '🗺️',
    category: 'build',
    relevantRoles: ['business', 'product', 'ea'],
    estimatedTime: '6-12 hours',
    difficulty: 'advanced',
  },
  'assess-readiness': {
    id: 'assess-readiness',
    title: 'Assess Production Readiness',
    description: 'Evaluate system readiness for production deployment',
    icon: '✅',
    category: 'evaluate',
    relevantRoles: ['ea', 'implementation', 'qa', 'security'],
    estimatedTime: '2-4 hours',
    difficulty: 'intermediate',
  },
  'understand-trade-offs': {
    id: 'understand-trade-offs',
    title: 'Understand Trade-offs',
    description: 'Learn how to balance performance, cost, complexity, and maintainability',
    icon: '⚖️',
    category: 'learn',
    relevantRoles: ['business', 'product', 'ea', 'implementation'],
    estimatedTime: '1-2 hours',
    difficulty: 'beginner',
  },
  'explore-technologies': {
    id: 'explore-technologies',
    title: 'Explore Technologies',
    description: 'Compare and select technologies for your architecture',
    icon: '🔬',
    category: 'evaluate',
    relevantRoles: ['ea', 'data', 'implementation', 'security'],
    estimatedTime: '3-5 hours',
    difficulty: 'intermediate',
  },
  'hands-on-practice': {
    id: 'hands-on-practice',
    title: 'Hands-on Practice',
    description: 'Build and experiment with interactive playgrounds',
    icon: '🛠️',
    category: 'build',
    relevantRoles: ['implementation', 'ea', 'data', 'qa'],
    estimatedTime: '2-6 hours',
    difficulty: 'beginner',
  },
  'validate-design': {
    id: 'validate-design',
    title: 'Validate Design Decisions',
    description: 'Test and validate your architecture decisions with real scenarios',
    icon: '🎯',
    category: 'evaluate',
    relevantRoles: ['ea', 'implementation', 'qa', 'security'],
    estimatedTime: '2-4 hours',
    difficulty: 'intermediate',
  },
  'create-documentation': {
    id: 'create-documentation',
    title: 'Create Documentation',
    description: 'Document your architecture using C4 diagrams and decision records',
    icon: '📝',
    category: 'build',
    relevantRoles: ['ea', 'ba', 'implementation'],
    estimatedTime: '3-5 hours',
    difficulty: 'intermediate',
  },
  'security-review': {
    id: 'security-review',
    title: 'Security Review',
    description: 'Identify security risks and implement security patterns',
    icon: '🔒',
    category: 'evaluate',
    relevantRoles: ['security', 'ea', 'implementation'],
    estimatedTime: '4-6 hours',
    difficulty: 'advanced',
  },
  'data-strategy': {
    id: 'data-strategy',
    title: 'Design Data Strategy',
    description: 'Plan data flow, storage, governance, and analytics strategy',
    icon: '💾',
    category: 'design',
    relevantRoles: ['data', 'ea', 'ba'],
    estimatedTime: '4-8 hours',
    difficulty: 'advanced',
  },
  'performance-optimization': {
    id: 'performance-optimization',
    title: 'Optimize Performance',
    description: 'Identify bottlenecks and implement performance improvements',
    icon: '⚡',
    category: 'evaluate',
    relevantRoles: ['implementation', 'ea', 'data'],
    estimatedTime: '3-6 hours',
    difficulty: 'advanced',
  },
  'integration-design': {
    id: 'integration-design',
    title: 'Design Integrations',
    description: 'Plan and implement integration patterns between systems',
    icon: '🔗',
    category: 'design',
    relevantRoles: ['ea', 'ba', 'implementation', 'data'],
    estimatedTime: '3-5 hours',
    difficulty: 'intermediate',
  },
  'cloud-migration': {
    id: 'cloud-migration',
    title: 'Plan Cloud Migration',
    description: 'Strategy and roadmap for migrating to cloud infrastructure',
    icon: '☁️',
    category: 'build',
    relevantRoles: ['ea', 'business', 'implementation', 'security'],
    estimatedTime: '6-12 hours',
    difficulty: 'advanced',
  },
};

/**
 * Get goals filtered by role
 */
export function getGoalsByRole(role: string): Goal[] {
  return Object.values(GOALS).filter((goal) =>
    goal.relevantRoles.includes(role as any)
  );
}

/**
 * Get goals by category
 */
export function getGoalsByCategory(category: Goal['category']): Goal[] {
  return Object.values(GOALS).filter((goal) => goal.category === category);
}
