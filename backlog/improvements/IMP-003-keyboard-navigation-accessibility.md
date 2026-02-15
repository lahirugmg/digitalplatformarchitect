# IMP-003: Implement comprehensive keyboard navigation

**Status:** Proposed
**Priority:** High (WCAG Compliance Required)
**Category:** Accessibility
**Effort:** Large
**Created:** 2026-02-14
**WCAG:** Level A Compliance (2.1.1 Keyboard)

## Description

Add keyboard alternatives for all drag-and-drop and mouse-only interactions to meet WCAG 2.1 Level A standards.

## Current State

Playgrounds require mouse for all interactions:
- Cannot add nodes via keyboard
- Cannot select patterns without mouse
- No keyboard shortcuts
- No visible focus indicators
- Screen reader users completely blocked
- Violates WCAG 2.1 Level A (2.1.1 Keyboard)

**Impact**: Excludes approximately 10-15% of users including:
- Keyboard-only users
- Motor disability users
- Screen reader users
- Power users who prefer keyboard

## Proposed State

Full keyboard navigation with visible focus indicators, keyboard shortcuts for common actions, and alternative input methods for drag-and-drop.

## Benefits

✅ WCAG 2.1 Level A compliance (legal requirement)
✅ Accessible to keyboard-only users
✅ Usable by motor disability users
✅ Screen reader compatible
✅ Power users can work faster
✅ Better overall UX for everyone
✅ Reduced legal/compliance risk

## WCAG 2.1 Requirements

**2.1.1 Keyboard (Level A):**
> All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes.

**2.4.7 Focus Visible (Level AA):**
> Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.

## Implementation Plan

### Phase 1: Focus Management (Week 1)

#### 1.1 Add Focus Styles

```css
/* globals.css */

/* Remove default outline, add custom focus styles */
*:focus {
  outline: none;
}

/* Visible focus indicator for keyboard navigation */
*:focus-visible {
  outline: 3px solid #3b82f6;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Focus styles for specific components */
.canvas-node:focus-visible {
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5);
  z-index: 10;
}

.palette-item:focus-visible {
  background-color: #eff6ff;
  border-color: #3b82f6;
}

/* Skip to main content link */
.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
  background: #3b82f6;
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

#### 1.2 Focus Trap for Modals

```typescript
// hooks/useFocusTrap.ts
import { useEffect, useRef } from 'react';

export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => container.removeEventListener('keydown', handleTabKey);
  }, [isActive]);

  return containerRef;
}
```

### Phase 2: Keyboard Shortcuts (Week 2)

#### 2.1 Global Shortcuts Hook

```typescript
// hooks/useKeyboardShortcuts.ts
import { useEffect } from 'react';

interface Shortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: () => void;
  description: string;
}

export function useKeyboardShortcuts(shortcuts: Shortcut[], enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const shortcut = shortcuts.find(
        (s) =>
          s.key.toLowerCase() === e.key.toLowerCase() &&
          (!s.ctrl || (e.ctrlKey || e.metaKey)) &&
          (!s.shift || e.shiftKey) &&
          (!s.alt || e.altKey)
      );

      if (shortcut) {
        e.preventDefault();
        shortcut.action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, enabled]);
}

// Usage in Data Pipeline
const shortcuts: Shortcut[] = [
  {
    key: 'Delete',
    action: () => deleteSelectedNodes(),
    description: 'Delete selected node',
  },
  {
    key: 'z',
    ctrl: true,
    action: () => undo(),
    description: 'Undo',
  },
  {
    key: 'z',
    ctrl: true,
    shift: true,
    action: () => redo(),
    description: 'Redo',
  },
  {
    key: 's',
    ctrl: true,
    action: () => handleSave(),
    description: 'Save pipeline',
  },
  {
    key: '?',
    action: () => setShowShortcutsModal(true),
    description: 'Show keyboard shortcuts',
  },
];

useKeyboardShortcuts(shortcuts);
```

#### 2.2 Keyboard Shortcuts Modal

```typescript
// components/KeyboardShortcutsModal.tsx
export function KeyboardShortcutsModal({ shortcuts, isOpen, onClose }: Props) {
  const modalRef = useFocusTrap(isOpen);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Keyboard Shortcuts</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {shortcuts.map((shortcut) => (
            <div key={shortcut.key} className="flex justify-between items-center">
              <span className="text-slate-700">{shortcut.description}</span>
              <kbd className="px-3 py-1 bg-slate-100 border border-slate-300 rounded text-sm font-mono">
                {formatShortcut(shortcut)}
              </kbd>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function formatShortcut(s: Shortcut): string {
  const parts: string[] = [];
  if (s.ctrl) parts.push('Ctrl');
  if (s.shift) parts.push('Shift');
  if (s.alt) parts.push('Alt');
  parts.push(s.key);
  return parts.join(' + ');
}
```

### Phase 3: Canvas Keyboard Navigation (Week 3)

#### 3.1 Node Selection and Movement

```typescript
// components/KeyboardNavigableCanvas.tsx
export function KeyboardNavigableCanvas() {
  const [nodes, setNodes] = useNodesState([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null);

  // Arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedNodeId) return;

      const selectedNode = nodes.find((n) => n.id === selectedNodeId);
      if (!selectedNode) return;

      let deltaX = 0;
      let deltaY = 0;
      const step = e.shiftKey ? 50 : 10; // Shift for larger steps

      switch (e.key) {
        case 'ArrowUp':
          deltaY = -step;
          e.preventDefault();
          break;
        case 'ArrowDown':
          deltaY = step;
          e.preventDefault();
          break;
        case 'ArrowLeft':
          deltaX = -step;
          e.preventDefault();
          break;
        case 'ArrowRight':
          deltaX = step;
          e.preventDefault();
          break;
        case 'Enter':
        case ' ':
          // Toggle selection
          setSelectedNodeId(selectedNodeId === focusedNodeId ? null : focusedNodeId);
          e.preventDefault();
          return;
        case 'Delete':
        case 'Backspace':
          onNodesDelete([selectedNode]);
          e.preventDefault();
          return;
      }

      if (deltaX !== 0 || deltaY !== 0) {
        setNodes((nds) =>
          nds.map((node) =>
            node.id === selectedNodeId
              ? {
                  ...node,
                  position: {
                    x: node.position.x + deltaX,
                    y: node.position.y + deltaY,
                  },
                }
              : node
          )
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNodeId, nodes]);

  return (
    <ReactFlow
      nodes={nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onFocus: () => setFocusedNodeId(node.id),
          selected: node.id === selectedNodeId,
        },
      }))}
      onNodesChange={onNodesChange}
    />
  );
}
```

#### 3.2 Accessible Custom Node

```typescript
// components/AccessibleCustomNode.tsx
export function AccessibleCustomNode({ data, id, selected }: NodeProps) {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={nodeRef}
      role="button"
      tabIndex={0}
      aria-label={`${data.label} node. Press Enter to select, arrow keys to move, Delete to remove`}
      aria-selected={selected}
      onFocus={data.onFocus}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          data.onSelect?.(id);
        }
      }}
      className={`
        custom-node
        ${selected ? 'ring-4 ring-blue-500' : ''}
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400
      `}
    >
      <div className="text-2xl" aria-hidden="true">
        {data.icon}
      </div>
      <div className="font-medium">{data.label}</div>
      {data.throughput && (
        <div className="text-sm text-slate-600" aria-label={`Throughput: ${data.throughput} per second`}>
          {data.throughput}/s
        </div>
      )}
    </div>
  );
}
```

### Phase 4: Component Palette Navigation (Week 3)

```typescript
// components/KeyboardNavigablePalette.tsx
export function KeyboardNavigablePalette({ components, onAddComponent }: Props) {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((i) => Math.min(i + 1, components.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((i) => Math.max(i - 1, 0));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        onAddComponent(components[focusedIndex]);
        toast.success(`Added ${components[focusedIndex].label}. Use arrow keys to position it.`);
        break;
    }
  };

  return (
    <div
      role="list"
      aria-label="Component palette"
      onKeyDown={handleKeyDown}
    >
      {components.map((component, index) => (
        <button
          key={component.id}
          role="listitem"
          tabIndex={index === focusedIndex ? 0 : -1}
          ref={(el) => index === focusedIndex && el?.focus()}
          aria-label={`Add ${component.label} to canvas`}
          onClick={() => onAddComponent(component)}
          className="w-full p-4 text-left rounded-lg border-2 transition focus-visible:border-blue-600"
        >
          <div className="text-2xl" aria-hidden="true">{component.icon}</div>
          <div className="font-medium">{component.label}</div>
        </button>
      ))}
    </div>
  );
}
```

### Phase 5: Screen Reader Support (Week 4)

#### 5.1 ARIA Live Regions

```typescript
// components/AriaLiveRegion.tsx
export function AriaLiveRegion() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Subscribe to app events
    const unsubscribe = eventBus.on('announce', (msg: string) => {
      setMessage(msg);
      setTimeout(() => setMessage(''), 1000);
    });

    return unsubscribe;
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
}

// Usage
eventBus.emit('announce', 'Node added to canvas');
eventBus.emit('announce', 'Pipeline saved successfully');
```

#### 5.2 Screen Reader Only Text

```css
/* Utility for screen-reader-only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only:focus,
.sr-only:active {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

## Keyboard Shortcuts Reference

### Global
| Shortcut | Action |
|----------|--------|
| `?` | Show shortcuts help |
| `Cmd/Ctrl + S` | Save |
| `Cmd/Ctrl + Z` | Undo |
| `Cmd/Ctrl + Shift + Z` | Redo |
| `Cmd/Ctrl + K` | Open search |
| `Esc` | Close modals/dialogs |

### Canvas Navigation
| Shortcut | Action |
|----------|--------|
| `Tab` | Navigate between elements |
| `Arrow Keys` | Move selected node (10px) |
| `Shift + Arrow Keys` | Move selected node (50px) |
| `Enter / Space` | Select focused node |
| `Delete / Backspace` | Delete selected node |

### Component Palette
| Shortcut | Action |
|----------|--------|
| `Arrow Up/Down` | Navigate components |
| `Enter / Space` | Add component to canvas |

## Acceptance Criteria

- [ ] All interactive elements keyboard accessible
- [ ] Visible focus indicators on all elements
- [ ] Keyboard shortcuts for common actions
- [ ] Works with screen readers (NVDA, JAWS, VoiceOver)
- [ ] Skip links for main content
- [ ] Focus trap in modals
- [ ] ARIA labels on all interactive elements
- [ ] ARIA live regions for dynamic content
- [ ] No keyboard traps
- [ ] Logical tab order
- [ ] Shortcuts help dialog
- [ ] Passes WCAG 2.1 Level A automated tests
- [ ] Manual testing with keyboard only

## Testing Checklist

### Automated Testing
- [ ] Run axe DevTools
- [ ] Run WAVE browser extension
- [ ] Run Lighthouse accessibility audit
- [ ] pa11y CLI testing

### Manual Testing
- [ ] Navigate entire site with keyboard only
- [ ] Test with NVDA (Windows)
- [ ] Test with JAWS (Windows)
- [ ] Test with VoiceOver (Mac/iOS)
- [ ] Test with TalkBack (Android)
- [ ] Test all keyboard shortcuts
- [ ] Verify focus order is logical
- [ ] Verify no focus traps

## Files to Create/Modify

```
hooks/useKeyboardShortcuts.ts (new)
hooks/useFocusTrap.ts (new)
components/KeyboardShortcutsModal.tsx (new)
components/AriaLiveRegion.tsx (new)
components/AccessibleCustomNode.tsx (new)
components/KeyboardNavigablePalette.tsx (new)
app/globals.css
app/layout.tsx (add AriaLiveRegion)
```

## Estimated Effort

**Large** (4 weeks):
- Week 1: Focus management and styles (20 hours)
- Week 2: Keyboard shortcuts (20 hours)
- Week 3: Canvas and palette navigation (20 hours)
- Week 4: Screen reader support and testing (20 hours)

**Total**: ~80 hours

## Dependencies

- None (accessibility is foundational)

## Related Issues

- Resolves: DEF-009 (No keyboard navigation)
- Resolves: DEF-011 (Missing ARIA labels)
- Resolves: DEF-010 (Color-only differentiation)
- Required for: WCAG compliance

## Success Metrics

After implementation:
- 100% keyboard accessible
- WCAG 2.1 Level A compliance (target: Level AA)
- Passes automated accessibility tests
- Positive feedback from screen reader users
- Reduced accessibility complaints
- Legal compliance achieved

## References

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Keyboard Accessibility](https://webaim.org/articles/keyboard/)
