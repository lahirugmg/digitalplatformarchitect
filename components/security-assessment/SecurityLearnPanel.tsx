'use client'

import { SECURITY_SCORE_BANDS } from '@/lib/security-assessment'

export function SecurityLearnPanel() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <h2 className="text-xl font-bold text-slate-900">Security Assessment, in Brief</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-700">
        A security assessment matrix evaluates how well a platform addresses the key controls that reduce breach risk,
        limit blast radius, and meet compliance obligations. It covers identity, data protection, application security,
        threat detection, and governance.
      </p>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">
        Score each control from 0 to 5. Higher weights represent controls with the greatest impact on overall security
        posture.
      </p>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {SECURITY_SCORE_BANDS.map((band) => (
          <div key={band.label} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
            <span className="font-semibold text-slate-900">
              {band.min}-{band.max}
            </span>{' '}
            <span className="text-slate-700">{band.label}</span>
          </div>
        ))}
      </div>

      <details className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
        <summary className="cursor-pointer list-none font-semibold text-slate-900">
          Why this matters
        </summary>
        <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
          <p>Security gaps compound. A weak identity layer combined with flat network access and no SIEM creates the conditions for a full breach.</p>
          <p>Low scores in high-weight controls (IAM, encryption) signal the highest remediation priority.</p>
          <p>This matrix helps teams communicate risk and prioritise security investments before incidents occur.</p>
        </div>
      </details>
    </section>
  )
}
