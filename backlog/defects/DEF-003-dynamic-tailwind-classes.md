# DEF-003: Dynamic Tailwind class construction may not work

**Status:** Open
**Severity:** High
**Area:** Skill Tree Page - Branch Filter
**Created:** 2026-02-14

## Description

Dynamic Tailwind classes are constructed using template literals (`bg-${branch.color}-600`) which won't work with Tailwind's JIT compiler as classes need to be statically analyzable.

## Location

File: `app/skill-tree/page.tsx`
Line: ~78

```typescript
className={`px-4 py-2 rounded-lg font-medium transition ${
  selectedBranch === branch.id
    ? `bg-${branch.color}-600 text-white`  // ❌ Won't work
    : 'bg-white text-slate-700 hover:bg-slate-100'
}`}
```

## Steps to Reproduce

1. Navigate to `/skill-tree`
2. Click on any branch filter button (Frontend, Backend, DevOps, etc.)
3. Inspect the element in browser DevTools

## Expected Behavior

Button should have colored background matching the branch color

## Actual Behavior

Button likely has no background color as the dynamic class is not included in the Tailwind build

## Impact

- Visual bug - branch selection buttons won't show proper colors
- Reduced usability - users can't see which branch is selected
- Breaks the skill tree filtering UX

## Root Cause

Tailwind's JIT compiler scans files for class names at build time. Dynamic string interpolation prevents the compiler from detecting these classes, so they're not included in the final CSS bundle.

## Proposed Solution

### Option 1: Use safelist in tailwind.config.js (Simple)

```javascript
// tailwind.config.js
module.exports = {
  safelist: [
    'bg-blue-600',
    'bg-green-600',
    'bg-purple-600',
    'bg-orange-600',
    'bg-red-600',
    'bg-yellow-600',
  ],
  // ...
}
```

### Option 2: Use object mapping (Better)

```typescript
const colorMap: Record<string, string> = {
  blue: 'bg-blue-600 text-white',
  green: 'bg-green-600 text-white',
  purple: 'bg-purple-600 text-white',
  orange: 'bg-orange-600 text-white',
  red: 'bg-red-600 text-white',
  yellow: 'bg-yellow-600 text-white',
};

className={`px-4 py-2 rounded-lg font-medium transition ${
  selectedBranch === branch.id
    ? colorMap[branch.color] || 'bg-slate-600 text-white'
    : 'bg-white text-slate-700 hover:bg-slate-100'
}`}
```

### Option 3: Use inline styles (Quick fix)

```typescript
style={{
  backgroundColor: selectedBranch === branch.id ? `var(--${branch.color}-600)` : undefined
}}
```

## Priority

High - This is a visible bug that affects core functionality

## Testing Required

After fix, verify all branch colors appear correctly when selected
