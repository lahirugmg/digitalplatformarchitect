import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const patternsDirectory = path.join(process.cwd(), 'content-export/patterns')

export interface Pattern {
  slug: string
  title: string
  type: string
  keywords?: string
  content: string
  category: string
}

function getCategoryFromTitle(title: string): string {
  if (title.includes('event') || title.includes('cqrs') || title.includes('saga')) {
    return 'Event-Driven'
  }
  if (title.includes('security') || title.includes('oauth') || title.includes('zero-trust')) {
    return 'Security'
  }
  if (title.includes('data') || title.includes('mesh')) {
    return 'Data Architecture'
  }
  if (title.includes('microservice') || title.includes('service')) {
    return 'Distributed Systems'
  }
  if (
    title.includes('layered') ||
    title.includes('hexagonal') ||
    title.includes('clean') ||
    title.includes('onion')
  ) {
    return 'Structural'
  }
  if (
    title.includes('message') ||
    title.includes('router') ||
    title.includes('channel') ||
    title.includes('aggregator') ||
    title.includes('splitter') ||
    title.includes('endpoint') ||
    title.includes('translator') ||
    title.includes('bridge') ||
    title.includes('gateway') ||
    title.includes('bus') ||
    title.includes('polling') ||
    title.includes('scatter') ||
    title.includes('broker') ||
    title.includes('wire tap')
  ) {
    return 'Integration Patterns'
  }
  return 'General'
}

export function getAllPatterns(): Pattern[] {
  const fileNames = fs.readdirSync(patternsDirectory)
  const patterns = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(patternsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      const title = (data.title || slug).toLowerCase()

      let category = data.category
      if (!category) {
        const typeStr = (data.type || '').toLowerCase()
        if (typeStr.includes('integration') || typeStr.includes('eip')) {
          category = 'Integration Patterns'
        } else {
          category = getCategoryFromTitle(title)
        }
      }

      return {
        slug,
        title: data.title || slug,
        type: data.type || 'pattern',
        keywords: data.keywords || '',
        content,
        category,
      }
    })

  return patterns.sort((a, b) => a.title.localeCompare(b.title))
}

export function getPatternBySlug(slug: string): Pattern | null {
  try {
    const fullPath = path.join(patternsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const title = (data.title || slug).toLowerCase()

    let category = data.category
    if (!category) {
      const typeStr = (data.type || '').toLowerCase()
      if (typeStr.includes('integration') || typeStr.includes('eip')) {
        category = 'Integration Patterns'
      } else {
        category = getCategoryFromTitle(title)
      }
    }

    return {
      slug,
      title: data.title || slug,
      type: data.type || 'pattern',
      keywords: data.keywords || '',
      content,
      category,
    }
  } catch (error) {
    return null
  }
}

export function getPatternCategories(): string[] {
  const patterns = getAllPatterns()
  const categories = new Set(patterns.map((p) => p.category))
  return Array.from(categories).sort()
}
