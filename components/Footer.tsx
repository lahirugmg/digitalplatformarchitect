import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-[var(--surface-1)]">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="text-xl font-semibold text-slate-900">
              Digital Platform Architect
            </div>
            <p className="text-base leading-7 text-slate-600 mt-2 max-w-2xl">
              System design from functional and non-functional requirements: design, validate, and reference
              blueprints.
            </p>
          </div>
          <div className="flex flex-wrap gap-5 text-base">
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
        <div className="mt-8 text-sm text-slate-500">
          © 2026 Digital Platform Architect. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
