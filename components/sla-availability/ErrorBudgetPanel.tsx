'use client'

import { ErrorBudget } from '@/lib/sla-availability/types'
import { formatDowntime, formatNumber } from '@/lib/sla-availability/calculations'
import { TrendingDown, TrendingUp, Info } from 'lucide-react'

interface ErrorBudgetPanelProps {
  errorBudget: ErrorBudget
  sloPercentage: number
}

export default function ErrorBudgetPanel({ errorBudget, sloPercentage }: ErrorBudgetPanelProps) {
  const budgetHealthy = errorBudget.percentConsumed < 50
  const budgetWarning = errorBudget.percentConsumed >= 50 && errorBudget.percentConsumed < 75
  const budgetCritical = errorBudget.percentConsumed >= 75

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">Error Budget</h3>
        <p className="text-sm text-slate-600">
          Your allowed failure budget for {sloPercentage}% SLO target
        </p>
      </div>

      {/* Budget Consumption Visual */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-slate-700">Budget Consumed</span>
          <span className={`text-lg font-bold ${
            budgetCritical ? 'text-red-600' : budgetWarning ? 'text-orange-600' : 'text-green-600'
          }`}>
            {errorBudget.percentConsumed.toFixed(1)}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-6 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
          <div
            className={`h-full transition-all duration-500 ${
              budgetCritical
                ? 'bg-red-500'
                : budgetWarning
                ? 'bg-orange-500'
                : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(100, errorBudget.percentConsumed)}%` }}
          />
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-slate-500">0%</span>
          <span className="text-xs text-slate-500">100%</span>
        </div>

        {/* Status Message */}
        <div className={`mt-3 p-3 rounded-lg border ${
          budgetCritical
            ? 'bg-red-50 border-red-200'
            : budgetWarning
            ? 'bg-orange-50 border-orange-200'
            : 'bg-green-50 border-green-200'
        }`}>
          <div className="flex items-start gap-2">
            {budgetCritical ? (
              <TrendingUp className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            ) : budgetWarning ? (
              <TrendingUp className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            ) : (
              <TrendingDown className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="text-sm">
              <p className={`font-semibold ${
                budgetCritical ? 'text-red-900' : budgetWarning ? 'text-orange-900' : 'text-green-900'
              }`}>
                {budgetCritical
                  ? 'CRITICAL: Error budget nearly exhausted'
                  : budgetWarning
                  ? 'WARNING: Error budget consumption high'
                  : 'HEALTHY: Sufficient error budget remaining'}
              </p>
              <p className={`text-xs mt-1 ${
                budgetCritical ? 'text-red-700' : budgetWarning ? 'text-orange-700' : 'text-green-700'
              }`}>
                {budgetCritical
                  ? 'Implement change freeze and focus on reliability'
                  : budgetWarning
                  ? 'Monitor closely and prepare mitigation plans'
                  : 'Continue normal operations and deployments'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Breakdown - Request-Based */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
          Request-Based Budget
          <button className="text-slate-400 hover:text-slate-600" title="How is this calculated?">
            <Info className="w-4 h-4" />
          </button>
        </h4>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Total Requests</span>
            <span className="text-sm font-semibold text-slate-900">
              {formatNumber(errorBudget.totalRequests)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Allowed Failures</span>
            <span className="text-sm font-semibold text-slate-900">
              {formatNumber(errorBudget.allowedFailures)}
            </span>
          </div>

          <div className="h-px bg-slate-200" />

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Consumed Failures</span>
            <span className="text-sm font-semibold text-red-600">
              {formatNumber(errorBudget.consumedFailures)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Remaining Failures</span>
            <span className="text-sm font-semibold text-green-600">
              {formatNumber(errorBudget.remainingFailures)}
            </span>
          </div>
        </div>

        <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-900">
          <span className="font-semibold">Formula:</span> allowed_failures = total_requests × (1 - SLO)
        </div>
      </div>

      {/* Budget Breakdown - Time-Based */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
          Time-Based Budget
          <button className="text-slate-400 hover:text-slate-600" title="How is this calculated?">
            <Info className="w-4 h-4" />
          </button>
        </h4>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Total Period</span>
            <span className="text-sm font-semibold text-slate-900">
              {formatDowntime(errorBudget.totalMinutes)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Allowed Downtime</span>
            <span className="text-sm font-semibold text-slate-900">
              {formatDowntime(errorBudget.allowedDowntimeMinutes)}
            </span>
          </div>

          <div className="h-px bg-slate-200" />

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Consumed Downtime</span>
            <span className="text-sm font-semibold text-red-600">
              {formatDowntime(errorBudget.consumedDowntimeMinutes)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Remaining Downtime</span>
            <span className="text-sm font-semibold text-green-600">
              {formatDowntime(errorBudget.remainingDowntimeMinutes)}
            </span>
          </div>
        </div>

        <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-900">
          <span className="font-semibold">Formula:</span> allowed_downtime = period_minutes × (1 - SLO)
        </div>
      </div>

      {/* Quick Reference Table */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-slate-700 mb-3">
          Reference: Allowed Downtime (30 days)
        </h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">99% SLO</span>
            <span className="font-mono text-slate-900">7h 12m</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">99.9% SLO</span>
            <span className="font-mono text-slate-900">43.2 min</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">99.95% SLO</span>
            <span className="font-mono text-slate-900">21.6 min</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">99.99% SLO</span>
            <span className="font-mono text-slate-900">4.32 min</span>
          </div>
        </div>
      </div>
    </div>
  )
}
