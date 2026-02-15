# DEF-012: No mobile responsive design for playgrounds

**Status:** Open
**Severity:** High
**Area:** All playground pages
**Created:** 2026-02-14

## Description

All playground pages use fixed layouts (`h-screen`, fixed sidebars) that don't adapt to mobile screens. Three-column layouts with drag-and-drop are unusable on mobile.

## Affected Pages

- `/playgrounds/data-pipeline` - Three-column layout with component palette
- `/playgrounds/pattern-composer` - Circular layout not touch-friendly
- `/playgrounds/message-flow` - Fixed sidebar overlaps content
- `/playgrounds/enterprise-integration` - Similar layout issues

## Steps to Reproduce

1. Open any playground on mobile device or narrow browser window (<768px)
2. Try to use the playground features
3. Observe layout breaks and controls are inaccessible

## Expected Behavior

- Responsive layout with collapsible sidebars
- Touch-friendly controls (larger tap targets)
- Mobile navigation (tabs or accordion)
- Alternative to drag-and-drop (tap to select, tap to place)
- Viewport-appropriate sizing

## Actual Behavior

- Fixed three-column layout crushes on mobile
- Sidebars overlap main content
- Drag-and-drop doesn't work with touch
- Buttons too small for touch targets (minimum 44x44px needed)
- Horizontal scrolling required
- Canvas area too small to be useful

## Impact

**HIGH IMPACT:**
- Playgrounds completely unusable on mobile devices
- Affects approximately 30-40% of users (mobile traffic)
- Tablet experience is also poor
- Cannot learn or practice on mobile
- Reduces accessibility and reach
- Negative impact on SEO (mobile-first indexing)

## Current Layout Issues

### Data Pipeline Playground
```tsx
<div className="flex h-screen overflow-hidden">
  <aside className="w-64 bg-white border-r"> {/* Fixed width sidebar */}
    {/* Component palette */}
  </aside>
  <main className="flex-1"> {/* Canvas */}
  </main>
  <aside className="w-80 bg-white border-l"> {/* Fixed width controls */}
  </aside>
</div>
```

Problems:
- Fixed sidebar widths don't adapt
- Three columns don't stack on mobile
- Canvas area becomes unusable narrow strip

## Proposed Solution

### 1. Responsive Layout with Tailwind Breakpoints

```tsx
<div className="flex flex-col md:flex-row h-screen overflow-hidden">
  {/* Mobile: Collapsible drawer from bottom */}
  <aside className={`
    fixed md:static bottom-0 left-0 right-0
    h-64 md:h-auto md:w-64
    bg-white border-t md:border-r md:border-t-0
    transform transition-transform
    ${isPaletteOpen ? 'translate-y-0' : 'translate-y-full md:translate-y-0'}
  `}>
    {/* Component palette */}
  </aside>

  <main className="flex-1 relative">
    {/* Canvas - full width on mobile */}

    {/* Mobile: Floating action button */}
    <button
      className="md:hidden fixed bottom-4 right-4 bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg"
      onClick={() => setIsPaletteOpen(!isPaletteOpen)}
    >
      +
    </button>
  </main>

  {/* Mobile: Modal for controls, md: Fixed sidebar */}
  <aside className={`
    fixed md:static inset-0 md:inset-auto
    md:w-80
    bg-white md:border-l
    ${isControlsOpen ? 'block' : 'hidden md:block'}
  `}>
    {/* Controls panel */}
  </aside>
</div>
```

### 2. Touch-Friendly Tap-to-Add

```tsx
// Mobile: Change interaction pattern
const handleComponentSelect = (component: Component) => {
  if (isMobile) {
    // Tap to select, then tap canvas to place
    setSelectedComponent(component);
    setIsPaletteOpen(false);
    toast.info('Tap on canvas to place component');
  } else {
    // Desktop: Drag and drop
    startDragging(component);
  }
};

const handleCanvasTap = (position: {x: number, y: number}) => {
  if (isMobile && selectedComponent) {
    addNodeAtPosition(selectedComponent, position);
    setSelectedComponent(null);
  }
};
```

### 3. Tab-Based Navigation for Mobile

```tsx
<div className="md:hidden">
  <div className="flex border-b">
    <button
      className={`flex-1 py-3 ${activeTab === 'palette' ? 'border-b-2 border-blue-600' : ''}`}
      onClick={() => setActiveTab('palette')}
    >
      Components
    </button>
    <button
      className={`flex-1 py-3 ${activeTab === 'canvas' ? 'border-b-2 border-blue-600' : ''}`}
      onClick={() => setActiveTab('canvas')}
    >
      Canvas
    </button>
    <button
      className={`flex-1 py-3 ${activeTab === 'controls' ? 'border-b-2 border-blue-600' : ''}`}
      onClick={() => setActiveTab('controls')}
    >
      Controls
    </button>
  </div>

  {activeTab === 'palette' && <ComponentPalette />}
  {activeTab === 'canvas' && <Canvas />}
  {activeTab === 'controls' && <ControlPanel />}
</div>
```

### 4. Increase Touch Target Sizes

```css
/* Ensure minimum 44x44px touch targets */
.touch-target {
  @apply min-w-[44px] min-h-[44px] flex items-center justify-center;
}

/* Larger tap targets on mobile */
@media (max-width: 768px) {
  button, .clickable {
    min-height: 48px;
    padding: 12px 16px;
  }
}
```

### 5. Responsive Canvas Sizing

```tsx
// Adjust canvas size based on viewport
const canvasSize = useMemo(() => {
  if (typeof window === 'undefined') return { width: 800, height: 600 };

  const isMobile = window.innerWidth < 768;
  return {
    width: isMobile ? window.innerWidth - 32 : 800,
    height: isMobile ? window.innerHeight - 200 : 600,
  };
}, []);
```

## Implementation Priority

**HIGH** - Affects large portion of users, must be fixed soon

## Testing Required

1. Test on iPhone Safari (iOS)
2. Test on Android Chrome
3. Test on iPad (tablet breakpoint)
4. Test all breakpoints: 320px, 375px, 768px, 1024px, 1440px
5. Test touch interactions (tap, swipe, pinch-to-zoom)
6. Verify no horizontal scroll
7. Test landscape and portrait orientations

## Breakpoints to Support

- Mobile: 320px - 767px (single column, tabs/drawers)
- Tablet: 768px - 1023px (two columns, some sidebars)
- Desktop: 1024px+ (three columns, full layout)

## Related Issues

- DEF-013: Header navigation not responsive on mobile
- IMP-001: Implement mobile-responsive playground layouts

## Design Mockups Needed

Create mobile designs for:
1. Component palette as bottom drawer
2. Canvas with floating action buttons
3. Controls as modal or accordion
4. Tab navigation alternative
