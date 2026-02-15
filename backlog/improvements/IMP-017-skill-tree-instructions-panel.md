# IMP-017: Move skill tree progress instructions off the canvas

**Status:** Proposed
**Priority:** Medium
**Category:** UX / Skill Tree
**Effort:** Small
**Created:** 2026-02-14

## Description

The “How to Progress” instructions appear as a popup overlay that covers the skill tree diagram. Even though it can be dismissed, the overlay blocks nodes and interrupts the first-time experience.

## Current State

- Instructions appear as a floating overlay in the top-left.
- The overlay covers nodes and edges, especially on smaller screens.
- Users must dismiss the popup before they can comfortably explore the skill tree.

**Location:** [app/skill-tree/components/SkillTreeCanvas.tsx](app/skill-tree/components/SkillTreeCanvas.tsx)

## Proposed State

- Replace the overlay with a non-blocking layout element:
  - Docked side panel
  - Collapsible card above or beside the canvas
  - Tooltip/help icon that opens a lightweight panel
- Keep the existing dismiss and persistence behavior.

## Benefits

✅ Skill tree remains visible and interactive on first load
✅ Instructions are accessible without being intrusive
✅ Better usability on smaller screens

## Implementation Plan

1. Move instructions to a docked panel or collapsible card outside the canvas overlay.
2. Keep a small “Help” or “?” control that toggles instructions.
3. Preserve localStorage persistence to remember dismissal.

## Acceptance Criteria

- Instructions never cover skill tree nodes or edges.
- Users can access instructions without losing canvas visibility.
- Dismissal state persists across page reloads.

## Testing Checklist

- Verify instructions are visible on first load.
- Confirm no nodes are blocked by the instructions area.
- Dismiss and refresh to validate persistence.
- Test responsive layout on narrow screens.

## Files to Create/Modify

- [app/skill-tree/components/SkillTreeCanvas.tsx](app/skill-tree/components/SkillTreeCanvas.tsx)
- [app/skill-tree/page.tsx](app/skill-tree/page.tsx) (if layout changes are needed)

## Estimated Effort

- Small (6-12 hours)

## Dependencies

- None

## Related Issues

- UX feedback: “progress popup covers the actual diagram”

## Success Metrics

- Reduced bounce rate on the skill tree page
- More users interacting with nodes before dismissing instructions
