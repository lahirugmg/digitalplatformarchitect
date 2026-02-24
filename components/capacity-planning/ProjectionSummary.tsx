'use client'

import type {
  CapacityScenarioOutput,
  ScenarioComparisonOutput,
} from '@/lib/capacity-planning/types'

interface ProjectionSummaryProps {
  baseline: CapacityScenarioOutput
  optimized: CapacityScenarioOutput
  comparison: ScenarioComparisonOutput
}

function Metric({
  label,
  nowValue,
  month12Value,
}: {
  label: string
  nowValue: string
  month12Value: string
}) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-semibold text-slate-900">Now: {nowValue}</p>
      <p className="mt-1 text-sm text-slate-600">12 mo: {month12Value}</p>
    </div>
  )
}

export function ProjectionSummary({
  baseline,
  optimized,
  comparison,
}: ProjectionSummaryProps) {
  return (
    <section className="card-standard">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Now vs 12-month projection</h2>
          <p className="mt-1 text-sm text-slate-600">
            Compare baseline and optimized trajectories side by side.
          </p>
        </div>
        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
          Cost delta now: {comparison.costDeltaMonthlyUSD >= 0 ? '+' : '-'}$
          {Math.abs(Math.round(comparison.costDeltaMonthlyUSD)).toLocaleString()} / month
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-900">Baseline</h3>
          <Metric
            label="Capacity Units"
            nowValue={baseline.now.requiredCU.toLocaleString()}
            month12Value={baseline.month12.requiredCU.toLocaleString()}
          />
          <Metric
            label="Node Count"
            nowValue={baseline.now.nodeCount.toLocaleString()}
            month12Value={baseline.month12.nodeCount.toLocaleString()}
          />
          <Metric
            label="Monthly Cost"
            nowValue={`$${baseline.now.monthlyCostUSD.toLocaleString()}`}
            month12Value={`$${baseline.month12.monthlyCostUSD.toLocaleString()}`}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-900">Optimized</h3>
          <Metric
            label="Capacity Units"
            nowValue={optimized.now.requiredCU.toLocaleString()}
            month12Value={optimized.month12.requiredCU.toLocaleString()}
          />
          <Metric
            label="Node Count"
            nowValue={optimized.now.nodeCount.toLocaleString()}
            month12Value={optimized.month12.nodeCount.toLocaleString()}
          />
          <Metric
            label="Monthly Cost"
            nowValue={`$${optimized.now.monthlyCostUSD.toLocaleString()}`}
            month12Value={`$${optimized.month12.monthlyCostUSD.toLocaleString()}`}
          />
        </div>
      </div>
    </section>
  )
}

