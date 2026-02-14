'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import SkillTreeCanvas from './components/SkillTreeCanvas'
import ProgressPanel from './components/ProgressPanel'
import TokenPanel from './components/TokenPanel'
import { loadUserProgress, saveUserProgress } from '@/lib/unlock-system'
import type { UserProgress } from '@/lib/unlock-system'

export default function SkillTreePage() {
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null)
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null)

  // Load user progress on mount
  useEffect(() => {
    const progress = loadUserProgress()
    setUserProgress(progress)
  }, [])

  // Save progress whenever it changes
  useEffect(() => {
    if (userProgress) {
      saveUserProgress(userProgress)
    }
  }, [userProgress])

  const handleProgressUpdate = useCallback((newProgress: UserProgress) => {
    setUserProgress(newProgress)
  }, [])

  if (!userProgress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your learning journey...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">🌳 Architecture Mastery Path</h1>
            <p className="text-blue-100 text-sm">
              Your personalized journey to becoming a platform architect
            </p>
          </div>
          <Link
            href="/"
            className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition"
          >
            ← Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Branch Filter */}
        <div className="w-64 bg-white border-r border-slate-200 p-4 overflow-y-auto">
          <h3 className="font-bold text-sm uppercase text-slate-500 mb-4">Learning Branches</h3>

          <div className="space-y-2">
            <button
              onClick={() => setSelectedBranch(null)}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${
                selectedBranch === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <div className="font-semibold">All Branches</div>
              <div className="text-xs opacity-75 mt-1">View complete skill tree</div>
            </button>

            {[
              { id: 'integration', name: 'Integration', icon: '🔗', color: 'blue' },
              { id: 'data', name: 'Data Architecture', icon: '🗄️', color: 'purple' },
              { id: 'cloud', name: 'Cloud Native', icon: '☁️', color: 'cyan' },
              { id: 'security', name: 'Security', icon: '🔒', color: 'red' },
              { id: 'resilience', name: 'Resilience', icon: '🛡️', color: 'green' },
              { id: 'observability', name: 'Observability', icon: '📊', color: 'orange' },
            ].map((branch) => (
              <button
                key={branch.id}
                onClick={() => setSelectedBranch(branch.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition ${
                  selectedBranch === branch.id
                    ? `bg-${branch.color}-600 text-white`
                    : 'bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{branch.icon}</span>
                  <span className="font-semibold text-sm">{branch.name}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-8 p-4 bg-slate-50 rounded-lg">
            <h4 className="font-semibold text-xs uppercase text-slate-500 mb-3">Legend</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>Unlocked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-slate-300"></div>
                <span>Locked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500 ring-2 ring-yellow-300"></div>
                <span>Completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center - Skill Tree Canvas */}
        <div className="flex-1 relative">
          <SkillTreeCanvas
            userProgress={userProgress}
            onProgressUpdate={handleProgressUpdate}
            selectedBranch={selectedBranch}
          />
        </div>

        {/* Right Sidebar - Progress & Tokens */}
        <div className="w-80 bg-white border-l border-slate-200 overflow-y-auto">
          <TokenPanel
            userProgress={userProgress}
            onProgressUpdate={handleProgressUpdate}
          />
          <ProgressPanel userProgress={userProgress} />
        </div>
      </div>
    </div>
  )
}
