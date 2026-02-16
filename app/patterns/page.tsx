import type { Metadata } from 'next'
import { getAllPatterns, getPatternCategories } from '@/lib/patterns'
import { getPreviewText } from '@/lib/markdown'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Architecture Patterns',
  description: 'Explore 65+ proven architectural patterns including event-driven, data architecture, security, and distributed systems. Each with detailed explanations and interactive examples.',
  openGraph: {
    title: 'Architecture Patterns | Digital Platform Architect',
    description: 'Explore 65+ proven architectural patterns with detailed explanations and interactive examples.',
  },
}

export default function PatternsPage() {
  const patterns = getAllPatterns()
  const categories = getPatternCategories()

  // Group patterns by category
  const patternsByCategory = patterns.reduce((acc, pattern) => {
    if (!acc[pattern.category]) {
      acc[pattern.category] = []
    }
    acc[pattern.category].push(pattern)
    return acc
  }, {} as Record<string, typeof patterns>)

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Architecture Patterns</h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            Explore {patterns.length} proven architectural patterns. Each pattern includes detailed explanations,
            use cases, and trade-offs to help you make informed design decisions.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="text-3xl font-bold text-blue-600">{patterns.length}</div>
            <div className="text-sm text-slate-600">Total Patterns</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="text-3xl font-bold text-green-600">{categories.length}</div>
            <div className="text-sm text-slate-600">Categories</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <div className="text-3xl font-bold text-purple-600">3</div>
            <div className="text-sm text-slate-600">Interactive Playgrounds</div>
          </div>
        </div>

        {/* Patterns by Category */}
        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span>{getCategoryIcon(category)}</span>
              <span>{category}</span>
              <span className="text-sm font-normal text-slate-500">
                ({patternsByCategory[category].length} patterns)
              </span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {patternsByCategory[category].map((pattern) => (
                <Link
                  key={pattern.slug}
                  href={`/patterns/${pattern.slug}`}
                  className="border border-slate-200 rounded-lg p-6 hover:shadow-lg hover:border-blue-300 transition bg-white group"
                >
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600">
                    {pattern.title}
                  </h3>
                  <div className="text-sm text-slate-600 mb-3">
                    {getPreviewText(pattern.content, 150)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-1 bg-slate-100 rounded">
                      {pattern.category}
                    </span>
                    <span className="text-blue-600 text-sm font-medium group-hover:underline">
                      Learn More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'Event-Driven': '⚡',
    'Security': '🔒',
    'Data Architecture': '🗄️',
    'Distributed Systems': '🌐',
    'Structural': '🏗️',
    'General': '📋',
  }
  return icons[category] || '📋'
}
