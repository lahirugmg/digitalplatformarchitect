'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldAlert, Droplets, Target, Clock, ArrowRight, Play, Square, Activity, Filter } from 'lucide-react'

type Algorithm = 'token-bucket' | 'leaking-bucket' | 'fixed-window'
type RequestStatus = 'pending' | 'allowed' | 'dropped'

interface RequestRecord {
  id: number
  time: number
  status: RequestStatus
}

export default function RateLimiterPlayground() {
  const [activeAlgo, setActiveAlgo] = useState<Algorithm>('token-bucket')
  const [isRunning, setIsRunning] = useState(false)
  
  // Stats
  const [allowedCount, setAllowedCount] = useState(0)
  const [droppedCount, setDroppedCount] = useState(0)
  const [logs, setLogs] = useState<RequestRecord[]>([])

  // Controls
  const [burstMode, setBurstMode] = useState(false)

  // Simulation State Refs
  const tokensRef = useRef(5) // Token Bucket (max 5)
  const queueRef = useRef<number>(0) // Leaking Bucket queue count (max 5)
  const windowCountRef = useRef(0) // Fixed window count (max 5 per window)
  const windowStartRef = useRef(Date.now())

  // Force re-renders for visualization
  const [tick, setTick] = useState(0)

  // Reset function
  const resetSimulation = () => {
    setAllowedCount(0)
    setDroppedCount(0)
    setLogs([])
    tokensRef.current = 5
    queueRef.current = 0
    windowCountRef.current = 0
    windowStartRef.current = Date.now()
    setIsRunning(false)
    setTick(0)
  }

  // Change Algorithm
  useEffect(() => {
    resetSimulation()
  }, [activeAlgo])

  // Refill tokens / Process Queue / Window Reset Loop
  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      const now = Date.now()

      if (activeAlgo === 'token-bucket') {
        if (tokensRef.current < 5) tokensRef.current += 1
      } 
      else if (activeAlgo === 'leaking-bucket') {
        if (queueRef.current > 0) {
          queueRef.current -= 1
          setAllowedCount(c => c + 1) // Process 1 from queue
        }
      } 
      else if (activeAlgo === 'fixed-window') {
        // Reset window every 5 seconds
        if (now - windowStartRef.current > 5000) {
          windowCountRef.current = 0
          windowStartRef.current = now
        }
      }

      setTick(prev => prev + 1)
    }, 1000) // 1 tick per second

    return () => clearInterval(interval)
  }, [isRunning, activeAlgo])

  // Incoming Request Simulation
  useEffect(() => {
    if (!isRunning) return
    
    // In burst mode, send requests much faster
    const requestInterval = burstMode ? 300 : 1500

    const interval = setInterval(() => {
      handleIncomingRequest()
    }, requestInterval)

    return () => clearInterval(interval)
  }, [isRunning, burstMode, activeAlgo])

  const handleIncomingRequest = () => {
    const id = Date.now()
    let status: RequestStatus = 'pending'

    if (activeAlgo === 'token-bucket') {
      if (tokensRef.current > 0) {
        tokensRef.current -= 1
        status = 'allowed'
        setAllowedCount(c => c + 1)
      } else {
        status = 'dropped'
        setDroppedCount(c => c + 1)
      }
    } 
    else if (activeAlgo === 'leaking-bucket') {
      if (queueRef.current < 5) {
        queueRef.current += 1
        status = 'pending' // Enqueued, allowed later via interval
      } else {
        status = 'dropped'
        setDroppedCount(c => c + 1)
      }
    } 
    else if (activeAlgo === 'fixed-window') {
      if (windowCountRef.current < 5) {
        windowCountRef.current += 1
        status = 'allowed'
        setAllowedCount(c => c + 1)
      } else {
        status = 'dropped'
        setDroppedCount(c => c + 1)
      }
    }

    setLogs(prev => [...prev.slice(-14), { id, time: id, status }])
    setTick(prev => prev + 1)
  }

  const algorithms = [
    { id: 'token-bucket', label: 'Token Bucket', icon: Droplets, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { id: 'leaking-bucket', label: 'Leaking Bucket', icon: Filter, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { id: 'fixed-window', label: 'Fixed Window', icon: Target, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  ] as const

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Premium Background Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 bg-white/5 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-rose-500" /> Rate Limiter Algorithms
            </h1>
            <p className="text-sm sm:text-base text-slate-400 font-medium">
              Simulate API traffic control mechanisms to prevent overload
            </p>
          </div>
          
          <div className="flex p-1 bg-slate-900/50 rounded-xl border border-white/10 overflow-x-auto w-full sm:w-auto">
            {algorithms.map((algo) => (
              <button
                key={algo.id}
                onClick={() => setActiveAlgo(algo.id as Algorithm)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeAlgo === algo.id
                    ? `bg-slate-800 text-white shadow-lg border border-slate-700`
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <algo.icon className={`w-4 h-4 ${activeAlgo === algo.id ? algo.color : ''}`} />
                {algo.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 relative z-10 p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-7xl mx-auto w-full">
        
        {/* Controls & Stats Dashboard */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-lg font-bold text-white mb-1">Traffic Simulator</h2>
                <p className="text-sm text-slate-400">Control incoming request volume.</p>
              </div>
              <div className="flex gap-2">
                 <button
                   onClick={() => setIsRunning(!isRunning)}
                   className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                     isRunning ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50 hover:bg-rose-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/30'
                   }`}
                 >
                   {isRunning ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                   {isRunning ? 'Stop Traffic' : 'Start Traffic'}
                 </button>
                 <button
                   onClick={resetSimulation}
                   className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-semibold text-slate-300 transition-colors"
                 >
                   Reset
                 </button>
              </div>
            </div>

            <div className="bg-slate-950 border border-white/5 rounded-xl p-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-300 mb-1">Traffic Mode</h3>
                <p className="text-xs text-slate-500">{burstMode ? 'High volume bursts (3.3 req/sec)' : 'Steady normal traffic (0.6 req/sec)'}</p>
              </div>
              <button
                onClick={() => setBurstMode(!burstMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${burstMode ? 'bg-rose-500' : 'bg-slate-600'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${burstMode ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col justify-center gap-4">
             <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex justify-between items-center">
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-emerald-500/20 rounded-lg"><Activity className="w-5 h-5 text-emerald-400" /></div>
                 <span className="font-semibold text-emerald-100">Allowed</span>
               </div>
               <span className="text-2xl font-bold font-mono text-emerald-400">{allowedCount}</span>
             </div>
             
             <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 flex justify-between items-center">
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-rose-500/20 rounded-lg"><ShieldAlert className="w-5 h-5 text-rose-400" /></div>
                 <span className="font-semibold text-rose-100">Dropped (429)</span>
               </div>
               <span className="text-2xl font-bold font-mono text-rose-400">{droppedCount}</span>
             </div>
          </div>
        </div>

        {/* Visualizer Area */}
        <div className="flex-1 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl min-h-[400px] flex flex-col relative">
          <div className="p-4 bg-black/40 border-b border-white/5 flex justify-between items-center z-10">
             <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-semibold text-slate-300">Live Visualization</span>
             </div>
             <span className="text-xs text-slate-500 font-mono tracking-widest uppercase">
               {activeAlgo.replace('-', ' ')}
             </span>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-0">
             {/* Dynamic Render based on Active Algo */}
             <AnimatePresence mode="wait">
                <motion.div
                  key={activeAlgo}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-2xl"
                >
                  {activeAlgo === 'token-bucket' && (
                    <TokenBucketViz tokens={tokensRef.current} tick={tick} />
                  )}
                  {activeAlgo === 'leaking-bucket' && (
                    <LeakingBucketViz queue={queueRef.current} tick={tick} />
                  )}
                  {activeAlgo === 'fixed-window' && (
                    <FixedWindowViz count={windowCountRef.current} windowStart={windowStartRef.current} tick={tick} />
                  )}
                </motion.div>
             </AnimatePresence>
          </div>

          {/* Request Log Feed */}
          <div className="h-24 bg-black/40 border-t border-white/5 p-4 flex items-center gap-2 overflow-x-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-900/80 to-transparent z-10" />
            <AnimatePresence>
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: 50, scale: 0.5 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  layout
                  className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg shadow-lg border ${
                    log.status === 'allowed' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' :
                    log.status === 'dropped' ? 'bg-rose-500/20 border-rose-500/50 text-rose-400' :
                    'bg-amber-500/20 border-amber-500/50 text-amber-400 animate-pulse' // pending
                  }`}
                >
                  {log.status === 'allowed' && <ArrowRight className="w-4 h-4" />}
                  {log.status === 'dropped' && <Square className="w-3 h-3 fill-current" />}
                  {log.status === 'pending' && <Clock className="w-4 h-4" />}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  )
}

function TokenBucketViz({ tokens, tick }: { tokens: number, tick: number }) {
  const maxTokens = 5
  
  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 text-center max-w-lg">
         <h3 className="text-lg font-bold text-blue-400 mb-2">Token Bucket Concept</h3>
         <p className="text-sm text-slate-400">
           Tokens are added to the bucket periodically (1 per sec). Each request consumes 1 token. 
           If the bucket is empty, the request is dropped. Good for handling sudden traffic bursts.
         </p>
      </div>
      
      <div className="relative">
        {/* Bucket Outline */}
        <div className="w-48 h-48 border-4 border-t-0 border-blue-500/50 rounded-b-3xl relative overflow-hidden bg-blue-900/10 backdrop-blur-sm shadow-[0_10px_40px_rgba(59,130,246,0.15)] flex flex-col-reverse p-4 gap-2">
           <AnimatePresence>
             {Array.from({ length: tokens }).map((_, i) => (
               <motion.div
                 key={`token-${tick}-${i}`}
                 initial={{ y: -50, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 exit={{ opacity: 0, scale: 0 }}
                 className="w-full h-6 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50 flex items-center justify-center"
               >
                 <Droplets className="w-4 h-4 text-white" />
               </motion.div>
             ))}
           </AnimatePresence>
        </div>
        
        {/* Helper labels */}
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-mono">
          <div>Capacity: {maxTokens}</div>
          <div>Current: <span className="text-blue-400 font-bold">{tokens}</span></div>
          <div>Refill: 1/sec</div>
        </div>
      </div>
    </div>
  )
}

function LeakingBucketViz({ queue, tick }: { queue: number, tick: number }) {
  const maxSize = 5

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 text-center max-w-lg">
         <h3 className="text-lg font-bold text-purple-400 mb-2">Leaking Bucket Concept</h3>
         <p className="text-sm text-slate-400">
           Requests are added to a queue (bucket). They are processed at a steady, fixed rate (leaking). 
           If the queue is full, new requests are dropped. Smooths out traffic to downstream services.
         </p>
      </div>

      <div className="relative">
        <div className="w-48 h-48 border-4 border-t-0 border-purple-500/50 rounded-b-3xl relative overflow-hidden bg-purple-900/10 backdrop-blur-sm shadow-[0_10px_40px_rgba(168,85,247,0.15)] flex flex-col p-4 gap-2 justify-end">
           <AnimatePresence>
             {Array.from({ length: queue }).map((_, i) => (
               <motion.div
                 key={`req-${tick}-${i}`}
                 initial={{ y: -50, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 exit={{ y: 50, opacity: 0 }}
                 className="w-full h-6 rounded bg-purple-500 shadow-lg shadow-purple-500/50 flex items-center justify-center"
               >
                 <Activity className="w-4 h-4 text-white" />
               </motion.div>
             ))}
           </AnimatePresence>
        </div>
        
        {/* Leaking hole indicator */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4 h-8 border-x-2 border-purple-500/50" />
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-400 rounded-full animate-bounce shadow-[0_0_10px_#c084fc]" />

        <div className="absolute -right-32 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-mono">
          <div>Queue Size: {maxSize}</div>
          <div>Pending: <span className="text-purple-400 font-bold">{queue}</span></div>
          <div>Outflow: 1/sec</div>
        </div>
      </div>
    </div>
  )
}

function FixedWindowViz({ count, windowStart, tick }: { count: number, windowStart: number, tick: number }) {
  const maxPerWindow = 5
  // Calculate remaining time in 5s window (0 to 100%)
  const elapsed = Date.now() - windowStart
  const progress = Math.min((elapsed / 5000) * 100, 100)
  
  return (
    <div className="flex flex-col items-center w-full">
      <div className="mb-12 text-center max-w-lg">
         <h3 className="text-lg font-bold text-emerald-400 mb-2">Fixed Window Counter Concept</h3>
         <p className="text-sm text-slate-400">
           Time is divided into fixed windows (e.g., 5 seconds). Each request increments a counter.
           When the limit is reached, requests drop until the NEW window starts.
         </p>
      </div>

      <div className="w-full max-w-md relative">
        {/* Progress Bar for Time Window */}
        <div className="flex justify-between text-xs text-slate-500 mb-2 font-mono uppercase tracking-wider">
           <span>Window Start</span>
           <span className="text-emerald-400 font-bold">{Math.max(5 - Math.floor(elapsed/1000), 0)}s remaining</span>
           <span>Window End</span>
        </div>
        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden mb-8">
           <div 
             className="h-full bg-emerald-500/50 transition-all duration-100 ease-linear"
             style={{ width: `${progress}%` }}
           />
        </div>

        {/* Counter Slots */}
        <div className="grid grid-cols-5 gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div 
              key={i}
              className={`h-24 rounded-xl border-2 flex items-center justify-center transition-all ${
                i < count 
                  ? 'bg-emerald-500/20 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] scale-105' 
                  : 'bg-slate-800/50 border-white/5'
              }`}
            >
              {i < count ? (
                <Target className="w-8 h-8 text-emerald-400" />
              ) : (
                <span className="text-slate-600 font-mono text-sm">{i + 1}</span>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center text-sm font-mono text-slate-400">
           Limit: {maxPerWindow} / window | Current: <span className="text-emerald-400 font-bold text-lg">{count}</span>
        </div>
      </div>
    </div>
  )
}
