import type { Metadata } from 'next'
import { Manrope, Source_Sans_3 } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Toaster } from 'sonner'
import ProgressRouteTracker from '@/components/progress/ProgressRouteTracker'

const siteUrl = 'https://digitalplatformarchitect.com'
const headingFont = Manrope({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})
const bodyFont = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Digital Platform Architect — system design from FRs and NFRs',
    template: '%s | Digital Platform Architect',
  },
  description:
    'Interactive system design: start from functional and non-functional requirements, walk a guided design flow, validate production readiness, and study reference blueprints.',
  keywords: [
    'system design',
    'functional requirements',
    'non-functional requirements',
    'NFR',
    'SLO',
    'availability',
    'scalability',
    'architecture',
    'interactive',
    'blueprints',
  ],
  authors: [{ name: 'Digital Platform Architect' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Digital Platform Architect',
    title: 'Digital Platform Architect — system design from requirements',
    description:
      'Clarify FRs and NFRs, shape a defensible design, and validate with interactive playgrounds and blueprints.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Platform Architect',
    description:
      'System design with explicit functional and non-functional requirements, guided flows, and production-readiness checks.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} bg-[var(--surface-0)] text-[var(--text-strong)]`}>
        <ErrorBoundary name="RootLayout">
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Header />
          <ProgressRouteTracker />
          <main id="main-content">{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            expand={false}
            richColors
            closeButton
            duration={4000}
          />
        </ErrorBoundary>
      </body>
    </html>
  )
}
