'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Database, Plus, Minus, Server, Activity, RefreshCw, Layers } from 'lucide-react'

// --- Types ---
interface RingNode {
  id: string
  name: string
  angle: number // 0-360 mapped on ring
  color: string
  isVirtual?: boolean
  ownerId?: string // If virtual, points to physical server
}

interface DataKey {
  id: string
  name: string
  angle: number // 0-360
  assignedNodeId: string | null
}

const COLORS = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316']

// Generate a random angle (0-360)
const randAngle = () => Math.floor(Math.random() * 360)

export default function ConsistentHashingPlayground() {
  const [mounted, setMounted] = useState(false)
  const [servers, setServers] = useState<RingNode[]>([])
  const [keys, setKeys] = useState<DataKey[]>([])
  const [useVirtualNodes, setUseVirtualNodes] = useState(false)
  
  // Stats
  const [rebalanceCount, setRebalanceCount] = useState(0)

  // Initialization
  useEffect(() => {
    setMounted(true)
    // Add initial 4 servers
    const initialServers: RingNode[] = Array.from({ length: 4 }).map((_, i) => ({
      id: `s-${i}`,
      name: `Server ${i + 1}`,
      angle: (i * 90) + (Math.random() * 20 - 10), // Evenly spread initially
      color: COLORS[i % COLORS.length]
    }))
    
    // Add initial 15 keys
    const initialKeys: DataKey[] = Array.from({ length: 15 }).map((_, i) => ({
      id: `k-${i}`,
      name: `Key ${i + 1}`,
      angle: randAngle(),
      assignedNodeId: null
    }))
    
    setServers(initialServers)
    setKeys(initialKeys)
  }, [])

  // Virtual Node Generation
  const activeRingNodes = useMemo(() => {
    if (!useVirtualNodes) return servers
    
    const virtualNodes: RingNode[] = []
    servers.forEach(s => {
      // 3 virtual nodes per server for visualization
      for (let i = 0; i < 3; i++) {
        virtualNodes.push({
          id: `${s.id}-v${i}`,
          name: `${s.name} (v${i+1})`,
          angle: (s.angle + (i * 120) + (Math.random()*30)) % 360,
          color: s.color,
          isVirtual: true,
          ownerId: s.id
        })
      }
    })
    return virtualNodes
  }, [servers, useVirtualNodes])

  // Map keys to closest node (clockwise) whenever nodes or keys change
  useEffect(() => {
    if (activeRingNodes.length === 0 || keys.length === 0) return

    // Sort nodes by angle
    const sortedNodes = [...activeRingNodes].sort((a, b) => a.angle - b.angle)

    setKeys(prevKeys => {
      let changed = false
      const newKeys = prevKeys.map(k => {
        // Find first node with angle >= key.angle
        let targetNode = sortedNodes.find(n => n.angle >= k.angle)
        // Wraparound
        if (!targetNode) targetNode = sortedNodes[0]

        const actualNodeId = targetNode.ownerId || targetNode.id
        if (k.assignedNodeId !== actualNodeId) changed = true

        return { ...k, assignedNodeId: actualNodeId }
      })

      if (changed && mounted) {
        setRebalanceCount(c => c + 1)
      }
      return changed ? newKeys : prevKeys
    })
  }, [activeRingNodes, keys.length, mounted])

  // Actions
  const addServer = () => {
    if (servers.length >= 8) return
    const newId = `s-${Date.now()}`
    setServers([...servers, {
      id: newId,
      name: `Server ${servers.length + 1}`,
      angle: randAngle(),
      color: COLORS[servers.length % COLORS.length]
    }])
  }

  const removeServer = () => {
    if (servers.length <= 1) return
    // Remove last server
    setServers(servers.slice(0, -1))
  }

  const addKeys = () => {
    const newKeys: DataKey[] = Array.from({ length: 5 }).map((_, i) => ({
      id: `k-${Date.now()}-${i}`,
      name: `Key +`,
      angle: randAngle(),
      assignedNodeId: null
    }))
    setKeys([...keys, ...newKeys])
  }

  if (!mounted) return null

  // Calculate distribution stats
  const distribution = servers.map(s => {
    const count = keys.filter(k => k.assignedNodeId === s.id).length
    return { name: s.name, color: s.color, count, percentage: Math.round((count / Math.max(keys.length, 1)) * 100) }
  })

  // StdDev for unevenness
  const avg = keys.length / Math.max(servers.length, 1)
  const variance = distribution.reduce((acc, d) => acc + Math.pow(d.count - avg, 2), 0) / Math.max(servers.length, 1)
  const stdDev = Math.sqrt(variance)

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Premium Background Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[30%] -left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-600/10 blur-[120px]" />
        <div className="absolute top-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[100px]" />
      </div>

      <div className="relative z-10 bg-white/5 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <RefreshCw className="w-6 h-6 text-emerald-400" /> Consistent Hashing
            </h1>
            <p className="text-sm sm:text-base text-slate-400 font-medium">
              Distribute data evenly across nodes while minimizing data remapping
            </p>
          </div>
          
          <div className="flex items-center gap-3">
             <button
               onClick={() => setUseVirtualNodes(!useVirtualNodes)}
               className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                 useVirtualNodes 
                   ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
                   : 'bg-slate-800 text-slate-400 border-white/10 hover:bg-slate-700'
               }`}
             >
               <Layers className="w-4 h-4" />
               Virtual Nodes (VNodes) {useVirtualNodes ? 'ON' : 'OFF'}
             </button>
          </div>
        </div>
      </div>

      <div className="flex-1 relative z-10 p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto w-full">
        
        {/* Ring Visualization */}
        <div className="w-full lg:w-2/3 h-[500px] lg:h-auto bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl relative flex items-center justify-center p-8">
           
           {/* Controls overlay */}
           <div className="absolute top-6 left-6 flex gap-2 z-20">
              <button 
                onClick={addServer}
                disabled={servers.length >= 8}
                className="p-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 rounded-lg hover:bg-emerald-500/30 disabled:opacity-50 transition-colors"
                title="Add Server"
              >
                <Plus className="w-5 h-5" />
              </button>
              <button 
                onClick={removeServer}
                disabled={servers.length <= 1}
                className="p-2 bg-rose-500/20 text-rose-400 border border-rose-500/50 rounded-lg hover:bg-rose-500/30 disabled:opacity-50 transition-colors"
                title="Remove Server"
              >
                <Minus className="w-5 h-5" />
              </button>
              <button 
                onClick={addKeys}
                className="p-2 bg-blue-500/20 text-blue-400 border border-blue-500/50 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center gap-1 px-3"
              >
                <Database className="w-4 h-4" /> Add Keys
              </button>
           </div>

           {/* The Hash Ring */}
           <div className="relative w-full max-w-[400px] aspect-square rounded-full border-[10px] border-slate-800 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] bg-slate-900/50">
             
             {/* Center Label */}
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
               <span className="text-2xl font-bold tracking-widest text-slate-700">HASH RING</span>
               <span className="text-sm text-slate-500">{activeRingNodes.length} Nodes</span>
             </div>

             {/* Node Positions on Ring */}
             <AnimatePresence>
               {activeRingNodes.map(node => {
                 // Convert Polar to Cartesian
                 const radius = 50 // %
                 const angleRad = (node.angle - 90) * (Math.PI / 180)
                 const x = 50 + radius * Math.cos(angleRad)
                 const y = 50 + radius * Math.sin(angleRad)

                 return (
                   <motion.div
                     key={node.id}
                     initial={{ scale: 0, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1, left: `${x}%`, top: `${y}%` }}
                     exit={{ scale: 0, opacity: 0 }}
                     transition={{ type: 'spring', damping: 15 }}
                     className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-20"
                     style={{ zIndex: 20 }}
                   >
                     <div 
                       className={`w-6 h-6 rounded border-2 shadow-xl flex items-center justify-center ${node.isVirtual ? 'opacity-80 scale-75 rounded-full' : ''}`}
                       style={{ backgroundColor: `${node.color}20`, borderColor: node.color }}
                     >
                       <Server className="w-3 h-3" style={{ color: node.color }} />
                     </div>
                   </motion.div>
                 )
               })}
             </AnimatePresence>

             {/* Keys Assignments */}
             <AnimatePresence>
               {keys.map(key => {
                 const radius = 35 // Inner orbit for keys
                 const angleRad = (key.angle - 90) * (Math.PI / 180)
                 const x = 50 + radius * Math.cos(angleRad)
                 const y = 50 + radius * Math.sin(angleRad)

                 // Find the server color this key maps to
                 const server = servers.find(s => s.id === key.assignedNodeId)
                 const color = server?.color || '#cbd5e1'

                 return (
                   <motion.div
                     key={key.id}
                     initial={{ scale: 0, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1, left: `${x}%`, top: `${y}%` }}
                     className="absolute w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 z-10 transition-colors duration-500 shadow-md"
                     style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}80` }}
                   />
                 )
               })}
             </AnimatePresence>
             
             {/* Render connection lines (Clockwise) from node to previous node for color arcs */}
             <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none opacity-20">
               {/* Decorative ticks */}
               {Array.from({length: 36}).map((_, i) => (
                 <line 
                   key={i}
                   x1="50%" y1="0%" x2="50%" y2="5%" 
                   stroke="rgba(255,255,255,0.1)" strokeWidth="2"
                   transform={`rotate(${i * 10} 200 200)`}
                   transform-origin="center"
                 />
               ))}
             </svg>

             {/* Hash degrees marks */}
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-slate-600 font-mono">0</div>
             <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-600 font-mono">180</div>
             <div className="absolute top-1/2 -right-8 -translate-y-1/2 text-xs text-slate-600 font-mono">90</div>
             <div className="absolute top-1/2 -left-8 -translate-y-1/2 text-xs text-slate-600 font-mono">270</div>
           </div>
        </div>

        {/* Info & Stats Panel */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
             <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
               <Activity className="w-5 h-5 text-indigo-400" /> Distribution Variance
             </h3>
             <p className="text-slate-400 text-sm mb-6 leading-relaxed">
               Adding/Removing servers triggers a rebalance. Without virtual nodes, data can clump unevenly. 
               Toggle Virtual Nodes to see the standard deviation drop, indicating an even load spread.
             </p>
             
             <div className="grid grid-cols-2 gap-4 mb-6">
               <div className="bg-slate-950 border border-white/5 rounded-xl p-4">
                 <div className="text-sm text-slate-500 mb-1 font-semibold">Total Keys</div>
                 <div className="text-2xl font-mono text-white tracking-wider">{keys.length}</div>
               </div>
               <div className="bg-slate-950 border border-white/5 rounded-xl p-4">
                 <div className="text-sm text-slate-500 mb-1 font-semibold">Remap Count</div>
                 <div className="text-2xl font-mono text-blue-400 tracking-wider flex items-center gap-1">
                   {rebalanceCount}
                   {rebalanceCount > 0 && <motion.div initial={{opacity:1}} animate={{opacity:0}} className="w-2 h-2 rounded-full bg-blue-500 ml-1" />}
                 </div>
               </div>
               <div className="col-span-2 bg-slate-950 border border-white/5 rounded-xl p-4 flex items-center justify-between">
                 <div className="text-sm text-slate-500 font-semibold">Standard Deviation (Lower = Even)</div>
                 <div className={`text-xl font-mono font-bold tracking-wider ${stdDev < 1.5 ? 'text-emerald-400' : stdDev > 3 ? 'text-rose-400' : 'text-amber-400'}`}>
                   {stdDev.toFixed(2)}
                 </div>
               </div>
             </div>
          </div>

          <div className="flex-1 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col overflow-hidden">
             <h3 className="text-lg font-bold text-white mb-4">Server Load Spread</h3>
             <div className="flex-1 overflow-y-auto pr-2 space-y-4">
               <AnimatePresence>
                 {distribution.map(node => (
                   <motion.div 
                     key={node.name}
                     layout
                     initial={{opacity: 0, x: -20}}
                     animate={{opacity: 1, x: 0}}
                     exit={{opacity: 0, scale: 0.9}}
                     className="bg-slate-950/50 p-3 rounded-xl border border-white/5"
                   >
                     <div className="flex justify-between text-sm mb-2">
                       <div className="flex items-center gap-2 text-slate-300 font-medium">
                         <div className="w-3 h-3 rounded-full shadow-lg" style={{ backgroundColor: node.color }} />
                         {node.name}
                       </div>
                       <div className="font-mono text-slate-400">
                         {node.count} keys ({node.percentage}%)
                       </div>
                     </div>
                     <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                       <motion.div 
                         className="h-full rounded-full transition-all duration-500 ease-out"
                         style={{ width: `${node.percentage}%`, backgroundColor: node.color }}
                       />
                     </div>
                   </motion.div>
                 ))}
               </AnimatePresence>
             </div>
          </div>
        </div>

      </div>
    </div>
  )
}
