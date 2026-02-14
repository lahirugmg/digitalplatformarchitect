'use client'

import { useMemo } from 'react'
import { UserProgress, getProgressToNextLevel, getUnlockedAchievements } from '@/lib/unlock-system'
import { calculateProgress, skillTreeData } from '@/lib/skill-tree'

interface ProgressPanelProps {
  userProgress: UserProgress
}

export default function ProgressPanel({ userProgress }: ProgressPanelProps) {
  const progress = useMemo(() => calculateProgress(userProgress.completedNodes), [userProgress])
  const levelProgress = useMemo(
    () => getProgressToNextLevel(userProgress.totalXP, userProgress.level),
    [userProgress]
  )
  const achievements = useMemo(() => getUnlockedAchievements(userProgress), [userProgress])

  // Calculate branch progress
  const branchProgress = useMemo(() => {
    return skillTreeData.map(branch => {
      const totalNodes = branch.nodes.length
      const completedNodes = branch.nodes.filter(node =>
        userProgress.completedNodes.includes(node.id)
      ).length
      const percentage = Math.round((completedNodes / totalNodes) * 100)

      return {
        ...branch,
        completed: completedNodes,
        total: totalNodes,
        percentage,
      }
    })
  }, [userProgress])

  return (
    <div className="p-6">
      {/* Level Progress */}
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <span className="text-2xl">⭐</span>
          Level {userProgress.level}
        </h3>

        <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress to Level {userProgress.level + 1}</span>
            <span className="text-sm font-bold text-purple-600">{levelProgress.percentage}%</span>
          </div>

          <div className="w-full bg-white rounded-full h-3 overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
              style={{ width: `${levelProgress.percentage}%` }}
            />
          </div>

          <div className="text-xs text-slate-600 text-center">
            {levelProgress.current} / {levelProgress.needed} XP
          </div>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-4">📈 Overall Progress</h3>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-600">{progress.completedCount}</div>
            <div className="text-xs text-slate-600">Skills Mastered</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-purple-600">{progress.xpEarned}</div>
            <div className="text-xs text-slate-600">Total XP</div>
          </div>
        </div>

        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
        <div className="text-xs text-slate-600 text-center mt-1">
          {progress.completedCount} / {progress.totalNodes} skills ({progress.percentage}%)
        </div>
      </div>

      {/* Branch Progress */}
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-4">🌳 Branch Progress</h3>

        <div className="space-y-3">
          {branchProgress.map(branch => (
            <div key={branch.id} className="bg-slate-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span>{branch.icon}</span>
                  <span className="text-sm font-medium">{branch.name}</span>
                </div>
                <span className="text-xs font-semibold">
                  {branch.completed}/{branch.total}
                </span>
              </div>
              <div className="w-full bg-white rounded-full h-2 overflow-hidden">
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${branch.percentage}%`,
                    background: getBranchGradient(branch.id),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <span className="text-2xl">🏆</span>
          Achievements
          <span className="text-sm font-normal text-slate-500">({achievements.length}/8)</span>
        </h3>

        <div className="space-y-2">
          {achievements.length > 0 ? (
            achievements.map(achievement => (
              <div
                key={achievement.id}
                className="flex items-center gap-3 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3"
              >
                <span className="text-3xl">{achievement.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{achievement.title}</div>
                  <div className="text-xs text-slate-600">{achievement.description}</div>
                </div>
                <div className="text-xs font-bold text-orange-600">+{achievement.xpReward} XP</div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-slate-400">
              <div className="text-4xl mb-2">🎯</div>
              <div className="text-sm">Complete challenges to earn achievements!</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function getBranchGradient(branchId: string): string {
  const gradients: Record<string, string> = {
    integration: 'linear-gradient(90deg, #3b82f6, #2563eb)',
    data: 'linear-gradient(90deg, #a855f7, #9333ea)',
    cloud: 'linear-gradient(90deg, #06b6d4, #0891b2)',
    security: 'linear-gradient(90deg, #ef4444, #dc2626)',
    resilience: 'linear-gradient(90deg, #10b981, #059669)',
    observability: 'linear-gradient(90deg, #f97316, #ea580c)',
  }
  return gradients[branchId] || 'linear-gradient(90deg, #64748b, #475569)'
}
