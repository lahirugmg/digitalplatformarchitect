'use client'

import { useState, useEffect } from 'react'
import { UserProgress, grantDailyTokens, calculateDailyTokens } from '@/lib/unlock-system'

interface TokenPanelProps {
  userProgress: UserProgress
  onProgressUpdate: (progress: UserProgress) => void
}

export default function TokenPanel({ userProgress, onProgressUpdate }: TokenPanelProps) {
  const [timeUntilTokens, setTimeUntilTokens] = useState('')

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date()
      const tomorrow = new Date(now)
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)

      const diff = tomorrow.getTime() - now.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeUntilTokens(`${hours}h ${minutes}m ${seconds}s`)
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleClaimTokens = () => {
    const newProgress = grantDailyTokens(userProgress)
    if (newProgress.tokens > userProgress.tokens) {
      onProgressUpdate(newProgress)
      alert(`🎉 Daily tokens claimed! +${newProgress.tokens - userProgress.tokens} tokens`)
    } else {
      alert('⏰ You already claimed today\'s tokens. Come back tomorrow!')
    }
  }

  const dailyTokens = calculateDailyTokens(userProgress.streakDays)

  return (
    <div className="p-6 border-b border-slate-200">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <span className="text-2xl">🪙</span>
        Unlock Tokens
      </h3>

      {/* Token Balance */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-6 mb-4 text-center">
        <div className="text-sm text-slate-600 mb-1">Your Balance</div>
        <div className="text-5xl font-bold text-yellow-600 mb-2">{userProgress.tokens}</div>
        <div className="text-xs text-slate-500">tokens available</div>
      </div>

      {/* Daily Claim */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-semibold text-sm">Daily Tokens</div>
            <div className="text-xs text-slate-600">Claim your free tokens!</div>
          </div>
          <div className="text-2xl font-bold text-blue-600">+{dailyTokens}</div>
        </div>
        <button
          onClick={handleClaimTokens}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition text-sm"
        >
          Claim Now
        </button>
        <div className="text-xs text-center text-slate-500 mt-2">
          Next tokens in: {timeUntilTokens}
        </div>
      </div>

      {/* Streak Bonus */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <div>
              <div className="font-semibold text-sm">Streak Bonus</div>
              <div className="text-xs text-slate-600">{userProgress.streakDays} days</div>
            </div>
          </div>
        </div>

        {/* Streak Milestones */}
        <div className="space-y-2 mt-3">
          <StreakMilestone current={userProgress.streakDays} target={7} bonus={2} />
          <StreakMilestone current={userProgress.streakDays} target={30} bonus={5} />
          <StreakMilestone current={userProgress.streakDays} target={100} bonus={10} />
        </div>
      </div>

      {/* How Tokens Work */}
      <div className="mt-4 p-4 bg-slate-50 rounded-lg">
        <h4 className="font-semibold text-xs uppercase text-slate-500 mb-2">How Tokens Work</h4>
        <ul className="text-xs text-slate-600 space-y-1">
          <li>• Earn 3 tokens daily by claiming</li>
          <li>• Maintain streaks for bonus tokens</li>
          <li>• Spend tokens to unlock new skills</li>
          <li>• Harder skills cost more tokens</li>
        </ul>
      </div>
    </div>
  )
}

function StreakMilestone({
  current,
  target,
  bonus,
}: {
  current: number
  target: number
  bonus: number
}) {
  const percentage = Math.min((current / target) * 100, 100)
  const achieved = current >= target

  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className={achieved ? 'text-green-600 font-semibold' : 'text-slate-600'}>
          {achieved ? '✓' : ''} {target} days
        </span>
        <span className="text-orange-600 font-semibold">+{bonus} tokens/day</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${
            achieved ? 'bg-green-500' : 'bg-orange-400'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
