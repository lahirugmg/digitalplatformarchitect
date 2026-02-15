'use client';

import { Handle, Position } from 'reactflow';
import { ArchitectureComponent } from '@/lib/architecture-playground/types';

interface SystemNodeProps {
  data: {
    label: string;
    component: ArchitectureComponent;
    color: string;
    levelData: any;
  };
}

export default function SystemNode({ data }: SystemNodeProps) {
  const l1Data = data.levelData;

  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      <div
        className="px-4 py-3 rounded-lg border-2 bg-white shadow-md min-w-[180px]"
        style={{ borderColor: data.color }}
      >
        {/* Header */}
        <div className="mb-2">
          <h3 className="font-bold text-base text-slate-900">{data.label}</h3>
          {l1Data?.systemType && (
            <p className="text-xs text-slate-500">{l1Data.systemType}</p>
          )}
        </div>

        {/* Pattern */}
        {l1Data?.pattern && (
          <div className="mb-2">
            <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-700">
              {l1Data.pattern}
            </span>
          </div>
        )}

        {/* SLA */}
        {l1Data?.sla && (
          <div className="text-xs text-slate-600 space-y-1">
            {l1Data.sla.uptime && (
              <div className="flex justify-between">
                <span>Uptime:</span>
                <span className="font-medium">{l1Data.sla.uptime}</span>
              </div>
            )}
            {l1Data.sla.latency && (
              <div className="flex justify-between">
                <span>Latency:</span>
                <span className="font-medium">{l1Data.sla.latency}</span>
              </div>
            )}
          </div>
        )}

        {/* Integrations count */}
        {l1Data?.integrations && l1Data.integrations.length > 0 && (
          <div className="mt-2 pt-2 border-t border-slate-200 text-xs text-slate-500">
            {l1Data.integrations.length} integration{l1Data.integrations.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
}
