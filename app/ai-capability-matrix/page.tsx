import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Capability Matrix | Digital Platform Architect',
  description: 'Explore how AI impacts platform pillars with our interactive capability matrix.',
}

export default function AICapabilityMatrixPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">AI Capability Matrix</h1>
          <p className="text-xl text-pink-100 max-w-3xl">
            Understand AI's impact across platform pillars: API management, observability,
            security, and more.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">🤖</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            AI-Integrated Capability Matrix
          </h2>
          <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
            This feature maps AI capabilities across platform pillars, showing how AI transforms
            each aspect of your digital platform.
          </p>
          <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto border border-purple-200">
            <h3 className="font-bold text-slate-900 mb-3">Planned Capabilities:</h3>
            <ul className="text-left space-y-2 text-slate-700">
              <li>• Interactive capability cards by pillar</li>
              <li>• AI for Code vs Code for AI toggle</li>
              <li>• Dynamic KPI panels</li>
              <li>• Use-case deep dives</li>
              <li>• ROI and impact assessment</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
