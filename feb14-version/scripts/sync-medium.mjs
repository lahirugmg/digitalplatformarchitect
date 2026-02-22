#!/usr/bin/env node
// Simple Medium RSS → MDX importer for @lahirugmg
// Usage: node scripts/sync-medium.mjs [--feed https://medium.com/feed/@lahirugmg]

import fs from 'node:fs';
import path from 'node:path';

const FEED_URL_DEFAULT = 'https://medium.com/feed/@lahirugmg';
const ROOT = path.join(process.cwd());
const ARTICLES_DIR = path.join(ROOT, 'content', 'articles');

const args = process.argv.slice(2);
const feedArgIdx = args.indexOf('--feed');
const FEED_URL = feedArgIdx !== -1 ? args[feedArgIdx + 1] : FEED_URL_DEFAULT;

async function main() {
  ensureDir(ARTICLES_DIR);

  const xml = await fetchFeed(FEED_URL);
  const items = parseRss(xml);
  if (items.length === 0) {
    console.log('No items found in feed. Exiting.');
    return;
  }

  // Treat the first item as most recent
  let created = 0;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const slug = mediumSlugToLocal(item.link, item.title);
    const file = path.join(ARTICLES_DIR, `${slug}.mdx`);
    if (fs.existsSync(file)) {
      // Skip existing articles
      continue;
    }
    const summary = buildSummary(item);
    const date = toDateOnly(item.pubDate);

    const frontmatter = {
      title: item.title,
      slug,
      summary,
      publishedAt: date,
      author: {
        id: 'lahiru-gamage',
        name: 'Lahiru Gamage',
        bio: 'Digital Platform Architect. Exploring the intersection of AI and enterprise platforms.',
        social: {
          linkedin: 'lahirugamage',
          twitter: 'lahirugmg',
        },
      },
      tags: ['medium'],
      featured: i === 0,
      seo: {
        title: item.title,
        description: summary,
      },
    };

    const mdx = renderMdx(frontmatter, item.link);
    fs.writeFileSync(file, mdx, 'utf8');
    created++;
    console.log(`Created: ${path.relative(ROOT, file)}`);
  }

  if (created === 0) {
    console.log('All Medium posts already imported.');
  } else {
    console.log(`Imported ${created} Medium post${created === 1 ? '' : 's'}.`);
  }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function fetchFeed(url) {
  const res = await fetch(url, { headers: { 'Accept': 'application/rss+xml' } });
  if (!res.ok) throw new Error(`Failed to fetch feed: ${res.status} ${res.statusText}`);
  return await res.text();
}

function parseRss(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = itemRegex.exec(xml)) !== null) {
    const itemXml = m[1];
    const get = (tag) => {
      const r = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\/${tag}>`);
      const mm = r.exec(itemXml);
      return mm ? decodeCdata(mm[1].trim()) : '';
    };
    const title = stripCdata(get('title'));
    const link = stripCdata(get('link'));
    const pubDate = stripCdata(get('pubDate'));
    // Try content:encoded, else description
    const content = (() => {
      const cd = get('content:encoded');
      if (cd) return cd;
      const desc = get('description');
      return desc || '';
    })();
    items.push({ title, link, pubDate, content });
  }
  return items;
}

function decodeCdata(s) {
  // <![CDATA[...]]> wrapper → inner
  const cdata = /^<!\[CDATA\[([\s\s]*?)\]\]>$/;
  const mm = cdata.exec(s);
  return mm ? mm[1] : s;
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripCdata(s) {
  return s.replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '');
}

function mediumSlugToLocal(link, title) {
  try {
    const u = new URL(link);
    const parts = u.pathname.split('/').filter(Boolean);
    // Prefer the last segment that contains the slug
    const seg = parts[parts.length - 1] || '';
    // Remove trailing medium id (e.g., -a4379261e4ae)
    const cleaned = seg.replace(/-[a-f0-9]{8,}$/i, '');
    return cleaned || slugify(title);
  } catch {
    return slugify(title);
  }
}

function slugify(s) {
  return (s || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function toDateOnly(pubDate) {
  const d = new Date(pubDate);
  if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 10);
  return d.toISOString().slice(0, 10);
}

function buildSummary(item) {
  const text = stripHtml(item.content || '');
  const base = text || item.title || '';
  return base.length > 220 ? base.slice(0, 217) + '…' : base;
}

function renderMdx(frontmatter, canonicalUrl) {
  const fm = JSON.stringify(frontmatter, null, 2)
    .replace(/"([a-zA-Z0-9_]+)":/g, '$1:') // YAML-ish keys
    .replace(/"/g, '\\"');
  // We’ll emit proper YAML rather than JSON-ish
  const yaml = toYaml(frontmatter);
  return `---\n${yaml}---\n\nRead the full article on Medium:\n\n${canonicalUrl}\n`;
}

function toYaml(obj, indent = 0) {
  const sp = '  '.repeat(indent);
  if (Array.isArray(obj)) {
    return obj.map((v) => `${sp}- ${formatYamlValue(v, indent + 1)}`).join('\n') + '\n';
  } else if (obj && typeof obj === 'object') {
    return Object.entries(obj)
      .map(([k, v]) => {
        if (v && typeof v === 'object') {
          const nested = toYaml(v, indent + 1);
          return `${sp}${k}:\n${nested}`;
        }
        return `${sp}${k}: ${formatYamlValue(v, indent)}`;
      })
      .join('\n') + '\n';
  }
  return `${sp}${String(obj)}\n`;
}

function formatYamlValue(v, indent) {
  if (Array.isArray(v)) return `\n${toYaml(v, indent)}`.trimEnd();
  if (v && typeof v === 'object') return `\n${toYaml(v, indent + 1)}`.trimEnd();
  if (typeof v === 'string') {
    // Quote strings that contain special chars
    if (/[:#\-{}\[\],&*?]|^\s|\s$/.test(v)) return JSON.stringify(v);
    return v;
  }
  return String(v);
}

// Run
main().catch((err) => {
  console.error(err);
  process.exit(1);
});

