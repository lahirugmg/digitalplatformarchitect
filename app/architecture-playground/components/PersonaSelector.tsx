'use client';

import { PERSONA_PROFILES } from '@/lib/architecture-playground/constants';
import { usePlaygroundStore } from '@/lib/architecture-playground/store';
import { Persona } from '@/lib/architecture-playground/types';
import {
  Briefcase,
  Map,
  FileText,
  Palette,
  Building2,
  Shield,
  Database,
  Hammer,
  CheckCircle
} from 'lucide-react';

const PERSONA_ICONS = {
  Briefcase,
  Map,
  FileText,
  Palette,
  Building2,
  Shield,
  Database,
  Hammer,
  CheckCircle
};

export default function PersonaSelector() {
  const { persona, setPersona } = usePlaygroundStore();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
      <label className="text-sm font-bold text-slate-700 mb-3 block uppercase tracking-wider">
        I&apos;m a...
      </label>

      <div className="space-y-1.5">
        {Object.values(PERSONA_PROFILES).map((profile) => {
          const Icon = PERSONA_ICONS[profile.icon as keyof typeof PERSONA_ICONS];
          const isActive = persona === profile.id;

          return (
            <button
              key={profile.id}
              onClick={() => setPersona(profile.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border-2 transition-all text-left ${
                isActive
                  ? 'border-purple-500 bg-purple-50 ring-1 ring-purple-200 shadow-sm'
                  : 'border-transparent hover:bg-slate-50 hover:border-slate-200'
              }`}
              title={profile.description}
            >
              {Icon && (
                <Icon
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: isActive ? profile.color : '#94a3b8' }}
                />
              )}
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-semibold leading-tight truncate ${
                  isActive ? 'text-purple-700' : 'text-slate-700'
                }`}>
                  {profile.name}
                </div>
                {isActive && (
                  <div className="text-xs text-slate-500 mt-0.5 truncate">
                    {profile.description}
                  </div>
                )}
              </div>
              {isActive && (
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: profile.color }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
