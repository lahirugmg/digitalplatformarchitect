import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticlesByAuthor, getAllAuthors } from '@/lib/articles';
import type { Metadata } from 'next';

interface Props {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const authors = getAllAuthors();
  return authors.map((author) => ({
    id: author.id,
  }));
}

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const articles = getArticlesByAuthor(params.id);
  
  if (articles.length === 0) {
    return {};
  }
  
  const author = articles[0].author;
  
  return {
    title: `Articles by ${author.name}`,
    description: `Read articles by ${author.name} on platform architecture and modern development practices.`,
    openGraph: {
      title: `Articles by ${author.name} | Digital Platform Architect`,
      description: `Read articles by ${author.name} on platform architecture and modern development practices.`,
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

export default function AuthorPage({ params }: Props) {
  const articles = getArticlesByAuthor(params.id);

  if (articles.length === 0) {
    notFound();
  }

  const author = articles[0].author;

  return (
    <div className="stack gap-xl">
      <header className="author-header">
        <nav className="author-breadcrumb">
          <Link href="/authors">← All authors</Link>
        </nav>
        
        <div className="author-profile">
          <h1 className="author-name">{author.name}</h1>
          {author.bio && <p className="author-bio">{author.bio}</p>}
          
          {author.social && (
            <div className="author-social">
              {author.social.linkedin && (
                <a 
                  href={`https://linkedin.com/in/${author.social.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  LinkedIn
                </a>
              )}
              {author.social.twitter && (
                <a 
                  href={`https://x.com/${author.social.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  X
                </a>
              )}
              {author.social.github && (
                <a 
                  href={`https://github.com/${author.social.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  GitHub
                </a>
              )}
            </div>
          )}
        </div>
        
        <div className="author-stats">
          <span>{articles.length} {articles.length === 1 ? 'article' : 'articles'}</span>
        </div>
      </header>

      <section className="author-articles">
        <h2 className="section-title">Articles</h2>
        <div className="articles-grid">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <div className="author-navigation">
        <Link href="/articles" className="back-to-articles">
          ← All articles
        </Link>
        <Link href="/authors" className="back-to-authors">
          All authors →
        </Link>
      </div>
    </div>
  );
}
