import Link from 'next/link'

export default function PatternNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="max-w-lg text-center bg-white border border-slate-200 rounded-2xl shadow-lg p-10">
        <div className="text-5xl mb-4">🧭</div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Pattern Not Found</h1>
        <p className="text-slate-600 mb-6">
          We could not find that pattern. It may have been renamed, removed, or is still in draft.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/patterns"
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Browse patterns
          </Link>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:border-slate-400 hover:text-slate-900 transition"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
