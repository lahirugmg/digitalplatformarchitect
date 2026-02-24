'use client'

import type { ScenarioComparisonOutput } from '@/lib/capacity-planning/types'

interface ScenarioComparisonProps {
  comparison: ScenarioComparisonOutput
}

function formatDelta(value: number, suffix = ''): string {
  if (value === 0) {
    return `0${suffix}`
  }

  const prefix = value > 0 ? '+' : '-'
  return `${prefix}${Math.abs(value).toLocaleString()}${suffix}`
}

export function ScenarioComparison({ comparison }: ScenarioComparisonProps) {
  return (
    <section className="card-standard">
      <h2 className="text-base font-semibold text-slate-900">Scenario comparison</h2>
      <p className="mt-1 text-sm text-slate-600">
        Optimized minus baseline deltas for current (now) projections.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-md border border-slate-200 bg-white p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Monthly Cost</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">
            {formatDelta(Math.round(comparison.costDeltaMonthlyUSD), ' USD')}
          </p>
          <p className="text-xs text-slate-600">{formatDelta(comparison.costDeltaPercent, '%')}</p>
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">p95 Latency</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">
            {formatDelta(comparison.latencyP95DeltaMs, ' ms')}
          </p>
          <p className="text-xs text-slate-600">
            {formatDelta(comparison.latencyP95DeltaPercent, '%')}
          </p>
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Required CU</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">
            {formatDelta(comparison.requiredCUDelta)}
          </p>
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Node Count</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">
            {formatDelta(comparison.nodeCountDelta)}
          </p>
        </div>
      </div>

      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {comparison.summary.map((line) => (
          <li key={line} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
            {line}
          </li>
        ))}
      </ul>
    </section>
  )
}

