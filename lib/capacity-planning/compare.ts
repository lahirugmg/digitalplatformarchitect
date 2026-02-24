import type {
  CapacityScenarioOutput,
  ScenarioComparisonOutput,
} from '@/lib/capacity-planning/types'

function percentDelta(base: number, next: number): number {
  if (base === 0) {
    return next === 0 ? 0 : 100
  }

  return ((next - base) / base) * 100
}

export function compareScenarioOutputs(
  baseline: CapacityScenarioOutput,
  optimized: CapacityScenarioOutput,
): ScenarioComparisonOutput {
  const costDeltaMonthlyUSD = optimized.now.monthlyCostUSD - baseline.now.monthlyCostUSD
  const latencyP95DeltaMs = optimized.now.latencyP95Ms - baseline.now.latencyP95Ms
  const requiredCUDelta = optimized.now.requiredCU - baseline.now.requiredCU
  const nodeCountDelta = optimized.now.nodeCount - baseline.now.nodeCount

  const summary: string[] = []
  if (costDeltaMonthlyUSD < 0) {
    summary.push(
      `Optimized scenario reduces monthly cost by $${Math.abs(
        Math.round(costDeltaMonthlyUSD),
      ).toLocaleString()}.`,
    )
  } else if (costDeltaMonthlyUSD > 0) {
    summary.push(
      `Optimized scenario increases monthly cost by $${Math.round(
        costDeltaMonthlyUSD,
      ).toLocaleString()} for additional headroom.`,
    )
  }

  if (latencyP95DeltaMs < 0) {
    summary.push(
      `Optimized scenario improves p95 latency by ${Math.abs(latencyP95DeltaMs)} ms.`,
    )
  } else if (latencyP95DeltaMs > 0) {
    summary.push(
      `Optimized scenario has ${latencyP95DeltaMs} ms higher p95 latency under current assumptions.`,
    )
  }

  if (optimized.month12.requiredCU < baseline.month12.requiredCU) {
    summary.push(
      `Month-12 projection requires ${baseline.month12.requiredCU - optimized.month12.requiredCU} fewer CU in optimized mode.`,
    )
  }

  if (summary.length === 0) {
    summary.push('Both scenarios are currently equivalent under the selected assumptions.')
  }

  return {
    costDeltaMonthlyUSD,
    costDeltaPercent: Math.round(
      percentDelta(baseline.now.monthlyCostUSD, optimized.now.monthlyCostUSD) * 10,
    ) / 10,
    latencyP95DeltaMs,
    latencyP95DeltaPercent: Math.round(
      percentDelta(baseline.now.latencyP95Ms, optimized.now.latencyP95Ms) * 10,
    ) / 10,
    requiredCUDelta,
    nodeCountDelta,
    summary,
  }
}

