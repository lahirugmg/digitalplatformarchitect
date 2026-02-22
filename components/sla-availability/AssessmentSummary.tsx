'use client'

import { AssessmentResult, SLASession } from '@/lib/sla-availability/types'
import { formatDowntime, formatNumber } from '@/lib/sla-availability/calculations'
import { CheckCircle2, XCircle, AlertCircle, Download, Shield } from 'lucide-react'

interface AssessmentSummaryProps {
  session: SLASession
  assessment: AssessmentResult
  onExport: () => void
}

export default function AssessmentSummary({
  session,
  assessment,
  onExport,
}: AssessmentSummaryProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-green-600'
      case 'medium':
        return 'text-yellow-600'
      case 'high':
        return 'text-orange-600'
      case 'critical':
        return 'text-red-600'
      default:
        return 'text-slate-600'
    }
  }

  const getRiskBg = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-green-50 border-green-200'
      case 'medium':
        return 'bg-yellow-50 border-yellow-200'
      case 'high':
        return 'bg-orange-50 border-orange-200'
      case 'critical':
        return 'bg-red-50 border-red-200'
      default:
        return 'bg-slate-50 border-slate-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">Assessment Summary</h3>
        <p className="text-sm text-slate-600">
          SLO readiness evaluation for {session.serviceName}
        </p>
      </div>

      {/* Overall Score */}
      <div className={`p-6 rounded-lg border-2 ${getRiskBg(assessment.riskLevel)}`}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {assessment.canMeetSLO ? (
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            ) : (
              <XCircle className="w-12 h-12 text-red-600" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h4 className="text-2xl font-bold text-slate-900">{assessment.score}/100</h4>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold uppercase ${getRiskColor(
                  assessment.riskLevel
                )} ${getRiskBg(assessment.riskLevel)}`}
              >
                {assessment.riskLevel} Risk
              </span>
            </div>
            <p className={`text-sm font-medium mb-2 ${
              assessment.canMeetSLO ? 'text-green-900' : 'text-red-900'
            }`}>
              {assessment.canMeetSLO
                ? `✓ Can meet ${session.sloTarget.percentage}% SLO target`
                : `✗ Cannot meet ${session.sloTarget.percentage}% SLO target`}
            </p>
            <p className="text-sm text-slate-700">{assessment.reasoning}</p>
          </div>
        </div>
      </div>

      {/* Burn Rate Alerts */}
      {assessment.alerts.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Alert Recommendations</h4>
          <div className="space-y-2">
            {assessment.alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  alert.severity === 'critical'
                    ? 'bg-red-50 border-red-200'
                    : 'bg-orange-50 border-orange-200'
                }`}
              >
                <div className="flex items-start gap-2">
                  <AlertCircle
                    className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      alert.severity === 'critical' ? 'text-red-600' : 'text-orange-600'
                    }`}
                  />
                  <div className="flex-1">
                    <p
                      className={`text-sm font-semibold ${
                        alert.severity === 'critical' ? 'text-red-900' : 'text-orange-900'
                      }`}
                    >
                      {alert.message}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        alert.severity === 'critical' ? 'text-red-700' : 'text-orange-700'
                      }`}
                    >
                      Action: {alert.action}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div>
        <h4 className="text-sm font-semibold text-slate-700 mb-3">
          Recommendations ({assessment.recommendations.length})
        </h4>
        <div className="space-y-2">
          {assessment.recommendations.map((rec, index) => {
            const isCritical = rec.includes('CRITICAL')
            const isHighRisk = rec.includes('HIGH RISK')
            const isMediumRisk = rec.includes('MEDIUM RISK')

            return (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  isCritical
                    ? 'bg-red-50 border-red-200'
                    : isHighRisk
                    ? 'bg-orange-50 border-orange-200'
                    : isMediumRisk
                    ? 'bg-yellow-50 border-yellow-200'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-slate-700 font-semibold text-sm">{index + 1}.</span>
                  <p
                    className={`text-sm flex-1 ${
                      isCritical
                        ? 'text-red-900'
                        : isHighRisk
                        ? 'text-orange-900'
                        : isMediumRisk
                        ? 'text-yellow-900'
                        : 'text-slate-700'
                    }`}
                  >
                    {rec}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* SLO Summary */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          SLO Configuration Summary
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Target SLO</span>
            <span className="font-semibold text-slate-900">{session.sloTarget.percentage}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Measurement Period</span>
            <span className="font-semibold text-slate-900">{session.sloTarget.period}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Traffic Volume</span>
            <span className="font-semibold text-slate-900">
              {formatNumber(session.trafficProfile.requestsPerDay)}/day
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Allowed Downtime</span>
            <span className="font-semibold text-slate-900">
              {formatDowntime(session.errorBudget.allowedDowntimeMinutes)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Allowed Failures</span>
            <span className="font-semibold text-slate-900">
              {formatNumber(session.errorBudget.allowedFailures)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Active SLIs</span>
            <span className="font-semibold text-slate-900">
              {session.slis.filter((s) => s.enabled).length}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Simulated Incidents</span>
            <span className="font-semibold text-slate-900">{session.incidents.length}</span>
          </div>
        </div>
      </div>

      {/* Export Button */}
      <button
        onClick={onExport}
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2"
      >
        <Download className="w-5 h-5" />
        Export Assessment Report
      </button>

      {/* Next Steps */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">Next Steps</h4>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>• Export this assessment for review with your team</li>
          <li>• Implement recommended monitoring and alerting</li>
          <li>• Document SLO policy and error budget thresholds</li>
          <li>• Schedule regular SLO reviews and adjustments</li>
          <li>• Practice incident response with game days</li>
        </ul>
      </div>
    </div>
  )
}
