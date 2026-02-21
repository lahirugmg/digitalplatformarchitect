'use client';

import { useEffect } from 'react';
import { useOnboardingStore } from '@/lib/onboarding/store';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import RoleSelector from './RoleSelector';
import GoalSelector from './GoalSelector';
import JourneyView from './JourneyView';

export default function OnboardingModal() {
  const {
    isModalOpen,
    closeModal,
    currentStep,
    selectedRole,
    selectedGoal,
    nextStep,
    previousStep,
    reset,
  } = useOnboardingStore();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  const canGoNext =
    (currentStep === 'role' && selectedRole) ||
    (currentStep === 'goal' && selectedGoal);

  const canGoBack = currentStep !== 'role';

  const handleClose = () => {
    closeModal();
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          {/* Progress indicator */}
          <div className="flex items-center gap-2">
            <StepIndicator
              label="Role"
              isActive={currentStep === 'role'}
              isComplete={currentStep !== 'role'}
            />
            <div className="w-8 h-0.5 bg-slate-200">
              <div
                className={`h-full transition-all ${
                  currentStep !== 'role' ? 'bg-purple-600 w-full' : 'bg-transparent w-0'
                }`}
              />
            </div>
            <StepIndicator
              label="Goal"
              isActive={currentStep === 'goal'}
              isComplete={currentStep === 'journey'}
            />
            <div className="w-8 h-0.5 bg-slate-200">
              <div
                className={`h-full transition-all ${
                  currentStep === 'journey' ? 'bg-purple-600 w-full' : 'bg-transparent w-0'
                }`}
              />
            </div>
            <StepIndicator
              label="Journey"
              isActive={currentStep === 'journey'}
              isComplete={false}
            />
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          {currentStep === 'role' && <RoleSelector />}
          {currentStep === 'goal' && <GoalSelector />}
          {currentStep === 'journey' && <JourneyView />}
        </div>

        {/* Footer */}
        {currentStep !== 'journey' && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
            <div className="flex gap-2">
              {canGoBack && (
                <button
                  onClick={previousStep}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 hover:bg-white transition text-sm font-medium text-slate-700"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
              )}
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg hover:bg-slate-100 transition text-sm text-slate-600"
              >
                Start Over
              </button>
            </div>

            <button
              onClick={nextStep}
              disabled={!canGoNext}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition ${
                canGoNext
                  ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StepIndicator({
  label,
  isActive,
  isComplete,
}: {
  label: string;
  isActive: boolean;
  isComplete: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition ${
          isComplete
            ? 'bg-purple-600 text-white'
            : isActive
            ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-600'
            : 'bg-slate-100 text-slate-400'
        }`}
      >
        {isComplete ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <span>{label === 'Role' ? '1' : label === 'Goal' ? '2' : '3'}</span>
        )}
      </div>
      <span
        className={`text-sm font-medium hidden sm:inline ${
          isActive ? 'text-slate-900' : 'text-slate-500'
        }`}
      >
        {label}
      </span>
    </div>
  );
}
