import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  summary: string;
  publishedAt: string;
  updatedAt?: string;
  author: {
    id: string;
    name: string;
    bio?: string;
    avatar?: string;
    social?: {
      twitter?: string;
      linkedin?: string;
      github?: string;
    };
  };
  tags: string[];
  featured?: boolean;
  draft?: boolean;
  readingTime?: number;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export interface Article extends ArticleFrontmatter {
  content: string;
  excerpt?: string;
}

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }
  return fs.readdirSync(articlesDirectory)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''));
}

export function getArticleBySlug(slug: string): Article | null {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const frontmatter = data as ArticleFrontmatter;
    
    // Calculate reading time (roughly 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    
    // For now, just return the raw markdown content
    // We'll add proper MDX rendering later
    
    return {
      ...frontmatter,
      content,
      readingTime,
      excerpt: frontmatter.summary,
    };
  } catch {
    return null;
  }
}

export function getAllArticles(): Article[] {
  const slugs = getArticleSlugs();
  const articles = slugs
    .map(slug => getArticleBySlug(slug))
    .filter((article): article is Article => article !== null)
    .filter(article => !article.draft); // Filter out drafts in production
    
  // Sort articles by published date (newest first)
  return articles.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getArticlesByTag(tag: string): Article[] {
  return getAllArticles().filter(article => 
    article.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getArticlesByAuthor(authorId: string): Article[] {
  return getAllArticles().filter(article => 
    article.author.id === authorId
  );
}

export function getAllTags(): { tag: string; count: number }[] {
  const articles = getAllArticles();
  const tagCounts: Record<string, number> = {};
  
  articles.forEach(article => {
    article.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllAuthors(): ArticleFrontmatter['author'][] {
  const articles = getAllArticles();
  const authors: Record<string, ArticleFrontmatter['author']> = {};
  
  articles.forEach(article => {
    if (!authors[article.author.id]) {
      authors[article.author.id] = article.author;
    }
  });
  
  return Object.values(authors).sort((a, b) => a.name.localeCompare(b.name));
}

export function getFeaturedArticles(limit = 3): Article[] {
  return getAllArticles()
    .filter(article => article.featured)
    .slice(0, limit);
}