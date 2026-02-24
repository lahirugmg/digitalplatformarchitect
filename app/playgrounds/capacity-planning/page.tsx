import type { Metadata } from 'next'
import { CapacityWorkbench } from '@/components/capacity-planning/CapacityWorkbench'

export const metadata: Metadata = {
  title: 'Capacity Planning Calculator | Interactive Playground',
  description:
    'Generalized capacity planning workbench with industry templates, scenario comparison, and 12-month projection.',
}

export default function CapacityPlanningPlaygroundPage() {
  return (
    <div className="min-h-screen bg-[var(--surface-0)]">
      <section className="border-b border-slate-200 bg-gradient-to-b from-white via-slate-50 to-[var(--surface-0)]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="max-w-4xl">
            <span className="badge-primary">Capacity Planning Playground</span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Industry-ready Capacity Planning Calculator
            </h1>
            <p className="mt-3 text-base text-slate-600 sm:text-lg">
              Start with common application templates, compare baseline and optimized scenarios, and project
              capacity and cost over the next 12 months.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <CapacityWorkbench />
      </main>
    </div>
  )
}

