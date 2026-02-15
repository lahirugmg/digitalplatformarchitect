'use client'

import { useState } from 'react'
import { calculateCapacity, type CapacityInputs, type CapacityResults } from '@/lib/capacity-planning'
import { ResultsSummary } from './ResultsSummary'

export function CapacityCalculator() {
  const [inputs, setInputs] = useState<CapacityInputs>({
    messageSizeKB: 10,
    targetTPS: 1000,
    concurrentUsers: 500,
    peakMultiplier: 2,
    availabilityTarget: 99.9,
    readWriteRatio: 70
  })

  const results = calculateCapacity(inputs)

  const updateInput = (field: keyof CapacityInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Input Panel */}
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Workload Parameters</h2>

          {/* Message Size */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Average Message Size (KB)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="2048"
                step="1"
                value={inputs.messageSizeKB}
                onChange={(e) => updateInput('messageSizeKB', parseInt(e.target.value))}
                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="number"
                value={inputs.messageSizeKB}
                onChange={(e) => updateInput('messageSizeKB', parseInt(e.target.value) || 1)}
                className="w-24 px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {inputs.messageSizeKB < 10 ? 'Small messages (JSON events)' :
               inputs.messageSizeKB < 100 ? 'Medium messages (API responses)' :
               inputs.messageSizeKB < 1024 ? 'Large messages (documents)' :
               'Very large messages (files/images)'}
            </p>
          </div>

          {/* Target TPS */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Target Transactions Per Second (TPS)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="10"
                max="50000"
                step="10"
                value={inputs.targetTPS}
                onChange={(e) => updateInput('targetTPS', parseInt(e.target.value))}
                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="number"
                value={inputs.targetTPS}
                onChange={(e) => updateInput('targetTPS', parseInt(e.target.value) || 10)}
                className="w-24 px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Sustained throughput under normal conditions
            </p>
          </div>

          {/* Concurrent Users */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Concurrent Users
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="10"
                max="100000"
                step="10"
                value={inputs.concurrentUsers}
                onChange={(e) => updateInput('concurrentUsers', parseInt(e.target.value))}
                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="number"
                value={inputs.concurrentUsers}
                onChange={(e) => updateInput('concurrentUsers', parseInt(e.target.value) || 10)}
                className="w-24 px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Active connections at any given time
            </p>
          </div>

          {/* Peak Multiplier */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Peak Traffic Multiplier
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={inputs.peakMultiplier}
                onChange={(e) => updateInput('peakMultiplier', parseFloat(e.target.value))}
                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="number"
                step="0.1"
                value={inputs.peakMultiplier}
                onChange={(e) => updateInput('peakMultiplier', parseFloat(e.target.value) || 1)}
                className="w-24 px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Peak TPS: {(inputs.targetTPS * inputs.peakMultiplier).toLocaleString()}
            </p>
          </div>

          {/* Availability Target */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Availability Target (%)
            </label>
            <div className="flex gap-2">
              {[99, 99.9, 99.95, 99.99].map(target => (
                <button
                  key={target}
                  onClick={() => updateInput('availabilityTarget', target)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition ${
                    inputs.availabilityTarget === target
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {target}%
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {inputs.availabilityTarget >= 99.99 ? 'Downtime: ~52 min/year' :
               inputs.availabilityTarget >= 99.95 ? 'Downtime: ~4.4 hours/year' :
               inputs.availabilityTarget >= 99.9 ? 'Downtime: ~8.8 hours/year' :
               'Downtime: ~3.65 days/year'}
            </p>
          </div>

          {/* Read/Write Ratio */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Read Percentage (%)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={inputs.readWriteRatio}
                onChange={(e) => updateInput('readWriteRatio', parseInt(e.target.value))}
                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="number"
                value={inputs.readWriteRatio}
                onChange={(e) => updateInput('readWriteRatio', Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                className="w-24 px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Read: {inputs.readWriteRatio}% / Write: {100 - inputs.readWriteRatio}%
            </p>
          </div>
        </div>
      </div>

      {/* Results Panel */}
      <div className="space-y-6">
        <ResultsSummary results={results} inputs={inputs} />
      </div>
    </div>
  )
}
