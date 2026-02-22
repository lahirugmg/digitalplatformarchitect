import { Metadata } from 'next'
import { CapacityCalculator } from '@/components/capacity-planning/CapacityCalculator'

export const metadata: Metadata = {
  title: 'Capacity Planning Calculator | Interactive Playground',
  description: 'Calculate infrastructure requirements, estimate costs, and plan for scale with our interactive capacity planning playground.',
}

export default function CapacityPlanningPlayground() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span>💡</span>
              <span>Interactive Playground</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Capacity Planning Calculator
            </h1>
            <p className="text-xl text-emerald-100 mb-6">
              Size your infrastructure correctly from day one. Input your traffic patterns and workload
              characteristics to get instant recommendations for instance types, node counts, and cost estimates.
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-emerald-100">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-600 p-6 rounded-r-lg mb-8">
            <h2 className="text-lg font-bold text-green-900 mb-2 flex items-center gap-2">
              <span>🎯</span>
              Why Capacity Planning Matters
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Under-provisioned systems fail under load. Over-provisioned systems waste money.
              This interactive playground helps you find the right balance by modeling your workload
              characteristics and recommending infrastructure that meets your performance and availability targets.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg border border-slate-200 p-5">
              <div className="text-3xl mb-3">🎮</div>
              <h3 className="font-bold text-slate-900 mb-2">Interactive Learning</h3>
              <p className="text-sm text-slate-600">Adjust sliders and see immediate impact on infrastructure recommendations</p>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-5">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-bold text-slate-900 mb-2">Real Metrics</h3>
              <p className="text-sm text-slate-600">Based on actual AWS instance types and pricing models</p>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-5">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-bold text-slate-900 mb-2">Cost Awareness</h3>
              <p className="text-sm text-slate-600">Understand the financial impact of your architecture decisions</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">How to Use This Playground</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <p className="font-medium text-slate-900">Define your workload</p>
                  <p className="text-sm text-slate-600">Enter expected transaction rates, message sizes, and concurrent user counts</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <p className="font-medium text-slate-900">Account for peaks</p>
                  <p className="text-sm text-slate-600">Set your peak traffic multiplier to handle burst scenarios</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <p className="font-medium text-slate-900">Set availability targets</p>
                  <p className="text-sm text-slate-600">Choose your SLA (99%, 99.9%, or 99.99%)</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">4</div>
                <div>
                  <p className="font-medium text-slate-900">Review results</p>
                  <p className="text-sm text-slate-600">Get instant recommendations for instance types, node counts, latency estimates, and annual costs</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">5</div>
                <div>
                  <p className="font-medium text-slate-900">Iterate and learn</p>
                  <p className="text-sm text-slate-600">Adjust inputs to explore different scenarios and trade-offs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <CapacityCalculator />
      </div>

      {/* Learning Points */}
      <div className="bg-gradient-to-br from-slate-50 to-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Capacity Planning Best Practices</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                  <span>✓</span>
                  <span>Do</span>
                </h3>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li className="flex gap-2">
                    <span className="text-green-600">•</span>
                    <span>Plan for 2-3x peak traffic capacity</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">•</span>
                    <span>Include N+1 redundancy for high availability</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">•</span>
                    <span>Monitor actual vs. predicted performance</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">•</span>
                    <span>Use reserved instances for predictable workloads</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">•</span>
                    <span>Implement auto-scaling for burst traffic</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600">•</span>
                    <span>Test failover and degradation scenarios</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 border-2 border-red-200">
                <h3 className="text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                  <span>✗</span>
                  <span>Don&apos;t</span>
                </h3>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li className="flex gap-2">
                    <span className="text-red-600">•</span>
                    <span>Run production at &gt;70% CPU utilization</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">•</span>
                    <span>Ignore network bandwidth requirements</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">•</span>
                    <span>Assume linear scaling without testing</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">•</span>
                    <span>Skip load testing before launch</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">•</span>
                    <span>Forget to account for data growth over time</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-600">•</span>
                    <span>Rely solely on vertical scaling</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                <span>💡</span>
                <span>Pro Tip: The 70% Rule</span>
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                Keep your steady-state utilization below 70% of capacity. This headroom provides buffer for
                traffic spikes, maintenance operations, and failover scenarios. Running consistently above 70%
                leaves no margin for error and increases the risk of cascading failures.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Playgrounds */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">
          Continue Your Learning Journey
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            href="/playgrounds/production-readiness"
            className="group block rounded-xl bg-white border border-slate-200 p-6 hover:shadow-lg hover:border-blue-300 transition"
          >
            <div className="text-3xl mb-3">✅</div>
            <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600">
              Production Readiness
            </h4>
            <p className="text-sm text-slate-600 mb-3">
              Comprehensive checklist to ensure your system is ready for production
            </p>
            <span className="text-sm font-medium text-blue-600 group-hover:underline">
              Explore →
            </span>
          </a>

          <a
            href="/playgrounds/data-pipeline"
            className="group block rounded-xl bg-white border border-slate-200 p-6 hover:shadow-lg hover:border-blue-300 transition"
          >
            <div className="text-3xl mb-3">🌊</div>
            <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600">
              Data Pipeline
            </h4>
            <p className="text-sm text-slate-600 mb-3">
              Build end-to-end data pipelines and understand throughput requirements
            </p>
            <span className="text-sm font-medium text-blue-600 group-hover:underline">
              Explore →
            </span>
          </a>

          <a
            href="/playgrounds"
            className="group block rounded-xl bg-white border border-slate-200 p-6 hover:shadow-lg hover:border-blue-300 transition"
          >
            <div className="text-3xl mb-3">🎮</div>
            <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600">
              All Playgrounds
            </h4>
            <p className="text-sm text-slate-600 mb-3">
              View all interactive learning environments
            </p>
            <span className="text-sm font-medium text-blue-600 group-hover:underline">
              View All →
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
