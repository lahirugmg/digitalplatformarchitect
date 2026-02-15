'use client'

import { useState } from 'react'
import { architecturalPatterns, getPatternCategories, type PatternNode } from '@/lib/pattern-compatibility'

interface PatternLibraryProps {
  onPatternSelect: (pattern: PatternNode) => void
  selectedPatternIds: string[]
  highlightedPattern: string | null
}

export default function PatternLibrary({
  onPatternSelect,
  selectedPatternIds,
  highlightedPattern
}: PatternLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['Event-Driven', 'Integration', 'Structural'])
  )

  const categories = getPatternCategories()

  const filteredPatterns = architecturalPatterns.filter(pattern => {
    const matchesSearch = pattern.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pattern.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pattern.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = !selectedCategory || pattern.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(category)) {
      newExpanded.delete(category)
    } else {
      newExpanded.add(category)
    }
    setExpandedCategories(newExpanded)
  }

  const patternsByCategory = categories.map(category => ({
    category,
    patterns: filteredPatterns.filter(p => p.category === category)
  })).filter(group => group.patterns.length > 0)

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50">
        <h3 className="font-bold text-sm uppercase text-slate-500 mb-3">Pattern Library</h3>

        {/* Search */}
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="Search patterns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 pl-9 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-2.5 w-4 h-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-2 py-1 rounded text-xs font-medium transition ${
              selectedCategory === null
                ? 'bg-purple-600 text-white'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-2 py-1 rounded text-xs font-medium transition ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Pattern List */}
      <div className="flex-1 overflow-y-auto p-4">
        {patternsByCategory.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <p className="text-sm">No patterns found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {patternsByCategory.map(({ category, patterns }) => (
              <div key={category}>
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between mb-2 text-sm font-semibold text-slate-700 hover:text-purple-600 transition"
                >
                  <span>{category}</span>
                  <span className="text-slate-400">
                    {expandedCategories.has(category) ? '▼' : '▶'}
                  </span>
                </button>

                {expandedCategories.has(category) && (
                  <div className="space-y-2 ml-2">
                    {patterns.map(pattern => {
                      const isSelected = selectedPatternIds.includes(pattern.id)
                      const isHighlighted = highlightedPattern === pattern.id

                      return (
                        <div
                          key={pattern.id}
                          onClick={() => !isSelected && onPatternSelect(pattern)}
                          className={`
                            border rounded-lg p-3 cursor-pointer transition-all
                            ${isSelected
                              ? 'bg-purple-50 border-purple-300 opacity-60 cursor-not-allowed'
                              : isHighlighted
                              ? 'bg-yellow-50 border-yellow-400 shadow-md'
                              : 'bg-white border-slate-200 hover:border-purple-400 hover:shadow-md'
                            }
                          `}
                        >
                          <div className="flex items-start gap-2 mb-2">
                            <span className="text-2xl">{pattern.icon}</span>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-sm mb-1 flex items-center gap-2">
                                {pattern.title}
                                {isSelected && (
                                  <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded">
                                    Added
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-600 leading-relaxed">
                                {pattern.description}
                              </p>
                            </div>
                          </div>

                          {/* Tags */}
                          {pattern.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {pattern.tags.map(tag => (
                                <span
                                  key={tag}
                                  className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Characteristics */}
                          <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
                            {pattern.characteristics.coupling && (
                              <div className="flex items-center gap-1">
                                <span className="text-slate-500">Coupling:</span>
                                <span className={`font-medium ${
                                  pattern.characteristics.coupling === 'loose' ? 'text-green-600' : 'text-amber-600'
                                }`}>
                                  {pattern.characteristics.coupling}
                                </span>
                              </div>
                            )}
                            {pattern.characteristics.complexity && (
                              <div className="flex items-center gap-1">
                                <span className="text-slate-500">Complexity:</span>
                                <span className={`font-medium ${
                                  pattern.characteristics.complexity === 'low' ? 'text-green-600' :
                                  pattern.characteristics.complexity === 'medium' ? 'text-amber-600' : 'text-red-600'
                                }`}>
                                  {pattern.characteristics.complexity}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <h4 className="text-xs font-semibold uppercase text-slate-500 mb-2">How to use</h4>
        <ul className="text-xs text-slate-600 space-y-1">
          <li>• Click a pattern to add to canvas</li>
          <li>• Watch for automatic conflict detection</li>
          <li>• Green = synergy, Yellow = warning, Red = conflict</li>
          <li>• Export your architecture when ready</li>
        </ul>
      </div>
    </div>
  )
}
