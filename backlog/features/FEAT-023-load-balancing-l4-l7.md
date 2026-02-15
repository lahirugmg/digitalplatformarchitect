# FEAT-023: Load balancing L4 vs L7 walkthrough

**Status:** Proposed
**Priority:** Medium
**Category:** Interactive Learning
**Effort:** Small
**Created:** 2026-02-15

## Overview

Step-by-step animation comparing Layer 4 and Layer 7 routing behavior.

## User Story

**As an** architect
**I want** to see how L4 and L7 routing differ
**So that** I can choose the right balance strategy

## Interactive Behavior

- Toggle L4 vs L7
- Show routing rules based on IP/port or HTTP headers
- Highlight request distribution differences

## Acceptance Criteria

- L4 and L7 paths are visually distinct
- Rules are explained inline
- Users can replay the animation

## Files to Create/Modify

- app/learning/load-balancing/page.tsx
- components/learning/load-balancing/*

## Estimated Effort

- Small (1-2 weeks)
