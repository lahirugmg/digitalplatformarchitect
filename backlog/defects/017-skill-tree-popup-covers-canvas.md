# Defect #017: Skill Tree Instructions Popup Covers Canvas

## Status
Open

## Severity
Medium

## Description
The instructions overlay popup on the skill tree page covers/blocks the canvas, preventing users from interacting with the skill tree visualization and making it difficult to see the underlying content.

## Current Behavior
- Instructions popup appears on page load and overlays the canvas
- While dismissible (with localStorage persistence), it still obscures the skill tree visualization
- Users must close the popup before engaging with the skill tree

## Expected Behavior
- Instructions should be visible without blocking canvas interaction
- Instructions should be positioned in a way that doesn't obstruct the main skill tree visualization
- Consider: side panel, collapsible card, or modal that positions alongside content

## Technical Details
- Location: `app/skill-tree/components/SkillTreeCanvas.tsx`
- Current Implementation: Full-screen overlay div with showInstructions state
- Related: Defect #016 (made dismissible, but accessibility/UX issue remains)

## Impact
- Poor user experience, especially for first-time users
- Reduces engagement with skill tree features
- Navigation feels forced/blocked rather than supportive

## Suggested Solutions
1. **Side Panel**: Position instructions in a right sidebar that doesn't cover canvas
2. **Collapsible Card**: Place instructions above/below canvas, collapsible when not needed
3. **Modal Positioning**: Offset modal to corner or edge of screen
4. **Contextual Help**: Move instructions to a help icon with tooltip instead

## Testing
- Verify instructions are visible on first load
- Verify canvas is interactive/visible
- Verify dismiss persists across sessions via localStorage
- Test on mobile/responsive layouts
