'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/blocks', label: 'Blocks', ariaLabel: 'Navigate to building blocks' },
  { href: '/patterns', label: 'Patterns', ariaLabel: 'Navigate to architecture patterns' },
  { href: '/playgrounds', label: 'Playgrounds', ariaLabel: 'Navigate to interactive playgrounds' },
  { href: '/playgrounds/production-readiness', label: 'Production Readiness', ariaLabel: 'Navigate to production readiness hub', badge: 'NEW' },
  { href: '/skill-tree', label: 'Skill Tree', ariaLabel: 'Navigate to the skill tree' },
  { href: '/articles', label: 'Articles', ariaLabel: 'Navigate to articles' },
  { href: '/about', label: 'About', ariaLabel: 'Navigate to about page' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50" aria-label="Primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-blue-600"
              aria-label="Digital Platform Architect home"
            >
              Digital Platform Architect
            </Link>
          </div>
          <div className="flex space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.ariaLabel}
                  aria-current={isActive ? 'page' : undefined}
                  className={`font-medium transition relative ${
                    isActive ? 'text-blue-700' : 'text-slate-700 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                  {'badge' in item && item.badge && (
                    <span className="absolute -top-2 -right-8 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
