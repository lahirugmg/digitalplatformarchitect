export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Master Enterprise Architecture by Doing
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Learn data pipelines, message flows, and integration patterns through interactive playgrounds.
              No passive reading—experience architecture through hands-on virtual experimentation.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="/playgrounds"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Explore Playgrounds
              </a>
              <a
                href="/skill-tree"
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                View Skill Tree
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Playgrounds */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Interactive Playgrounds</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Data Pipeline */}
            <a href="/playgrounds/data-pipeline" className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition">
              <div className="text-4xl mb-4">🌊</div>
              <h3 className="text-xl font-bold mb-2">Data Pipeline Choreography</h3>
              <p className="text-slate-600 mb-4">
                Build data pipelines from IoT sensors to analytics. Watch data flow like water through your architecture.
              </p>
              <span className="text-blue-600 font-medium">Launch Playground →</span>
            </a>

            {/* Message Flow */}
            <a href="/playgrounds/message-flow" className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Message Flow Animation</h3>
              <p className="text-slate-600 mb-4">
                Design integration patterns. See messages flow between services in real-time with sync vs async behavior.
              </p>
              <span className="text-blue-600 font-medium">Launch Playground →</span>
            </a>

            {/* Enterprise Integration */}
            <a href="/playgrounds/enterprise-integration" className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-bold mb-2">Enterprise Integration</h3>
              <p className="text-slate-600 mb-4">
                Connect heterogeneous systems. Explore transformation patterns, routing logic, and message choreography.
              </p>
              <span className="text-blue-600 font-medium">Launch Playground →</span>
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Learn by Doing Virtually</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-2">1. Choose Challenge</h3>
              <p className="text-slate-600">
                Select from realistic business scenarios. Each challenge has clear goals and constraints.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛠️</span>
              </div>
              <h3 className="text-xl font-bold mb-2">2. Build & Experiment</h3>
              <p className="text-slate-600">
                Drag, drop, connect components. Watch your architecture come alive with simulations.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-xl font-bold mb-2">3. Get Feedback</h3>
              <p className="text-slate-600">
                Real-time validation shows what works, what doesn't, and why. Learn from every decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Master Architecture?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Start with Data Pipeline Choreography and unlock advanced patterns as you progress.
          </p>
          <a
            href="/playgrounds/data-pipeline"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition inline-block"
          >
            Start Learning Now
          </a>
        </div>
      </section>
    </div>
  )
}
