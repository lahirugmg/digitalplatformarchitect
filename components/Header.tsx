'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navItems = [
  { href: '/playgrounds', label: 'Playgrounds', ariaLabel: 'Navigate to interactive playgrounds' },
  { href: '/playgrounds/production-readiness', label: 'Production Readiness', ariaLabel: 'Navigate to production readiness hub', badge: 'NEW' },
  { href: '/skill-tree', label: 'Skill Tree', ariaLabel: 'Navigate to the skill tree' },
  { href: '/articles', label: 'Articles', ariaLabel: 'Navigate to articles' },
  { href: '/about', label: 'About', ariaLabel: 'Navigate to about page' },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50" aria-label="Primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-blue-600 hover:text-blue-700 transition"
              aria-label="Digital Platform Architect home"
              onClick={closeMobileMenu}
            >
              <span className="hidden sm:inline">Digital Platform Architect</span>
              <span className="inline sm:hidden">DPA</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
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

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
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
                      : 'text-slate-700 hover:bg-slate-100 hover:text-blue-600'
                  }`}
                >
                  <span className="flex items-center justify-between">
                    {item.label}
                    {'badge' in item && item.badge && (
                      <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded font-bold ml-2">
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
