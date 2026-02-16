import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Enterprise Integration Patterns',
  description: 'Learn enterprise integration through interactive scenarios: data transformation, content-based routing, and message aggregation with animated visualizations.',
  openGraph: {
    title: 'Enterprise Integration Patterns | Digital Platform Architect',
    description: 'Interactive playground: master enterprise integration patterns through hands-on scenarios.',
  },
}

export default function EnterpriseIntegrationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
