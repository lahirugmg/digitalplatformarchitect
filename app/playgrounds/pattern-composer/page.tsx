'use client'

import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import PatternLibrary from './components/PatternLibrary'
import CompositionCanvas from './components/CompositionCanvas'
import ValidationPanel from './components/ValidationPanel'
import ExportModal from './components/ExportModal'
import { ArchitectureOverlays, type ArchitectureOverlay } from '@/components/playgrounds/ArchitectureOverlays'
import { architecturalPatterns, validateComposition, type PatternNode } from '@/lib/pattern-compatibility'

export default function PatternComposerPage() {
  const [selectedPatterns, setSelectedPatterns] = useState<PatternNode[]>([])
  const [showExportModal, setShowExportModal] = useState(false)
  const [highlightedPattern, setHighlightedPattern] = useState<string | null>(null)
  const [activeOverlays, setActiveOverlays] = useState<ArchitectureOverlay[]>([])

  const validation = validateComposition(selectedPatterns.map(p => p.id))

  const handleAddPattern = (pattern: PatternNode) => {
    // Check if pattern is already added
    if (selectedPatterns.some(p => p.id === pattern.id)) {
      toast.warning('This pattern is already in your composition')
      return
    }
    setSelectedPatterns([...selectedPatterns, pattern])
  }

  const handleRemovePattern = (patternId: string) => {
    setSelectedPatterns(selectedPatterns.filter(p => p.id !== patternId))
  }

  const handleClearAll = () => {
    if (selectedPatterns.length === 0) return
    if (confirm('Are you sure you want to clear all patterns?')) {
      setSelectedPatterns([])
    }
  }

  const handleExport = () => {
    if (selectedPatterns.length === 0) {
      toast.warning('Add some patterns to your composition first!')
      return
    }
    setShowExportModal(true)
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">🎨 Pattern Composer</h1>
            <p className="text-purple-100">
              Compose architectural patterns with intelligent conflict detection
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition flex items-center gap-2"
              disabled={selectedPatterns.length === 0}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Architecture
            </button>
            <button
              onClick={handleClearAll}
              className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition"
              disabled={selectedPatterns.length === 0}
            >
              🔄 Clear All
            </button>
            <Link
              href="/playgrounds"
              className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition"
            >
              ← Back
            </Link>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-4 flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{selectedPatterns.length}</span>
            <span className="text-purple-100">patterns selected</span>
          </div>
          {validation.synergies.length > 0 && (
            <div className="flex items-center gap-2 text-green-200">
              <span>✨</span>
              <span>{validation.synergies.length} synergies detected</span>
            </div>
          )}
          {validation.warnings.length > 0 && (
            <div className="flex items-center gap-2 text-yellow-200">
              <span>⚠️</span>
              <span>{validation.warnings.length} warnings</span>
            </div>
          )}
          {validation.conflicts.length > 0 && (
            <div className="flex items-center gap-2 text-red-200">
              <span>❌</span>
              <span>{validation.conflicts.length} conflicts</span>
            </div>
          )}
          {validation.isValid && selectedPatterns.length > 1 && (
            <div className="flex items-center gap-2 text-green-200">
              <span>✅</span>
              <span>Composition valid</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Pattern Library */}
        <div className="w-80 bg-white border-r border-slate-200 overflow-y-auto">
          <PatternLibrary
            onPatternSelect={handleAddPattern}
            selectedPatternIds={selectedPatterns.map(p => p.id)}
            highlightedPattern={highlightedPattern}
          />
        </div>

        {/* Center - Composition Canvas */}
        <div className="flex-1 relative">
          <CompositionCanvas
            patterns={selectedPatterns}
            validation={validation}
            onRemovePattern={handleRemovePattern}
            onHighlightPattern={setHighlightedPattern}
          />
        </div>

        {/* Right Sidebar - Validation Panel & Overlays */}
        <div className="w-96 bg-white border-l border-slate-200 overflow-y-auto">
          <div className="p-4 space-y-4">
            <ValidationPanel
              validation={validation}
              selectedPatterns={selectedPatterns}
              onHighlightPattern={setHighlightedPattern}
            />

            {/* Architecture Overlays */}
            <div className="pt-4 border-t border-slate-200">
              <ArchitectureOverlays onOverlaysChange={setActiveOverlays} />
            </div>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          patterns={selectedPatterns}
          validation={validation}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  )
}
