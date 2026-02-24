import Link from 'next/link'
import type { LearningMilestoneState, ProgressMilestone } from '@/lib/progress/types'

interface NextMilestonesProps {
  milestones: Array<ProgressMilestone & { state: LearningMilestoneState }>
}

const STATUS_HINTS: Record<LearningMilestoneState['status'], string> = {
  not_started: 'Ready to start',
  in_progress: 'Continue this milestone',
  completed: 'Already complete',
}

export default function NextMilestones({ milestones }: NextMilestonesProps) {
  return (
    <section className="card-standard">
      <h2 className="text-base font-semibold text-slate-900">Next best milestones</h2>
      <p className="mt-1 text-sm text-slate-600">Suggested actions based on your current timeline state.</p>

      <div className="mt-4 space-y-3">
        {milestones.length === 0 ? (
          <p className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
            All core milestones are complete. Continue exploring advanced content.
          </p>
        ) : (
          milestones.map((milestone) => (
            <article key={milestone.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <h3 className="text-sm font-semibold text-slate-900">{milestone.title}</h3>
              <p className="mt-1 text-xs text-slate-600">{STATUS_HINTS[milestone.state.status]}</p>
              <Link href={milestone.href} className="mt-2 inline-flex text-sm font-medium text-blue-700 hover:underline">
                Open milestone
              </Link>
            </article>
          ))
        )}
      </div>
    </section>
  )
}
