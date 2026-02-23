'use client'

import { SCORE_BANDS } from '@/lib/operational-sympathy'

export function LearnPanel() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <h2 className="text-xl font-bold text-slate-900">Operational Sympathy, in Brief</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-700">
        Operational sympathy is the discipline of designing systems for production realities, not idealized
        environments. It focuses on scale limits, failure handling, observability, security operations, and recovery
        speed.
      </p>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">
        Score each element from 0 to 5. Higher weights represent areas with bigger production impact.
      </p>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {SCORE_BANDS.map((band) => (
          <div key={band.label} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
            <span className="font-semibold text-slate-900">
              {band.min}-{band.max}
            </span>{' '}
            <span className="text-slate-700">{band.label}</span>
          </div>
        ))}
      </div>

      <details className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
        <summary className="cursor-pointer list-none font-semibold text-slate-900">
          Why this matters
        </summary>
        <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
          <p>Cloud delivery is fast, but fast delivery does not imply production safety.</p>
          <p>Low scores in high-weight areas usually signal incident risk and expensive recovery.</p>
          <p>This scorecard helps teams prioritize mitigations before launch.</p>
        </div>
      </details>
    </section>
  )
}
