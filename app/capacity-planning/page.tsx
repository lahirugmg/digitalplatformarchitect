import { Metadata } from 'next'
import { CapacityCalculator } from '@/components/capacity-planning/CapacityCalculator'
import { NextSteps } from '@/components/shared/NextSteps'
import { TheoryLink } from '@/components/shared/TheoryLink'

export const metadata: Metadata = {
  title: 'Capacity Planning Calculator | Digital Platform Architect',
  description: 'Calculate infrastructure requirements, estimate costs, and plan for scale with our interactive capacity planning tool.',
}

export default function CapacityPlanningPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
              Architecture Tooling
            </div>
            <h1 className="text-5xl font-bold mb-4">
              Infrastructure Capacity Calculator
            </h1>
            <p className="text-xl text-blue-100 mb-4">
              Size your infrastructure correctly from day one. Input your traffic patterns and workload
              characteristics to get instant recommendations for instance types, node counts, and cost estimates.
            </p>
            <div className="flex items-center gap-6 text-sm text-blue-100">
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>Real-time calculations</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>Cost optimization</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>Performance targets</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-8">
            <h2 className="text-lg font-bold text-blue-900 mb-2">
              Why Capacity Planning Matters
            </h2>
            <p className="text-slate-700">
              Under-provisioned systems fail under load. Over-provisioned systems waste money.
              This calculator helps you find the right balance by modeling your workload characteristics
              and recommending infrastructure that meets your performance and availability targets.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">How to Use This Calculator</h3>
            <ol className="space-y-3 text-slate-700">
              <li>
                <strong>Define your workload:</strong> Enter expected transaction rates, message sizes,
                and concurrent user counts
              </li>
              <li>
                <strong>Account for peaks:</strong> Set your peak traffic multiplier to handle burst scenarios
              </li>
              <li>
                <strong>Set availability targets:</strong> Choose your SLA (99%, 99.9%, or 99.99%)
              </li>
              <li>
                <strong>Review results:</strong> Get instant recommendations for instance types, node counts,
                latency estimates, and annual costs
              </li>
              <li>
                <strong>Iterate:</strong> Adjust inputs to explore different scenarios and trade-offs
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Calculator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CapacityCalculator />
      </div>

      {/* Next Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <NextSteps
          title="Complete Your Production Readiness Assessment"
          steps={[
            {
              title: 'Return to Production Readiness Hub',
              description: 'Track your overall progress and complete remaining assessments',
              href: '/playgrounds/production-readiness',
              icon: '🎯',
              badge: 'NEXT'
            },
            {
              title: 'Review Operational Sympathy',
              description: 'Go back to review your architecture assessment scores',
              href: '/operational-sympathy',
              icon: '✅'
            }
          ]}
        />
      </div>

      {/* Related Resources */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">
          Related Resources
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <TheoryLink
            href="/blocks/observability-operations"
            title="Observability & Operations"
            description="Learn how to monitor and operate your infrastructure"
            type="component"
            icon="📊"
          />
          <TheoryLink
            href="/patterns"
            title="Scalability Patterns"
            description="Explore patterns for handling load and scale"
            type="pattern"
            icon="📈"
          />
        </div>
      </div>

      {/* Best Practices */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Capacity Planning Best Practices</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-3">✓ Do</h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>• Plan for 2-3x peak traffic capacity</li>
                <li>• Include N+1 redundancy for high availability</li>
                <li>• Monitor actual vs. predicted performance</li>
                <li>• Use reserved instances for predictable workloads</li>
                <li>• Implement auto-scaling for burst traffic</li>
                <li>• Test failover and degradation scenarios</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border-2 border-red-200">
              <h3 className="text-xl font-bold text-red-800 mb-3">✗ Don't</h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>• Run production at &gt;70% CPU utilization</li>
                <li>• Ignore network bandwidth requirements</li>
                <li>• Assume linear scaling without testing</li>
                <li>• Skip load testing before launch</li>
                <li>• Forget to account for data growth over time</li>
                <li>• Rely solely on vertical scaling</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
