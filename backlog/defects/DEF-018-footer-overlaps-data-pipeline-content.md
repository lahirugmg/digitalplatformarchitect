# DEF-018: Footer overlaps data pipeline content

**Status:** Open
**Severity:** Medium
**Category:** UI/Layout
**Found:** 2026-02-14

## Description

On the data pipeline playground page, the footer overlaps the content area. This causes the bottom portion of the canvas or right-side panel to be hidden and creates a visual clash between the footer and interactive content.

## Current Behavior

- The footer appears on top of the data pipeline page content.
- Content near the bottom edge is partially obscured.
- Users may miss controls or status elements that sit low on the page.

## Expected Behavior

- The footer should sit below the main content area without overlapping it.
- The playground should occupy the full available height without being covered.

## Impact

- Reduced usability for the playground
- Potentially hides interactive elements or status panels

## Notes

- Page: Data Pipeline Choreography playground
- Likely related to full-height layout (`h-screen`) in the page layout combined with the global footer

## Suggested Fix

- Use `min-h-screen` instead of `h-screen` for the playground layout
- Add bottom padding or set container height to `calc(100vh - header - footer)`
- Ensure the footer is outside the main playground container

## Testing

- Verify the footer no longer overlaps the canvas or side panels
- Confirm the bottom of the canvas remains visible at typical viewport sizes
- Check behavior on smaller screens
