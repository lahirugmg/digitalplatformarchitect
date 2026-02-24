'use client'

import { SECURITY_CONTROLS, getSecurityScoreColor, type SecurityAssessmentResult } from '@/lib/security-assessment'

interface SecurityScoreSummaryProps {
  result: SecurityAssessmentResult
  onReset: () => void
}

export function SecurityScoreSummary({ result, onReset }: SecurityScoreSummaryProps) {
  const { totalScore, percentage, interpretation, topRisks } = result
  const scoreColor = getSecurityScoreColor(percentage)

  const colorClasses: Record<string, { bg: string; text: string; border: string; bar: string }> = {
    green: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      border: 'border-green-200',
      bar: 'bg-green-500',
    },
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      bar: 'bg-blue-500',
    },
    yellow: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-800',
      border: 'border-yellow-200',
      bar: 'bg-yellow-500',
    },
    red: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-200',
      bar: 'bg-red-500',
    },
  }

  const colors = colorClasses[scoreColor] ?? colorClasses.red
  const topThreeRisks = topRisks.slice(0, 3)
  const byId = new Map(SECURITY_CONTROLS.map((control) => [control.id, control]))

  return (
    <section className={`rounded-xl border ${colors.border} ${colors.bg} p-5 sm:p-6`} aria-live="polite">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Overall Score</h2>
          <p className="mt-1 text-sm text-slate-600">Weighted across all ten controls</p>
        </div>
        <button
          onClick={onReset}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Reset
        </button>
      </div>

      <div className="flex items-end gap-5">
        <div>
          <div className={`text-5xl font-bold ${colors.text}`}>{percentage}</div>
          <div className="text-sm font-medium text-slate-600">/ 100</div>
        </div>

        <div className="flex-1 pb-1">
          <div className="h-3 overflow-hidden rounded-full border border-slate-200 bg-white">
            <div
              className={`h-full transition-all duration-200 ${colors.bar}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Raw score: {totalScore.toFixed(1)} / 100
          </div>
        </div>
      </div>

      <div className={`mt-4 rounded-lg border ${colors.border} bg-white p-3`}>
        <h3 className={`text-sm font-semibold ${colors.text}`}>{interpretation}</h3>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {Object.entries(result.categoryScores).map(([category, { score, max }]) => {
          const categoryPercentage = Math.round((score / max) * 100)
          return (
            <div key={category} className="rounded-md border border-slate-200 bg-white p-2.5">
              <div className="text-[11px] font-medium capitalize text-slate-600">{category.replace('-', ' ')}</div>
              <div className="text-base font-semibold text-slate-900">{categoryPercentage}%</div>
            </div>
          )
        })}
      </div>

      <div className="mt-5 border-t border-slate-200 pt-4">
        <h3 className="text-sm font-semibold text-slate-900">Top priority gaps</h3>
        {topThreeRisks.length === 0 ? (
          <p className="mt-2 text-sm text-slate-600">No gaps detected.</p>
        ) : (
          <ul className="mt-2 space-y-2 text-sm text-slate-700">
            {topThreeRisks.map((risk) => {
              const control = byId.get(risk.controlId)
              return (
                <li key={risk.controlId} className="rounded-md border border-slate-200 bg-white p-2.5">
                  <p className="font-medium text-slate-900">{control?.element ?? risk.controlId}</p>
                  <p className="text-xs text-slate-600">Potential gain: +{risk.weightedGap.toFixed(1)} points</p>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}
