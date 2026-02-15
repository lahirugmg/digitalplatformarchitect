# FEAT-025: Disaster recovery and multi-region failover simulator

**Status:** Proposed
**Priority:** High
**Category:** Interactive Learning
**Effort:** Medium
**Created:** 2026-02-15

## Overview

Interactive diagram showing active-active and active-passive failover with DNS switching.

## User Story

**As an** architect
**I want** to simulate regional failover
**So that** I can design resilient multi-region systems

## Interactive Behavior

- Toggle active-active vs active-passive
- Trigger a regional outage
- Show DNS redirection and traffic shift

## Acceptance Criteria

- Failover sequence is clear and replayable
- Users can compare modes side by side
- Health status is visible per region

## Files to Create/Modify

- app/learning/disaster-recovery/page.tsx
- components/learning/disaster-recovery/*

## Estimated Effort

- Medium (2-3 weeks)
