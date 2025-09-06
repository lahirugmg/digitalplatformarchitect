# Digital Platform Architect

A Next.js 14 web application for learning about enterprise digital platform architecture — principles, patterns, and practices. Built with TypeScript, MDX content management, and comprehensive building blocks visualization.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap and Setup
- **Prerequisites**: Node.js 18.17+ (or 20+ recommended) and npm
- **Install dependencies**: `npm install` — takes ~12 seconds
- **Type checking**: `npm run type-check` — takes ~5 seconds. Always run this before committing changes.

### Building and Testing
- **Development server**: `npm run dev` — ready in ~1.5 seconds at http://localhost:3000
- **Production build**: `npm run build` — takes ~20-25 seconds. NEVER CANCEL. Set timeout to 60+ minutes.
  - **CRITICAL BUILD NOTE**: Build fails in environments without internet access due to Google Fonts (Inter font from `next/font/google`). If build fails with "Failed to fetch `Inter` from Google Fonts", temporarily comment out the Google Font import in `app/layout.tsx` and remove `className={inter.className}` from the html tag.
- **Production server**: `npm run start` — ready in ~0.5 seconds after build
- **Medium sync**: `npm run sync:medium` — syncs articles from Medium RSS. Fails without internet access but is optional.

### Build Troubleshooting
**Font Loading Issues**: If `npm run build` fails with "Failed to fetch `Inter` from Google Fonts":
1. Edit `app/layout.tsx`
2. Comment out: `import { Inter } from "next/font/google";` and `const inter = Inter({ subsets: ["latin"] });`
3. Remove `className={inter.className}` from the `<html>` tag
4. Run build again - fallback fonts are configured in `app/globals.css` line 45

## Validation

### Manual Testing Requirements
- **ALWAYS test complete user scenarios after making changes**
- **Test navigation**: Home → Blocks → Patterns → individual pattern pages
- **Verify core functionality**: 
  - Architecture diagram magnification (🔍 Magnify button)
  - Pattern filtering and search
  - Building block connections explorer
  - Article links and metadata display
- **Screenshot critical pages** when making UI changes - especially homepage with the comprehensive building blocks diagram
- **Test both dev and production builds** to ensure consistency

### Development Workflow
- Always run `npm run type-check` before committing - TypeScript errors will break the build
- Test navigation between all major sections: `/`, `/blocks`, `/patterns`, `/solution`, `/articles`, `/about`
- Verify MDX content renders correctly (check `/articles` and individual article pages)
- Test the building blocks diagram interactions and filtering functionality

## Common Tasks

The following are key areas and commands that save development time:

### Repository Structure
```
/
├── app/                 # Next.js App Router pages and layouts
│   ├── page.tsx        # Homepage with main building blocks diagram
│   ├── layout.tsx      # Root layout with fonts and analytics
│   ├── globals.css     # CSS variables and styling
│   ├── blocks/         # Platform building blocks pages
│   ├── patterns/       # Architecture patterns pages
│   ├── articles/       # Article pages (MDX content)
│   └── ...
├── components/         # Reusable React components
│   ├── Header.tsx      # Main navigation
│   ├── Footer.tsx      # Site footer
│   ├── BlockDiagram.tsx # Building blocks visualization
│   └── ...
├── content/           # MDX content files
│   └── articles/      # Article content
├── docs/              # Project documentation
├── lib/               # Utility functions
├── public/            # Static assets
├── scripts/           # Build and sync scripts
└── types/             # TypeScript definitions
```

### Key Files to Know
- `app/page.tsx` — Homepage with comprehensive building blocks diagram
- `app/globals.css` — CSS variables, theme, font fallbacks (line 45)
- `next.config.mjs` — MDX configuration and build settings  
- `components/BlockDiagram.tsx` — Main architecture visualization component
- `components/ArchitectureExplorer.tsx` — Interactive layer exploration
- `scripts/sync-medium.mjs` — Medium RSS import script (requires internet)

### Content Management
- **Articles**: Stored in `content/articles/` as MDX files with frontmatter
- **Building Blocks**: Defined in app routing structure under `/blocks/[slug]/`
- **Patterns**: Defined in app routing structure under `/patterns/[slug]/`
- **Static Content**: Images, favicons in `public/`

### Architecture Diagrams
- Main building blocks diagram on homepage is SVG-based with interactive magnification
- Individual pattern diagrams are component-based visualizations
- Diagrams support responsive design and accessibility

### Common Development Patterns
- **Always check TypeScript errors**: `npm run type-check`
- **Test responsive design**: The building blocks diagram adapts to different screen sizes
- **Verify MDX rendering**: Content uses rehype-highlight for code syntax highlighting
- **Check image optimization**: Next.js automatically optimizes images in `/public`

### Performance Notes
- **Static generation**: Most pages are statically generated at build time
- **Build timeout**: Set to 120 seconds in `next.config.mjs` for content-heavy pages
- **Image optimization**: Automatic via Next.js built-in optimization
- **Font loading**: Google Fonts with fallbacks to system fonts

### Dependencies and Technology Stack
- **Framework**: Next.js 14 with App Router and React Server Components
- **Language**: TypeScript with strict mode enabled
- **Content**: MDX with rehype plugins for code highlighting and slugs
- **Styling**: CSS variables with utility classes, no external CSS framework
- **Analytics**: Vercel Analytics integrated
- **Data Visualization**: Custom D3.js components for diagrams

### Troubleshooting
- **Build failures**: Usually font loading or TypeScript errors
- **Dev server issues**: Check port 3000 availability
- **Type errors**: Run `npm run type-check` for detailed error reporting
- **Content not loading**: Verify MDX files have proper frontmatter
- **Missing images**: Check `/public` directory and import paths

### Testing User Scenarios
When making changes, always validate these key user journeys:
1. **Homepage exploration**: View building blocks diagram, test magnification, explore connections
2. **Pattern discovery**: Navigate to `/patterns`, browse different architectural patterns  
3. **Block details**: Visit `/blocks` and drill into individual building blocks
4. **Content reading**: Test article loading and formatting at `/articles`
5. **Cross-navigation**: Verify header navigation works between all sections

## Critical Notes
- **NEVER CANCEL builds or long-running commands** - builds may take up to 25 seconds
- **Always test both development and production modes** - some features behave differently
- **Font loading requires internet access** - have workaround ready for offline environments
- **Content is static** - no runtime CMS, content changes require rebuild and deploy
- **Mobile responsive** - test on different screen sizes, especially the main diagram

This codebase prioritizes simplicity, performance, and educational value. The architecture visualization is the centerpiece - always ensure it remains functional and accessible after changes.