import type { Metadata } from 'next'
import ScaleToMillionsPlayground from './components/ScaleToMillionsPlayground'

export const metadata: Metadata = {
  title: 'Scale to Millions Evolution | Interactive Playground',
  description: 'Interactive playground visualizing the evolution of a system from a single server to serving millions of users.',
}

export default function ScaleToMillionsPage() {
  return <ScaleToMillionsPlayground />
}
