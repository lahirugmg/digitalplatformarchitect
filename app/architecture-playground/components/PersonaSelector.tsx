'use client';

import { PERSONA_PROFILES } from '@/lib/architecture-playground/constants';
import { usePlaygroundStore } from '@/lib/architecture-playground/store';
import { Persona } from '@/lib/architecture-playground/types';
import { Briefcase, BarChart, Building, Settings, Code } from 'lucide-react';

const PERSONA_ICONS = {
  Briefcase,
  BarChart,
  Building,
  Settings,
  Code
};

export default function PersonaSelector() {
  const { persona, setPersona } = usePlaygroundStore();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
      <label className="text-sm font-bold text-slate-700 mb-3 block">
        I&apos;m a...
      </label>

      <div className="grid grid-cols-5 gap-2">
        {Object.values(PERSONA_PROFILES).map((profile) => {
          const Icon = PERSONA_ICONS[profile.icon as keyof typeof PERSONA_ICONS];
          const isActive = persona === profile.id;

          return (
            <button
              key={profile.id}
              onClick={() => setPersona(profile.id)}
              className={`p-3 rounded-lg border-2 transition text-center hover:border-slate-400 ${
                isActive
                  ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200'
                  : 'border-slate-200'
              }`}
              title={profile.description}
            >
              {Icon && <Icon className="w-6 h-6 mx-auto mb-1" style={{ color: isActive ? profile.color : '#64748b' }} />}
              <div className={`text-xs font-medium ${isActive ? 'text-purple-700' : 'text-slate-700'}`}>
                {profile.name.split(' ')[0]}
              </div>
            </button>
          );
        })}
      </div>

      {persona && (
        <div className="mt-3 pt-3 border-t border-slate-200">
          <p className="text-xs text-slate-600">
            {PERSONA_PROFILES[persona].description}
          </p>
        </div>
      )}
    </div>
  );
}
