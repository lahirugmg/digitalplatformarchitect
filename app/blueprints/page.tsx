import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getAllBlueprints, getBlueprintTags } from '@/lib/blueprints'
import BlueprintsClient from './BlueprintsClient'

export const metadata: Metadata = {
    title: 'System Designs & Blueprints',
    description: 'Explore concrete end-to-end system designs and architecture blueprints for high-scale applications.',
    openGraph: {
        title: 'System Designs & Blueprints | Digital Platform Architect',
        description: 'Explore concrete end-to-end system designs and architecture blueprints for high-scale applications.',
    },
}

export default function BlueprintsPage() {
    const blueprints = getAllBlueprints()
    const tags = getBlueprintTags()

    return (
        <Suspense fallback={<div className="min-h-screen py-12 flex items-center justify-center">Loading blueprints...</div>}>
            <BlueprintsClient blueprints={blueprints} tags={tags} />
        </Suspense>
    )
}
