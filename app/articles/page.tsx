import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'
import { getPreviewText } from '@/lib/markdown'

export default function ArticlesPage() {
  const articles = getAllArticles()

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Articles</h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            Deep dives on platform architecture, strategy, and implementation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="border border-slate-200 rounded-lg p-6 hover:shadow-lg hover:border-blue-300 transition bg-white"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                <span>{article.publishedAt || 'Draft'}</span>
                {article.featured && (
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Featured</span>
                )}
              </div>
              <h2 className="text-2xl font-bold mb-2 text-slate-900">{article.title}</h2>
              <p className="text-sm text-slate-600 mb-4">
                {article.summary || getPreviewText(article.content, 180)}
              </p>
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {article.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
