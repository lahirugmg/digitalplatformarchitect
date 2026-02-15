'use client'

import { CHECKLIST_ITEMS, getCategoryColor } from '@/lib/operational-sympathy'

export function KeyElementsGrid() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-6">
        Nine Key Elements
      </h2>
      <p className="text-lg text-slate-600 mb-8 max-w-3xl">
        Each element represents a critical operational concern. The weight indicates its relative
        importance in determining production readiness.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CHECKLIST_ITEMS.map((item, index) => {
          const categoryColor = getCategoryColor(item.category)

          // Color mapping for Tailwind classes
          const colorClasses: Record<string, { border: string; bg: string; text: string; badge: string }> = {
            blue: {
              border: 'border-blue-200',
              bg: 'bg-blue-50',
              text: 'text-blue-900',
              badge: 'bg-blue-100 text-blue-700'
            },
            purple: {
              border: 'border-purple-200',
              bg: 'bg-purple-50',
              text: 'text-purple-900',
              badge: 'bg-purple-100 text-purple-700'
            },
            cyan: {
              border: 'border-cyan-200',
              bg: 'bg-cyan-50',
              text: 'text-cyan-900',
              badge: 'bg-cyan-100 text-cyan-700'
            },
            green: {
              border: 'border-green-200',
              bg: 'bg-green-50',
              text: 'text-green-900',
              badge: 'bg-green-100 text-green-700'
            },
            red: {
              border: 'border-red-200',
              bg: 'bg-red-50',
              text: 'text-red-900',
              badge: 'bg-red-100 text-red-700'
            },
            orange: {
              border: 'border-orange-200',
              bg: 'bg-orange-50',
              text: 'text-orange-900',
              badge: 'bg-orange-100 text-orange-700'
            },
            pink: {
              border: 'border-pink-200',
              bg: 'bg-pink-50',
              text: 'text-pink-900',
              badge: 'bg-pink-100 text-pink-700'
            },
            slate: {
              border: 'border-slate-200',
              bg: 'bg-slate-50',
              text: 'text-slate-900',
              badge: 'bg-slate-100 text-slate-700'
            },
          }

          const colors = colorClasses[categoryColor] || colorClasses.slate

          return (
            <div
              key={item.id}
              className={`border-2 ${colors.border} ${colors.bg} rounded-lg p-6 hover:shadow-lg transition group`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-slate-400">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <span className={`${colors.badge} text-xs px-2 py-1 rounded font-semibold`}>
                      {item.weight}% weight
                    </span>
                  </div>
                  <h3 className={`text-xl font-bold ${colors.text} mb-2`}>
                    {item.element}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                {item.guidance}
              </p>

              <div className="flex items-center gap-2">
                <span className={`${colors.badge} text-xs px-2 py-1 rounded font-medium capitalize`}>
                  {item.category}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Category Legend */}
      <div className="mt-8 bg-slate-50 rounded-lg p-6 border border-slate-200">
        <h3 className="text-sm font-bold text-slate-700 mb-3">Categories:</h3>
        <div className="flex flex-wrap gap-3">
          {['design', 'reliability', 'observability', 'operations', 'security', 'cost', 'culture'].map(cat => {
            const color = getCategoryColor(cat)
            const colorClasses: Record<string, string> = {
              blue: 'bg-blue-100 text-blue-700',
              purple: 'bg-purple-100 text-purple-700',
              cyan: 'bg-cyan-100 text-cyan-700',
              green: 'bg-green-100 text-green-700',
              red: 'bg-red-100 text-red-700',
              orange: 'bg-orange-100 text-orange-700',
              pink: 'bg-pink-100 text-pink-700',
              slate: 'bg-slate-100 text-slate-700',
            }
            return (
              <span
                key={cat}
                className={`${colorClasses[color] || colorClasses.slate} text-xs px-3 py-1.5 rounded-full font-medium capitalize`}
              >
                {cat}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
