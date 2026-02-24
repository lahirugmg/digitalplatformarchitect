import type { Metadata } from 'next'
import { Manrope, Source_Sans_3 } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Toaster } from 'sonner'

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
    default: 'Digital Platform Architect - Learn Enterprise Architecture Interactively',
    template: '%s | Digital Platform Architect',
  },
  description: 'Master enterprise architecture through hands-on interactive playgrounds. Learn data pipelines, message flows, and integration patterns by doing.',
  keywords: ['enterprise architecture', 'data pipelines', 'integration patterns', 'message flows', 'interactive learning', 'platform architecture'],
  authors: [{ name: 'Digital Platform Architect' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Digital Platform Architect',
    title: 'Digital Platform Architect - Learn Enterprise Architecture Interactively',
    description: 'Master enterprise architecture through hands-on interactive playgrounds. Learn data pipelines, message flows, and integration patterns by doing.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Platform Architect',
    description: 'Master enterprise architecture through hands-on interactive playgrounds.',
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
