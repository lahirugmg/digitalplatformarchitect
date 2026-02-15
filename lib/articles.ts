import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const articlesDirectory = path.join(process.cwd(), 'content-export/articles')

export interface ArticleAuthor {
  id?: string
  name?: string
  bio?: string
  social?: Record<string, string>
}

export interface Article {
  slug: string
  title: string
  summary?: string
  publishedAt?: string
  author?: ArticleAuthor
  tags?: string[]
  featured?: boolean
  content: string
}

export function getAllArticles(): Article[] {
  const fileNames = fs.readdirSync(articlesDirectory)
  const articles = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(articlesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || slug,
        summary: data.summary || '',
        publishedAt: data.publishedAt || '',
        author: data.author || undefined,
        tags: data.tags || [],
        featured: Boolean(data.featured),
        content,
      }
    })

  return articles.sort((a, b) => a.title.localeCompare(b.title))
}

export function getArticleBySlug(slug: string): Article | null {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      summary: data.summary || '',
      publishedAt: data.publishedAt || '',
      author: data.author || undefined,
      tags: data.tags || [],
      featured: Boolean(data.featured),
      content,
    }
  } catch (error) {
    return null
  }
}
