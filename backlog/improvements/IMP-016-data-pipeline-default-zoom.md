# IMP-016: Reduce default zoom on data pipeline choreography canvas

**Status:** Proposed
**Priority:** Medium
**Category:** UX / Playgrounds
**Effort:** Small
**Created:** 2026-02-14

## Description

The data pipeline choreography canvas loads too zoomed-in, so the center of the canvas feels cramped and users cannot see all components when they drag items into the middle of the workspace.

## Current State

- Canvas uses `fitView` with a tight zoom, resulting in a close-in default view.
- Dropped nodes in the center require manual zooming out to view the full layout.
- The initial view does not provide enough spatial context for assembling larger pipelines.

**Location:** [app/playgrounds/data-pipeline/components/DataPipelineCanvas.tsx](app/playgrounds/data-pipeline/components/DataPipelineCanvas.tsx)

## Proposed State

- Start with a slightly zoomed-out default viewport so the full workspace is visible.
- Increase `fitView` padding or provide a calmer default zoom level (e.g. `0.6` to `0.75`).
- Preserve the existing controls so users can still zoom in when needed.

## Benefits

✅ Users can see all dragged components without immediate zoom adjustments
✅ Better spatial context for composing pipelines
✅ Reduced friction in the first minute of use

## Implementation Plan

1. Update `ReactFlow` props with a `defaultViewport` (zoomed out) and `fitViewOptions` padding.
2. Lower `minZoom` slightly to allow larger pipelines.
3. Add a small helper note or tooltip if needed (optional).

## Acceptance Criteria

- On load, the canvas shows the full workspace without feeling zoomed-in.
- Dragging multiple components into the middle keeps all of them visible at once.
- Users can still zoom in/out using the existing controls.

## Testing Checklist

- Verify initial view is zoomed out on desktop.
- Add 6+ components and confirm they remain visible without zooming.
- Confirm zoom controls still work and do not clamp too aggressively.

## Files to Create/Modify

- [app/playgrounds/data-pipeline/components/DataPipelineCanvas.tsx](app/playgrounds/data-pipeline/components/DataPipelineCanvas.tsx)

## Estimated Effort

- Small (6-10 hours)

## Dependencies

- None

## Related Issues

- UX feedback: “canvas is zoomed in too much, can’t see all components in the middle”

## Success Metrics

- Fewer manual zoom adjustments during first-time use
- Reduced time-to-first-complete pipeline
