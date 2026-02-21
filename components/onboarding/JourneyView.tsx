'use client';

import Link from 'next/link';
import { useOnboardingStore } from '@/lib/onboarding/store';
import { PERSONA_PROFILES } from '@/lib/architecture-playground/constants';
import { GOALS } from '@/lib/onboarding/goals';
import { Recommendation } from '@/lib/onboarding/types';
import { ExternalLink, CheckCircle2, PlayCircle, BookOpen, Building, Blocks } from 'lucide-react';

const RECOMMENDATION_TYPE_INFO = {
  playground: {
    icon: PlayCircle,
    color: 'blue',
    label: 'Interactive Playground',
  },
  pattern: {
    icon: Blocks,
    color: 'violet',
    label: 'Pattern',
  },
  article: {
    icon: BookOpen,
    color: 'cyan',
    label: 'Article',
  },
  'skill-tree': {
    icon: Building,
    color: 'purple',
    label: 'Skill Tree',
  },
  'building-block': {
    icon: Building,
    color: 'slate',
    label: 'Building Block',
  },
};

export default function JourneyView() {
  const { journey, selectedRole, selectedGoal, closeModal, complete } = useOnboardingStore();

  if (!journey || !selectedRole || !selectedGoal) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">No journey generated</p>
      </div>
    );
  }

  const roleProfile = PERSONA_PROFILES[selectedRole];
  const goalInfo = GOALS[selectedGoal];

  const primaryRecs = journey.recommendations.filter(r => r.priority === 'primary');
  const secondaryRecs = journey.recommendations.filter(r => r.priority !== 'primary');

  const handleStartJourney = () => {
    complete();
    closeModal();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${roleProfile.color}20` }}
          >
            {goalInfo.icon}
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Your Personalized Journey
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          As a <span className="font-semibold" style={{ color: roleProfile.color }}>
            {roleProfile.name}
          </span>, here&apos;s your path to{' '}
          <span className="font-semibold">{goalInfo.title.toLowerCase()}</span>
        </p>
      </div>

      {/* Primary Recommendations */}
      {primaryRecs.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">
            Start Here
          </h3>
          <div className="space-y-3">
            {primaryRecs.map((rec, idx) => (
              <RecommendationCard key={idx} recommendation={rec} isPrimary />
            ))}
          </div>
        </div>
      )}

      {/* Secondary Recommendations */}
      {secondaryRecs.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">
            Explore More
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {secondaryRecs.map((rec, idx) => (
              <RecommendationCard key={idx} recommendation={rec} />
            ))}
          </div>
        </div>
      )}

      {/* Next Steps */}
      {journey.nextSteps.length > 0 && (
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6">
          <h3 className="text-sm font-bold text-purple-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Recommended Steps
          </h3>
          <ol className="space-y-2">
            {journey.nextSteps.map((step, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-slate-700">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* CTA */}
      <div className="flex gap-3 justify-center pt-4">
        <button
          onClick={handleStartJourney}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition shadow-lg shadow-purple-600/30"
        >
          Start My Journey
        </button>
      </div>
    </div>
  );
}

function RecommendationCard({
  recommendation,
  isPrimary = false,
}: {
  recommendation: Recommendation;
  isPrimary?: boolean;
}) {
  const typeInfo = RECOMMENDATION_TYPE_INFO[recommendation.type];
  const Icon = typeInfo.icon;

  return (
    <Link
      href={recommendation.url}
      className={`group block rounded-xl border-2 transition-all ${
        isPrimary
          ? 'border-purple-300 bg-purple-50 hover:border-purple-400 hover:shadow-lg p-5'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md p-4'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
            isPrimary ? 'bg-purple-200' : 'bg-slate-100'
          }`}
        >
          <Icon
            className={`w-5 h-5 ${
              isPrimary ? 'text-purple-700' : 'text-slate-600'
            }`}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4
              className={`font-bold leading-tight ${
                isPrimary ? 'text-purple-900 text-base' : 'text-slate-900 text-sm'
              }`}
            >
              {recommendation.title}
            </h4>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-purple-600 flex-shrink-0 transition" />
          </div>

          <p
            className={`leading-relaxed mb-2 ${
              isPrimary ? 'text-sm text-slate-700' : 'text-xs text-slate-600'
            }`}
          >
            {recommendation.description}
          </p>

          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-${typeInfo.color}-100 text-${typeInfo.color}-700`}
            >
              {typeInfo.label}
            </span>
            {recommendation.estimatedTime && (
              <span className="text-xs text-slate-500">
                {recommendation.estimatedTime}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
