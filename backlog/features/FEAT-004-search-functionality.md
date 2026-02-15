# FEAT-004: Add search functionality for patterns and blocks

**Status:** Proposed
**Priority:** Medium
**Category:** Navigation
**Effort:** Medium
**Created:** 2026-02-14

## Description

Implement fuzzy search across patterns, blocks, and articles to help users quickly find relevant content.

## User Story

**As a** user
**I want** to search for specific patterns or concepts
**So that** I can quickly find relevant information without browsing

## Current State

Currently:
- No search functionality
- Users must browse through categories
- 65+ patterns can be overwhelming
- No quick way to find specific content
- No keyword discovery

## Proposed Solution

### 1. Install Search Library

```bash
npm install cmdk
# Lightweight command palette with fuzzy search
```

### 2. Implement Command Palette

```typescript
// components/CommandPalette.tsx
'use client';

import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Keyboard shortcut: Cmd+K or Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <Command.Dialog open={open} onOpenChange={setOpen}>
      <Command.Input placeholder="Search patterns, blocks, articles..." />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>

        <Command.Group heading="Patterns">
          <Command.Item
            onSelect={() => {
              router.push('/patterns/event-sourcing');
              setOpen(false);
            }}
          >
            🔄 Event Sourcing
          </Command.Item>
          <Command.Item
            onSelect={() => {
              router.push('/patterns/cqrs');
              setOpen(false);
            }}
          >
            ⚡ CQRS
          </Command.Item>
          {/* Dynamic pattern items */}
        </Command.Group>

        <Command.Group heading="Building Blocks">
          <Command.Item
            onSelect={() => {
              router.push('/blocks/api-gateway');
              setOpen(false);
            }}
          >
            🚪 API Gateway
          </Command.Item>
          {/* Dynamic block items */}
        </Command.Group>

        <Command.Group heading="Playgrounds">
          <Command.Item
            onSelect={() => {
              router.push('/playgrounds/data-pipeline');
              setOpen(false);
            }}
          >
            🌊 Data Pipeline
          </Command.Item>
          {/* Other playgrounds */}
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
```

### 3. Dynamic Content Loading

```typescript
// lib/search/searchIndex.ts
import { patterns } from '@/data/patterns';
import { blocks } from '@/data/blocks';

export interface SearchResult {
  type: 'pattern' | 'block' | 'article' | 'playground';
  title: string;
  slug: string;
  description: string;
  category?: string;
  icon?: string;
  keywords?: string[];
}

export function buildSearchIndex(): SearchResult[] {
  const patternResults: SearchResult[] = patterns.map(p => ({
    type: 'pattern',
    title: p.title,
    slug: p.slug,
    description: p.description,
    category: p.category,
    icon: p.icon,
    keywords: p.tags,
  }));

  const blockResults: SearchResult[] = blocks.map(b => ({
    type: 'block',
    title: b.title,
    slug: b.slug,
    description: b.description,
    icon: b.icon,
  }));

  return [...patternResults, ...blockResults];
}

// Fuzzy search helper
export function fuzzySearch(query: string, items: SearchResult[]) {
  const lowerQuery = query.toLowerCase();

  return items
    .map(item => {
      let score = 0;

      // Exact title match: highest score
      if (item.title.toLowerCase() === lowerQuery) score += 100;

      // Title starts with query
      if (item.title.toLowerCase().startsWith(lowerQuery)) score += 50;

      // Title contains query
      if (item.title.toLowerCase().includes(lowerQuery)) score += 25;

      // Description contains query
      if (item.description.toLowerCase().includes(lowerQuery)) score += 10;

      // Keywords match
      if (item.keywords?.some(k => k.toLowerCase().includes(lowerQuery))) {
        score += 15;
      }

      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
}
```

### 4. Integrate into Header

```typescript
// components/Header.tsx
export function Header() {
  return (
    <header>
      <nav>
        {/* Existing nav items */}
      </nav>

      {/* Search trigger */}
      <button
        onClick={() => setCommandPaletteOpen(true)}
        className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg hover:bg-slate-200"
      >
        <span className="text-slate-600">Search...</span>
        <kbd className="px-2 py-1 bg-white rounded text-xs">⌘K</kbd>
      </button>

      <CommandPalette />
    </header>
  );
}
```

### 5. Enhanced Search with Filtering

```typescript
// Advanced search component
function AdvancedSearch() {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'pattern' | 'block'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const filteredResults = useMemo(() => {
    let results = fuzzySearch(query, searchIndex);

    if (typeFilter !== 'all') {
      results = results.filter(r => r.type === typeFilter);
    }

    if (categoryFilter) {
      results = results.filter(r => r.category === categoryFilter);
    }

    return results;
  }, [query, typeFilter, categoryFilter]);

  return (
    <Command>
      <div className="flex gap-2 p-2 border-b">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as any)}
        >
          <option value="all">All</option>
          <option value="pattern">Patterns</option>
          <option value="block">Blocks</option>
        </select>
        {/* Category filter */}
      </div>

      <Command.Input
        value={query}
        onValueChange={setQuery}
        placeholder="Search..."
      />

      <Command.List>
        {filteredResults.map((result) => (
          <Command.Item key={result.slug}>
            {result.icon} {result.title}
            <span className="text-sm text-slate-500">{result.type}</span>
          </Command.Item>
        ))}
      </Command.List>
    </Command>
  );
}
```

## Acceptance Criteria

- [ ] Global search bar in header
- [ ] Fuzzy matching with highlighting
- [ ] Search across patterns, blocks, articles
- [ ] Keyboard shortcut (Cmd+K / Ctrl+K) to open search
- [ ] Show recent searches
- [ ] Filter by category/type
- [ ] Show result count
- [ ] Navigate results with arrow keys
- [ ] Select result with Enter
- [ ] Close with Escape
- [ ] Mobile-friendly touch interface
- [ ] No results state with suggestions
- [ ] Loading state for async search

## Search Scope

**Content Types:**
- ✅ Patterns (65+)
- ✅ Building Blocks
- ✅ Playgrounds (4)
- ✅ Articles (if implemented)
- ✅ Skill Tree branches (optional)

**Searchable Fields:**
- Title (highest weight)
- Description
- Category
- Tags/Keywords
- Content (full-text, lower weight)

## UI/UX Details

### Desktop
- Command palette overlay (centered modal)
- Keyboard-first navigation
- Grouped results by type
- Recent searches section
- Quick actions (Go to skill tree, etc.)

### Mobile
- Full-screen search overlay
- Touch-optimized result list
- Virtual keyboard friendly
- Filter chips for categories

### Keyboard Shortcuts
| Action | Shortcut |
|--------|----------|
| Open search | Cmd/Ctrl + K |
| Close search | Escape |
| Navigate results | ↑ ↓ Arrow keys |
| Select result | Enter |
| Clear input | Cmd/Ctrl + Delete |

## Files to Create/Modify

```
components/CommandPalette.tsx (new)
lib/search/searchIndex.ts (new)
lib/search/fuzzySearch.ts (new)
components/Header.tsx
app/layout.tsx
```

## Benefits

✅ Faster content discovery
✅ Better user experience for large content library
✅ Keyboard power users work faster
✅ Reduced cognitive load (don't need to remember categories)
✅ Professional feature expected in modern apps
✅ SEO benefit (better internal linking)

## Technical Considerations

### Performance
- Build search index at build time
- Client-side fuzzy search (fast, no server needed)
- Debounce search input (300ms)
- Limit results to top 50

### Search Index Size
- ~65 patterns + ~20 blocks = 85 items
- Estimate: ~50KB for search index
- Acceptable for client-side bundle

### Alternative: Server-Side Search
- Use API route for search
- Better for very large content
- Can implement advanced features (typo correction, synonyms)

## Estimated Effort

**Medium** (10-12 hours):
- 3 hours: Build search index and fuzzy search logic
- 3 hours: Implement command palette UI
- 2 hours: Integrate with header and routing
- 2 hours: Add filters and recent searches
- 2 hours: Testing and polish

## Dependencies

- cmdk library (or alternative: kbar, react-command-palette)

## Testing Checklist

- [ ] Cmd+K opens search
- [ ] Typing filters results
- [ ] Fuzzy matching works (e.g., "eventsrc" finds "Event Sourcing")
- [ ] Arrow keys navigate results
- [ ] Enter selects result
- [ ] Escape closes palette
- [ ] Clicking outside closes palette
- [ ] Recent searches appear
- [ ] Filters work correctly
- [ ] No results state shows
- [ ] Mobile touch works
- [ ] Works on all browsers
- [ ] No performance lag with typing

## Future Enhancements

- **Smart suggestions**: "Users who searched X also viewed Y"
- **Search analytics**: Track popular searches
- **Autocomplete**: Show suggestions as you type
- **Search operators**: `type:pattern category:messaging`
- **Typo tolerance**: Handle misspellings
- **Synonyms**: "queue" also finds "message broker"
- **Full-text search**: Search within pattern content
- **Search history**: Persist across sessions
- **Voice search**: Speech-to-text input
- **Global actions**: "Create new playground", "Go to skill tree"

## Related Issues

- Improves: Overall navigation and discoverability
- Complements: Content library expansion
- Enables: Faster learning workflow

## Success Metrics

After implementation, track:
- Search usage rate (% of sessions using search)
- Average searches per session
- Click-through rate on search results
- Most searched terms
- Zero-result queries (to improve content)
- Time to find content (before vs after)
