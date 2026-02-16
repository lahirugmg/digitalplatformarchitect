'use client';

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { motion } from 'framer-motion';
import { ArchitectureComponent } from '@/lib/architecture-playground/types';

interface ExternalActorNodeProps {
  data: {
    label: string;
    component: ArchitectureComponent;
    color: string;
    levelData: any;
  };
}

export default function ExternalActorNode({ data }: ExternalActorNodeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const l0Data = data.levelData;

  return (
    <div className="relative">
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-pink-500 border-2 border-white"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-pink-500 border-2 border-white"
      />

      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div
          className="px-6 py-4 rounded-xl border-3 bg-white shadow-lg min-w-[180px] cursor-pointer"
          style={{
            borderColor: data.color,
            borderWidth: '3px',
            boxShadow: isHovered
              ? `0 15px 40px ${data.color}30, 0 0 20px ${data.color}20`
              : '0 4px 12px rgba(0, 0, 0, 0.08)'
          }}
        >
          {/* Icon & Title */}
          <div className="text-center">
            {l0Data?.icon && (
              <motion.div
                className="text-4xl mb-2"
                animate={{ scale: isHovered ? 1.15 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {l0Data.icon}
              </motion.div>
            )}
            <h3 className="font-bold text-base text-slate-900 leading-tight">
              {data.label}
            </h3>
            <div className="mt-1 text-xs text-slate-500 font-medium">
              External Actor
            </div>
          </div>

          {/* Business Capability */}
          {l0Data?.businessCapability && (
            <p className="text-xs text-slate-600 mt-3 text-center leading-snug">
              {l0Data.businessCapability}
            </p>
          )}

          {/* KPIs - Compact View */}
          {l0Data?.kpis && l0Data.kpis.length > 0 && (
            <motion.div
              className="mt-4 space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0.7 }}
              transition={{ duration: 0.2 }}
            >
              {l0Data.kpis.slice(0, 2).map((kpi: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs bg-slate-50 rounded px-2 py-1"
                >
                  <span className="text-slate-600 truncate mr-2">{kpi.name}</span>
                  <span className="font-bold text-slate-900 whitespace-nowrap">
                    {kpi.value}
                  </span>
                </div>
              ))}
            </motion.div>
          )}

          {/* Hover Indicator */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 pt-3 border-t border-slate-200"
            >
              <div className="text-xs text-center font-medium" style={{ color: data.color }}>
                → Interacts with Enterprise
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-pink-500 border-2 border-white"
      />
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-pink-500 border-2 border-white"
      />
    </div>
  );
}
