import { getPatternBySlug, getAllPatterns } from '@/lib/patterns'
import { marked } from 'marked'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const patterns = getAllPatterns()
  return patterns.map((pattern) => ({
    slug: pattern.slug,
  }))
}

export default function PatternDetailPage({ params }: { params: { slug: string } }) {
  const pattern = getPatternBySlug(params.slug)

  if (!pattern) {
    notFound()
  }

  const contentHtml = marked(pattern.content)

  // Map patterns to relevant playgrounds
  const getPlaygroundLink = (category: string, title: string) => {
    const titleLower = title.toLowerCase()
    if (titleLower.includes('event') || titleLower.includes('message') || category === 'Event-Driven') {
      return '/playgrounds/message-flow'
    }
    if (titleLower.includes('data') || titleLower.includes('pipeline') || category === 'Data Architecture') {
      return '/playgrounds/data-pipeline'
    }
    if (titleLower.includes('integration') || titleLower.includes('service')) {
      return '/playgrounds/enterprise-integration'
    }
    return null
  }

  const playgroundLink = getPlaygroundLink(pattern.category, pattern.title)

  // Get category icon and color
  const getCategoryStyle = (category: string) => {
    const styles: Record<string, { icon: string; color: string; bg: string }> = {
      'Event-Driven': { icon: '⚡', color: 'text-yellow-700', bg: 'bg-yellow-50 border-yellow-200' },
      'Security': { icon: '🔒', color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
      'Data Architecture': { icon: '🗄️', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
      'Distributed Systems': { icon: '🌐', color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200' },
      'Structural': { icon: '🏗️', color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
      'Integration': { icon: '🔗', color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200' },
      'General': { icon: '📐', color: 'text-slate-700', bg: 'bg-slate-50 border-slate-200' },
    }
    return styles[category] || styles['General']
  }

  const categoryStyle = getCategoryStyle(pattern.category)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 mb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/patterns"
            className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Pattern Library
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className={`text-sm px-4 py-1.5 ${categoryStyle.bg} ${categoryStyle.color} rounded-full font-semibold border shadow-sm`}>
              {categoryStyle.icon} {pattern.category}
            </span>
            {pattern.type && (
              <span className="text-xs px-3 py-1 bg-white/20 text-white rounded-full font-medium">
                {pattern.type}
              </span>
            )}
          </div>

          <h1 className="text-5xl font-bold mb-4 leading-tight">{pattern.title}</h1>

          {pattern.keywords && (
            <div className="flex flex-wrap gap-2 mt-4">
              {pattern.keywords.split(',').map((keyword, idx) => (
                <span key={idx} className="text-xs px-3 py-1 bg-white/10 text-blue-100 rounded-full">
                  {keyword.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">

        {/* Try in Playground CTA */}
        {playgroundLink && (
          <div className="mb-8 relative overflow-hidden rounded-xl border-2 border-blue-300 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10"></div>
            <div className="relative p-8 flex items-center justify-between bg-white/90 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🎮</div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900">
                    Try This Pattern Interactively
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    Experience this pattern hands-on in our interactive playground with live examples and visualizations
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Visual learning • Step-by-step guides • Real-time feedback</span>
                  </div>
                </div>
              </div>
              <Link
                href={playgroundLink}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition font-semibold whitespace-nowrap shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                Launch Playground
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        )}

        {/* Pattern content */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-10 mb-8">
          <article
            className="prose prose-slate max-w-none
              prose-headings:font-bold prose-headings:text-slate-900
              prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-200
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-blue-900
              prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-base
              prose-ul:my-6 prose-ul:list-none prose-ul:pl-0
              prose-li:text-slate-700 prose-li:my-3 prose-li:pl-6 prose-li:relative
              prose-li:before:content-['→'] prose-li:before:absolute prose-li:before:left-0 prose-li:before:text-blue-500 prose-li:before:font-bold
              prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
              prose-strong:text-slate-900 prose-strong:font-bold prose-strong:bg-yellow-50 prose-strong:px-1 prose-strong:rounded
              prose-code:text-blue-700 prose-code:bg-blue-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
              prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:p-6 prose-pre:rounded-xl prose-pre:shadow-lg prose-pre:border prose-pre:border-slate-700
              prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline hover:prose-a:text-blue-700
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:rounded-r"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>

        {/* Related patterns section */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
            <h2 className="text-3xl font-bold text-slate-900">Related Patterns</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {getAllPatterns()
              .filter((p) => p.category === pattern.category && p.slug !== pattern.slug)
              .slice(0, 4)
              .map((relatedPattern) => {
                const relatedStyle = getCategoryStyle(relatedPattern.category)
                return (
                  <Link
                    key={relatedPattern.slug}
                    href={`/patterns/${relatedPattern.slug}`}
                    className="group relative overflow-hidden border-2 border-slate-200 rounded-xl p-6 hover:shadow-2xl hover:border-blue-400 transition-all duration-300 bg-white transform hover:-translate-y-1"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">{relatedStyle.icon}</span>
                        <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full font-medium">
                          {relatedPattern.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg mb-3 group-hover:text-blue-600 transition-colors">
                        {relatedPattern.title}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {relatedPattern.content.substring(0, 120)}...
                      </p>
                      <div className="mt-4 flex items-center text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn more
                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
