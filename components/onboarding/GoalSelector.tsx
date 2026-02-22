'use client';

import { useState } from 'react';
import { GOALS, getGoalsByRole } from '@/lib/onboarding/goals';
import { useOnboardingStore } from '@/lib/onboarding/store';
import { PERSONA_PROFILES } from '@/lib/architecture-playground/constants';
import { Goal } from '@/lib/onboarding/types';

const CATEGORY_INFO = {
  learn: {
    label: 'Learn',
    color: 'violet',
    description: 'Understand concepts and patterns',
    activeClass: 'bg-violet-600 text-white',
    inactiveClass: 'bg-violet-50 text-violet-700 hover:bg-violet-100',
    badgeClass: 'bg-violet-100 text-violet-700',
  },
  design: {
    label: 'Design',
    color: 'blue',
    description: 'Create new architectures',
    activeClass: 'bg-blue-600 text-white',
    inactiveClass: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
    badgeClass: 'bg-blue-100 text-blue-700',
  },
  evaluate: {
    label: 'Evaluate',
    color: 'cyan',
    description: 'Assess existing systems',
    activeClass: 'bg-cyan-600 text-white',
    inactiveClass: 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100',
    badgeClass: 'bg-cyan-100 text-cyan-700',
  },
  build: {
    label: 'Build',
    color: 'purple',
    description: 'Hands-on implementation',
    activeClass: 'bg-purple-600 text-white',
    inactiveClass: 'bg-purple-50 text-purple-700 hover:bg-purple-100',
    badgeClass: 'bg-purple-100 text-purple-700',
  },
};

const DIFFICULTY_BADGE = {
  beginner: { label: 'Beginner', color: 'bg-green-100 text-green-700' },
  intermediate: { label: 'Intermediate', color: 'bg-yellow-100 text-yellow-700' },
  advanced: { label: 'Advanced', color: 'bg-red-100 text-red-700' },
};

export default function GoalSelector() {
  const { selectedRole, selectedGoal, setGoal } = useOnboardingStore();
  const [selectedCategory, setSelectedCategory] = useState<Goal['category'] | 'all'>('all');

  if (!selectedRole) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Please select a role first</p>
      </div>
    );
  }

  const roleProfile = PERSONA_PROFILES[selectedRole];
  const relevantGoals = getGoalsByRole(selectedRole);

  // Filter by category
  const filteredGoals = selectedCategory === 'all'
    ? relevantGoals
    : relevantGoals.filter(g => g.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          I want to...
        </h2>
        <p className="text-slate-600">
          As a <span className="font-semibold" style={{ color: roleProfile.color }}>
            {roleProfile.name}
          </span>, what would you like to do?
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            selectedCategory === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          All ({relevantGoals.length})
        </button>
        {Object.entries(CATEGORY_INFO).map(([key, info]) => {
          const count = relevantGoals.filter(g => g.category === key).length;
          if (count === 0) return null;

          return (
            <button
              key={key}
              onClick={() => setSelectedCategory(key as Goal['category'])}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedCategory === key
                  ? info.activeClass
                  : info.inactiveClass
              }`}
            >
              {info.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Goals grid */}
      {filteredGoals.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-600">No goals found in this category</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGoals.map((goal) => {
            const isSelected = selectedGoal === goal.id;
            const categoryInfo = CATEGORY_INFO[goal.category];
            const difficultyBadge = DIFFICULTY_BADGE[goal.difficulty];

            return (
              <button
                key={goal.id}
                onClick={() => setGoal(goal.id)}
                className={`group relative flex flex-col gap-3 p-5 rounded-xl border-2 transition-all text-left ${
                  isSelected
                    ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200 shadow-md'
                    : 'border-slate-200 hover:border-purple-300 hover:bg-slate-50'
                }`}
              >
                {/* Icon & Category */}
                <div className="flex items-start justify-between">
                  <div className="text-3xl">{goal.icon}</div>
                  <div className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded ${
                    isSelected
                      ? 'bg-purple-200 text-purple-900'
                      : categoryInfo.badgeClass
                  }`}>
                    {categoryInfo.label}
                  </div>
                </div>

                {/* Title */}
                <h4 className={`text-base font-bold leading-tight ${
                  isSelected ? 'text-purple-900' : 'text-slate-900'
                }`}>
                  {goal.title}
                </h4>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed flex-1">
                  {goal.description}
                </p>

                {/* Meta info */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${difficultyBadge.color}`}>
                    {difficultyBadge.label}
                  </span>
                  <span className="text-xs text-slate-500">
                    {goal.estimatedTime}
                  </span>
                </div>

                {/* Selected indicator */}
                {isSelected && (
                  <div className="absolute top-3 right-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-purple-600">
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
      )}
    </div>
  );
}
