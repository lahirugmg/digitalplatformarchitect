const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '../ext-source/booknotes/system-design/system-design-interview');
const PATTERNS_TARGET = path.join(__dirname, '../content-export/patterns');
const BLUEPRINTS_TARGET = path.join(__dirname, '../content-export/blueprints');
const IMAGES_TARGET = path.join(__dirname, '../public/images/system-design-interview');

const CONCEPTS = [
    // Patterns / Building Blocks
    { chapter: 'chapter05', slug: 'rate-limiter', type: 'pattern', category: 'General' },
    { chapter: 'chapter06', slug: 'consistent-hashing', type: 'pattern', category: 'Data Architecture' },
    { chapter: 'chapter07', slug: 'key-value-store', type: 'pattern', category: 'Data Architecture' },
    { chapter: 'chapter08', slug: 'unique-id-generator', type: 'pattern', category: 'Distributed Systems' },
    { chapter: 'chapter20', slug: 'distributed-message-queue', type: 'pattern', category: 'Event-Driven' },
    { chapter: 'chapter25', slug: 's3-like-object-storage', type: 'pattern', category: 'Data Architecture' },
    // Blueprints / System Designs
    { chapter: 'chapter09', slug: 'url-shortener', type: 'system-design', tags: 'System Design, Architecture' },
    { chapter: 'chapter10', slug: 'web-crawler', type: 'system-design', tags: 'System Design, Architecture' },
    { chapter: 'chapter11', slug: 'notification-system', type: 'system-design', tags: 'System Design, Architecture' },
    { chapter: 'chapter12', slug: 'news-feed-system', type: 'system-design', tags: 'System Design, Architecture' },
    { chapter: 'chapter13', slug: 'chat-system', type: 'system-design', tags: 'System Design, Architecture' },
    { chapter: 'chapter14', slug: 'search-autocomplete-system', type: 'system-design', tags: 'System Design, Architecture' },
    { chapter: 'chapter15', slug: 'youtube', type: 'system-design', tags: 'System Design, Architecture, Video Streaming' },
    { chapter: 'chapter16', slug: 'google-drive', type: 'system-design', tags: 'System Design, Architecture, Cloud Storage' },
    { chapter: 'chapter17', slug: 'proximity-service', type: 'system-design', tags: 'System Design, Architecture, LBS' },
    { chapter: 'chapter18', slug: 'nearby-friends', type: 'system-design', tags: 'System Design, Architecture, LBS' },
    { chapter: 'chapter19', slug: 'google-maps', type: 'system-design', tags: 'System Design, Architecture, LBS' },
    { chapter: 'chapter21', slug: 'metrics-monitoring-alerting-system', type: 'system-design', tags: 'System Design, Architecture, Observability' },
    { chapter: 'chapter22', slug: 'ad-click-event-aggregation', type: 'system-design', tags: 'System Design, Architecture, Big Data' },
    { chapter: 'chapter23', slug: 'hotel-reservation-system', type: 'system-design', tags: 'System Design, Architecture, Booking' },
    { chapter: 'chapter24', slug: 'distributed-email-service', type: 'system-design', tags: 'System Design, Architecture, Email' },
    { chapter: 'chapter26', slug: 'real-time-gaming-leaderboard', type: 'system-design', tags: 'System Design, Architecture, Gaming' },
    { chapter: 'chapter27', slug: 'payment-system', type: 'system-design', tags: 'System Design, Architecture, FinTech' },
    { chapter: 'chapter28', slug: 'digital-wallet', type: 'system-design', tags: 'System Design, Architecture, FinTech' },
    { chapter: 'chapter29', slug: 'stock-exchange', type: 'system-design', tags: 'System Design, Architecture, FinTech' },
];

if (!fs.existsSync(IMAGES_TARGET)) {
    fs.mkdirSync(IMAGES_TARGET, { recursive: true });
}

function copyDir(src, dest) {
    if (!fs.existsSync(src)) return;
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

for (const concept of CONCEPTS) {
    const dir = path.join(SOURCE_DIR, concept.chapter);
    if (!fs.existsSync(dir)) continue;

    const readmePath = path.join(dir, 'README.md');
    if (!fs.existsSync(readmePath)) continue;

    let content = fs.readFileSync(readmePath, 'utf8');

    // Extract title
    let title = concept.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (titleMatch) {
        title = titleMatch[1].trim();
        content = content.replace(/^#\s+(.+)\n*/m, ''); // remove the h1 title at the beginning
    }

    // Copy images
    const imagesSource = path.join(dir, 'images');
    const imagesDestDir = path.join(IMAGES_TARGET, concept.slug);
    if (fs.existsSync(imagesSource)) {
        copyDir(imagesSource, imagesDestDir);
    }

    // Rewrite image paths in markdown
    // Matches ![alt](images/filename.png) -> ![alt](/images/system-design-interview/slug/filename.png)
    content = content.replace(/\]\(images\//g, `](/images/system-design-interview/${concept.slug}/`);

    // Build Frontmatter
    let frontmatter = `---\n`;
    frontmatter += `title: "${title}"\n`;
    frontmatter += `slug: ${concept.slug}\n`;
    if (concept.type === 'pattern') {
        frontmatter += `type: pattern\n`;
        frontmatter += `category: "${concept.category}"\n`;
    } else {
        frontmatter += `type: system-design\n`;
        frontmatter += `tags: "${concept.tags}"\n`;
    }
    frontmatter += `---\n\n`;

    const finalContent = frontmatter + content;

    // Save to target
    let targetFile = path.join(PATTERNS_TARGET, `${concept.slug}.md`);
    if (concept.type === 'system-design') {
        targetFile = path.join(BLUEPRINTS_TARGET, `${concept.slug}.md`);
    }

    fs.writeFileSync(targetFile, finalContent, 'utf8');
    console.log(`Processed: ${concept.slug}`);
}
