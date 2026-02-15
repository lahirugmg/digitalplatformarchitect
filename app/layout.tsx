import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Digital Platform Architect - Learn Enterprise Architecture Interactively',
  description: 'Master enterprise architecture through hands-on interactive playgrounds. Learn data pipelines, message flows, and integration patterns by doing.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
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
