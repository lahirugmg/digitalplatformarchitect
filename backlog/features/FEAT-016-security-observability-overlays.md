# FEAT-016: Component-level security and observability toggles

**Status:** Proposed
**Priority:** Medium
**Category:** Visualization
**Effort:** Small
**Created:** 2026-02-14

## Overview

Add overlays for security and observability layers in the messaging and streaming platform diagram, controlled by legend filters.

## User Story

**As a** security or platform architect
**I want** to toggle overlays for encryption, RBAC, and tracing
**So that** I can validate security and observability coverage visually

## Interactive Behavior

- Toggle TLS/mTLS, RBAC, Tracing, Audit Logs
- Highlight affected components and paths
- Combine multiple overlays

## Proposed UI

- Legend with toggle chips or checkboxes
- Subtle highlight overlays on diagram
- Summary pill of active overlays

## Acceptance Criteria

- Each overlay can be independently toggled
- Visual emphasis is clear but non-obstructive
- Multiple overlays work together without conflicts

## Files to Create/Modify

- app/blocks/messaging-streaming-platform/page.tsx
- components/messaging-streaming/*

## Estimated Effort

- Small (1 week)

## Success Metrics

- Higher engagement with the messaging and streaming platform block
- Clearer security story in architecture reviews
