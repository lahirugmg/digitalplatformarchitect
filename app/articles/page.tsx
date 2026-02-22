import { getAllArticles } from '@/lib/articles'
import ArticlesClient from './ArticlesClient'

export default function ArticlesPage() {
  const articles = getAllArticles()

  // Extract all unique tags
  const allTags = Array.from(
    new Set(articles.flatMap((article) => article.tags || []))
  ).sort()

  return <ArticlesClient articles={articles} allTags={allTags} />
}
