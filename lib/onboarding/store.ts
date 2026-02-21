import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { OnboardingState, Journey } from './types';
import { Persona } from '../architecture-playground/types';
import { GoalId } from './types';
import { generateJourney } from './journey-engine';

interface OnboardingStore extends OnboardingState {
  // Actions
  setRole: (role: Persona) => void;
  setGoal: (goal: GoalId) => void;
  generatePersonalizedJourney: () => void;
  nextStep: () => void;
  previousStep: () => void;
  reset: () => void;
  complete: () => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const initialState: OnboardingState = {
  currentStep: 'role',
  selectedRole: null,
  selectedGoal: null,
  journey: null,
  isComplete: false,
};

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      isModalOpen: false,

      setRole: (role) => {
        set({ selectedRole: role });
      },

      setGoal: (goal) => {
        set({ selectedGoal: goal });
      },

      generatePersonalizedJourney: () => {
        const { selectedRole, selectedGoal } = get();
        if (selectedRole && selectedGoal) {
          const journey = generateJourney(selectedRole, selectedGoal);
          set({ journey, currentStep: 'journey' });
        }
      },

      nextStep: () => {
        const { currentStep, selectedRole, selectedGoal } = get();

        if (currentStep === 'role' && selectedRole) {
          set({ currentStep: 'goal' });
        } else if (currentStep === 'goal' && selectedGoal) {
          get().generatePersonalizedJourney();
        }
      },

      previousStep: () => {
        const { currentStep } = get();

        if (currentStep === 'goal') {
          set({ currentStep: 'role' });
        } else if (currentStep === 'journey') {
          set({ currentStep: 'goal' });
        }
      },

      reset: () => {
        set(initialState);
      },

      complete: () => {
        set({ isComplete: true });
      },

      openModal: () => {
        set({ isModalOpen: true });
      },

      closeModal: () => {
        set({ isModalOpen: false });
      },
    }),
    {
      name: 'onboarding-storage',
      partialize: (state) => ({
        selectedRole: state.selectedRole,
        selectedGoal: state.selectedGoal,
        journey: state.journey,
        isComplete: state.isComplete,
      }),
    }
  )
);
