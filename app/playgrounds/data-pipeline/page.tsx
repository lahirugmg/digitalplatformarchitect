'use client'

import { useState } from 'react'
import { Node, Edge } from 'reactflow'
import DataPipelineCanvas from './components/DataPipelineCanvas'
import ExportModal from './components/ExportModal'

export default function DataPipelinePlayground() {
  const [isRunning, setIsRunning] = useState(false)
  const [metrics, setMetrics] = useState<any>(null)
  const [validation, setValidation] = useState<any>(null)
  const [showExportModal, setShowExportModal] = useState(false)
  const [currentNodes, setCurrentNodes] = useState<Node[]>([])
  const [currentEdges, setCurrentEdges] = useState<Edge[]>([])

  const handleReset = () => {
    window.location.reload()
  }

  const handleExport = () => {
    if (currentNodes.length === 0) {
      alert('⚠️ Add some components to your pipeline first!')
      return
    }
    setShowExportModal(true)
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">🌊 Data Pipeline Choreography</h1>
            <p className="text-slate-600">Build data pipelines and watch data flow like water</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition shadow-md flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export IaC
            </button>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                isRunning
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              disabled={!validation?.hasSource}
            >
              {isRunning ? '⏸️ Stop' : '▶️ Run Pipeline'}
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-2 border border-slate-300 rounded-lg font-medium hover:bg-slate-50"
            >
              🔄 Reset
            </button>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          nodes={currentNodes}
          edges={currentEdges}
          onClose={() => setShowExportModal(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar - Component Library */}
        <div className="w-64 bg-white border-r border-slate-200 p-4 overflow-y-auto">
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
          />
        </div>
        {/* Right Panel - Challenge & Metrics */}
        <div className="w-80 bg-white border-l border-slate-200 p-4 overflow-y-auto">
          {/* Challenge Progress */}
          <div className="mb-6">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <span>🎯</span> Challenge Progress
            </h3>
            <div className="space-y-2 text-sm">
              <ChecklistItem
                checked={validation?.hasSource}
                label="Add data source"
              />
              <ChecklistItem
                checked={validation?.hasStreaming}
                label="Add streaming platform (Kafka)"
              />
              <ChecklistItem
                checked={validation?.hasTransformation}
                label="Add transformation step"
              />
              <ChecklistItem
                checked={validation?.hasStorage}
                label="Add storage layer"
              />
              <ChecklistItem
                checked={validation?.hasAnalytics}
                label="Connect analytics engine"
              />
            </div>

            {validation?.isComplete && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center gap-2 text-green-700 font-semibold">
                  <span>✅</span> Challenge Complete!
                </div>
                <p className="text-sm text-green-600 mt-1">
                  Great job! You've built a complete data pipeline.
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
            <div className="mb-6">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <span>📊</span> Live Metrics
              </h3>
              <div className="space-y-3">
                <MetricCard
                  label="Throughput"
                  value={`${(metrics.throughput / 1000).toFixed(1)}K`}
                  unit="events/sec"
                  color="blue"
                />
                <MetricCard
                  label="Latency"
                  value={metrics.latency}
                  unit="ms"
                  color="cyan"
                />
                <MetricCard
                  label="Data Quality"
                  value={metrics.quality}
                  unit="%"
                  color={metrics.quality >= 90 ? 'green' : metrics.quality >= 70 ? 'amber' : 'red'}
                />
                <MetricCard
                  label="Monthly Cost"
                  value={`$${metrics.monthlyCost.toLocaleString()}`}
                  unit="/month"
                  color="slate"
                />
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
      className="bg-white border border-slate-200 rounded-lg p-3 cursor-move hover:shadow-md hover:border-blue-300 transition"
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl">{icon}</span>
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
    <div className="flex items-center gap-2">
      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
        checked ? 'bg-green-500 border-green-500' : 'border-slate-300'
      }`}>
        {checked && <span className="text-white text-xs">✓</span>}
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
