# Defect #007: Incomplete Playground Listing

**Severity:** Low 🟢  
**Status:** Fixed  
**Found:** 2026-02-14  
**Category:** Content/UI Inconsistency

## Description
The Pattern Composer playground exists as a route at `/playgrounds/pattern-composer/` but is not listed on the main playgrounds page at `/playgrounds`. This creates inconsistency and makes the playground undiscoverable.

## Current State

### Existing Playground Routes
```
app/playgrounds/
├── data-pipeline/page.tsx         ✅ Listed
├── message-flow/page.tsx          ✅ Listed
├── enterprise-integration/page.tsx ✅ Listed
└── pattern-composer/page.tsx      ❌ Not listed (hidden)
```

### Playgrounds Page Listing
[app/playgrounds/page.tsx](app/playgrounds/page.tsx) only shows 3 playgrounds:
```tsx
const playgrounds = [
  {
    id: 'data-pipeline',
    title: 'Data Pipeline Choreography',
    // ... listed
  },
  {
    id: 'message-flow',
    title: 'Message Flow Animation',
    // ... listed
  },
  {
    id: 'enterprise-integration',
    title: 'Enterprise Integration',
    // ... listed
  },
  // pattern-composer is missing from this list
]
```

## Impact
- Users can't discover the Pattern Composer playground from the UI
- Only accessible if you know the direct URL: `/playgrounds/pattern-composer`
- Inconsistent user experience - why is one playground hidden?
- Suggests incomplete or abandoned feature

## Related Issues
- See [Defect #001](001-build-failure-pattern-composer.md): Pattern Composer also has missing components causing build failure
- This playground appears to be incomplete/work-in-progress

## Location
- **Missing from:** [app/playgrounds/page.tsx](app/playgrounds/page.tsx)
- **Exists at:** [app/playgrounds/pattern-composer/page.tsx](app/playgrounds/pattern-composer/page.tsx)

## Reproduction
1. Visit `/playgrounds` page
2. See only 3 playgrounds listed
3. Manually navigate to `/playgrounds/pattern-composer`
4. Playground route exists but is not in the listing

## Resolution Options

### Option 1: Add to Listing (if functional)
Add Pattern Composer to the playgrounds array in [app/playgrounds/page.tsx](app/playgrounds/page.tsx):
```tsx
const playgrounds = [
  // ... existing playgrounds
  {
    id: 'pattern-composer',
    title: 'Pattern Composer',
    icon: '🧩',
    description: 'Compose and validate combinations of architectural patterns. Learn which patterns work together.',
    difficulty: 'Advanced',
    duration: '30-40 min',
    tags: ['Patterns', 'Architecture', 'Composition'],
    href: '/playgrounds/pattern-composer'
  },
]
```

### Option 2: Remove Incomplete Playground (recommended)
Since Pattern Composer has missing components (see Defect #001), remove the entire directory:
```bash
rm -rf app/playgrounds/pattern-composer/
```

### Option 3: Mark as Coming Soon
Add it to the listing with a "Coming Soon" badge:
```tsx
{
  id: 'pattern-composer',
  title: 'Pattern Composer',
  icon: '🧩',
  description: 'Compose architectural patterns (Coming Soon)',
  difficulty: 'Advanced',
  duration: '30-40 min',
  tags: ['Patterns', 'Architecture', 'Composition'],
  href: '#',  // Disabled
  comingSoon: true
}
```

## Recommendation
Choose **Option 2** - Remove the incomplete playground entirely until it's ready, especially since it breaks the build (Defect #001). If there's intent to complete it later, track it as a feature request separately.
