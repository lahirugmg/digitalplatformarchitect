'use client';

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { motion } from 'framer-motion';
import { ArchitectureComponent } from '@/lib/architecture-playground/types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface BusinessProcessNodeProps {
  data: {
    label: string;
    component: ArchitectureComponent;
    color: string;
    levelData: any;
    streamType?: 'retail' | 'wholesale' | 'operations' | 'support';
  };
}

export default function BusinessProcessNode({ data }: BusinessProcessNodeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const l1Data = data.levelData;

  const getStreamColor = () => {
    switch (data.streamType) {
      case 'retail': return { bg: 'from-pink-50 to-white', border: '#ec4899', text: 'text-pink-700' };
      case 'wholesale': return { bg: 'from-amber-50 to-white', border: '#f59e0b', text: 'text-amber-700' };
      case 'operations': return { bg: 'from-blue-50 to-white', border: '#3b82f6', text: 'text-blue-700' };
      case 'support': return { bg: 'from-purple-50 to-white', border: '#8b5cf6', text: 'text-purple-700' };
      default: return { bg: 'from-slate-50 to-white', border: '#64748b', text: 'text-slate-700' };
    }
  };

  const streamColors = getStreamColor();

  return (
    <div className="relative">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-blue-500 border-2 border-white"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-blue-500 border-2 border-white"
      />

      <motion.div
        className="relative"
        whileHover={{ scale: 1.03 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <div
          className={`px-6 py-4 rounded-lg border-2 bg-gradient-to-br ${streamColors.bg} shadow-md min-w-[220px] cursor-pointer`}
          style={{
            borderColor: streamColors.border,
            boxShadow: isHovered
              ? `0 10px 25px ${streamColors.border}20, 0 0 12px ${streamColors.border}15`
              : '0 3px 8px rgba(0, 0, 0, 0.05)'
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-sm text-slate-900 leading-tight mb-1">
                {data.label}
              </h3>
              {data.streamType && (
                <div className={`text-xs font-semibold uppercase tracking-wider ${streamColors.text}`}>
                  {data.streamType}
                </div>
              )}
            </div>
            {l1Data?.responsibilities && l1Data.responsibilities.length > 0 && (
              <button
                className="ml-2 p-1 hover:bg-slate-100 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
              >
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-slate-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-600" />
                )}
              </button>
            )}
          </div>

          {/* System Type */}
          {l1Data?.systemType && (
            <p className="text-xs text-slate-600 mt-2 font-medium">
              {l1Data.systemType}
            </p>
          )}

          {/* Integrations Count */}
          {l1Data?.integrations && l1Data.integrations.length > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-slate-500">Integrations:</span>
              <span className="text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded">
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
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t border-slate-200">
                <div className="text-xs font-semibold text-slate-700 mb-2">
                  Responsibilities:
                </div>
                <ul className="space-y-1.5">
                  {l1Data.responsibilities.slice(0, 4).map((resp: string, idx: number) => (
                    <motion.li
                      key={idx}
                      className="text-xs text-slate-600 flex items-start"
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <span className="mr-1.5 text-slate-400">•</span>
                      <span>{resp}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {/* Hover Hint */}
          {isHovered && !isExpanded && l1Data?.responsibilities && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-xs text-center text-slate-500 italic"
            >
              Click to expand
            </motion.div>
          )}
        </div>
      </motion.div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-blue-500 border-2 border-white"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-blue-500 border-2 border-white"
      />
    </div>
  );
}
