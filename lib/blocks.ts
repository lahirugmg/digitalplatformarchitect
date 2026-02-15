import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const blocksDirectory = path.join(process.cwd(), 'content-export/blocks')

export interface Block {
  slug: string
  title: string
  type: string
  keywords?: string
  content: string
}

export function getAllBlocks(): Block[] {
  const fileNames = fs.readdirSync(blocksDirectory)
  const blocks = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(blocksDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || slug,
        type: data.type || 'building-block',
        keywords: data.keywords || '',
        content,
      }
    })

  return blocks.sort((a, b) => a.title.localeCompare(b.title))
}

export function getBlockBySlug(slug: string): Block | null {
  try {
    const fullPath = path.join(blocksDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      type: data.type || 'building-block',
      keywords: data.keywords || '',
      content,
    }
  } catch (error) {
    return null
  }
}
