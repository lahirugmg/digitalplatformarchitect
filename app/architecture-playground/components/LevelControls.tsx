'use client';

import { usePlaygroundStore } from '@/lib/architecture-playground/store';
import { LEVEL_DESCRIPTIONS } from '@/lib/architecture-playground/constants';
import { DetailLevel } from '@/lib/architecture-playground/types';

export default function LevelControls() {
  const { level, setLevel } = usePlaygroundStore();

  const levels: DetailLevel[] = ['L0', 'L1', 'L2', 'L3'];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
      <label className="text-sm font-bold text-slate-700 mb-3 block">
        Detail Level
      </label>

      <div className="flex gap-2">
        {levels.map((lvl) => {
          const isActive = level === lvl;

          return (
            <button
              key={lvl}
              onClick={() => setLevel(lvl)}
              className={`flex-1 px-3 py-2 rounded-lg border-2 transition font-medium text-sm ${
                isActive
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
              title={LEVEL_DESCRIPTIONS[lvl]}
            >
              {lvl}
            </button>
          );
        })}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-200">
        <p className="text-xs text-slate-600">
          {LEVEL_DESCRIPTIONS[level]}
        </p>
      </div>

      <div className="mt-2 text-xs text-slate-500">
        💡 Tip: Scroll to zoom or click levels
      </div>
    </div>
  );
}
