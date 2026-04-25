import { permanentRedirect } from 'next/navigation'

export default function ProductionReadinessSecurityAssessmentRedirectPage() {
  permanentRedirect('/playgrounds/security-assessment')
}
