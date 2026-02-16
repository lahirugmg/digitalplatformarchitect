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

const PERSONA_GROUPS = {
  'Business & Strategy': ['business', 'product', 'uxdesigner'],
  'Architecture & Analysis': ['ba', 'ea', 'security', 'data'],
  'Engineering & Operations': ['implementation', 'qa']
} as const;

export default function PersonaSelector() {
  const { persona, setPersona, vertical, setVertical } = usePlaygroundStore();
  const currentProfile = PERSONA_PROFILES[persona];
  const recommendedVertical = currentProfile.recommendedVertical;
  const showSuggestion = recommendedVertical && recommendedVertical !== vertical;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
      <label className="text-sm font-bold text-slate-700 mb-3 block uppercase tracking-wider">
        I&apos;m a...
      </label>

      <div className="space-y-4">
        {Object.entries(PERSONA_GROUPS).map(([groupName, personaIds]) => (
          <div key={groupName}>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">
              {groupName}
            </h3>
            <div className="space-y-1.5">
              {personaIds.map((personaId) => {
                const profile = PERSONA_PROFILES[personaId as Persona];
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
        ))}
      </div>

      {/* Vertical Suggestion */}
      {showSuggestion && recommendedVertical && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs font-semibold text-blue-900 mb-2">
              💡 Recommended view for {currentProfile.name}
            </p>
            <button
              onClick={() => setVertical(recommendedVertical)}
              className="w-full px-3 py-2 bg-blue-100 hover:bg-blue-200 border border-blue-300 rounded text-sm font-medium text-blue-700 transition capitalize"
            >
              Switch to {recommendedVertical} Architecture →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
