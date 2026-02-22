'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Fuse from 'fuse.js'
import { Pattern } from '@/lib/patterns'
import { getPreviewText } from '@/lib/markdown'
import { Search, X } from 'lucide-react'

interface PatternsClientProps {
  patterns: Pattern[]
  categories: string[]
}

export default function PatternsClient({ patterns, categories }: PatternsClientProps) {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Handle URL parameters on mount
  useEffect(() => {
    // Handle ?category=security parameter
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      // Normalize category names (e.g., "security" -> "Security", "data" -> "Data Architecture")
      const normalizedCategory = categories.find(
        (cat) => cat.toLowerCase().includes(categoryParam.toLowerCase())
      )
      if (normalizedCategory) {
        setSelectedCategory(normalizedCategory)
      }
    }

    // Handle ?filter=cost parameter (search for cost-related patterns)
    const filterParam = searchParams.get('filter')
    if (filterParam) {
      setSearchQuery(filterParam)
    }
  }, [searchParams, categories])

  // Configure Fuse.js for fuzzy search
  const fuse = useMemo(
    () =>
      new Fuse(patterns, {
        keys: ['title', 'keywords', 'content'],
        threshold: 0.3,
        includeScore: true,
      }),
    [patterns]
  )

  // Filter and search patterns
  const filteredPatterns = useMemo(() => {
    let result = patterns

    // Apply search
    if (searchQuery.trim()) {
      const fuseResults = fuse.search(searchQuery)
      result = fuseResults.map((r) => r.item)
    }

    // Apply category filter
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory)
    }

    return result
  }, [patterns, fuse, searchQuery, selectedCategory])

  // Group filtered patterns by category
  const patternsByCategory = useMemo(() => {
    return filteredPatterns.reduce((acc, pattern) => {
      if (!acc[pattern.category]) {
        acc[pattern.category] = []
      }
      acc[pattern.category].push(pattern)
      return acc
    }, {} as Record<string, Pattern[]>)
  }, [filteredPatterns])

  const displayedCategories = useMemo(() => {
    return selectedCategory
      ? [selectedCategory]
      : categories.filter((cat) => patternsByCategory[cat]?.length > 0)
  }, [selectedCategory, categories, patternsByCategory])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory(null)
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Architecture Patterns</h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            Explore {patterns.length} proven architectural patterns. Each pattern includes detailed explanations,
            use cases, and trade-offs to help you make informed design decisions.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search patterns by title, keywords, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              aria-label="Search patterns"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-slate-700">Filter by category:</span>
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                selectedCategory === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All ({patterns.length})
            </button>
            {categories.map((category) => {
              const count = patterns.filter((p) => p.category === category).length
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{getCategoryIcon(category)}</span>
                  <span>{category}</span>
                  <span className="opacity-75">({count})</span>
                </button>
              )
            })}
          </div>

          {/* Active Filters Summary */}
          {(searchQuery || selectedCategory) && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-600">
                Showing {filteredPatterns.length} of {patterns.length} patterns
              </span>
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="text-3xl font-bold text-blue-600">{filteredPatterns.length}</div>
            <div className="text-sm text-slate-600">
              {searchQuery || selectedCategory ? 'Filtered Patterns' : 'Total Patterns'}
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="text-3xl font-bold text-green-600">{displayedCategories.length}</div>
            <div className="text-sm text-slate-600">
              {selectedCategory ? 'Selected Category' : 'Categories'}
            </div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <div className="text-3xl font-bold text-purple-600">3</div>
            <div className="text-sm text-slate-600">Interactive Playgrounds</div>
          </div>
        </div>

        {/* No Results */}
        {filteredPatterns.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-slate-600 mb-4">No patterns found matching your criteria</p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Patterns by Category */}
        {displayedCategories.map((category) => (
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
