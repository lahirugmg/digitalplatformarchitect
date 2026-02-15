'use client'

import { useState } from 'react'
import {
  CHECKLIST_ITEMS,
  calculateChecklistScore,
  getCategoryColor,
  type ChecklistScore
} from '@/lib/operational-sympathy'
import { ScoreSummary } from './ScoreSummary'

export function ChecklistEngine() {
  const [scores, setScores] = useState<ChecklistScore[]>(
    CHECKLIST_ITEMS.map(item => ({ itemId: item.id, score: 0 }))
  )

  const handleScoreChange = (itemId: string, score: number) => {
    setScores(prev =>
      prev.map(s => s.itemId === itemId ? { ...s, score } : s)
    )
  }

  const handleReset = () => {
    setScores(CHECKLIST_ITEMS.map(item => ({ itemId: item.id, score: 0 })))
  }

  const result = calculateChecklistScore(scores)

  return (
    <div className="space-y-6">
      {/* Score Summary */}
      <ScoreSummary result={result} onReset={handleReset} />

      {/* Checklist Grid */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        <div className="p-6">
          <h3 className="text-lg font-bold mb-4">Operational Sympathy Checklist</h3>
          <p className="text-sm text-slate-600 mb-6">
            Rate each element from 0 (not addressed) to 5 (fully implemented). Scores are weighted by importance.
          </p>

          <div className="space-y-4">
            {CHECKLIST_ITEMS.map(item => {
              const score = scores.find(s => s.itemId === item.id)?.score ?? 0
              const weightedScore = Math.round((score / 5) * item.weight * 10) / 10
              const categoryColor = getCategoryColor(item.category)

              return (
                <div
                  key={item.id}
                  className="border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-slate-900">{item.element}</h4>
                        <span className={`bg-${categoryColor}-100 text-${categoryColor}-700 text-xs px-2 py-0.5 rounded font-medium`}>
                          Weight: {item.weight}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">{item.guidance}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Score Input */}
                    <div className="flex items-center gap-2">
                      <label htmlFor={`score-${item.id}`} className="text-sm font-medium text-slate-700">
                        Score:
                      </label>
                      <div className="flex gap-1">
                        {[0, 1, 2, 3, 4, 5].map(value => (
                          <button
                            key={value}
                            onClick={() => handleScoreChange(item.id, value)}
                            className={`
                              w-10 h-10 rounded font-semibold transition
                              ${score === value
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }
                            `}
                            aria-label={`Score ${value}`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Weighted Score Display */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-700">Weighted:</span>
                      <span className="text-lg font-bold text-blue-600">
                        {weightedScore.toFixed(1)}
                      </span>
                      <span className="text-sm text-slate-500">/ {item.weight}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
