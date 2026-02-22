import { create } from 'zustand';
import { OnboardingState } from './types';
import { Persona } from '../architecture-playground/types';
import { GoalId } from './types';
import { generateJourney } from './journey-engine';
import { GOALS } from './goals';
import { LEGACY_ONBOARDING_KEY } from '@/lib/profile/constants';
import {
  getCachedState,
  isProfileFeatureEnabled,
  queueSync,
  updateCachedOnboarding,
} from '@/lib/profile/profile-client';
import { normalizeOnboardingState } from '@/lib/profile/types';

interface OnboardingStore extends OnboardingState {
  completedAt?: string;
  updatedAt?: string;
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

let isProfileStatusListenerAttached = false;

const VALID_PERSONAS: Persona[] = [
  'business',
  'product',
  'ba',
  'uxdesigner',
  'ea',
  'security',
  'data',
  'implementation',
  'qa',
];

function asPersona(value: string | null): Persona | null {
  if (!value) {
    return null;
  }

  return VALID_PERSONAS.includes(value as Persona) ? (value as Persona) : null;
}

function asGoalId(value: string | null): GoalId | null {
  if (!value) {
    return null;
  }

  return value in GOALS ? (value as GoalId) : null;
}

function toStoreOnboardingState(
  candidate: ReturnType<typeof normalizeOnboardingState>
): Partial<OnboardingStore> | null {
  if (!candidate) {
    return null;
  }

  return {
    currentStep: candidate.currentStep,
    selectedRole: asPersona(candidate.selectedRole),
    selectedGoal: asGoalId(candidate.selectedGoal),
    journey: candidate.journey as OnboardingStore['journey'],
    isComplete: candidate.isComplete,
    completedAt: candidate.completedAt,
    updatedAt: candidate.updatedAt,
  };
}

function readLegacyOnboarding(): Partial<OnboardingStore> | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = localStorage.getItem(LEGACY_ONBOARDING_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as { state?: unknown } | unknown;
    const candidate =
      parsed && typeof parsed === 'object' && 'state' in parsed
        ? (parsed as { state?: unknown }).state
        : parsed;

    const normalized = normalizeOnboardingState(candidate);
    if (!normalized) {
      return null;
    }

    return toStoreOnboardingState(normalized);
  } catch {
    return null;
  }
}

function readCachedOnboarding(): Partial<OnboardingStore> | null {
  if (typeof window === 'undefined' || !isProfileFeatureEnabled()) {
    return null;
  }

  const normalized = normalizeOnboardingState(getCachedState().onboarding);
  return toStoreOnboardingState(normalized);
}

function getInitialOnboardingState(): Partial<OnboardingStore> {
  const cached = readCachedOnboarding();
  if (cached) {
    return cached;
  }

  const legacy = readLegacyOnboarding();
  if (legacy) {
    return legacy;
  }

  return initialState;
}

function buildPersistedOnboarding(state: OnboardingStore) {
  const now = new Date().toISOString();

  return {
    currentStep: state.currentStep,
    selectedRole: state.selectedRole,
    selectedGoal: state.selectedGoal,
    journey: state.journey,
    isComplete: state.isComplete,
    completedAt: state.completedAt,
    updatedAt: now,
  };
}

function persistOnboardingState(state: OnboardingStore): void {
  if (typeof window === 'undefined') {
    return;
  }

  const persisted = buildPersistedOnboarding(state);

  localStorage.setItem(
    LEGACY_ONBOARDING_KEY,
    JSON.stringify({
      state: persisted,
      version: 0,
    })
  );

  if (isProfileFeatureEnabled()) {
    updateCachedOnboarding(persisted);
    queueSync();
  }
}

export const useOnboardingStore = create<OnboardingStore>()((set, get) => ({
  ...initialState,
  ...getInitialOnboardingState(),
  isModalOpen: false,

  setRole: (role) => {
    set((state) => {
      const nextState = { ...state, selectedRole: role, updatedAt: new Date().toISOString() };
      persistOnboardingState(nextState);
      return nextState;
    });
  },

  setGoal: (goal) => {
    set((state) => {
      const nextState = { ...state, selectedGoal: goal, updatedAt: new Date().toISOString() };
      persistOnboardingState(nextState);
      return nextState;
    });
  },

  generatePersonalizedJourney: () => {
    const { selectedRole, selectedGoal } = get();
    if (selectedRole && selectedGoal) {
      const journey = generateJourney(selectedRole, selectedGoal);
      set((state) => {
        const nextState = {
          ...state,
          journey,
          currentStep: 'journey' as const,
          updatedAt: new Date().toISOString(),
        };
        persistOnboardingState(nextState);
        return nextState;
      });
    }
  },

  nextStep: () => {
    const { currentStep, selectedRole, selectedGoal } = get();

    if (currentStep === 'role' && selectedRole) {
      set((state) => {
        const nextState = {
          ...state,
          currentStep: 'goal' as const,
          updatedAt: new Date().toISOString(),
        };
        persistOnboardingState(nextState);
        return nextState;
      });
    } else if (currentStep === 'goal' && selectedGoal) {
      get().generatePersonalizedJourney();
    }
  },

  previousStep: () => {
    const { currentStep } = get();

    if (currentStep === 'goal') {
      set((state) => {
        const nextState = {
          ...state,
          currentStep: 'role' as const,
          updatedAt: new Date().toISOString(),
        };
        persistOnboardingState(nextState);
        return nextState;
      });
    } else if (currentStep === 'journey') {
      set((state) => {
        const nextState = {
          ...state,
          currentStep: 'goal' as const,
          updatedAt: new Date().toISOString(),
        };
        persistOnboardingState(nextState);
        return nextState;
      });
    }
  },

  reset: () => {
    set((state) => {
      const nextState = {
        ...state,
        ...initialState,
        completedAt: undefined,
        updatedAt: new Date().toISOString(),
      };
      persistOnboardingState(nextState);
      return nextState;
    });
  },

  complete: () => {
    const now = new Date().toISOString();
    set((state) => {
      const nextState = {
        ...state,
        isComplete: true,
        completedAt: state.completedAt ?? now,
        updatedAt: now,
      };
      persistOnboardingState(nextState);
      return nextState;
    });
  },

  openModal: () => {
    set({ isModalOpen: true });
  },

  closeModal: () => {
    set({ isModalOpen: false });
  },
}));

if (typeof window !== 'undefined' && !isProfileStatusListenerAttached) {
  isProfileStatusListenerAttached = true;
  window.addEventListener('stemized:profile-status-change', () => {
    const cached = readCachedOnboarding();
    if (!cached) {
      return;
    }

    useOnboardingStore.setState((state) => ({
      ...state,
      ...cached,
    }));
  });
}
