'use client'

import Link from 'next/link'
import { type ReadinessStep, getStatusBadge, getCategoryColor } from '@/lib/production-readiness'

interface WorkflowStepsProps {
  steps: ReadinessStep[]
  currentStepId?: string
}

export function WorkflowSteps({ steps, currentStepId }: WorkflowStepsProps) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const isActive = step.id === currentStepId
        const isCompleted = step.status === 'completed'
        const categoryColor = getCategoryColor(step.category)
        const statusBadge = getStatusBadge(step.status)

        const colorClasses = {
          blue: {
            border: 'border-blue-300',
            bg: 'bg-blue-50',
            hoverBg: 'hover:bg-blue-100',
            activeBg: 'bg-blue-100',
            icon: 'bg-blue-600',
            connector: 'bg-blue-300'
          },
          purple: {
            border: 'border-purple-300',
            bg: 'bg-purple-50',
            hoverBg: 'hover:bg-purple-100',
            activeBg: 'bg-purple-100',
            icon: 'bg-purple-600',
            connector: 'bg-purple-300'
          },
          red: {
            border: 'border-red-300',
            bg: 'bg-red-50',
            hoverBg: 'hover:bg-red-100',
            activeBg: 'bg-red-100',
            icon: 'bg-red-600',
            connector: 'bg-red-300'
          },
          green: {
            border: 'border-green-300',
            bg: 'bg-green-50',
            hoverBg: 'hover:bg-green-100',
            activeBg: 'bg-green-100',
            icon: 'bg-green-600',
            connector: 'bg-green-300'
          },
          slate: {
            border: 'border-slate-300',
            bg: 'bg-slate-50',
            hoverBg: 'hover:bg-slate-100',
            activeBg: 'bg-slate-100',
            icon: 'bg-slate-600',
            connector: 'bg-slate-300'
          }
        }

        const colors = colorClasses[categoryColor as keyof typeof colorClasses] || colorClasses.slate

        return (
          <div key={step.id} className="relative">
            <Link
              href={step.playgroundLink}
              className={`block border-2 rounded-lg p-6 transition group ${
                isCompleted ? 'border-green-400 bg-green-50' :
                isActive ? `${colors.border} ${colors.activeBg}` :
                `${colors.border} ${colors.bg} ${colors.hoverBg}`
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Step Number & Icon */}
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                    isCompleted ? 'bg-green-600' : colors.icon
                  }`}>
                    {isCompleted ? '✓' : index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{step.icon}</span>
                        <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-700 mb-2">
                        {step.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-slate-600">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {step.estimatedTime}
                        </span>
                        <span className="capitalize">
                          {step.category}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex flex-col items-end gap-2">
                      <span className={`text-xs px-2 py-1 rounded font-medium ${statusBadge.color}`}>
                        {statusBadge.label}
                      </span>
                      {step.score !== undefined && (
                        <span className="text-sm font-bold text-slate-900">
                          {step.score}/100
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 mt-3">
                    {step.theoryLink && (
                      <Link
                        href={step.theoryLink}
                        className="text-xs text-blue-600 hover:underline font-medium flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>📚</span>
                        <span>Learn Theory</span>
                      </Link>
                    )}
                    <Link
                      href={step.playgroundLink}
                      className="text-xs text-purple-600 hover:underline font-medium flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>🎮</span>
                      <span>Start Assessment</span>
                    </Link>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 text-slate-400 group-hover:text-blue-600 transition">
                  →
                </div>
              </div>
            </Link>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className={`w-1 h-6 ml-6 ${
                steps[index + 1].status === 'completed' ? 'bg-green-400' : colors.connector
              }`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
