import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Message Flow Animation',
  description: 'Design integration patterns and watch messages flow between services in real-time. Compare Point-to-Point, Pub/Sub, Request/Reply, and Event-Driven patterns.',
  openGraph: {
    title: 'Message Flow Animation | Digital Platform Architect',
    description: 'Interactive playground: visualize message flow patterns between services.',
  },
}

export default function MessageFlowLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
