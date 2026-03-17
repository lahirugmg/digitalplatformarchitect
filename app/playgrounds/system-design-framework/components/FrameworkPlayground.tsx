'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Circle, Clock, Target, Lightbulb, AlertTriangle, MessageSquare, Database, Server, PenTool, HelpCircle } from 'lucide-react'

// --- Data ---
const steps = [
  {
    id: 1,
    title: 'Step 1: Understand Problem & Scope',
    shortTitle: 'Understand',
    timeAlloc: '3-10 min',
    icon: HelpCircle,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    description: 'Do not rush to give answers. Ask questions to clarify requirements, assumptions, and constraints. Evaluate traffic volume and feature scope.',
    dos: [
      'Ask questions to clarify obscure requirements.',
      'Write down your assumptions on the whiteboard.',
      'Determine the most important features.',
      'Estimate traffic volume and ask about existing tech stack.'
    ],
    donts: [
      'Answering without a thorough understanding.',
      'Jumping straight into a solution.',
      'Assuming your silent assumptions are correct.'
    ]
  },
  {
    id: 2,
    title: 'Step 2: Propose High-Level Design',
    shortTitle: 'High-Level',
    timeAlloc: '10-15 min',
    icon: PenTool,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    description: 'Develop a high-level blueprint and get buy-in. Draw boxes for clients, APIs, load balancers, and data stores. Use back-of-the-envelope estimations to prove it fits.',
    dos: [
      'Actively collaborate with the interviewer.',
      'Draw high-level boxes (APIs, Servers, Data Stores).',
      'Walk through concrete use-cases to validate the design.',
      'Perform back-of-the-envelope calculations if needed.'
    ],
    donts: [
      'Going into deep implementation details too early.',
      'Ignoring interviewer feedback on the blueprint.'
    ]
  },
  {
    id: 3,
    title: 'Step 3: Design Deep Dive',
    shortTitle: 'Deep Dive',
    timeAlloc: '10-25 min',
    icon: Database,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    description: 'Prioritize components with the interviewer and dig into the details. Resolve specific system bottlenecks and focus on areas that show off your skills.',
    dos: [
      'Work with interviewer to prioritize components.',
      'Dive deep into complex areas (e.g., hash functions, latency).',
      'Keep track of your time allocation.',
      'Explain your thought process out loud.'
    ],
    donts: [
      'Getting carried away with details that don\'t show off your skills.',
      'Going silently into "cave mode" to solve a problem.'
    ]
  },
  {
    id: 4,
    title: 'Step 4: Wrap Up',
    shortTitle: 'Wrap Up',
    timeAlloc: '3-5 min',
    icon: Target,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    description: 'Recap the design, discuss bottlenecks, failure modes, and operational considerations. Answer follow-up questions and project future scaling.',
    dos: [
      'Identify system bottlenecks and discuss improvements.',
      'Give a concise recap of the final design.',
      'Discuss failure modes (server/network loss) and ops (monitoring).',
      'Discuss next scale curve adjustments (e.g., 1M to 10M users).'
    ],
    donts: [
      'Claiming your design is "perfect".',
      'Rushing the finish line without answering follow-ups.'
    ]
  }
]

export default function FrameworkPlayground() {
  const [activeStep, setActiveStep] = useState(1)

  const currentStepData = steps[activeStep - 1]

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Premium Background Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[40%] right-[10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[100px]" />
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/5 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-1 tracking-tight text-white flex items-center gap-2">
              <span className="text-2xl">📋</span> System Design Framework
            </h1>
            <p className="text-sm sm:text-base text-slate-400 font-medium">
              Master the 4-step process for cracking system design interviews
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-slate-900/50 px-4 py-2 rounded-xl border border-white/10">
            <Clock className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-semibold text-slate-300">Total Interview Time: ~45 min</span>
          </div>
        </div>
      </div>

      <div className="flex-1 relative z-10 p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto w-full">
        
        {/* Timeline Navigation (Left) */}
        <div className="w-full lg:w-1/3 flex flex-col">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6">4-Step Process Timeline</h2>
          
          <div className="relative flex-1">
            {/* Connecting Line */}
            <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-emerald-500/30 z-0"></div>
            
            <div className="space-y-6 relative z-10">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`w-full flex items-start text-left gap-5 group transition-all duration-300 ${activeStep === step.id ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                >
                  <div className={`mt-1 flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all duration-300 shadow-xl ${
                    activeStep === step.id 
                      ? `${step.bgColor} ${step.borderColor} ${step.color} scale-110 shadow-[0_0_20px_rgba(255,255,255,0.1)]` 
                      : 'bg-slate-900 border-slate-700 text-slate-500'
                  }`}>
                    <step.icon className={`w-6 h-6 ${activeStep === step.id ? step.color : ''}`} />
                  </div>
                  
                  <div className={`flex-1 p-4 rounded-xl border transition-all duration-300 ${
                    activeStep === step.id
                      ? `${step.bgColor} ${step.borderColor}`
                      : 'bg-slate-900/50 border-white/5 hover:bg-slate-800/50'
                  }`}>
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Step {step.id}</span>
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${activeStep === step.id ? `${step.bgColor} ${step.color}` : 'bg-slate-800 text-slate-400'}`}>
                        {step.timeAlloc}
                      </span>
                    </div>
                    <h3 className={`font-bold ${activeStep === step.id ? 'text-white' : 'text-slate-300'}`}>
                      {step.shortTitle}
                    </h3>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Details View (Right) */}
        <div className="w-full lg:w-2/3 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepData.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={`h-full flex flex-col rounded-3xl border ${currentStepData.borderColor} bg-slate-900/60 backdrop-blur-xl shadow-2xl overflow-hidden`}
            >
              {/* Header Gradient */}
              <div className={`h-2 w-full bg-gradient-to-r from-transparent via-${currentStepData.color.split('-')[1]}-500/50 to-transparent`}></div>
              
              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 rounded-2xl ${currentStepData.bgColor} ${currentStepData.color}`}>
                    <currentStepData.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{currentStepData.title}</h2>
                    <p className="text-slate-400 mt-1 flex items-center gap-2">
                       <Clock className="w-4 h-4" /> Recommended Time: <span className={`font-bold ${currentStepData.color}`}>{currentStepData.timeAlloc}</span>
                    </p>
                  </div>
                </div>

                <div className="mb-8 p-5 bg-white/5 border border-white/10 rounded-2xl">
                  <p className="text-slate-300 leading-relaxed text-lg">
                    {currentStepData.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 flex-1">
                  {/* Do's */}
                  <div className="flex flex-col">
                    <h3 className="flex items-center gap-2 font-bold text-emerald-400 mb-4 px-2">
                      <CheckCircle2 className="w-5 h-5" />
                      What To Do
                    </h3>
                    <div className="flex-1 space-y-3 p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                      {currentStepData.dos.map((item, idx) => (
                        <div key={idx} className="flex gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Don'ts */}
                  <div className="flex flex-col">
                    <h3 className="flex items-center gap-2 font-bold text-rose-400 mb-4 px-2">
                      <AlertTriangle className="w-5 h-5" />
                      Red Flags (Don't)
                    </h3>
                    <div className="flex-1 space-y-3 p-5 rounded-2xl bg-rose-500/5 border border-rose-500/10">
                      {currentStepData.donts.map((item, idx) => (
                        <div key={idx} className="flex gap-3">
                          <Circle className="w-5 h-5 text-rose-500 shrink-0 flex items-center justify-center">
                            <div className="w-3 h-0.5 bg-rose-500 rounded-full rotate-45 absolute" />
                          </Circle>
                          <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
              </div>
              
              {/* Bottom Nav */}
              <div className="p-4 border-t border-white/10 bg-black/20 flex justify-between items-center">
                 <button
                   onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                   disabled={activeStep === 1}
                   className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
                 >
                   &larr; Previous Step
                 </button>
                 <div className="flex gap-1">
                   {steps.map(s => (
                     <div key={s.id} className={`w-2 h-2 rounded-full transition-all ${activeStep === s.id ? s.bgColor.replace('/10', '/50') : 'bg-white/10'}`} />
                   ))}
                 </div>
                 <button
                   onClick={() => setActiveStep(prev => Math.min(steps.length, prev + 1))}
                   disabled={activeStep === steps.length}
                   className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
                 >
                   Next Step &rarr;
                 </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  )
}
