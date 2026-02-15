'use client'

import { useState } from 'react'

export type OverlayType = 'security' | 'observability' | 'resilience' | 'cost'

export interface ArchitectureOverlay {
  id: string
  name: string
  type: OverlayType
  description: string
  icon: string
  color: string
  enabled: boolean
}

const DEFAULT_OVERLAYS: ArchitectureOverlay[] = [
  {
    id: 'tls',
    name: 'TLS/mTLS Encryption',
    type: 'security',
    description: 'Shows encrypted communication paths between components',
    icon: '🔒',
    color: 'red',
    enabled: false
  },
  {
    id: 'rbac',
    name: 'RBAC/Authorization',
    type: 'security',
    description: 'Highlights components with role-based access control',
    icon: '🛡️',
    color: 'orange',
    enabled: false
  },
  {
    id: 'tracing',
    name: 'Distributed Tracing',
    type: 'observability',
    description: 'Shows request tracing and observability instrumentation',
    icon: '🔍',
    color: 'cyan',
    enabled: false
  },
  {
    id: 'metrics',
    name: 'Metrics & Monitoring',
    type: 'observability',
    description: 'Highlights components exporting metrics',
    icon: '📊',
    color: 'blue',
    enabled: false
  },
  {
    id: 'circuit-breaker',
    name: 'Circuit Breakers',
    type: 'resilience',
    description: 'Shows resilience patterns and failure handling',
    icon: '⚡',
    color: 'purple',
    enabled: false
  },
  {
    id: 'cost-tracking',
    name: 'Cost Tracking',
    type: 'cost',
    description: 'Highlights high-cost components and resource usage',
    icon: '💰',
    color: 'green',
    enabled: false
  }
]

interface ArchitectureOverlaysProps {
  onOverlaysChange?: (overlays: ArchitectureOverlay[]) => void
}

export function ArchitectureOverlays({ onOverlaysChange }: ArchitectureOverlaysProps) {
  const [overlays, setOverlays] = useState<ArchitectureOverlay[]>(DEFAULT_OVERLAYS)

  const toggleOverlay = (id: string) => {
    const updated = overlays.map(overlay =>
      overlay.id === id ? { ...overlay, enabled: !overlay.enabled } : overlay
    )
    setOverlays(updated)
    onOverlaysChange?.(updated)
  }

  const toggleAll = (enabled: boolean) => {
    const updated = overlays.map(overlay => ({ ...overlay, enabled }))
    setOverlays(updated)
    onOverlaysChange?.(updated)
  }

  const activeCount = overlays.filter(o => o.enabled).length
  const groupedOverlays = overlays.reduce((acc, overlay) => {
    if (!acc[overlay.type]) acc[overlay.type] = []
    acc[overlay.type].push(overlay)
    return acc
  }, {} as Record<OverlayType, ArchitectureOverlay[]>)

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <span>Architecture Overlays</span>
            {activeCount > 0 && (
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                {activeCount} active
              </span>
            )}
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Toggle layers to visualize security, observability, and operational concerns
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => toggleAll(true)}
            className="text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition font-medium"
          >
            Enable All
          </button>
          <button
            onClick={() => toggleAll(false)}
            className="text-xs px-3 py-1.5 bg-slate-50 text-slate-600 rounded hover:bg-slate-100 transition font-medium"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Grouped Overlays */}
      <div className="space-y-4">
        {Object.entries(groupedOverlays).map(([type, typeOverlays]) => (
          <div key={type}>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              {type}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {typeOverlays.map((overlay) => (
                <button
                  key={overlay.id}
                  onClick={() => toggleOverlay(overlay.id)}
                  className={`
                    text-left p-3 rounded-lg border-2 transition
                    ${overlay.enabled
                      ? `bg-${overlay.color}-50 border-${overlay.color}-400`
                      : 'bg-white border-slate-200 hover:border-slate-300'
                    }
                  `}
                >
                  <div className="flex items-start gap-2">
                    <div className="text-2xl">{overlay.icon}</div>
                    <div className="flex-1">
                      <div className={`font-semibold text-sm ${
                        overlay.enabled ? `text-${overlay.color}-900` : 'text-slate-900'
                      }`}>
                        {overlay.name}
                      </div>
                      <div className={`text-xs mt-0.5 ${
                        overlay.enabled ? `text-${overlay.color}-700` : 'text-slate-600'
                      }`}>
                        {overlay.description}
                      </div>
                    </div>
                    <div>
                      {overlay.enabled ? (
                        <div className={`w-5 h-5 bg-${overlay.color}-500 rounded flex items-center justify-center`}>
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-5 h-5 border-2 border-slate-300 rounded" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Active Overlays Summary */}
      {activeCount > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          <div className="flex flex-wrap gap-2">
            {overlays.filter(o => o.enabled).map(overlay => (
              <div
                key={overlay.id}
                className={`flex items-center gap-1.5 px-3 py-1.5 bg-${overlay.color}-100 text-${overlay.color}-800 rounded-full text-sm font-medium`}
              >
                <span>{overlay.icon}</span>
                <span>{overlay.name}</span>
                <button
                  onClick={() => toggleOverlay(overlay.id)}
                  className={`ml-1 hover:bg-${overlay.color}-200 rounded-full p-0.5 transition`}
                  aria-label={`Remove ${overlay.name} overlay`}
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Hook to get active overlays
 */
export function useActiveOverlays(overlays: ArchitectureOverlay[]) {
  const active = overlays.filter(o => o.enabled)
  return {
    active,
    hasOverlay: (id: string) => active.some(o => o.id === id),
    getOverlaysByType: (type: OverlayType) => active.filter(o => o.type === type)
  }
}
