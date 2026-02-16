'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import PersonaSelector from './architecture-playground/components/PersonaSelector'
import LevelControls from './architecture-playground/components/LevelControls'
import ContextPanel from './architecture-playground/components/ContextPanel'

const PlaygroundCanvas = dynamic(
  () => import('./architecture-playground/components/PlaygroundCanvas'),
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading Architecture Explorer...</p>
        </div>
      </div>
    ),
  }
)

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ── SECTION 1: Hero Banner (compact) ──────────────────────── */}
      <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold mb-1">
                Interactive Architecture Playground
              </h1>
              <p className="text-sm text-purple-100">
                Explore how theory meets practice — select your role, zoom through detail levels, click any block to learn more
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Link
                href="/playgrounds"
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition"
              >
                Other Playgrounds
              </Link>
              <Link
                href="/skill-tree"
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition"
              >
                Skill Tree
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Interactive Playground (main content) ───────── */}
      <section
        className="flex-1 flex overflow-hidden"
        aria-label="Interactive Architecture Playground"
        style={{ minHeight: 'calc(100vh - 200px)' }}
      >
        {/* Left Sidebar - Controls */}
        <div className="hidden lg:flex lg:flex-col w-80 xl:w-[22rem] bg-white border-r border-slate-200 overflow-y-auto p-4 space-y-4">
          <PersonaSelector />
          <LevelControls />

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-bold text-blue-900 mb-2">How to Use</h3>
            <ul className="text-xs text-blue-800 space-y-2">
              <li><strong>Choose your role</strong> to see relevant information</li>
              <li><strong>Select detail level</strong> (L0-L3) to zoom in/out</li>
              <li><strong>Click nodes</strong> to view detailed information</li>
              <li><strong>Scroll to zoom</strong> on the canvas</li>
              <li><strong>Drag to pan</strong> around the architecture</li>
            </ul>
          </div>
        </div>

        {/* Center - Canvas */}
        <div className="flex-1 flex flex-col">
          {/* Mobile controls (visible below lg) */}
          <div className="lg:hidden flex items-center gap-2 p-3 bg-white border-b border-slate-200 overflow-x-auto">
            <div className="flex-shrink-0">
              <PersonaSelector />
            </div>
            <div className="flex-shrink-0">
              <LevelControls />
            </div>
          </div>

          <PlaygroundCanvas architectureId="ecommerce-platform" />
        </div>

        {/* Right Sidebar - Context Panel */}
        <div className="hidden xl:block w-96 bg-white border-l border-slate-200 overflow-y-auto">
          <ContextPanel />
        </div>
      </section>

      {/* ── SECTION 3: Quick Stats + Journey Paths ────────────────── */}
      <section className="bg-white border-t border-slate-200" aria-labelledby="journey-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[
              { value: '9', label: 'Building Blocks', color: 'text-purple-600' },
              { value: '65+', label: 'Patterns', color: 'text-blue-600' },
              { value: '5', label: 'Playgrounds', color: 'text-cyan-600' },
              { value: '9', label: 'Personas', color: 'text-pink-600' },
            ].map((stat) => (
              <div key={stat.label} className="text-center py-3">
                <div className={`text-2xl sm:text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs sm:text-sm text-slate-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Theory / Practice Paths */}
          <h2 id="journey-heading" className="text-lg sm:text-xl font-bold text-center mb-2">
            Start Your Journey
          </h2>
          <p className="text-sm text-slate-500 text-center mb-6 max-w-lg mx-auto">
            Learn the concepts or jump straight into hands-on practice.
          </p>

          <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            <Link
              href="/patterns"
              className="group block rounded-xl border-2 border-slate-200 hover:border-violet-400 p-5 sm:p-6 transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center text-xl flex-shrink-0">
                  📚
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Theory</h3>
                  <p className="text-xs text-violet-600 font-medium">Patterns &amp; Principles</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                Understand the &quot;what&quot;, &quot;why&quot;, and &quot;when&quot; of architecture patterns. Learn trade-offs and decision frameworks.
              </p>
              <span className="inline-flex items-center text-xs font-semibold text-violet-600 group-hover:gap-2 gap-1 transition-all">
                Explore Theory <span aria-hidden="true">→</span>
              </span>
            </Link>

            <Link
              href="/playgrounds"
              className="group block rounded-xl border-2 border-slate-200 hover:border-blue-400 p-5 sm:p-6 transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-xl flex-shrink-0">
                  🛠️
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Practice</h3>
                  <p className="text-xs text-blue-600 font-medium">Playgrounds &amp; Hands-on</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                Build architectures by doing. Interactive playgrounds with real-time feedback and live simulations.
              </p>
              <span className="inline-flex items-center text-xs font-semibold text-blue-600 group-hover:gap-2 gap-1 transition-all">
                Start Practicing <span aria-hidden="true">→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Featured Playgrounds ───────────────────────── */}
      <section className="bg-slate-50 border-t border-slate-200" aria-labelledby="playgrounds-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <h2 id="playgrounds-heading" className="text-lg sm:text-xl font-bold text-center mb-2">
            Interactive Playgrounds
          </h2>
          <p className="text-sm text-slate-500 text-center mb-6">
            Hands-on environments to build, test, and learn architecture patterns.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                href: '/playgrounds/data-pipeline',
                icon: '🌊',
                title: 'Data Pipeline Choreography',
                desc: 'Build data pipelines from IoT sensors to analytics. Watch data flow through your architecture.',
                tag: 'Data',
              },
              {
                href: '/playgrounds/message-flow',
                icon: '⚡',
                title: 'Message Flow Animation',
                desc: 'Design integration patterns. See messages flow between services in real-time.',
                tag: 'Messaging',
              },
              {
                href: '/playgrounds/enterprise-integration',
                icon: '🔗',
                title: 'Enterprise Integration',
                desc: 'Connect systems with transformation patterns, routing logic, and message choreography.',
                tag: 'Integration',
              },
            ].map((pg) => (
              <Link
                key={pg.href}
                href={pg.href}
                className="group block rounded-xl bg-white border border-slate-200 p-5 hover:shadow-md hover:border-slate-300 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{pg.icon}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    {pg.tag}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {pg.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">{pg.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
