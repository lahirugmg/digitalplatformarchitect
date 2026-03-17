import type { Metadata } from 'next'
import ConsistentHashingPlayground from './components/ConsistentHashingPlayground'

export const metadata: Metadata = {
  title: 'Consistent Hashing | Interactive Playground',
  description: 'Interactive visualization of consistent hashing, the hash ring, and virtual nodes.',
}

export default function ConsistentHashingPage() {
  return <ConsistentHashingPlayground />
}
