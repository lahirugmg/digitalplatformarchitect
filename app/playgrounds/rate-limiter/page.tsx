import type { Metadata } from 'next'
import RateLimiterPlayground from './components/RateLimiterPlayground'

export const metadata: Metadata = {
  title: 'Rate Limiter | Interactive Playground',
  description: 'Interactive visualization of popular Rate Limiting algorithms including Token Bucket, Leaking Bucket, and Fixed Window.',
}

export default function RateLimiterPage() {
  return <RateLimiterPlayground />
}
