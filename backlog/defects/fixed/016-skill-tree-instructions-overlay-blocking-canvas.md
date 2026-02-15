# Defect #016: Skill Tree Instructions Overlay Blocking Canvas View

**Status**: Fixed  
**Priority**: Medium  
**Component**: Skill Tree  
**Affected Files**: `app/skill-tree/components/SkillTreeCanvas.tsx`  
**Reported**: 2026-02-14  

---

## Summary

The instructional overlay on the skill tree canvas is permanently displayed and blocks the view of the skill tree nodes, especially on smaller screens. The overlay cannot be dismissed or hidden, causing poor user experience when navigating and interacting with the skill tree.

## Current Behavior

1. When users visit `/skill-tree`, an instructions overlay appears in the top-left corner
2. The overlay shows:
   - Title: "How to Progress 🎯"
   - Legend explaining node colors and states
   - Instructions for earning XP and tokens
3. The overlay is **always visible** and cannot be closed
4. The overlay has `z-10` positioning, appearing above canvas elements
5. On smaller screens or at certain zoom levels, the overlay blocks important skill tree nodes
6. The overlay remains visible even after users have learned how the system works

## Expected Behavior

The instructions overlay should:
1. Be **dismissible** with a close button (X icon)
2. Only appear on **first visit** (use localStorage to track)
3. Be **re-openable** via a help button/icon in the UI
4. **Not block** the canvas on initial render (better positioning or modal approach)
5. Optionally collapse to a smaller help icon after dismissal

## Technical Details

### Current Implementation

**File**: `app/skill-tree/components/SkillTreeCanvas.tsx` (lines 183-195)

```tsx
{/* Instructions overlay */}
<div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 max-w-md z-10">
  <h3 className="font-bold mb-2 flex items-center gap-2">
    <span className="text-2xl">🎯</span>
    How to Progress
  </h3>
  <ul className="text-sm space-y-1 text-slate-700">
    <li>• <strong>Green nodes</strong> are unlocked and ready to learn</li>
    <li>• <strong>Blue nodes</strong> can be unlocked with tokens</li>
    <li>• <strong>Gray nodes</strong> are locked (complete prerequisites first)</li>
    <li>• Complete nodes to earn XP and unlock new skills!</li>
    <li>• Earn tokens daily to unlock new content</li>
  </ul>
</div>
```

### Issues

1. **No dismissal mechanism**: No close button or click handler to hide the overlay
2. **No state management**: Always rendered, no conditional display logic
3. **No persistence**: Doesn't remember if user has seen/dismissed it
4. **Poor positioning**: Fixed `top-4 left-4` can overlap with important nodes
5. **Accessibility**: No ARIA attributes for overlay/dialog semantics

## Reproduction Steps

1. Navigate to http://localhost:3003/skill-tree
2. Observe the instructions overlay in the top-left corner
3. Try to zoom or pan the skill tree canvas
4. Notice the overlay remains fixed and blocks portions of the canvas
5. Attempt to close or dismiss the overlay → **No way to do so**
6. Refresh the page → Overlay reappears (no memory of previous visit)

## Impact Assessment

- **User Experience**: Moderate negative impact
  - Blocks canvas navigation and node interaction
  - Clutters the interface after first visit
  - Frustrating for returning users who already know how it works
  
- **Usability**: Medium severity
  - New users benefit from instructions
  - Experienced users are hindered by persistent overlay
  - No control over when to see/hide the information
  
- **Mobile/Responsive**: High impact on small screens
  - Overlay takes up significant screen real estate
  - May cover critical skill tree nodes
  - Harder to navigate around on touch devices

## Recommended Solutions

### Option 1: Dismissible Overlay with localStorage (Recommended)

Add state management and close functionality:

```tsx
const [showInstructions, setShowInstructions] = useState(() => {
  if (typeof window === 'undefined') return true
  return localStorage.getItem('skillTreeInstructionsSeen') !== 'true'
})

const handleDismissInstructions = () => {
  setShowInstructions(false)
  localStorage.setItem('skillTreeInstructionsSeen', 'true')
}

// In render:
{showInstructions && (
  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 max-w-md z-10">
    <button
      onClick={handleDismissInstructions}
      className="absolute top-2 right-2 text-slate-400 hover:text-slate-600"
      aria-label="Close instructions"
    >
      ✕
    </button>
    {/* ... existing content ... */}
  </div>
)}
```

### Option 2: Help Button Toggle

Replace permanent overlay with a toggleable help button:

```tsx
const [showHelp, setShowHelp] = useState(false)

// In Controls area:
<button
  onClick={() => setShowHelp(!showHelp)}
  className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-lg z-10"
  aria-label="Toggle help"
>
  ?
</button>

{showHelp && (
  <div className="absolute top-14 left-4 ...">
    {/* instructions content */}
  </div>
)}
```

### Option 3: Modal/Dialog Approach

Use a proper modal dialog that appears centered and can be dismissed:

```tsx
{showInstructions && (
  <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md m-4">
      {/* instructions content with close button */}
    </div>
  </div>
)}
```

## Implementation Checklist

- [ ] Add state management for overlay visibility
- [ ] Implement close button with dismiss handler
- [ ] Store dismissal state in localStorage
- [ ] Add help/info button to re-open instructions
- [ ] Improve positioning to minimize canvas obstruction
- [ ] Add proper ARIA attributes for accessibility
- [ ] Test on mobile/tablet screen sizes
- [ ] Test localStorage persistence across sessions
- [ ] Add animation for smooth show/hide transitions
- [ ] Update any related documentation

## Testing Requirements

### Manual Testing
- [ ] Verify overlay appears on first visit to `/skill-tree`
- [ ] Confirm close button dismisses the overlay
- [ ] Check localStorage stores dismissal state
- [ ] Refresh page and verify overlay doesn't reappear
- [ ] Clear localStorage and verify overlay shows again
- [ ] Test help button re-opens dismissed instructions
- [ ] Verify overlay doesn't block critical skill tree nodes
- [ ] Test on mobile (portrait and landscape)
- [ ] Test keyboard navigation (Tab, Enter, Escape)
- [ ] Verify screen reader announces overlay correctly

### Edge Cases
- [ ] SSR/hydration: Ensure no flash of hidden content
- [ ] Multiple tabs: localStorage changes reflect across tabs
- [ ] Browser privacy mode: Handle localStorage unavailability
- [ ] User zooms canvas: Overlay position remains stable
- [ ] Very small screens: Overlay remains readable

## Related Issues

- **Defect #012**: Missing useEffect import (fixed) - same component
- **Enhancement**: Consider adding tooltips on nodes as alternative to overlay
- **Enhancement**: Add animated tutorial arrows pointing to first few nodes

## Priority Justification

**Medium Priority** because:
- Blocks canvas interaction and navigation
- Affects all skill tree users on every visit
- Quick fix with significant UX improvement
- Not critical (users can work around it by panning canvas)
- Should be fixed before public release

## Effort Estimate

- **Implementation**: 30-45 minutes
- **Testing**: 15-20 minutes
- **Total**: ~1 hour

---

**Notes**: 
- Consider adding a "Don't show again" checkbox in the instructions
- Could combine with a brief introduction animation for first-time visitors
- May want to track if user has completed at least one node before permanently hiding
