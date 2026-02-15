'use client'

import { getScoreColor, type ChecklistResult } from '@/lib/operational-sympathy'

interface ScoreSummaryProps {
  result: ChecklistResult
  onReset: () => void
}

export function ScoreSummary({ result, onReset }: ScoreSummaryProps) {
  const { totalScore, percentage, interpretation } = result
  const scoreColor = getScoreColor(percentage)

  const colorClasses: Record<string, { bg: string; text: string; ring: string }> = {
    green: { bg: 'bg-green-50', text: 'text-green-700', ring: 'ring-green-200' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-700', ring: 'ring-blue-200' },
    yellow: { bg: 'bg-yellow-50', text: 'text-yellow-700', ring: 'ring-yellow-200' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-700', ring: 'ring-orange-200' },
    red: { bg: 'bg-red-50', text: 'text-red-700', ring: 'ring-red-200' }
  }

  const colors = colorClasses[scoreColor]

  return (
    <div className={`${colors.bg} border-2 ${colors.ring} rounded-lg p-6`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">Overall Operational Sympathy Score</h3>
          <p className="text-sm text-slate-600">
            Weighted score based on importance of each element
          </p>
        </div>
        <button
          onClick={onReset}
          className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition text-sm"
        >
          Reset All
        </button>
      </div>

      <div className="flex items-end gap-6 mb-4">
        <div>
          <div className={`text-6xl font-bold ${colors.text}`}>
            {percentage}
          </div>
          <div className="text-sm text-slate-600 font-medium">out of 100</div>
        </div>

        <div className="flex-1 pb-2">
          {/* Progress Bar */}
          <div className="h-8 bg-white rounded-full overflow-hidden border border-slate-200">
            <div
              className={`h-full transition-all duration-500 ${
                scoreColor === 'green' ? 'bg-green-500' :
                scoreColor === 'blue' ? 'bg-blue-500' :
                scoreColor === 'yellow' ? 'bg-yellow-500' :
                scoreColor === 'orange' ? 'bg-orange-500' :
                'bg-red-500'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="mt-1 text-xs text-slate-500 text-right">
            Raw score: {totalScore.toFixed(1)} / 100
          </div>
        </div>
      </div>

      {/* Interpretation */}
      <div className={`${colors.bg} border ${colors.ring} rounded-lg p-4`}>
        <div className="flex items-start gap-3">
          <div className="text-2xl">
            {scoreColor === 'green' ? '✅' :
             scoreColor === 'blue' ? '👍' :
             scoreColor === 'yellow' ? '⚠️' :
             scoreColor === 'orange' ? '⚠️' :
             '❌'}
          </div>
          <div>
            <h4 className={`font-bold ${colors.text} mb-1`}>
              {scoreColor === 'green' ? 'Production Ready' :
               scoreColor === 'blue' ? 'Nearly Production Ready' :
               scoreColor === 'yellow' ? 'Needs Improvement' :
               scoreColor === 'orange' ? 'Significant Gaps' :
               'Not Production Ready'}
            </h4>
            <p className="text-sm text-slate-700">{interpretation}</p>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(result.categoryScores).map(([category, { score, max }]) => {
          const categoryPercentage = Math.round((score / max) * 100)
          return (
            <div key={category} className="bg-white rounded-lg p-3 border border-slate-200">
              <div className="text-xs font-medium text-slate-600 mb-1 capitalize">
                {category}
              </div>
              <div className="text-lg font-bold text-slate-900">
                {categoryPercentage}%
              </div>
              <div className="text-xs text-slate-500">
                {score.toFixed(1)} / {max}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
