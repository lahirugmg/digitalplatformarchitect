'use client';

import { usePlaygroundStore } from '@/lib/architecture-playground/store';
import { ArchitectureVertical, ARCHITECTURE_VERTICALS } from '@/lib/architecture-playground/types';
import { BarChart3, Building2, Cloud } from 'lucide-react';

const VERTICAL_CONFIG: Record<ArchitectureVertical, {
  icon: typeof BarChart3;
  label: string;
  description: string;
  color: string;
}> = {
  business: {
    icon: BarChart3,
    label: 'Business',
    description: 'Processes, capabilities, KPIs, and business outcomes',
    color: '#10b981' // emerald-500
  },
  solution: {
    icon: Building2,
    label: 'Solution',
    description: 'Systems, services, integration patterns, and technology',
    color: '#8b5cf6' // violet-500
  },
  deployment: {
    icon: Cloud,
    label: 'Deployment',
    description: 'Infrastructure, networking, scaling, and operations',
    color: '#3b82f6' // blue-500
  }
};

export default function VerticalSelector() {
  const { vertical, setVertical } = usePlaygroundStore();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
      <label className="text-sm font-bold text-slate-700 mb-3 block uppercase tracking-wider">
        Architecture View
      </label>

      <div className="grid grid-cols-3 gap-2">
        {ARCHITECTURE_VERTICALS.map((vert) => {
          const config = VERTICAL_CONFIG[vert];
          const Icon = config.icon;
          const isActive = vertical === vert;

          return (
            <button
              key={vert}
              onClick={() => setVertical(vert)}
              className={`flex flex-col items-center gap-2 px-2 py-3 rounded-lg border-2 transition-all ${
                isActive
                  ? 'border-current bg-opacity-10 ring-1 ring-current shadow-sm'
                  : 'border-transparent hover:bg-slate-50 hover:border-slate-200'
              }`}
              style={{
                color: isActive ? config.color : '#94a3b8',
                backgroundColor: isActive ? `${config.color}15` : 'transparent'
              }}
              title={config.description}
            >
              <Icon className="w-6 h-6 flex-shrink-0" />
              <div className={`text-xs font-semibold leading-tight text-center ${
                isActive ? '' : 'text-slate-700'
              }`}>
                {config.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Description of active vertical */}
      <div className="mt-3 pt-3 border-t border-slate-200">
        <p className="text-xs text-slate-600 leading-relaxed">
          {VERTICAL_CONFIG[vertical].description}
        </p>
      </div>
    </div>
  );
}
