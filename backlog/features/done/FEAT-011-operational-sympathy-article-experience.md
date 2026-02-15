# FEAT-011: Operational sympathy article experience

**Status:** Proposed
**Priority:** Medium
**Category:** Content Experience
**Effort:** Small
**Created:** 2026-02-14

## Description

Create a structured, skimmable article section that introduces operational sympathy, explains why it matters in cloud systems, and frames the checklist for architects.

## Key Content Blocks

- Opening summary: cloud punishes complacency, non-functional requirements are design constraints
- Mechanical sympathy analogy
- Definition of operational sympathy
- Nine key elements (summary cards)
- Closing takeaway: production exposes shortcuts

## Proposed Layout

- Hero with title, author credit, and read-time estimate
- Sectioned narrative with short paragraphs and pull quotes
- "Key elements" grid that links to checklist items
- Inline call-to-action to start the checklist

## Acceptance Criteria

- Content is concise, scannable, and readable on mobile
- All nine elements are presented before the checklist
- The checklist CTA is prominent and clear

## Files to Create/Modify

- components/operational-sympathy/ArticleIntro.tsx
- components/operational-sympathy/KeyElementsGrid.tsx

## Estimated Effort

- Small (4-8 hours)

## Related Issues

- Supports FEAT-009
