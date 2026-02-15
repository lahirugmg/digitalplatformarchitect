import { marked } from 'marked'
import { notFound } from 'next/navigation'
import { getPageBySlug } from '@/lib/pages'

export default function AboutPage() {
  const page = getPageBySlug('about')

  if (!page) {
    return notFound()
  }

  const contentHtml = marked(page.content)

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-8">
          <article
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </div>
    </div>
  )
}
