'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Activity, BarChart3, ClipboardList, Compass, Database, FileStack, LayoutGrid, ShieldCheck, Sparkles } from 'lucide-react'
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
          <p className="text-slate-600">Loading architecture explorer…</p>
        </div>
      </div>
    ),
  },
)

const FEATURED_PLAYGROUNDS = [
  {
    href: '/playgrounds/capacity-planning',
    title: 'Capacity planning',
    desc: 'Turn throughput and latency NFRs into resource and cost estimates.',
    tag: 'NFR: scale & cost',
    Icon: BarChart3,
  },
  {
    href: '/playgrounds/data-pipeline',
    title: 'Data pipeline',
    desc: 'Trace data paths and where durability or ordering requirements bite.',
    tag: 'NFR: durability',
    Icon: Database,
  },
  {
    href: '/playgrounds/message-flow',
    title: 'Message flow',
    desc: 'Compare sync vs async against latency and failure-isolation NFRs.',
    tag: 'NFR: latency & resilience',
    Icon: Activity,
  },
]

const WORKFLOW = [
  {
    href: '/playgrounds/system-design-framework',
    title: '1. Capture FRs and NFRs',
    body: 'Clarify features, users, and constraints; agree on SLOs, security, and cost boundaries before you draw boxes.',
    Icon: ClipboardList,
  },
  {
    href: '/playgrounds/system-design-framework',
    title: '2. Shape the design',
    body: 'Propose a high-level design, walk concrete use cases, and deep-dive where trade-offs matter most.',
    Icon: LayoutGrid,
  },
  {
    href: '/playgrounds/production-readiness',
    title: '3. Validate against NFRs',
    body: 'Check readiness: observability, failure modes, and operational hardening for what you committed to.',
    Icon: ShieldCheck,
  },
] as const

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
              System design: requirements first
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              From functional and non-functional requirements to a defensible system design
            </h1>
            <p className="mt-3 max-w-3xl text-base text-slate-600 sm:text-lg">
              Name the behaviors you must support (FRs) and the qualities you must meet (NFRs: latency, availability,
              durability, cost, security). Then use the guided flow to design, stress-test, and cross-check with
              reference blueprints.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/playgrounds/system-design-framework" className="btn-primary">
                <FileStack className="h-4 w-4" />
                Start a design
              </Link>
              <Link href="/playgrounds/production-readiness" className="btn-secondary">
                <ShieldCheck className="h-4 w-4" />
                Validate readiness
              </Link>
              <Link href="/blueprints" className="btn-secondary">
                <ClipboardList className="h-4 w-4" />
                Browse blueprints
              </Link>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
              <Link href="/playgrounds" className="text-[var(--accent)] font-medium hover:underline">
                All playgrounds
              </Link>
              <span className="hidden sm:inline">·</span>
              <button type="button" onClick={handleGuidanceClick} className="text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" />
                Personalized guidance
              </button>
            </div>
          </div>
        </div>
      </section>

      {enabled && (
        <section className="bg-white border-b border-slate-200" aria-labelledby="recommended-next-steps">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="space-y-4">
              <PersonalizedSectionHeader
                title="Recommended next steps"
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

      <section className="bg-[var(--surface-1)] border-b border-slate-200" aria-labelledby="workflow-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <h2 id="workflow-heading" className="text-lg sm:text-xl font-bold text-slate-900 text-center">
            A simple system-design loop
          </h2>
          <p className="mt-1 text-sm text-slate-500 text-center max-w-2xl mx-auto mb-8">
            Every interview and real project starts the same: explicit FRs, explicit NFRs, then a design you can validate.
          </p>
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {WORKFLOW.map((w) => (
              <Link
                key={w.title}
                href={w.href}
                className="card-interactive group p-5 focus:ring-2 focus:ring-blue-500"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-lg bg-blue-50 p-2 text-blue-700">
                    <w.Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-800">{w.title}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{w.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className="flex-1 flex overflow-hidden border-b border-slate-200"
        aria-label="Interactive architecture explorer (optional reference)"
        style={{ minHeight: 'min(70vh, 720px)' }}
      >
        <div className="hidden lg:flex lg:flex-col w-80 xl:w-[22rem] bg-white border-r border-slate-200 overflow-y-auto p-4 space-y-4">
          <VerticalSelector />
          <PersonaSelector />
          <LevelControls />

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-sm font-bold text-slate-900 mb-2">How to use</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>Choose a persona to match interview tone.</li>
              <li>Use depth (L0–L3) to keep FR/NFR discussion at the right level.</li>
              <li>Click nodes to inspect how parts relate to your requirements.</li>
            </ul>
            <p className="mt-3 text-xs text-slate-500">
              For full screen:{' '}
              <Link href="/architecture-playground" className="text-[var(--accent)] font-medium hover:underline">
                Architecture playground
              </Link>
            </p>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-h-[320px]">
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

      <section className="bg-[var(--surface-0)]" aria-labelledby="playgrounds-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="mb-6 text-center">
            <h2 id="playgrounds-heading" className="text-lg sm:text-xl font-bold text-slate-900">
              Playgrounds that stress NFRs
            </h2>
            <p className="mt-1 text-sm text-slate-500">Quick sandboxes to connect requirements to numbers and flows.</p>
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
                    ux_variant: `featured_${pg.tag.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`,
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
              Browse all playgrounds
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
