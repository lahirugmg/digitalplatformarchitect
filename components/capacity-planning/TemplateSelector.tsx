'use client'

import { getCapacityTemplates } from '@/lib/capacity-planning/templates'
import type { CapacityTemplateId } from '@/lib/capacity-planning/types'

interface TemplateSelectorProps {
  activeTemplateId: CapacityTemplateId
  onSelect: (templateId: CapacityTemplateId) => void
}

export function TemplateSelector({ activeTemplateId, onSelect }: TemplateSelectorProps) {
  const templates = getCapacityTemplates()

  return (
    <section className="card-standard">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Application templates</h2>
          <p className="mt-1 text-sm text-slate-600">
            Choose a common workload profile to start with realistic defaults.
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {templates.map((template) => {
          const isActive = template.id === activeTemplateId
          return (
            <button
              key={template.id}
              type="button"
              onClick={() => onSelect(template.id)}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                isActive
                  ? 'border-blue-300 bg-blue-50 text-blue-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              {template.title}
            </button>
          )
        })}

        <button
          type="button"
          onClick={() => onSelect('custom')}
          className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
            activeTemplateId === 'custom'
              ? 'border-blue-300 bg-blue-50 text-blue-700'
              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
          }`}
        >
          Custom
        </button>
      </div>
    </section>
  )
}

