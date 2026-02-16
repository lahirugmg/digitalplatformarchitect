'use client';

import { motion } from 'framer-motion';
import { Filter, Users, Building2, Network, Settings } from 'lucide-react';

export type StreamFilterType = 'all' | 'retail' | 'wholesale' | 'operations';

interface StreamFilterProps {
  currentFilter: StreamFilterType;
  onFilterChange: (filter: StreamFilterType) => void;
  disabled?: boolean;
}

export default function StreamFilter({ currentFilter, onFilterChange, disabled = false }: StreamFilterProps) {
  const filters: { id: StreamFilterType; name: string; description: string; icon: any; color: string }[] = [
    {
      id: 'all',
      name: 'Show All',
      description: 'Complete business architecture',
      icon: Network,
      color: '#64748b'
    },
    {
      id: 'retail',
      name: 'Retail Stream',
      description: 'B2C customer journey',
      icon: Users,
      color: '#ec4899'
    },
    {
      id: 'wholesale',
      name: 'Wholesale Stream',
      description: 'B2B buyer journey',
      icon: Building2,
      color: '#f59e0b'
    },
    {
      id: 'operations',
      name: 'Downstream Ops',
      description: 'Fulfillment & logistics',
      icon: Settings,
      color: '#3b82f6'
    }
  ];

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-slate-200 p-4 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <div className="flex items-center gap-2 mb-3">
        <Filter className="w-4 h-4 text-slate-600" />
        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">
          Stream Filter
        </label>
      </div>

      {disabled && (
        <div className="mb-3 p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-700">
          <strong>Note:</strong> Stream filtering only available in L1 view
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        {filters.map((filter) => {
          const isActive = currentFilter === filter.id;
          const Icon = filter.icon;

          return (
            <motion.button
              key={filter.id}
              onClick={() => !disabled && onFilterChange(filter.id)}
              className={`flex flex-col items-center gap-2 px-3 py-3 rounded-lg border-2 transition-all ${
                isActive
                  ? 'border-current bg-opacity-10 ring-2'
                  : 'border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
              style={{
                borderColor: isActive ? filter.color : undefined,
                backgroundColor: isActive ? `${filter.color}15` : undefined,
              }}
              whileHover={{ scale: disabled ? 1 : 1.05 }}
              whileTap={{ scale: disabled ? 1 : 0.95 }}
            >
              <div
                className="p-2 rounded-lg"
                style={{
                  backgroundColor: isActive ? filter.color : '#f1f5f9',
                  color: isActive ? 'white' : '#64748b'
                }}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-center">
                <div
                  className="text-xs font-bold leading-tight"
                  style={{ color: isActive ? filter.color : '#334155' }}
                >
                  {filter.name}
                </div>
                {isActive && (
                  <div className="text-xs mt-1 opacity-75" style={{ color: filter.color }}>
                    {filter.description}
                  </div>
                )}
              </div>
              {isActive && (
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: filter.color }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-200">
        <div className="text-xs text-slate-600 space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-pink-500"></div>
            <span><strong>Retail:</strong> E-commerce → Order Management</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <span><strong>Wholesale:</strong> B2B → Order Management</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span><strong>Operations:</strong> Fulfillment → Delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
}
