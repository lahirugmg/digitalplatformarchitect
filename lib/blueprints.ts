import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const blueprintsDirectory = path.join(process.cwd(), 'content-export/blueprints')

export interface Blueprint {
    slug: string
    title: string
    type: string
    tags: string[]
    content: string
}

export function getAllBlueprints(): Blueprint[] {
    if (!fs.existsSync(blueprintsDirectory)) {
        return []
    }

    const fileNames = fs.readdirSync(blueprintsDirectory)
    const blueprints = fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, '')
            const fullPath = path.join(blueprintsDirectory, fileName)
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const { data, content } = matter(fileContents)

            const title = data.title || slug
            const tagsStr = data.tags || ''
            const tags = typeof tagsStr === 'string'
                ? tagsStr.split(',').map((t) => t.trim()).filter(Boolean)
                : Array.isArray(tagsStr) ? tagsStr : []

            return {
                slug,
                title,
                type: data.type || 'system-design',
                tags,
                content,
            }
        })

    return blueprints.sort((a, b) => a.title.localeCompare(b.title))
}

export function getBlueprintBySlug(slug: string): Blueprint | null {
    try {
        const fullPath = path.join(blueprintsDirectory, `${slug}.md`)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        const title = data.title || slug
        const tagsStr = data.tags || ''
        const tags = typeof tagsStr === 'string'
            ? tagsStr.split(',').map((t) => t.trim()).filter(Boolean)
            : Array.isArray(tagsStr) ? tagsStr : []

        return {
            slug,
            title,
            type: data.type || 'system-design',
            tags,
            content,
        }
    } catch (error) {
        return null
    }
}

export function getBlueprintTags(): string[] {
    const blueprints = getAllBlueprints()
    const tagsList = blueprints.flatMap((p) => p.tags)
    const tags = new Set(tagsList)
    return Array.from(tags).sort()
}
