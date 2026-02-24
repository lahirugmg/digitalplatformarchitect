'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { trackLearningPathVisit } from '@/lib/profile/profile-client'

export default function ProgressRouteTracker() {
  const pathname = usePathname()
  const lastTrackedPath = useRef<string | null>(null)

  useEffect(() => {
    if (!pathname) {
      return
    }

    if (lastTrackedPath.current === pathname) {
      return
    }

    lastTrackedPath.current = pathname
    trackLearningPathVisit(pathname)
  }, [pathname])

  return null
}
