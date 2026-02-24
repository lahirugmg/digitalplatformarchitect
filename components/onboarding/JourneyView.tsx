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
    label: 'Interactive Playground',
    badgeClass: 'bg-slate-100 text-slate-700',
  },
  pattern: {
    icon: Blocks,
    label: 'Pattern',
    badgeClass: 'bg-slate-100 text-slate-700',
  },
  article: {
    icon: BookOpen,
    label: 'Article',
    badgeClass: 'bg-slate-100 text-slate-700',
  },
  'skill-tree': {
    icon: Building,
    label: 'Skill Tree',
    badgeClass: 'bg-slate-100 text-slate-700',
  },
  'building-block': {
    icon: Building,
    label: 'Building Block',
    badgeClass: 'bg-slate-100 text-slate-700',
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
            style={{ backgroundColor: '#dbeafe' }}
          >
            {goalInfo.icon}
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Your Personalized Journey
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          As a <span className="font-semibold text-blue-700">
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
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Recommended Steps
          </h3>
          <ol className="space-y-2">
            {journey.nextSteps.map((step, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-slate-700">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
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
          className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold transition hover:bg-blue-700 shadow-sm"
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
          ? 'border-blue-200 bg-blue-50 hover:border-blue-300 hover:shadow-sm p-5'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md p-4'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
            isPrimary ? 'bg-blue-100' : 'bg-slate-100'
          }`}
        >
          <Icon
            className={`w-5 h-5 ${
              isPrimary ? 'text-blue-700' : 'text-slate-600'
            }`}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4
              className={`font-bold leading-tight ${
                isPrimary ? 'text-blue-900 text-base' : 'text-slate-900 text-sm'
              }`}
            >
              {recommendation.title}
            </h4>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-700 flex-shrink-0 transition" />
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
              className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${typeInfo.badgeClass}`}
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
