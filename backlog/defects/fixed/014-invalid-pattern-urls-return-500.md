# Defect #014: Invalid Pattern URLs Return 500 Instead of 404

**Severity:** Medium 🟡  
**Type:** Error Handling / HTTP Status Code Issue  
**Status:** Fixed  
**Affected Files:**
- `app/patterns/[slug]/page.tsx`
- `lib/patterns.ts`

## Summary
When users navigate to a non-existent pattern URL (e.g., `/patterns/nonexistent-pattern`), the server returns HTTP 500 (Internal Server Error) instead of the proper HTTP 404 (Not Found) status code.

## Impact
- **Incorrect HTTP semantics**: 500 errors indicate server problems, not missing resources
- **SEO impact**: Search engines may interpret 500s as temporary issues and keep retrying
- **User confusion**: Generic error pages instead of friendly "Pattern not found" message
- **Monitoring noise**: 500 errors trigger alerts and inflate error metrics
- **Developer confusion**: 500s suggest code bugs when it's just missing content

## Current Behavior
```bash
$ curl -I http://localhost:3003/patterns/nonexistent-pattern
HTTP/1.1 500 Internal Server Error
```

**Expected:**
```bash
$ curl -I http://localhost:3003/patterns/nonexistent-pattern
HTTP/1.1 404 Not Found
```

## Technical Details

### Current Implementation
```tsx
// app/patterns/[slug]/page.tsx - Line 13
export default function PatternDetailPage({ params }: { params: { slug: string } }) {
  const pattern = getPatternBySlug(params.slug)

  if (!pattern) {
    notFound()  // This SHOULD return 404 but returns 500
  }

  const contentHtml = marked(pattern.content)
  // ... rest of component
}
```

```typescript
// lib/patterns.ts - Line 55
export function getPatternBySlug(slug: string): Pattern | null {
  try {
    const fullPath = path.join(patternsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    // ... parse and return pattern
  } catch (error) {
    return null  // Returns null on file not found
  }
}
```

### The Problem
The code correctly:
1. ✅ Returns `null` when pattern file doesn't exist
2. ✅ Calls `notFound()` when pattern is null

But Next.js is returning 500 instead of 404. This suggests:
- Error boundary is catching an unhandled exception
- `notFound()` might be throwing incorrectly
- Missing `not-found.tsx` file in the route segment

## Root Cause Analysis

### Likely Cause #1: Missing not-found.tsx
Next.js App Router requires a `not-found.tsx` file to properly handle 404s:

```bash
app/patterns/[slug]/
  ├── page.tsx        ✅ Exists
  └── not-found.tsx   ❌ Missing
```

Without this file, Next.js might fall back to error handling, causing 500.

### Likely Cause #2: notFound() Import Issue
Check if `notFound` is properly imported from Next.js:

```tsx
import { notFound } from 'next/navigation'  // ✅ Correct
```

## Resolution Options

### Option 1: Add not-found.tsx File (Recommended)
**Effort:** 10 minutes  
**Risk:** Low

Create a custom 404 page for the patterns route:

```tsx
// app/patterns/[slug]/not-found.tsx
export default function PatternNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="text-center px-4">
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="text-4xl font-bold mb-4 text-slate-900">
          Pattern Not Found
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-md mx-auto">
          The pattern you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/patterns"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 font-semibold shadow-lg"
          >
            Browse All Patterns
          </a>
          <a
            href="/"
            className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg hover:border-blue-500 hover:text-blue-700 font-semibold"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
```

### Option 2: Add Global not-found.tsx
**Effort:** 15 minutes  
**Risk:** Low

Create a root-level 404 handler:

```tsx
// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl text-slate-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <a href="/" className="text-blue-600 hover:underline">
          Return to homepage
        </a>
      </div>
    </div>
  )
}
```

### Option 3: Improve Error Handling
**Effort:** 20 minutes  
**Risk:** Low

Add explicit error boundary and better logging:

```tsx
// app/patterns/[slug]/page.tsx
import { notFound } from 'next/navigation'

export default function PatternDetailPage({ params }: { params: { slug: string } }) {
  let pattern
  
  try {
    pattern = getPatternBySlug(params.slug)
  } catch (error) {
    console.error('Error loading pattern:', params.slug, error)
    throw error  // Let error boundary handle it
  }

  if (!pattern) {
    console.log('Pattern not found:', params.slug)
    notFound()
  }

  // ... rest of component
}
```

## Recommended Fix
**Implement all three options** for comprehensive error handling:

1. **Add route-specific not-found.tsx** (Option 1) - Best UX
2. **Add global not-found.tsx** (Option 2) - Fallback
3. **Improve logging** (Option 3) - Better debugging

Priority order: Option 1 → Option 2 → Option 3

## Implementation Steps
1. Create `app/patterns/[slug]/not-found.tsx` with custom 404 UI
2. Create `app/not-found.tsx` as global fallback
3. Test with various invalid pattern slugs
4. Verify HTTP status code is 404
5. Test that valid patterns still work (no regressions)

## Testing Steps

### Test Invalid Patterns
```bash
# Should return 404 Not Found
curl -I http://localhost:3003/patterns/nonexistent
curl -I http://localhost:3003/patterns/fake-pattern
curl -I http://localhost:3003/patterns/12345
curl -I http://localhost:3003/patterns/../../etc/passwd  # Path traversal test
```

### Test Valid Patterns
```bash
# Should return 200 OK
curl -I http://localhost:3003/patterns/cqrs
curl -I http://localhost:3003/patterns/event-driven-architecture
curl -I http://localhost:3003/patterns/canonical-data-model
```

### Test UI
1. Navigate to `/patterns/nonexistent-pattern`
2. Should see custom 404 page, not generic error
3. Click "Browse All Patterns" - should navigate to `/patterns`
4. Click "Back to Home" - should navigate to `/`

## Why This Matters

### HTTP Semantics
- **404**: Resource doesn't exist (client's fault) - "You asked for something that isn't here"
- **500**: Server error (server's fault) - "Something broke on our end"

Using 500 for missing content is semantically incorrect.

### SEO Impact
Search engines treat 500s and 404s differently:
- **500**: Temporary error, will retry later, keeps URL in index
- **404**: Permanent, removes from index, stops crawling

### Monitoring
DevOps teams monitor 500 errors as critical issues:
- False positives waste time
- Real 500s get lost in noise
- Alert fatigue for on-call engineers

### User Experience
Generic 500 error pages:
- Feel broken/unprofessional
- Don't guide users to correct content
- Create frustration

Custom 404 pages:
- Explain what happened
- Offer helpful alternatives
- Maintain brand experience

## Related Issues
- Defect #005: Missing content routes (similar 404 handling needed)

## Examples of Good 404 Pages

### GitHub
- Clear message: "There isn't a GitHub Page here"
- Search box to find what you're looking for
- Links to popular repositories

### MDN Web Docs
- "Page not found" with helpful illustration
- Search bar
- Links to documentation home

### Stripe Docs
- "We couldn't find that page"
- Recent pages you visited
- Search functionality

## Timeline
- **Discovered:** 2026-02-14
- **Priority:** Medium - Should fix for production
- **Estimated Fix Time:** 30 minutes (all options)
- **Testing Time:** 10 minutes

## Prevention
- Add integration tests for 404 scenarios
- Include 404 handling in component templates
- Document 404 handling in development guidelines
- Test edge cases during code review

## Additional Notes
This issue might affect other dynamic routes as well. After fixing patterns, audit:
- `/playgrounds/[id]` (if implemented)
- Any other `[slug]` or `[id]` routes
