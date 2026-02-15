export default function PlaygroundsPage() {
  const playgrounds = [
    {
      id: 'pattern-composer',
      title: 'Pattern Composer',
      icon: '🎨',
      description: 'Compose architectural patterns with intelligent conflict detection. Visualize synergies and export to Infrastructure as Code.',
      difficulty: 'Advanced',
      duration: '20-30 min',
      tags: ['Patterns', 'Architecture Design', 'IaC Export'],
      href: '/playgrounds/pattern-composer',
      featured: true
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
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Interactive Playgrounds</h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            Hands-on learning environments where you build, experiment, and master enterprise architecture patterns through virtual interaction.
          </p>
        </div>

        {/* Playgrounds Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {playgrounds.map((playground) => (
            <a
              key={playground.id}
              href={playground.href}
              className={`border rounded-lg p-6 hover:shadow-xl transition group bg-white relative ${
                playground.featured
                  ? 'border-purple-300 ring-2 ring-purple-200 hover:border-purple-400'
                  : 'border-slate-200 hover:border-blue-300'
              }`}
            >
              {playground.featured && (
                <div className="absolute -top-3 -right-3 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  ✨ NEW
                </div>
              )}
              <div className="text-5xl mb-4 group-hover:scale-110 transition">{playground.icon}</div>
              <h3 className={`text-2xl font-bold mb-2 ${
                playground.featured ? 'text-purple-700 group-hover:text-purple-800' : 'group-hover:text-blue-600'
              }`}>
                {playground.title}
              </h3>
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

              <span className={`font-medium group-hover:underline ${
                playground.featured ? 'text-purple-600' : 'text-blue-600'
              }`}>
                Launch Playground →
              </span>
            </a>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Coming Soon</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {['CAP Theorem Simulator', 'Vendor Comparison Canvas', 'Architecture Builder'].map((title) => (
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
