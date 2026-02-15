# IMP-001: Implement mobile-responsive playground layouts

**Status:** Proposed
**Priority:** High
**Category:** UX / Mobile
**Effort:** Large
**Created:** 2026-02-14

## Description

Redesign all playground pages to work on mobile devices with touch-friendly controls and collapsible sidebars.

## Current State

Fixed three-column layouts with drag-and-drop that don't work on mobile screens:
- Component palette (left sidebar): Fixed 256px width
- Canvas (center): Takes remaining space
- Controls panel (right sidebar): Fixed 320px width

**Problems:**
- Sidebars overlap on mobile (<768px)
- Drag-and-drop doesn't work with touch
- Canvas area too small
- Buttons too small for touch targets
- Horizontal scrolling required
- Completely unusable experience

## Proposed State

Responsive layouts with collapsible sidebars, tab-based navigation on mobile, and touch-optimized controls:
- Mobile: Single column, tabs, or drawer navigation
- Tablet: Two columns with collapsible sidebars
- Desktop: Current three-column layout

## Benefits

✅ Playgrounds accessible to mobile users (30-40% of traffic)
✅ Better tablet experience
✅ Improved overall usability
✅ Higher engagement metrics
✅ Better app store rating if PWA implemented
✅ Wider audience reach

## Implementation Plan

### Phase 1: Layout Restructuring (Week 1)

#### 1.1 Create Responsive Layout Component

```typescript
// components/playground/ResponsivePlaygroundLayout.tsx
'use client';

import { useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface Props {
  palette: React.ReactNode;
  canvas: React.ReactNode;
  controls: React.ReactNode;
}

export function ResponsivePlaygroundLayout({ palette, canvas, controls }: Props) {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

  if (isMobile) {
    return <MobileLayout {...props} />;
  }

  if (isTablet) {
    return <TabletLayout {...props} />;
  }

  return <DesktopLayout {...props} />;
}

// Mobile: Tab-based navigation
function MobileLayout({ palette, canvas, controls }: Props) {
  const [activeTab, setActiveTab] = useState<'palette' | 'canvas' | 'controls'>('canvas');

  return (
    <div className="flex flex-col h-screen">
      {/* Tab Navigation */}
      <div className="flex border-b bg-white">
        <button
          onClick={() => setActiveTab('palette')}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === 'palette' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-600'
          }`}
        >
          Components
        </button>
        <button
          onClick={() => setActiveTab('canvas')}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === 'canvas' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-600'
          }`}
        >
          Canvas
        </button>
        <button
          onClick={() => setActiveTab('controls')}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === 'controls' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-600'
          }`}
        >
          Controls
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'palette' && <div className="p-4">{palette}</div>}
        {activeTab === 'canvas' && canvas}
        {activeTab === 'controls' && <div className="p-4">{controls}</div>}
      </div>
    </div>
  );
}

// Tablet: Two columns with collapsible sidebar
function TabletLayout({ palette, canvas, controls }: Props) {
  const [showPalette, setShowPalette] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Collapsible Palette */}
      {showPalette && (
        <aside className="w-64 border-r bg-white overflow-auto">
          {palette}
        </aside>
      )}

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Toggle Button */}
        <button
          onClick={() => setShowPalette(!showPalette)}
          className="absolute top-4 left-4 z-10 bg-white px-3 py-2 rounded-lg shadow"
        >
          {showPalette ? '←' : '→'} Components
        </button>

        {canvas}

        {/* Controls as bottom drawer */}
        <div className="h-48 border-t bg-white overflow-auto">
          {controls}
        </div>
      </div>
    </div>
  );
}

// Desktop: Current layout
function DesktopLayout({ palette, canvas, controls }: Props) {
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 bg-white border-r overflow-auto">{palette}</aside>
      <main className="flex-1">{canvas}</main>
      <aside className="w-80 bg-white border-l overflow-auto">{controls}</aside>
    </div>
  );
}
```

#### 1.2 Create Media Query Hook

```typescript
// hooks/useMediaQuery.ts
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
```

### Phase 2: Touch Interaction (Week 2)

#### 2.1 Replace Drag-and-Drop with Tap-to-Add

```typescript
// components/playground/TouchFriendlyPalette.tsx
export function TouchFriendlyPalette({ components, onAddComponent }: Props) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);

  const handleComponentClick = (component: Component) => {
    if (isMobile) {
      setSelectedComponent(component);
      toast.info('Tap on canvas to place component');
    } else {
      // Desktop: Start drag
      onDragStart(component);
    }
  };

  return (
    <div className="space-y-2">
      {components.map((component) => (
        <button
          key={component.id}
          onClick={() => handleComponentClick(component)}
          className={`
            w-full p-4 text-left rounded-lg border-2 transition
            ${selectedComponent?.id === component.id ? 'border-blue-600 bg-blue-50' : 'border-slate-200 bg-white'}
            active:scale-95
            min-h-[48px] // Touch target minimum
          `}
        >
          <div className="text-2xl mb-1">{component.icon}</div>
          <div className="font-medium">{component.label}</div>
        </button>
      ))}
    </div>
  );
}
```

#### 2.2 Touch-Friendly Canvas

```typescript
// Canvas click handler for mobile
const handleCanvasClick = useCallback((event: React.MouseEvent) => {
  if (!isMobile || !selectedComponent) return;

  const bounds = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - bounds.left;
  const y = event.clientY - bounds.top;

  addNodeAtPosition(selectedComponent, { x, y });
  setSelectedComponent(null);
  toast.success(`Added ${selectedComponent.label}`);
}, [isMobile, selectedComponent]);

<div
  onClick={handleCanvasClick}
  className={`relative ${selectedComponent ? 'cursor-crosshair' : ''}`}
>
  {/* Show placement hint on mobile */}
  {isMobile && selectedComponent && (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
      Tap to place {selectedComponent.label}
    </div>
  )}

  <ReactFlow {...props} />
</div>
```

### Phase 3: Touch Target Optimization (Week 2)

```css
/* globals.css - Touch target guidelines */

/* Minimum 44x44px for all interactive elements on mobile */
@media (max-width: 768px) {
  button, a, [role="button"] {
    min-height: 44px;
    min-width: 44px;
  }

  /* Larger padding for better touch experience */
  .btn {
    padding: 12px 20px;
  }

  /* Increase spacing between interactive elements */
  .button-group > * + * {
    margin-left: 12px;
  }

  /* Larger node sizes in ReactFlow */
  .react-flow__node {
    min-width: 120px;
    min-height: 80px;
    padding: 16px;
  }

  /* Bigger connection handles */
  .react-flow__handle {
    width: 20px;
    height: 20px;
  }
}
```

### Phase 4: Integrate into All Playgrounds (Week 3)

Apply responsive layout to:
- Data Pipeline Playground
- Pattern Composer
- Message Flow
- Enterprise Integration

## Acceptance Criteria

- [ ] All playgrounds work on mobile (320px - 767px)
- [ ] Collapsible sidebars on tablet (768px - 1023px)
- [ ] Current layout preserved on desktop (1024px+)
- [ ] Touch-friendly tap-to-add on mobile
- [ ] All buttons meet 44x44px minimum touch target
- [ ] No horizontal scrolling required
- [ ] Canvas uses full screen width on mobile
- [ ] Smooth transitions between breakpoints
- [ ] Works in portrait and landscape orientations
- [ ] Tests pass on iOS Safari and Android Chrome

## Testing Matrix

| Device | Size | Orientation | Test Result |
|--------|------|-------------|-------------|
| iPhone SE | 375x667 | Portrait | ⬜ |
| iPhone 14 Pro | 393x852 | Portrait | ⬜ |
| iPhone 14 Pro | 852x393 | Landscape | ⬜ |
| iPad Mini | 768x1024 | Portrait | ⬜ |
| iPad Pro | 1024x1366 | Portrait | ⬜ |
| Android (Pixel 7) | 412x915 | Portrait | ⬜ |
| Desktop | 1920x1080 | N/A | ⬜ |

## Files to Create/Modify

```
components/playground/ResponsivePlaygroundLayout.tsx (new)
components/playground/TouchFriendlyPalette.tsx (new)
hooks/useMediaQuery.ts (new)
app/playgrounds/data-pipeline/page.tsx
app/playgrounds/pattern-composer/page.tsx
app/playgrounds/message-flow/page.tsx
app/playgrounds/enterprise-integration/page.tsx
app/globals.css
```

## Estimated Effort

**Large** (3-4 weeks):
- Week 1: Responsive layout component (20 hours)
- Week 2: Touch interactions (20 hours)
- Week 3: Integration into all playgrounds (20 hours)
- Week 4: Testing and refinement (20 hours)

**Total**: ~80 hours

## Dependencies

- None (pure UI refactoring)

## Related Issues

- Resolves: DEF-012 (No mobile responsive design)
- Resolves: DEF-013 (Header not responsive)
- Improves: Overall accessibility and reach

## Success Metrics

After implementation:
- Mobile bounce rate should decrease by 40%+
- Mobile session duration should increase
- Playground usage on mobile should increase from 0% to 15-20%
- User satisfaction scores improve
- Mobile app store ratings improve (if PWA)

## Future Enhancements

- Gesture support (pinch to zoom canvas)
- Swipe between tabs on mobile
- Mobile-specific tutorials
- Progressive Web App (PWA) for offline use
- Native mobile app consideration
