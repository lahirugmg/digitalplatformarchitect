'use client'

export function ArticleIntro() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Opening Summary */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-12">
        <p className="text-lg text-slate-800 italic">
          "The cloud punishes complacency. Non-functional requirements aren't nice-to-haves—they're
          design constraints that determine whether your system survives production."
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        {/* Introduction */}
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          What is Operational Sympathy?
        </h2>

        <p className="text-slate-700 mb-6">
          Before operational sympathy, there was <strong>mechanical sympathy</strong>—a racing concept
          where the best drivers don't just know how to drive fast, they understand how the engine works,
          how heat affects performance, and when to push versus preserve.
        </p>

        <p className="text-slate-700 mb-6">
          <strong>Operational sympathy</strong> applies the same principle to software architecture:
          the best systems aren't just functional—they're designed with deep awareness of how they'll
          behave in production, how they'll fail, and how operators will diagnose and recover from incidents.
        </p>

        {/* Why It Matters */}
        <h2 className="text-3xl font-bold text-slate-900 mb-4 mt-12">
          Why Cloud Systems Demand Operational Sympathy
        </h2>

        <p className="text-slate-700 mb-6">
          Cloud infrastructure lowers the barrier to deployment—you can ship code to production in minutes.
          But this ease creates a dangerous illusion: <em>working in development does not mean resilient in production</em>.
        </p>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg my-8">
          <h3 className="text-xl font-bold text-yellow-900 mb-2">
            The Production Reality Gap
          </h3>
          <ul className="space-y-2 text-slate-700">
            <li>✓ Development: Clean state, predictable load, instant rollback</li>
            <li>✗ Production: Partial failures, traffic spikes, data migrations in flight</li>
          </ul>
        </div>

        <p className="text-slate-700 mb-6">
          Systems designed without operational sympathy fail in predictable ways:
        </p>

        <ul className="space-y-3 mb-8">
          <li className="flex items-start gap-3">
            <span className="text-red-500 text-xl flex-shrink-0">❌</span>
            <span className="text-slate-700">
              <strong>No observability:</strong> Incidents occur, but teams have no visibility into what failed or why
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-500 text-xl flex-shrink-0">❌</span>
            <span className="text-slate-700">
              <strong>Cascading failures:</strong> One service timeout brings down the entire system
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-500 text-xl flex-shrink-0">❌</span>
            <span className="text-slate-700">
              <strong>Manual recovery only:</strong> Operators can't mitigate without deploying new code
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-500 text-xl flex-shrink-0">❌</span>
            <span className="text-slate-700">
              <strong>Surprise costs:</strong> Traffic spike triggers runaway cloud bills
            </span>
          </li>
        </ul>

        {/* The Nine Elements Preview */}
        <h2 className="text-3xl font-bold text-slate-900 mb-4 mt-12">
          The Nine Elements of Operational Sympathy
        </h2>

        <p className="text-slate-700 mb-6">
          Operational sympathy isn't a single decision—it's a mindset applied across nine key areas.
          Each element addresses a specific operational risk that becomes critical at scale.
        </p>

        <p className="text-slate-700 mb-6">
          These elements are weighted by impact: reliability and observability concerns carry more weight
          because their absence leads to catastrophic failures, while cultural elements are important but
          have less immediate operational impact.
        </p>
      </div>
    </div>
  )
}
