import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Interactive Playgrounds',
  description: 'Hands-on learning environments for data pipelines, message flows, and enterprise integration. Build, experiment, and master architecture patterns.',
  openGraph: {
    title: 'Interactive Playgrounds | Digital Platform Architect',
    description: 'Hands-on learning environments for data pipelines, message flows, and enterprise integration.',
  },
}

export default function PlaygroundsPage() {
  const playgrounds = [
    {
      id: 'architecture-docs',
      title: 'Architecture Documentation Explorer',
      icon: '📚',
      description: 'Explore architecture documentation across Business, Solution, and Deployment views. See how different roles view architecture at different levels.',
      difficulty: 'Beginner',
      duration: '10-15 min',
      tags: ['Documentation', 'C4 Model', 'Multi-Layer'],
      href: '/playgrounds/architecture-docs'
    },
    {
      id: 'capacity-planning',
      title: 'Capacity Planning Calculator',
      icon: '💡',
      description: 'Calculate infrastructure requirements, estimate costs, and plan for scale. Interactive playground for sizing your system correctly.',
      difficulty: 'Beginner',
      duration: '10-15 min',
      tags: ['Infrastructure', 'Cost Optimization', 'Performance'],
      href: '/playgrounds/capacity-planning'
    },
    {
      id: 'data-pipeline',
      title: 'Data Pipeline Choreography',
      icon: '🌊',
      description: 'Build end-to-end data pipelines from IoT sensors to analytics. Visualize data flowing like water through your architecture.',
      difficulty: 'Beginner',
      duration: '15-20 min',
      tags: ['Data Architecture', 'Stream Processing', 'Analytics'],
      href: '/playgrounds/data-pipeline'
    },
    {
      id: 'message-flow',
      title: 'Message Flow Animation',
      icon: '⚡',
      description: 'Design integration patterns and watch messages flow between services. Experience synchronous vs asynchronous behavior.',
      difficulty: 'Intermediate',
      duration: '20-25 min',
      tags: ['Integration', 'Messaging', 'Event-Driven'],
      href: '/playgrounds/message-flow'
    },
    {
      id: 'enterprise-integration',
      title: 'Enterprise Integration',
      icon: '🔗',
      description: 'Connect heterogeneous systems with transformation patterns, routing logic, and message choreography.',
      difficulty: 'Intermediate',
      duration: '25-30 min',
      tags: ['Integration', 'ESB', 'Transformation'],
      href: '/playgrounds/enterprise-integration'
    },
  ]

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Interactive Playgrounds</h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl">
            Hands-on learning environments where you build, experiment, and master enterprise architecture patterns through virtual interaction.
          </p>
        </div>

        {/* Playgrounds Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" role="list" aria-label="Available playgrounds">
          {playgrounds.map((playground) => (
            <a
              key={playground.id}
              href={playground.href}
              className="border border-slate-200 rounded-lg p-6 hover:shadow-xl hover:border-blue-300 transition group bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              role="listitem"
              aria-label={`${playground.title} - ${playground.difficulty} - ${playground.duration}`}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition">{playground.icon}</div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600">{playground.title}</h3>
              <p className="text-slate-600 mb-4">{playground.description}</p>

              <div className="flex items-center gap-4 mb-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <span>📊</span> {playground.difficulty}
                </span>
                <span className="flex items-center gap-1">
                  <span>⏱️</span> {playground.duration}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {playground.tags.map((tag) => (
                  <span key={tag} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>

              <span className="text-blue-600 font-medium group-hover:underline">
                Launch Playground →
              </span>
            </a>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-12 sm:mt-16">
          <h2 className="text-2xl font-bold mb-6">Coming Soon</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {['CAP Theorem Simulator', 'Architecture Builder', 'Pattern Composer'].map((title) => (
              <div key={title} className="border border-slate-200 rounded-lg p-6 bg-slate-50 opacity-60">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-slate-500">Under development</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
