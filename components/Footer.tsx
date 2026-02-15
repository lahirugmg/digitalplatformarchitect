import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="text-lg font-semibold text-slate-900">Digital Platform Architect</div>
            <p className="text-sm text-slate-600 mt-2 max-w-md">
              Learn enterprise architecture through interactive diagrams, patterns, and guided skill paths.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/blocks" className="text-slate-600 hover:text-blue-600">
              Blocks
            </Link>
            <Link href="/patterns" className="text-slate-600 hover:text-blue-600">
              Patterns
            </Link>
            <Link href="/playgrounds" className="text-slate-600 hover:text-blue-600">
              Playgrounds
            </Link>
            <Link href="/skill-tree" className="text-slate-600 hover:text-blue-600">
              Skill Tree
            </Link>
            <Link href="/articles" className="text-slate-600 hover:text-blue-600">
              Articles
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-blue-600">
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
