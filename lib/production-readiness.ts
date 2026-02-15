// Production Readiness Assessment Tracking

export interface ReadinessStep {
  id: string
  title: string
  description: string
  theoryLink?: string
  playgroundLink: string
  icon: string
  category: 'assessment' | 'planning' | 'security' | 'operations'
  estimatedTime: string
  status?: 'not_started' | 'in_progress' | 'completed'
  score?: number // 0-100
  result?: any
}

export interface ReadinessProgress {
  steps: ReadinessStep[]
  overallProgress: number // 0-100
  completedSteps: number
  totalSteps: number
  lastUpdated?: Date
}

export const READINESS_STEPS: ReadinessStep[] = [
  {
    id: 'operational-sympathy',
    title: 'Operational Sympathy Assessment',
    description: 'Evaluate your architecture against 9 key production-ready elements',
    theoryLink: '/articles/operational-sympathy', // Will create this
    playgroundLink: '/operational-sympathy',
    icon: '✅',
    category: 'assessment',
    estimatedTime: '15-20 min',
    status: 'not_started'
  },
  {
    id: 'capacity-planning',
    title: 'Infrastructure Capacity Planning',
    description: 'Size your infrastructure based on traffic patterns and performance targets',
    theoryLink: '/articles/capacity-planning', // Will create this
    playgroundLink: '/capacity-planning',
    icon: '📊',
    category: 'planning',
    estimatedTime: '10-15 min',
    status: 'not_started'
  },
  {
    id: 'cost-estimation',
    title: 'Cost Estimation & Optimization',
    description: 'Estimate cloud costs and identify optimization opportunities',
    theoryLink: '/articles/cost-optimization',
    playgroundLink: '/playgrounds/production-readiness/cost-estimation',
    icon: '💰',
    category: 'planning',
    estimatedTime: '10 min',
    status: 'not_started'
  },
  {
    id: 'sla-design',
    title: 'SLA & Availability Targets',
    description: 'Define SLOs, SLIs, and error budgets for your services',
    theoryLink: '/articles/sla-design',
    playgroundLink: '/playgrounds/production-readiness/sla-calculator',
    icon: '🎯',
    category: 'operations',
    estimatedTime: '15 min',
    status: 'not_started'
  },
  {
    id: 'security-assessment',
    title: 'Security Architecture Review',
    description: 'Assess defense-in-depth security across all layers',
    theoryLink: '/articles/defense-in-depth-security',
    playgroundLink: '/playgrounds/production-readiness/security-assessment',
    icon: '🔒',
    category: 'security',
    estimatedTime: '20 min',
    status: 'not_started'
  }
]

/**
 * Calculate overall readiness progress
 */
export function calculateProgress(steps: ReadinessStep[]): ReadinessProgress {
  const totalSteps = steps.length
  const completedSteps = steps.filter(s => s.status === 'completed').length
  const overallProgress = Math.round((completedSteps / totalSteps) * 100)

  return {
    steps,
    overallProgress,
    completedSteps,
    totalSteps,
    lastUpdated: new Date()
  }
}

/**
 * Get progress color based on percentage
 */
export function getProgressColor(progress: number): string {
  if (progress >= 80) return 'green'
  if (progress >= 50) return 'yellow'
  if (progress >= 20) return 'orange'
  return 'red'
}

/**
 * Get step status badge
 */
export function getStatusBadge(status: ReadinessStep['status']): {
  label: string
  color: string
} {
  switch (status) {
    case 'completed':
      return { label: 'Completed', color: 'bg-green-100 text-green-700' }
    case 'in_progress':
      return { label: 'In Progress', color: 'bg-blue-100 text-blue-700' }
    default:
      return { label: 'Not Started', color: 'bg-slate-100 text-slate-700' }
  }
}

/**
 * Get category color
 */
export function getCategoryColor(category: ReadinessStep['category']): string {
  const colors = {
    assessment: 'blue',
    planning: 'purple',
    security: 'red',
    operations: 'green'
  }
  return colors[category] || 'slate'
}

/**
 * Generate production readiness report
 */
export function generateReadinessReport(progress: ReadinessProgress): string {
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  let report = `# Production Readiness Assessment Report\n\n`
  report += `**Date:** ${date}\n\n`
  report += `**Overall Progress:** ${progress.overallProgress}%\n\n`
  report += `**Completed Steps:** ${progress.completedSteps} of ${progress.totalSteps}\n\n`
  report += `---\n\n`

  // Executive Summary
  report += `## Executive Summary\n\n`
  if (progress.overallProgress >= 80) {
    report += `This architecture has completed a comprehensive production readiness assessment (${progress.overallProgress}%) and is **ready for production deployment** with appropriate operational support.\n\n`
  } else if (progress.overallProgress >= 50) {
    report += `This architecture has completed ${progress.overallProgress}% of the production readiness assessment. **Additional work is required** before production deployment.\n\n`
  } else {
    report += `This architecture is in the early stages of production readiness assessment (${progress.overallProgress}% complete). **Significant work remains** before production deployment is recommended.\n\n`
  }

  // Step-by-Step Results
  report += `## Assessment Results\n\n`

  progress.steps.forEach((step, index) => {
    report += `### ${index + 1}. ${step.title}\n\n`
    report += `**Status:** ${step.status === 'completed' ? '✅ Completed' : step.status === 'in_progress' ? '🔄 In Progress' : '⏳ Not Started'}\n\n`
    report += `**Description:** ${step.description}\n\n`

    if (step.status === 'completed' && step.score !== undefined) {
      report += `**Score:** ${step.score}/100\n\n`
    }

    if (step.theoryLink) {
      report += `**Learn More:** ${step.theoryLink}\n\n`
    }

    report += `---\n\n`
  })

  // Recommendations
  const incompleteSteps = progress.steps.filter(s => s.status !== 'completed')
  if (incompleteSteps.length > 0) {
    report += `## Recommendations\n\n`
    report += `To complete your production readiness assessment, focus on:\n\n`
    incompleteSteps.forEach(step => {
      report += `- **${step.title}** (${step.estimatedTime})\n`
    })
    report += `\n`
  }

  // Next Steps
  report += `## Next Steps\n\n`
  if (progress.overallProgress >= 80) {
    report += `1. Review all assessment results with your team\n`
    report += `2. Create action items for any identified gaps\n`
    report += `3. Schedule production deployment\n`
    report += `4. Set up monitoring and alerting\n`
    report += `5. Prepare runbooks and incident response procedures\n`
  } else {
    report += `1. Complete remaining assessment steps\n`
    report += `2. Address any critical gaps identified\n`
    report += `3. Re-assess when ready\n`
    report += `4. Schedule production deployment planning\n`
  }

  report += `\n---\n\n`
  report += `*Generated by Digital Platform Architect - Production Readiness Hub*\n`

  return report
}
