import type { Metadata } from 'next'
import EstimationPlayground from './components/EstimationPlayground'

export const metadata: Metadata = {
  title: 'Back-of-the-Envelope Estimation | Interactive Playground',
  description: 'Interactive tools for back-of-the-envelope estimations including latency numbers, SLA availability, and capacity planning.',
}

export default function BackOfTheEnvelopePage() {
  return <EstimationPlayground />
}
