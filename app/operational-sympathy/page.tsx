import { Metadata } from 'next'
import { ChecklistEngine } from '@/components/operational-sympathy/ChecklistEngine'
import { ArticleIntro } from '@/components/operational-sympathy/ArticleIntro'
import { KeyElementsGrid } from '@/components/operational-sympathy/KeyElementsGrid'
import { NextSteps } from '@/components/shared/NextSteps'
import { TheoryLink } from '@/components/shared/TheoryLink'

export const metadata: Metadata = {
  title: 'Operational Sympathy | Digital Platform Architect',
  description: 'Learn operational sympathy and evaluate your architecture against production-ready design principles with our interactive checklist.',
}

export default function OperationalSympathyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
              Production-Ready Architecture
            </div>
            <h1 className="text-5xl font-bold mb-4">
              Operational Sympathy
            </h1>
            <p className="text-xl text-blue-100 mb-4">
              Design systems that don't just work in theory—they thrive in production
            </p>
            <div className="flex items-center gap-6 text-sm text-blue-100">
              <div className="flex items-center gap-2">
                <span className="font-medium">By Afkham Azeez</span>
              </div>
              <div className="flex items-center gap-2">
                <span>•</span>
                <span>15 min read</span>
              </div>
              <div className="flex items-center gap-2">
                <span>•</span>
                <span>Interactive Checklist</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Introduction */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ArticleIntro />
      </div>

      {/* Key Elements Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <KeyElementsGrid />
      </div>

      {/* CTA to Checklist */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-3">
            Ready to Evaluate Your Architecture?
          </h2>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
            Use our interactive checklist to score your design against the nine key elements of operational sympathy
          </p>
          <a
            href="#checklist"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg"
          >
            Start the Checklist
          </a>
        </div>
      </div>

      {/* Interactive Checklist */}
      <div id="checklist" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Interactive Operational Sympathy Checklist
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl">
            Score each element from 0 (not addressed) to 5 (fully implemented).
            The weighted scoring system emphasizes the most critical production concerns.
          </p>
        </div>

        <ChecklistEngine />
      </div>

      {/* Next Steps - Navigate to Capacity Planning */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <NextSteps
          title="After Scoring, Plan Your Infrastructure"
          steps={[
            {
              title: 'Infrastructure Capacity Planning',
              description: 'Size your infrastructure based on load, scale, and availability requirements',
              href: '/capacity-planning',
              icon: '📊',
              badge: 'NEXT'
            },
            {
              title: 'Complete Production Readiness',
              description: 'Return to the hub to track your overall progress',
              href: '/playgrounds/production-readiness',
              icon: '🎯'
            }
          ]}
        />
      </div>

      {/* Related Theory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">
          Related Resources
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <TheoryLink
            href="/patterns"
            title="Architecture Patterns"
            description="Explore 65+ patterns to improve your system design"
            type="pattern"
            icon="🏗️"
          />
          <TheoryLink
            href="/blocks"
            title="Platform Building Blocks"
            description="Understand the 9 core platform components"
            type="component"
            icon="🧱"
          />
        </div>
      </div>

      {/* Closing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Remember: Production Exposes Shortcuts
          </h3>
          <div className="prose prose-lg max-w-none">
            <p className="text-slate-700">
              Cloud infrastructure makes deployment easy, but it doesn't make systems resilient by default.
              Every architectural decision that ignores operational realities becomes technical debt the moment
              the first production incident occurs.
            </p>
            <p className="text-slate-700">
              Operational sympathy isn't about perfection—it's about awareness. Understanding where your architecture
              is weak allows you to make informed trade-offs, plan mitigation strategies, and avoid catastrophic failures.
            </p>
            <p className="text-slate-700 font-semibold">
              Start with awareness. Build with intention. Operate with confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
