'use client'

import { IncidentScenario, SLOTarget, TrafficProfile } from '@/lib/sla-availability/types'
import { INCIDENT_SCENARIOS } from '@/lib/sla-availability/scenarios'
import { calculateIncidentImpact, formatDowntime } from '@/lib/sla-availability/calculations'
import { AlertTriangle, Plus, Trash2, Zap } from 'lucide-react'

interface BurnRateSimulatorProps {
  incidents: IncidentScenario[]
  sloTarget: SLOTarget
  trafficProfile: TrafficProfile
  onAddIncident: (scenario: IncidentScenario) => void
  onRemoveIncident: (id: string) => void
  onIncidentChange: (id: string, updates: Partial<IncidentScenario>) => void
}

export default function BurnRateSimulator({
  incidents,
  sloTarget,
  trafficProfile,
  onAddIncident,
  onRemoveIncident,
  onIncidentChange,
}: BurnRateSimulatorProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">Incident Simulator</h3>
        <p className="text-sm text-slate-600">
          Test how different incidents affect your error budget
        </p>
      </div>

      {/* Preset Incidents */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Add Incident Scenario
        </label>
        <div className="grid grid-cols-2 gap-2">
          {INCIDENT_SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => onAddIncident({ ...scenario })}
              className="p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition text-left group"
            >
              <div className="flex items-start gap-2">
                <div className="text-lg flex-shrink-0">
                  {scenario.type === '5xx-spike' ? '🔴' :
                   scenario.type === 'latency-degradation' ? '🐌' :
                   scenario.type === 'dependency-timeout' ? '⏱️' :
                   '🚨'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-slate-900 group-hover:text-blue-600 flex items-center gap-1">
                    {scenario.name}
                    <Plus className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    {scenario.durationMinutes}min • {(scenario.errorRate * 100).toFixed(0)}% errors
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Incidents */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-semibold text-slate-700">
            Active Incidents ({incidents.length})
          </label>
          {incidents.length > 0 && (
            <button
              onClick={() => incidents.forEach((i) => onRemoveIncident(i.id))}
              className="text-xs text-red-600 hover:text-red-700 font-medium"
            >
              Clear All
            </button>
          )}
        </div>

        {incidents.length === 0 ? (
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg p-8 text-center">
            <Zap className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-slate-600">
              No incidents added yet. Select scenarios above to simulate their impact.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {incidents.map((incident) => {
              const impact = calculateIncidentImpact(incident, trafficProfile, sloTarget)
              const severity =
                impact.budgetConsumed > 50
                  ? 'critical'
                  : impact.budgetConsumed > 20
                  ? 'warning'
                  : 'low'

              return (
                <div
                  key={incident.id}
                  className={`p-4 rounded-lg border-2 ${
                    severity === 'critical'
                      ? 'border-red-200 bg-red-50'
                      : severity === 'warning'
                      ? 'border-orange-200 bg-orange-50'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-slate-900">
                          {incident.name}
                        </span>
                        {severity === 'critical' && (
                          <span className="text-xs px-2 py-0.5 bg-red-600 text-white rounded-full font-semibold">
                            CRITICAL
                          </span>
                        )}
                        {severity === 'warning' && (
                          <span className="text-xs px-2 py-0.5 bg-orange-600 text-white rounded-full font-semibold">
                            WARNING
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{incident.description}</p>
                    </div>
                    <button
                      onClick={() => onRemoveIncident(incident.id)}
                      className="text-slate-400 hover:text-red-600 transition"
                      aria-label="Remove incident"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Incident Parameters */}
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">
                        Duration (min)
                      </label>
                      <input
                        type="number"
                        value={incident.durationMinutes}
                        onChange={(e) =>
                          onIncidentChange(incident.id, {
                            durationMinutes: Number(e.target.value),
                          })
                        }
                        min="1"
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-600 mb-1">
                        Error Rate (%)
                      </label>
                      <input
                        type="number"
                        value={(incident.errorRate * 100).toFixed(1)}
                        onChange={(e) =>
                          onIncidentChange(incident.id, {
                            errorRate: Number(e.target.value) / 100,
                          })
                        }
                        min="0"
                        max="100"
                        step="0.1"
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-600 mb-1">
                        Latency (x)
                      </label>
                      <input
                        type="number"
                        value={incident.latencyMultiplier}
                        onChange={(e) =>
                          onIncidentChange(incident.id, {
                            latencyMultiplier: Number(e.target.value),
                          })
                        }
                        min="1"
                        max="10"
                        step="0.1"
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Impact Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className={`p-2 rounded ${
                      severity === 'critical'
                        ? 'bg-red-100'
                        : severity === 'warning'
                        ? 'bg-orange-100'
                        : 'bg-slate-100'
                    }`}>
                      <div className="text-xs text-slate-600 mb-1">Failed Requests</div>
                      <div className={`text-lg font-bold ${
                        severity === 'critical'
                          ? 'text-red-700'
                          : severity === 'warning'
                          ? 'text-orange-700'
                          : 'text-slate-900'
                      }`}>
                        {impact.failedRequests.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </div>
                    </div>

                    <div className={`p-2 rounded ${
                      severity === 'critical'
                        ? 'bg-red-100'
                        : severity === 'warning'
                        ? 'bg-orange-100'
                        : 'bg-slate-100'
                    }`}>
                      <div className="text-xs text-slate-600 mb-1">Budget Consumed</div>
                      <div className={`text-lg font-bold ${
                        severity === 'critical'
                          ? 'text-red-700'
                          : severity === 'warning'
                          ? 'text-orange-700'
                          : 'text-slate-900'
                      }`}>
                        {impact.budgetConsumed.toFixed(1)}%
                      </div>
                    </div>

                    <div className={`p-2 rounded ${
                      severity === 'critical'
                        ? 'bg-red-100'
                        : severity === 'warning'
                        ? 'bg-orange-100'
                        : 'bg-slate-100'
                    }`}>
                      <div className="text-xs text-slate-600 mb-1">Burn Rate</div>
                      <div className={`text-lg font-bold ${
                        severity === 'critical'
                          ? 'text-red-700'
                          : severity === 'warning'
                          ? 'text-orange-700'
                          : 'text-slate-900'
                      }`}>
                        {impact.burnRate.toFixed(1)}x
                      </div>
                    </div>

                    <div className={`p-2 rounded ${
                      severity === 'critical'
                        ? 'bg-red-100'
                        : severity === 'warning'
                        ? 'bg-orange-100'
                        : 'bg-slate-100'
                    }`}>
                      <div className="text-xs text-slate-600 mb-1">Effective Downtime</div>
                      <div className={`text-lg font-bold ${
                        severity === 'critical'
                          ? 'text-red-700'
                          : severity === 'warning'
                          ? 'text-orange-700'
                          : 'text-slate-900'
                      }`}>
                        {formatDowntime(incident.durationMinutes * incident.errorRate)}
                      </div>
                    </div>
                  </div>

                  {/* Burn Rate Warning */}
                  {impact.burnRate >= 5 && (
                    <div className="mt-3 flex items-start gap-2 p-2 bg-red-100 border border-red-300 rounded">
                      <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-red-900">
                        <span className="font-semibold">High burn rate:</span> At this rate, your
                        error budget will exhaust in{' '}
                        {((100 / impact.burnRate) * 100).toFixed(0)}% of the measurement period.
                        Immediate action required.
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Help Text */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-2">
          <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Understanding Burn Rate</p>
            <p className="text-xs">
              Burn rate shows how fast you're consuming your error budget. A burn rate of 10x means
              you'll exhaust your budget in 10% of the measurement period. Use multi-window alerts
              (1h, 6h, 24h) to detect issues early.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
