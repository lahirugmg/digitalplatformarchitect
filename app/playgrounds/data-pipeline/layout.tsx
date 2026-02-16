import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Data Pipeline Choreography',
  description: 'Build end-to-end data pipelines from IoT sensors to analytics. Drag, drop, and connect components to watch data flow like water through your architecture.',
  openGraph: {
    title: 'Data Pipeline Choreography | Digital Platform Architect',
    description: 'Interactive playground: build data pipelines and watch data flow like water through your architecture.',
  },
}

export default function DataPipelineLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
