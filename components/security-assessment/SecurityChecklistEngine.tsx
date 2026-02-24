'use client'

import { SECURITY_CONTROLS, clampSecurityScore } from '@/lib/security-assessment'

interface SecurityChecklistEngineProps {
  scores: Record<string, number>
  onScoreChange: (controlId: string, score: number) => void
}

const SCORE_OPTIONS = [0, 1, 2, 3, 4, 5]

export function SecurityChecklistEngine({ scores, onScoreChange }: SecurityChecklistEngineProps) {
  const onChangeScore = (controlId: string, score: number) => {
    onScoreChange(controlId, clampSecurityScore(score))
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6" aria-labelledby="security-checklist-heading">
      <div className="mb-6">
        <h2 id="security-checklist-heading" className="text-xl font-bold text-slate-900">
          Security Assessment Matrix
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Score each control from 0 to 5. Weighted scores update instantly.
        </p>
      </div>

      <div className="space-y-4">
        {SECURITY_CONTROLS.map((control) => {
          const score = clampSecurityScore(scores[control.id] ?? 0)
          const weightedScore = Math.round(((score / 5) * control.weight) * 10) / 10

          return (
            <fieldset key={control.id} className="rounded-lg border border-slate-200 p-4">
              <legend className="text-base font-semibold text-slate-900">{control.element}</legend>
              <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
                <p className="min-w-0 flex-1 text-sm leading-relaxed text-slate-600">{control.guidance}</p>
                <div className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  Weight {control.weight}%
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                <div className="grid grid-cols-6 gap-2" role="radiogroup" aria-label={`${control.element} score`}>
                  {SCORE_OPTIONS.map((value) => {
                    const inputId = `score-${control.id}-${value}`
                    return (
                      <div key={value}>
                        <input
                          id={inputId}
                          name={`score-${control.id}`}
                          type="radio"
                          value={value}
                          checked={score === value}
                          onChange={() => onChangeScore(control.id, value)}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor={inputId}
                          className="flex h-10 cursor-pointer items-center justify-center rounded-md border border-slate-300 bg-slate-50 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-100 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-blue-600 peer-checked:border-blue-600 peer-checked:bg-blue-600 peer-checked:text-white"
                        >
                          {value}
                        </label>
                      </div>
                    )
                  })}
                </div>

                <div className="text-sm text-slate-700">
                  Weighted: <span className="font-semibold text-slate-900">{weightedScore.toFixed(1)}</span> / {control.weight}
                </div>
              </div>
            </fieldset>
          )
        })}
      </div>

      <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        0 = Not addressed. 3 = Partially implemented. 5 = Fully implemented and verified.
      </div>
    </section>
  )
}
