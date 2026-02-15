'use client'

import { useState } from 'react'
import { checkCompatibility, type PatternNode, type CompositionValidation } from '@/lib/pattern-compatibility'

interface CompositionCanvasProps {
  patterns: PatternNode[]
  validation: CompositionValidation
  onRemovePattern: (patternId: string) => void
  onHighlightPattern: (patternId: string | null) => void
}

export default function CompositionCanvas({
  patterns,
  validation,
  onRemovePattern,
  onHighlightPattern
}: CompositionCanvasProps) {
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null)

  const handlePatternClick = (patternId: string) => {
    setSelectedPattern(patternId === selectedPattern ? null : patternId)
  }

  const getConnectionColor = (pattern1Id: string, pattern2Id: string): string => {
    const rule = checkCompatibility(pattern1Id, pattern2Id)
    if (!rule) return 'stroke-slate-300'

    switch (rule.level) {
      case 'synergy': return 'stroke-green-500'
      case 'warning': return 'stroke-yellow-500'
      case 'conflict': return 'stroke-red-500'
      default: return 'stroke-blue-400'
    }
  }

  const getConnectionWidth = (pattern1Id: string, pattern2Id: string): string => {
    const rule = checkCompatibility(pattern1Id, pattern2Id)
    if (!rule) return 'stroke-1'

    switch (rule.level) {
      case 'synergy': return 'stroke-2'
      case 'conflict': return 'stroke-2'
      default: return 'stroke-1'
    }
  }

  const getConnectionDash = (pattern1Id: string, pattern2Id: string): string => {
    const rule = checkCompatibility(pattern1Id, pattern2Id)
    if (!rule) return ''

    switch (rule.level) {
      case 'warning': return 'stroke-dasharray-4'
      default: return ''
    }
  }

  // Calculate pattern positions in a circular layout
  const calculatePosition = (index: number, total: number) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2
    const radius = Math.min(40, 30 + total * 2) // Adjust radius based on number of patterns
    const x = 50 + radius * Math.cos(angle)
    const y = 50 + radius * Math.sin(angle)
    return { x, y }
  }

  if (patterns.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-50">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-xl font-bold text-slate-700 mb-2">
            Start Composing Your Architecture
          </h3>
          <p className="text-slate-500 mb-6">
            Select patterns from the library on the left to begin building your architecture.
            Watch as intelligent conflict detection highlights synergies and conflicts.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-left">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tips:</h4>
            <ul className="space-y-1 text-blue-700">
              <li>• <span className="text-green-600 font-bold">Green connections</span> = Synergies (patterns work great together)</li>
              <li>• <span className="text-yellow-600 font-bold">Yellow connections</span> = Warnings (use with caution)</li>
              <li>• <span className="text-red-600 font-bold">Red connections</span> = Conflicts (incompatible patterns)</li>
              <li>• <span className="text-blue-600 font-bold">Blue connections</span> = Compatible (safe to use together)</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full relative bg-gradient-to-br from-slate-50 to-blue-50">
      {/* SVG Canvas for connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <marker
            id="arrowhead-green"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#22c55e" />
          </marker>
          <marker
            id="arrowhead-yellow"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#eab308" />
          </marker>
          <marker
            id="arrowhead-red"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#ef4444" />
          </marker>
        </defs>

        {/* Draw connections between patterns */}
        {patterns.map((pattern1, i) => {
          const pos1 = calculatePosition(i, patterns.length)
          return patterns.slice(i + 1).map((pattern2, j) => {
            const pos2 = calculatePosition(i + j + 1, patterns.length)
            const color = getConnectionColor(pattern1.id, pattern2.id)
            const width = getConnectionWidth(pattern1.id, pattern2.id)
            const dash = getConnectionDash(pattern1.id, pattern2.id)

            return (
              <line
                key={`${pattern1.id}-${pattern2.id}`}
                x1={`${pos1.x}%`}
                y1={`${pos1.y}%`}
                x2={`${pos2.x}%`}
                y2={`${pos2.y}%`}
                className={`${color} ${width} ${dash} transition-all duration-300`}
                opacity={
                  selectedPattern === null ||
                  selectedPattern === pattern1.id ||
                  selectedPattern === pattern2.id
                    ? 0.6
                    : 0.15
                }
              />
            )
          })
        })}
      </svg>

      {/* Pattern nodes */}
      <div className="absolute inset-0">
        {patterns.map((pattern, index) => {
          const { x, y } = calculatePosition(index, patterns.length)
          const isSelected = selectedPattern === pattern.id

          return (
            <div
              key={pattern.id}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              className="absolute"
            >
              <div
                onClick={() => handlePatternClick(pattern.id)}
                onMouseEnter={() => onHighlightPattern(pattern.id)}
                onMouseLeave={() => onHighlightPattern(null)}
                className={`
                  relative bg-white rounded-2xl shadow-lg p-4 cursor-pointer transition-all duration-300
                  border-2
                  ${isSelected
                    ? 'border-purple-500 shadow-2xl scale-110 z-20'
                    : 'border-slate-200 hover:border-purple-300 hover:shadow-xl hover:scale-105 z-10'
                  }
                  w-40
                `}
              >
                {/* Remove button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemovePattern(pattern.id)
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition shadow-md z-10"
                  title="Remove pattern"
                >
                  ×
                </button>

                {/* Pattern content */}
                <div className="text-center">
                  <div className="text-4xl mb-2">{pattern.icon}</div>
                  <div className="font-bold text-sm mb-1">{pattern.title}</div>
                  <div className="text-xs text-slate-500 mb-2">{pattern.category}</div>

                  {/* Quick characteristics */}
                  <div className="flex flex-wrap gap-1 justify-center">
                    {pattern.characteristics.coupling && (
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        pattern.characteristics.coupling === 'loose'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {pattern.characteristics.coupling} coupling
                      </span>
                    )}
                  </div>
                </div>

                {/* Tooltip on hover */}
                {isSelected && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-slate-900 text-white text-xs rounded-lg p-3 w-64 z-30 shadow-xl">
                    <p className="mb-2">{pattern.description}</p>
                    {pattern.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {pattern.tags.map(tag => (
                          <span key={tag} className="bg-slate-700 px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-lg shadow-lg p-4 border border-slate-200">
        <h4 className="font-semibold text-sm mb-3">Connection Legend</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-green-500"></div>
            <span className="text-slate-700">Synergy (works great together)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-blue-400"></div>
            <span className="text-slate-700">Compatible (safe to use)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-yellow-500" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #eab308 0, #eab308 4px, transparent 4px, transparent 8px)' }}></div>
            <span className="text-slate-700">Warning (use with caution)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-red-500"></div>
            <span className="text-slate-700">Conflict (incompatible)</span>
          </div>
        </div>
      </div>

      {/* Pattern count indicator */}
      <div className="absolute top-4 left-4 bg-purple-600 text-white rounded-lg shadow-lg px-4 py-2">
        <div className="text-2xl font-bold">{patterns.length}</div>
        <div className="text-xs opacity-90">patterns</div>
      </div>
    </div>
  )
}
