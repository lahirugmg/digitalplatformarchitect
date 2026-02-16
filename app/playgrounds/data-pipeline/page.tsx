'use client'

import { useState, useCallback } from 'react'
import { Node, Edge } from 'reactflow'
import DataPipelineCanvas from './components/DataPipelineCanvas'
import ExportModal from './components/ExportModal'
import { savePipeline, listPipelines, loadPipeline, deletePipeline, type SavedPipeline } from '@/lib/pipeline-storage'

export default function DataPipelinePlayground() {
  const [isRunning, setIsRunning] = useState(false)
  const [metrics, setMetrics] = useState<any>(null)
  const [validation, setValidation] = useState<any>(null)
  const [showExportModal, setShowExportModal] = useState(false)
  const [showSaveLoad, setShowSaveLoad] = useState(false)
  const [currentNodes, setCurrentNodes] = useState<Node[]>([])
  const [currentEdges, setCurrentEdges] = useState<Edge[]>([])
  const [savedPipelines, setSavedPipelines] = useState<SavedPipeline[]>([])
  const [currentPipelineId, setCurrentPipelineId] = useState<string | null>(null)
  const [saveName, setSaveName] = useState('')
  const [loadedPipeline, setLoadedPipeline] = useState<SavedPipeline | null>(null)

  const handleReset = () => {
    setCurrentPipelineId(null)
    setLoadedPipeline(null)
    window.location.reload()
  }

  const handleExport = () => {
    if (currentNodes.length === 0) {
      alert('Add some components to your pipeline first!')
      return
    }
    setShowExportModal(true)
  }

  const handleSave = useCallback(() => {
    if (currentNodes.length === 0) {
      alert('Add some components to your pipeline first!')
      return
    }
    const name = saveName.trim() || `Pipeline ${new Date().toLocaleDateString()}`
    const saved = savePipeline(name, currentNodes, currentEdges, currentPipelineId || undefined)
    setCurrentPipelineId(saved.id)
    setSaveName(name)
    setSavedPipelines(listPipelines())
    alert(`Pipeline "${name}" saved!`)
  }, [currentNodes, currentEdges, saveName, currentPipelineId])

  const handleOpenSaveLoad = () => {
    setSavedPipelines(listPipelines())
    setShowSaveLoad(true)
  }

  const handleLoad = (pipeline: SavedPipeline) => {
    setLoadedPipeline(pipeline)
    setCurrentPipelineId(pipeline.id)
    setSaveName(pipeline.name)
    setShowSaveLoad(false)
  }

  const handleDelete = (id: string) => {
    deletePipeline(id)
    setSavedPipelines(listPipelines())
    if (currentPipelineId === id) {
      setCurrentPipelineId(null)
      setSaveName('')
    }
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-1">
              <span aria-hidden="true">🌊 </span>Data Pipeline Choreography
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Build data pipelines and watch data flow like water
              {currentPipelineId && saveName && (
                <span className="ml-2 text-blue-600 text-xs font-medium">({saveName})</span>
              )}
            </p>
          </div>
          <div className="flex gap-2 sm:gap-3 flex-wrap">
            {/* Save/Load */}
            <button
              onClick={handleOpenSaveLoad}
              className="px-3 sm:px-4 py-2 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-1"
              aria-label="Save or load pipeline"
            >
              💾 Save/Load
            </button>
            {/* Quick Save */}
            <button
              onClick={handleSave}
              className="px-3 sm:px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg font-medium hover:bg-blue-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Quick save current pipeline"
              disabled={currentNodes.length === 0}
            >
              Quick Save
            </button>
            {/* Export */}
            <button
              onClick={handleExport}
              className="px-3 sm:px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition shadow-md flex items-center gap-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              aria-label="Export infrastructure as code"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export IaC
            </button>
            {/* Run/Stop */}
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isRunning
                  ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
                  : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
              }`}
              disabled={!validation?.hasSource}
              aria-label={isRunning ? 'Stop pipeline' : 'Run pipeline'}
            >
              {isRunning ? '⏸️ Stop' : '▶️ Run Pipeline'}
            </button>
            {/* Reset */}
            <button
              onClick={handleReset}
              className="px-3 sm:px-6 py-2 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Reset pipeline canvas"
            >
              🔄 Reset
            </button>
          </div>
        </div>
      </div>

      {/* Save/Load Modal */}
      {showSaveLoad && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" role="dialog" aria-modal="true" aria-label="Save or load pipeline">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">Save / Load Pipeline</h2>
              <button
                onClick={() => setShowSaveLoad(false)}
                className="p-2 hover:bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            {/* Save Section */}
            <div className="p-6 border-b">
              <h3 className="font-semibold mb-3 text-sm uppercase text-slate-500">Save Current</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={saveName}
                  onChange={(e) => setSaveName(e.target.value)}
                  placeholder="Pipeline name..."
                  className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  aria-label="Pipeline name"
                />
                <button
                  onClick={() => { handleSave(); setShowSaveLoad(false) }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  disabled={currentNodes.length === 0}
                >
                  Save
                </button>
              </div>
            </div>

            {/* Load Section */}
            <div className="p-6 overflow-y-auto flex-1">
              <h3 className="font-semibold mb-3 text-sm uppercase text-slate-500">
                Saved Pipelines ({savedPipelines.length})
              </h3>
              {savedPipelines.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-4">No saved pipelines yet</p>
              ) : (
                <div className="space-y-3">
                  {savedPipelines.map((p) => (
                    <div
                      key={p.id}
                      className={`border rounded-lg p-4 ${
                        p.id === currentPipelineId ? 'border-blue-400 bg-blue-50' : 'border-slate-200'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-semibold text-sm">{p.name}</div>
                          <div className="text-xs text-slate-500">
                            {p.nodes.length} nodes, {p.edges.length} connections
                          </div>
                          <div className="text-xs text-slate-400 mt-1">
                            {new Date(p.updatedAt).toLocaleDateString()} {new Date(p.updatedAt).toLocaleTimeString()}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleLoad(p)}
                            className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            Load
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="px-3 py-1 border border-red-200 text-red-600 rounded text-xs font-medium hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                            aria-label={`Delete ${p.name}`}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          nodes={currentNodes}
          edges={currentEdges}
          onClose={() => setShowExportModal(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Component Library */}
        <div className="hidden md:block w-64 bg-white border-r border-slate-200 p-4 overflow-y-auto" role="complementary" aria-label="Component library">
          <h3 className="font-bold mb-4 text-sm uppercase text-slate-500">Component Library</h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 text-sm">Data Sources</h4>
              <div className="space-y-2">
                <ComponentCard icon="📡" name="IoT Sensors" componentType="source" />
                <ComponentCard icon="🌐" name="REST API" componentType="source" />
                <ComponentCard icon="📊" name="Database CDC" componentType="source" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-sm">Stream Processing</h4>
              <div className="space-y-2">
                <ComponentCard icon="⚡" name="Kafka" componentType="streaming" />
                <ComponentCard icon="🌊" name="Apache Flink" componentType="streaming" />
                <ComponentCard icon="🔄" name="Transformation" componentType="processing" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-sm">Storage</h4>
              <div className="space-y-2">
                <ComponentCard icon="🏞️" name="Data Lake" componentType="storage" />
                <ComponentCard icon="🏛️" name="Data Warehouse" componentType="storage" />
                <ComponentCard icon="⚡" name="Redis Cache" componentType="storage" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-sm">Analytics</h4>
              <div className="space-y-2">
                <ComponentCard icon="📈" name="Analytics Engine" componentType="analytics" />
                <ComponentCard icon="🤖" name="ML Model" componentType="analytics" />
                <ComponentCard icon="📊" name="Dashboard" componentType="analytics" />
              </div>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-slate-50">
          <DataPipelineCanvas
            isRunning={isRunning}
            onMetricsUpdate={setMetrics}
            onValidationUpdate={setValidation}
            onNodesChange={(nodes) => setCurrentNodes(nodes)}
            onEdgesChange={(edges) => setCurrentEdges(edges)}
            loadedPipeline={loadedPipeline}
          />
        </div>

        {/* Right Panel - Challenge & Metrics */}
        <div className="hidden lg:block w-80 bg-white border-l border-slate-200 p-4 overflow-y-auto" role="complementary" aria-label="Challenge progress and metrics">
          {/* Challenge Progress */}
          <div className="mb-6">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <span aria-hidden="true">🎯</span> Challenge Progress
            </h3>
            <div className="space-y-2 text-sm" role="list" aria-label="Challenge requirements">
              <ChecklistItem checked={validation?.hasSource} label="Add data source" />
              <ChecklistItem checked={validation?.hasStreaming} label="Add streaming platform (Kafka)" />
              <ChecklistItem checked={validation?.hasTransformation} label="Add transformation step" />
              <ChecklistItem checked={validation?.hasStorage} label="Add storage layer" />
              <ChecklistItem checked={validation?.hasAnalytics} label="Connect analytics engine" />
            </div>

            {validation?.isComplete && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3" role="alert">
                <div className="flex items-center gap-2 text-green-700 font-semibold">
                  <span aria-hidden="true">✅</span> Challenge Complete!
                </div>
                <p className="text-sm text-green-600 mt-1">
                  Great job! You&apos;ve built a complete data pipeline.
                </p>
              </div>
            )}

            {validation?.issues && validation.issues.length > 0 && !validation?.isComplete && (
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="text-xs font-semibold text-amber-700 mb-2">Next Steps:</div>
                <ul className="text-xs text-amber-600 space-y-1">
                  {validation.issues.map((issue: string, i: number) => (
                    <li key={i}>• {issue}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Live Metrics */}
          {isRunning && metrics && (
            <div className="mb-6" aria-live="polite">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <span aria-hidden="true">📊</span> Live Metrics
              </h3>
              <div className="space-y-3">
                <MetricCard label="Throughput" value={`${(metrics.throughput / 1000).toFixed(1)}K`} unit="events/sec" color="blue" />
                <MetricCard label="Latency" value={metrics.latency} unit="ms" color="cyan" />
                <MetricCard label="Data Quality" value={metrics.quality} unit="%" color={metrics.quality >= 90 ? 'green' : metrics.quality >= 70 ? 'amber' : 'red'} />
                <MetricCard label="Monthly Cost" value={`$${metrics.monthlyCost.toLocaleString()}`} unit="/month" color="slate" />
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-sm">💡 Tips</h4>
            <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
              <li>Drag components from left sidebar</li>
              <li>Connect nodes by dragging edges</li>
              <li>Thicker connections = higher throughput</li>
              <li>Blue streams = clean data quality</li>
              <li>Brown streams = data quality issues</li>
              <li>Click Run to see animated flow</li>
              <li>Use Save/Load to keep your designs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function ComponentCard({ icon, name, componentType }: { icon: string; name: string; componentType: string }) {
  const handleDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ icon, name, componentType }))
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-white border border-slate-200 rounded-lg p-3 cursor-move hover:shadow-md hover:border-blue-300 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
      role="button"
      tabIndex={0}
      aria-label={`Drag ${name} (${componentType}) to canvas`}
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl" aria-hidden="true">{icon}</span>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm truncate">{name}</div>
          <div className="text-xs text-slate-500 capitalize">{componentType}</div>
        </div>
      </div>
    </div>
  )
}

function ChecklistItem({ checked, label }: { checked: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2" role="listitem">
      <div
        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
          checked ? 'bg-green-500 border-green-500' : 'border-slate-300'
        }`}
        role="checkbox"
        aria-checked={checked}
        aria-label={label}
      >
        {checked && <span className="text-white text-xs" aria-hidden="true">✓</span>}
      </div>
      <span className={checked ? 'text-slate-700 line-through' : 'text-slate-600'}>{label}</span>
    </div>
  )
}

function MetricCard({ label, value, unit, color }: { label: string; value: string | number; unit: string; color: string }) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    cyan: 'bg-cyan-50 border-cyan-200 text-cyan-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    amber: 'bg-amber-50 border-amber-200 text-amber-700',
    red: 'bg-red-50 border-red-200 text-red-700',
    slate: 'bg-slate-50 border-slate-200 text-slate-700',
  }

  return (
    <div className={`border rounded-lg p-3 ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="text-xs font-medium opacity-75">{label}</div>
      <div className="flex items-baseline gap-1 mt-1">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-xs opacity-75">{unit}</span>
      </div>
    </div>
  )
}
