import { Metadata } from 'next'
import { ArchitectureExplorer } from '@/components/architecture-docs/ArchitectureExplorer'

export const metadata: Metadata = {
  title: 'Architecture Documentation Explorer | Interactive Playground',
  description: 'Interactive architecture documentation across business, solution, and deployment views. Explore how different roles see architecture at different levels.',
}

export default function ArchitectureDocsPlayground() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span>📚</span>
              <span>Interactive Playground</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Architecture Documentation Explorer
            </h1>
            <p className="text-xl text-purple-100 mb-6">
              Explore architecture documentation across Business, Solution, and Deployment views.
              Toggle between roles and detail levels (L0–L3) to see how perspectives connect.
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-purple-100">
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>Multi-layer views</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>Role-based filtering</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>Interactive tree navigation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-600 p-6 rounded-r-lg mb-8">
            <h2 className="text-lg font-bold text-indigo-900 mb-2 flex items-center gap-2">
              <span>🎯</span>
              Why Architecture Documentation Matters
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Different stakeholders need different views of your architecture. Business leaders care about
              capabilities and value streams. Architects need context, containers, and components. Engineers
              require deployment details and operational concerns. This playground shows you how to structure
              documentation that serves all audiences.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg border border-slate-200 p-5">
              <div className="text-3xl mb-3">🏢</div>
              <h3 className="font-bold text-slate-900 mb-2">Business Architecture</h3>
              <p className="text-sm text-slate-600">Value streams, capabilities, processes, and KPIs that drive business outcomes</p>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-5">
              <div className="text-3xl mb-3">🔧</div>
              <h3 className="font-bold text-slate-900 mb-2">Solution Architecture</h3>
              <p className="text-sm text-slate-600">Context, containers, components, interfaces, patterns, and technical trade-offs</p>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-5">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="font-bold text-slate-900 mb-2">Deployment Architecture</h3>
              <p className="text-sm text-slate-600">Infrastructure, environments, runtime concerns, HA/DR, and observability</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">How to Use This Playground</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <p className="font-medium text-slate-900">Select your role</p>
                  <p className="text-sm text-slate-600">Choose between Business, Architect, Engineer, or see All views combined</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <p className="font-medium text-slate-900">Adjust detail level</p>
                  <p className="text-sm text-slate-600">Use the slider to show L0 (high-level) through L3 (detailed) architecture layers</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <p className="font-medium text-slate-900">Explore the tree</p>
                  <p className="text-sm text-slate-600">Click nodes to expand/collapse branches. Hover for detailed descriptions</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">4</div>
                <div>
                  <p className="font-medium text-slate-900">Learn the patterns</p>
                  <p className="text-sm text-slate-600">Observe how different roles focus on different aspects at different detail levels</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Explorer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <ArchitectureExplorer />
      </div>

      {/* Visual Language Guide */}
      <div className="bg-gradient-to-br from-slate-50 to-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              How To Design These Diagrams
            </h2>
            <p className="text-slate-600 mb-8">
              A compact guide to the notation used across our architecture illustrations.
            </p>

            <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-700 font-bold text-xs">□</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">Shapes</p>
                  <p className="text-sm text-slate-600">Use different silhouettes to signal what a thing is (service, datastore, user). A given shape should map to one category only.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded bg-green-100 flex items-center justify-center">
                  <span className="text-green-700 font-bold text-xs">T</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">Labels</p>
                  <p className="text-sm text-slate-600">Be explicit about what the text names — a capability, a product, or a specific technology. Only label items that benefit from clarification.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-700 font-bold text-xs">→</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">Connectors</p>
                  <p className="text-sm text-slate-600">Arrows show direction. Vary line style to convey semantics: solid for synchronous calls, dashed for asynchronous or control, dotted for occasional/batch.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded bg-pink-100 flex items-center justify-center">
                  <span className="text-pink-700 font-bold text-xs">◉</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">Color</p>
                  <p className="text-sm text-slate-600">Color carries meaning, not decoration. Common encodings include lifecycle (current/planned), ownership, or licensing (OSS/commercial).</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded bg-cyan-100 flex items-center justify-center">
                  <span className="text-cyan-700 font-bold text-xs">⊞</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">Layout</p>
                  <p className="text-sm text-slate-600">Position is informative. Left→right or top→bottom usually indicates flow from source to consumer. Boxes that span lanes represent cross‑cutting capabilities.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded bg-orange-100 flex items-center justify-center">
                  <span className="text-orange-700 font-bold text-xs">🔑</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">Legend</p>
                  <p className="text-sm text-slate-600">Every diagram should include a small key that decodes shapes, colors, and line styles, plus any important caveats directly on the figure.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded bg-yellow-100 flex items-center justify-center">
                  <span className="text-yellow-700 font-bold text-xs">📖</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">Glossary</p>
                  <p className="text-sm text-slate-600">Maintain a short glossary for recurring terms and abbreviations so meanings stay consistent across documents and teams.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Documentation Best Practices</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <span>✓</span>
                <span>Do</span>
              </h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li className="flex gap-2">
                  <span className="text-green-600">•</span>
                  <span>Tailor documentation to your audience</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">•</span>
                  <span>Use consistent notation across all diagrams</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">•</span>
                  <span>Include context before diving into details</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">•</span>
                  <span>Update docs when architecture changes</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">•</span>
                  <span>Add decision records for key choices</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">•</span>
                  <span>Link diagrams to implementation code</span>
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
                  <span>Show all detail levels in one diagram</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600">•</span>
                  <span>Use jargon without explaining it</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600">•</span>
                  <span>Create docs that duplicate code comments</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600">•</span>
                  <span>Skip the &quot;why&quot; and only show &quot;what&quot;</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600">•</span>
                  <span>Let documentation become stale</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600">•</span>
                  <span>Assume readers understand your domain</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
            <h3 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
              <span>💡</span>
              <span>Pro Tip: The C4 Model</span>
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              The C4 model (Context, Containers, Components, Code) provides a structured way to create
              architecture documentation at different levels of abstraction. Start with Context (L0) to
              show the system in its environment, drill into Containers (L1) to show applications and
              data stores, then Components (L2) for internal structure, and finally Code (L3) for
              implementation details. This playground mirrors that approach.
            </p>
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
            href="/architecture-playground"
            className="group block rounded-xl bg-white border border-slate-200 p-6 hover:shadow-lg hover:border-indigo-300 transition"
          >
            <div className="text-3xl mb-3">🏛️</div>
            <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600">
              Architecture Playground
            </h4>
            <p className="text-sm text-slate-600 mb-3">
              Interactive playground for exploring architecture with persona-driven views
            </p>
            <span className="text-sm font-medium text-indigo-600 group-hover:underline">
              Explore →
            </span>
          </a>

          <a
            href="/playgrounds/pattern-composer"
            className="group block rounded-xl bg-white border border-slate-200 p-6 hover:shadow-lg hover:border-indigo-300 transition"
          >
            <div className="text-3xl mb-3">🎨</div>
            <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600">
              Pattern Composer
            </h4>
            <p className="text-sm text-slate-600 mb-3">
              Compose architecture patterns and see how they work together
            </p>
            <span className="text-sm font-medium text-indigo-600 group-hover:underline">
              Explore →
            </span>
          </a>

          <a
            href="/playgrounds"
            className="group block rounded-xl bg-white border border-slate-200 p-6 hover:shadow-lg hover:border-indigo-300 transition"
          >
            <div className="text-3xl mb-3">🎮</div>
            <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600">
              All Playgrounds
            </h4>
            <p className="text-sm text-slate-600 mb-3">
              View all interactive learning environments
            </p>
            <span className="text-sm font-medium text-indigo-600 group-hover:underline">
              View All →
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
