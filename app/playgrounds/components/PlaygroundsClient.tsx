'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  Activity,
  BookOpen,
  Database,
  Gauge,
  Network,
  ShieldCheck,
  ShieldAlert,
} from 'lucide-react'
import ContextOverrideControl from '@/components/personalization/ContextOverrideControl'
import PersonalizedSectionHeader from '@/components/personalization/PersonalizedSectionHeader'
import {
  trackRecommendationClick,
  usePersonalization,
} from '@/lib/personalization/use-personalization'

interface PlaygroundCard {
  id: string
  title: string
  description: string
  difficulty: string
  duration: string
  tags: string[]
  href: string
  Icon: React.ComponentType<{ className?: string }>
}

const PLAYGROUNDS: PlaygroundCard[] = [
  {
    id: 'architecture-docs',
    title: 'Architecture Documentation Explorer',
    description:
      'Explore architecture documentation across business, solution, and deployment perspectives.',
    difficulty: 'Beginner',
    duration: '10-15 min',
    tags: ['Documentation', 'C4 Model', 'Multi-Layer'],
    href: '/playgrounds/architecture-docs',
    Icon: BookOpen,
  },
  {
    id: 'capacity-planning',
    title: 'Capacity Planning Calculator',
    description:
      'Use industry templates to compare baseline and optimized scenarios with 12-month capacity and cost projections.',
    difficulty: 'Beginner',
    duration: '10-15 min',
    tags: ['Templates', 'Scenario Compare', 'Cost Forecasting'],
    href: '/playgrounds/capacity-planning',
    Icon: Gauge,
  },
  {
    id: 'operational-sympathy',
    title: 'Operational Sympathy Scorecard',
    description:
      'Assess production readiness with a weighted nine-element scorecard and prioritized risk gaps.',
    difficulty: 'Beginner',
    duration: '10-15 min',
    tags: ['Production Readiness', 'Risk Assessment', 'Operations'],
    href: '/playgrounds/operational-sympathy',
    Icon: ShieldCheck,
  },
  {
    id: 'security-assessment',
    title: 'Security Assessment Matrix',
    description:
      'Evaluate platform security posture across ten weighted controls and surface the highest-impact remediation priorities.',
    difficulty: 'Beginner',
    duration: '10-15 min',
    tags: ['Security', 'Risk Assessment', 'Compliance'],
    href: '/playgrounds/security-assessment',
    Icon: ShieldAlert,
  },
  {
    id: 'data-pipeline',
    title: 'Data Pipeline Choreography',
    description: 'Model ingestion-to-analytics pipelines and inspect throughput and resilience considerations.',
    difficulty: 'Beginner',
    duration: '15-20 min',
    tags: ['Data Architecture', 'Stream Processing', 'Analytics'],
    href: '/playgrounds/data-pipeline',
    Icon: Database,
  },
  {
    id: 'message-flow',
    title: 'Message Flow Animation',
    description: 'Compare synchronous and asynchronous service communication behavior through simulation.',
    difficulty: 'Intermediate',
    duration: '20-25 min',
    tags: ['Integration', 'Messaging', 'Event-Driven'],
    href: '/playgrounds/message-flow',
    Icon: Activity,
  },
  {
    id: 'enterprise-integration',
    title: 'Enterprise Integration',
    description: 'Design routing and transformation strategies across heterogeneous systems.',
    difficulty: 'Intermediate',
    duration: '25-30 min',
    tags: ['Integration', 'ESB', 'Transformation'],
    href: '/playgrounds/enterprise-integration',
    Icon: Network,
  },
]

const COMING_SOON = ['CAP Theorem Simulator', 'Architecture Builder', 'Pattern Composer']

export default function PlaygroundsClient() {
  const [showOverride, setShowOverride] = useState(false)
  const { enabled, recommendations, context, sessionActive, setOverride } = usePersonalization({
    surface: 'playgrounds',
    limit: PLAYGROUNDS.length,
  })

  const recommendationByHref = useMemo(() => {
    return recommendations.reduce(
      (acc, recommendation, index) => {
        acc.set(recommendation.href, {
          recommendation,
          index,
        })
        return acc
      },
      new Map<string, { index: number; recommendation: (typeof recommendations)[number] }>(),
    )
  }, [recommendations])

  const sortedPlaygrounds = useMemo(() => {
    if (!enabled || recommendations.length === 0) {
      return PLAYGROUNDS
    }

    return [...PLAYGROUNDS].sort((left, right) => {
      const leftRank = recommendationByHref.get(left.href)?.index ?? Number.MAX_SAFE_INTEGER
      const rightRank = recommendationByHref.get(right.href)?.index ?? Number.MAX_SAFE_INTEGER

      if (leftRank !== rightRank) {
        return leftRank - rightRank
      }

      return left.title.localeCompare(right.title)
    })
  }, [enabled, recommendationByHref, recommendations.length])

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-4 sm:mb-10">
          {enabled ? (
            <PersonalizedSectionHeader
              title="Interactive Playgrounds"
              subtitle="Hands-on environments for architecture exploration with practical guidance."
              context={context}
              sessionActive={sessionActive}
              onChangeContext={() => setShowOverride((previous) => !previous)}
            />
          ) : (
            <>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Interactive Playgrounds</h1>
              <p className="max-w-3xl text-lg text-slate-600">
                Hands-on environments for architecture exploration with practical guidance.
              </p>
            </>
          )}

          {enabled && showOverride && (
            <ContextOverrideControl
              role={context.role}
              goal={context.goal}
              source={context.source}
              onApply={setOverride}
              onDone={() => setShowOverride(false)}
            />
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" role="list" aria-label="Available playgrounds">
          {sortedPlaygrounds.map((playground) => {
            const ranked = recommendationByHref.get(playground.href)
            const isTopMatch = enabled && ranked && ranked.index <= 1

            return (
              <Link
                key={playground.id}
                href={playground.href}
                className="card-interactive focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                role="listitem"
                aria-label={`${playground.title} - ${playground.difficulty} - ${playground.duration}`}
                onClick={() => {
                  if (!ranked) {
                    return
                  }
                  trackRecommendationClick('playgrounds', ranked.recommendation, context, sessionActive)
                }}
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="rounded-lg bg-blue-50 p-2 text-blue-700">
                    <playground.Icon className="h-5 w-5" />
                  </div>
                  {isTopMatch && (
                    <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                      Recommended
                    </span>
                  )}
                </div>

                <h3 className="mb-2 text-lg font-bold text-slate-900">{playground.title}</h3>
                <p className="mb-4 text-sm text-slate-600">{playground.description}</p>

                <div className="mb-4 flex items-center gap-4 text-sm text-slate-500">
                  <span>{playground.difficulty}</span>
                  <span>{playground.duration}</span>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {playground.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="text-sm font-semibold text-blue-700">Launch Playground →</span>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 sm:mt-16">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Coming Soon</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {COMING_SOON.map((title) => (
              <div key={title} className="card-standard opacity-80">
                <h3 className="mb-2 text-xl font-bold text-slate-900">{title}</h3>
                <p className="text-slate-500">Under development</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
