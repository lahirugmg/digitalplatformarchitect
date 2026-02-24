'use client'

import { useEffect, useMemo, useState } from 'react'
import { calculateSecurityScore, toSecurityControlScores } from '@/lib/security-assessment'
import {
  clearSecurityAssessmentSession,
  createDefaultSecurityScoreRecord,
  loadSecurityAssessmentSession,
  saveSecurityAssessmentSession,
} from '@/lib/security-assessment-storage'
import { SecurityChecklistEngine } from './SecurityChecklistEngine'
import { SecurityLearnPanel } from './SecurityLearnPanel'
import { SecurityReportExport } from './SecurityReportExport'
import { SecurityScoreSummary } from './SecurityScoreSummary'

const AUTOSAVE_DEBOUNCE_MS = 250

export function SecurityAssessmentPlayground() {
  const [scores, setScores] = useState<Record<string, number>>(() => createDefaultSecurityScoreRecord())
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const session = loadSecurityAssessmentSession()
    if (session) {
      setScores(session.scores)
    }

    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) {
      return undefined
    }

    const timer = window.setTimeout(() => {
      saveSecurityAssessmentSession(scores)
    }, AUTOSAVE_DEBOUNCE_MS)

    return () => {
      window.clearTimeout(timer)
    }
  }, [hydrated, scores])

  const controlScores = useMemo(() => toSecurityControlScores(scores), [scores])
  const result = useMemo(() => calculateSecurityScore(controlScores), [controlScores])

  const handleScoreChange = (controlId: string, score: number) => {
    setScores((previous: Record<string, number>) => ({
      ...previous,
      [controlId]: score,
    }))
  }

  const handleReset = () => {
    setScores(createDefaultSecurityScoreRecord())
    clearSecurityAssessmentSession()
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(320px,360px)_1fr]">
      <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <SecurityScoreSummary result={result} onReset={handleReset} />
        <SecurityReportExport result={result} scores={scores} />
      </aside>

      <div className="space-y-6">
        <SecurityLearnPanel />
        <SecurityChecklistEngine scores={scores} onScoreChange={handleScoreChange} />
      </div>
    </div>
  )
}
