'use client'

import { useEffect, useMemo, useState } from 'react'
import { calculateChecklistScore, toChecklistScores } from '@/lib/operational-sympathy'
import {
  clearOperationalSympathySession,
  createDefaultScoreRecord,
  loadOperationalSympathySession,
  saveOperationalSympathySession,
} from '@/lib/operational-sympathy-storage'
import { ChecklistEngine } from './ChecklistEngine'
import { LearnPanel } from './LearnPanel'
import { ReportExport } from './ReportExport'
import { ScoreSummary } from './ScoreSummary'

const AUTOSAVE_DEBOUNCE_MS = 250

export function OperationalSympathyPlayground() {
  const [scores, setScores] = useState<Record<string, number>>(() => createDefaultScoreRecord())
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const session = loadOperationalSympathySession()
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
      saveOperationalSympathySession(scores)
    }, AUTOSAVE_DEBOUNCE_MS)

    return () => {
      window.clearTimeout(timer)
    }
  }, [hydrated, scores])

  const checklistScores = useMemo(() => toChecklistScores(scores), [scores])
  const result = useMemo(() => calculateChecklistScore(checklistScores), [checklistScores])

  const handleScoreChange = (itemId: string, score: number) => {
    setScores((previous) => ({
      ...previous,
      [itemId]: score,
    }))
  }

  const handleReset = () => {
    setScores(createDefaultScoreRecord())
    clearOperationalSympathySession()
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(320px,360px)_1fr]">
      <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <ScoreSummary result={result} onReset={handleReset} />
        <ReportExport result={result} scores={scores} />
      </aside>

      <div className="space-y-6">
        <LearnPanel />
        <ChecklistEngine scores={scores} onScoreChange={handleScoreChange} />
      </div>
    </div>
  )
}
