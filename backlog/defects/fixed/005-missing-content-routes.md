# Defect #005: Missing Content Routes (Blocks, Articles, About, Solution)

**Severity:** Medium 🟡  
**Status:** Fixed  
**Found:** 2026-02-14  
**Category:** Missing Features

## Description
The project instructions mention testing navigation to multiple routes that don't exist in the application. Content files exist for some of these sections, but the corresponding app routes are missing.

## Expected Routes (from instructions)
From [.github/copilot-instructions.md](.github/copilot-instructions.md) line 121:
> "Test navigation between all major sections: `/`, `/blocks`, `/patterns`, `/solution`, `/articles`, `/about`"

## Current State

### Existing Routes ✅
- `/` - Homepage (exists)
- `/patterns` - Architecture patterns (exists)
- `/playgrounds` - Interactive playgrounds (exists)
- `/skill-tree` - Skill tree page (exists)

### Missing Routes ❌
1. **`/blocks`** - Platform building blocks
2. **`/articles`** - Article pages  
3. **`/about`** - About page
4. **`/solution`** - Solution page

## Available Content Without Routes

### Building Blocks Content
The [content-export/blocks/](content-export/blocks/) directory contains 9 markdown files:
- `messaging-streaming-platform.md`
- `enterprise-integration.md`
- `api-management.md`
- `identity-access-management.md`
- `internal-developer-platform.md`
- `data-platform.md`
- `observability-operations.md`
- `ai-ml-intelligent-services.md`
- `application-services.md`

**Status:** Content exists but no `/blocks` or `/blocks/[slug]` route

### Articles Content
The [content-export/articles/](content-export/articles/) directory contains article markdown:
- `how-ai-is-transforming-digital-platform-architecture.md`

**Status:** Content exists but no `/articles` or `/articles/[slug]` route

### About/Solution Pages
The [content-export/pages/](content-export/pages/) directory contains:
- `about.md`
- `story.md`
- `home.md`

**Status:** Content exists but no `/about` or `/solution` route

## Impact
- Dead content - markdown files that can't be accessed by users
- Instructions reference routes that don't exist, causing confusion
- Incomplete website - missing expected sections
- Potential SEO impact from missing content pages

## Location
**Missing route directories:**
- `app/blocks/` (should exist)
- `app/blocks/[slug]/page.tsx` (should exist)
- `app/articles/` (should exist)
- `app/articles/[slug]/page.tsx` (should exist)
- `app/about/page.tsx` (should exist)
- `app/solution/page.tsx` or similar (should exist)

## Reproduction
1. Try navigating to `/blocks` - 404 Not Found
2. Try navigating to `/articles` - 404 Not Found
3. Try navigating to `/about` - 404 Not Found
4. Check [content-export/](content-export/) - markdown files exist
5. Check [app/](app/) - no corresponding routes

## Resolution
Create the missing routes following the existing pattern structure:

### 1. Blocks Route
```
app/blocks/page.tsx          # List all blocks
app/blocks/[slug]/page.tsx   # Individual block detail
lib/blocks.ts                # Helper functions for blocks
```

### 2. Articles Route
```
app/articles/page.tsx        # List all articles
app/articles/[slug]/page.tsx # Individual article detail
lib/articles.ts              # Helper functions for articles
```

### 3. About/Solution Routes
```
app/about/page.tsx           # About page
app/solution/page.tsx        # Solution page (or rename based on actual purpose)
```

Follow the same pattern used in [app/patterns/](app/patterns/) for consistency.

## Recommendation
1. Implement `/blocks` and `/blocks/[slug]` routes to expose building blocks content
2. Implement `/articles` and `/articles/[slug]` routes for articles
3. Create `/about` page using content from [content-export/pages/about.md](content-export/pages/about.md)
4. Clarify purpose of "solution" route or remove from instructions
5. Update navigation in [app/layout.tsx](app/layout.tsx) to include these new sections
6. Update instructions to match actual implemented routes
