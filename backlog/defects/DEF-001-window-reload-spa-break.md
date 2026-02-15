# DEF-001: Using window.location.reload() instead of React state reset

**Status:** Open
**Severity:** Medium
**Area:** Message Flow Playground
**Created:** 2026-02-14

## Description

The reset button in message-flow playground uses `window.location.reload()` which causes a full page refresh instead of resetting state properly.

## Location

File: `app/playgrounds/message-flow/page.tsx`

## Steps to Reproduce

1. Navigate to `/playgrounds/message-flow`
2. Select a pattern and send messages
3. Click the Reset button

## Expected Behavior

Component state should reset without full page reload, maintaining smooth SPA experience

## Actual Behavior

Full page refresh occurs, losing any other state and causing flash of white screen

## Impact

- Poor user experience
- Breaks SPA navigation flow
- Loses any unsaved work in other areas
- White screen flash is unprofessional

## Proposed Solution

Replace `window.location.reload()` with proper state reset:

```typescript
const handleReset = () => {
  setMessages([]);
  setSelectedPattern(null);
  // Reset any other relevant state
};
```

## Priority

Medium - Should be fixed soon to improve UX
