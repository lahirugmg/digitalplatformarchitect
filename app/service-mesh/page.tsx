import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Service Mesh Visualizer | Digital Platform Architect',
  description: 'Visualize service-to-service communication flows through your service mesh.',
}

export default function ServiceMeshPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Service Mesh Flow Visualizer</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Trace request flows through your microservices architecture and understand
            service dependencies with interactive path highlighting.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">🚧</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Interactive Service Mesh Visualizer
          </h2>
          <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
            This feature provides interactive visualization of service mesh architectures with
            layer toggling (core components, data flow, security boundaries) and path tracing.
          </p>
          <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto border border-blue-200">
            <h3 className="font-bold text-slate-900 mb-3">Planned Capabilities:</h3>
            <ul className="text-left space-y-2 text-slate-700">
              <li>• Interactive service topology diagram</li>
              <li>• Request flow path tracing</li>
              <li>• Layer toggles (components, security, observability)</li>
              <li>• Dependency analysis</li>
              <li>• Performance metrics overlay</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
