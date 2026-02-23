'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import ContextOverrideControl from '@/components/personalization/ContextOverrideControl'
import PersonalizedSectionHeader from '@/components/personalization/PersonalizedSectionHeader'
import {
  trackRecommendationClick,
  usePersonalization,
} from '@/lib/personalization/use-personalization'

interface PlaygroundCard {
  id: string
  title: string
  icon: string
  description: string
  difficulty: string
  duration: string
  tags: string[]
  href: string
}

const PLAYGROUNDS: PlaygroundCard[] = [
  {
    id: 'architecture-docs',
    title: 'Architecture Documentation Explorer',
    icon: '📚',
    description:
      'Explore architecture documentation across Business, Solution, and Deployment views. See how different roles view architecture at different levels.',
    difficulty: 'Beginner',
    duration: '10-15 min',
    tags: ['Documentation', 'C4 Model', 'Multi-Layer'],
    href: '/playgrounds/architecture-docs',
  },
  {
    id: 'capacity-planning',
    title: 'Capacity Planning Calculator',
    icon: '💡',
    description:
      'Calculate infrastructure requirements, estimate costs, and plan for scale. Interactive playground for sizing your system correctly.',
    difficulty: 'Beginner',
    duration: '10-15 min',
    tags: ['Infrastructure', 'Cost Optimization', 'Performance'],
    href: '/playgrounds/capacity-planning',
  },
  {
    id: 'operational-sympathy',
    title: 'Operational Sympathy Scorecard',
    icon: '🧭',
    description:
      'Evaluate production readiness with a weighted nine-element scorecard. Identify operational risks and export a concise report.',
    difficulty: 'Beginner',
    duration: '10-15 min',
    tags: ['Production Readiness', 'Risk Assessment', 'Operations'],
    href: '/playgrounds/operational-sympathy',
  },
  {
    id: 'data-pipeline',
    title: 'Data Pipeline Choreography',
    icon: '🌊',
    description:
      'Build end-to-end data pipelines from IoT sensors to analytics. Visualize data flowing like water through your architecture.',
    difficulty: 'Beginner',
    duration: '15-20 min',
    tags: ['Data Architecture', 'Stream Processing', 'Analytics'],
    href: '/playgrounds/data-pipeline',
  },
  {
    id: 'message-flow',
    title: 'Message Flow Animation',
    icon: '⚡',
    description:
      'Design integration patterns and watch messages flow between services. Experience synchronous vs asynchronous behavior.',
    difficulty: 'Intermediate',
    duration: '20-25 min',
    tags: ['Integration', 'Messaging', 'Event-Driven'],
    href: '/playgrounds/message-flow',
  },
  {
    id: 'enterprise-integration',
    title: 'Enterprise Integration',
    icon: '🔗',
    description:
      'Connect heterogeneous systems with transformation patterns, routing logic, and message choreography.',
    difficulty: 'Intermediate',
    duration: '25-30 min',
    tags: ['Integration', 'ESB', 'Transformation'],
    href: '/playgrounds/enterprise-integration',
  },
]

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

  if (!enabled) {
    return (
      <div className="min-h-screen py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Interactive Playgrounds</h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl">
              Hands-on learning environments where you build, experiment, and master enterprise architecture patterns through virtual interaction.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" role="list" aria-label="Available playgrounds">
            {PLAYGROUNDS.map((playground) => (
              <Link
                key={playground.id}
                href={playground.href}
                className="border border-slate-200 rounded-lg p-6 hover:shadow-xl hover:border-blue-300 transition group bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                role="listitem"
                aria-label={`${playground.title} - ${playground.difficulty} - ${playground.duration}`}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition">{playground.icon}</div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600">{playground.title}</h3>
                <p className="text-slate-600 mb-4">{playground.description}</p>

                <div className="flex items-center gap-4 mb-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <span>📊</span> {playground.difficulty}
                  </span>
                  <span className="flex items-center gap-1">
                    <span>⏱️</span> {playground.duration}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {playground.tags.map((tag) => (
                    <span key={tag} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="text-blue-600 font-medium group-hover:underline">Launch Playground →</span>
              </Link>
            ))}
          </div>

          <div className="mt-12 sm:mt-16">
            <h2 className="text-2xl font-bold mb-6">Coming Soon</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {['CAP Theorem Simulator', 'Architecture Builder', 'Pattern Composer'].map((title) => (
                <div key={title} className="border border-slate-200 rounded-lg p-6 bg-slate-50 opacity-60">
                  <h3 className="text-xl font-bold mb-2">{title}</h3>
                  <p className="text-slate-500">Under development</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-4 sm:mb-10">
          <PersonalizedSectionHeader
            title="Interactive Playgrounds"
            subtitle="Hands-on learning environments where you build, experiment, and master enterprise architecture patterns through virtual interaction."
            context={context}
            sessionActive={sessionActive}
            onChangeContext={enabled ? () => setShowOverride((previous) => !previous) : undefined}
          />

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

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          role="list"
          aria-label="Available playgrounds"
        >
          {sortedPlaygrounds.map((playground) => {
            const ranked = recommendationByHref.get(playground.href)
            const isTopMatch = enabled && ranked && ranked.index <= 1

            return (
              <Link
                key={playground.id}
                href={playground.href}
                className="border border-slate-200 rounded-lg p-6 hover:shadow-xl hover:border-blue-300 transition group bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                  <div className="text-5xl group-hover:scale-110 transition">{playground.icon}</div>
                  {isTopMatch && (
                    <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                      Recommended for you
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600">{playground.title}</h3>
                <p className="text-slate-600 mb-4">{playground.description}</p>

                <div className="flex items-center gap-4 mb-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <span>📊</span> {playground.difficulty}
                  </span>
                  <span className="flex items-center gap-1">
                    <span>⏱️</span> {playground.duration}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {playground.tags.map((tag) => (
                    <span key={tag} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="text-blue-600 font-medium group-hover:underline">Launch Playground →</span>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 sm:mt-16">
          <h2 className="text-2xl font-bold mb-6">Coming Soon</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {['CAP Theorem Simulator', 'Architecture Builder', 'Pattern Composer'].map((title) => (
              <div key={title} className="border border-slate-200 rounded-lg p-6 bg-slate-50 opacity-60">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-slate-500">Under development</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
