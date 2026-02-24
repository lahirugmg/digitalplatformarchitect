import Link from 'next/link'
import type { LearningMilestoneState, ProgressMilestone } from '@/lib/progress/types'

interface MilestoneTimelineProps {
  milestones: Array<ProgressMilestone & { state: LearningMilestoneState }>
  onComplete: (milestoneId: string) => void
}

const STATUS_BADGES: Record<LearningMilestoneState['status'], string> = {
  not_started: 'bg-slate-100 text-slate-700 border border-slate-200',
  in_progress: 'bg-blue-50 text-blue-700 border border-blue-200',
  completed: 'bg-green-50 text-green-700 border border-green-200',
}

const STATUS_LABELS: Record<LearningMilestoneState['status'], string> = {
  not_started: 'Not started',
  in_progress: 'In progress',
  completed: 'Completed',
}

export default function MilestoneTimeline({ milestones, onComplete }: MilestoneTimelineProps) {
  return (
    <section className="card-standard">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Milestone timeline</h2>
        <p className="text-xs text-slate-500">Confirm completions as you progress</p>
      </div>

      <div className="space-y-3">
        {milestones.map((milestone) => {
          const isCompleted = milestone.state.status === 'completed'

          return (
            <article
              key={milestone.id}
              className="rounded-lg border border-slate-200 bg-white p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-900">{milestone.title}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${STATUS_BADGES[milestone.state.status]}`}>
                      {STATUS_LABELS[milestone.state.status]}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-slate-600">{milestone.description}</p>

                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                    {milestone.state.startedAt && (
                      <span>Started: {new Date(milestone.state.startedAt).toLocaleDateString()}</span>
                    )}
                    {milestone.state.completedAt && (
                      <span>Completed: {new Date(milestone.state.completedAt).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link href={milestone.href} className="btn-secondary px-3 py-1.5 text-sm">
                    Open
                  </Link>
                  {!isCompleted && (
                    <button
                      type="button"
                      onClick={() => onComplete(milestone.id)}
                      className="btn-primary px-3 py-1.5 text-sm"
                    >
                      Mark complete
                    </button>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
