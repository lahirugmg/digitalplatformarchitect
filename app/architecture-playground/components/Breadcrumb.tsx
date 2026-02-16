'use client';

import { usePlaygroundStore } from '@/lib/architecture-playground/store';
import { ChevronRight } from 'lucide-react';

const VERTICAL_LABELS = {
  business: 'Business Architecture',
  solution: 'Solution Architecture',
  deployment: 'Deployment Architecture'
};

const LEVEL_LABELS = {
  L0: 'L0 - Abstract Overview',
  L1: 'L1 - High-Level Design',
  L2: 'L2 - Detailed Components',
  L3: 'L3 - Implementation Details'
};

export default function Breadcrumb() {
  const { vertical, level, focusNode, architecture, setLevel, setFocusNode } = usePlaygroundStore();

  // Get focused node name if exists
  const focusedComponent = focusNode && architecture
    ? architecture.components.find(c => c.id === focusNode)
    : null;

  const focusedNodeName = focusedComponent
    ? (focusedComponent.verticals?.[vertical]?.name ||
       focusedComponent.names.display ||
       focusedComponent.names.technical)
    : null;

  return (
    <div className="bg-white border-b border-slate-200 px-4 py-2">
      <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
        {/* Vertical */}
        <button
          onClick={() => {
            setLevel('L0');
            setFocusNode(null);
          }}
          className="text-slate-600 hover:text-purple-600 transition font-medium"
        >
          {VERTICAL_LABELS[vertical]}
        </button>

        <ChevronRight className="w-4 h-4 text-slate-400" />

        {/* Level */}
        <button
          onClick={() => setFocusNode(null)}
          className={`transition font-medium ${
            focusNode
              ? 'text-slate-600 hover:text-purple-600'
              : 'text-purple-600'
          }`}
        >
          {LEVEL_LABELS[level]}
        </button>

        {/* Focused Node (if any) */}
        {focusNode && focusedNodeName && (
          <>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="text-purple-600 font-medium truncate max-w-[200px]">
              {focusedNodeName}
            </span>
          </>
        )}
      </nav>
    </div>
  );
}
