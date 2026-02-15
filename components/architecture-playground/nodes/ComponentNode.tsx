'use client';

import { Handle, Position } from 'reactflow';
import { ArchitectureComponent } from '@/lib/architecture-playground/types';

interface ComponentNodeProps {
  data: {
    label: string;
    component: ArchitectureComponent;
    color: string;
    levelData: any;
  };
}

export default function ComponentNode({ data }: ComponentNodeProps) {
  const l2Data = data.levelData;

  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      <div
        className="px-4 py-3 rounded-lg border-2 bg-white shadow-md min-w-[220px]"
        style={{ borderColor: data.color }}
      >
        {/* Header */}
        <div className="mb-3 pb-2 border-b border-slate-200">
          <h3 className="font-bold text-base text-slate-900 font-mono">{data.label}</h3>
        </div>

        {/* Tech Stack */}
        {l2Data?.techStack && (
          <div className="space-y-1 mb-3">
            {l2Data.techStack.runtime && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-blue-600">🏗️</span>
                <span className="text-xs text-slate-700">{l2Data.techStack.runtime}</span>
              </div>
            )}
            {l2Data.techStack.language && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-green-600">💻</span>
                <span className="text-xs text-slate-700">{l2Data.techStack.language}</span>
              </div>
            )}
            {l2Data.techStack.database && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-purple-600">💾</span>
                <span className="text-xs text-slate-700">{l2Data.techStack.database}</span>
              </div>
            )}
            {l2Data.techStack.cache && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-red-600">⚡</span>
                <span className="text-xs text-slate-700">{l2Data.techStack.cache}</span>
              </div>
            )}
          </div>
        )}

        {/* APIs */}
        {l2Data?.apis?.rest && l2Data.apis.rest.length > 0 && (
          <div className="text-xs text-slate-600">
            <span className="font-medium">APIs:</span>
            <div className="ml-2 mt-1">
              {l2Data.apis.rest.slice(0, 2).map((api: any, idx: number) => (
                <div key={idx} className="font-mono text-[10px]">
                  {api.methods.join('|')} {api.path}
                </div>
              ))}
              {l2Data.apis.rest.length > 2 && (
                <div className="text-[10px] text-slate-400">
                  +{l2Data.apis.rest.length - 2} more
                </div>
              )}
            </div>
          </div>
        )}

        {/* Auto-scaling */}
        {l2Data?.scalability?.autoScaling?.enabled && (
          <div className="mt-2 pt-2 border-t border-slate-200 text-xs text-slate-500">
            ⚙️ Auto-scales: {l2Data.scalability.autoScaling.minInstances}-{l2Data.scalability.autoScaling.maxInstances}
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
}
