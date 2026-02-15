import { Metadata } from 'next'
import { ArchitectureNavigator } from '@/components/architecture-map/ArchitectureNavigator'

export const metadata: Metadata = {
  title: 'Architecture Navigation Map | Digital Platform Architect',
  description: 'Navigate enterprise architecture documentation by persona and detail level with our interactive map.',
}

export default function ArchitectureMapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Architecture Navigation Map</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Filter documentation by persona (Business, Architect, Engineer) and detail level (L0-L3)
            to find exactly what you need.
          </p>
        </div>
      </section>

      {/* Navigator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ArchitectureNavigator />
      </div>
    </div>
  )
}
