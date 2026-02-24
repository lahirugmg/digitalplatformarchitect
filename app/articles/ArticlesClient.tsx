'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Fuse from 'fuse.js'
import { Search, X, Star } from 'lucide-react'
import { Article } from '@/lib/articles'
import { getPreviewText } from '@/lib/markdown'

interface ArticlesClientProps {
  articles: Article[]
  allTags: string[]
}

export default function ArticlesClient({ articles, allTags }: ArticlesClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  const fuse = useMemo(
    () =>
      new Fuse(articles, {
        keys: ['title', 'summary', 'content', 'tags'],
        threshold: 0.3,
        includeScore: true,
      }),
    [articles],
  )

  const filteredArticles = useMemo(() => {
    let result = articles

    if (searchQuery.trim()) {
      result = fuse.search(searchQuery).map((entry) => entry.item)
    }

    if (selectedTag) {
      result = result.filter((article) => article.tags?.includes(selectedTag))
    }

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
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-slate-900">Articles</h1>
          <p className="max-w-3xl text-xl text-slate-600">
            Deep dives on platform architecture strategy, implementation, and operations.
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles by title, summary, or tags..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-10 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              aria-label="Search articles"
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

          <div className="flex flex-col gap-4 sm:flex-row">
            {allTags.length > 0 && (
              <div className="flex-1">
                <label htmlFor="tag-filter" className="mb-2 block text-sm font-medium text-slate-700">
                  Filter by tag:
                </label>
                <select
                  id="tag-filter"
                  value={selectedTag || ''}
                  onChange={(event) => setSelectedTag(event.target.value || null)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All tags</option>
                  {allTags.map((tag) => {
                    const count = articles.filter((article) => article.tags?.includes(tag)).length
                    return (
                      <option key={tag} value={tag}>
                        {tag} ({count})
                      </option>
                    )
                  })}
                </select>
              </div>
            )}

            <div className="flex items-end">
              <button
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  showFeaturedOnly ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Star className={`h-4 w-4 ${showFeaturedOnly ? 'fill-current' : ''}`} />
                Featured Only
              </button>
            </div>
          </div>

          {(searchQuery || selectedTag || showFeaturedOnly) && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-600">
                Showing {filteredArticles.length} of {articles.length} articles
              </span>
              <button onClick={clearFilters} className="inline-flex items-center gap-1 font-medium text-blue-700 hover:text-blue-800">
                <X className="h-4 w-4" />
                Clear all filters
              </button>
            </div>
          )}
        </div>

        <div className="mb-12 grid grid-cols-3 gap-6">
          <div className="card-standard p-6">
            <div className="text-3xl font-bold text-slate-900">{filteredArticles.length}</div>
            <div className="text-sm text-slate-600">{searchQuery || selectedTag || showFeaturedOnly ? 'Filtered Articles' : 'Total Articles'}</div>
          </div>
          <div className="card-standard p-6">
            <div className="text-3xl font-bold text-slate-900">{allTags.length}</div>
            <div className="text-sm text-slate-600">Topics</div>
          </div>
          <div className="card-standard p-6">
            <div className="text-3xl font-bold text-slate-900">{articles.filter((article) => article.featured).length}</div>
            <div className="text-sm text-slate-600">Featured Articles</div>
          </div>
        </div>

        {filteredArticles.length === 0 && (
          <div className="py-12 text-center">
            <p className="mb-4 text-xl text-slate-600">No articles found matching your criteria.</p>
            <button onClick={clearFilters} className="btn-primary">
              Clear filters
            </button>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {filteredArticles.map((article) => (
            <Link key={article.slug} href={`/articles/${article.slug}`} className="card-interactive group p-6">
              <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
                <span>{article.publishedAt || 'Draft'}</span>
                {article.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2 py-1 text-blue-700">
                    <Star className="h-3 w-3 fill-current" />
                    Featured
                  </span>
                )}
              </div>
              <h2 className="mb-2 text-2xl font-bold text-slate-900 group-hover:text-blue-700">{article.title}</h2>
              <p className="mb-4 text-sm text-slate-600">{article.summary || getPreviewText(article.content, 180)}</p>
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {article.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className={`rounded px-2 py-1 text-xs transition ${
                        selectedTag === tag ? 'bg-blue-50 text-blue-700 font-medium' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                  {article.tags.length > 4 && (
                    <span className="rounded bg-slate-50 px-2 py-1 text-xs text-slate-500">
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
