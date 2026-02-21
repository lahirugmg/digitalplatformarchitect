'use client';

import { PERSONA_PROFILES } from '@/lib/architecture-playground/constants';
import { Persona } from '@/lib/architecture-playground/types';
import { useOnboardingStore } from '@/lib/onboarding/store';
import {
  Briefcase,
  Map,
  FileText,
  Palette,
  Building2,
  Shield,
  Database,
  Hammer,
  CheckCircle,
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
  CheckCircle,
};

const PERSONA_GROUPS = {
  'Business & Strategy': ['business', 'product', 'uxdesigner'] as Persona[],
  'Architecture & Analysis': ['ba', 'ea', 'security', 'data'] as Persona[],
  'Engineering & Operations': ['implementation', 'qa'] as Persona[],
};

export default function RoleSelector() {
  const { selectedRole, setRole } = useOnboardingStore();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          I am a...
        </h2>
        <p className="text-slate-600">
          Select your role to get personalized guidance
        </p>
      </div>

      <div className="space-y-6">
        {Object.entries(PERSONA_GROUPS).map(([groupName, personaIds]) => (
          <div key={groupName}>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 px-1">
              {groupName}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {personaIds.map((personaId) => {
                const profile = PERSONA_PROFILES[personaId];
                const Icon = PERSONA_ICONS[profile.icon as keyof typeof PERSONA_ICONS];
                const isSelected = selectedRole === profile.id;

                return (
                  <button
                    key={profile.id}
                    onClick={() => setRole(profile.id)}
                    className={`group relative flex flex-col items-start gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200 shadow-md'
                        : 'border-slate-200 hover:border-purple-300 hover:bg-slate-50'
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-white' : 'bg-slate-100 group-hover:bg-white'
                      }`}
                    >
                      {Icon && (
                        <Icon
                          className="w-6 h-6"
                          style={{ color: profile.color }}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`text-sm font-bold mb-1 ${
                          isSelected ? 'text-purple-900' : 'text-slate-900'
                        }`}
                      >
                        {profile.name}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {profile.description}
                      </p>
                    </div>

                    {/* Selected indicator */}
                    {isSelected && (
                      <div className="absolute top-3 right-3">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center bg-purple-600"
                        >
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
