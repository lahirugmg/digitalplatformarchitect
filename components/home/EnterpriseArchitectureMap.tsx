'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Building2,
  Database,
  GitBranch,
  LockKeyhole,
  MonitorCog,
  PanelsTopLeft,
  Users,
} from 'lucide-react'

const zones = [
  {
    id: 'channels',
    title: 'Users & Channels',
    eyebrow: 'Demand',
    summary: 'Entry points where customers, partners, staff, and devices interact with the enterprise.',
    frs: ['Capture user journeys', 'Support assisted and self-service flows', 'Handle channel-specific tasks'],
    nfrs: ['Accessibility', 'Latency', 'Availability'],
    questions: ['Who uses the system?', 'Which journeys are critical?', 'What channels must stay online?'],
    Icon: Users,
    tone: 'bg-sky-50 border-sky-200 text-sky-800',
  },
  {
    id: 'experience',
    title: 'Experience Layer',
    eyebrow: 'Interaction',
    summary: 'Web, mobile, portal, and workflow surfaces that compose capabilities into usable experiences.',
    frs: ['Render user workflows', 'Personalize navigation', 'Submit commands and requests'],
    nfrs: ['Usability', 'Performance', 'Localization'],
    questions: ['What must be simple for users?', 'Where does personalization matter?', 'What should degrade gracefully?'],
    Icon: PanelsTopLeft,
    tone: 'bg-indigo-50 border-indigo-200 text-indigo-800',
  },
  {
    id: 'capabilities',
    title: 'Business Capabilities',
    eyebrow: 'Core',
    summary: 'Domain-aligned services and processes that own business rules, decisions, and outcomes.',
    frs: ['Execute core use cases', 'Enforce business policy', 'Expose domain APIs'],
    nfrs: ['Consistency', 'Maintainability', 'Throughput'],
    questions: ['What capabilities change independently?', 'Where are the business rules?', 'What needs strong consistency?'],
    Icon: Building2,
    tone: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  },
  {
    id: 'integration',
    title: 'Integration & APIs',
    eyebrow: 'Connection',
    summary: 'API gateways, events, workflows, and adapters that connect internal and external systems.',
    frs: ['Expose APIs', 'Coordinate processes', 'Exchange events and files'],
    nfrs: ['Resilience', 'Contract stability', 'Observability'],
    questions: ['What is synchronous vs asynchronous?', 'Which contracts are public?', 'How are retries handled?'],
    Icon: GitBranch,
    tone: 'bg-amber-50 border-amber-200 text-amber-900',
  },
  {
    id: 'data',
    title: 'Data & Analytics',
    eyebrow: 'Knowledge',
    summary: 'Operational data stores, reporting, analytics, and governance paths that turn activity into insight.',
    frs: ['Store transactions', 'Serve reporting needs', 'Publish analytical datasets'],
    nfrs: ['Durability', 'Privacy', 'Freshness'],
    questions: ['What data is authoritative?', 'How fresh must reporting be?', 'What data must be protected?'],
    Icon: Database,
    tone: 'bg-cyan-50 border-cyan-200 text-cyan-900',
  },
  {
    id: 'security',
    title: 'Security & Governance',
    eyebrow: 'Trust',
    summary: 'Identity, access, policy, compliance, and risk controls applied across every layer.',
    frs: ['Authenticate users', 'Authorize actions', 'Audit sensitive activity'],
    nfrs: ['Security', 'Compliance', 'Privacy'],
    questions: ['Who can do what?', 'What must be audited?', 'Which regulations constrain design?'],
    Icon: LockKeyhole,
    tone: 'bg-rose-50 border-rose-200 text-rose-900',
  },
  {
    id: 'platform',
    title: 'Platform & Operations',
    eyebrow: 'Run',
    summary: 'Cloud, networking, delivery, monitoring, reliability, and support practices that keep systems healthy.',
    frs: ['Deploy services', 'Operate environments', 'Recover from incidents'],
    nfrs: ['Availability', 'Scalability', 'Operability'],
    questions: ['What breaks first?', 'How do teams detect issues?', 'What is the recovery target?'],
    Icon: MonitorCog,
    tone: 'bg-slate-50 border-slate-300 text-slate-800',
  },
] as const

export default function EnterpriseArchitectureMap() {
  const [activeZoneId, setActiveZoneId] = useState<(typeof zones)[number]['id']>('capabilities')
  const activeZone = zones.find((zone) => zone.id === activeZoneId) ?? zones[0]
  const ActiveIcon = activeZone.Icon

  return (
    <section className="border-b border-slate-200 bg-white" aria-labelledby="enterprise-map-heading">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] lg:items-start">
          <div>
            <p className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
              Simple enterprise architecture playground
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 id="enterprise-map-heading" className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  Explore enterprise architecture at a glance
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                  Start with a generic enterprise map. Pick a zone to connect high-level architecture decisions back to
                  FRs, NFRs, and the questions architects should ask early.
                </p>
              </div>
              <Link href="/architecture-playground" className="btn-secondary shrink-0">
                Advanced playground
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm sm:p-6">
              <div className="grid gap-3 md:grid-cols-3">
                {zones.slice(0, 3).map((zone) => (
                  <ZoneButton key={zone.id} zone={zone} active={zone.id === activeZoneId} onSelect={setActiveZoneId} />
                ))}
              </div>

              <div className="my-4 flex justify-center text-slate-300" aria-hidden="true">
                <ArrowRight className="h-5 w-5 rotate-90 md:rotate-0" />
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {zones.slice(3, 5).map((zone) => (
                  <ZoneButton key={zone.id} zone={zone} active={zone.id === activeZoneId} onSelect={setActiveZoneId} />
                ))}
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {zones.slice(5).map((zone) => (
                  <ZoneButton key={zone.id} zone={zone} active={zone.id === activeZoneId} onSelect={setActiveZoneId} />
                ))}
              </div>
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-xl" aria-live="polite">
            <div className="flex items-start gap-4">
              <div className={`rounded-2xl border p-3 ${activeZone.tone}`}>
                <ActiveIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">{activeZone.eyebrow}</p>
                <h3 className="mt-1 text-xl font-bold">{activeZone.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{activeZone.summary}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              <DetailList title="Functional requirements" items={activeZone.frs} icon={<BarChart3 className="h-4 w-4" />} />
              <DetailList title="Non-functional requirements" items={activeZone.nfrs} icon={<MonitorCog className="h-4 w-4" />} />
              <DetailList title="Architecture questions" items={activeZone.questions} icon={<GitBranch className="h-4 w-4" />} />
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function ZoneButton({
  zone,
  active,
  onSelect,
}: {
  zone: (typeof zones)[number]
  active: boolean
  onSelect: (zoneId: (typeof zones)[number]['id']) => void
}) {
  const Icon = zone.Icon

  return (
    <button
      type="button"
      onClick={() => onSelect(zone.id)}
      aria-pressed={active}
      className={`group rounded-2xl border p-4 text-left transition ${
        active
          ? `${zone.tone} shadow-md ring-2 ring-blue-500/20`
          : 'border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={`rounded-xl border p-2 ${active ? 'border-current bg-white/60' : 'border-slate-200 bg-slate-50 text-slate-500'}`}>
          <Icon className="h-5 w-5" />
        </span>
        <span>
          <span className="block text-[10px] font-bold uppercase tracking-[0.18em] opacity-70">{zone.eyebrow}</span>
          <span className="block text-sm font-bold">{zone.title}</span>
        </span>
      </div>
    </button>
  )
}

function DetailList({ title, items, icon }: { title: string; items: readonly string[]; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <h4 className="flex items-center gap-2 text-sm font-bold text-slate-100">
        <span className="text-blue-300">{icon}</span>
        {title}
      </h4>
      <ul className="mt-3 space-y-2 text-sm text-slate-300">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-300" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
