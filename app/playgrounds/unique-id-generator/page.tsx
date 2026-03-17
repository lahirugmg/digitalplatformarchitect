import type { Metadata } from 'next'
import IdGeneratorPlayground from './components/IdGeneratorPlayground'

export const metadata: Metadata = {
  title: 'Unique ID Generator | Interactive Playground',
  description: 'Interactive visualization of Distributed Unique ID Generators, specifically the Twitter Snowflake algorithm.',
}

export default function UniqueIdGeneratorPage() {
  return <IdGeneratorPlayground />
}
