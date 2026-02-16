'use client';

import { motion } from 'framer-motion';
import { Box, Layers } from 'lucide-react';

type BusinessLayer = 'L0' | 'L1';

interface LayerSelectorProps {
  currentLayer: BusinessLayer;
  onLayerChange: (layer: BusinessLayer) => void;
}

export default function LayerSelector({ currentLayer, onLayerChange }: LayerSelectorProps) {
  const layers: { id: BusinessLayer; name: string; description: string; icon: any }[] = [
    {
      id: 'L0',
      name: 'Context Level',
      description: 'Abstract Business View - Black Box',
      icon: Box
    },
    {
      id: 'L1',
      name: 'Process Level',
      description: 'Functional Decomposition',
      icon: Layers
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
      <label className="text-sm font-bold text-slate-700 mb-3 block uppercase tracking-wider">
        Architecture Level
      </label>

      <div className="space-y-3">
        {layers.map((layer) => {
          const isActive = currentLayer === layer.id;
          const Icon = layer.icon;

          return (
            <motion.button
              key={layer.id}
              onClick={() => onLayerChange(layer.id)}
              className={`w-full flex items-start gap-3 px-4 py-3 rounded-lg border-2 transition-all text-left ${
                isActive
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200 shadow-md'
                  : 'border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`p-2 rounded-lg ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className={`text-sm font-bold leading-tight ${
                    isActive ? 'text-blue-700' : 'text-slate-700'
                  }`}
                >
                  {layer.id} - {layer.name}
                </div>
                <div className={`text-xs mt-1 ${
                  isActive ? 'text-blue-600' : 'text-slate-500'
                }`}>
                  {layer.description}
                </div>
              </div>
              {isActive && (
                <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="text-xs text-slate-600 space-y-1.5">
          <div className="flex items-start gap-2">
            <span className="font-semibold text-blue-600">L0:</span>
            <span>Shows the organization as a black box with external actors and strategic outcomes</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold text-blue-600">L1:</span>
            <span>Opens the black box to reveal internal business processes and streams</span>
          </div>
        </div>
      </div>

      <div className="mt-3 text-xs text-slate-500 italic text-center">
        💡 Click to switch between levels
      </div>
    </div>
  );
}
