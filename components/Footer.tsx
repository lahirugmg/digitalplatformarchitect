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
              Learn enterprise architecture through interactive diagrams, patterns, and natural progress tracking.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/blocks" className="text-slate-600 hover:text-slate-900">
              Blocks
            </Link>
            <Link href="/patterns" className="text-slate-600 hover:text-slate-900">
              Patterns
            </Link>
            <Link href="/playgrounds" className="text-slate-600 hover:text-slate-900">
              Playgrounds
            </Link>
            <Link href="/progress" className="text-slate-600 hover:text-slate-900">
              Progress
            </Link>
            <Link href="/articles" className="text-slate-600 hover:text-slate-900">
              Articles
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
