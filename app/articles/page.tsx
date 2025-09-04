import Link from 'next/link';
import { getAllArticles } from '@/lib/articles';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'In-depth articles on platform architecture, microservices, API design, and modern development practices.',
  openGraph: {
    title: 'Articles | Digital Platform Architect',
    description: 'In-depth articles on platform architecture, microservices, API design, and modern development practices.',
  },
};

function ArticleCard({ article }: { article: any }) {
  return (
    <article className="article-card">
      <div className="article-meta">
        <time dateTime={article.publishedAt} className="article-date">
          {new Date(article.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <span className="article-reading-time">{article.readingTime} min read</span>
      </div>
      
      <header>
        <h2 className="article-title">
          <Link href={`/articles/${article.slug}`}>
            {article.title}
          </Link>
        </h2>
        <p className="article-summary">{article.summary}</p>
      </header>
      
      <footer className="article-footer">
        <div className="article-author">
          <div className="author-info">
            <span className="author-name">{article.author.name}</span>
          </div>
        </div>
        
        <div className="article-tags">
          {article.tags.map((tag: string) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
              className="article-tag"
            >
              {tag}
            </Link>
          ))}
        </div>
      </footer>
    </article>
  );
}

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="stack gap-xl">
      <header className="articles-header">
        <h1 className="title">Articles</h1>
        <p className="lede">
          In-depth articles on platform architecture, microservices, API design, and modern development practices.
          Learn from real-world experiences and proven patterns.
        </p>
      </header>

      {articles.length === 0 ? (
        <div className="no-articles">
          <p>No articles available yet. Check back soon for new content!</p>
        </div>
      ) : (
        <div className="articles-grid">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}

      <div className="articles-cta">
        <p>
          Looking for more resources? Check out our{' '}
          <Link href="/patterns">architecture patterns</Link>{' '}
          and{' '}
          <Link href="/blocks">platform building blocks</Link>.
        </p>
      </div>
    </div>
  );
}