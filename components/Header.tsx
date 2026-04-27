'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import ProfileKeyManager from '@/components/profile/ProfileKeyManager'

const navItems = [
  {
    href: '/playgrounds/system-design-framework',
    label: 'Design',
    ariaLabel: 'System design: functional and non-functional requirements',
    isActive: (p: string) => p.startsWith('/playgrounds/system-design-framework'),
  },
  {
    href: '/playgrounds/production-readiness',
    label: 'Validate',
    ariaLabel: 'Validate production readiness and NFRs',
    badge: 'NFR' as const,
    isActive: (p: string) => p.startsWith('/playgrounds/production-readiness'),
  },
  {
    href: '/blueprints',
    label: 'Blueprints',
    ariaLabel: 'Browse system design blueprints',
    isActive: (p: string) => p.startsWith('/blueprints'),
  },
  { href: '/about', label: 'About', ariaLabel: 'About this site', isActive: (p: string) => p === '/about' },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm" aria-label="Primary">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-slate-900 transition hover:text-[var(--accent)]"
              aria-label="Digital Platform Architect home"
              onClick={closeMobileMenu}
            >
              <span className="hidden sm:inline">Digital Platform Architect</span>
              <span className="inline sm:hidden">DPA</span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-10">
            {navItems.map((item) => {
              const isActive = item.isActive(pathname)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.ariaLabel}
                  aria-current={isActive ? 'page' : undefined}
                  className={`font-medium transition relative ${
                    isActive ? 'text-[var(--accent)]' : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                  {'badge' in item && item.badge && (
                    <span className="absolute -top-2 -right-6 rounded border border-blue-200 bg-blue-50 px-1.5 py-0.5 text-xs font-bold text-blue-700">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <ProfileKeyManager />

            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-slate-200 bg-white"
        >
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const isActive = item.isActive(pathname)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.ariaLabel}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={closeMobileMenu}
                  className={`block px-3 py-2 rounded-lg font-medium transition ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span className="flex items-center justify-between">
                    {item.label}
                    {'badge' in item && item.badge && (
                      <span className="ml-2 rounded border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-700">
                        {item.badge}
                      </span>
                    )}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
