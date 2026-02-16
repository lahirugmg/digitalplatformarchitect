'use client';

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { motion } from 'framer-motion';
import { ArchitectureComponent } from '@/lib/architecture-playground/types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StrategicOutcomeNodeProps {
  data: {
    label: string;
    component: ArchitectureComponent;
    color: string;
    levelData: any;
  };
}

export default function StrategicOutcomeNode({ data }: StrategicOutcomeNodeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const l0Data = data.levelData;

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-green-100 text-green-800 border-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-slate-100 text-slate-600 border-slate-300';
      default: return 'bg-slate-100 text-slate-600 border-slate-300';
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'stable': return <Minus className="w-4 h-4 text-slate-600" />;
      default: return null;
    }
  };

  return (
    <div className="relative">
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-purple-500 border-2 border-white"
      />

      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div
          className="px-5 py-4 rounded-lg border-2 bg-gradient-to-br from-white to-green-50 shadow-md min-w-[200px]"
          style={{
            borderColor: data.color,
            boxShadow: isHovered
              ? `0 12px 30px ${data.color}25, 0 0 15px ${data.color}15`
              : '0 4px 10px rgba(0, 0, 0, 0.06)'
          }}
        >
          {/* Icon & Title */}
          <div className="text-center mb-3">
            {l0Data?.icon && (
              <motion.div
                className="text-3xl mb-2"
                animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {l0Data.icon}
              </motion.div>
            )}
            <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
              {data.label}
            </h3>
            <div className="mt-1 text-xs text-slate-500 font-medium">
              Strategic Outcome
            </div>
          </div>

          {/* Business Capability */}
          {l0Data?.businessCapability && (
            <p className="text-xs text-slate-600 mb-3 text-center font-medium">
              {l0Data.businessCapability}
            </p>
          )}

          {/* KPIs */}
          {l0Data?.kpis && l0Data.kpis.length > 0 && (
            <div className="space-y-2">
              {l0Data.kpis.map((kpi: any, idx: number) => (
                <motion.div
                  key={idx}
                  className={`border rounded-md px-3 py-2 ${getImpactColor(kpi.impact)}`}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold truncate mr-2">
                      {kpi.name}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-sm whitespace-nowrap">
                        {kpi.value}
                      </span>
                      {getTrendIcon(kpi.trend)}
                    </div>
                  </div>
                  {kpi.impact && (
                    <div className="mt-1">
                      <span className="text-xs font-medium opacity-75">
                        Impact: {kpi.impact}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* Value Statement */}
          {l0Data?.value && isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 pt-3 border-t border-slate-200"
            >
              <p className="text-xs text-slate-600 italic text-center leading-snug">
                {l0Data.value}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-purple-500 border-2 border-white"
      />
    </div>
  );
}
