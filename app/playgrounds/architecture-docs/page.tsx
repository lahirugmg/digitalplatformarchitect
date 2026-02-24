import type { Metadata } from 'next'
import Link from 'next/link'
import { ArchitectureExplorer } from '@/components/architecture-docs/ArchitectureExplorer'

const ARCHITECTURE_FOCUS_AREAS = [
  {
    title: 'Business architecture',
    detail: 'Value streams, capability ownership, and KPI intent.',
  },
  {
    title: 'Solution architecture',
    detail: 'Context, containers, interfaces, and component boundaries.',
  },
  {
    title: 'Deployment architecture',
    detail: 'Runtime topology, resilience, and operational controls.',
  },
]

const QUICK_START_STEPS = [
  'Select the role preset that best matches your audience.',
  'Set L0-L3 depth to control abstraction and node density.',
  'Expand or collapse branches to inspect specific documentation handoffs.',
]

const DOCUMENTATION_CHECKLIST = [
  'Keep one consistent naming convention across diagrams and ADRs.',
  'Show interfaces and ownership boundaries before implementation details.',
  'Capture key design decisions with rationale and trade-offs.',
  'Tie deployment/runtime views back to reliability and security expectations.',
]

const DIAGRAM_LANGUAGE_GUIDE = [
  'Shapes encode entity type (service, datastore, actor).',
  'Connector direction shows request or event flow.',
  'Color should communicate layer semantics, not decoration.',
  'A short legend should always live with the diagram.',
]

const RELATED_PLAYGROUNDS = [
  {
    href: '/architecture-playground',
    title: 'Architecture Playground',
    description: 'Move from documentation views to persona-driven architecture exploration.',
  },
  {
    href: '/playgrounds/pattern-composer',
    title: 'Pattern Composer',
    description: 'Experiment with architecture pattern combinations and trade-offs.',
  },
  {
    href: '/playgrounds',
    title: 'All Playgrounds',
    description: 'Browse all interactive architecture tools in one place.',
  },
]

export const metadata: Metadata = {
  title: 'Architecture Documentation Explorer | Interactive Playground',
  description:
    'Interactive architecture documentation across business, solution, and deployment views. Compare role perspectives at L0-L3 detail.',
}

export default function ArchitectureDocsPlayground() {
  return (
    <div className="min-h-screen bg-[var(--surface-0)]">
      <section className="border-b border-slate-200 bg-gradient-to-b from-white via-slate-50 to-[var(--surface-0)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <div className="max-w-3xl">
            <span className="badge-primary">Interactive Playground</span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Architecture Documentation Explorer
            </h1>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              Use this workspace to calibrate what each stakeholder needs to see across business,
              solution, and deployment documentation.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {ARCHITECTURE_FOCUS_AREAS.map((area) => (
              <div key={area.title} className="card-standard p-4">
                <h2 className="text-sm font-semibold text-slate-900">{area.title}</h2>
                <p className="mt-1 text-sm text-slate-600">{area.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#architecture-explorer" className="btn-primary">
              Start exploring
            </a>
            <Link href="/playgrounds" className="btn-secondary">
              Browse all playgrounds
            </Link>
          </div>
        </div>
      </section>

      <main
        id="architecture-explorer"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
      >
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="self-start space-y-4 lg:sticky lg:top-24">
            <section className="card-standard">
              <h2 className="text-base font-semibold text-slate-900">Quick start</h2>
              <ol className="mt-3 space-y-3">
                {QUICK_START_STEPS.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm text-slate-600">
                    <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <details className="card-standard">
              <summary className="cursor-pointer text-sm font-semibold text-slate-900">
                Why this matters
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                Architecture docs fail when every audience receives the same level of detail.
                This explorer helps you separate strategic intent from implementation depth while
                preserving traceability between them.
              </p>
            </details>

            <details className="card-standard">
              <summary className="cursor-pointer text-sm font-semibold text-slate-900">
                Documentation checklist
              </summary>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {DOCUMENTATION_CHECKLIST.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-accent" aria-hidden="true">
                      -
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </details>

            <details className="card-standard">
              <summary className="cursor-pointer text-sm font-semibold text-slate-900">
                Diagram language guide
              </summary>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {DIAGRAM_LANGUAGE_GUIDE.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-accent" aria-hidden="true">
                      -
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </details>
          </aside>

          <div className="space-y-6">
            <ArchitectureExplorer />

            <section className="card-standard">
              <h2 className="text-base font-semibold text-slate-900">Continue with related playgrounds</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {RELATED_PLAYGROUNDS.map((playground) => (
                  <Link key={playground.href} href={playground.href} className="card-interactive p-4">
                    <h3 className="text-sm font-semibold text-slate-900">{playground.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{playground.description}</p>
                    <span className="mt-3 inline-block text-sm font-medium text-accent">Open</span>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
