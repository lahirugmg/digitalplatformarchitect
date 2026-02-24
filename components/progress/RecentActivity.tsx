import type { LearningProgressActivity } from '@/lib/progress/types'

interface RecentActivityProps {
  activity: LearningProgressActivity[]
}

const ACTIVITY_LABELS: Record<LearningProgressActivity['kind'], string> = {
  visit: 'Visited',
  start: 'Started',
  complete: 'Completed',
}

export default function RecentActivity({ activity }: RecentActivityProps) {
  return (
    <section className="card-standard">
      <h2 className="text-base font-semibold text-slate-900">Recent activity</h2>
      <p className="mt-1 text-sm text-slate-600">Latest milestones and route interactions.</p>

      <ul className="mt-4 space-y-2">
        {activity.length === 0 ? (
          <li className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
            No activity yet. Start with a playground or pattern resource.
          </li>
        ) : (
          activity.map((item) => (
            <li
              key={item.id}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2"
            >
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-slate-900">{ACTIVITY_LABELS[item.kind]}</span>
                <span className="text-xs text-slate-500">
                  {new Date(item.at).toLocaleDateString()} {new Date(item.at).toLocaleTimeString()}
                </span>
              </div>
              <p className="mt-1 break-all text-xs text-slate-600">{item.path}</p>
            </li>
          ))
        )}
      </ul>
    </section>
  )
}
