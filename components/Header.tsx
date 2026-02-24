'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import ProfileKeyManager from '@/components/profile/ProfileKeyManager'

const navItems = [
  { href: '/playgrounds', label: 'Playgrounds', ariaLabel: 'Navigate to interactive playgrounds' },
  { href: '/playgrounds/production-readiness', label: 'Production Readiness', ariaLabel: 'Navigate to production readiness hub', badge: 'NEW' },
  { href: '/vault', label: 'File Vault', ariaLabel: 'Navigate to secure file vault' },
  { href: '/skill-tree', label: 'Skill Tree', ariaLabel: 'Navigate to the skill tree' },
  { href: '/articles', label: 'Articles', ariaLabel: 'Navigate to articles' },
  { href: '/about', label: 'About', ariaLabel: 'Navigate to about page' },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm" aria-label="Primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-slate-900 transition hover:text-[var(--accent)]"
              aria-label="Digital Platform Architect home"
              onClick={closeMobileMenu}
            >
              <span className="hidden sm:inline">Digital Platform Architect</span>{' '}
              <span className="hidden sm:inline text-[var(--accent)]">Platform</span>
              <span className="inline sm:hidden">DPA</span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href
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
                    <span className="absolute -top-2 -right-8 rounded border border-blue-200 bg-blue-50 px-1.5 py-0.5 text-xs font-bold text-blue-700">
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
              const isActive = pathname === item.href
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
