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
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] right-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-cyan-600/10 blur-[100px]" />
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/5 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-1 tracking-tight text-white flex items-center gap-2">
              <span className="text-2xl">🌊</span> Data Pipeline Choreography
            </h1>
            <p className="text-sm sm:text-base text-slate-400 font-medium">
              Build data pipelines and watch data flow like water
              {currentPipelineId && saveName && (
                <span className="ml-2 text-blue-400 text-xs font-semibold">({saveName})</span>
              )}
            </p>
          </div>
          <div className="flex gap-2 sm:gap-3 flex-wrap">
            {/* Save/Load */}
            <button
              onClick={handleOpenSaveLoad}
              className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-lg font-medium transition-all text-sm text-slate-300 hover:text-white flex items-center gap-2"
              aria-label="Save or load pipeline"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save/Load
            </button>
            {/* Quick Save */}
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-lg font-medium hover:bg-blue-500/30 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Quick save current pipeline"
              disabled={currentNodes.length === 0}
            >
              Quick Save
            </button>
            {/* Export */}
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500/80 to-teal-500/80 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 text-sm border border-emerald-400/20"
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
              className={`px-6 py-2 rounded-lg font-bold transition-all text-sm shadow-lg flex items-center gap-2 ${isRunning
                  ? 'bg-red-500/80 hover:bg-red-500 text-white shadow-red-500/20 border border-red-500/50'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20 border border-blue-500/50'
                }`}
              disabled={!validation?.hasSource}
              aria-label={isRunning ? 'Stop pipeline' : 'Run pipeline'}
            >
              {isRunning ? '⏹ Stop' : '▶ Run Pipeline'}
            </button>
            {/* Reset */}
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg font-medium transition-all text-sm text-slate-300 flex items-center gap-2"
              aria-label="Reset pipeline canvas"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
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
                      className={`border rounded-lg p-4 ${p.id === currentPipelineId ? 'border-blue-400 bg-blue-50' : 'border-slate-200'
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
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Sidebar - Component Library */}
        <div className="hidden md:block w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-5 overflow-y-auto" role="complementary" aria-label="Component library">
          <h3 className="font-bold mb-5 text-xs uppercase tracking-wider text-slate-400">Component Library</h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3 text-sm text-slate-300">Data Sources</h4>
              <div className="space-y-2.5">
                <ComponentCard icon="📡" name="IoT Sensors" componentType="source" />
                <ComponentCard icon="🌐" name="REST API" componentType="source" />
                <ComponentCard icon="📊" name="Database CDC" componentType="source" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-sm text-slate-300">Stream Processing</h4>
              <div className="space-y-2.5">
                <ComponentCard icon="⚡" name="Kafka" componentType="streaming" />
                <ComponentCard icon="🌊" name="Apache Flink" componentType="streaming" />
                <ComponentCard icon="🔄" name="Transformation" componentType="processing" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-sm text-slate-300">Storage</h4>
              <div className="space-y-2.5">
                <ComponentCard icon="🏞️" name="Data Lake" componentType="storage" />
                <ComponentCard icon="🏛️" name="Data Warehouse" componentType="storage" />
                <ComponentCard icon="⚡" name="Redis Cache" componentType="storage" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-sm text-slate-300">Analytics</h4>
              <div className="space-y-2.5">
                <ComponentCard icon="📈" name="Analytics Engine" componentType="analytics" />
                <ComponentCard icon="🤖" name="ML Model" componentType="analytics" />
                <ComponentCard icon="📊" name="Dashboard" componentType="analytics" />
              </div>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative bg-[#0f172a]">
          <div className="absolute inset-0 z-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
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
        <div className="hidden lg:block w-80 bg-white/5 backdrop-blur-xl border-l border-white/10 p-5 overflow-y-auto" role="complementary" aria-label="Challenge progress and metrics">
          {/* Challenge Progress */}
          <div className="mb-8">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-200">
              <span className="text-xl">🎯</span> Challenge
            </h3>
            <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/10" role="list">
              <ChecklistItem checked={validation?.hasSource} label="Add data source" />
              <ChecklistItem checked={validation?.hasStreaming} label="Add streaming (Kafka)" />
              <ChecklistItem checked={validation?.hasTransformation} label="Add transformation" />
              <ChecklistItem checked={validation?.hasStorage} label="Add storage layer" />
              <ChecklistItem checked={validation?.hasAnalytics} label="Connect analytics" />
            </div>

            {validation?.isComplete && (
              <div className="mt-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl p-4" role="alert">
                <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                  <span className="text-xl leading-none">✅</span> Complete!
                </div>
                <p className="text-sm text-emerald-300/80 leading-snug">
                  Great job! You&apos;ve built a complete core data pipeline.
                </p>
              </div>
            )}

            {validation?.issues && validation.issues.length > 0 && !validation?.isComplete && (
              <div className="mt-4 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400/80 mb-2">Next Steps</div>
                <ul className="text-sm text-amber-200/80 space-y-1.5">
                  {validation.issues.map((issue: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-500/50 mt-1">&rarr;</span> {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Live Metrics */}
          {isRunning && metrics && (
            <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500" aria-live="polite">
              <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-200">
                <span className="text-xl">📊</span> Live Metrics
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <MetricCard label="Throughput" value={`${(metrics.throughput / 1000).toFixed(1)}K`} unit="events/s" color="blue" />
                <MetricCard label="Latency" value={metrics.latency} unit="ms" color="cyan" />
                <MetricCard label="Quality" value={metrics.quality} unit="%" color={metrics.quality >= 90 ? 'green' : metrics.quality >= 70 ? 'amber' : 'red'} />
                <MetricCard label="Cost" value={`$${metrics.monthlyCost.toLocaleString()}`} unit="/mo" color="slate" />
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
            <h4 className="font-bold mb-3 text-sm text-blue-400 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Tips
            </h4>
            <ul className="text-xs text-blue-200/70 space-y-2">
              <li className="flex items-start gap-2"><span className="text-blue-500">•</span> Drag components from left</li>
              <li className="flex items-start gap-2"><span className="text-blue-500">•</span> Connect nodes via ports</li>
              <li className="flex items-start gap-2"><span className="text-blue-500">•</span> Thicker lines = high load</li>
              <li className="flex items-start gap-2"><span className="text-blue-500">•</span> Click Run to animate</li>
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
      className="bg-white/5 border border-white/10 rounded-xl p-3 cursor-move transition-all duration-200 hover:scale-105 hover:bg-white/10 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-500 group"
      role="button"
      tabIndex={0}
      aria-label={`Drag ${name} (${componentType}) to canvas`}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 ring-1 ring-white/10 group-hover:bg-blue-500/20 group-hover:ring-blue-500/30 transition-all">
          <span className="text-lg" aria-hidden="true">{icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm truncate text-slate-200 group-hover:text-white transition-colors">{name}</div>
        </div>
      </div>
    </div>
  )
}

function ChecklistItem({ checked, label }: { checked: boolean; label: string }) {
  return (
    <div className="flex items-center gap-3 group" role="listitem">
      <div
        className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${checked ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400' : 'bg-white/5 border border-white/10 text-transparent'
          }`}
        role="checkbox"
        aria-checked={checked}
        aria-label={label}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className={`text-sm transition-colors ${checked ? 'text-slate-500 line-through' : 'text-slate-300 group-hover:text-white'}`}>{label}</span>
    </div>
  )
}

function MetricCard({ label, value, unit, color }: { label: string; value: string | number; unit: string; color: string }) {
  const colorClasses = {
    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-100',
    cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-100',
    green: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-100',
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-100',
    red: 'bg-red-500/10 border-red-500/20 text-red-100',
    slate: 'bg-slate-500/20 border-white/10 text-slate-200',
  }

  const valueColors = {
    blue: 'text-blue-400',
    cyan: 'text-cyan-400',
    green: 'text-emerald-400',
    amber: 'text-amber-400',
    red: 'text-red-400',
    slate: 'text-white',
  }

  return (
    <div className={`border rounded-xl p-3 flex flex-col justify-between ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="text-xs font-medium uppercase tracking-wider opacity-60 mb-2">{label}</div>
      <div className="flex items-baseline gap-1.5">
        <span className={`text-xl font-bold tracking-tight ${valueColors[color as keyof typeof valueColors]}`}>{value}</span>
        <span className="text-xs font-medium opacity-60">{unit}</span>
      </div>
    </div>
  )
}
