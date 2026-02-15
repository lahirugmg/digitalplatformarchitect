import { marked } from 'marked'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllBlocks, getBlockBySlug } from '@/lib/blocks'

export async function generateStaticParams() {
  const blocks = getAllBlocks()
  return blocks.map((block) => ({ slug: block.slug }))
}

export default function BlockDetailPage({ params }: { params: { slug: string } }) {
  const block = getBlockBySlug(params.slug)

  if (!block) {
    return notFound()
  }

  const contentHtml = marked(block.content)

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blocks" className="text-blue-600 hover:underline text-sm">
          ← Back to blocks
        </Link>

        <div className="mt-6 bg-white border border-slate-200 rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-4 text-slate-900">{block.title}</h1>
          <article
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </div>
    </div>
  )
}
