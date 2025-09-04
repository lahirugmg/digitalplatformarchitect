import Link from 'next/link';
import { getAllTags } from '@/lib/articles';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tags',
  description: 'Browse articles by topic and category.',
  openGraph: {
    title: 'Tags | Digital Platform Architect',
    description: 'Browse articles by topic and category.',
  },
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="stack gap-xl">
      <header className="tags-header">
        <h1 className="title">Tags</h1>
        <p className="lede">
          Browse articles by topic and category. Find content that matches your interests and learning goals.
        </p>
      </header>

      {tags.length === 0 ? (
        <div className="no-tags">
          <p>No tags available yet.</p>
        </div>
      ) : (
        <div className="tags-grid">
          {tags.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
              className="tag-card"
            >
              <span className="tag-name">{tag}</span>
              <span className="tag-count">
                {count} {count === 1 ? 'article' : 'articles'}
              </span>
            </Link>
          ))}
        </div>
      )}

      <div className="tags-cta">
        <p>
          <Link href="/articles">← Back to all articles</Link>
        </p>
      </div>
    </div>
  );
}