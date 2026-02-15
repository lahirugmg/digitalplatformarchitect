'use client'

import Link from 'next/link'

interface TheoryLinkProps {
  href: string
  title: string
  description: string
  type?: 'pattern' | 'component' | 'article' | 'blueprint'
  readTime?: string
  icon?: string
  className?: string
}

export function TheoryLink({
  href,
  title,
  description,
  type = 'article',
  readTime,
  icon = '📚',
  className = ''
}: TheoryLinkProps) {
  const typeColors = {
    pattern: 'border-blue-200 bg-blue-50 hover:bg-blue-100',
    component: 'border-purple-200 bg-purple-50 hover:bg-purple-100',
    article: 'border-cyan-200 bg-cyan-50 hover:bg-cyan-100',
    blueprint: 'border-indigo-200 bg-indigo-50 hover:bg-indigo-100'
  }

  const typeLabels = {
    pattern: 'Pattern',
    component: 'Building Block',
    article: 'Article',
    blueprint: 'Blueprint'
  }

  return (
    <Link
      href={href}
      className={`block border-2 rounded-lg p-6 transition hover:shadow-lg group ${typeColors[type]} ${className}`}
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
            <span className="text-xs px-2 py-1 rounded font-medium bg-slate-100 text-slate-700">
              {typeLabels[type]}
            </span>
            {readTime && (
              <span className="text-xs text-slate-500">
                {readTime}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-700 mb-3">
            {description}
          </p>
          <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
            <span>Learn the Concepts</span>
            <span className="group-hover:translate-x-1 transition">→</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
