'use client'

import type { CapacityResults, CapacityInputs } from '@/lib/capacity-planning'

interface ResultsSummaryProps {
  results: CapacityResults
  inputs: CapacityInputs
}

export function ResultsSummary({ results, inputs }: ResultsSummaryProps) {
  const copyResults = async () => {
    const summary = `
# Infrastructure Capacity Estimate

## Input Parameters
- Target TPS: ${inputs.targetTPS.toLocaleString()}
- Peak TPS: ${(inputs.targetTPS * inputs.peakMultiplier).toLocaleString()}
- Message Size: ${inputs.messageSizeKB} KB
- Concurrent Users: ${inputs.concurrentUsers.toLocaleString()}
- Availability: ${inputs.availabilityTarget}%
- Read/Write: ${inputs.readWriteRatio}/${100 - inputs.readWriteRatio}

## Recommended Infrastructure
- **Instance Type:** ${results.instanceType}
- **Node Count:** ${results.nodeCount}
- **Total CPU Cores:** ${results.totalCPUCores}
- **Total Memory:** ${results.totalMemoryGB} GB
- **Network Bandwidth:** ${results.networkBandwidthGbps} Gbps

## Performance Estimates
- **Throughput:** ${results.throughputMBps} MB/s
- **Latency (p50):** ${results.latencyP50Ms}ms
- **Latency (p95):** ${results.latencyP95Ms}ms
- **Latency (p99):** ${results.latencyP99Ms}ms

## Cost Estimate
- **Annual Cost:** $${results.annualCostUSD.toLocaleString()} USD
- **Monthly Cost:** $${Math.round(results.annualCostUSD / 12).toLocaleString()} USD

${results.warnings.length > 0 ? `\n## Warnings\n${results.warnings.map(w => `- ⚠️ ${w}`).join('\n')}` : ''}

${results.recommendations.length > 0 ? `\n## Recommendations\n${results.recommendations.map(r => `- ✓ ${r}`).join('\n')}` : ''}
    `.trim()

    await navigator.clipboard.writeText(summary)
  }

  return (
    <div className="space-y-6">
      {/* Infrastructure Recommendations */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900">Infrastructure Recommendations</h2>
          <button
            onClick={copyResults}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition text-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="text-sm text-blue-700 font-medium mb-1">Instance Type</div>
            <div className="text-2xl font-bold text-blue-900">{results.instanceType}</div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <div className="text-sm text-purple-700 font-medium mb-1">Node Count</div>
            <div className="text-2xl font-bold text-purple-900">{results.nodeCount}</div>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="text-sm text-green-700 font-medium mb-1">Total CPU Cores</div>
            <div className="text-2xl font-bold text-green-900">{results.totalCPUCores}</div>
          </div>

          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <div className="text-sm text-orange-700 font-medium mb-1">Total Memory</div>
            <div className="text-2xl font-bold text-orange-900">{results.totalMemoryGB} GB</div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <div className="text-sm text-slate-700 font-medium mb-2">Network Bandwidth</div>
          <div className="text-lg font-bold text-slate-900">{results.networkBandwidthGbps} Gbps per instance</div>
        </div>
      </div>

      {/* Performance Estimates */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Performance Estimates</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <span className="text-sm font-medium text-slate-700">Throughput</span>
            <span className="text-lg font-bold text-slate-900">{results.throughputMBps} MB/s</span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Latency Percentiles</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-green-50 rounded p-3 border border-green-200">
                <div className="text-xs text-green-700 font-medium mb-1">p50</div>
                <div className="text-lg font-bold text-green-900">{results.latencyP50Ms}ms</div>
              </div>
              <div className="bg-yellow-50 rounded p-3 border border-yellow-200">
                <div className="text-xs text-yellow-700 font-medium mb-1">p95</div>
                <div className="text-lg font-bold text-yellow-900">{results.latencyP95Ms}ms</div>
              </div>
              <div className="bg-orange-50 rounded p-3 border border-orange-200">
                <div className="text-xs text-orange-700 font-medium mb-1">p99</div>
                <div className="text-lg font-bold text-orange-900">{results.latencyP99Ms}ms</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Estimate */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Cost Estimate</h3>
        <div className="flex items-end gap-2 mb-2">
          <span className="text-5xl font-bold">${Math.round(results.annualCostUSD / 12).toLocaleString()}</span>
          <span className="text-xl text-blue-100 mb-2">/month</span>
        </div>
        <div className="text-blue-100 text-sm">
          ${results.annualCostUSD.toLocaleString()} per year (on-demand pricing)
        </div>
        <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-lg p-3 text-sm">
          💡 Consider reserved instances for ~30-50% savings on predictable workloads
        </div>
      </div>

      {/* Warnings */}
      {results.warnings.length > 0 && (
        <div className="bg-yellow-50 rounded-lg shadow-sm border-2 border-yellow-200 p-6">
          <h3 className="text-lg font-bold text-yellow-900 mb-3 flex items-center gap-2">
            <span>⚠️</span>
            Warnings
          </h3>
          <ul className="space-y-2">
            {results.warnings.map((warning, index) => (
              <li key={index} className="text-sm text-yellow-800 flex items-start gap-2">
                <span className="flex-shrink-0 mt-0.5">•</span>
                <span>{warning}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {results.recommendations.length > 0 && (
        <div className="bg-blue-50 rounded-lg shadow-sm border-2 border-blue-200 p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
            <span>💡</span>
            Recommendations
          </h3>
          <ul className="space-y-2">
            {results.recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-blue-800 flex items-start gap-2">
                <span className="flex-shrink-0 mt-0.5">✓</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
