import type { Metadata } from 'next'
import SLAAvailabilityPlayground from '@/components/sla-availability/SLAAvailabilityPlayground'

export const metadata: Metadata = {
  title: 'SLA & Availability Targets | Digital Platform Architect',
  description:
    'Define SLOs, SLIs, and error budgets for your services. Calculate downtime allowances and assess reliability under real incident scenarios.',
  openGraph: {
    title: 'SLA & Availability Targets Playground',
    description: 'Interactive tool to define service level objectives and calculate error budgets',
  },
}

export default function SLACalculatorPage() {
  return <SLAAvailabilityPlayground />
}
