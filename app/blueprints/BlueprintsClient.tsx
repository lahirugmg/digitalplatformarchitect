'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Fuse from 'fuse.js'
import { Search, X, Cpu, Layers } from 'lucide-react'
import { Blueprint } from '@/lib/blueprints'
import { getPreviewText } from '@/lib/markdown'

interface BlueprintsClientProps {
    blueprints: Blueprint[]
    tags: string[]
}

export default function BlueprintsClient({ blueprints, tags }: BlueprintsClientProps) {
    const searchParams = useSearchParams()
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedTag, setSelectedTag] = useState<string | null>(null)

    useEffect(() => {
        const tagParam = searchParams.get('tag')
        if (tagParam) {
            const normalizedTag = tags.find((tag) => tag.toLowerCase().includes(tagParam.toLowerCase()))
            if (normalizedTag) {
                setSelectedTag(normalizedTag)
            }
        }

        const filterParam = searchParams.get('filter')
        if (filterParam) {
            setSearchQuery(filterParam)
        }
    }, [searchParams, tags])

    const fuse = useMemo(
        () =>
            new Fuse(blueprints, {
                keys: ['title', 'tags', 'content'],
                threshold: 0.3,
                includeScore: true,
            }),
        [blueprints],
    )

    const filteredBlueprints = useMemo(() => {
        let result = blueprints

        if (searchQuery.trim()) {
            result = fuse.search(searchQuery).map((entry) => entry.item)
        }

        if (selectedTag) {
            result = result.filter((blueprint) => blueprint.tags.includes(selectedTag))
        }

        return result
    }, [fuse, blueprints, searchQuery, selectedTag])

    const clearFilters = () => {
        setSearchQuery('')
        setSelectedTag(null)
    }

    return (
        <div className="min-h-screen py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="mb-4 text-4xl font-bold text-slate-900 flex items-center gap-3">
                        <Cpu className="h-10 w-10 text-blue-600" />
                        System Designs & Blueprints
                    </h1>
                    <p className="max-w-3xl text-xl text-slate-600">
                        Explore {blueprints.length} end-to-end system architecture designs, mapping abstract concepts to real-world high-scale applications.
                    </p>
                </div>

                <div className="mb-8 space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search designs by title, tags, or content..."
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-10 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            aria-label="Search blueprints"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                aria-label="Clear search"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-slate-700">Filter by tags:</span>
                        <button
                            onClick={() => setSelectedTag(null)}
                            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${selectedTag === null ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                        >
                            All ({blueprints.length})
                        </button>
                        {tags.map((tag) => {
                            const count = blueprints.filter((b) => b.tags.includes(tag)).length
                            return (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedTag(tag)}
                                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${selectedTag === tag
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                        }`}
                                >
                                    {tag} ({count})
                                </button>
                            )
                        })}
                    </div>

                    {(searchQuery || selectedTag) && (
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-slate-600">
                                Showing {filteredBlueprints.length} of {blueprints.length} designs
                            </span>
                            <button onClick={clearFilters} className="flex items-center gap-1 font-medium text-blue-700 hover:text-blue-800">
                                <X className="h-4 w-4" />
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>

                <div className="mb-12 grid grid-cols-3 gap-6">
                    <div className="card-standard p-6 border-blue-100 border-2">
                        <div className="text-3xl font-bold text-blue-700">{filteredBlueprints.length}</div>
                        <div className="text-sm text-slate-600 text-blue-600 font-semibold">{searchQuery || selectedTag ? 'Filtered Designs' : 'Total Designs'}</div>
                    </div>
                    <div className="card-standard p-6 border-slate-100 border-2">
                        <div className="text-3xl font-bold text-slate-900">{tags.length}</div>
                        <div className="text-sm text-slate-600">Tags Available</div>
                    </div>
                    <div className="card-standard p-6 border-slate-100 border-2">
                        <div className="text-3xl font-bold text-slate-900"><Layers className="h-8 w-8 text-indigo-500" /></div>
                        <div className="text-sm text-slate-600">Architecture Mapping</div>
                    </div>
                </div>

                {filteredBlueprints.length === 0 && (
                    <div className="py-12 text-center">
                        <p className="mb-4 text-xl text-slate-600">No blueprints found matching your criteria.</p>
                        <button onClick={clearFilters} className="btn-primary">
                            Clear filters
                        </button>
                    </div>
                )}

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredBlueprints.map((blueprint) => (
                        <Link key={blueprint.slug} href={`/blueprints/${blueprint.slug}`} className="card-interactive group p-6 border-t-4 border-t-blue-500 hover:border-t-blue-700 transition-all shadow-md hover:shadow-xl">
                            <h3 className="mb-2 text-xl font-bold text-slate-900 group-hover:text-blue-700">{blueprint.title}</h3>
                            <div className="mb-3 text-sm text-slate-600 leading-relaxed">{getPreviewText(blueprint.content, 180)}</div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {blueprint.tags.slice(0, 3).map((tag, idx) => (
                                    <span key={idx} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-100">
                                        {tag}
                                    </span>
                                ))}
                                {blueprint.tags.length > 3 && (
                                    <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500 border border-slate-100">
                                        +{blueprint.tags.length - 3}
                                    </span>
                                )}
                            </div>
                            <div className="flex justify-end border-t border-slate-100 pt-3">
                                <span className="text-sm font-semibold text-blue-600 group-hover:underline flex items-center gap-1">
                                    View Design
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
