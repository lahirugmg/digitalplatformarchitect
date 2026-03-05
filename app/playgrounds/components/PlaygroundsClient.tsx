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
    <div className="min-h-screen relative overflow-hidden bg-slate-950 text-slate-100 py-12 sm:py-20">
      {/* Premium Background Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[80%] h-[80%] rounded-full bg-cyan-600/20 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4 sm:mb-16 text-center">
          {enabled ? (
            <div className="inline-block glass-card p-6 rounded-2xl mx-auto shadow-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <PersonalizedSectionHeader
                title="Interactive Playgrounds"
                subtitle="Hands-on environments for architecture exploration with practical guidance."
                context={context}
                sessionActive={sessionActive}
                onChangeContext={() => setShowOverride((previous) => !previous)}
              />
            </div>
          ) : (
            <div className="inline-block">
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text">
                Interactive Playgrounds
              </h1>
              <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400">
                Explore architecture in motion. Build, test, and master patterns in our beautifully crafted interactive environments.
              </p>
            </div>
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10" role="list" aria-label="Available playgrounds">
          {sortedPlaygrounds.map((playground) => {
            const ranked = recommendationByHref.get(playground.href)
            const isTopMatch = enabled && ranked && ranked.index <= 1

            return (
              <Link
                key={playground.id}
                href={playground.href}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:shadow-2xl hover:shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                role="listitem"
                aria-label={`${playground.title} - ${playground.difficulty} - ${playground.duration}`}
                onClick={() => {
                  if (!ranked) {
                    return
                  }
                  trackRecommendationClick('playgrounds', ranked.recommendation, context, sessionActive)
                }}
              >
                {/* Subtle Hover Gradient Inside Card */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div className="flex items-center justify-center rounded-xl bg-blue-500/20 p-3 text-blue-300 shadow-inner shadow-white/5 ring-1 ring-white/10 transition-transform group-hover:scale-110">
                      <playground.Icon className="h-6 w-6" />
                    </div>
                    {isTopMatch && (
                      <span className="rounded-full border border-blue-400/30 bg-blue-500/20 px-3 py-1 text-xs font-semibold tracking-wide text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                        Recommended
                      </span>
                    )}
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-white tracking-tight">{playground.title}</h3>
                  <p className="mb-6 text-sm text-slate-400 leading-relaxed font-light">{playground.description}</p>
                </div>

                <div className="relative z-10 mt-auto">
                  <div className="mb-5 flex items-center gap-4 text-xs font-medium text-slate-400">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> {playground.difficulty}</span>
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> {playground.duration}</span>
                  </div>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {playground.tags.map((tag) => (
                      <span key={tag} className="rounded-md border border-white/5 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center text-sm font-semibold text-blue-400 transition-colors group-hover:text-blue-300">
                    Launch Playground
                    <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-16 sm:mt-24 relative z-10 border-t border-white/10 pt-12">
          <h2 className="mb-8 text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <span className="text-xl">✨</span> Coming Soon
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {COMING_SOON.map((title) => (
              <div key={title} className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm opacity-60">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/5 blur-2xl"></div>
                <h3 className="mb-2 text-lg font-bold text-slate-300">{title}</h3>
                <p className="text-sm text-slate-500 font-medium">Under active development</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
