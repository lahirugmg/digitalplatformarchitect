# FEAT-024: Caching strategies and CDN map

**Status:** Proposed
**Priority:** Medium
**Category:** Interactive Learning
**Effort:** Medium
**Created:** 2026-02-15

## Overview

Global map visualization showing cache hits vs. misses between edge and origin.

## User Story

**As an** architect
**I want** to see how CDNs reduce latency
**So that** I can design efficient delivery paths

## Interactive Behavior

- Select a user location
- Show edge vs. origin request path
- Toggle cache hit and miss scenarios

## Acceptance Criteria

- Paths update when location changes
- Hit/miss scenarios are clear
- Latency deltas are visible

## Files to Create/Modify

- app/learning/caching-cdn/page.tsx
- components/learning/caching-cdn/*

## Estimated Effort

- Medium (2-3 weeks)
