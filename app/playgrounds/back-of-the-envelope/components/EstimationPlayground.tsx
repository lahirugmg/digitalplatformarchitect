'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, Clock, ShieldCheck, Database, HardDrive, Network, Cpu, Server, Activity, ArrowRight } from 'lucide-react'

// --- Data Definitions ---

const latencyData = [
  { id: 'l1', name: 'L1 cache reference', timeNs: 0.5, text: '0.5 ns', type: 'cpu', icon: Cpu },
  { id: 'branch', name: 'Branch mispredict', timeNs: 5, text: '5 ns', type: 'cpu', icon: Activity },
  { id: 'l2', name: 'L2 cache reference', timeNs: 7, text: '7 ns', type: 'cpu', icon: Cpu },
  { id: 'mutex', name: 'Mutex lock/unlock', timeNs: 100, text: '100 ns', type: 'cpu', icon: ShieldCheck },
  { id: 'mem', name: 'Main memory reference', timeNs: 100, text: '100 ns', type: 'mem', icon: Database },
  { id: 'compress', name: 'Compress 1K bytes with Zippy', timeNs: 10000, text: '10 µs', type: 'cpu', icon: Activity },
  { id: 'net-1gbps', name: 'Send 2K bytes over 1 Gbps network', timeNs: 20000, text: '20 µs', type: 'net', icon: Network },
  { id: 'read-1mb-mem', name: 'Read 1 MB sequentially from memory', timeNs: 250000, text: '250 µs', type: 'mem', icon: Database },
  { id: 'round-trip-dc', name: 'Round trip within same datacenter', timeNs: 500000, text: '500 µs', type: 'net', icon: Server },
  { id: 'disk-seek', name: 'Disk seek', timeNs: 10000000, text: '10 ms', type: 'disk', icon: HardDrive },
  { id: 'read-1mb-net', name: 'Read 1 MB sequentially from network', timeNs: 10000000, text: '10 ms', type: 'net', icon: Network },
  { id: 'read-1mb-disk', name: 'Read 1 MB sequentially from disk', timeNs: 30000000, text: '30 ms', type: 'disk', icon: HardDrive },
  { id: 'packet-ca-nl', name: 'Send packet CA->Netherlands->CA', timeNs: 150000000, text: '150 ms', type: 'net', icon: Globe },
]

function Globe(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

const slaData = [
  { nines: 2, percent: 99, daily: '14.40 minutes', weekly: '1.68 hours', monthly: '7.31 hours', yearly: '3.65 days' },
  { nines: 3, percent: 99.9, daily: '1.44 minutes', weekly: '10.08 minutes', monthly: '43.83 minutes', yearly: '8.77 hours' },
  { nines: 4, percent: 99.99, daily: '8.64 seconds', weekly: '1.01 minutes', monthly: '4.38 minutes', yearly: '52.60 minutes' },
  { nines: 5, percent: 99.999, daily: '864.00 milliseconds', weekly: '6.05 seconds', monthly: '26.30 seconds', yearly: '5.26 minutes' },
  { nines: 6, percent: 99.9999, daily: '86.40 milliseconds', weekly: '604.80 milliseconds', monthly: '2.63 seconds', yearly: '31.56 seconds' },
]

// --- Main Component ---

export default function EstimationPlayground() {
  const [activeTab, setActiveTab] = useState<'latency' | 'sla' | 'capacity'>('latency')

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Premium Background Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[100px]" />
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/5 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-1 tracking-tight text-white flex items-center gap-2">
              <span className="text-2xl">🧮</span> Back-of-the-Envelope Estimation
            </h1>
            <p className="text-sm sm:text-base text-slate-400 font-medium">
              Interactive tools for system design capacity estimations and performance numbers
            </p>
          </div>
          
          <div className="flex p-1 bg-slate-900/50 rounded-xl border border-white/10">
            {(['latency', 'sla', 'capacity'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {tab === 'latency' && 'Latency Numbers'}
                {tab === 'sla' && 'Availability (SLA)'}
                {tab === 'capacity' && 'Capacity Estimator'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative z-10 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'latency' && (
              <motion.div
                key="latency"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <LatencyVisualizer />
              </motion.div>
            )}
            
            {activeTab === 'sla' && (
              <motion.div
                key="sla"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <SLACalculator />
              </motion.div>
            )}
            
            {activeTab === 'capacity' && (
              <motion.div
                key="capacity"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <CapacityEstimator />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// --- Sub-Components ---

function LatencyVisualizer() {
  const [selectedSpeed, setSelectedSpeed] = useState<number | null>(null)
  
  // Group by magnitude
  const ns = latencyData.filter(d => d.timeNs < 1000)
  const us = latencyData.filter(d => d.timeNs >= 1000 && d.timeNs < 1000000)
  const ms = latencyData.filter(d => d.timeNs >= 1000000)

  const CategorySection = ({ title, items, colorClass, highlightClass }: any) => (
    <div className="mb-8">
      <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 ${colorClass}`}>{title}</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item: typeof latencyData[0]) => (
          <div
            key={item.id}
            onMouseEnter={() => setSelectedSpeed(item.timeNs)}
            onMouseLeave={() => setSelectedSpeed(null)}
            className={`flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all cursor-pointer ${
              selectedSpeed === item.timeNs ? `${highlightClass} shadow-lg scale-[1.02]` : 'hover:bg-white/10'
            }`}
          >
            <div className={`p-2 rounded-lg bg-white/5 ${colorClass}`}>
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-200 truncate">{item.name}</p>
              <p className={`text-xs font-bold font-mono ${colorClass}`}>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-400" />
          Latency Numbers Every Programmer Should Know
        </h2>
        <p className="text-slate-400 text-sm">
          Understanding the relative speed of different operations is crucial for system scaling. 
          Notice how memory is fast but disk is slow, and network requests across datacenters are extremely expensive compared to local CPU operations.
        </p>

        {selectedSpeed && (
          <div className="mt-6 p-4 bg-slate-900 rounded-xl border border-slate-700">
            <p className="text-sm text-slate-300">
              If <strong className="text-white">L1 cache reference (0.5 ns)</strong> was 1 second (a heartbeat), then the currently selected operation (<strong className="text-blue-400">{(selectedSpeed).toLocaleString()} ns</strong>) would take:
            </p>
            <p className="text-2xl font-bold text-emerald-400 mt-2">
              {formatHumanScale(selectedSpeed)}
            </p>
          </div>
        )}
      </div>

      <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 relative">
         {/* Vertical connector line */}
         <div className="absolute left-10 top-14 bottom-14 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-rose-500/50 hidden sm:block"></div>
         
        <CategorySection 
          title="Nanoseconds (ns) - Lightning Fast (CPU / L1 / L2 / Mem)" 
          items={ns} 
          colorClass="text-blue-400" 
          highlightClass="bg-blue-500/20 border-blue-500/50"
        />
        <CategorySection 
          title="Microseconds (µs) - Fast (Network / Disk Buffer)" 
          items={us} 
          colorClass="text-purple-400" 
          highlightClass="bg-purple-500/20 border-purple-500/50"
        />
        <CategorySection 
          title="Milliseconds (ms) - Slow (Disk Seek / WAN Network)" 
          items={ms} 
          colorClass="text-rose-400" 
          highlightClass="bg-rose-500/20 border-rose-500/50"
        />
      </div>
    </div>
  )
}

function formatHumanScale(ns: number) {
  // If 0.5ns = 1s, then multiplier is 2,000,000,000
  // Or simply: human_seconds = (ns / 0.5)
  const humanSeconds = ns * 2;
  
  if (humanSeconds < 60) return `${humanSeconds} seconds`;
  if (humanSeconds < 3600) return `${(humanSeconds / 60).toFixed(1)} minutes`;
  if (humanSeconds < 86400) return `${(humanSeconds / 3600).toFixed(1)} hours`;
  if (humanSeconds < 2592000) return `${(humanSeconds / 86400).toFixed(1)} days`;
  if (humanSeconds < 31536000) return `${(humanSeconds / 2592000).toFixed(1)} months`;
  return `${(humanSeconds / 31536000).toFixed(1)} years`;
}

function SLACalculator() {
  return (
    <div className="space-y-8">
      <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-purple-400" />
          Availability & Service Level Agreements (SLA)
        </h2>
        <p className="text-slate-400 text-sm">
          High availability refers to the percentage of time a system is continuously operational.
          The industry standard often aims for "five nines" (99.999%), but the cost to achieve each additional nine grows exponentially.
        </p>
      </div>

      <div className="overflow-x-auto bg-slate-900/80 rounded-2xl border border-white/10 shadow-xl">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-800/50 text-xs uppercase font-semibold text-slate-400">
            <tr>
              <th className="px-6 py-4 rounded-tl-2xl">Availability %</th>
              <th className="px-6 py-4">Downtime per day</th>
              <th className="px-6 py-4">Downtime per week</th>
              <th className="px-6 py-4">Downtime per month</th>
              <th className="px-6 py-4 rounded-tr-2xl">Downtime per year</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {slaData.map((sla, i) => (
              <tr key={sla.percent} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-5 font-bold text-white flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${i >= 3 ? 'bg-emerald-400' : i >= 2 ? 'bg-blue-400' : 'bg-amber-400'}`}></div>
                  {sla.percent}% <span className="text-slate-500 text-xs font-normal">({sla.nines} nines)</span>
                </td>
                <td className="px-6 py-5 font-mono text-emerald-300">{sla.daily}</td>
                <td className="px-6 py-5 font-mono">{sla.weekly}</td>
                <td className="px-6 py-5 font-mono">{sla.monthly}</td>
                <td className="px-6 py-5 font-mono text-rose-300">{sla.yearly}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl border border-white/5 bg-white/5">
          <h4 className="font-bold text-white text-sm mb-2">Cost vs Availability</h4>
          <p className="text-xs text-slate-400">
            Moving from 99.9% to 99.99% might require redundant servers and CDNs. Moving to 99.999% requires complex active-active multi-region failover systems.
          </p>
        </div>
        <div className="p-5 rounded-xl border border-white/5 bg-white/5">
          <h4 className="font-bold text-white text-sm mb-2">Cloud Provider SLAs</h4>
          <p className="text-xs text-slate-400">
            Most cloud provider SLAs (like AWS EC2) offer 99.99% uptime guarantees. Building a 99.999% system on top of a 99.99% infrastructure requires substantial architecture investment.
          </p>
        </div>
      </div>
    </div>
  )
}

function CapacityEstimator() {
  const [mauMillions, setMauMillions] = useState(300)
  const [dailyActivePercent, setDailyActivePercent] = useState(50)
  const [tweetsPerUser, setTweetsPerUser] = useState(2)
  const [mediaPercent, setMediaPercent] = useState(10)
  const [mediaSizeMb, setMediaSizeMb] = useState(1)

  // Calculations
  const dauMillions = (mauMillions * dailyActivePercent) / 100
  const dailyTweetsMillions = dauMillions * tweetsPerUser
  
  // QPS
  const rpsWrite = Math.round((dailyTweetsMillions * 1000000) / (24 * 60 * 60))
  const rpsPeak = rpsWrite * 2 // Rule of thumb: peak is 2x average
  
  // Storage
  const dailyMediaMillions = (dailyTweetsMillions * mediaPercent) / 100
  const dailyStorageTb = dailyMediaMillions * mediaSizeMb
  const storage5YearsPb = (dailyStorageTb * 365 * 5) / 1000

  // Text storage (1 tweet = ~1.2kb: 64B id + 140B text + 1000B metadata)
  const dailyTextStorageGb = (dailyTweetsMillions * 1.2) / 1000 
  const textStorage5YearsTb = (dailyTextStorageGb * 365 * 5) / 1000

  return (
    <div className="space-y-6">
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-emerald-400" />
          Twitter Capacity Estimation
        </h2>
        <p className="text-slate-400 text-sm">
          A common interview question format. Adjust the parameters below to see how storage and throughput requirements scale in real-time.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-5 space-y-6 bg-slate-900/60 p-6 rounded-2xl border border-white/10">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 border-b border-white/10 pb-3">Assumptions</h3>
          
          <div className="space-y-5 text-sm">
            <div>
              <div className="flex justify-between mb-2">
                <label className="font-medium text-slate-300">Monthly Active Users (MAU)</label>
                <span className="font-mono text-cyan-400">{mauMillions} Million</span>
              </div>
              <input 
                type="range" min="10" max="2000" step="10" 
                value={mauMillions} onChange={(e) => setMauMillions(parseInt(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="font-medium text-slate-300">Daily Active Users (%)</label>
                <span className="font-mono text-cyan-400">{dailyActivePercent}%</span>
              </div>
              <input 
                type="range" min="10" max="90" step="5" 
                value={dailyActivePercent} onChange={(e) => setDailyActivePercent(parseInt(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="font-medium text-slate-300">Tweets/User/Day</label>
                <span className="font-mono text-cyan-400">{tweetsPerUser}</span>
              </div>
              <input 
                type="range" min="1" max="20" step="1" 
                value={tweetsPerUser} onChange={(e) => setTweetsPerUser(parseInt(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800"
              />
            </div>

            <div>
               <div className="flex justify-between mb-2">
                <label className="font-medium text-slate-300">% Tweets with Media</label>
                <span className="font-mono text-cyan-400">{mediaPercent}%</span>
              </div>
              <input 
                type="range" min="1" max="50" step="1" 
                value={mediaPercent} onChange={(e) => setMediaPercent(parseInt(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800"
              />
            </div>

            <div>
               <div className="flex justify-between mb-2">
                <label className="font-medium text-slate-300">Avg Media Size (MB)</label>
                <span className="font-mono text-cyan-400">{mediaSizeMb} MB</span>
              </div>
              <input 
                type="range" min="0.5" max="10" step="0.5" 
                value={mediaSizeMb} onChange={(e) => setMediaSizeMb(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Traffic Results */}
          <div className="bg-gradient-to-br from-blue-900/40 to-slate-900/60 p-6 rounded-2xl border border-blue-500/20 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Activity className="w-24 h-24" />
            </div>
            
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-6">Traffic Estimations</h3>
            
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <p className="text-slate-400 text-xs font-semibold mb-1 uppercase tracking-wider">Average Write QPS</p>
                  <p className="text-3xl font-bold font-mono text-white">
                    {rpsWrite.toLocaleString()} <span className="text-sm text-slate-500 font-sans">req/s</span>
                  </p>
               </div>
               <div>
                  <p className="text-slate-400 text-xs font-semibold mb-1 uppercase tracking-wider">Peak Write QPS</p>
                  <p className="text-3xl font-bold font-mono text-amber-400">
                    {rpsPeak.toLocaleString()} <span className="text-sm text-amber-500/50 font-sans">req/s</span>
                  </p>
               </div>
            </div>
            <p className="text-xs text-slate-500 mt-4 border-t border-white/5 pt-3">
              Calculation: ({dauMillions}M DAU * {tweetsPerUser} tweets) / 24hrs / 60mins / 60secs
            </p>
          </div>

          {/* Storage Results */}
          <div className="bg-gradient-to-br from-purple-900/40 to-slate-900/60 p-6 rounded-2xl border border-purple-500/20 shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
              <Database className="w-24 h-24" />
            </div>
            
            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 mb-6">Storage Estimations</h3>
            
            <div className="space-y-6">
              <div>
                 <p className="text-slate-400 text-xs font-semibold mb-1 uppercase tracking-wider text-purple-200">Media Storage (Images/Video)</p>
                 <div className="flex items-end gap-6 border-l-2 border-purple-500/30 pl-4 py-1">
                    <div>
                      <span className="block text-slate-500 text-xs mb-1">Per Day</span>
                      <p className="text-2xl font-bold font-mono text-white">{dailyStorageTb.toLocaleString(undefined, {maximumFractionDigits:1})} <span className="text-sm text-slate-500 font-sans">TB</span></p>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-xs mb-1">5 Year Proj.</span>
                      <p className="text-3xl font-bold font-mono text-purple-400">{storage5YearsPb.toLocaleString(undefined, {maximumFractionDigits:1})} <span className="text-sm text-purple-500/50 font-sans">PB</span></p>
                    </div>
                 </div>
              </div>

               <div>
                 <p className="text-slate-400 text-xs font-semibold mb-1 uppercase tracking-wider text-cyan-200">Text & Metadata Storage (1.2KB / tweet)</p>
                 <div className="flex items-end gap-6 border-l-2 border-cyan-500/30 pl-4 py-1">
                    <div>
                      <span className="block text-slate-500 text-xs mb-1">Per Day</span>
                      <p className="text-xl font-bold font-mono text-white">{dailyTextStorageGb.toLocaleString(undefined, {maximumFractionDigits:1})} <span className="text-sm text-slate-500 font-sans">GB</span></p>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-xs mb-1">5 Year Proj.</span>
                      <p className="text-xl font-bold font-mono text-cyan-400">{textStorage5YearsTb.toLocaleString(undefined, {maximumFractionDigits:1})} <span className="text-sm text-cyan-500/50 font-sans">TB</span></p>
                    </div>
                 </div>
              </div>
            </div>
            
            <p className="text-xs text-slate-500 mt-5 border-t border-white/5 pt-3">
              * Remember to label units explicitly (e.g. {storage5YearsPb.toFixed(1)}PB instead of just {storage5YearsPb.toFixed(1)}) and approximate up for simpler mental math during interviews.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
