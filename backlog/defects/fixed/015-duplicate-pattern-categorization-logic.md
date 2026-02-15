# Defect #015: Duplicate Pattern Categorization Logic

**Severity:** Low 🟢  
**Type:** Code Quality / Technical Debt  
**Status:** Fixed  
**Affected Files:**
- `lib/patterns.ts` (lines 28-42 and 62-76)

## Summary
The pattern categorization logic is duplicated in two functions (`getAllPatterns()` and `getPatternBySlug()`), leading to potential inconsistencies, maintenance overhead, and code smell.

## Impact
- **Maintenance burden**: Changes must be made in two places
- **Inconsistency risk**: Categories could differ between listing and detail pages
- **Code duplication**: Violates DRY (Don't Repeat Yourself) principle
- **Bug potential**: Easy to update one function but forget the other
- **Testing overhead**: Must test categorization in multiple places

## Current Implementation

### Function 1: getAllPatterns()
```typescript
// lib/patterns.ts - Lines 28-42
export function getAllPatterns(): Pattern[] {
  // ... file reading code ...
  
  // Categorize patterns
  let category = 'General'
  const title = (data.title || slug).toLowerCase()

  if (title.includes('event') || title.includes('cqrs') || title.includes('saga')) {
    category = 'Event-Driven'
  } else if (title.includes('security') || title.includes('oauth') || title.includes('zero-trust')) {
    category = 'Security'
  } else if (title.includes('data') || title.includes('mesh')) {
    category = 'Data Architecture'
  } else if (title.includes('microservice') || title.includes('service')) {
    category = 'Distributed Systems'
  } else if (title.includes('layered') || title.includes('hexagonal') || title.includes('clean') || title.includes('onion')) {
    category = 'Structural'
  }
  
  // ... return pattern
}
```

### Function 2: getPatternBySlug()
```typescript
// lib/patterns.ts - Lines 62-76
export function getPatternBySlug(slug: string): Pattern | null {
  try {
    // ... file reading code ...
    
    let category = 'General'
    const title = (data.title || slug).toLowerCase()

    if (title.includes('event') || title.includes('cqrs')) {
      category = 'Event-Driven'
    } else if (title.includes('security') || title.includes('oauth')) {
      category = 'Security'
    } else if (title.includes('data') || title.includes('mesh')) {
      category = 'Data Architecture'
    } else if (title.includes('microservice') || title.includes('service')) {
      category = 'Distributed Systems'
    } else if (title.includes('layered') || title.includes('hexagonal') || title.includes('clean')) {
      category = 'Structural'
    }
    
    // ... return pattern
  } catch (error) {
    return null
  }
}
```

## Problems Identified

### 1. Different Logic in Each Function
Notice the differences:

**getAllPatterns()** includes:
- `'saga'` for Event-Driven
- `'zero-trust'` for Security
- `'onion'` for Structural

**getPatternBySlug()** is missing these keywords.

This means:
- A pattern with "saga" in the title would be "Event-Driven" in listing but "General" in detail view
- A pattern with "zero-trust" would be "Security" in listing but "General" in detail view
- A pattern with "onion" would be "Structural" in listing but "General" in detail view

### 2. Maintenance Overhead
To add a new category or keyword, you must:
1. Find both functions
2. Update categorization logic in both places
3. Ensure logic matches exactly
4. Test both listing and detail pages

One mistake = inconsistent UI.

### 3. Testing Complexity
Must test:
- Categories in listing page (`/patterns`)
- Categories in detail page (`/patterns/[slug]`)
- Categories in related patterns section
- Ensure all three match

## Real-World Scenario

Imagine adding a new "Integration" category:

**Developer updates getAllPatterns():**
```typescript
} else if (title.includes('integration') || title.includes('adapter') || title.includes('gateway')) {
  category = 'Integration'
}
```

**But forgets getPatternBySlug():**
- Result: Pattern shows "Integration" on listing page
- But shows "General" on detail page
- User confusion: "Why did the category change?"

## Resolution Options

### Option 1: Extract Categorization Logic (Recommended)
**Effort:** 20 minutes  
**Risk:** Low

Create a shared categorization function:

```typescript
// lib/patterns.ts

/**
 * Categorizes a pattern based on its title
 */
function categorizePattern(title: string): string {
  const titleLower = title.toLowerCase()

  if (
    titleLower.includes('event') ||
    titleLower.includes('cqrs') ||
    titleLower.includes('saga')
  ) {
    return 'Event-Driven'
  }

  if (
    titleLower.includes('security') ||
    titleLower.includes('oauth') ||
    titleLower.includes('zero-trust')
  ) {
    return 'Security'
  }

  if (
    titleLower.includes('data') ||
    titleLower.includes('mesh')
  ) {
    return 'Data Architecture'
  }

  if (
    titleLower.includes('microservice') ||
    titleLower.includes('service')
  ) {
    return 'Distributed Systems'
  }

  if (
    titleLower.includes('layered') ||
    titleLower.includes('hexagonal') ||
    titleLower.includes('clean') ||
    titleLower.includes('onion')
  ) {
    return 'Structural'
  }

  if (
    titleLower.includes('integration') ||
    titleLower.includes('adapter') ||
    titleLower.includes('channel')
  ) {
    return 'Integration'
  }

  return 'General'
}

// Then use in both functions:
export function getAllPatterns(): Pattern[] {
  // ... file reading ...
  const category = categorizePattern(data.title || slug)
  // ... rest of logic
}

export function getPatternBySlug(slug: string): Pattern | null {
  try {
    // ... file reading ...
    const category = categorizePattern(data.title || slug)
    // ... rest of logic
  } catch (error) {
    return null
  }
}
```

### Option 2: Use Frontmatter Category Field
**Effort:** 2-3 hours (update all 65 files)  
**Risk:** Medium

Add explicit category to each pattern's frontmatter:

```markdown
---
title: CQRS
type: architecture-pattern
category: Event-Driven
---
```

Then:
```typescript
const category = data.category || 'General'
```

**Pros**: 
- Most accurate
- Easy to change per pattern
- No keyword matching

**Cons**: 
- Manual work for 65 files
- Authors must remember to set category
- Ongoing maintenance

### Option 3: Category Configuration Object
**Effort:** 30 minutes  
**Risk:** Low

Define categories as configuration:

```typescript
// lib/pattern-categories.ts
export const CATEGORY_RULES = {
  'Event-Driven': ['event', 'cqrs', 'saga', 'sourcing'],
  'Security': ['security', 'oauth', 'zero-trust', 'encryption'],
  'Data Architecture': ['data', 'mesh', 'pipeline'],
  'Distributed Systems': ['microservice', 'service', 'distributed'],
  'Structural': ['layered', 'hexagonal', 'clean', 'onion'],
  'Integration': ['integration', 'adapter', 'channel', 'gateway'],
} as const

export function categorizePattern(title: string): string {
  const titleLower = title.toLowerCase()
  
  for (const [category, keywords] of Object.entries(CATEGORY_RULES)) {
    if (keywords.some(keyword => titleLower.includes(keyword))) {
      return category
    }
  }
  
  return 'General'
}
```

**Pros**:
- Easy to add new categories
- Easy to add new keywords
- Centralized configuration
- Self-documenting

## Recommended Fix
**Option 3** (Category Configuration Object) is the best approach:

1. ✅ Single source of truth
2. ✅ Easy to maintain
3. ✅ Self-documenting
4. ✅ Easy to test
5. ✅ No manual file updates
6. ✅ Extensible

## Implementation Steps

1. Create `lib/pattern-categories.ts` with category configuration
2. Add `categorizePattern()` function
3. Add unit tests for categorization logic
4. Update `getAllPatterns()` to use `categorizePattern()`
5. Update `getPatternBySlug()` to use `categorizePattern()`
6. Test pattern listing page - verify categories
7. Test pattern detail pages - verify categories match
8. Test related patterns - verify categories match

## Testing Steps

### Unit Tests
```typescript
// tests/pattern-categories.test.ts
import { categorizePattern } from '@/lib/pattern-categories'

describe('categorizePattern', () => {
  it('categorizes event-driven patterns', () => {
    expect(categorizePattern('Event Sourcing')).toBe('Event-Driven')
    expect(categorizePattern('CQRS Pattern')).toBe('Event-Driven')
    expect(categorizePattern('Saga Pattern')).toBe('Event-Driven')
  })

  it('categorizes security patterns', () => {
    expect(categorizePattern('OAuth Flow')).toBe('Security')
    expect(categorizePattern('Zero-Trust Architecture')).toBe('Security')
  })

  it('defaults to General', () => {
    expect(categorizePattern('Random Pattern')).toBe('General')
    expect(categorizePattern('Unknown')).toBe('General')
  })
  
  // Test case insensitivity
  it('is case insensitive', () => {
    expect(categorizePattern('EVENT SOURCING')).toBe('Event-Driven')
    expect(categorizePattern('Event Sourcing')).toBe('Event-Driven')
    expect(categorizePattern('event sourcing')).toBe('Event-Driven')
  })
})
```

### Integration Tests
1. Load all 65 patterns
2. Verify each has a category
3. Check that same pattern has same category in:
   - Pattern listing page
   - Pattern detail page
   - Related patterns section

### Visual Testing
1. Visit `/patterns` - note categories shown
2. Click into pattern detail pages
3. Verify category badge matches listing page
4. Check related patterns have correct categories

## Why This Matters

### Code Quality
- Follows DRY principle
- Reduces cognitive load
- Easier to review
- Cleaner codebase

### Maintainability
- Single place to update logic
- Impossible to create inconsistencies
- New developers understand faster
- Less documentation needed

### Reliability
- Consistent user experience
- No category mismatches
- Easier to test
- Fewer bugs

## Related Issues
- None documented

## Timeline
- **Discovered:** 2026-02-14
- **Priority:** Low - No user-facing bug, but should fix for maintainability
- **Estimated Fix Time:** 30-45 minutes (Option 3)
- **Testing Time:** 20 minutes

## Prevention
- **Code review**: Catch duplication during review
- **Linting rules**: Add rules to detect duplicate logic
- **Refactoring sprints**: Regular tech debt cleanup
- **Documentation**: Document categorization logic location

## Additional Notes
This is a classic tech debt issue: works fine now, but will cause problems as the system grows. Better to fix proactively than wait for bugs.

## Future Enhancements
After fixing duplication, consider:
- Allow patterns to have multiple categories (tags)
- Add pattern difficulty levels (beginner, intermediate, advanced)
- Add pattern relationships (complements, alternatives, prerequisites)
- Build category taxonomy with hierarchy
