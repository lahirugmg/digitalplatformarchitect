import type { Metadata } from 'next'
import FrameworkPlayground from './components/FrameworkPlayground'

export const metadata: Metadata = {
  title: 'System Design Framework | Interactive Playground',
  description: 'Learn the 4-step framework for system design interviews, including time management and key objectives.',
}

export default function SystemDesignFrameworkPage() {
  return <FrameworkPlayground />
}
