'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Fingerprint, Settings2, Play, Server, Clock, Hash, CheckCircle2 } from 'lucide-react'

// Constants for Snowflake
const TWITTER_EPOCH = 1288834974657n // Nov 04 2010 01:42:54 GMT

export default function IdGeneratorPlayground() {
  const [datacenterId, setDatacenterId] = useState(1)
  const [machineId, setMachineId] = useState(1)
  const [sequence, setSequence] = useState(0)
  const [lastTimestamp, setLastTimestamp] = useState(-1n)
  
  // Generated result
  const [generatedId, setGeneratedId] = useState<string | null>(null)
  const [binaryString, setBinaryString] = useState<string>('0'.repeat(64))
  
  // Parsing history
  const [history, setHistory] = useState<{id: string, time: string, dc: number, mac: number, seq: number}[]>([])

  // Generator simulation
  const generateId = () => {
    let currentTimestamp = BigInt(Date.now())
    
    let nextSequence = sequence
    if (currentTimestamp === lastTimestamp) {
      nextSequence = (sequence + 1) & 4095 // 12 bits max is 4095
      if (nextSequence === 0) {
        // Wait till next millisecond (simulation sleep basically)
        while (currentTimestamp <= lastTimestamp) {
          currentTimestamp = BigInt(Date.now())
        }
      }
    } else {
      nextSequence = 0
    }
    
    setSequence(nextSequence)
    setLastTimestamp(currentTimestamp)

    // Calculate components
    const timeDelta = currentTimestamp - TWITTER_EPOCH
    
    // Shifts
    // timestamp: 22 bits shift
    // datacenter: 17 bits shift  (12 + 5)
    // machine: 12 bits shift
    const shiftedTime = timeDelta << 22n
    const shiftedDc = BigInt(datacenterId) << 17n
    const shiftedMac = BigInt(machineId) << 12n
    const seq = BigInt(nextSequence)
    
    const finalId = shiftedTime | shiftedDc | shiftedMac | seq
    const binary = finalId.toString(2).padStart(64, '0')

    setGeneratedId(finalId.toString())
    setBinaryString(binary)
    
    // Add to history
    setHistory(prev => [{
      id: finalId.toString(),
      time: new Date(Number(currentTimestamp)).toISOString(),
      dc: datacenterId,
      mac: machineId,
      seq: nextSequence
    }, ...prev].slice(0, 5))
  }

  // Auto-generate on mount to show preview
  useEffect(() => {
    generateId()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Visual Breakdowns
  const signBit = binaryString.substring(0, 1)
  const timeBits = binaryString.substring(1, 42)
  const dcBits = binaryString.substring(42, 47)
  const macBits = binaryString.substring(47, 52)
  const seqBits = binaryString.substring(52, 64)

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Premium Background Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[100px]" />
      </div>

      <div className="relative z-10 bg-white/5 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Fingerprint className="w-6 h-6 text-blue-400" /> Distributed ID Generator
          </h1>
          <p className="text-sm sm:text-base text-slate-400 font-medium">
            Visualize the Twitter Snowflake Algorithm generating 64-bit unique numbers
          </p>
        </div>
      </div>

      <div className="flex-1 relative z-10 p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-7xl mx-auto w-full">
        
        {/* Main Generator Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl flex flex-col gap-8">
           <div className="flex flex-col lg:flex-row gap-8 justify-between">
              <div className="flex-1">
                <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                  <Settings2 className="w-5 h-5 text-indigo-400" /> Generator Configuration
                </h2>
                <p className="text-slate-400 text-sm mb-6">Set up your machine instance identity to generate unique IDs without centralized coordination.</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-4">
                    <label className="text-sm font-semibold text-slate-400 mb-2 block flex items-center gap-2">
                       <Server className="w-4 h-4 text-emerald-400" /> Datacenter ID
                    </label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="range" min="0" max="31" 
                        value={datacenterId} 
                        onChange={e => setDatacenterId(parseInt(e.target.value))}
                        className="flex-1 accent-emerald-500"
                      />
                      <span className="font-mono text-xl font-bold text-emerald-400 w-8">{datacenterId}</span>
                    </div>
                  </div>

                  <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-4">
                    <label className="text-sm font-semibold text-slate-400 mb-2 block flex items-center gap-2">
                       <Server className="w-4 h-4 text-purple-400" /> Machine ID
                    </label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="range" min="0" max="31" 
                        value={machineId} 
                        onChange={e => setMachineId(parseInt(e.target.value))}
                        className="flex-1 accent-purple-500"
                      />
                      <span className="font-mono text-xl font-bold text-purple-400 w-8">{machineId}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center lg:border-l border-white/10 lg:pl-12">
                 <button
                   onClick={generateId}
                   className="group relative flex flex-col items-center justify-center w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-[0_0_40px_rgba(99,102,241,0.4)] hover:shadow-[0_0_60px_rgba(99,102,241,0.6)] transition-all hover:scale-105 active:scale-95"
                 >
                   <div className="absolute inset-2 rounded-full border border-white/20 bg-black/10 flex flex-col items-center justify-center">
                     <Play className="w-10 h-10 text-white fill-white ml-2 mb-2 group-hover:scale-110 transition-transform" />
                     <span className="font-bold text-white tracking-widest text-sm uppercase">Generate</span>
                   </div>
                 </button>
              </div>
           </div>

           {/* Results Pane */}
           <div className="bg-slate-950 rounded-2xl border border-white/10 p-6 flex flex-col items-center relative overflow-hidden">
             <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-slate-950 via-blue-500/50 to-slate-950" />
             
             <p className="text-slate-500 uppercase tracking-widest text-xs font-bold mb-2">Resulting 64-bit Decimal Integer</p>
             <AnimatePresence mode="wait">
               <motion.div
                 key={generatedId}
                 initial={{ opacity: 0, scale: 0.95, y: -10 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 className="text-4xl sm:text-5xl font-mono font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-8 py-2 text-center break-all"
               >
                 {generatedId}
               </motion.div>
             </AnimatePresence>

             {/* Binary Visualizer */}
             <div className="w-full">
                <p className="text-slate-500 uppercase tracking-widest text-xs font-bold mb-4">Binary Breakdown (64 bits)</p>
                <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full rouded-xl overflow-hidden font-mono text-xs sm:text-sm text-center">
                   
                   {/* Sign Bit */}
                   <div className="flex flex-col gap-1 w-[5%] min-w-[30px]">
                     <div className="bg-slate-800 text-slate-400 py-2 rounded-t-lg break-all">{signBit}</div>
                     <div className="text-[10px] text-slate-500 font-sans leading-tight bg-slate-800/50 py-1 rounded-b-lg">Sign<br/>(1)</div>
                   </div>

                   {/* Timestamp */}
                   <div className="flex flex-col gap-1 w-[45%]">
                     <div className="bg-amber-500/20 text-amber-400 border border-amber-500/30 py-2 rounded-t-lg overflow-hidden break-all px-1 tracking-tighter">
                       <motion.span key={`time-${generatedId}`} initial={{opacity:0}} animate={{opacity:1}}>{timeBits}</motion.span>
                     </div>
                     <div className="text-[10px] text-amber-500/80 font-sans leading-tight bg-amber-500/5 py-1 rounded-b-lg">Timestamp ms<br/>(41 bits)</div>
                   </div>

                   {/* Datacenter */}
                   <div className="flex flex-col gap-1 w-[15%]">
                     <div className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 py-2 rounded-t-lg break-all tracking-tighter">
                       <motion.span key={`dc-${generatedId}`} initial={{opacity:0}} animate={{opacity:1}}>{dcBits}</motion.span>
                     </div>
                     <div className="text-[10px] text-emerald-500/80 font-sans leading-tight bg-emerald-500/5 py-1 rounded-b-lg">Datacenter<br/>(5 bits)</div>
                   </div>

                   {/* Machine */}
                   <div className="flex flex-col gap-1 w-[15%]">
                     <div className="bg-purple-500/20 text-purple-400 border border-purple-500/30 py-2 rounded-t-lg break-all tracking-tighter">
                       <motion.span key={`mac-${generatedId}`} initial={{opacity:0}} animate={{opacity:1}}>{macBits}</motion.span>
                     </div>
                     <div className="text-[10px] text-purple-500/80 font-sans leading-tight bg-purple-500/5 py-1 rounded-b-lg">Machine<br/>(5 bits)</div>
                   </div>

                   {/* Sequence */}
                   <div className="flex flex-col gap-1 w-[20%]">
                     <div className="bg-rose-500/20 text-rose-400 border border-rose-500/30 py-2 rounded-t-lg break-all tracking-tighter">
                       <motion.span key={`seq-${generatedId}`} initial={{opacity:0}} animate={{opacity:1}}>{seqBits}</motion.span>
                     </div>
                     <div className="text-[10px] text-rose-500/80 font-sans leading-tight bg-rose-500/5 py-1 rounded-b-lg">Sequence<br/>(12 bits)</div>
                   </div>

                </div>
             </div>
           </div>
        </div>

        {/* Info & History */}
        <div className="grid lg:grid-cols-2 gap-6">
           <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl text-slate-300">
             <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
               <Fingerprint className="w-5 h-5 text-blue-400" /> Why Snowflake?
             </h3>
             <ul className="space-y-4">
               <li className="flex gap-3">
                 <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                 <div>
                   <strong className="text-emerald-400 block mb-1">Sortable by Time</strong>
                   Because the first 41 bits are a timestamp, the IDs naturally sort chronologically, making it highly efficient for database primary keys.
                 </div>
               </li>
               <li className="flex gap-3">
                 <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                 <div>
                   <strong className="text-blue-400 block mb-1">Decentralized & Scalable</strong>
                   By allocating bits to Datacenter ID and Machine ID, servers generate IDs independently without locking or network calls to a central server.
                 </div>
               </li>
               <li className="flex gap-3">
                 <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0" />
                 <div>
                   <strong className="text-purple-400 block mb-1">64-bit Integer Size</strong>
                   Unlike 128-bit UUID strings, these fit natively into a standard 64-bit integer, indexing faster in relational databases like MySQL.
                 </div>
               </li>
             </ul>
           </div>

           <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col">
             <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
               <Clock className="w-5 h-5 text-amber-400" /> Generation Log (Last 5)
             </h3>
             <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                <AnimatePresence>
                  {history.map(item => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-slate-950 p-3 rounded-xl border border-white/5 flex flex-col justify-center"
                    >
                      <div className="font-mono text-blue-400 font-bold mb-1 break-all">{item.id}</div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 font-mono mt-1 pt-2 border-t border-white/5">
                        <span className="text-amber-500/80"><Clock className="w-3 h-3 inline mr-1"/>{item.time}</span>
                        <span className="text-emerald-500/80"><Server className="w-3 h-3 inline mr-1"/>DC: {item.dc}</span>
                        <span className="text-purple-500/80"><Server className="w-3 h-3 inline mr-1"/>MAC: {item.mac}</span>
                        <span className="text-rose-500/80"><Hash className="w-3 h-3 inline mr-1"/>SEQ: {item.seq}</span>
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
