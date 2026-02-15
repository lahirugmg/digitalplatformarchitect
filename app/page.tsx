export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Master Enterprise Architecture by Doing
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Learn through 4 interactive playgrounds, 65+ patterns, and a gamified skill tree.
              Experience architecture—don't just read about it.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href="#learning-path"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg"
              >
                🚀 Start Learning Path
              </a>
              <a
                href="/playgrounds/pattern-composer"
                className="bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-600 transition shadow-lg flex items-center gap-2"
              >
                ✨ NEW: Pattern Composer
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What's New Section */}
      <section className="py-12 bg-gradient-to-r from-green-50 to-blue-50 border-y border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="inline-block bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold mb-2">
                NEW FEATURES
              </div>
              <h2 className="text-2xl font-bold">Production-Ready Architecture Tools</h2>
              <p className="text-slate-600 mt-1">
                Bridge the gap from learning to production with our latest features
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Production Readiness Checklist */}
            <a
              href="/readiness"
              className="bg-white rounded-lg p-6 border-2 border-green-300 hover:border-green-400 hover:shadow-lg transition group"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">✅</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-green-700 group-hover:text-green-800">
                    Production Readiness Checklist
                  </h3>
                  <p className="text-slate-600 mb-3 text-sm">
                    Evaluate your architecture's operational sympathy with a weighted scoring system
                    covering 9 critical elements: observability, resilience, security, and more.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
                      Weighted Scoring
                    </span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">
                      9 Elements
                    </span>
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded font-medium">
                      Live Calculation
                    </span>
                  </div>
                  <div className="mt-4 text-green-600 font-semibold text-sm group-hover:underline">
                    Try the Checklist →
                  </div>
                </div>
              </div>
            </a>

            {/* Architecture Overlays */}
            <a
              href="/playgrounds/pattern-composer"
              className="bg-white rounded-lg p-6 border-2 border-blue-300 hover:border-blue-400 hover:shadow-lg transition group"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">🔍</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-blue-700 group-hover:text-blue-800">
                    Architecture Overlays
                  </h3>
                  <p className="text-slate-600 mb-3 text-sm">
                    Toggle security, observability, resilience, and cost layers on your architecture diagrams.
                    Visualize TLS encryption, distributed tracing, circuit breakers, and cost tracking.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded font-medium">
                      🔒 Security
                    </span>
                    <span className="bg-cyan-100 text-cyan-700 px-2 py-1 rounded font-medium">
                      📊 Observability
                    </span>
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded font-medium">
                      ⚡ Resilience
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
                      💰 Cost
                    </span>
                  </div>
                  <div className="mt-4 text-blue-600 font-semibold text-sm group-hover:underline">
                    Explore Overlays in Pattern Composer →
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section id="learning-path" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Your Learning Journey</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Follow this proven path from beginner to advanced architect
            </p>
          </div>

          {/* Learning Steps */}
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Step 1 */}
            <div className="relative">
              <div className="text-center">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  1
                </div>
                <h3 className="text-lg font-bold mb-2">Learn Building Blocks</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Understand fundamental components: APIs, databases, message queues, caches
                </p>
                <a href="/blocks" className="text-blue-600 font-medium text-sm hover:underline">
                  Explore Blocks →
                </a>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-6 right-0 transform translate-x-1/2">
                <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="text-center">
                <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  2
                </div>
                <h3 className="text-lg font-bold mb-2">Discover Patterns</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Explore 65+ proven patterns: CQRS, Event Sourcing, Sagas, API Gateway
                </p>
                <a href="/patterns" className="text-purple-600 font-medium text-sm hover:underline">
                  View Patterns →
                </a>
              </div>
              <div className="hidden md:block absolute top-6 right-0 transform translate-x-1/2">
                <svg className="w-8 h-8 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="text-center">
                <div className="bg-cyan-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  3
                </div>
                <h3 className="text-lg font-bold mb-2">Practice in Playgrounds</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Build pipelines, compose patterns, watch data flow with water metaphors
                </p>
                <a href="/playgrounds" className="text-cyan-600 font-medium text-sm hover:underline">
                  Launch Playground →
                </a>
              </div>
              <div className="hidden md:block absolute top-6 right-0 transform translate-x-1/2">
                <svg className="w-8 h-8 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>

            {/* Step 4 */}
            <div>
              <div className="text-center">
                <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  4
                </div>
                <h3 className="text-lg font-bold mb-2">Progress on Skill Tree</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Unlock nodes, earn XP, track mastery across 6 architecture domains
                </p>
                <a href="/skill-tree" className="text-green-600 font-medium text-sm hover:underline">
                  View Skill Tree →
                </a>
              </div>
            </div>
          </div>

          {/* Quick Start CTA */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">👋 New Here? Start with Data Pipelines</h3>
            <p className="text-slate-600 mb-4 max-w-2xl mx-auto">
              The best way to learn is by doing. Build your first data pipeline in our beginner-friendly playground
              with realistic water flow visualizations.
            </p>
            <a
              href="/playgrounds/data-pipeline"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
            >
              🌊 Start with Data Pipeline Playground
            </a>
          </div>
        </div>
      </section>

      {/* Featured Playgrounds */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Interactive Playgrounds</h2>
            <p className="text-xl text-slate-600">
              Learn by building and experimenting in safe, visual environments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pattern Composer - FEATURED */}
            <a href="/playgrounds/pattern-composer" className="relative border-2 border-purple-300 rounded-lg p-6 hover:shadow-xl transition bg-white group ring-2 ring-purple-200">
              <div className="absolute -top-3 -right-3 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                ✨ NEW
              </div>
              <div className="text-5xl mb-4 group-hover:scale-110 transition">🎨</div>
              <div className="mb-2">
                <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded font-semibold">ADVANCED</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-purple-700 group-hover:text-purple-800">Pattern Composer</h3>
              <p className="text-slate-600 mb-4 text-sm">
                Compose patterns with intelligent conflict detection. Export to Infrastructure as Code.
              </p>
              <span className="text-purple-600 font-medium text-sm group-hover:underline">
                Compose Patterns →
              </span>
            </a>

            {/* Data Pipeline */}
            <a href="/playgrounds/data-pipeline" className="border border-slate-200 rounded-lg p-6 hover:shadow-xl hover:border-blue-300 transition group bg-white">
              <div className="text-5xl mb-4 group-hover:scale-110 transition">🌊</div>
              <div className="mb-2">
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-semibold">BEGINNER</span>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600">Data Pipeline</h3>
              <p className="text-slate-600 mb-4 text-sm">
                Build pipelines with water flow visualization. See throughput as rapids, quality as purity.
              </p>
              <span className="text-blue-600 font-medium text-sm group-hover:underline">
                Build Pipeline →
              </span>
            </a>

            {/* Message Flow */}
            <a href="/playgrounds/message-flow" className="border border-slate-200 rounded-lg p-6 hover:shadow-xl hover:border-blue-300 transition group bg-white">
              <div className="text-5xl mb-4 group-hover:scale-110 transition">⚡</div>
              <div className="mb-2">
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-semibold">INTERMEDIATE</span>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600">Message Flow</h3>
              <p className="text-slate-600 mb-4 text-sm">
                Design integration patterns. Experience sync vs async message behavior in real-time.
              </p>
              <span className="text-blue-600 font-medium text-sm group-hover:underline">
                Design Flow →
              </span>
            </a>

            {/* Enterprise Integration */}
            <a href="/playgrounds/enterprise-integration" className="border border-slate-200 rounded-lg p-6 hover:shadow-xl hover:border-blue-300 transition group bg-white">
              <div className="text-5xl mb-4 group-hover:scale-110 transition">🔗</div>
              <div className="mb-2">
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-semibold">INTERMEDIATE</span>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600">Enterprise Integration</h3>
              <p className="text-slate-600 mb-4 text-sm">
                Connect heterogeneous systems with routing, transformation, and choreography.
              </p>
              <span className="text-blue-600 font-medium text-sm group-hover:underline">
                Connect Systems →
              </span>
            </a>
          </div>

          <div className="mt-8 text-center">
            <a href="/playgrounds" className="text-blue-600 font-semibold hover:underline">
              View All Playgrounds →
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Learning by Doing Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-3">1. Realistic Scenarios</h3>
              <p className="text-slate-600">
                Work with business challenges like "build an IoT data pipeline" or "design event-driven architecture."
                Each has constraints and trade-offs just like production.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🛠️</span>
              </div>
              <h3 className="text-xl font-bold mb-3">2. Visual Feedback</h3>
              <p className="text-slate-600">
                See data flow like water through streams. Watch backpressure build up. Observe pattern conflicts
                in real-time with color-coded indicators.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-xl font-bold mb-3">3. Instant Validation</h3>
              <p className="text-slate-600">
                Get immediate feedback on what works and why. Learn from mistakes safely. Export working
                architectures to Infrastructure as Code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-blue-400 mb-2">4</div>
              <div className="text-slate-300">Interactive Playgrounds</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-purple-400 mb-2">65+</div>
              <div className="text-slate-300">Architecture Patterns</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-cyan-400 mb-2">6</div>
              <div className="text-slate-300">Skill Tree Branches</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-400 mb-2">100%</div>
              <div className="text-slate-300">Hands-On Learning</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Become an Architecture Expert?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join learners mastering enterprise architecture through interactive, visual experiences.
            Start your journey today.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="/playgrounds/data-pipeline"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition inline-block shadow-lg"
            >
              🌊 Start with Data Pipelines
            </a>
            <a
              href="/playgrounds/pattern-composer"
              className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition inline-block shadow-lg"
            >
              🎨 Try Pattern Composer
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
