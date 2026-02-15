# Defect #006: Navigation Accessibility Issues

**Severity:** Low 🟢  
**Status:** Fixed  
**Found:** 2026-02-14  
**Category:** Accessibility (a11y)

## Description
Navigation links in [app/layout.tsx](app/layout.tsx) are using plain `<a>` tags instead of Next.js `<Link>` components and lack proper accessibility attributes like `aria-label` and `aria-current`.

## Issues Found

### 1. Using `<a>` Tags Instead of Next.js Link
[app/layout.tsx](app/layout.tsx) lines 21-33 use `<a href>` for client-side navigation:
```tsx
<a href="/" className="text-xl font-bold text-blue-600">
  Digital Platform Architect
</a>
<a href="/playgrounds" className="text-slate-700 hover:text-blue-600 font-medium">
  Playgrounds
</a>
<a href="/patterns" className="text-slate-700 hover:text-blue-600 font-medium">
  Patterns
</a>
<a href="/skill-tree" className="text-slate-700 hover:text-blue-600 font-medium">
  Skill Tree
</a>
```

**Problem:** This causes full page reloads instead of client-side navigation, losing Next.js performance benefits.

### 2. Missing ARIA Labels
Navigation links lack descriptive `aria-label` attributes, which help screen reader users understand link purposes.

### 3. No Active Route Indication
No `aria-current="page"` attribute on the active link to indicate the current page to assistive technologies.

### 4. No Skip to Content Link
Missing "skip to main content" link for keyboard navigation users to bypass the navigation.

## Impact
- Accessibility: Screen reader users get less context about navigation
- Performance: Full page reloads instead of client-side navigation
- UX: No visual/semantic indication of current page
- WCAG Compliance: Fails WCAG 2.1 Level AA criteria for navigation

## Location
- **File:** [app/layout.tsx](app/layout.tsx)
- **Lines:** 17-38 (navigation section)

## Reproduction
1. Navigate website using screen reader (VoiceOver, NVDA, etc.)
2. Notice lack of descriptive labels for navigation links
3. Click navigation link - observe full page reload instead of instant transition
4. No indication of which page you're currently on

## Resolution

### Fix 1: Use Next.js Link Component
```tsx
import Link from 'next/link'

<Link href="/" className="text-xl font-bold text-blue-600">
  Digital Platform Architect
</Link>
<Link href="/playgrounds" className="text-slate-700 hover:text-blue-600 font-medium">
  Playgrounds
</Link>
```

### Fix 2: Add ARIA Labels
```tsx
<Link 
  href="/playgrounds" 
  className="text-slate-700 hover:text-blue-600 font-medium"
  aria-label="Navigate to interactive playgrounds"
>
  Playgrounds
</Link>
```

### Fix 3: Add Active State with aria-current
```tsx
'use client'
import { usePathname } from 'next/navigation'

const pathname = usePathname()

<Link 
  href="/playgrounds"
  aria-current={pathname === '/playgrounds' ? 'page' : undefined}
  className={pathname === '/playgrounds' ? 'active-class' : 'normal-class'}
>
  Playgrounds
</Link>
```

### Fix 4: Add Skip to Content Link
```tsx
<body>
  <a href="#main-content" className="skip-to-content">
    Skip to main content
  </a>
  <nav>...</nav>
  <main id="main-content">{children}</main>
</body>
```

With CSS:
```css
.skip-to-content {
  position: absolute;
  left: -9999px;
}
.skip-to-content:focus {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}
```

## Additional Recommendations
- Add keyboard navigation testing to QA process
- Run automated accessibility tests (axe, Lighthouse)
- Test with actual screen readers
- Add focus visible styles for keyboard navigation
- Consider implementing a mobile navigation menu with proper ARIA attributes

## WCAG Criteria Affected
- 2.4.1 Bypass Blocks (Level A) - Missing skip link
- 2.4.7 Focus Visible (Level AA) - Needs verification
- 4.1.2 Name, Role, Value (Level A) - Missing aria-current
