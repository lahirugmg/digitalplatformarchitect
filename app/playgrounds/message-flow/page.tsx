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
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[100px]" />
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/5 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-1 tracking-tight text-white flex items-center gap-2">
              <span className="text-2xl">⚡</span> Message Flow Animation
            </h1>
            <p className="text-sm sm:text-base text-slate-400 font-medium">Watch messages flow between services with different patterns</p>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-6 py-2 rounded-lg font-bold transition-all text-sm shadow-lg flex items-center gap-2 ${isRunning
                  ? 'bg-red-500/80 hover:bg-red-500 text-white shadow-red-500/20 border border-red-500/50'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20 border border-blue-500/50'
                }`}
              aria-label={isRunning ? 'Stop sending messages' : 'Send messages'}
            >
              {isRunning ? '⏹ Stop' : '▶ Send Messages'}
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg font-medium transition-all text-sm text-slate-300 flex items-center gap-2"
              aria-label="Reset message flow"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Pattern Selector */}
        <div className="hidden sm:block w-72 bg-white/5 backdrop-blur-xl border-r border-white/10 p-5 overflow-y-auto" role="navigation" aria-label="Pattern selector">
          <h3 className="font-bold mb-5 text-xs uppercase tracking-wider text-slate-400">Integration Patterns</h3>

          <div className="space-y-3">
            {patterns.map((pattern) => (
              <button
                key={pattern.id}
                onClick={() => setSelectedPattern(pattern.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group ${selectedPattern === pattern.id
                    ? 'border-blue-500/50 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                  }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className={`flex items-center justify-center w-8 h-8 rounded-lg text-lg transition-colors ${selectedPattern === pattern.id ? 'bg-blue-500/20 text-blue-400' : 'bg-white/10 text-slate-300 group-hover:text-white'}`}>
                    {pattern.icon}
                  </span>
                  <span className={`font-semibold tracking-tight ${selectedPattern === pattern.id ? 'text-blue-300' : 'text-slate-200 group-hover:text-white'}`}>
                    {pattern.name}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">{pattern.description}</p>
              </button>
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <h4 className="font-bold mb-3 text-sm text-blue-400 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              How It Works
            </h4>
            <ul className="text-xs text-blue-200/70 space-y-2">
              <li className="flex items-start gap-2"><span className="text-blue-500">•</span> Select a pattern from above</li>
              <li className="flex items-start gap-2"><span className="text-blue-500">•</span> Click "Send Messages"</li>
              <li className="flex items-start gap-2"><span className="text-blue-500">•</span> Watch animation flow</li>
              <li className="flex items-start gap-2"><span className="text-blue-500">•</span> Compare sync vs async behavior</li>
            </ul>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative bg-[#0f172a]">
          <div className="absolute inset-0 z-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
          <MessageFlowCanvas key={resetKey} pattern={selectedPattern} isRunning={isRunning} />
        </div>

        {/* Info Panel */}
        <div className="hidden lg:block w-80 bg-white/5 backdrop-blur-xl border-l border-white/10 p-5 overflow-y-auto" role="complementary" aria-label="Pattern details">
          <h3 className="font-bold mb-5 flex items-center gap-2 text-slate-200">
            <span className="text-xl">📖</span> Pattern Details
          </h3>

          <div className="space-y-5">
            {selectedPattern === 'point-to-point' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-4">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                  <h4 className="font-bold text-sm text-blue-400 mb-2">Point-to-Point</h4>
                  <p className="text-sm text-blue-200/80 leading-relaxed">
                    Direct communication between sender and receiver. Message goes to exactly one consumer.
                  </p>
                </div>
                <div className="text-sm bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                  <div className="flex flex-col gap-1"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Use When</span> <span className="text-slate-300">One-to-one communication needed</span></div>
                  <div className="flex flex-col gap-1"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Behavior</span> <span className="text-slate-300">Synchronous, blocking</span></div>
                  <div className="flex flex-col gap-1"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Coupling</span> <span className="text-rose-400/90 font-medium">Tight coupling</span></div>
                  <div className="flex flex-col gap-1"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Example</span> <span className="text-slate-300">REST API calls</span></div>
                </div>
              </div>
            )}

            {selectedPattern === 'pub-sub' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-4">
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                  <h4 className="font-bold text-sm text-purple-400 mb-2">Publish/Subscribe</h4>
                  <p className="text-sm text-purple-200/80 leading-relaxed">
                    Publisher broadcasts messages to multiple subscribers. Subscribers receive all messages.
                  </p>
                </div>
                <div className="text-sm bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                  <div className="flex flex-col gap-1"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Use When</span> <span className="text-slate-300">Multiple consumers need same data</span></div>
                  <div className="flex flex-col gap-1"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Behavior</span> <span className="text-slate-300">Asynchronous, non-blocking</span></div>
                  <div className="flex flex-col gap-1"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Coupling</span> <span className="text-emerald-400/90 font-medium">Loose coupling</span></div>
                  <div className="flex flex-col gap-1"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Example</span> <span className="text-slate-300">Event notifications, updates</span></div>
                </div>
              </div>
            )}

            {selectedPattern === 'request-reply' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-4">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                  <h4 className="font-bold text-sm text-emerald-400 mb-2">Request/Reply</h4>
                  <p className="text-sm text-emerald-200/80 leading-relaxed">
                    Client sends request and waits for response. Bidirectional communication.
                  </p>
                </div>
                <div className="text-sm bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                  <div className="flex flex-col gap-1"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Use When</span> <span className="text-slate-300">Need confirmation or response data</span></div>
                  <div className="flex flex-col gap-1"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Behavior</span> <span className="text-slate-300">Synchronous request, async possible</span></div>
                  <div className="flex flex-col gap-1"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Coupling</span> <span className="text-amber-400/90 font-medium">Medium coupling</span></div>
                  <div className="flex flex-col gap-1"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Example</span> <span className="text-slate-300">API calls with response</span></div>
                </div>
              </div>
            )}

            {selectedPattern === 'event-driven' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-4">
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                  <h4 className="font-bold text-sm text-amber-400 mb-2">Event-Driven</h4>
                  <p className="text-sm text-amber-200/80 leading-relaxed">
                    Events are emitted when state changes. Multiple listeners can react independently.
                  </p>
                </div>
                <div className="text-sm bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                  <div className="flex flex-col gap-1"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Use When</span> <span className="text-slate-300">Reactive, event-based architecture</span></div>
                  <div className="flex flex-col gap-1"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Behavior</span> <span className="text-slate-300">Fully asynchronous</span></div>
                  <div className="flex flex-col gap-1"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Coupling</span> <span className="text-emerald-400/90 font-medium">Very loose coupling</span></div>
                  <div className="flex flex-col gap-1"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Example</span> <span className="text-slate-300">Order placed → Inventory & Shipping react</span></div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 p-4 border border-white/10 bg-white/5 rounded-xl">
            <h4 className="font-bold text-sm mb-4 text-slate-300 flex items-center gap-2">
              <span className="text-lg">📊</span> Comparison Matrix
            </h4>
            <div className="text-sm space-y-3">
              <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
                <span className="text-slate-400 font-medium">Latency</span>
                <span className="font-mono font-bold text-blue-300 border border-blue-400/20 bg-blue-500/10 px-2 py-0.5 rounded">
                  {selectedPattern === 'point-to-point' && '50ms'}
                  {selectedPattern === 'pub-sub' && '100ms'}
                  {selectedPattern === 'request-reply' && '75ms'}
                  {selectedPattern === 'event-driven' && '120ms'}
                </span>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
                <span className="text-slate-400 font-medium">Coupling</span>
                <span className={`font-medium px-2 py-0.5 rounded ${selectedPattern === 'point-to-point' ? 'bg-rose-500/20 text-rose-300' :
                    selectedPattern === 'pub-sub' ? 'bg-emerald-500/20 text-emerald-300' :
                      selectedPattern === 'request-reply' ? 'bg-amber-500/20 text-amber-300' :
                        'bg-emerald-500/20 text-emerald-300'
                  }`}>
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
