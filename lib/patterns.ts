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

export function getAllPatterns(): Pattern[] {
  const fileNames = fs.readdirSync(patternsDirectory)
  const patterns = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(patternsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      // Categorize patterns
      let category = 'General'
      const title = (data.title || slug).toLowerCase()

      if (title.includes('event') || title.includes('cqrs') || title.includes('saga')) {
        category = 'Event-Driven'
      } else if (title.includes('security') || title.includes('oauth') || title.includes('zero-trust')) {
        category = 'Security'
      } else if (title.includes('data') || title.includes('mesh')) {
        category = 'Data Architecture'
      } else if (title.includes('microservice') || title.includes('service')) {
        category = 'Distributed Systems'
      } else if (title.includes('layered') || title.includes('hexagonal') || title.includes('clean') || title.includes('onion')) {
        category = 'Structural'
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

    let category = 'General'
    const title = (data.title || slug).toLowerCase()

    if (title.includes('event') || title.includes('cqrs')) {
      category = 'Event-Driven'
    } else if (title.includes('security') || title.includes('oauth')) {
      category = 'Security'
    } else if (title.includes('data') || title.includes('mesh')) {
      category = 'Data Architecture'
    } else if (title.includes('microservice') || title.includes('service')) {
      category = 'Distributed Systems'
    } else if (title.includes('layered') || title.includes('hexagonal') || title.includes('clean')) {
      category = 'Structural'
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
