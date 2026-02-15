import Link from 'next/link'
import { getAllBlocks } from '@/lib/blocks'
import { getPreviewText } from '@/lib/markdown'

export default function BlocksPage() {
  const blocks = getAllBlocks()

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Platform Building Blocks</h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            Explore the foundational capabilities that power enterprise digital platforms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {blocks.map((block) => (
            <Link
              key={block.slug}
              href={`/blocks/${block.slug}`}
              className="border border-slate-200 rounded-lg p-6 hover:shadow-lg hover:border-blue-300 transition bg-white"
            >
              <h2 className="text-2xl font-bold mb-2 text-slate-900">{block.title}</h2>
              <p className="text-sm text-slate-600 mb-4">
                {getPreviewText(block.content, 180)}
              </p>
              {block.keywords && (
                <div className="flex flex-wrap gap-2">
                  {block.keywords.split(',').slice(0, 4).map((keyword) => (
                    <span
                      key={keyword}
                      className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded"
                    >
                      {keyword.trim()}
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
