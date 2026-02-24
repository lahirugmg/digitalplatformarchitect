'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import MilestoneTimeline from '@/components/progress/MilestoneTimeline'
import NextMilestones from '@/components/progress/NextMilestones'
import ProgressSummary from '@/components/progress/ProgressSummary'
import RecentActivity from '@/components/progress/RecentActivity'
import {
  completeLearningProgressMilestone,
  ensureLearningProgressState,
  getCachedHint,
  getCachedState,
  getResolvedPersonalizationContext,
  hydrateStateFromServer,
  isProfileFeatureEnabled,
} from '@/lib/profile/profile-client'
import { emitPersonalizationEvent } from '@/lib/personalization/telemetry'
import {
  createEmptyLearningProgressState,
  getLearningProgressSnapshot,
  getMilestoneTimeline,
  getNextMilestones,
  getRecentActivity,
} from '@/lib/progress/tracker'
import type { LearningProgressState } from '@/lib/progress/types'

export default function ProgressHubClient() {
  const [learningProgress, setLearningProgress] = useState<LearningProgressState>(() =>
    createEmptyLearningProgressState(),
  )
  const [sessionActive, setSessionActive] = useState(false)
  const [isReady, setIsReady] = useState(false)

  const refresh = useCallback(() => {
    const cachedState = getCachedState()
    setLearningProgress(cachedState.learningProgress ?? ensureLearningProgressState())
    setSessionActive(Boolean(getCachedHint()))
    setIsReady(true)
  }, [])

  useEffect(() => {
    refresh()

    if (isProfileFeatureEnabled()) {
      void hydrateStateFromServer().finally(() => {
        refresh()
      })
    }

    const onProfileStateChange = () => {
      refresh()
    }

    window.addEventListener('stemized:profile-status-change', onProfileStateChange)
    return () => {
      window.removeEventListener('stemized:profile-status-change', onProfileStateChange)
    }
  }, [refresh])

  const snapshot = useMemo(() => getLearningProgressSnapshot(learningProgress), [learningProgress])
  const timeline = useMemo(() => getMilestoneTimeline(learningProgress), [learningProgress])
  const nextMilestones = useMemo(() => getNextMilestones(learningProgress, 4), [learningProgress])
  const recentActivity = useMemo(() => getRecentActivity(learningProgress, 8), [learningProgress])

  const handleMarkComplete = (milestoneId: string) => {
    const next = completeLearningProgressMilestone(milestoneId)
    setLearningProgress(next)

    const context = getResolvedPersonalizationContext()
    emitPersonalizationEvent('progress_milestone_completed', {
      surface: 'progress',
      milestone_id: milestoneId,
      role: context.role,
      goal: context.goal,
      session_active: sessionActive,
    })
  }

  return (
    <div className="min-h-screen bg-[var(--surface-0)]">
      <section className="border-b border-slate-200 bg-gradient-to-b from-white via-slate-50 to-[var(--surface-0)]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="max-w-3xl">
            <span className="badge-primary">Progress Hub</span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Learning Progress Tracker
            </h1>
            <p className="mt-3 text-base text-slate-600 sm:text-lg">
              Track milestone progress from real usage signals, confirm completions, and keep a focused timeline.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/playgrounds" className="btn-primary">
              Open playgrounds
            </Link>
            <Link href="/patterns" className="btn-secondary">
              Browse patterns
            </Link>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {!sessionActive && (
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Progress is stored locally. Restore or create a profile session to sync progress across devices.
          </div>
        )}

        {isReady ? (
          <div className="space-y-6">
            <ProgressSummary snapshot={snapshot} milestoneCount={timeline.length} />

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
              <MilestoneTimeline milestones={timeline} onComplete={handleMarkComplete} />

              <div className="space-y-6">
                <NextMilestones milestones={nextMilestones} />
                <RecentActivity activity={recentActivity} />
              </div>
            </div>
          </div>
        ) : (
          <div className="card-standard text-center text-slate-600">Loading progress timeline...</div>
        )}
      </main>
    </div>
  )
}
