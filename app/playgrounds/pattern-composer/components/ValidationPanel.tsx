'use client'

import { type CompositionValidation, type PatternNode } from '@/lib/pattern-compatibility'

interface ValidationPanelProps {
  validation: CompositionValidation
  selectedPatterns: PatternNode[]
  onHighlightPattern: (patternId: string | null) => void
}

export default function ValidationPanel({
  validation,
  selectedPatterns,
  onHighlightPattern
}: ValidationPanelProps) {
  const getPatternName = (patternId: string): string => {
    const pattern = selectedPatterns.find(p => p.id === patternId)
    return pattern ? pattern.title : patternId
  }

  if (selectedPatterns.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="text-5xl mb-4">📋</div>
          <h3 className="text-lg font-bold text-slate-700 mb-2">Validation Panel</h3>
          <p className="text-sm text-slate-500">
            Add patterns to see validation results, conflicts, and recommendations
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-slate-200 p-4 z-10">
        <h3 className="font-bold text-sm uppercase text-slate-500">Validation Results</h3>
      </div>

      <div className="p-4 space-y-4">
        {/* Overall Status */}
        <div className={`rounded-lg p-4 border-2 ${
          validation.isValid
            ? 'bg-green-50 border-green-300'
            : 'bg-red-50 border-red-300'
        }`}>
          <div className="flex items-center gap-3">
            <div className="text-3xl">
              {validation.isValid ? '✅' : '❌'}
            </div>
            <div>
              <div className="font-bold text-lg">
                {validation.isValid ? 'Composition Valid' : 'Conflicts Detected'}
              </div>
              <div className="text-sm opacity-75">
                {validation.isValid
                  ? 'Your architecture composition is compatible'
                  : 'Review conflicts before proceeding'}
              </div>
            </div>
          </div>
        </div>

        {/* Conflicts */}
        {validation.conflicts.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-bold text-red-900 flex items-center gap-2 mb-3">
              <span>❌</span>
              Conflicts ({validation.conflicts.length})
            </h4>
            <div className="space-y-3">
              {validation.conflicts.map((rule, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-3 border border-red-200"
                  onMouseEnter={() => onHighlightPattern(rule.pattern1)}
                  onMouseLeave={() => onHighlightPattern(null)}
                >
                  <div className="font-semibold text-sm text-red-900 mb-2">
                    {getPatternName(rule.pattern1)} ⚔️ {getPatternName(rule.pattern2)}
                  </div>
                  <p className="text-xs text-red-700 mb-2">{rule.reason}</p>
                  {rule.recommendation && (
                    <div className="bg-red-100 rounded p-2 text-xs text-red-800">
                      <span className="font-semibold">💡 Fix:</span> {rule.recommendation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Warnings */}
        {validation.warnings.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-bold text-yellow-900 flex items-center gap-2 mb-3">
              <span>⚠️</span>
              Warnings ({validation.warnings.length})
            </h4>
            <div className="space-y-3">
              {validation.warnings.map((rule, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-3 border border-yellow-200"
                  onMouseEnter={() => onHighlightPattern(rule.pattern1)}
                  onMouseLeave={() => onHighlightPattern(null)}
                >
                  <div className="font-semibold text-sm text-yellow-900 mb-2">
                    {getPatternName(rule.pattern1)} ⚡ {getPatternName(rule.pattern2)}
                  </div>
                  <p className="text-xs text-yellow-700 mb-2">{rule.reason}</p>
                  {rule.recommendation && (
                    <div className="bg-yellow-100 rounded p-2 text-xs text-yellow-800">
                      <span className="font-semibold">💡 Tip:</span> {rule.recommendation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Synergies */}
        {validation.synergies.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-bold text-green-900 flex items-center gap-2 mb-3">
              <span>✨</span>
              Synergies ({validation.synergies.length})
            </h4>
            <div className="space-y-3">
              {validation.synergies.map((rule, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-3 border border-green-200"
                  onMouseEnter={() => onHighlightPattern(rule.pattern1)}
                  onMouseLeave={() => onHighlightPattern(null)}
                >
                  <div className="font-semibold text-sm text-green-900 mb-2">
                    {getPatternName(rule.pattern1)} 🤝 {getPatternName(rule.pattern2)}
                  </div>
                  <p className="text-xs text-green-700 mb-2">{rule.reason}</p>
                  {rule.recommendation && (
                    <div className="bg-green-100 rounded p-2 text-xs text-green-800">
                      <span className="font-semibold">💡 Best Practice:</span> {rule.recommendation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {validation.recommendations.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-bold text-blue-900 flex items-center gap-2 mb-3">
              <span>💡</span>
              Recommendations
            </h4>
            <ul className="space-y-2">
              {validation.recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-blue-700 flex items-start gap-2">
                  <span className="mt-0.5">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Pattern Summary */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <h4 className="font-bold text-slate-700 mb-3">Pattern Summary</h4>
          <div className="space-y-2">
            {selectedPatterns.map(pattern => (
              <div
                key={pattern.id}
                className="bg-white rounded p-2 border border-slate-200 hover:border-purple-300 transition cursor-pointer"
                onMouseEnter={() => onHighlightPattern(pattern.id)}
                onMouseLeave={() => onHighlightPattern(null)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{pattern.icon}</span>
                  <span className="font-semibold text-sm">{pattern.title}</span>
                </div>
                <div className="text-xs text-slate-500 ml-7">
                  {pattern.category}
                </div>
                {pattern.characteristics.coupling && (
                  <div className="text-xs ml-7 mt-1">
                    <span className={`px-2 py-0.5 rounded ${
                      pattern.characteristics.coupling === 'loose'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {pattern.characteristics.coupling} coupling
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white border border-slate-200 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {selectedPatterns.length}
            </div>
            <div className="text-xs text-slate-600">Total Patterns</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-600">
              {validation.synergies.length}
            </div>
            <div className="text-xs text-slate-600">Synergies</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {validation.warnings.length}
            </div>
            <div className="text-xs text-slate-600">Warnings</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-red-600">
              {validation.conflicts.length}
            </div>
            <div className="text-xs text-slate-600">Conflicts</div>
          </div>
        </div>
      </div>
    </div>
  )
}
