'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Server, Database, Layers, Globe, Cpu, Network, Share2, Workflow, DatabaseBackup, Activity, Users, ArrowRight, ArrowDown } from 'lucide-react'

const steps = [
  {
    id: 1,
    title: '1. Single Server Setup',
    description: 'Web app, database, and cache all run on a single server. Great for starting out, but has hard limits and is a Single Point of Failure (SPOF).',
    icon: Server,
    color: 'text-slate-400',
    bgColor: 'bg-slate-500/10',
    borderColor: 'border-slate-500/20',
  },
  {
    id: 2,
    title: '2. Separate Database',
    description: 'Separate the database onto its own server so the web tier and data tier can scale independently.',
    icon: Database,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
  },
  {
    id: 3,
    title: '3. Load Balancer',
    description: 'Add a load balancer to distribute traffic across multiple web servers (Horizontal Scaling). Failover is now possible.',
    icon: Layers,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
  },
  {
    id: 4,
    title: '4. Database Replication',
    description: 'Implement Master-Slave (Primary-Secondary) replication. Master handles writes, multiple slaves handle reads.',
    icon: DatabaseBackup,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    id: 5,
    title: '5. Cache Tier',
    description: 'Add a temporary storage layer (Redis/Memcached) to securely store frequently accessed data and reduce database load.',
    icon: Cpu,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
  },
  {
    id: 6,
    title: '6. Content Delivery Network',
    description: 'Deliver static content (images, JS, CSS) via geographically distributed CDN servers to reduce latency.',
    icon: Globe,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
  },
  {
    id: 7,
    title: '7. Stateless Web Tier',
    description: 'Move user session data out of web servers into a shared persistent data store, allowing any web server to handle any request.',
    icon: Activity,
    color: 'text-teal-400',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500/20',
  },
  {
    id: 8,
    title: '8. Multi-Datacenter',
    description: 'Geo-route users to the nearest datacenter. In case of an outage, traffic can be redirected to a healthy datacenter.',
    icon: Network,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20',
  },
  {
    id: 9,
    title: '9. Message Queues',
    description: 'Decouple components using durable message queues. Enables asynchronous processing (e.g., photo processing workers).',
    icon: Workflow,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/20',
  },
  {
    id: 10,
    title: '10. Database Sharding',
    description: 'Horizontally scale the database by splitting large datasets into smaller, more manageable shards based on a partition key.',
    icon: Share2,
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/20',
  },
]

export default function ScaleToMillionsPlayground() {
  const [currentStep, setCurrentStep] = useState(1)

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length))
  const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  const activeStepData = steps[currentStep - 1]

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Premium Background Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[100px]" />
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/5 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-1 tracking-tight text-white flex items-center gap-2">
              <span className="text-2xl">📈</span> Scale to Millions Evolution
            </h1>
            <p className="text-sm sm:text-base text-slate-400 font-medium">
              Interactive architecture evolution from a single server to global scale
            </p>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-all text-sm text-slate-300 flex items-center gap-2"
            >
              &larr; Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentStep === steps.length}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-lg shadow-blue-600/20 border border-blue-500/50 rounded-lg font-bold transition-all text-sm flex items-center gap-2"
            >
              Next Step &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col sm:flex-row overflow-hidden relative z-10">
        
        {/* Step Guide Sidebar */}
        <div className="w-full sm:w-80 bg-white/5 backdrop-blur-xl border-r border-white/10 p-5 overflow-y-auto hidden sm:block">
          <h3 className="font-bold mb-5 text-xs uppercase tracking-wider text-slate-400">Evolution Steps</h3>
          <div className="space-y-2">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all duration-300 group ${
                  currentStep === step.id
                    ? `border-${step.color.split('-')[1]}-500/50 ${step.bgColor} shadow-[0_0_15px_rgba(255,255,255,0.05)]`
                    : 'border-transparent hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`flex items-center justify-center w-8 h-8 rounded-lg text-lg transition-colors ${
                    currentStep === step.id ? `${step.bgColor} ${step.color}` : 'bg-white/5 text-slate-400'
                  }`}>
                    <step.icon className="w-4 h-4" />
                  </span>
                  <span className={`text-sm font-semibold tracking-tight ${
                    currentStep === step.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                  }`}>
                    {step.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 relative bg-[#0f172a] flex flex-col">
          <div className="absolute inset-0 z-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
          
          <div className="flex-1 relative z-10 overflow-auto p-4 sm:p-8 flex items-center justify-center min-h-[500px]">
            <ArchitectureCanvas step={currentStep} />
          </div>

          {/* Bottom Info Panel */}
          <div className="relative z-20 bg-white/5 backdrop-blur-md border-t border-white/10 p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStepData.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="max-w-3xl border-l-4 pl-4"
                style={{ borderColor: 'var(--tw-colors-blue-500)' }}
              >
                <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <activeStepData.icon className={`w-5 h-5 ${activeStepData.color}`} />
                  {activeStepData.title}
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {activeStepData.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

function ArchitectureCanvas({ step }: { step: number }) {
  const isServerSeparateDB = step >= 2
  const hasLoadBalancer = step >= 3
  const hasDBReplication = step >= 4
  const hasCache = step >= 5
  const hasCDN = step >= 6
  const isStateless = step >= 7
  const hasMultiDC = step >= 8
  const hasQueues = step >= 9
  const hasSharding = step >= 10

  const Node = ({ id, label, icon: Icon, colorClass, borderClass, bgClass, delay = 0, className = "" }: any) => (
    <motion.div
      layoutId={id}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25, delay }}
      className={`flex flex-col items-center justify-center p-3 rounded-xl border shadow-lg ${bgClass} ${borderClass} ${className}`}
    >
      <Icon className={`w-6 h-6 mb-1 ${colorClass}`} />
      <span className="text-xs font-semibold text-slate-200 text-center">{label}</span>
    </motion.div>
  )

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8 relative">
      
      {/* Layer 1: Users & Edge */}
      <div className="flex items-center justify-center gap-12 w-full">
        <Node 
          id="users" 
          label="Users" 
          icon={Users} 
          colorClass="text-slate-300"
          borderClass="border-slate-600"
          bgClass="bg-slate-800"
        />
        
        <AnimatePresence>
          {hasCDN && (
            <Node 
              id="cdn" 
              label="CDN" 
              icon={Globe} 
              colorClass="text-cyan-400"
              borderClass="border-cyan-500/50"
              bgClass="bg-cyan-500/10"
              delay={0.1}
            />
          )}
        </AnimatePresence>
      </div>

      <ArrowDown className="w-5 h-5 text-slate-500" />

      {/* Layer 2: Routing / Load Balancer */}
      <div className="flex items-center justify-center w-full min-h-[80px]">
        <AnimatePresence mode="popLayout">
          {hasMultiDC ? (
             <div className="flex gap-16">
                <Node 
                  id="geo-dns" 
                  label="GeoDNS Routing" 
                  icon={Network} 
                  colorClass="text-indigo-400"
                  borderClass="border-indigo-500/50"
                  bgClass="bg-indigo-500/10"
                />
             </div>
          ) : hasLoadBalancer ? (
            <Node 
              id="lb" 
              label="Load Balancer" 
              icon={Layers} 
              colorClass="text-emerald-400"
              borderClass="border-emerald-500/50"
              bgClass="bg-emerald-500/10"
            />
          ) : null}
        </AnimatePresence>
      </div>

      {hasLoadBalancer && <ArrowDown className="w-5 h-5 text-slate-500" />}

      {/* Layer 3: Web Tier */}
      <div className="flex items-center justify-center gap-4 w-full min-h-[80px] p-4 rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
        <Node 
          id="web-1" 
          label={step === 1 ? "Web Server + DB" : "Web Server 1"} 
          icon={Server} 
          colorClass="text-blue-200"
          borderClass="border-blue-500/50"
          bgClass="bg-blue-500/10"
        />
        
        <AnimatePresence>
          {hasLoadBalancer && (
            <Node 
              id="web-2" 
              label="Web Server 2" 
              icon={Server} 
              colorClass="text-blue-200"
              borderClass="border-blue-500/50"
              bgClass="bg-blue-500/10"
              delay={0.1}
            />
          )}
          {hasMultiDC && (
            <Node 
              id="web-3" 
              label="Web Server (DC 2)" 
              icon={Server} 
              colorClass="text-indigo-200"
              borderClass="border-indigo-500/50"
              bgClass="bg-indigo-500/10"
              delay={0.2}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-4">
        {isServerSeparateDB && <ArrowDown className="w-5 h-5 text-slate-500" />}
      </div>

      {/* Layer 4: State, Cache, Queue */}
      <div className="flex items-start justify-center gap-6 w-full min-h-[100px]">
        <AnimatePresence>
          {hasCache && (
            <Node 
              id="cache" 
              label="Cache (Redis)" 
              icon={Cpu} 
              colorClass="text-purple-400"
              borderClass="border-purple-500/50"
              bgClass="bg-purple-500/10"
              delay={0.1}
            />
          )}
          
          {isStateless && (
            <Node 
              id="session-store" 
              label="Session Store (NoSQL)" 
              icon={Activity} 
              colorClass="text-teal-400"
              borderClass="border-teal-500/50"
              bgClass="bg-teal-500/10"
              delay={0.2}
            />
          )}

          {hasQueues && (
            <div className="flex flex-col items-center gap-2">
              <Node 
                id="queue" 
                label="Message Queue" 
                icon={Workflow} 
                colorClass="text-pink-400"
                borderClass="border-pink-500/50"
                bgClass="bg-pink-500/10"
                delay={0.3}
              />
              <ArrowDown className="w-4 h-4 text-slate-500" />
              <Node 
                id="workers" 
                label="Workers" 
                icon={Cpu} 
                colorClass="text-pink-300"
                borderClass="border-pink-500/30"
                bgClass="bg-pink-500/5"
                delay={0.4}
              />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Layer 5: Data Tier */}
      <div className="flex items-center justify-center gap-4 w-full min-h-[100px] mt-4">
        <AnimatePresence>
          {isServerSeparateDB && !hasSharding && (
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-dashed border-amber-500/20 bg-amber-500/5">
              <Node 
                id="db-master" 
                label={hasDBReplication ? "DB Master (Writes)" : "Database"} 
                icon={Database} 
                colorClass="text-amber-400"
                borderClass="border-amber-500/50"
                bgClass="bg-amber-500/10"
              />
              {hasDBReplication && (
                <>
                   <ArrowRight className="w-4 h-4 text-slate-500" />
                   <Node 
                    id="db-slave-1" 
                    label="DB Slave (Reads)" 
                    icon={DatabaseBackup} 
                    colorClass="text-amber-300"
                    borderClass="border-amber-500/30"
                    bgClass="bg-amber-500/5"
                    delay={0.1}
                  />
                </>
              )}
            </div>
          )}

          {hasSharding && (
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-dashed border-rose-500/20 bg-rose-500/5">
               <Node 
                id="shard-1" 
                label="Shard 1 (A-M)" 
                icon={Share2} 
                colorClass="text-rose-400"
                borderClass="border-rose-500/50"
                bgClass="bg-rose-500/10"
              />
               <Node 
                id="shard-2" 
                label="Shard 2 (N-Z)" 
                icon={Share2} 
                colorClass="text-rose-400"
                borderClass="border-rose-500/50"
                bgClass="bg-rose-500/10"
                delay={0.1}
              />
               <Node 
                id="shard-n" 
                label="Shard N" 
                icon={Share2} 
                colorClass="text-rose-400"
                borderClass="border-rose-500/50"
                bgClass="bg-rose-500/10"
                delay={0.2}
              />
            </div>
          )}
        </AnimatePresence>
      </div>

    </div>
  )
}
