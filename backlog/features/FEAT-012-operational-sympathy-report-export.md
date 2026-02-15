# FEAT-012: Operational sympathy report export

**Status:** Proposed
**Priority:** Low
**Category:** Reporting
**Effort:** Small
**Created:** 2026-02-14

## Description

Allow users to export the checklist results as a report (markdown or PDF) and optionally share a link with stakeholders.

## Proposed Capabilities

- Export score summary, per-element scores, and recommendations
- Download as markdown or PDF
- Optional copy-to-clipboard summary

## Acceptance Criteria

- Users can export a report with the total score and interpretation
- Report includes all nine element scores and guidance
- Export does not require authentication

## Files to Create/Modify

- components/operational-sympathy/ReportExport.tsx
- lib/operational-sympathy.ts (export helpers)

## Estimated Effort

- Small (4-6 hours)

## Related Issues

- Optional enhancement to FEAT-009
