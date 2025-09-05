import { getAllArticles, getAllTags, getAllAuthors } from '@/lib/articles';

export async function GET() {
  const articles = getAllArticles();
  const tags = getAllTags();
  const authors = getAllAuthors();
  
  const baseUrl = 'https://digitalplatformarchitect.com';
  const now = new Date().toISOString();
  
  // Static pages
  const staticPages = [
    { path: '', priority: '1.0', changefreq: 'weekly' },
    { path: '/articles', priority: '0.9', changefreq: 'daily' },
    { path: '/tags', priority: '0.8', changefreq: 'weekly' },
    { path: '/authors', priority: '0.8', changefreq: 'weekly' },
    { path: '/blocks', priority: '0.8', changefreq: 'monthly' },
    { path: '/patterns', priority: '0.8', changefreq: 'monthly' },
    { path: '/solutions', priority: '0.7', changefreq: 'monthly' },
    { path: '/ai', priority: '0.6', changefreq: 'monthly' },
    { path: '/story', priority: '0.7', changefreq: 'monthly' },
    { path: '/about', priority: '0.5', changefreq: 'yearly' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (page) => `
  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('')}
${articles
  .map(
    (article) => `
  <url>
    <loc>${baseUrl}/articles/${article.slug}</loc>
    <lastmod>${article.updatedAt || article.publishedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('')}
${tags
  .map(
    (tag) => `
  <url>
    <loc>${baseUrl}/tags/${encodeURIComponent(tag.tag.toLowerCase())}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
  )
  .join('')}
${authors
  .map(
    (author) => `
  <url>
    <loc>${baseUrl}/authors/${author.id}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
  )
  .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}
