'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {
  Activity,
  BarChart3,
  BookOpen,
  Compass,
  Database,
  Hammer,
  Sparkles,
} from 'lucide-react'
import VerticalSelector from './architecture-playground/components/VerticalSelector'
import PersonaSelector from './architecture-playground/components/PersonaSelector'
import LevelControls from './architecture-playground/components/LevelControls'
import ContextPanel from './architecture-playground/components/ContextPanel'
import OnboardingModal from '@/components/onboarding/OnboardingModal'
import ContextOverrideControl from '@/components/personalization/ContextOverrideControl'
import PersonalizedSectionHeader from '@/components/personalization/PersonalizedSectionHeader'
import ReasonChips from '@/components/personalization/ReasonChips'
import { useOnboardingStore } from '@/lib/onboarding/store'
import { emitPersonalizationEvent } from '@/lib/personalization/telemetry'
import { trackRecommendationClick, usePersonalization } from '@/lib/personalization/use-personalization'

const PlaygroundCanvas = dynamic(
  () => import('./architecture-playground/components/PlaygroundCanvas'),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-1 items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-[var(--accent)]" />
          <p className="text-slate-600">Loading Architecture Explorer...</p>
        </div>
      </div>
    ),
  },
)

const FEATURED_PLAYGROUNDS = [
  {
    href: '/playgrounds/capacity-planning',
    title: 'Capacity Planning Calculator',
    desc: 'Estimate infrastructure requirements and costs for your target load profile.',
    tag: 'Infrastructure',
    Icon: BarChart3,
  },
  {
    href: '/playgrounds/data-pipeline',
    title: 'Data Pipeline Choreography',
    desc: 'Model ingestion-to-analytics flow and identify bottlenecks across the path.',
    tag: 'Data',
    Icon: Database,
  },
  {
    href: '/playgrounds/message-flow',
    title: 'Message Flow Animation',
    desc: 'Compare synchronous and asynchronous integration behavior between services.',
    tag: 'Messaging',
    Icon: Activity,
  },
]

export default function HomePage() {
  const { openModal } = useOnboardingStore()
  const [showOverride, setShowOverride] = useState(false)
  const { enabled, recommendations, context, sessionActive, dismiss, setOverride } = usePersonalization({
    surface: 'home',
    limit: 3,
  })

  const handleGuidanceClick = () => {
    emitPersonalizationEvent('ux_home_cta_click', {
      surface: 'home',
      role: context.role,
      goal: context.goal,
      session_active: sessionActive,
      ux_variant: 'hero_guidance',
    })
    openModal()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <OnboardingModal />

      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-100 to-[var(--surface-0)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="max-w-4xl">
            <p className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold tracking-wide text-slate-700">
              Architecture Learning Platform
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Learn, simulate, and validate architecture decisions
            </h1>
            <p className="mt-3 max-w-3xl text-base text-slate-600 sm:text-lg">
              Explore architecture visually, personalize learning paths, and move from theory to operationally-ready
              design choices with less visual noise and clearer next steps.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={handleGuidanceClick} className="btn-primary">
                <Sparkles className="h-4 w-4" />
                Get Personalized Guidance
              </button>
              <Link href="/playgrounds" className="btn-secondary">
                View Playgrounds
              </Link>
            </div>
          </div>
        </div>
      </section>

      {enabled && (
        <section className="bg-white border-b border-slate-200" aria-labelledby="recommended-next-steps">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="space-y-4">
              <PersonalizedSectionHeader
                title="Recommended Next Steps"
                subtitle="Actions ranked by your current role and goal context."
                context={context}
                sessionActive={sessionActive}
                onChangeContext={() => setShowOverride((previous) => !previous)}
              />

              {showOverride && (
                <ContextOverrideControl
                  role={context.role}
                  goal={context.goal}
                  source={context.source}
                  onApply={setOverride}
                  onDone={() => setShowOverride(false)}
                />
              )}

              <div className="grid gap-4 lg:grid-cols-3">
                {recommendations.map((recommendation) => (
                  <article key={recommendation.id} className="card-standard">
                    <h3 className="text-base font-bold text-slate-900">{recommendation.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{recommendation.description}</p>
                    <ReasonChips chips={recommendation.reasonChips} className="mt-3" />

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Link
                        href={recommendation.href}
                        className="btn-primary px-3 py-1.5 text-sm"
                        onClick={() => trackRecommendationClick('home', recommendation, context, sessionActive)}
                      >
                        Open
                      </Link>
                      <button
                        type="button"
                        onClick={() => dismiss(recommendation.id, 14)}
                        className="btn-secondary px-3 py-1.5 text-sm"
                      >
                        Not relevant
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section
        className="flex-1 flex overflow-hidden border-b border-slate-200"
        aria-label="Interactive Architecture Playground"
        style={{ minHeight: 'calc(100vh - 220px)' }}
      >
        <div className="hidden lg:flex lg:flex-col w-80 xl:w-[22rem] bg-white border-r border-slate-200 overflow-y-auto p-4 space-y-4">
          <VerticalSelector />
          <PersonaSelector />
          <LevelControls />

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-sm font-bold text-slate-900 mb-2">How to use</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>Choose your role to tailor detail and language.</li>
              <li>Select depth level (L0-L3) to control abstraction.</li>
              <li>Click a node to inspect architecture context and rationale.</li>
              <li>Use scroll to zoom and drag to pan the canvas.</li>
            </ul>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="lg:hidden flex items-center gap-2 p-3 bg-white border-b border-slate-200 overflow-x-auto">
            <div className="flex-shrink-0">
              <VerticalSelector />
            </div>
            <div className="flex-shrink-0">
              <PersonaSelector />
            </div>
            <div className="flex-shrink-0">
              <LevelControls />
            </div>
          </div>

          <PlaygroundCanvas architectureId="ecommerce-platform" />
        </div>

        <div className="hidden xl:block w-96 bg-white border-l border-slate-200 overflow-y-auto">
          <ContextPanel />
        </div>
      </section>

      <section className="bg-[var(--surface-1)] border-b border-slate-200" aria-labelledby="journey-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[
              { value: '9', label: 'Building Blocks' },
              { value: '65+', label: 'Patterns' },
              { value: '8', label: 'Playgrounds' },
              { value: '9', label: 'Personas' },
            ].map((stat) => (
              <div key={stat.label} className="card-standard py-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-slate-900">{stat.value}</div>
                <div className="mt-1 text-xs sm:text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>

          <h2 id="journey-heading" className="text-lg sm:text-xl font-bold text-center mb-2 text-slate-900">
            Start Your Journey
          </h2>
          <p className="text-sm text-slate-500 text-center mb-6 max-w-lg mx-auto">
            Choose theory or practice based on what you need next.
          </p>

          <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            <Link href="/patterns" className="card-interactive group p-6 focus:ring-2 focus:ring-blue-500">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-lg bg-blue-50 p-2 text-blue-700">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Theory</h3>
              </div>
              <p className="text-sm text-slate-600">
                Understand when and why to apply architecture patterns and trade-offs.
              </p>
              <span className="mt-3 inline-flex text-xs font-semibold text-blue-700">Explore Theory →</span>
            </Link>

            <Link href="/playgrounds" className="card-interactive group p-6 focus:ring-2 focus:ring-blue-500">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-lg bg-blue-50 p-2 text-blue-700">
                  <Hammer className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Practice</h3>
              </div>
              <p className="text-sm text-slate-600">
                Build and test architecture decisions in guided interactive environments.
              </p>
              <span className="mt-3 inline-flex text-xs font-semibold text-blue-700">Start Practicing →</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface-0)]" aria-labelledby="playgrounds-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="mb-6 text-center">
            <h2 id="playgrounds-heading" className="text-lg sm:text-xl font-bold text-slate-900">
              Featured Playgrounds
            </h2>
            <p className="mt-1 text-sm text-slate-500">Focused tools for planning, data flow, and integrations.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {FEATURED_PLAYGROUNDS.map((pg) => (
              <Link
                key={pg.href}
                href={pg.href}
                className="card-interactive group p-5 focus:ring-2 focus:ring-blue-500"
                onClick={() =>
                  emitPersonalizationEvent('ux_home_cta_click', {
                    surface: 'home',
                    role: context.role,
                    goal: context.goal,
                    session_active: sessionActive,
                    ux_variant: `featured_${pg.tag.toLowerCase()}`,
                  })
                }
              >
                <div className="mb-3 flex items-center gap-2">
                  <div className="rounded-md bg-blue-50 p-2 text-blue-700">
                    <pg.Icon className="h-4 w-4" />
                  </div>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                    {pg.tag}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-blue-700">{pg.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{pg.desc}</p>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link href="/playgrounds" className="btn-secondary">
              <Compass className="h-4 w-4" />
              Browse All Playgrounds
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
