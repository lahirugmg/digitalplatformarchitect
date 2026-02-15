'use client'

import Link from 'next/link'

interface NextStep {
  title: string
  description: string
  href: string
  icon?: string
  badge?: string
}

interface NextStepsProps {
  title?: string
  steps: NextStep[]
  className?: string
}

export function NextSteps({
  title = 'Next Steps',
  steps,
  className = ''
}: NextStepsProps) {
  return (
    <div className={`bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border-2 border-blue-200 ${className}`}>
      <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <span>🎯</span>
        {title}
      </h3>
      <div className="space-y-3">
        {steps.map((step, index) => (
          <Link
            key={index}
            href={step.href}
            className="block bg-white rounded-lg p-4 border border-slate-200 hover:border-blue-400 hover:shadow-md transition group"
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl flex-shrink-0">
                {step.icon || '→'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition">
                    {step.title}
                  </h4>
                  {step.badge && (
                    <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded font-bold">
                      {step.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600">
                  {step.description}
                </p>
              </div>
              <div className="text-blue-600 group-hover:translate-x-1 transition">
                →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
