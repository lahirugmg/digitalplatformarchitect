# Defect #008: Pattern Composer Dev/Prod Inconsistency

**Severity:** Medium 🟡  
**Status:** Fixed  
**Found:** 2026-02-14  
**Category:** Build/Runtime Inconsistency

## Description
The Pattern Composer playground (`/playgrounds/pattern-composer/`) works correctly in development mode (returns 200 and renders UI) but fails during production build. This creates a dangerous dev/prod inconsistency where developers think the feature works but users cannot access it in production.

## Development Behavior
```bash
$ curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/playgrounds/pattern-composer
200
```

The page renders successfully with:
- Pattern selection UI
- Canvas area with instructions
- Validation panel
- Filter buttons and search
- Export/Clear buttons (disabled)

## Production Behavior
```bash
$ npm run build
Failed to compile.

./app/playgrounds/pattern-composer/page.tsx
Module not found: Can't resolve './components/PatternLibrary'
Module not found: Can't resolve './components/CompositionCanvas'
Module not found: Can't resolve './components/ValidationPanel'
Module not found: Can't resolve './components/ExportModal'
```

## Root Cause
The [page.tsx](app/playgrounds/pattern-composer/page.tsx) file imports components that don't exist:
```tsx
import PatternLibrary from './components/PatternLibrary'
import CompositionCanvas from './components/CompositionCanvas'
import ValidationPanel from './components/ValidationPanel'
import ExportModal from './components/ExportModal'
```

However, the page appears to render a complete UI in dev mode, suggesting either:
1. The page has fallback/inline rendering that Next.js dev server accepts
2. Hot module replacement (HMR) is tolerating the missing imports
3. The page was refactored to inline the components but imports weren't removed

## Impact
- **High Risk:** Dev/prod parity broken - "works on my machine" syndrome
- **Blocks Deployment:** Cannot build for production
- **Misleading Testing:** Developers/QA might test in dev and think it works
- **Wasted Effort:** If someone tries to use this feature locally, it appears functional

## Location
- **File:** [app/playgrounds/pattern-composer/page.tsx](app/playgrounds/pattern-composer/page.tsx)
- **Missing:** [app/playgrounds/pattern-composer/components/](app/playgrounds/pattern-composer/components/) (empty folder)

## Evidence from Visual Inspection
The dev server returns a fully-rendered page with:
```html
<div class="h-screen flex flex-col bg-slate-50">
  <div class="bg-gradient-to-r from-purple-600 to-indigo-600">
    <h1>🎨 Pattern Composer</h1>
    <!-- Pattern library sidebar -->
    <!-- Canvas area with instructions -->
    <!-- Validation panel -->
  </div>
</div>
```

This suggests the component JSX is actually inlined in the page file, making the imports unnecessary.

## Relationship to Other Defects
- Related to [Defect #001](001-build-failure-pattern-composer.md) - Same root cause
- Related to [Defect #007](007-incomplete-playground-listing.md) - Not listed on playgrounds page

## Resolution
**Option 1: Remove Dead Imports** (Quick Fix)
If the components are already inlined, simply remove the import statements:
```tsx
// Remove these lines:
// import PatternLibrary from './components/PatternLibrary'
// import CompositionCanvas from './components/CompositionCanvas'  
// import ValidationPanel from './components/ValidationPanel'
// import ExportModal from './components/ExportModal'
```

**Option 2: Extract Components** (Proper Fix)
Create the actual component files by extracting the inline JSX into separate files in the components folder.

**Option 3: Remove Feature** (If Incomplete)
Delete the entire pattern-composer directory if this is abandoned work.

## Testing Required
After any fix:
1. Verify `npm run build` succeeds
2. Test page in production build (`npm run start`)
3. Confirm functionality matches dev mode
4. Add to automated build tests to prevent regression

## Recommendation
Choose **Option 1** (remove dead imports) as immediate fix to unblock builds, then evaluate if the feature should be completed (Option 2) or removed (Option 3) based on product roadmap.
