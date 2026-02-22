'use client'

import { ServiceType, SLI, SLOTarget, TrafficProfile } from '@/lib/sla-availability/types'
import { SERVICE_TEMPLATES } from '@/lib/sla-availability/scenarios'
import { Info } from 'lucide-react'

interface SLOInputPanelProps {
  serviceType: ServiceType
  serviceName: string
  slis: SLI[]
  sloTarget: SLOTarget
  trafficProfile: TrafficProfile
  onServiceTypeChange: (type: ServiceType) => void
  onServiceNameChange: (name: string) => void
  onSLIChange: (id: string, updates: Partial<SLI>) => void
  onSLOTargetChange: (target: Partial<SLOTarget>) => void
  onTrafficProfileChange: (profile: Partial<TrafficProfile>) => void
}

export default function SLOInputPanel({
  serviceType,
  serviceName,
  slis,
  sloTarget,
  trafficProfile,
  onServiceTypeChange,
  onServiceNameChange,
  onSLIChange,
  onSLOTargetChange,
  onTrafficProfileChange,
}: SLOInputPanelProps) {
  return (
    <div className="space-y-6">
      {/* Service Type Selection */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Service Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          {SERVICE_TEMPLATES.map((template) => (
            <button
              key={template.type}
              onClick={() => onServiceTypeChange(template.type)}
              className={`p-4 rounded-lg border-2 transition text-left ${
                serviceType === template.type
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="text-2xl mb-1">{template.icon}</div>
              <div className="font-semibold text-sm">{template.name}</div>
              <div className="text-xs text-slate-600 mt-1">{template.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Service Name */}
      <div>
        <label htmlFor="service-name" className="block text-sm font-semibold text-slate-700 mb-2">
          Service Name
        </label>
        <input
          id="service-name"
          type="text"
          value={serviceName}
          onChange={(e) => onServiceNameChange(e.target.value)}
          placeholder="e.g., Payment API"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Traffic Profile */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Traffic Profile
        </label>
        <div className="space-y-3">
          <div>
            <label htmlFor="requests-per-day" className="block text-xs text-slate-600 mb-1">
              Requests per Day
            </label>
            <input
              id="requests-per-day"
              type="number"
              value={trafficProfile.requestsPerDay}
              onChange={(e) =>
                onTrafficProfileChange({ requestsPerDay: Number(e.target.value) })
              }
              min="0"
              step="100000"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-slate-500 mt-1">
              {(trafficProfile.requestsPerDay / 1_000_000).toFixed(1)}M requests/day
            </p>
          </div>

          <div>
            <label htmlFor="peak-multiplier" className="block text-xs text-slate-600 mb-1">
              Peak Traffic Multiplier
            </label>
            <input
              id="peak-multiplier"
              type="number"
              value={trafficProfile.peakMultiplier}
              onChange={(e) =>
                onTrafficProfileChange({ peakMultiplier: Number(e.target.value) })
              }
              min="1"
              max="10"
              step="0.1"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-slate-500 mt-1">
              Peak: {((trafficProfile.requestsPerDay * trafficProfile.peakMultiplier) / 1_000_000).toFixed(1)}M requests/day
            </p>
          </div>
        </div>
      </div>

      {/* SLO Target */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          SLO Target
        </label>
        <div className="space-y-3">
          <div>
            <label htmlFor="slo-percentage" className="block text-xs text-slate-600 mb-1">
              Target Availability (%)
            </label>
            <div className="flex gap-2">
              <input
                id="slo-percentage"
                type="number"
                value={sloTarget.percentage}
                onChange={(e) =>
                  onSLOTargetChange({ percentage: Number(e.target.value) })
                }
                min="90"
                max="99.999"
                step="0.001"
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <select
                value={sloTarget.percentage}
                onChange={(e) =>
                  onSLOTargetChange({ percentage: Number(e.target.value) })
                }
                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="99">99% (2-nines)</option>
                <option value="99.5">99.5%</option>
                <option value="99.9">99.9% (3-nines)</option>
                <option value="99.95">99.95%</option>
                <option value="99.99">99.99% (4-nines)</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="slo-period" className="block text-xs text-slate-600 mb-1">
              Measurement Period
            </label>
            <select
              id="slo-period"
              value={sloTarget.period}
              onChange={(e) =>
                onSLOTargetChange({ period: e.target.value as '7d' | '28d' | '30d' })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="7d">7 days (rolling weekly)</option>
              <option value="28d">28 days (4 weeks)</option>
              <option value="30d">30 days (monthly)</option>
            </select>
          </div>
        </div>
      </div>

      {/* SLIs */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Service Level Indicators (SLIs)
        </label>
        <div className="space-y-3">
          {slis.map((sli) => (
            <div
              key={sli.id}
              className={`p-4 rounded-lg border-2 ${
                sli.enabled
                  ? 'border-green-200 bg-green-50'
                  : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={sli.enabled}
                      onChange={(e) => onSLIChange(sli.id, { enabled: e.target.checked })}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="font-semibold text-sm">{sli.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      sli.type === 'availability'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {sli.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 ml-6">{sli.description}</p>
                </div>
                <button
                  className="text-slate-400 hover:text-slate-600"
                  title="Learn more about this SLI"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>

              {sli.enabled && (
                <div className="ml-6 mt-2">
                  <label className="block text-xs text-slate-600 mb-1">
                    {sli.type === 'availability' ? 'Target (%)' : 'Threshold (ms)'}
                  </label>
                  <input
                    type="number"
                    value={sli.threshold}
                    onChange={(e) => onSLIChange(sli.id, { threshold: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Help Text */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-2">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">How to define SLOs</p>
            <p className="text-xs">
              Start with user-facing critical paths. Pick 2-3 SLIs that directly impact user experience.
              Set realistic targets based on current performance, then gradually improve.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
