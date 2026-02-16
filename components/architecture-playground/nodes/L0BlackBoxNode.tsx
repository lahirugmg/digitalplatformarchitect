'use client';

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { motion } from 'framer-motion';
import { ArchitectureComponent } from '@/lib/architecture-playground/types';

interface L0BlackBoxNodeProps {
  data: {
    label: string;
    component: ArchitectureComponent;
    color: string;
    levelData: any;
  };
}

export default function L0BlackBoxNode({ data }: L0BlackBoxNodeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const l0Data = data.levelData;

  return (
    <div className="relative">
      <Handle
        type="target"
        position={Position.Top}
        className="w-4 h-4 !bg-blue-500 border-2 border-white"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-blue-500 border-2 border-white"
      />

      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div
          className="px-12 py-8 rounded-2xl border-4 bg-gradient-to-br from-white to-blue-50 shadow-2xl min-w-[320px]"
          style={{
            borderColor: data.color,
            boxShadow: isHovered
              ? `0 20px 60px rgba(59, 130, 246, 0.4), 0 0 30px ${data.color}40`
              : '0 10px 40px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Icon & Title */}
          <div className="text-center mb-6">
            {l0Data?.icon && (
              <motion.div
                className="text-6xl mb-3"
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {l0Data.icon}
              </motion.div>
            )}
            <h3 className="font-black text-2xl text-slate-900 tracking-tight">
              {data.label}
            </h3>
            <div className="mt-1 text-xs font-semibold text-blue-600 uppercase tracking-wider">
              Black Box View
            </div>
          </div>

          {/* Business Capability */}
          {l0Data?.businessCapability && (
            <p className="text-sm text-slate-700 font-medium mb-5 text-center px-4">
              {l0Data.businessCapability}
            </p>
          )}

          {/* KPIs */}
          {l0Data?.kpis && l0Data.kpis.length > 0 && (
            <div className="space-y-3 mb-5">
              {l0Data.kpis.map((kpi: any, idx: number) => (
                <motion.div
                  key={idx}
                  className="flex items-center justify-between bg-white rounded-lg px-4 py-2 shadow-sm border border-slate-100"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <span className="text-xs font-medium text-slate-600">{kpi.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{kpi.value}</span>
                    {kpi.trend && (
                      <span className="text-lg">
                        {kpi.trend === 'up' && '📈'}
                        {kpi.trend === 'down' && '📉'}
                        {kpi.trend === 'stable' && '➡️'}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Value Statement */}
          {l0Data?.value && (
            <div className="mt-5 pt-5 border-t-2 border-slate-200">
              <p className="text-xs text-slate-600 italic text-center leading-relaxed">
                💡 {l0Data.value}
              </p>
            </div>
          )}

          {/* Hover Hint */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-xs text-center text-blue-600 font-medium"
            >
              Click to see internal processes →
            </motion.div>
          )}
        </div>
      </motion.div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-4 h-4 !bg-blue-500 border-2 border-white"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 !bg-blue-500 border-2 border-white"
      />
    </div>
  );
}
