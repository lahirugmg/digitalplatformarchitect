import { Metadata } from 'next'
import { ProductionReadinessHub } from '@/components/production-readiness/ProductionReadinessHub'

export const metadata: Metadata = {
  title: 'Production Readiness Hub | Digital Platform Architect',
  description: 'Complete production readiness assessment: evaluate operational sympathy, plan capacity, estimate costs, and define SLAs.',
}

export default function ProductionReadinessPage() {
  return <ProductionReadinessHub />
}
