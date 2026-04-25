import { permanentRedirect } from 'next/navigation'

export default function ProductionReadinessCostEstimatorRedirectPage() {
  permanentRedirect('/playgrounds/capacity-planning')
}
