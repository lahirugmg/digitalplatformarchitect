'use client'

import { useState } from 'react'
import {
  ARCHITECTURE_TREE,
  filterNodes,
  getCategoryColor,
  type Persona,
  type DetailLevel,
  type ArchitectureNode
} from '@/lib/architecture-map'

export function ArchitectureNavigator() {
  const [selectedPersonas, setSelectedPersonas] = useState<Persona[]>([])
  const [maxLevel, setMaxLevel] = useState<DetailLevel>('L3')
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root']))

  const togglePersona = (persona: Persona) => {
    setSelectedPersonas(prev =>
      prev.includes(persona)
        ? prev.filter(p => p !== persona)
        : [...prev, persona]
    )
  }

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev)
      if (next.has(nodeId)) {
        next.delete(nodeId)
      } else {
        next.add(nodeId)
      }
      return next
    })
  }

  const filteredTree = filterNodes(ARCHITECTURE_TREE, selectedPersonas, maxLevel)

  const renderNode = (node: ArchitectureNode, depth: number = 0) => {
    const isExpanded = expandedNodes.has(node.id)
    const hasChildren = node.children && node.children.length > 0
    const color = getCategoryColor(node.category)

    return (
      <div key={node.id} className="mb-2">
        <div
          className={`flex items-start gap-3 p-3 rounded-lg border-2 transition hover:shadow-md cursor-pointer ${
            color === 'blue' ? 'border-blue-200 bg-blue-50 hover:bg-blue-100' :
            color === 'purple' ? 'border-purple-200 bg-purple-50 hover:bg-purple-100' :
            color === 'green' ? 'border-green-200 bg-green-50 hover:bg-green-100' :
            color === 'red' ? 'border-red-200 bg-red-50 hover:bg-red-100' :
            color === 'orange' ? 'border-orange-200 bg-orange-50 hover:bg-orange-100' :
            'border-slate-200 bg-slate-50 hover:bg-slate-100'
          }`}
          style={{ marginLeft: `${depth * 24}px` }}
          onClick={() => hasChildren && toggleNode(node.id)}
        >
          <div className="flex-shrink-0 mt-1">
            {hasChildren && (
              <span className="text-lg">
                {isExpanded ? '▼' : '▶'}
              </span>
            )}
            {!hasChildren && <span className="text-lg ml-5">●</span>}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-slate-900">{node.title}</h3>
              <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                color === 'blue' ? 'bg-blue-100 text-blue-700' :
                color === 'purple' ? 'bg-purple-100 text-purple-700' :
                color === 'green' ? 'bg-green-100 text-green-700' :
                color === 'red' ? 'bg-red-100 text-red-700' :
                color === 'orange' ? 'bg-orange-100 text-orange-700' :
                'bg-slate-100 text-slate-700'
              }`}>
                {node.level}
              </span>
            </div>
            <p className="text-sm text-slate-600 mb-2">{node.description}</p>
            {node.docLink && (
              <a
                href={node.docLink}
                className="text-xs text-blue-600 hover:underline font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                View Documentation →
              </a>
            )}
          </div>
        </div>

        {isExpanded && hasChildren && (
          <div className="mt-2">
            {node.children!.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-4 gap-6">
      {/* Filters */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 sticky top-4">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Filters</h2>

          {/* Persona Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-700 mb-3">Persona</h3>
            {(['business', 'architect', 'engineer'] as Persona[]).map(persona => (
              <label key={persona} className="flex items-center gap-2 mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedPersonas.includes(persona)}
                  onChange={() => togglePersona(persona)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-slate-700 capitalize">{persona}</span>
              </label>
            ))}
          </div>

          {/* Detail Level Filter */}
          <div>
            <h3 className="text-sm font-bold text-slate-700 mb-3">Max Detail Level</h3>
            {(['L0', 'L1', 'L2', 'L3'] as DetailLevel[]).map(level => (
              <label key={level} className="flex items-center gap-2 mb-2 cursor-pointer">
                <input
                  type="radio"
                  name="level"
                  checked={maxLevel === level}
                  onChange={() => setMaxLevel(level)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-slate-700">{level} {
                  level === 'L0' ? '(Overview)' :
                  level === 'L1' ? '(High-level)' :
                  level === 'L2' ? '(Detailed)' :
                  '(Technical)'
                }</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Tree View */}
      <div className="lg:col-span-3">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Architecture Documentation</h2>
          {filteredTree ? renderNode(filteredTree) : (
            <p className="text-slate-600">No nodes match the current filters.</p>
          )}
        </div>
      </div>
    </div>
  )
}
