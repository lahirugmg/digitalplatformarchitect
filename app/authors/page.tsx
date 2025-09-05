import Link from 'next/link';
import { getAllAuthors } from '@/lib/articles';
import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Authors',
  description: 'Meet the authors sharing their expertise in platform architecture and modern development practices.',
  openGraph: {
    title: 'Authors | Digital Platform Architect',
    description: 'Meet the authors sharing their expertise in platform architecture and modern development practices.',
  },
};

function AuthorCard({ author }: { author: any }) {
  return (
    <div className="author-card">
      <Link href={`/authors/${author.id}`} className="author-main">
        <div className="author-info">
          <h3 className="author-name">{author.name}</h3>
          {author.bio && <p className="author-bio">{author.bio}</p>}
        </div>
      </Link>
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
  );
}

export default function AuthorsPage() {
  const authors = getAllAuthors();

  return (
    <div className="stack gap-xl">
      <header className="authors-header">
        <h1 className="title">Authors</h1>
        <p className="lede">
          Meet the experts sharing their knowledge and experience in platform architecture, 
          microservices, and modern development practices.
        </p>
      </header>

      {authors.length === 0 ? (
        <div className="no-authors">
          <p>No authors available yet.</p>
        </div>
      ) : (
        <div className="authors-grid">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      )}

      <div className="authors-cta">
        <p>
          <Link href="/articles">← Back to all articles</Link>
        </p>
      </div>
    </div>
  );
}
