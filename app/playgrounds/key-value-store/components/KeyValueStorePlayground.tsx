'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Database, Network, ShieldCheck, Zap, AlertTriangle, Layers, SplitSquareHorizontal, CheckCircle2, XCircle } from 'lucide-react'

type Tab = 'cap' | 'quorum' | 'vector'

export default function KeyValueStorePlayground() {
  const [activeTab, setActiveTab] = useState<Tab>('cap')

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Premium Background Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-emerald-600/10 blur-[100px]" />
      </div>

      <div className="relative z-10 bg-white/5 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Database className="w-6 h-6 text-blue-400" /> Distributed Key-Value Store
            </h1>
            <p className="text-sm sm:text-base text-slate-400 font-medium">
              Explore CAP Theorem tradeoffs, Quorum consistency tuning, and Vector Clocks
            </p>
          </div>
          
          <div className="flex p-1 bg-slate-900/50 rounded-xl border border-white/10">
            {[
              { id: 'cap', label: 'CAP Theorem', icon: SplitSquareHorizontal },
              { id: 'quorum', label: 'Quorum Tuning', icon: Layers },
              { id: 'vector', label: 'Vector Clocks', icon: Network }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/50 shadow-lg'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 relative z-10 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {activeTab === 'cap' && <CAPTheoremSection />}
            {activeTab === 'quorum' && <QuorumConsensusSection />}
            {activeTab === 'vector' && <VectorClockSection />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function CAPTheoremSection() {
  const [selected, setSelected] = useState<'CP' | 'AP' | 'CA' | null>(null)

  return (
    <div className="h-full flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl relative">
        <h2 className="absolute top-6 left-6 text-lg font-bold text-white tracking-widest uppercase">CAP Topology</h2>
        
        {/* Triangle Representation */}
        <div className="relative w-72 h-72 my-12">
           {/* Connecting Lines */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-slate-700 stroke-2">
             <line x1="144" y1="24" x2="24" y2="240" />
             <line x1="24" y1="240" x2="264" y2="240" />
             <line x1="264" y1="240" x2="144" y2="24" />
           </svg>

           {/* Nodes */}
           <div className="absolute top-[24px] left-[144px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
             <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
               <ShieldCheck className="w-8 h-8 text-emerald-400" />
             </div>
             <span className="font-bold text-emerald-400">Consistency (C)</span>
           </div>

           <div className="absolute top-[240px] left-[24px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
             <div className="w-16 h-16 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
               <Zap className="w-8 h-8 text-blue-400" />
             </div>
             <span className="font-bold text-blue-400">Availability (A)</span>
           </div>

           <div className="absolute top-[240px] left-[264px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
             <div className="w-16 h-16 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)]">
               <Network className="w-8 h-8 text-purple-400" />
             </div>
             <span className="font-bold text-purple-400 text-center">Partition<br/>Tolerance (P)</span>
           </div>

           {/* Edge Selectors */}
           <button 
             onClick={() => setSelected('CA')}
             className={`absolute top-[132px] left-[84px] -translate-x-full -translate-y-1/2 px-4 py-2 rounded-xl border backdrop-blur-md transition-all font-bold ${selected === 'CA' ? 'bg-amber-500/20 text-amber-500 border-amber-500/50 scale-110 shadow-xl' : 'bg-slate-800 text-slate-500 border-slate-700 hover:bg-slate-700'}`}
           >
             CA
           </button>
           <button 
             onClick={() => setSelected('CP')}
             className={`absolute top-[132px] right-[84px] translate-x-full -translate-y-1/2 px-4 py-2 rounded-xl border backdrop-blur-md transition-all font-bold ${selected === 'CP' ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/50 scale-110 shadow-xl' : 'bg-slate-800 text-slate-500 border-slate-700 hover:bg-slate-700'}`}
           >
             CP
           </button>
           <button 
             onClick={() => setSelected('AP')}
             className={`absolute bottom-[240px] left-[144px] -translate-x-1/2 translate-y-full mt-4 px-4 py-2 rounded-xl border backdrop-blur-md transition-all font-bold ${selected === 'AP' ? 'bg-blue-500/20 text-blue-500 border-blue-500/50 scale-110 shadow-xl' : 'bg-slate-800 text-slate-500 border-slate-700 hover:bg-slate-700'}`}
           >
             AP
           </button>
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl flex flex-col">
        {!selected ? (
           <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
             <AlertTriangle className="w-16 h-16 text-slate-500 mb-4" />
             <p className="text-xl font-bold text-slate-400">Select an edge on the triangle</p>
             <p className="text-slate-500 mt-2 max-w-xs">A distributed system cannot guarantee C, A, and P simultaneously. You must pick 2.</p>
           </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 flex flex-col"
            >
              {selected === 'CP' && (
                <>
                  <h3 className="text-3xl font-bold text-white mb-2"><span className="text-emerald-500">CP:</span> Consistency & Partition Tolerance</h3>
                  <div className="flex gap-2 mb-6 text-sm text-slate-400 font-mono tracking-widest border-b border-white/10 pb-4">
                    <span>HBase</span> • <span>MongoDB</span> • <span>Redis</span>
                  </div>
                  <p className="text-slate-300 text-lg leading-relaxed mb-6">
                    If a network partition occurs, the system will block (refuse) write/read requests rather than return stale data. Every client always sees the latest data, or an error.
                  </p>
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <p className="text-sm">Fails the <strong>Availability</strong> requirement. If a node goes down, the cluster may refuse connections to preserve data integrity.</p>
                  </div>
                </>
              )}
              {selected === 'AP' && (
                <>
                  <h3 className="text-3xl font-bold text-white mb-2"><span className="text-blue-500">AP:</span> Availability & Partition Tolerance</h3>
                  <div className="flex gap-2 mb-6 text-sm text-slate-400 font-mono tracking-widest border-b border-white/10 pb-4">
                    <span>Cassandra</span> • <span>DynamoDB</span> • <span>Riak</span>
                  </div>
                  <p className="text-slate-300 text-lg leading-relaxed mb-6">
                    If a network partition occurs, the system continues to accept reads and writes on all available nodes. The system is always up, but nodes might have diverging data.
                  </p>
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <p className="text-sm">Fails the <strong>Consistency</strong> requirement. Two different users might see two different versions of the data (stale reads). Requires conflict resolution strategies like Vector Clocks.</p>
                  </div>
                </>
              )}
              {selected === 'CA' && (
                <>
                  <h3 className="text-3xl font-bold text-slate-300 mb-2 line-through decoration-rose-500 decoration-4"><span className="text-amber-500">CA:</span> Consistency & Availability</h3>
                  <div className="flex gap-2 mb-6 text-sm text-slate-400 font-mono tracking-widest border-b border-white/10 pb-4">
                    <span>RDBMS (Single Node)</span>
                  </div>
                  <p className="text-slate-300 text-lg leading-relaxed mb-6">
                    A system that is both consistent and highly available across nodes.
                  </p>
                  <div className="p-6 rounded-xl bg-rose-500/10 border border-rose-500/20 border-dashed text-rose-400 flex flex-col items-center gap-3 text-center">
                    <XCircle className="w-12 h-12" />
                    <p className="text-lg font-bold">Impossible in Distributed Systems</p>
                    <p className="text-sm opacity-80">Network failures (Partitions) are inevitable in the real world. A distributed system MUST tolerate partitions. Therefore, you must always choose between CP or AP.</p>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

function QuorumConsensusSection() {
  const [N, setN] = useState(3) // Replicas
  const [W, setW] = useState(2) // Write Quorum
  const [R, setR] = useState(2) // Read Quorum

  const isStrong = W + R > N
  
  // Handlers to prevent invalid states
  const handleN = (val: number) => {
    setN(val)
    if (W > val) setW(val)
    if (R > val) setR(val)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl">
         <h2 className="text-xl font-bold text-white mb-2">Quorum Consensus Tuner</h2>
         <p className="text-slate-400 text-sm mb-8 max-w-2xl">
           Adjust N, W, and R to balance between consistency and latency. 
           If <code>W + R {'>'} N</code>, you guarantee strong consistency because at least one node in the read quorum will have the latest write.
         </p>

         <div className="grid md:grid-cols-3 gap-8 mb-8">
           <NumberSlider label="N (Replicas)" value={N} max={7} min={1} onChange={handleN} color="blue" />
           <NumberSlider label="W (Write Quorum)" value={W} max={N} min={1} onChange={setW} color="emerald" />
           <NumberSlider label="R (Read Quorum)" value={R} max={N} min={1} onChange={setR} color="purple" />
         </div>

         <div className={`p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-6 transition-colors duration-500 ${
           isStrong 
             ? 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]' 
             : 'bg-amber-500/10 border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.1)]'
         }`}>
           <div>
             <div className="flex items-center gap-3 mb-2">
               <span className="font-mono text-2xl font-bold tracking-widest bg-slate-950 px-3 py-1 rounded-lg border border-white/10 text-white shadow-inner">
                 W + R = {W + R}
               </span>
               <span className={`text-xl font-bold ${W + R > N ? 'text-emerald-500' : W + R === N ? 'text-slate-500' : 'text-amber-500'}`}>
                 {W + R > N ? '>' : W + R === N ? '=' : '<'}
               </span>
               <span className="font-mono text-2xl font-bold tracking-widest bg-slate-950 px-3 py-1 rounded-lg border border-white/10 text-white shadow-inner">
                 N = {N}
               </span>
             </div>
             <p className="text-sm text-slate-400 mt-3 font-medium">
               {isStrong 
                 ? <span className="text-emerald-400">Overlap guaranteed. The reader will definitely consult a node that saw the latest write.</span>
                 : <span className="text-amber-400">No overlap guaranteed. The reader might query nodes that missed the latest write (Stale Reads).</span>
               }
             </p>
           </div>
           
           <div className={`flex flex-col items-center justify-center p-4 rounded-xl w-full sm:w-auto min-w-[200px] border ${isStrong ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-amber-500/20 border-amber-500/50 text-amber-500'}`}>
              <span className="text-xs uppercase tracking-widest opacity-80 font-bold mb-1">Consistency Level</span>
              <span className="text-2xl font-bold text-center leading-tight">
                {isStrong ? 'Strong' : 'Eventual'}
              </span>
           </div>
         </div>
      </div>
      
      {/* Node Visualization */}
      <div className="flex-1 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 text-center">Data Centers Representation</h3>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          <AnimatePresence>
            {Array.from({ length: N }).map((_, i) => {
              const wrote = i < W
              // If we do a simulated read, we pick the LAST `R` nodes to easily show overlap logic visually
              const read = i >= N - R
              const overlap = wrote && read

              return (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="relative p-4 rounded-2xl border-2 bg-slate-800/50 border-white/5 w-24 h-24 flex flex-col items-center justify-center"
                >
                  <Database className="w-8 h-8 text-slate-500 mb-2" />
                  <span className="text-xs font-mono font-bold text-slate-500">Node {i+1}</span>
                  
                  {/* Indicators */}
                  <div className="absolute top-2 left-2 flex gap-1">
                    {wrote && <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" title="Ack'd Write" />}
                    {read && <div className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]" title="Requested Read" />}
                  </div>
                  
                  {overlap && (
                    <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-blue-500 bg-blue-500/10 pointer-events-none" />
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-6 mt-8 text-sm">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500" /> W Nodes</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-500" /> R Nodes</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded border-2 border-dashed border-blue-500 bg-blue-500/10" /> Overlap (Ensures Strong Consistency)</div>
        </div>
      </div>
    </div>
  )
}

function NumberSlider({ label, value, max, min, onChange, color }: { label: string, value: number, max: number, min: number, onChange: (v: number) => void, color: string }) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500',
    emerald: 'bg-emerald-500',
    purple: 'bg-purple-500'
  }
  
  return (
    <div className="flex flex-col bg-slate-950 border border-white/5 rounded-xl p-4">
      <div className="flex justify-between text-sm font-bold text-slate-300 mb-4">
        <span>{label}</span>
        <span className="font-mono text-xl">{value}</span>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className={`w-full h-2 rounded-full appearance-none bg-slate-800 outline-none`}
      />
      <div className="flex justify-between text-xs text-slate-600 font-mono mt-2">
        <span>Min: {min}</span>
        <span>Max: {max}</span>
      </div>
    </div>
  )
}


function VectorClockSection() {
  return (
    <div className="h-full bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl flex flex-col items-center justify-center">
      <div className="max-w-3xl text-center mb-12">
        <ShieldCheck className="w-16 h-16 text-indigo-400 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-white mb-4">Conflict Resolution: Vector Clocks</h2>
        <p className="text-slate-300 text-lg leading-relaxed">
          In highly available (AP) systems, data replicates asynchronously, leading to temporary inconsistencies. 
          A vector clock is a <code className="bg-white/10 px-2 py-0.5 rounded text-indigo-300">[server, version]</code> pair associated with data, allowing systems to detect if versions are ancestor clones or conflicting branches.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
         <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-500/20">
           <div className="flex justify-between items-center mb-4">
              <span className="text-emerald-400 font-bold flex items-center gap-2"><CheckCircle2 className="w-5 h-5"/> Ancestor (No Conflict)</span>
           </div>
           <div className="font-mono text-sm space-y-4">
             <div className="flex justify-between">Server 1 sees: <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded">[s0, 1] [s1, 1]</span></div>
             <div className="flex justify-between">Server 2 sees: <span className="bg-slate-800 text-emerald-300 px-2 py-1 rounded">[s0, 1] [s1, 2]</span></div>
             <p className="text-slate-500 mt-4 border-t border-white/5 pt-4">
               Server 2's version covers all of Server 1's version history. The system simply drops Server 1's payload and adopts Server 2's payload as truth.
             </p>
           </div>
         </div>

         <div className="bg-slate-950 p-6 rounded-2xl border border-rose-500/20 relative">
           <div className="flex justify-between items-center mb-4">
              <span className="text-rose-400 font-bold flex items-center gap-2"><XCircle className="w-5 h-5"/> Divergent (Conflict!)</span>
           </div>
           <div className="font-mono text-sm space-y-4">
             <div className="flex justify-between">Server A writes: <span className="bg-slate-800 text-amber-300 px-2 py-1 rounded">[sA, 1]</span></div>
             <div className="flex justify-between">Server B writes: <span className="bg-slate-800 text-rose-300 px-2 py-1 rounded">[sB, 1]</span></div>
             <p className="text-slate-500 mt-4 border-t border-white/5 pt-4">
               Neither vector encompasses the other. The system detects a conflict. The client reading the data must run reconciliation logic, merging payloads and writing a new version: <code className="bg-slate-800 text-white px-2 py-0.5 rounded mt-1 inline-block">[sA, 1] [sB, 1] [sC, 1]</code>.
             </p>
           </div>
         </div>
      </div>
    </div>
  )
}
