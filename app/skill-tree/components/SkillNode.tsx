'use client'

import { memo } from 'react'
import { Handle, Position } from 'reactflow'
import Link from 'next/link'
import { getUnlockCost } from '@/lib/unlock-system'

interface SkillNodeProps {
  data: {
    id: string
    title: string
    description: string
    difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
    estimatedTime: number
    xp: number
    isCompleted: boolean
    isUnlocked: boolean
    canUnlock: boolean
    userTokens: number
    playgroundId?: string
    patternId?: string
    onUnlock: () => void
    onComplete: () => void
  }
}

function SkillNode({ data }: SkillNodeProps) {
  const unlockCost = getUnlockCost(data.difficulty)
  const canAfford = data.userTokens >= unlockCost

  const getNodeStyle = () => {
    if (data.isCompleted) {
      return {
        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
        border: '3px solid #d97706',
        color: 'white',
      }
    }
    if (data.isUnlocked) {
      return {
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        border: '3px solid #047857',
        color: 'white',
      }
    }
    if (data.canUnlock) {
      return {
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        border: '3px solid #1d4ed8',
        color: 'white',
      }
    }
    return {
      background: '#f1f5f9',
      border: '2px solid #cbd5e1',
      color: '#64748b',
    }
  }

  const getDifficultyBadge = () => {
    const colors = {
      beginner: 'bg-green-100 text-green-700',
      intermediate: 'bg-blue-100 text-blue-700',
      advanced: 'bg-orange-100 text-orange-700',
      expert: 'bg-red-100 text-red-700',
    }
    return colors[data.difficulty] || colors.beginner
  }

  const nodeStyle = getNodeStyle()

  return (
    <div
      className="skill-node rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl"
      style={{
        ...nodeStyle,
        minWidth: '280px',
        maxWidth: '280px',
        padding: '16px',
      }}
    >
      <Handle type="target" position={Position.Top} style={{ background: '#555' }} />

      {/* Status Badge */}
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyBadge()}`}>
          {data.difficulty}
        </span>
        {data.isCompleted && <span className="text-2xl">✓</span>}
        {!data.isCompleted && !data.isUnlocked && !data.canUnlock && <span className="text-2xl">🔒</span>}
      </div>

      {/* Title */}
      <h3 className="font-bold text-sm mb-2 leading-tight">{data.title}</h3>

      {/* Description */}
      <p className="text-xs mb-3 opacity-90 line-clamp-2">{data.description}</p>

      {/* Stats */}
      <div className="flex items-center gap-3 text-xs mb-3 opacity-90">
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          {data.estimatedTime}min
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {data.xp} XP
        </span>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        {data.isCompleted && (
          <>
            {data.playgroundId && (
              <Link
                href={`/playgrounds/${data.playgroundId}`}
                className="block w-full text-center px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-medium transition"
              >
                Open Playground →
              </Link>
            )}
            {data.patternId && (
              <Link
                href={`/patterns/${data.patternId}`}
                className="block w-full text-center px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-medium transition"
              >
                View Pattern →
              </Link>
            )}
            {!data.playgroundId && !data.patternId && (
              <div className="text-center text-xs opacity-75">✓ Completed</div>
            )}
          </>
        )}

        {!data.isCompleted && data.isUnlocked && (
          <>
            <button
              onClick={data.onComplete}
              className="w-full px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-medium transition"
            >
              Mark as Complete
            </button>
            {data.playgroundId && (
              <Link
                href={`/playgrounds/${data.playgroundId}`}
                className="block w-full text-center px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium transition"
              >
                Start Learning →
              </Link>
            )}
            {data.patternId && (
              <Link
                href={`/patterns/${data.patternId}`}
                className="block w-full text-center px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium transition"
              >
                Read Pattern →
              </Link>
            )}
          </>
        )}

        {!data.isCompleted && !data.isUnlocked && data.canUnlock && (
          <button
            onClick={data.onUnlock}
            disabled={!canAfford}
            className={`w-full px-3 py-2 rounded-lg text-xs font-medium transition ${
              canAfford
                ? 'bg-white/20 hover:bg-white/30 cursor-pointer'
                : 'bg-white/10 cursor-not-allowed opacity-50'
            }`}
          >
            {canAfford ? `Unlock (${unlockCost} 🪙)` : `Need ${unlockCost} tokens`}
          </button>
        )}

        {!data.isCompleted && !data.isUnlocked && !data.canUnlock && (
          <div className="text-center text-xs opacity-75">
            Complete prerequisites first
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} style={{ background: '#555' }} />
    </div>
  )
}

export default memo(SkillNode)
