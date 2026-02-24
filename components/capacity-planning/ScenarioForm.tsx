'use client'

import type {
  CapacityScenarioInput,
  CapacityWorkloadInput,
} from '@/lib/capacity-planning/types'

interface ScenarioFormProps {
  title: string
  scenario: CapacityScenarioInput
  showAdvanced: boolean
  onToggleAdvanced: () => void
  onChange: (next: CapacityScenarioInput) => void
}

interface NumberFieldProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  hint: string
  onChange: (value: number) => void
}

function NumberField({
  label,
  value,
  min,
  max,
  step = 1,
  hint,
  onChange,
}: NumberFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="mt-1">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>
      <p className="mt-1 text-xs text-slate-500">{hint}</p>
    </label>
  )
}

const AVAILABILITY_OPTIONS: CapacityWorkloadInput['availabilityTarget'][] = [
  99,
  99.9,
  99.95,
  99.99,
]

export function ScenarioForm({
  title,
  scenario,
  showAdvanced,
  onToggleAdvanced,
  onChange,
}: ScenarioFormProps) {
  const updateWorkload = <T extends keyof CapacityWorkloadInput>(
    field: T,
    value: CapacityWorkloadInput[T],
  ) => {
    onChange({
      ...scenario,
      workload: {
        ...scenario.workload,
        [field]: value,
      },
    })
  }

  const updateAdvanced = (
    field: keyof NonNullable<CapacityScenarioInput['advanced']>,
    value: number,
  ) => {
    onChange({
      ...scenario,
      advanced: {
        ...scenario.advanced,
        [field]: value,
      },
    })
  }

  return (
    <section className="card-standard">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-600">
            Configure workload and resilience assumptions for this scenario.
          </p>
        </div>
        <button
          type="button"
          onClick={onToggleAdvanced}
          className="btn-ghost px-3 py-1.5 text-xs font-semibold"
        >
          {showAdvanced ? 'Hide advanced' : 'Show advanced'}
        </button>
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Provider mode</span>
          <select
            value={scenario.providerMode}
            onChange={(event) =>
              onChange({
                ...scenario,
                providerMode: event.target.value as CapacityScenarioInput['providerMode'],
              })
            }
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="aws-equivalent">Provider-neutral + AWS equivalent</option>
            <option value="neutral">Provider-neutral only</option>
          </select>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField
            label="Average requests/second"
            value={scenario.workload.avgRps}
            min={1}
            max={500000}
            hint="Steady-state average throughput."
            onChange={(value) => updateWorkload('avgRps', value)}
          />
          <NumberField
            label="Peak multiplier"
            value={scenario.workload.peakMultiplier}
            min={1}
            max={10}
            step={0.1}
            hint="Burst factor applied on top of average load."
            onChange={(value) => updateWorkload('peakMultiplier', value)}
          />
          <NumberField
            label="Payload size (KB)"
            value={scenario.workload.payloadKB}
            min={1}
            max={4096}
            hint="Average request/response payload size."
            onChange={(value) => updateWorkload('payloadKB', value)}
          />
          <NumberField
            label="Concurrent users"
            value={scenario.workload.concurrentUsers}
            min={1}
            max={500000}
            hint="Simultaneous active users/sessions."
            onChange={(value) => updateWorkload('concurrentUsers', value)}
          />
          <NumberField
            label="Read percentage"
            value={scenario.workload.readPercent}
            min={0}
            max={100}
            hint="Reads vs writes in workload mix."
            onChange={(value) => updateWorkload('readPercent', value)}
          />
          <NumberField
            label="Annual growth (%)"
            value={scenario.workload.annualGrowthPercent}
            min={0}
            max={200}
            hint="Used for month-12 projection."
            onChange={(value) => updateWorkload('annualGrowthPercent', value)}
          />
        </div>

        <div>
          <p className="text-sm font-medium text-slate-700">Availability target</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {AVAILABILITY_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => updateWorkload('availabilityTarget', option)}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                  scenario.workload.availabilityTarget === option
                    ? 'border-blue-300 bg-blue-50 text-blue-700'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                {option}%
              </button>
            ))}
          </div>
        </div>

        {showAdvanced && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h4 className="text-sm font-semibold text-slate-900">Advanced controls</h4>
            <p className="mt-1 text-xs text-slate-600">
              Optional levers for optimization assumptions.
            </p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <NumberField
                label="Cache hit (%)"
                value={scenario.advanced?.cacheHitPercent ?? 0}
                min={0}
                max={100}
                hint="Higher cache hit lowers compute pressure."
                onChange={(value) => updateAdvanced('cacheHitPercent', value)}
              />
              <NumberField
                label="Async offload (%)"
                value={scenario.advanced?.asyncOffloadPercent ?? 0}
                min={0}
                max={100}
                hint="Percent of work moved to async pipelines."
                onChange={(value) => updateAdvanced('asyncOffloadPercent', value)}
              />
              <NumberField
                label="DB offload (%)"
                value={scenario.advanced?.dbOffloadPercent ?? 0}
                min={0}
                max={100}
                hint="Percent served via read replicas or specialized stores."
                onChange={(value) => updateAdvanced('dbOffloadPercent', value)}
              />
              <NumberField
                label="Utilization target (%)"
                value={scenario.advanced?.utilizationTargetPercent ?? 70}
                min={50}
                max={85}
                hint="Lower target adds more operational headroom."
                onChange={(value) => updateAdvanced('utilizationTargetPercent', value)}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

