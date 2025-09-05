import { getAllArticles } from '@/lib/articles';

export async function GET() {
  const articles = getAllArticles();
  
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Digital Platform Architect - Articles</title>
    <description>In-depth articles on platform architecture, microservices, API design, and modern development practices.</description>
    <link>https://digitalplatformarchitect.com</link>
    <language>en-US</language>
    <managingEditor>noreply@digitalplatformarchitect.com</managingEditor>
    <webMaster>noreply@digitalplatformarchitect.com</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://digitalplatformarchitect.com/rss.xml" rel="self" type="application/rss+xml"/>
    ${articles
      .map(
        (article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <description><![CDATA[${article.summary}]]></description>
      <link>https://digitalplatformarchitect.com/articles/${article.slug}</link>
      <guid isPermaLink="true">https://digitalplatformarchitect.com/articles/${article.slug}</guid>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <author>noreply@digitalplatformarchitect.com (${article.author.name})</author>
      ${article.tags.map(tag => `<category>${tag}</category>`).join('\n      ')}
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}