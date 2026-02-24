'use client'

import { CAPACITY_PRICING_METADATA } from '@/lib/capacity-planning/pricing'
import type {
  CapacityScenarioInput,
  CapacityScenarioOutput,
} from '@/lib/capacity-planning/types'

interface ResultsSummaryProps {
  scenarioLabel: string
  scenario: CapacityScenarioInput
  output: CapacityScenarioOutput
  onCopy: () => void
}

function EstimateCard({
  title,
  cost,
  requiredCU,
  nodeCount,
  latencyP95,
  latencyP99,
  throughput,
  awsInstanceType,
}: {
  title: string
  cost: number
  requiredCU: number
  nodeCount: number
  latencyP95: number
  latencyP99: number
  throughput: number
  awsInstanceType?: string
}) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-4">
      <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Monthly cost</p>
          <p className="font-semibold text-slate-900">${cost.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Required CU</p>
          <p className="font-semibold text-slate-900">{requiredCU.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Node count</p>
          <p className="font-semibold text-slate-900">{nodeCount.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Throughput</p>
          <p className="font-semibold text-slate-900">{throughput.toLocaleString()} MB/s</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">p95 latency</p>
          <p className="font-semibold text-slate-900">{latencyP95} ms</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">p99 latency</p>
          <p className="font-semibold text-slate-900">{latencyP99} ms</p>
        </div>
      </div>
      {awsInstanceType && (
        <p className="mt-2 text-xs text-slate-500">
          AWS equivalent: <span className="font-medium text-slate-700">{awsInstanceType}</span>
        </p>
      )}
    </div>
  )
}

export function ResultsSummary({
  scenarioLabel,
  scenario,
  output,
  onCopy,
}: ResultsSummaryProps) {
  const nowEstimate = output.now
  const month12Estimate = output.month12

  return (
    <section className="card-standard">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{scenarioLabel} results</h3>
          <p className="mt-1 text-sm text-slate-600">
            {scenario.providerMode === 'aws-equivalent'
              ? 'Provider-neutral model with AWS-equivalent mapping.'
              : 'Provider-neutral directional model.'}
          </p>
        </div>
        <button type="button" onClick={onCopy} className="btn-secondary px-3 py-1.5 text-sm">
          Copy
        </button>
      </div>

      <div className="space-y-3">
        <EstimateCard
          title="Now"
          cost={nowEstimate.monthlyCostUSD}
          requiredCU={nowEstimate.requiredCU}
          nodeCount={nowEstimate.nodeCount}
          latencyP95={nowEstimate.latencyP95Ms}
          latencyP99={nowEstimate.latencyP99Ms}
          throughput={nowEstimate.throughputMBps}
          awsInstanceType={nowEstimate.awsEquivalent?.instanceType}
        />
        <EstimateCard
          title="Month 12"
          cost={month12Estimate.monthlyCostUSD}
          requiredCU={month12Estimate.requiredCU}
          nodeCount={month12Estimate.nodeCount}
          latencyP95={month12Estimate.latencyP95Ms}
          latencyP99={month12Estimate.latencyP99Ms}
          throughput={month12Estimate.throughputMBps}
          awsInstanceType={month12Estimate.awsEquivalent?.instanceType}
        />
      </div>

      {nowEstimate.warnings.length > 0 && (
        <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3">
          <h4 className="text-sm font-semibold text-amber-900">Warnings</h4>
          <ul className="mt-2 space-y-1 text-sm text-amber-800">
            {nowEstimate.warnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      {nowEstimate.recommendations.length > 0 && (
        <div className="mt-4 rounded-md border border-blue-200 bg-blue-50 p-3">
          <h4 className="text-sm font-semibold text-blue-900">Recommendations</h4>
          <ul className="mt-2 space-y-1 text-sm text-blue-800">
            {nowEstimate.recommendations.map((recommendation) => (
              <li key={recommendation}>{recommendation}</li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-4 text-xs text-slate-500">
        {CAPACITY_PRICING_METADATA.confidenceLabel === 'directional' ? 'Directional estimate.' : ''}{' '}
        Pricing table {CAPACITY_PRICING_METADATA.version} (updated {CAPACITY_PRICING_METADATA.lastUpdated}).
      </p>
    </section>
  )
}

