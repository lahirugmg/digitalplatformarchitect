# FEAT-013: Dynamic infrastructure capacity calculator

**Status:** Proposed
**Priority:** High
**Category:** Architecture Tooling
**Effort:** Medium
**Created:** 2026-02-14

## Overview

Build a data-driven capacity planning calculator that converts traffic inputs into infrastructure sizing guidance, latency ranges, and cost estimates.

## User Story

**As an** architect
**I want** to input traffic and workload parameters
**So that** I can estimate required infrastructure, cost, and performance targets early

## Inputs

- Message size
- Target transactions per second (TPS)
- Concurrent users
- Peak multiplier (burst traffic)
- Availability target (e.g., 99.9%)

## Interactive Behavior

- Recalculate required node count as inputs change
- Suggest instance type (e.g., c5.large) based on throughput
- Show annual cost estimate
- Display latency percentiles (p50, p95, p99)

## Proposed UI

- Left: input form with sliders and numeric fields
- Right: results summary card and charts
- Inline warnings for under-provisioned or risky assumptions

## Acceptance Criteria

- Changing inputs updates recommendations in real time
- Results show nodes, instance type, cost, and latency
- Export or copy a summary for architecture docs

## Files to Create/Modify

- app/capacity-planning/page.tsx
- components/capacity-planning/*
- lib/capacity-planning.ts

## Dependencies

- None (client-side calculations)

## Estimated Effort

- Medium (1-2 weeks)

## Success Metrics

- Reduced time to size infrastructure for new designs
- Increased usage in architecture sessions
