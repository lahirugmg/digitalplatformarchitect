import type { Metadata } from 'next'
import FrameworkPlayground from './components/FrameworkPlayground'

export const metadata: Metadata = {
  title: 'System design framework | FRs, NFRs, and trade-offs',
  description:
    'A four-step system design flow: elicit functional and non-functional requirements, high-level design, deep dive, then validate SLOs, failure modes, and operations.',
}

export default function SystemDesignFrameworkPage() {
  return <FrameworkPlayground />
}
