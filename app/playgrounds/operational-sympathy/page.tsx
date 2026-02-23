import type { Metadata } from 'next'
import { SCORE_BANDS } from '@/lib/operational-sympathy'
import { OperationalSympathyPlayground } from '@/components/operational-sympathy/OperationalSympathyPlayground'

export const metadata: Metadata = {
  title: 'Operational Sympathy Scorecard | Interactive Playground',
  description:
    'Evaluate architecture operational readiness with a weighted nine-element scorecard. Live scoring, autosave, and markdown export.',
}

export default function OperationalSympathyPlaygroundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <section className="border-b border-slate-200 bg-white/90">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold tracking-wide text-slate-700">
              Production Readiness Playground
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Operational Sympathy Scorecard
            </h1>
            <p className="mt-3 text-base text-slate-600 sm:text-lg">
              Score your architecture against production realities and identify the highest-impact operational gaps.
            </p>
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {SCORE_BANDS.map((band) => (
              <div key={band.label} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
                <p className="font-semibold text-slate-900">
                  {band.min}-{band.max}
                </p>
                <p className="text-slate-600">{band.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <OperationalSympathyPlayground />
      </section>
    </div>
  )
}
