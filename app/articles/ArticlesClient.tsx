'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Fuse from 'fuse.js'
import { Article } from '@/lib/articles'
import { getPreviewText } from '@/lib/markdown'
import { Search, X, Star } from 'lucide-react'

interface ArticlesClientProps {
  articles: Article[]
  allTags: string[]
}

export default function ArticlesClient({ articles, allTags }: ArticlesClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  // Configure Fuse.js for fuzzy search
  const fuse = useMemo(
    () =>
      new Fuse(articles, {
        keys: ['title', 'summary', 'content', 'tags'],
        threshold: 0.3,
        includeScore: true,
      }),
    [articles]
  )

  // Filter and search articles
  const filteredArticles = useMemo(() => {
    let result = articles

    // Apply search
    if (searchQuery.trim()) {
      const fuseResults = fuse.search(searchQuery)
      result = fuseResults.map((r) => r.item)
    }

    // Apply tag filter
    if (selectedTag) {
      result = result.filter((article) => article.tags?.includes(selectedTag))
    }

    // Apply featured filter
    if (showFeaturedOnly) {
      result = result.filter((article) => article.featured)
    }

    return result
  }, [articles, fuse, searchQuery, selectedTag, showFeaturedOnly])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedTag(null)
    setShowFeaturedOnly(false)
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Articles</h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            Deep dives on platform architecture, strategy, and implementation.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles by title, summary, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              aria-label="Search articles"
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

          {/* Tag Filters and Featured Toggle */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Tags */}
            {allTags.length > 0 && (
              <div className="flex-1">
                <label htmlFor="tag-filter" className="block text-sm font-medium text-slate-700 mb-2">
                  Filter by tag:
                </label>
                <select
                  id="tag-filter"
                  value={selectedTag || ''}
                  onChange={(e) => setSelectedTag(e.target.value || null)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="">All tags</option>
                  {allTags.map((tag) => {
                    const count = articles.filter((a) => a.tags?.includes(tag)).length
                    return (
                      <option key={tag} value={tag}>
                        {tag} ({count})
                      </option>
                    )
                  })}
                </select>
              </div>
            )}

            {/* Featured Toggle */}
            <div className="flex items-end">
              <button
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                  showFeaturedOnly
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Star className={`w-4 h-4 ${showFeaturedOnly ? 'fill-current' : ''}`} />
                Featured Only
              </button>
            </div>
          </div>

          {/* Active Filters Summary */}
          {(searchQuery || selectedTag || showFeaturedOnly) && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-600">
                Showing {filteredArticles.length} of {articles.length} articles
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
            <div className="text-3xl font-bold text-blue-600">{filteredArticles.length}</div>
            <div className="text-sm text-slate-600">
              {searchQuery || selectedTag || showFeaturedOnly ? 'Filtered Articles' : 'Total Articles'}
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="text-3xl font-bold text-green-600">{allTags.length}</div>
            <div className="text-sm text-slate-600">Topics</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <div className="text-3xl font-bold text-purple-600">
              {articles.filter((a) => a.featured).length}
            </div>
            <div className="text-sm text-slate-600">Featured Articles</div>
          </div>
        </div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-slate-600 mb-4">No articles found matching your criteria</p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="border border-slate-200 rounded-lg p-6 hover:shadow-lg hover:border-blue-300 transition bg-white group"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                <span>{article.publishedAt || 'Draft'}</span>
                {article.featured && (
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Featured
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold mb-2 text-slate-900 group-hover:text-blue-600">
                {article.title}
              </h2>
              <p className="text-sm text-slate-600 mb-4">
                {article.summary || getPreviewText(article.content, 180)}
              </p>
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {article.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2 py-1 rounded transition ${
                        selectedTag === tag
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                  {article.tags.length > 4 && (
                    <span className="text-xs px-2 py-1 bg-slate-50 text-slate-500 rounded">
                      +{article.tags.length - 4} more
                    </span>
                  )}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
