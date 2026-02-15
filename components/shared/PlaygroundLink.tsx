'use client'

import Link from 'next/link'

interface PlaygroundLinkProps {
  href: string
  title: string
  description: string
  category?: 'messaging' | 'production' | 'architecture' | 'skill'
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  icon?: string
  className?: string
}

export function PlaygroundLink({
  href,
  title,
  description,
  category = 'production',
  difficulty,
  icon = '🎮',
  className = ''
}: PlaygroundLinkProps) {
  const categoryColors = {
    messaging: 'border-purple-200 bg-purple-50 hover:bg-purple-100',
    production: 'border-green-200 bg-green-50 hover:bg-green-100',
    architecture: 'border-blue-200 bg-blue-50 hover:bg-blue-100',
    skill: 'border-orange-200 bg-orange-50 hover:bg-orange-100'
  }

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700'
  }

  return (
    <Link
      href={href}
      className={`block border-2 rounded-lg p-6 transition hover:shadow-lg group ${categoryColors[category]} ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl flex-shrink-0 group-hover:scale-110 transition">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition">
              {title}
            </h3>
            {difficulty && (
              <span className={`text-xs px-2 py-1 rounded font-medium ${difficultyColors[difficulty]}`}>
                {difficulty}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-700 mb-3">
            {description}
          </p>
          <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
            <span>Try Interactive Playground</span>
            <span className="group-hover:translate-x-1 transition">→</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
