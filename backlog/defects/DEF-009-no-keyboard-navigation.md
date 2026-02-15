# DEF-009: No keyboard navigation support in playgrounds

**Status:** Open
**Severity:** High
**Area:** All playgrounds
**Created:** 2026-02-14
**WCAG Violation:** Level A (2.1.1 Keyboard)

## Description

Drag-and-drop interfaces in playgrounds lack keyboard alternatives. Pattern Composer circular layout has no keyboard navigation. This violates WCAG 2.1 Level A (2.1.1 Keyboard).

## Affected Areas

- Data Pipeline Playground: Cannot add nodes via keyboard
- Pattern Composer: Cannot select/add patterns without mouse
- Message Flow: Cannot interact with message flow controls
- Enterprise Integration: Drag-and-drop only
- Skill Tree: Node selection requires mouse clicks

## Steps to Reproduce

1. Navigate to any playground using only keyboard (Tab key)
2. Try to add nodes or patterns using keyboard only
3. Try to connect nodes or arrange layout

## Expected Behavior

All functionality should be accessible via keyboard with focus indicators:
- Tab/Shift+Tab to navigate between elements
- Enter/Space to activate buttons and add items
- Arrow keys to navigate canvas items
- Keyboard shortcuts for common actions (Delete to remove, Cmd+Z to undo)
- Visible focus indicators on all interactive elements

## Actual Behavior

Cannot drag nodes, select patterns, or interact with canvas using keyboard only. Keyboard users are completely unable to use the playgrounds.

## Impact

**CRITICAL ACCESSIBILITY ISSUE:**
- Completely inaccessible to keyboard-only users
- Unusable for users with motor disabilities
- Screen reader users cannot navigate or use playgrounds
- Violates WCAG 2.1 Level A (legal requirement in many jurisdictions)
- Excludes approximately 10-15% of users

## WCAG 2.1 Requirements

**2.1.1 Keyboard (Level A):**
> All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes, except where the underlying function requires input that depends on the path of the user's movement and not just the endpoints.

## Proposed Solution

### 1. Add Keyboard Navigation to Playgrounds

#### Data Pipeline Canvas
```typescript
// Add keyboard event handlers
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Tab') {
    // Navigate between component palette and canvas
  }
  if (e.key === 'Enter' && focusedPaletteItem) {
    // Add component to canvas
    addNodeToCanvas(focusedPaletteItem);
  }
  if (e.key === 'Delete' && selectedNodes.length > 0) {
    // Delete selected nodes
    onNodesDelete(selectedNodes);
  }
  if (e.key === 'ArrowUp/Down/Left/Right' && selectedNode) {
    // Move selected node
    moveNode(selectedNode, direction);
  }
};

// Component palette item
<button
  role="button"
  tabIndex={0}
  aria-label={`Add ${component.label} to canvas`}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      addNodeToCanvas(component);
    }
  }}
>
  {component.icon} {component.label}
</button>
```

#### Pattern Composer
```typescript
// Add keyboard navigation for circular pattern layout
const handlePatternKeyboard = (e: KeyboardEvent) => {
  const patterns = availablePatterns;
  const currentIndex = patterns.findIndex(p => p.id === focusedPattern);

  if (e.key === 'ArrowRight') {
    // Move focus clockwise
    setFocusedPattern(patterns[(currentIndex + 1) % patterns.length]);
  }
  if (e.key === 'ArrowLeft') {
    // Move focus counter-clockwise
    setFocusedPattern(patterns[(currentIndex - 1 + patterns.length) % patterns.length]);
  }
  if (e.key === 'Enter') {
    // Add focused pattern
    addPattern(focusedPattern);
  }
};
```

### 2. Add Focus Indicators

```css
/* Add visible focus styles */
.focusable:focus-visible {
  outline: 3px solid #3b82f6;
  outline-offset: 2px;
}

/* For canvas nodes */
.canvas-node:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}
```

### 3. Add Keyboard Shortcuts Legend

Display keyboard shortcuts in each playground:
- `Tab` - Navigate elements
- `Enter` - Add/select item
- `Delete` - Remove selected
- `Cmd/Ctrl + Z` - Undo
- `Arrow Keys` - Move selection or navigate
- `?` - Show all shortcuts

### 4. Add Skip Links

```typescript
<a
  href="#main-canvas"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded"
>
  Skip to canvas
</a>
```

## Implementation Priority

**HIGH** - Required for WCAG compliance and accessibility

## Testing Required

1. Test with keyboard only (unplug mouse)
2. Test with screen reader (NVDA, JAWS, VoiceOver)
3. Verify all playground features work with keyboard
4. Test focus indicators are visible
5. Test keyboard shortcuts don't conflict with browser shortcuts

## Related Issues

- DEF-011: Missing aria-labels on interactive SVG elements
- IMP-003: Implement comprehensive keyboard navigation
- IMP-011: Add comprehensive ARIA labels

## References

- [WCAG 2.1 - 2.1.1 Keyboard](https://www.w3.org/WAI/WCAG21/Understanding/keyboard)
- [Keyboard Accessible Drag and Drop](https://www.w3.org/WAI/ARIA/apg/patterns/drag-and-drop/)
