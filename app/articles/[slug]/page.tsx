import { marked } from 'marked'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllArticles, getArticleBySlug } from '@/lib/articles'

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    return notFound()
  }

  const contentHtml = marked(article.content)

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/articles" className="text-blue-600 hover:underline text-sm">
          ← Back to articles
        </Link>

        <div className="mt-6 bg-white border border-slate-200 rounded-xl shadow-lg p-8">
          <div className="text-sm text-slate-500 mb-3">
            {article.publishedAt || 'Draft'}
          </div>
          <h1 className="text-4xl font-bold mb-4 text-slate-900">{article.title}</h1>
          {article.author?.name && (
            <div className="text-sm text-slate-600 mb-6">By {article.author.name}</div>
          )}
          <article
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </div>
    </div>
  )
}
