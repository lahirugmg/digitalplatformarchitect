import { permanentRedirect } from 'next/navigation'

export default function ReadinessRedirectPage() {
  permanentRedirect('/playgrounds/operational-sympathy')
}
