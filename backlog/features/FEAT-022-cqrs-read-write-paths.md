# FEAT-022: CQRS read/write path explorer

**Status:** Proposed
**Priority:** Medium
**Category:** Interactive Learning
**Effort:** Medium
**Created:** 2026-02-15

## Overview

Side-by-side diagrams for read vs. write paths, with an event-sourcing update path.

## User Story

**As an** architect
**I want** to compare read and write models
**So that** I can understand CQRS trade-offs

## Interactive Behavior

- Toggle read vs. write path highlights
- Animate event-sourcing updates
- Show eventual consistency delay

## Acceptance Criteria

- Read/write paths are distinct and labeled
- Event flow updates the read model
- Consistency notes are visible

## Files to Create/Modify

- app/learning/cqrs/page.tsx
- components/learning/cqrs/*

## Estimated Effort

- Medium (2-3 weeks)
