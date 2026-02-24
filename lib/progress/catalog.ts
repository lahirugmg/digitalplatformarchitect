import type { ProgressMilestone } from '@/lib/progress/types'

export const PROGRESS_MILESTONE_CATALOG: ProgressMilestone[] = [
  {
    id: 'foundations-patterns',
    title: 'Review core patterns',
    description: 'Explore pattern fundamentals and trade-offs before implementation.',
    href: '/patterns',
    category: 'foundation',
  },
  {
    id: 'foundations-blocks',
    title: 'Understand platform blocks',
    description: 'Build a shared vocabulary of core platform building blocks.',
    href: '/blocks',
    category: 'foundation',
  },
  {
    id: 'explore-architecture-playground',
    title: 'Explore architecture visually',
    description: 'Use the architecture playground to inspect personas and levels.',
    href: '/architecture-playground',
    category: 'workflow',
    relatedPaths: ['/architecture-playground/business'],
  },
  {
    id: 'document-architecture',
    title: 'Structure architecture documentation',
    description: 'Practice documentation views for business, solution, and deployment audiences.',
    href: '/playgrounds/architecture-docs',
    category: 'playground',
  },
  {
    id: 'plan-capacity',
    title: 'Estimate capacity and scale',
    description: 'Model scaling assumptions and infrastructure requirements.',
    href: '/playgrounds/capacity-planning',
    category: 'playground',
    relatedPaths: ['/capacity-planning'],
  },
  {
    id: 'simulate-message-flow',
    title: 'Simulate message flow',
    description: 'Compare sync and async integration behavior with practical scenarios.',
    href: '/playgrounds/message-flow',
    category: 'playground',
  },
  {
    id: 'design-data-pipeline',
    title: 'Design data pipelines',
    description: 'Map source-to-insight pipelines and throughput constraints.',
    href: '/playgrounds/data-pipeline',
    category: 'playground',
  },
  {
    id: 'run-enterprise-integration',
    title: 'Compose integration strategies',
    description: 'Test transformation and routing decisions for enterprise integration.',
    href: '/playgrounds/enterprise-integration',
    category: 'playground',
  },
  {
    id: 'assess-operational-sympathy',
    title: 'Assess operational sympathy',
    description: 'Score operational readiness and identify high-risk gaps.',
    href: '/playgrounds/operational-sympathy',
    category: 'workflow',
    relatedPaths: ['/operational-sympathy', '/readiness'],
  },
  {
    id: 'complete-production-readiness-workflow',
    title: 'Complete production readiness workflow',
    description: 'Run the full readiness sequence and export recommendations.',
    href: '/playgrounds/production-readiness',
    category: 'workflow',
  },
  {
    id: 'review-articles',
    title: 'Review architecture articles',
    description: 'Capture supporting context from long-form architecture explainers.',
    href: '/articles',
    category: 'resource',
  },
  {
    id: 'track-progress',
    title: 'Track your learning progress',
    description: 'Use the progress hub to confirm milestones and next actions.',
    href: '/progress',
    category: 'workflow',
    countsTowardStage: false,
  },
]

export const KNOWN_LEARNING_PATH_PREFIXES = [
  '/playgrounds',
  '/patterns',
  '/blocks',
  '/articles',
  '/architecture-playground',
  '/architecture-map',
  '/progress',
  '/capacity-planning',
  '/service-mesh',
]

function stripQueryAndHash(path: string): string {
  const queryIndex = path.indexOf('?')
  const hashIndex = path.indexOf('#')

  let endIndex = path.length
  if (queryIndex >= 0) {
    endIndex = Math.min(endIndex, queryIndex)
  }
  if (hashIndex >= 0) {
    endIndex = Math.min(endIndex, hashIndex)
  }

  return path.slice(0, endIndex)
}

export function normalizeLearningPath(path: string): string {
  const trimmed = stripQueryAndHash(path.trim())
  if (!trimmed) {
    return '/'
  }

  if (trimmed === '/') {
    return '/'
  }

  return trimmed.endsWith('/') ? trimmed.slice(0, -1) : trimmed
}

export function getMilestoneById(milestoneId: string): ProgressMilestone | undefined {
  return PROGRESS_MILESTONE_CATALOG.find((milestone) => milestone.id === milestoneId)
}

export function findMilestoneByPath(path: string): ProgressMilestone | undefined {
  const normalizedPath = normalizeLearningPath(path)

  for (const milestone of PROGRESS_MILESTONE_CATALOG) {
    if (normalizeLearningPath(milestone.href) === normalizedPath) {
      return milestone
    }

    if (milestone.relatedPaths?.some((candidate) => normalizeLearningPath(candidate) === normalizedPath)) {
      return milestone
    }
  }

  return undefined
}

export function isKnownLearningPath(path: string): boolean {
  const normalizedPath = normalizeLearningPath(path)

  return KNOWN_LEARNING_PATH_PREFIXES.some((prefix) => {
    const normalizedPrefix = normalizeLearningPath(prefix)
    return normalizedPath === normalizedPrefix || normalizedPath.startsWith(`${normalizedPrefix}/`)
  })
}
