'use client';

import { Handle, Position } from 'reactflow';
import { ArchitectureComponent } from '@/lib/architecture-playground/types';

interface DetailNodeProps {
  data: {
    label: string;
    component: ArchitectureComponent;
    color: string;
    levelData: any;
  };
}

export default function DetailNode({ data }: DetailNodeProps) {
  const l3Data = data.levelData;

  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      <div
        className="px-4 py-3 rounded-lg border-2 bg-white shadow-lg min-w-[280px] max-w-[320px]"
        style={{ borderColor: data.color }}
      >
        {/* Header */}
        <div className="mb-3 pb-2 border-b border-slate-200">
          <h3 className="font-bold text-base text-slate-900 font-mono">{data.label}</h3>
        </div>

        {/* Deployment */}
        {l3Data?.deploymentConfigs?.kubernetes && (
          <div className="mb-3">
            <div className="text-xs font-bold text-slate-700 mb-1">📦 Kubernetes</div>
            <div className="text-xs text-slate-600 space-y-0.5 ml-2">
              {l3Data.deploymentConfigs.kubernetes.namespace && (
                <div>Namespace: <span className="font-mono">{l3Data.deploymentConfigs.kubernetes.namespace}</span></div>
              )}
              {l3Data.deploymentConfigs.kubernetes.values?.replicas && (
                <div>Replicas: <span className="font-mono">{l3Data.deploymentConfigs.kubernetes.values.replicas}</span></div>
              )}
              {l3Data.deploymentConfigs.kubernetes.values?.image?.tag && (
                <div>Tag: <span className="font-mono text-blue-600">{l3Data.deploymentConfigs.kubernetes.values.image.tag}</span></div>
              )}
            </div>
          </div>
        )}

        {/* Configuration */}
        {l3Data?.configuration && Object.keys(l3Data.configuration).length > 0 && (
          <div className="mb-3">
            <div className="text-xs font-bold text-slate-700 mb-1">🔧 Config</div>
            <div className="text-[10px] text-slate-600 space-y-0.5 ml-2 font-mono">
              {Object.entries(l3Data.configuration).slice(0, 3).map(([key, value]: [string, any]) => (
                <div key={key} className="truncate">
                  {key}: {String(value).substring(0, 30)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Monitoring */}
        {l3Data?.monitoring && (
          <div className="mb-2">
            <div className="text-xs font-bold text-slate-700 mb-1">📊 Monitoring</div>
            <div className="text-xs text-slate-600 ml-2">
              {l3Data.monitoring.metrics && (
                <div>Metrics: {l3Data.monitoring.metrics.length}</div>
              )}
              {l3Data.monitoring.traces && (
                <div>Traces: {l3Data.monitoring.traces.join(', ')}</div>
              )}
            </div>
          </div>
        )}

        {/* Code Snippets */}
        {l3Data?.codeSnippets && l3Data.codeSnippets.length > 0 && (
          <div className="pt-2 border-t border-slate-200">
            <div className="text-xs font-bold text-slate-700 mb-1">💻 Code</div>
            <div className="text-xs text-slate-600 space-y-1 ml-2">
              {l3Data.codeSnippets.slice(0, 2).map((snippet: any, idx: number) => (
                <div key={idx} className="flex items-center gap-1">
                  <span className="text-blue-600">→</span>
                  <span className="font-mono text-[10px]">{snippet.file}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Repository */}
        {l3Data?.repositoryUrl && (
          <div className="mt-2 pt-2 border-t border-slate-200">
            <a
              href={l3Data.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              <span>🔗</span>
              <span>View Repository</span>
            </a>
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
}
