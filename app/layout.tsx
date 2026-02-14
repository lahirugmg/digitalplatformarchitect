import type { Metadata } from 'next'
import './globals.css'

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
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <a href="/" className="text-xl font-bold text-blue-600">
                  Digital Platform Architect
                </a>
              </div>
              <div className="flex space-x-8">
                <a href="/playgrounds" className="text-slate-700 hover:text-blue-600 font-medium">
                  Playgrounds
                </a>
                <a href="/patterns" className="text-slate-700 hover:text-blue-600 font-medium">
                  Patterns
                </a>
                <a href="/skill-tree" className="text-slate-700 hover:text-blue-600 font-medium">
                  Skill Tree
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}
