'use client'

import Link from 'next/link'
import { useState, useEffect, useMemo } from 'react'
import { READINESS_STEPS, calculateProgress, getProgressColor, generateReadinessReport, type ReadinessStep } from '@/lib/production-readiness'
import type { GoalId } from '@/lib/onboarding/types'
import ContextOverrideControl from '@/components/personalization/ContextOverrideControl'
import PersonalizedSectionHeader from '@/components/personalization/PersonalizedSectionHeader'
import ReasonChips from '@/components/personalization/ReasonChips'
import { getGoalLabel } from '@/lib/personalization/context'
import { emitPersonalizationEvent } from '@/lib/personalization/telemetry'
import { usePersonalization } from '@/lib/personalization/use-personalization'
import { WorkflowSteps } from './WorkflowSteps'
import { PlaygroundLink } from '@/components/shared/PlaygroundLink'
import { TheoryLink } from '@/components/shared/TheoryLink'

const DEFAULT_CATEGORY_PRIORITY: ReadinessStep['category'][] = [
  'assessment',
  'planning',
  'operations',
  'security',
]

const GOAL_CATEGORY_PRIORITY: Partial<Record<GoalId, ReadinessStep['category'][]>> = {
  'assess-readiness': ['assessment', 'operations', 'planning', 'security'],
  'security-review': ['security', 'assessment', 'operations', 'planning'],
  'performance-optimization': ['operations', 'planning', 'assessment', 'security'],
  'cloud-migration': ['planning', 'operations', 'assessment', 'security'],
  'evaluate-architecture': ['assessment', 'planning', 'operations', 'security'],
}

export function ProductionReadinessHub() {
  const [steps, setSteps] = useState<ReadinessStep[]>(READINESS_STEPS)
  const [showOverride, setShowOverride] = useState(false)
  const { enabled, context, sessionActive, setOverride } = usePersonalization({
    surface: 'production-readiness',
    limit: 3,
  })
  const progress = calculateProgress(steps)
  const progressColor = getProgressColor(progress.overallProgress)

  const categoryPriority = useMemo(() => {
    if (!context.goal) {
      return DEFAULT_CATEGORY_PRIORITY
    }
    return GOAL_CATEGORY_PRIORITY[context.goal] ?? DEFAULT_CATEGORY_PRIORITY
  }, [context.goal])

  const nextBestStep = useMemo(() => {
    const incompleteSteps = steps.filter((step) => step.status !== 'completed')
    if (incompleteSteps.length === 0) {
      return null
    }

    return [...incompleteSteps].sort((left, right) => {
      const leftRank = categoryPriority.indexOf(left.category)
      const rightRank = categoryPriority.indexOf(right.category)
      const normalizedLeftRank = leftRank === -1 ? categoryPriority.length : leftRank
      const normalizedRightRank = rightRank === -1 ? categoryPriority.length : rightRank

      if (normalizedLeftRank !== normalizedRightRank) {
        return normalizedLeftRank - normalizedRightRank
      }

      return READINESS_STEPS.findIndex((step) => step.id === left.id) - READINESS_STEPS.findIndex((step) => step.id === right.id)
    })[0]
  }, [categoryPriority, steps])

  const nextBestReasonChips = useMemo(() => {
    if (!nextBestStep) {
      return []
    }

    const reasons = ['First incomplete workflow step']
    if (context.goal) {
      reasons.unshift(`Goal: ${getGoalLabel(context.goal)}`)
      reasons.push(`Category fit: ${nextBestStep.category}`)
    }

    return reasons
  }, [context.goal, nextBestStep])

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('production-readiness-progress')
    if (saved) {
      try {
        const savedSteps = JSON.parse(saved)
        setSteps(savedSteps)
      } catch (e) {
        console.error('Failed to load progress:', e)
      }
    }
  }, [])

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('production-readiness-progress', JSON.stringify(steps))
  }, [steps])

  const handleExportReport = () => {
    const report = generateReadinessReport(progress)
    const blob = new Blob([report], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `production-readiness-report-${new Date().toISOString().split('T')[0]}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleReset = () => {
    if (confirm('Reset all progress? This cannot be undone.')) {
      setSteps(READINESS_STEPS)
      localStorage.removeItem('production-readiness-progress')
    }
  }

  const markStepCompleted = (stepId: string) => {
    setSteps((previousSteps) =>
      previousSteps.map((step) =>
        step.id === stepId
          ? {
              ...step,
              status: 'completed',
              score: step.score ?? 100,
            }
          : step,
      ),
    )

    emitPersonalizationEvent('personalization_next_step_completed', {
      surface: 'production-readiness',
      recommendation_id: stepId,
      role: context.role,
      goal: context.goal,
      session_active: sessionActive,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
              Complete Production Readiness Assessment
            </div>
            <h1 className="text-5xl font-bold mb-4">
              Production Readiness Hub
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              Follow a structured workflow to assess, plan, and prepare your architecture for production deployment.
              Each step combines theoretical knowledge with interactive tools.
            </p>
            <div className="flex items-center gap-6 text-sm text-blue-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📚</span>
                <span>Learn theory</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎮</span>
                <span>Practice with tools</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">📊</span>
                <span>Export results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`rounded-2xl p-8 border-4 ${
          progressColor === 'green' ? 'border-green-400 bg-green-50' :
          progressColor === 'yellow' ? 'border-yellow-400 bg-yellow-50' :
          progressColor === 'orange' ? 'border-orange-400 bg-orange-50' :
          'border-red-400 bg-red-50'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Overall Progress
              </h2>
              <p className="text-slate-700">
                {progress.completedSteps} of {progress.totalSteps} steps completed
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleExportReport}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export Report
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-3 bg-white border-2 border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="h-8 bg-white rounded-full overflow-hidden border-2 border-slate-200">
              <div
                className={`h-full transition-all duration-500 flex items-center justify-center text-white font-bold text-sm ${
                  progressColor === 'green' ? 'bg-green-500' :
                  progressColor === 'yellow' ? 'bg-yellow-500' :
                  progressColor === 'orange' ? 'bg-orange-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${progress.overallProgress}%` }}
              >
                {progress.overallProgress > 10 && `${progress.overallProgress}%`}
              </div>
            </div>
          </div>

          {/* Status Message */}
          <div className={`rounded-lg p-4 ${
            progressColor === 'green' ? 'bg-green-100 border border-green-300' :
            progressColor === 'yellow' ? 'bg-yellow-100 border border-yellow-300' :
            progressColor === 'orange' ? 'bg-orange-100 border border-orange-300' :
            'bg-red-100 border border-red-300'
          }`}>
            <p className="font-bold text-slate-900 mb-1">
              {progress.overallProgress >= 100 ? '🎉 Assessment Complete!' :
               progress.overallProgress >= 80 ? '✅ Nearly There!' :
               progress.overallProgress >= 50 ? '⚡ Good Progress' :
               progress.overallProgress >= 20 ? '🚀 Getting Started' :
               '👋 Welcome! Start Your Assessment'}
            </p>
            <p className="text-sm text-slate-700">
              {progress.overallProgress >= 100
                ? 'Your architecture has been fully assessed. Review the report and address any identified gaps.'
                : progress.overallProgress >= 80
                ? `Just ${progress.totalSteps - progress.completedSteps} step${progress.totalSteps - progress.completedSteps > 1 ? 's' : ''} remaining to complete your assessment.`
                : progress.overallProgress >= 50
                ? 'You\'re making great progress. Continue with the remaining assessments.'
                : progress.overallProgress >= 20
                ? 'You\'ve started your production readiness journey. Keep going!'
                : 'Begin with Step 1: Assess your architecture\'s operational sympathy.'}
            </p>
          </div>
        </div>
      </div>

      {enabled && nextBestStep && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <PersonalizedSectionHeader
              title="Next Best Step for You"
              subtitle="Recommended from your current context and remaining workflow."
              context={context}
              sessionActive={sessionActive}
              onChangeContext={() => setShowOverride((previous) => !previous)}
            />

            {showOverride && (
              <div className="mt-4">
                <ContextOverrideControl
                  role={context.role}
                  goal={context.goal}
                  source={context.source}
                  onApply={setOverride}
                  onDone={() => setShowOverride(false)}
                />
              </div>
            )}

            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-lg font-bold text-slate-900">{nextBestStep.title}</h3>
              <p className="mt-1 text-sm text-slate-700">{nextBestStep.description}</p>
              <ReasonChips chips={nextBestReasonChips} className="mt-3" />

              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                <Link
                  href={nextBestStep.playgroundLink}
                  className="rounded-md bg-blue-600 px-3 py-1.5 font-semibold text-white transition hover:bg-blue-700"
                  onClick={() =>
                    emitPersonalizationEvent('personalization_reco_click', {
                      surface: 'production-readiness',
                      recommendation_id: nextBestStep.id,
                      role: context.role,
                      goal: context.goal,
                      session_active: sessionActive,
                    })
                  }
                >
                  Start this step
                </Link>
                <button
                  type="button"
                  onClick={() => markStepCompleted(nextBestStep.id)}
                  className="rounded-md border border-slate-300 bg-white px-3 py-1.5 font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  Mark as completed
                </button>
                {context.goal && (
                  <span className="ml-1 text-xs text-slate-500">
                    Context goal: {getGoalLabel(context.goal)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Introduction */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-3">
              How Production Readiness Works
            </h2>
            <p className="text-slate-700 mb-4">
              This hub guides you through a comprehensive production readiness assessment using a proven
              <strong> Learn → Practice → Apply</strong> methodology:
            </p>
            <ol className="space-y-2 text-slate-700 ml-6">
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600">1.</span>
                <span><strong>Learn the Theory</strong> - Understand concepts and best practices</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600">2.</span>
                <span><strong>Use Interactive Tools</strong> - Assess and plan with calculators and checklists</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600">3.</span>
                <span><strong>Export Results</strong> - Download reports to share with your team</span>
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Workflow Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Assessment Workflow
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl">
            Follow these steps in order for the most comprehensive assessment. Each step builds on the previous one.
          </p>
        </div>

        <WorkflowSteps steps={steps} />
      </div>

      {/* Quick Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">
          Related Resources
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <TheoryLink
            href="/patterns"
            title="Architecture Patterns Library"
            description="Browse 65+ patterns to improve your architecture design"
            type="pattern"
            icon="🏗️"
          />

          <PlaygroundLink
            href="/playgrounds/pattern-composer"
            title="Pattern Composer"
            description="Compose architecture patterns into complete solutions"
            category="architecture"
            icon="🎨"
          />

          <TheoryLink
            href="/blocks"
            title="Platform Building Blocks"
            description="Understand the 9 core platform components"
            type="component"
            icon="🧱"
          />

          <PlaygroundLink
            href="/progress"
            title="Learning Progress Hub"
            description="Track natural milestone progress across architecture workflows"
            category="skill"
            icon="📈"
          />
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {progress.overallProgress === 0
              ? 'Begin your production readiness journey with the Operational Sympathy assessment.'
              : progress.overallProgress >= 100
              ? 'Review your results and create an action plan for production deployment.'
              : 'Continue where you left off and complete your assessment.'}
          </p>
          <div className="flex justify-center gap-4">
            {progress.overallProgress === 0 ? (
              <a
                href="/playgrounds/operational-sympathy"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition shadow-lg text-lg"
              >
                Start with Step 1 →
              </a>
            ) : progress.overallProgress >= 100 ? (
              <button
                onClick={handleExportReport}
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition shadow-lg text-lg"
              >
                Download Complete Report
              </button>
            ) : (
              <a
                href={steps.find(s => s.status !== 'completed')?.playgroundLink || '/playgrounds/operational-sympathy'}
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition shadow-lg text-lg"
              >
                Continue Assessment →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
