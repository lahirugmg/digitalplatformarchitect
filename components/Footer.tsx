import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-[var(--surface-1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="text-lg font-semibold text-slate-900">
              Digital Platform Architect <span className="text-[var(--accent)]">Platform</span>
            </div>
            <p className="text-sm text-slate-600 mt-2 max-w-md">
              System design from functional and non-functional requirements: design, validate, and reference
              blueprints.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/playgrounds/system-design-framework" className="text-slate-600 hover:text-slate-900">
              Design
            </Link>
            <Link href="/playgrounds/production-readiness" className="text-slate-600 hover:text-slate-900">
              Validate
            </Link>
            <Link href="/blueprints" className="text-slate-600 hover:text-slate-900">
              Blueprints
            </Link>
            <Link href="/playgrounds" className="text-slate-600 hover:text-slate-900">
              Playgrounds
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-slate-900">
              About
            </Link>
          </div>
        </div>
        <div className="mt-8 text-xs text-slate-500">
          © 2026 Digital Platform Architect. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
