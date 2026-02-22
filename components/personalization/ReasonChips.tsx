interface ReasonChipsProps {
  chips: string[]
  className?: string
}

export default function ReasonChips({ chips, className }: ReasonChipsProps) {
  if (chips.length === 0) {
    return null
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className ?? ''}`} aria-label="Recommendation reasons">
      {chips.map((chip) => (
        <span
          key={chip}
          className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700"
        >
          {chip}
        </span>
      ))}
    </div>
  )
}
