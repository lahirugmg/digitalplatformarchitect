# Defect #013: Pattern Previews Show Raw Markdown in Listing Page

**Severity:** Medium 🟡  
**Type:** User Experience / Content Display Issue  
**Status:** Fixed  
**Affected Files:**
- `app/patterns/page.tsx` (line 67)
- `app/patterns/[slug]/page.tsx` (line 184)

## Summary
The pattern listing page displays raw Markdown syntax in pattern preview cards instead of rendering clean, readable text. Pattern previews show headings (##, ###), newlines, and other Markdown formatting characters.

## Impact
- **Poor UX**: Users see technical markup instead of clean descriptions
- **Unprofessional appearance**: Platform looks unfinished or broken
- **Reduced readability**: Hard to understand what each pattern is about
- **First impressions**: Affects user perception on the main patterns page

## Current Behavior
Pattern preview cards on `/patterns` show:
```
## What it is

Commands mutate write models; queries read denormalized projections...
```

Instead of clean text like:
```
Commands mutate write models; queries read denormalized projections...
```

## Example From Code
```tsx
// app/patterns/page.tsx - Line 67
<div className="text-sm text-slate-600 mb-3">
  {pattern.content.substring(0, 150)}...
</div>
```

The issue: `pattern.content` contains raw Markdown with:
- Heading markers: ##, ###
- Newline characters: \n
- Emphasis markers: **, *
- List markers: -, *
- Code block markers: ```

## Visual Evidence
**Current behavior** (bad):
```
## Summary
Separate write and read models to optimize for different workloads...

## What it is
Commands mutate write models...
```

**Expected behavior** (good):
```
Separate write and read models to optimize for different workloads. Commands mutate write models...
```

## Root Cause
1. The code uses `.substring(0, 150)` directly on the raw Markdown content
2. No text cleaning or Markdown stripping is applied
3. Markdown parser (`marked`) is only used in detail pages, not listing page

## Resolution Options

### Option 1: Strip Markdown and Extract Plain Text (Recommended)
**Effort:** 30 minutes  
**Risk:** Low

Create a utility function to extract clean text from Markdown:

```typescript
// lib/markdown-utils.ts
export function stripMarkdown(markdown: string, maxLength: number = 150): string {
  // Remove YAML frontmatter
  let text = markdown.replace(/^---[\s\S]*?---\n/, '')
  
  // Remove headings
  text = text.replace(/#{1,6}\s+/g, '')
  
  // Remove bold/italic
  text = text.replace(/\*\*(.+?)\*\*/g, '$1')
  text = text.replace(/\*(.+?)\*/g, '$1')
  text = text.replace(/__(.+?)__/g, '$1')
  text = text.replace(/_(.+?)_/g, '$1')
  
  // Remove code blocks
  text = text.replace(/```[\s\S]*?```/g, '')
  text = text.replace(/`(.+?)`/g, '$1')
  
  // Remove links but keep text
  text = text.replace(/\[(.+?)\]\(.+?\)/g, '$1')
  
  // Remove list markers
  text = text.replace(/^[\s]*[-*+]\s+/gm, '')
  text = text.replace(/^\d+\.\s+/gm, '')
  
  // Clean up whitespace
  text = text.replace(/\n+/g, ' ')
  text = text.replace(/\s+/g, ' ')
  text = text.trim()
  
  // Truncate to max length
  if (text.length > maxLength) {
    text = text.substring(0, maxLength).trim()
    // Don't cut in the middle of a word
    const lastSpace = text.lastIndexOf(' ')
    if (lastSpace > maxLength * 0.8) {
      text = text.substring(0, lastSpace)
    }
  }
  
  return text
}
```

Then update the pattern page:

```tsx
// app/patterns/page.tsx
import { stripMarkdown } from '@/lib/markdown-utils'

// In the component:
<div className="text-sm text-slate-600 mb-3">
  {stripMarkdown(pattern.content, 150)}...
</div>
```

### Option 2: Use Dedicated Markdown Stripping Library
**Effort:** 15 minutes  
**Risk:** Low

Install and use `remove-markdown` package:

```bash
npm install remove-markdown
npm install --save-dev @types/remove-markdown
```

```tsx
import removeMd from 'remove-markdown'

<div className="text-sm text-slate-600 mb-3">
  {removeMd(pattern.content).substring(0, 150)}...
</div>
```

### Option 3: Add Description Field to Frontmatter
**Effort:** 2-3 hours (requires updating all 65 pattern files)  
**Risk:** Medium

Add a `description` field to each pattern's frontmatter:

```markdown
---
title: CQRS
description: Separate write and read models to optimize for different workloads, enabling independent scaling and performance tuning.
---
```

Then use: `{pattern.description}` instead of `{pattern.content.substring(0, 150)}`

**Pros**: Most control over displayed text  
**Cons**: Manual work to update 65 files, ongoing maintenance

## Recommended Fix
**Option 1** (Create stripMarkdown utility) is recommended because:
- ✅ Works with existing content structure
- ✅ No changes needed to 65 pattern files
- ✅ Reusable across the codebase
- ✅ Maintainable and testable
- ✅ No external dependencies

## Implementation Steps
1. Create `lib/markdown-utils.ts` with `stripMarkdown` function
2. Add unit tests for the function
3. Update `app/patterns/page.tsx` to use `stripMarkdown`
4. Update `app/patterns/[slug]/page.tsx` for related patterns section (line 184)
5. Test on patterns listing page - verify all previews show clean text
6. Check patterns with code blocks, lists, links to ensure proper stripping

## Testing Steps
After implementing the fix:

1. **Visual inspection**: Visit `/patterns` and verify all pattern cards show clean text
2. **Edge cases**: Check patterns with:
   - Code blocks (```): Should be removed
   - Lists (-, *, 1.): Should be converted to plain sentences
   - Links: Should show link text without URL
   - Bold/italic: Should show plain text
3. **Length**: Verify truncation works correctly and doesn't cut mid-word
4. **Various categories**: Test patterns from each category

## Example Test Cases
```typescript
// tests for stripMarkdown function
import { stripMarkdown } from '@/lib/markdown-utils'

describe('stripMarkdown', () => {
  it('removes headings', () => {
    expect(stripMarkdown('## Heading\nContent')).toBe('Heading Content')
  })
  
  it('removes bold/italic', () => {
    expect(stripMarkdown('**bold** and *italic*')).toBe('bold and italic')
  })
  
  it('removes code blocks', () => {
    expect(stripMarkdown('Text ```code``` more')).toBe('Text  more')
  })
  
  it('truncates at word boundary', () => {
    const text = 'The quick brown fox jumps over the lazy dog'
    const result = stripMarkdown(text, 20)
    expect(result).not.toMatch(/\s$/) // No trailing space
    expect(result.split(' ').every(w => w.length > 0)).toBe(true)
  })
})
```

## Why This Matters
- The patterns page is a primary entry point for users
- First impressions matter - seeing raw Markdown looks broken
- Users make quick decisions based on preview text
- Professional content presentation builds trust

## Related Issues
- None documented

## Additional Affected Areas
Similar issues may exist in:
- Skill tree descriptions (if any use Markdown)
- Playground descriptions
- Any other content preview areas

## Timeline
- **Discovered:** 2026-02-14
- **Priority:** Medium - Affects UX but doesn't break functionality
- **Estimated Fix Time:** 30-45 minutes
- **Testing Time:** 15 minutes

## Prevention
- Add preview description linting to check for Markdown syntax
- Consider adding `description` field to content schema
- Document content authoring guidelines
