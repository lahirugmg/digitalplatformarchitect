import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Architecture Mastery Skill Tree',
  description: 'Your personalized journey to becoming a platform architect. Explore 6 learning branches: Integration, Data, Cloud, Security, Resilience, and Observability.',
  openGraph: {
    title: 'Architecture Mastery Skill Tree | Digital Platform Architect',
    description: 'Track your progress through 6 learning branches with daily tokens, streaks, and achievements.',
  },
}

export default function SkillTreeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
