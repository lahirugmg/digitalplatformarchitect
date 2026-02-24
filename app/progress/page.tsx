import type { Metadata } from 'next'
import ProgressHubClient from '@/components/progress/ProgressHubClient'

export const metadata: Metadata = {
  title: 'Learning Progress Hub',
  description:
    'Track architecture learning milestones from real usage and confirm progress without gamified unlock complexity.',
}

export default function ProgressPage() {
  return <ProgressHubClient />
}
