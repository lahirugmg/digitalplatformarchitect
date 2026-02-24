import type { Metadata } from 'next'
import { SECURITY_SCORE_BANDS } from '@/lib/security-assessment'
import { SecurityAssessmentPlayground } from '@/components/security-assessment/SecurityAssessmentPlayground'

export const metadata: Metadata = {
  title: 'Security Assessment Matrix | Interactive Playground',
  description:
    'Evaluate enterprise platform security posture with a weighted ten-control matrix. Live scoring, autosave, and markdown export.',
}

export default function SecurityAssessmentPlaygroundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <section className="border-b border-slate-200 bg-white/90">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold tracking-wide text-slate-700">
              Security Playground
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Security Assessment Matrix
            </h1>
            <p className="mt-3 text-base text-slate-600 sm:text-lg">
              Score your platform against ten weighted security controls and identify the highest-impact gaps to remediate.
            </p>
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {SECURITY_SCORE_BANDS.map((band) => (
              <div key={band.label} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
                <p className="font-semibold text-slate-900">
                  {band.min}-{band.max}
                </p>
                <p className="text-slate-600">{band.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <SecurityAssessmentPlayground />
      </section>
    </div>
  )
}
