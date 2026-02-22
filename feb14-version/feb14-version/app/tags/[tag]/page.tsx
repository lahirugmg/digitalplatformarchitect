import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticlesByTag, getAllTags } from '@/lib/articles';
import type { Metadata } from 'next';

interface Props {
  params: {
    tag: string;
  };
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tagInfo) => ({
    tag: encodeURIComponent(tagInfo.tag.toLowerCase()),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag);
  
  return {
    title: `Articles tagged "${tag}"`,
    description: `Articles about ${tag} - platform architecture, microservices, and modern development practices.`,
    openGraph: {
      title: `Articles tagged "${tag}" | Digital Platform Architect`,
      description: `Articles about ${tag} - platform architecture, microservices, and modern development practices.`,
    },
  };
}

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
          <span className="author-name">{article.author.name}</span>
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

export default function TagPage({ params }: Props) {
  const tag = decodeURIComponent(params.tag);
  const articles = getArticlesByTag(tag);

  if (articles.length === 0) {
    notFound();
  }

  return (
    <div className="stack gap-xl">
      <header className="tag-header">
        <nav className="tag-breadcrumb">
          <Link href="/tags">← All tags</Link>
        </nav>
        
        <h1 className="title">Articles tagged "{tag}"</h1>
        <p className="lede">
          {articles.length} {articles.length === 1 ? 'article' : 'articles'} about {tag}.
        </p>
      </header>

      <div className="articles-grid">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      <div className="tag-navigation">
        <Link href="/articles" className="back-to-articles">
          ← All articles
        </Link>
        <Link href="/tags" className="back-to-tags">
          All tags →
        </Link>
      </div>
    </div>
  );
}