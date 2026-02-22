import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getAllPatterns, getPatternCategories } from '@/lib/patterns'
import PatternsClient from './PatternsClient'

export const metadata: Metadata = {
  title: 'Architecture Patterns',
  description: 'Explore 65+ proven architectural patterns including event-driven, data architecture, security, and distributed systems. Each with detailed explanations and interactive examples.',
  openGraph: {
    title: 'Architecture Patterns | Digital Platform Architect',
    description: 'Explore 65+ proven architectural patterns with detailed explanations and interactive examples.',
  },
}

export default function PatternsPage() {
  const patterns = getAllPatterns()
  const categories = getPatternCategories()

  return (
    <Suspense fallback={<div className="min-h-screen py-12 flex items-center justify-center">Loading patterns...</div>}>
      <PatternsClient patterns={patterns} categories={categories} />
    </Suspense>
  )
}
