'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ScenarioComparison } from '@/components/capacity-planning/ScenarioComparison'
import { ProjectionSummary } from '@/components/capacity-planning/ProjectionSummary'
import { ResultsSummary } from '@/components/capacity-planning/ResultsSummary'
import { ScenarioForm } from '@/components/capacity-planning/ScenarioForm'
import { TemplateSelector } from '@/components/capacity-planning/TemplateSelector'
import { compareScenarioOutputs } from '@/lib/capacity-planning/compare'
import { calculateScenarioOutput } from '@/lib/capacity-planning/model'
import {
  clearCapacityPlanningSession,
  loadCapacityPlanningSession,
  saveCapacityPlanningSession,
} from '@/lib/capacity-planning/storage'
import {
  createScenarioPairFromTemplate,
  DEFAULT_TEMPLATE_ID,
  getCapacityTemplateById,
} from '@/lib/capacity-planning/templates'
import type {
  CapacityScenarioInput,
  CapacityTemplateId,
} from '@/lib/capacity-planning/types'
import {
  emitPersonalizationEvent,
  type PersonalizationEventName,
} from '@/lib/personalization/telemetry'
import {
  getCachedHint,
  getResolvedPersonalizationContext,
} from '@/lib/profile/profile-client'

export function CapacityWorkbench() {
  const defaultPair = useMemo(
    () => createScenarioPairFromTemplate(DEFAULT_TEMPLATE_ID, 'aws-equivalent'),
    [],
  )

  const [activeTemplateId, setActiveTemplateId] =
    useState<CapacityTemplateId>(DEFAULT_TEMPLATE_ID)
  const [baseline, setBaseline] = useState<CapacityScenarioInput>(defaultPair.baseline)
  const [optimized, setOptimized] = useState<CapacityScenarioInput>(defaultPair.optimized)
  const [showAdvanced, setShowAdvanced] = useState({
    baseline: false,
    optimized: false,
  })
  const [hydrated, setHydrated] = useState(false)

  const comparisonEventRef = useRef<string>('')
  const projectionViewedRef = useRef(false)

  const emitCapacityEvent = useCallback(
    (
      eventName: PersonalizationEventName,
      params: {
        templateId?: string
        scenarioMode?: 'single' | 'compare'
        providerMode?: CapacityScenarioInput['providerMode']
      } = {},
    ) => {
      const context = getResolvedPersonalizationContext()
      emitPersonalizationEvent(eventName, {
        surface: 'playgrounds',
        role: context.role,
        goal: context.goal,
        session_active: Boolean(getCachedHint()),
        template_id: params.templateId,
        scenario_mode: params.scenarioMode,
        provider_mode: params.providerMode,
      })
    },
    [],
  )

  useEffect(() => {
    const session = loadCapacityPlanningSession()
    if (session) {
      setBaseline(session.baseline)
      setOptimized(session.optimized)
      setActiveTemplateId(session.activeTemplateId)
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) {
      return
    }

    saveCapacityPlanningSession({
      baseline,
      optimized,
      activeTemplateId,
    })
  }, [activeTemplateId, baseline, optimized, hydrated])

  const baselineOutput = useMemo(() => calculateScenarioOutput(baseline), [baseline])
  const optimizedOutput = useMemo(() => calculateScenarioOutput(optimized), [optimized])
  const comparison = useMemo(
    () => compareScenarioOutputs(baselineOutput, optimizedOutput),
    [baselineOutput, optimizedOutput],
  )

  useEffect(() => {
    if (!hydrated || projectionViewedRef.current) {
      return
    }

    projectionViewedRef.current = true
    emitCapacityEvent('capacity_projection_viewed', {
      templateId: activeTemplateId,
      scenarioMode: 'compare',
      providerMode: baseline.providerMode,
    })
  }, [activeTemplateId, baseline.providerMode, emitCapacityEvent, hydrated])

  useEffect(() => {
    if (!hydrated) {
      return
    }

    const fingerprint = [
      activeTemplateId,
      baselineOutput.now.requiredCU,
      optimizedOutput.now.requiredCU,
      comparison.costDeltaMonthlyUSD,
      comparison.latencyP95DeltaMs,
    ].join('|')

    if (comparisonEventRef.current === fingerprint) {
      return
    }

    comparisonEventRef.current = fingerprint
    emitCapacityEvent('capacity_scenario_compared', {
      templateId: activeTemplateId,
      scenarioMode: 'compare',
      providerMode: baseline.providerMode,
    })
  }, [
    activeTemplateId,
    baseline.providerMode,
    baselineOutput.now.requiredCU,
    comparison.costDeltaMonthlyUSD,
    comparison.latencyP95DeltaMs,
    emitCapacityEvent,
    hydrated,
    optimizedOutput.now.requiredCU,
  ])

  const handleTemplateSelect = (templateId: CapacityTemplateId) => {
    setActiveTemplateId(templateId)

    if (templateId === 'custom') {
      setBaseline((previous) => ({ ...previous, templateId: 'custom' }))
      setOptimized((previous) => ({ ...previous, templateId: 'custom' }))
    } else {
      const pair = createScenarioPairFromTemplate(templateId, baseline.providerMode)
      setBaseline(pair.baseline)
      setOptimized(pair.optimized)
      setShowAdvanced({
        baseline: false,
        optimized: false,
      })
    }

    emitCapacityEvent('capacity_template_selected', {
      templateId,
      scenarioMode: 'compare',
      providerMode: baseline.providerMode,
    })
  }

  const handleReset = () => {
    const pair = createScenarioPairFromTemplate(DEFAULT_TEMPLATE_ID, 'aws-equivalent')
    setBaseline(pair.baseline)
    setOptimized(pair.optimized)
    setActiveTemplateId(DEFAULT_TEMPLATE_ID)
    setShowAdvanced({
      baseline: false,
      optimized: false,
    })
    clearCapacityPlanningSession()
  }

  const copyScenarioSummary = async (
    scenarioLabel: string,
    scenario: CapacityScenarioInput,
  ) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      return
    }

    const output = scenario.id === 'baseline' ? baselineOutput : optimizedOutput
    const markdown = [
      `# ${scenarioLabel} Capacity Plan`,
      '',
      '## Scenario',
      `- Template: ${scenario.templateId}`,
      `- Provider mode: ${scenario.providerMode}`,
      `- Avg RPS: ${scenario.workload.avgRps.toLocaleString()}`,
      `- Peak multiplier: ${scenario.workload.peakMultiplier}`,
      `- Payload: ${scenario.workload.payloadKB} KB`,
      `- Concurrent users: ${scenario.workload.concurrentUsers.toLocaleString()}`,
      `- Read %: ${scenario.workload.readPercent}`,
      `- Availability: ${scenario.workload.availabilityTarget}%`,
      `- Annual growth: ${scenario.workload.annualGrowthPercent}%`,
      '',
      '## Now',
      `- Required CU: ${output.now.requiredCU}`,
      `- Node count: ${output.now.nodeCount}`,
      `- Monthly cost: $${output.now.monthlyCostUSD.toLocaleString()}`,
      `- p95/p99 latency: ${output.now.latencyP95Ms}/${output.now.latencyP99Ms} ms`,
      '',
      '## Month 12',
      `- Required CU: ${output.month12.requiredCU}`,
      `- Node count: ${output.month12.nodeCount}`,
      `- Monthly cost: $${output.month12.monthlyCostUSD.toLocaleString()}`,
      '',
      '## Assumptions',
      ...output.now.assumptions.map((assumption) => `- ${assumption}`),
    ].join('\n')

    await navigator.clipboard.writeText(markdown)
    emitCapacityEvent('capacity_results_copied', {
      templateId: activeTemplateId,
      scenarioMode: 'single',
      providerMode: scenario.providerMode,
    })
  }

  const selectedTemplate =
    activeTemplateId !== 'custom' ? getCapacityTemplateById(activeTemplateId) : null

  return (
    <div className="space-y-6">
      <TemplateSelector
        activeTemplateId={activeTemplateId}
        onSelect={handleTemplateSelect}
      />

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm text-slate-600">
          {selectedTemplate ? selectedTemplate.shortDescription : 'Custom workload profile'}
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="btn-secondary px-3 py-1.5 text-sm"
        >
          Reset
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ScenarioForm
          title="Baseline scenario"
          scenario={baseline}
          showAdvanced={showAdvanced.baseline}
          onToggleAdvanced={() =>
            setShowAdvanced((previous) => ({
              ...previous,
              baseline: !previous.baseline,
            }))
          }
          onChange={setBaseline}
        />

        <ScenarioForm
          title="Optimized scenario"
          scenario={optimized}
          showAdvanced={showAdvanced.optimized}
          onToggleAdvanced={() =>
            setShowAdvanced((previous) => ({
              ...previous,
              optimized: !previous.optimized,
            }))
          }
          onChange={setOptimized}
        />
      </div>

      <ProjectionSummary
        baseline={baselineOutput}
        optimized={optimizedOutput}
        comparison={comparison}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <ResultsSummary
          scenarioLabel="Baseline"
          scenario={baseline}
          output={baselineOutput}
          onCopy={() => void copyScenarioSummary('Baseline', baseline)}
        />
        <ResultsSummary
          scenarioLabel="Optimized"
          scenario={optimized}
          output={optimizedOutput}
          onCopy={() => void copyScenarioSummary('Optimized', optimized)}
        />
      </div>

      <ScenarioComparison comparison={comparison} />
    </div>
  )
}
