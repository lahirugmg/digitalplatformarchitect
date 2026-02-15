'use client';

import { Handle, Position } from 'reactflow';
import { ArchitectureComponent } from '@/lib/architecture-playground/types';

interface BusinessNodeProps {
  data: {
    label: string;
    component: ArchitectureComponent;
    color: string;
    levelData: any;
  };
}

export default function BusinessNode({ data }: BusinessNodeProps) {
  const l0Data = data.levelData;

  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      <div
        className="px-6 py-4 rounded-lg border-2 bg-white shadow-lg min-w-[200px]"
        style={{ borderColor: data.color }}
      >
        {/* Icon & Title */}
        <div className="text-center mb-3">
          {l0Data?.icon && (
            <div className="text-4xl mb-2">{l0Data.icon}</div>
          )}
          <h3 className="font-bold text-lg text-slate-900">{data.label}</h3>
        </div>

        {/* Business Capability */}
        {l0Data?.businessCapability && (
          <p className="text-sm text-slate-600 mb-3 text-center">
            {l0Data.businessCapability}
          </p>
        )}

        {/* KPIs */}
        {l0Data?.kpis && l0Data.kpis.length > 0 && (
          <div className="space-y-2">
            {l0Data.kpis.slice(0, 3).map((kpi: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <span className="text-slate-600">{kpi.name}</span>
                <span className="font-bold text-slate-900">{kpi.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Value Statement */}
        {l0Data?.value && (
          <div className="mt-3 pt-3 border-t border-slate-200">
            <p className="text-xs text-slate-600 italic text-center">
              {l0Data.value}
            </p>
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
}
