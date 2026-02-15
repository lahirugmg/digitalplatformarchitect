import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const pagesDirectory = path.join(process.cwd(), 'content-export/pages')

export interface ContentPage {
  slug: string
  title: string
  content: string
}

export function getPageBySlug(slug: string): ContentPage | null {
  try {
    const fullPath = path.join(pagesDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      content,
    }
  } catch (error) {
    return null
  }
}
