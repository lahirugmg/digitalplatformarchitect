'use client'

import { useState, useEffect, useMemo } from 'react'
import { ServiceType, SLI, SLOTarget, TrafficProfile, IncidentScenario, SLASession } from '@/lib/sla-availability/types'
import { getServiceTemplate } from '@/lib/sla-availability/scenarios'
import {
  calculateErrorBudget,
  calculateIncidentImpact,
  assessSLOReadiness,
  formatDowntime,
  formatNumber,
} from '@/lib/sla-availability/calculations'
import SLOInputPanel from './SLOInputPanel'
import ErrorBudgetPanel from './ErrorBudgetPanel'
import BurnRateSimulator from './BurnRateSimulator'
import AssessmentSummary from './AssessmentSummary'
import { RotateCcw } from 'lucide-react'

export default function SLAAvailabilityPlayground() {
  // Initialize with Public API template
  const defaultTemplate = getServiceTemplate('public-api')!

  const [serviceType, setServiceType] = useState<ServiceType>('public-api')
  const [serviceName, setServiceName] = useState('My Service')
  const [slis, setSLIs] = useState<SLI[]>(
    defaultTemplate.defaultSLIs.map((sli, index) => ({
      ...sli,
      id: `sli-${index}`,
    }))
  )
  const [sloTarget, setSLOTarget] = useState<SLOTarget>(defaultTemplate.defaultSLO)
  const [trafficProfile, setTrafficProfile] = useState<TrafficProfile>(defaultTemplate.defaultTraffic)
  const [incidents, setIncidents] = useState<IncidentScenario[]>([])

  // Calculate error budget with incident impacts
  const errorBudget = useMemo(() => {
    // Calculate total consumed from incidents
    const totalConsumedFailures = incidents.reduce((sum, incident) => {
      const impact = calculateIncidentImpact(incident, trafficProfile, sloTarget)
      return sum + impact.failedRequests
    }, 0)

    const totalConsumedDowntime = incidents.reduce((sum, incident) => {
      return sum + incident.durationMinutes * incident.errorRate
    }, 0)

    return calculateErrorBudget(sloTarget, trafficProfile, totalConsumedFailures, totalConsumedDowntime)
  }, [sloTarget, trafficProfile, incidents])

  // Update incidents with calculated impacts
  const incidentsWithImpact = useMemo(() => {
    return incidents.map((incident) => {
      const impact = calculateIncidentImpact(incident, trafficProfile, sloTarget)
      return {
        ...incident,
        affectedRequests: impact.affectedRequests,
        budgetConsumed: impact.budgetConsumed,
        burnRate: impact.burnRate,
      }
    })
  }, [incidents, trafficProfile, sloTarget])

  // Generate assessment
  const assessment = useMemo(() => {
    return assessSLOReadiness(errorBudget, incidentsWithImpact, sloTarget)
  }, [errorBudget, incidentsWithImpact, sloTarget])

  // Create session object
  const session: SLASession = {
    serviceType,
    serviceName,
    slis,
    sloTarget,
    trafficProfile,
    incidents: incidentsWithImpact,
    errorBudget,
    assessment,
  }

  // Handle service type change - load template
  const handleServiceTypeChange = (type: ServiceType) => {
    const template = getServiceTemplate(type)
    if (template) {
      setServiceType(type)
      setSLIs(
        template.defaultSLIs.map((sli, index) => ({
          ...sli,
          id: `sli-${index}`,
        }))
      )
      setSLOTarget(template.defaultSLO)
      setTrafficProfile(template.defaultTraffic)
    }
  }

  // Handle SLI changes
  const handleSLIChange = (id: string, updates: Partial<SLI>) => {
    setSLIs((prev) => prev.map((sli) => (sli.id === id ? { ...sli, ...updates } : sli)))
  }

  // Handle incident operations
  const handleAddIncident = (scenario: IncidentScenario) => {
    const newIncident = {
      ...scenario,
      id: `${scenario.type}-${Date.now()}`, // Unique ID
    }
    setIncidents((prev) => [...prev, newIncident])
  }

  const handleRemoveIncident = (id: string) => {
    setIncidents((prev) => prev.filter((i) => i.id !== id))
  }

  const handleIncidentChange = (id: string, updates: Partial<IncidentScenario>) => {
    setIncidents((prev) =>
      prev.map((incident) => (incident.id === id ? { ...incident, ...updates } : incident))
    )
  }

  // Export assessment
  const handleExport = () => {
    const report = generateMarkdownReport(session)
    const blob = new Blob([report], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `slo-assessment-${serviceName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Reset to defaults
  const handleReset = () => {
    if (confirm('Reset all settings to defaults? This will clear all incidents and custom settings.')) {
      handleServiceTypeChange(serviceType)
      setIncidents([])
    }
  }

  // Save to localStorage
  useEffect(() => {
    const sessionData = { serviceType, serviceName, slis, sloTarget, trafficProfile, incidents }
    localStorage.setItem('sla-session', JSON.stringify(sessionData))
  }, [serviceType, serviceName, slis, sloTarget, trafficProfile, incidents])

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('sla-session')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setServiceType(data.serviceType || 'public-api')
        setServiceName(data.serviceName || 'My Service')
        setSLIs(data.slis || slis)
        setSLOTarget(data.sloTarget || sloTarget)
        setTrafficProfile(data.trafficProfile || trafficProfile)
        setIncidents(data.incidents || [])
      } catch (e) {
        console.error('Failed to load saved session:', e)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                🎯 SLA & Availability Targets
              </h1>
              <p className="text-lg text-slate-600">
                Define SLOs, calculate error budgets, and assess reliability under incident scenarios
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - 3 Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel - Inputs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-slate-200 p-6 sticky top-6">
              <SLOInputPanel
                serviceType={serviceType}
                serviceName={serviceName}
                slis={slis}
                sloTarget={sloTarget}
                trafficProfile={trafficProfile}
                onServiceTypeChange={handleServiceTypeChange}
                onServiceNameChange={setServiceName}
                onSLIChange={handleSLIChange}
                onSLOTargetChange={(updates) => setSLOTarget({ ...sloTarget, ...updates })}
                onTrafficProfileChange={(updates) =>
                  setTrafficProfile({ ...trafficProfile, ...updates })
                }
              />
            </div>
          </div>

          {/* Center Panel - Error Budget & Simulator */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <ErrorBudgetPanel errorBudget={errorBudget} sloPercentage={sloTarget.percentage} />
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <BurnRateSimulator
                incidents={incidentsWithImpact}
                sloTarget={sloTarget}
                trafficProfile={trafficProfile}
                onAddIncident={handleAddIncident}
                onRemoveIncident={handleRemoveIncident}
                onIncidentChange={handleIncidentChange}
              />
            </div>
          </div>

          {/* Right Panel - Assessment */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-slate-200 p-6 sticky top-6">
              <AssessmentSummary
                session={session}
                assessment={assessment}
                onExport={handleExport}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Generate markdown report for export
 */
function generateMarkdownReport(session: SLASession): string {
  const { serviceName, sloTarget, trafficProfile, slis, incidents, errorBudget, assessment } = session

  return `# SLA & Availability Assessment Report

**Service:** ${serviceName}
**Date:** ${new Date().toLocaleDateString()}
**Assessment Score:** ${assessment!.score}/100
**Risk Level:** ${assessment!.riskLevel.toUpperCase()}
**Can Meet SLO:** ${assessment!.canMeetSLO ? 'YES ✓' : 'NO ✗'}

---

## SLO Configuration

- **Target SLO:** ${sloTarget.percentage}%
- **Measurement Period:** ${sloTarget.period}
- **Traffic Volume:** ${formatNumber(trafficProfile.requestsPerDay)} requests/day
- **Peak Multiplier:** ${trafficProfile.peakMultiplier}x

## Active SLIs

${slis
  .filter((sli) => sli.enabled)
  .map(
    (sli) => `- **${sli.name}** (${sli.type}): ${sli.threshold}${sli.type === 'availability' ? '%' : 'ms'}`
  )
  .join('\n')}

---

## Error Budget

### Request-Based
- **Total Requests:** ${formatNumber(errorBudget.totalRequests)}
- **Allowed Failures:** ${formatNumber(errorBudget.allowedFailures)}
- **Consumed Failures:** ${formatNumber(errorBudget.consumedFailures)}
- **Remaining Failures:** ${formatNumber(errorBudget.remainingFailures)}

### Time-Based
- **Total Period:** ${formatDowntime(errorBudget.totalMinutes)}
- **Allowed Downtime:** ${formatDowntime(errorBudget.allowedDowntimeMinutes)}
- **Consumed Downtime:** ${formatDowntime(errorBudget.consumedDowntimeMinutes)}
- **Remaining Downtime:** ${formatDowntime(errorBudget.remainingDowntimeMinutes)}

### Summary
- **Budget Consumed:** ${errorBudget.percentConsumed.toFixed(1)}%
- **Budget Remaining:** ${(100 - errorBudget.percentConsumed).toFixed(1)}%

---

## Simulated Incidents (${incidents.length})

${
  incidents.length === 0
    ? '_No incidents simulated_'
    : incidents
        .map(
          (incident, i) => `
### ${i + 1}. ${incident.name}

- **Type:** ${incident.type}
- **Duration:** ${incident.durationMinutes} minutes
- **Error Rate:** ${(incident.errorRate! * 100).toFixed(1)}%
- **Latency Multiplier:** ${incident.latencyMultiplier}x
- **Failed Requests:** ${incident.affectedRequests ? formatNumber(incident.affectedRequests * incident.errorRate!) : 'N/A'}
- **Budget Consumed:** ${incident.budgetConsumed?.toFixed(1)}%
- **Burn Rate:** ${incident.burnRate?.toFixed(1)}x
`
        )
        .join('\n')
}

---

## Assessment

**Reasoning:** ${assessment!.reasoning}

### Alerts (${assessment!.alerts.length})

${
  assessment!.alerts.length === 0
    ? '_No alerts_'
    : assessment!.alerts
        .map(
          (alert) => `
- **[${alert.severity.toUpperCase()}]** ${alert.message}
  - Action: ${alert.action}
`
        )
        .join('\n')
}

### Recommendations (${assessment!.recommendations.length})

${assessment!.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

---

## Next Steps

1. Export this assessment for review with your team
2. Implement recommended monitoring and alerting
3. Document SLO policy and error budget thresholds
4. Schedule regular SLO reviews and adjustments
5. Practice incident response with game days

---

_Generated by Digital Platform Architect - SLA & Availability Targets Playground_
`
}
