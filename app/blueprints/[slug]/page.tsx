import type { Metadata } from 'next'
import { getBlueprintBySlug, getAllBlueprints } from '@/lib/blueprints'
import { marked } from 'marked'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Cpu, Layers, ArrowLeft } from 'lucide-react'

export async function generateStaticParams() {
    const blueprints = getAllBlueprints()
    return blueprints.map((blueprint) => ({
        slug: blueprint.slug,
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params
    const blueprint = getBlueprintBySlug(resolvedParams.slug)
    if (!blueprint) return {}
    return {
        title: blueprint.title,
        description: `Explore the ${blueprint.title} system design: ${blueprint.content.substring(0, 150).replace(/[#*\n]/g, ' ').trim()}...`,
        openGraph: {
            title: `${blueprint.title} | System Designs`,
            description: `Explore the ${blueprint.title} architecture blueprint and system design.`,
        },
    }
}

export default async function BlueprintDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params
    const blueprint = getBlueprintBySlug(resolvedParams.slug)

    if (!blueprint) {
        return notFound()
    }

    const contentHtml = marked(blueprint.content)

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-900 text-white py-16 mb-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
                <div className="absolute -right-20 -top-20 opacity-10">
                    <Layers className="w-96 h-96" />
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link
                        href="/blueprints"
                        className="inline-flex items-center text-indigo-300 hover:text-white mb-6 transition font-medium"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to System Designs
                    </Link>

                    <div className="flex items-center gap-3 mb-6">
                        <span className="flex items-center gap-1.5 text-sm px-4 py-1.5 bg-indigo-500/20 text-indigo-200 rounded-full font-semibold border border-indigo-500/30 shadow-sm backdrop-blur-sm">
                            <Cpu className="w-4 h-4" /> System Design
                        </span>
                    </div>

                    <h1 className="text-5xl font-extrabold mb-6 leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200 py-2">
                        {blueprint.title}
                    </h1>

                    {blueprint.tags && blueprint.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {blueprint.tags.map((tag, idx) => (
                                <span key={idx} className="text-xs px-3 py-1.5 bg-white/10 hover:bg-white/20 transition-colors cursor-default text-indigo-100 rounded-full font-medium border border-white/10">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                {/* Blueprint content */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8 sm:p-12 mb-12 relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-t-2xl"></div>

                    <article
                        className="prose prose-slate max-w-none
              prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight
              prose-h1:text-4xl prose-h1:mt-8 prose-h1:mb-6
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-slate-100
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-indigo-900
              prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-lg
              prose-ul:my-6 prose-ul:list-none prose-ul:pl-0
              prose-li:text-slate-700 prose-li:my-3 prose-li:pl-8 prose-li:relative
              prose-li:before:content-['▹'] prose-li:before:absolute prose-li:before:left-1 prose-li:before:text-indigo-500 prose-li:before:font-bold prose-li:before:text-xl prose-li:before:-top-0.5
              prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6 prose-ol:text-lg
              prose-strong:text-slate-900 prose-strong:font-bold
              prose-code:text-indigo-700 prose-code:bg-indigo-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-[#0f172a] prose-pre:text-slate-100 prose-pre:p-6 prose-pre:rounded-xl prose-pre:shadow-xl prose-pre:border prose-pre:border-slate-700
              prose-a:text-indigo-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline hover:prose-a:text-indigo-800 transition-colors
              prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:bg-indigo-50/50 prose-blockquote:py-3 prose-blockquote:pr-6 prose-blockquote:rounded-r-lg
              prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-slate-200 prose-img:mx-auto
              prose-table:border-collapse prose-table:w-full prose-td:border prose-td:border-slate-200 prose-td:p-3 prose-th:border prose-th:border-slate-200 prose-th:p-3 prose-th:bg-slate-50 prose-th:text-left"
                        dangerouslySetInnerHTML={{ __html: contentHtml }}
                    />
                </div>

                {/* Related Designs section */}
                <div className="mt-16">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-1.5 w-12 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full"></div>
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Other System Designs</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {getAllBlueprints()
                            .filter((b) => b.slug !== blueprint.slug && b.tags.some(t => blueprint.tags.includes(t)))
                            .slice(0, 4)
                            .map((relatedBlueprint) => (
                                <Link
                                    key={relatedBlueprint.slug}
                                    href={`/blueprints/${relatedBlueprint.slug}`}
                                    className="group relative overflow-hidden border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-indigo-300 transition-all duration-300 bg-white transform hover:-translate-y-1"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Cpu className="w-5 h-5 text-indigo-500" />
                                            <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full font-medium">
                                                System Design
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-xl mb-3 text-slate-900 group-hover:text-indigo-600 transition-colors">
                                            {relatedBlueprint.title}
                                        </h3>
                                        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                                            {relatedBlueprint.content.substring(0, 120).replace(/[#*\n]/g, ' ').trim()}...
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {relatedBlueprint.tags.slice(0, 2).map((tag, idx) => (
                                                <span key={idx} className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mt-4 flex items-center text-indigo-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                                            Explore Design
                                            <svg className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            )
                            )}
                    </div>
                </div>
            </div>
        </div>
    )
}
