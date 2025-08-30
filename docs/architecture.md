# Architecture Notes

This site uses Next.js 14 App Router with React Server Components and TypeScript.

## Key decisions

- App Router: simple file-based routing, server-first by default
- Minimal styling: CSS variables + small utility classes in `app/globals.css`
- Components kept framework-agnostic and accessible by default
- No runtime data layer yet; content is static to start

## Anticipated evolution

- Content sourcing via local MD/MDX files in a `content/` folder
- Static rendering (SSG) for most pages
- On-demand revalidation for content updates
- Search either client-side (static index) or server-side (light service)
- OG image generation route via `/app/api/og/route.ts`

