'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import MessageFlowCanvas from './components/MessageFlowCanvas'

export default function MessageFlowPlayground() {
  const [isRunning, setIsRunning] = useState(false)
  const [selectedPattern, setSelectedPattern] = useState<string>('point-to-point')
  const [resetKey, setResetKey] = useState(0)

  const patterns = [
    { id: 'point-to-point', name: 'Point-to-Point', icon: '→', description: 'Direct message from sender to receiver' },
    { id: 'pub-sub', name: 'Pub/Sub', icon: '⚡', description: 'One publisher, multiple subscribers' },
    { id: 'request-reply', name: 'Request/Reply', icon: '↔', description: 'Synchronous request and response' },
    { id: 'event-driven', name: 'Event-Driven', icon: '📡', description: 'Events broadcast to interested parties' },
  ]

  const handleReset = () => {
    setIsRunning(false)
    setSelectedPattern('point-to-point')
    setResetKey(prev => prev + 1)
    toast.info('Message flow reset')
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-1">
              <span aria-hidden="true">⚡ </span>Message Flow Animation
            </h1>
            <p className="text-sm sm:text-base text-slate-600">Watch messages flow between services with different patterns</p>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isRunning
                  ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
                  : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
              }`}
              aria-label={isRunning ? 'Stop sending messages' : 'Send messages'}
            >
              {isRunning ? '⏸️ Stop' : '▶️ Send Messages'}
            </button>
            <button
              onClick={handleReset}
              className="px-4 sm:px-6 py-2 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Reset message flow"
            >
              🔄 Reset
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Pattern Selector */}
        <div className="hidden sm:block w-64 bg-white border-r border-slate-200 p-4 overflow-y-auto" role="navigation" aria-label="Pattern selector">
          <h3 className="font-bold mb-4 text-sm uppercase text-slate-500">Integration Patterns</h3>

          <div className="space-y-2">
            {patterns.map((pattern) => (
              <button
                key={pattern.id}
                onClick={() => setSelectedPattern(pattern.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition ${
                  selectedPattern === pattern.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{pattern.icon}</span>
                  <span className="font-semibold">{pattern.name}</span>
                </div>
                <p className="text-xs text-slate-600">{pattern.description}</p>
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">💡 How It Works</h4>
            <ul className="text-xs text-slate-700 space-y-1">
              <li>• Select a pattern from above</li>
              <li>• Click "Send Messages"</li>
              <li>• Watch message flow animation</li>
              <li>• Compare sync vs async behavior</li>
            </ul>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-slate-50">
          <MessageFlowCanvas key={resetKey} pattern={selectedPattern} isRunning={isRunning} />
        </div>

        {/* Info Panel */}
        <div className="hidden lg:block w-80 bg-white border-l border-slate-200 p-4 overflow-y-auto" role="complementary" aria-label="Pattern details">
          <h3 className="font-bold mb-3">Pattern Details</h3>

          {selectedPattern === 'point-to-point' && (
            <div className="space-y-3">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Point-to-Point</h4>
                <p className="text-sm text-slate-700">
                  Direct communication between sender and receiver. Message goes to exactly one consumer.
                </p>
              </div>
              <div className="text-sm space-y-2">
                <div><strong>Use When:</strong> One-to-one communication needed</div>
                <div><strong>Behavior:</strong> Synchronous, blocking</div>
                <div><strong>Coupling:</strong> Tight coupling between services</div>
                <div><strong>Example:</strong> REST API calls</div>
              </div>
            </div>
          )}

          {selectedPattern === 'pub-sub' && (
            <div className="space-y-3">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Publish/Subscribe</h4>
                <p className="text-sm text-slate-700">
                  Publisher broadcasts messages to multiple subscribers. Subscribers receive all messages.
                </p>
              </div>
              <div className="text-sm space-y-2">
                <div><strong>Use When:</strong> Multiple consumers need same data</div>
                <div><strong>Behavior:</strong> Asynchronous, non-blocking</div>
                <div><strong>Coupling:</strong> Loose coupling</div>
                <div><strong>Example:</strong> Event notifications, real-time updates</div>
              </div>
            </div>
          )}

          {selectedPattern === 'request-reply' && (
            <div className="space-y-3">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Request/Reply</h4>
                <p className="text-sm text-slate-700">
                  Client sends request and waits for response. Bidirectional communication.
                </p>
              </div>
              <div className="text-sm space-y-2">
                <div><strong>Use When:</strong> Need confirmation or response data</div>
                <div><strong>Behavior:</strong> Synchronous request, async possible</div>
                <div><strong>Coupling:</strong> Medium coupling</div>
                <div><strong>Example:</strong> API calls with response</div>
              </div>
            </div>
          )}

          {selectedPattern === 'event-driven' && (
            <div className="space-y-3">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Event-Driven</h4>
                <p className="text-sm text-slate-700">
                  Events are emitted when state changes. Multiple listeners can react independently.
                </p>
              </div>
              <div className="text-sm space-y-2">
                <div><strong>Use When:</strong> Reactive, event-based architecture</div>
                <div><strong>Behavior:</strong> Fully asynchronous</div>
                <div><strong>Coupling:</strong> Very loose coupling</div>
                <div><strong>Example:</strong> Order placed → Inventory, Shipping, Email all react</div>
              </div>
            </div>
          )}

          <div className="mt-6 p-3 border border-slate-200 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">📊 Comparison</h4>
            <div className="text-xs space-y-1">
              <div className="flex justify-between">
                <span>Latency:</span>
                <span className="font-mono">
                  {selectedPattern === 'point-to-point' && '50ms'}
                  {selectedPattern === 'pub-sub' && '100ms'}
                  {selectedPattern === 'request-reply' && '75ms'}
                  {selectedPattern === 'event-driven' && '120ms'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Coupling:</span>
                <span>
                  {selectedPattern === 'point-to-point' && 'Tight'}
                  {selectedPattern === 'pub-sub' && 'Loose'}
                  {selectedPattern === 'request-reply' && 'Medium'}
                  {selectedPattern === 'event-driven' && 'Very Loose'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
