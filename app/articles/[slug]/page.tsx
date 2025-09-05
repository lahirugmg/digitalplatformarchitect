import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticleBySlug, getAllArticles } from '@/lib/articles';
import type { Metadata } from 'next';
import { marked } from 'marked';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return {};
  }

  const title = article.seo?.title || article.title;
  const description = article.seo?.description || article.summary;
  
  return {
    title,
    description,
    keywords: article.seo?.keywords,
    authors: [{ name: article.author.name }],
    openGraph: {
      title: `${title} | Digital Platform Architect`,
      description,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Digital Platform Architect`,
      description,
    },
  };
}

const components = {
  h1: (props: any) => <h1 className="article-h1" {...props} />,
  h2: (props: any) => <h2 className="article-h2" {...props} />,
  h3: (props: any) => <h3 className="article-h3" {...props} />,
  h4: (props: any) => <h4 className="article-h4" {...props} />,
  p: (props: any) => <p className="article-p" {...props} />,
  ul: (props: any) => <ul className="article-ul" {...props} />,
  ol: (props: any) => <ol className="article-ol" {...props} />,
  li: (props: any) => <li className="article-li" {...props} />,
  blockquote: (props: any) => <blockquote className="article-blockquote" {...props} />,
  code: (props: any) => <code className="article-code" {...props} />,
  pre: (props: any) => <pre className="article-pre" {...props} />,
  a: (props: any) => <a className="article-link" {...props} />,
};

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  // Render Markdown/MDX content to HTML using marked
  const html = marked.parse(article.content || '');

  return (
    <div className="article-container">
      <header className="article-header">
        <nav className="article-breadcrumb">
          <Link href="/articles">← Back to Articles</Link>
        </nav>
        
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

        <h1 className="article-title">{article.title}</h1>
        
        <div className="article-summary">
          <p>{article.summary}</p>
        </div>

        <div className="article-author-info">
          <div className="author-details">
            <div className="author-text">
              <div className="author-name">{article.author.name}</div>
              {article.author.bio && (
                <div className="author-bio">{article.author.bio}</div>
              )}
            </div>
          </div>
          
          {article.author.social && (
            <div className="author-social">
              {article.author.social.linkedin && (
                <a 
                  href={`https://linkedin.com/in/${article.author.social.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  LinkedIn
                </a>
              )}
              {article.author.social.twitter && (
                <a 
                  href={`https://x.com/${article.author.social.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  X
                </a>
              )}
              {article.author.social.github && (
                <a 
                  href={`https://github.com/${article.author.social.github}`}
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

        <div className="article-tags">
          {article.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
              className="article-tag"
            >
              {tag}
            </Link>
          ))}
        </div>
      </header>

      <main className="article-content">
        <div
          className="article-prose"
          dangerouslySetInnerHTML={{ __html: html as string }}
        />
      </main>

      <footer className="article-footer-section">
        <div className="article-footer-meta">
          {article.updatedAt && (
            <p className="updated-date">
              Last updated: {new Date(article.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
        </div>

        <div className="article-navigation">
          <Link href="/articles" className="back-to-articles">
            ← All Articles
          </Link>
        </div>
      </footer>
    </div>
  );
}
