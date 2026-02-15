# FEAT-021: Database sharding and partitioning visualizer

**Status:** Proposed
**Priority:** Medium
**Category:** Interactive Learning
**Effort:** Medium
**Created:** 2026-02-15

## Overview

Interactive visualization that shows how a sharding key maps data to physical nodes.

## User Story

**As an** architect
**I want** to see how sharding keys route data
**So that** I can design a scalable data model

## Interactive Behavior

- Pick a sharding key (UserID, TenantID)
- Show hash routing to a node
- Compare range vs. hash partitioning

## Acceptance Criteria

- Users can input a key and see destination
- Partition strategy changes are visible
- Clear labels for nodes and shards

## Files to Create/Modify

- app/learning/sharding/page.tsx
- components/learning/sharding/*

## Estimated Effort

- Medium (2-3 weeks)
