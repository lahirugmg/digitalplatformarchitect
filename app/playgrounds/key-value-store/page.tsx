import type { Metadata } from 'next'
import KeyValueStorePlayground from './components/KeyValueStorePlayground'

export const metadata: Metadata = {
  title: 'Key-Value Store Internals | Interactive Playground',
  description: 'Interactive visualization of distributed Key-Value store concepts: CAP Theorem, Quorum Consensus, and Vector Clocks.',
}

export default function KeyValueStorePage() {
  return <KeyValueStorePlayground />
}
