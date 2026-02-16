'use client';

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { motion } from 'framer-motion';
import { ArchitectureComponent } from '@/lib/architecture-playground/types';
import { GitMerge, ChevronDown, ChevronUp } from 'lucide-react';

interface OrchestrationHubNodeProps {
  data: {
    label: string;
    component: ArchitectureComponent;
    color: string;
    levelData: any;
  };
}

export default function OrchestrationHubNode({ data }: OrchestrationHubNodeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const l1Data = data.levelData;

  return (
    <div className="relative">
      {/* Multiple handles for convergence */}
      <Handle
        type="target"
        position={Position.Top}
        id="top-1"
        className="w-4 h-4 !bg-gradient-to-r from-pink-500 to-amber-500 border-2 border-white"
        style={{ left: '30%' }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="top-2"
        className="w-4 h-4 !bg-gradient-to-r from-pink-500 to-amber-500 border-2 border-white"
        style={{ left: '70%' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-blue-500 border-2 border-white"
      />
      <Handle
        type="target"
        position={Position.Right}
        className="w-4 h-4 !bg-blue-500 border-2 border-white"
      />

      <motion.div
        className="relative"
        whileHover={{ scale: 1.03 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div
          className="px-8 py-6 rounded-2xl border-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50 shadow-2xl min-w-[280px] relative overflow-hidden cursor-pointer"
          style={{
            borderColor: data.color,
            boxShadow: isHovered
              ? `0 20px 50px rgba(59, 130, 246, 0.3), 0 0 40px ${data.color}20, inset 0 1px 2px rgba(255,255,255,0.8)`
              : '0 10px 30px rgba(0, 0, 0, 0.12)'
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
            animate={{
              backgroundPosition: isHovered ? ['0px 0px', '20px 20px'] : '0px 0px'
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          {/* Header with Icon */}
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <motion.div
                className="flex items-center gap-3"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
                  <GitMerge className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900 tracking-tight">
                    {data.label}
                  </h3>
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    Orchestration Hub
                  </div>
                </div>
              </motion.div>
              {l1Data?.responsibilities && l1Data.responsibilities.length > 0 && (
                <button
                  className="p-1.5 hover:bg-blue-100 rounded-lg transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                  }}
                >
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-blue-600" />
                  )}
                </button>
              )}
            </div>

            {/* System Type */}
            {l1Data?.systemType && (
              <p className="text-sm text-slate-700 font-semibold mb-3 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-lg">
                {l1Data.systemType}
              </p>
            )}

            {/* Convergence Indicator */}
            <div className="flex items-center gap-2 mb-4 bg-gradient-to-r from-pink-50 to-amber-50 px-3 py-2 rounded-lg border border-pink-200">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                <span className="text-xs font-medium text-pink-700">Retail</span>
              </div>
              <span className="text-slate-400">+</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <span className="text-xs font-medium text-amber-700">Wholesale</span>
              </div>
              <span className="text-slate-400">→</span>
              <span className="text-xs font-bold text-blue-700">Unified Processing</span>
            </div>

            {/* Integrations */}
            {l1Data?.integrations && l1Data.integrations.length > 0 && (
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-slate-600">Integrations:</span>
                <span className="text-sm font-black text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                  {l1Data.integrations.length}
                </span>
              </div>
            )}

            {/* Responsibilities - Expandable */}
            {l1Data?.responsibilities && l1Data.responsibilities.length > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: isExpanded ? 'auto' : 0,
                  opacity: isExpanded ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t-2 border-blue-200">
                  <div className="text-xs font-bold text-slate-700 mb-3 uppercase tracking-wide">
                    Core Responsibilities:
                  </div>
                  <ul className="space-y-2">
                    {l1Data.responsibilities.map((resp: string, idx: number) => (
                      <motion.li
                        key={idx}
                        className="text-xs text-slate-700 flex items-start bg-white/80 backdrop-blur-sm px-3 py-2 rounded-md"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <span className="mr-2 text-blue-500 font-bold">✓</span>
                        <span className="font-medium">{resp}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {/* Hover/Expand Hint */}
            {isHovered && !isExpanded && l1Data?.responsibilities && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-xs text-center font-semibold text-blue-600"
              >
                Click to view responsibilities →
              </motion.div>
            )}
          </div>

          {/* Pulse effect on hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 border-4 rounded-2xl pointer-events-none"
              style={{ borderColor: data.color }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [0.98, 1.02, 0.98]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </div>
      </motion.div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-4 h-4 !bg-blue-600 border-2 border-white"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-out"
        className="w-4 h-4 !bg-blue-600 border-2 border-white"
      />
    </div>
  );
}
