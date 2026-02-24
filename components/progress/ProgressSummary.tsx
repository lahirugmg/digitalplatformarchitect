import type { LearningProgressSnapshot } from '@/lib/progress/types'

interface ProgressSummaryProps {
  snapshot: LearningProgressSnapshot
  milestoneCount: number
}

const STAGE_LABELS: Record<LearningProgressSnapshot['stage'], string> = {
  early: 'Early',
  mid: 'Mid',
  late: 'Late',
}

const STAGE_DESCRIPTIONS: Record<LearningProgressSnapshot['stage'], string> = {
  early: 'You are building foundations and identifying your next workflow.',
  mid: 'You are actively practicing across multiple architecture workflows.',
  late: 'You have completed most milestone workflows and can focus on depth.',
}

export default function ProgressSummary({ snapshot, milestoneCount }: ProgressSummaryProps) {
  return (
    <section className="card-standard">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Learning stage</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            {STAGE_LABELS[snapshot.stage]} progress
          </h2>
          <p className="mt-1 text-sm text-slate-600">{STAGE_DESCRIPTIONS[snapshot.stage]}</p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center sm:w-[300px]">
          <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
            <div className="text-lg font-semibold text-slate-900">{snapshot.completedMilestones}</div>
            <div className="text-[11px] uppercase tracking-wide text-slate-500">Completed</div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
            <div className="text-lg font-semibold text-slate-900">{snapshot.inProgressMilestones}</div>
            <div className="text-[11px] uppercase tracking-wide text-slate-500">In Progress</div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
            <div className="text-lg font-semibold text-slate-900">{milestoneCount}</div>
            <div className="text-[11px] uppercase tracking-wide text-slate-500">Total</div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-600">
          <span>Completion</span>
          <span>{snapshot.completionPercentage}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-200"
            style={{ width: `${snapshot.completionPercentage}%` }}
          />
        </div>
      </div>
    </section>
  )
}
