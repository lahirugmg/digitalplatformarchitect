import type { Metadata } from 'next'
import PlaygroundsClient from '@/app/playgrounds/components/PlaygroundsClient'

export const metadata: Metadata = {
  title: 'Interactive Playgrounds',
  description: 'Hands-on learning environments for data pipelines, message flows, and enterprise integration. Build, experiment, and master architecture patterns.',
  openGraph: {
    title: 'Interactive Playgrounds | Digital Platform Architect',
    description: 'Hands-on learning environments for data pipelines, message flows, and enterprise integration.',
  },
}

export default function PlaygroundsPage() {
  return <PlaygroundsClient />
}
