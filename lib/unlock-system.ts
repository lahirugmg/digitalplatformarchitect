import { LEGACY_PROGRESS_KEY } from '@/lib/profile/constants'
import {
  getCachedState,
  isProfileFeatureEnabled,
  queueSync,
  updateCachedProgress,
} from '@/lib/profile/profile-client'
import { normalizeProgressState } from '@/lib/profile/types'

export interface UserProgress {
  userId: string
  completedNodes: string[]
  unlockedNodes: string[]
  tokens: number
  lastTokenGrant: string // ISO date
  streakDays: number
  lastActivityDate: string // ISO date
  totalXP: number
  level: number
  completedAtByNode?: Record<string, string>
  updatedAt?: string
}

export interface UnlockCost {
  baseTokens: number
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

// Token economy configuration
const UNLOCK_COSTS: Record<string, number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
  expert: 5,
}

const DAILY_TOKEN_GRANT = 3
const STREAK_BONUS_7_DAYS = 2
const STREAK_BONUS_30_DAYS = 5
const STREAK_BONUS_100_DAYS = 10
const PROGRESS_STORAGE_KEY = LEGACY_PROGRESS_KEY

// Token System
export function calculateDailyTokens(streakDays: number): number {
  let tokens = DAILY_TOKEN_GRANT

  if (streakDays >= 100) {
    tokens += STREAK_BONUS_100_DAYS
  } else if (streakDays >= 30) {
    tokens += STREAK_BONUS_30_DAYS
  } else if (streakDays >= 7) {
    tokens += STREAK_BONUS_7_DAYS
  }

  return tokens
}

export function shouldGrantDailyTokens(lastTokenGrant: string): boolean {
  const lastGrant = new Date(lastTokenGrant)
  const now = new Date()

  // Check if it's a new day (UTC)
  const lastGrantDay = new Date(lastGrant.toDateString())
  const today = new Date(now.toDateString())

  return today > lastGrantDay
}

export function calculateStreak(lastActivityDate: string): number {
  const lastActivity = new Date(lastActivityDate)
  const now = new Date()

  const diffTime = now.getTime() - lastActivity.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  // Streak broken if more than 1 day since last activity
  if (diffDays > 1) {
    return 0
  }

  return 1 // Continue streak
}

export function grantDailyTokens(userProgress: UserProgress): UserProgress {
  if (!shouldGrantDailyTokens(userProgress.lastTokenGrant)) {
    return userProgress
  }

  const now = new Date().toISOString()
  const newStreak = userProgress.streakDays + calculateStreak(userProgress.lastActivityDate)
  const tokensToGrant = calculateDailyTokens(newStreak)

  return {
    ...userProgress,
    tokens: userProgress.tokens + tokensToGrant,
    lastTokenGrant: now,
    streakDays: newStreak,
    lastActivityDate: now,
    updatedAt: now,
  }
}

// Unlock Node
export function getUnlockCost(difficulty: string): number {
  return UNLOCK_COSTS[difficulty] || 1
}

export function canAffordUnlock(tokens: number, difficulty: string): boolean {
  const cost = getUnlockCost(difficulty)
  return tokens >= cost
}

export function unlockNode(
  userProgress: UserProgress,
  nodeId: string,
  difficulty: string
): { success: boolean; userProgress: UserProgress; message: string } {
  const cost = getUnlockCost(difficulty)

  if (!canAffordUnlock(userProgress.tokens, difficulty)) {
    return {
      success: false,
      userProgress,
      message: `Not enough tokens. Need ${cost}, have ${userProgress.tokens}`,
    }
  }

  if (userProgress.unlockedNodes.includes(nodeId)) {
    return {
      success: false,
      userProgress,
      message: 'Node already unlocked',
    }
  }

  const newProgress: UserProgress = {
    ...userProgress,
    tokens: userProgress.tokens - cost,
    unlockedNodes: [...userProgress.unlockedNodes, nodeId],
    lastActivityDate: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return {
    success: true,
    userProgress: newProgress,
    message: `Successfully unlocked! Spent ${cost} tokens`,
  }
}

// Complete Node
export function completeNode(
  userProgress: UserProgress,
  nodeId: string,
  xpReward: number
): UserProgress {
  if (userProgress.completedNodes.includes(nodeId)) {
    return userProgress
  }

  const newXP = userProgress.totalXP + xpReward
  const newLevel = calculateLevel(newXP)

  const completedAt = new Date().toISOString()
  return {
    ...userProgress,
    completedNodes: [...userProgress.completedNodes, nodeId],
    totalXP: newXP,
    level: newLevel,
    lastActivityDate: completedAt,
    completedAtByNode: {
      ...(userProgress.completedAtByNode ?? {}),
      [nodeId]: completedAt,
    },
    updatedAt: completedAt,
  }
}

// Level System
export function calculateLevel(totalXP: number): number {
  // Level progression: 1000 XP for level 2, then +500 XP per level
  if (totalXP < 1000) return 1
  return Math.floor((totalXP - 1000) / 500) + 2
}

export function getXPForNextLevel(currentLevel: number): number {
  if (currentLevel === 1) return 1000
  return 1000 + (currentLevel - 1) * 500
}

export function getProgressToNextLevel(totalXP: number, currentLevel: number): {
  current: number
  needed: number
  percentage: number
} {
  const xpForCurrentLevel = currentLevel === 1 ? 0 : 1000 + (currentLevel - 2) * 500
  const xpForNextLevel = getXPForNextLevel(currentLevel)
  const xpNeededForLevel = xpForNextLevel - xpForCurrentLevel
  const xpEarnedInLevel = totalXP - xpForCurrentLevel
  const percentage = Math.round((xpEarnedInLevel / xpNeededForLevel) * 100)

  return {
    current: xpEarnedInLevel,
    needed: xpNeededForLevel,
    percentage: Math.min(percentage, 100),
  }
}

// Initialize new user
export function createNewUserProgress(userId: string): UserProgress {
  const now = new Date().toISOString()
  return {
    userId,
    completedNodes: [],
    unlockedNodes: [],
    tokens: 5, // Starting tokens
    lastTokenGrant: now,
    streakDays: 0,
    lastActivityDate: now,
    totalXP: 0,
    level: 1,
    completedAtByNode: {},
    updatedAt: now,
  }
}

// Storage helpers (localStorage)
export function saveUserProgress(userProgress: UserProgress): void {
  if (typeof window !== 'undefined') {
    const payload: UserProgress = {
      ...userProgress,
      updatedAt: new Date().toISOString(),
    }

    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(payload))

    if (isProfileFeatureEnabled()) {
      updateCachedProgress(payload)
      queueSync()
    }
  }
}

export function loadUserProgress(userId: string = 'default'): UserProgress {
  if (typeof window !== 'undefined') {
    if (isProfileFeatureEnabled()) {
      const cachedProgress = normalizeProgressState(getCachedState().progress)
      if (cachedProgress) {
        return grantDailyTokens(cachedProgress)
      }
    }

    const saved = localStorage.getItem(PROGRESS_STORAGE_KEY)
    if (saved) {
      try {
        const progress = normalizeProgressState(JSON.parse(saved))
        if (!progress) {
          return createNewUserProgress(userId)
        }
        // Auto-grant daily tokens if applicable
        return grantDailyTokens(progress)
      } catch (e) {
        console.error('Error loading user progress:', e)
      }
    }
  }
  return createNewUserProgress(userId)
}

// Achievements
export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  condition: (userProgress: UserProgress) => boolean
  xpReward: number
}

export const achievements: Achievement[] = [
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Complete your first skill node',
    icon: '🎯',
    condition: (progress) => progress.completedNodes.length >= 1,
    xpReward: 50,
  },
  {
    id: 'week-warrior',
    title: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    condition: (progress) => progress.streakDays >= 7,
    xpReward: 200,
  },
  {
    id: 'month-master',
    title: 'Month Master',
    description: 'Maintain a 30-day learning streak',
    icon: '🏆',
    condition: (progress) => progress.streakDays >= 30,
    xpReward: 500,
  },
  {
    id: 'centurion',
    title: 'Centurion',
    description: 'Maintain a 100-day learning streak',
    icon: '👑',
    condition: (progress) => progress.streakDays >= 100,
    xpReward: 1000,
  },
  {
    id: 'integration-expert',
    title: 'Integration Expert',
    description: 'Complete all Integration branch nodes',
    icon: '🔗',
    condition: (progress) => {
      const integrationNodes = ['int-001', 'int-002', 'int-003', 'int-004', 'int-005', 'int-006', 'int-007']
      return integrationNodes.every(id => progress.completedNodes.includes(id))
    },
    xpReward: 500,
  },
  {
    id: 'data-architect',
    title: 'Data Architect',
    description: 'Complete all Data Architecture branch nodes',
    icon: '🗄️',
    condition: (progress) => {
      const dataNodes = ['data-001', 'data-002', 'data-003', 'data-004', 'data-005']
      return dataNodes.every(id => progress.completedNodes.includes(id))
    },
    xpReward: 500,
  },
  {
    id: 'level-10',
    title: 'Apprentice Architect',
    description: 'Reach level 10',
    icon: '⭐',
    condition: (progress) => progress.level >= 10,
    xpReward: 300,
  },
  {
    id: 'level-25',
    title: 'Expert Architect',
    description: 'Reach level 25',
    icon: '🌟',
    condition: (progress) => progress.level >= 25,
    xpReward: 1000,
  },
]

export function getUnlockedAchievements(userProgress: UserProgress): Achievement[] {
  return achievements.filter(achievement => achievement.condition(userProgress))
}

export function getNewAchievements(
  oldProgress: UserProgress,
  newProgress: UserProgress
): Achievement[] {
  const oldAchievements = getUnlockedAchievements(oldProgress)
  const newAchievements = getUnlockedAchievements(newProgress)

  return newAchievements.filter(
    newAch => !oldAchievements.some(oldAch => oldAch.id === newAch.id)
  )
}
