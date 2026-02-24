import { buildContextSummary } from '@/lib/personalization/context'
import type { ResolvedPersonalizationContext } from '@/lib/personalization/types'

interface PersonalizedSectionHeaderProps {
  title: string
  context: ResolvedPersonalizationContext
  sessionActive: boolean
  onChangeContext?: () => void
  subtitle?: string
}

export default function PersonalizedSectionHeader({
  title,
  context,
  sessionActive,
  onChangeContext,
  subtitle,
}: PersonalizedSectionHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
        <p className="mt-2 inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          Why this: {buildContextSummary(context)}
        </p>
        {!sessionActive && (
          <p className="mt-2 text-xs text-slate-500">
            Restore or create a profile session to keep recommendations synced across devices.
          </p>
        )}
      </div>

      {onChangeContext && (
        <button
          type="button"
          onClick={onChangeContext}
          className="self-start rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Change context
        </button>
      )}
    </div>
  )
}
