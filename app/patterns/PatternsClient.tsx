'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Fuse from 'fuse.js'
import { Search, X } from 'lucide-react'
import { Pattern } from '@/lib/patterns'
import { getPreviewText } from '@/lib/markdown'

interface PatternsClientProps {
  patterns: Pattern[]
  categories: string[]
}

export default function PatternsClient({ patterns, categories }: PatternsClientProps) {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      const normalizedCategory = categories.find((cat) => cat.toLowerCase().includes(categoryParam.toLowerCase()))
      if (normalizedCategory) {
        setSelectedCategory(normalizedCategory)
      }
    }

    const filterParam = searchParams.get('filter')
    if (filterParam) {
      setSearchQuery(filterParam)
    }
  }, [searchParams, categories])

  const fuse = useMemo(
    () =>
      new Fuse(patterns, {
        keys: ['title', 'keywords', 'content'],
        threshold: 0.3,
        includeScore: true,
      }),
    [patterns],
  )

  const filteredPatterns = useMemo(() => {
    let result = patterns

    if (searchQuery.trim()) {
      result = fuse.search(searchQuery).map((entry) => entry.item)
    }

    if (selectedCategory) {
      result = result.filter((pattern) => pattern.category === selectedCategory)
    }

    return result
  }, [fuse, patterns, searchQuery, selectedCategory])

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
    return selectedCategory ? [selectedCategory] : categories.filter((cat) => patternsByCategory[cat]?.length > 0)
  }, [categories, patternsByCategory, selectedCategory])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory(null)
  }

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-slate-900">Architecture Patterns</h1>
          <p className="max-w-3xl text-xl text-slate-600">
            Explore {patterns.length} proven patterns with rationale, trade-offs, and implementation context.
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search patterns by title, keywords, or content..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-10 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              aria-label="Search patterns"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-slate-700">Filter by category:</span>
            <button
              onClick={() => setSelectedCategory(null)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                selectedCategory === null ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All ({patterns.length})
            </button>
            {categories.map((category) => {
              const count = patterns.filter((pattern) => pattern.category === category).length
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {category} ({count})
                </button>
              )
            })}
          </div>

          {(searchQuery || selectedCategory) && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-600">
                Showing {filteredPatterns.length} of {patterns.length} patterns
              </span>
              <button onClick={clearFilters} className="flex items-center gap-1 font-medium text-blue-700 hover:text-blue-800">
                <X className="h-4 w-4" />
                Clear all filters
              </button>
            </div>
          )}
        </div>

        <div className="mb-12 grid grid-cols-3 gap-6">
          <div className="card-standard p-6">
            <div className="text-3xl font-bold text-slate-900">{filteredPatterns.length}</div>
            <div className="text-sm text-slate-600">{searchQuery || selectedCategory ? 'Filtered Patterns' : 'Total Patterns'}</div>
          </div>
          <div className="card-standard p-6">
            <div className="text-3xl font-bold text-slate-900">{displayedCategories.length}</div>
            <div className="text-sm text-slate-600">{selectedCategory ? 'Selected Category' : 'Categories'}</div>
          </div>
          <div className="card-standard p-6">
            <div className="text-3xl font-bold text-slate-900">3</div>
            <div className="text-sm text-slate-600">Interactive Playgrounds</div>
          </div>
        </div>

        {filteredPatterns.length === 0 && (
          <div className="py-12 text-center">
            <p className="mb-4 text-xl text-slate-600">No patterns found matching your criteria.</p>
            <button onClick={clearFilters} className="btn-primary">
              Clear filters
            </button>
          </div>
        )}

        {displayedCategories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              {category}{' '}
              <span className="text-sm font-normal text-slate-500">({patternsByCategory[category].length} patterns)</span>
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {patternsByCategory[category].map((pattern) => (
                <Link key={pattern.slug} href={`/patterns/${pattern.slug}`} className="card-interactive group p-6">
                  <h3 className="mb-2 text-xl font-bold text-slate-900 group-hover:text-blue-700">{pattern.title}</h3>
                  <div className="mb-3 text-sm text-slate-600">{getPreviewText(pattern.content, 150)}</div>
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">{pattern.category}</span>
                    <span className="text-sm font-medium text-blue-700 group-hover:underline">Learn More →</span>
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
