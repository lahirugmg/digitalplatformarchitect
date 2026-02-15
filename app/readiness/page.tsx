import { ChecklistEngine } from '@/components/operational-sympathy/ChecklistEngine'

export const metadata = {
  title: 'Production Readiness Checklist | Digital Platform Architect',
  description: 'Evaluate your architecture\'s operational sympathy with our comprehensive production readiness checklist'
}

export default function ReadinessPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold mb-4">
              NEW Production Readiness Tools
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Operational Sympathy Checklist
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              Evaluate your architecture's production readiness with our weighted scoring system.
              Bridge the gap between design and operational excellence.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span className="text-2xl">⚖️</span>
                <span>Weighted Scoring (0-100)</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span className="text-2xl">📊</span>
                <span>9 Critical Elements</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span className="text-2xl">🎯</span>
                <span>Live Score Calculation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Operational Sympathy */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">What is Operational Sympathy?</h2>
            <p className="text-slate-700 mb-4">
              <strong>Operational sympathy</strong> means designing systems with deep awareness of production realities—how they'll be deployed,
              monitored, scaled, debugged, and recovered when things go wrong. It's the difference between "it works on my machine"
              and "it thrives in production."
            </p>
            <p className="text-slate-700 mb-4">
              This checklist evaluates 9 critical elements that separate production-ready architectures from fragile designs.
              Each element is weighted by importance, with reliability and observability concerns carrying the most weight.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-sm text-blue-900">
                <strong>Pro Tip:</strong> Use this checklist during architecture reviews, before production deployments,
                or when evaluating third-party systems. A score below 60 indicates critical gaps that should be addressed
                before going live.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ChecklistEngine />
        </div>
      </section>

      {/* How to Use */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">How to Use This Checklist</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold mb-1">Score Each Element (0-5)</h3>
                  <p className="text-slate-600 text-sm">
                    0 = Not addressed at all | 3 = Partially implemented | 5 = Fully implemented and battle-tested
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold mb-1">Review Your Weighted Score</h3>
                  <p className="text-slate-600 text-sm">
                    Scores are automatically weighted by importance. Reliability and observability carry the most weight (15 points each).
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold mb-1">Check Category Breakdown</h3>
                  <p className="text-slate-600 text-sm">
                    See which categories (reliability, observability, operations, etc.) need the most attention.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-bold mb-1">Address Low-Scoring Items</h3>
                  <p className="text-slate-600 text-sm">
                    Prioritize elements with high weight (15 points) that scored low. These are your biggest production risks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Want to Learn More?</h2>
            <p className="text-slate-300 mb-6">
              Explore our interactive playgrounds to practice building production-ready architectures
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href="/playgrounds/pattern-composer"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Pattern Composer
              </a>
              <a
                href="/playgrounds/data-pipeline"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Data Pipeline Playground
              </a>
              <a
                href="/skill-tree"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                View Skill Tree
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
