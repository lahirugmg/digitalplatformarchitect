# FEAT-020: API gateway and service mesh journey

**Status:** Proposed
**Priority:** High
**Category:** Interactive Learning
**Effort:** Medium
**Created:** 2026-02-15

## Overview

Animated path of a request entering through an API gateway and flowing through a service mesh.

## User Story

**As an** architect
**I want** to see the edge-to-service flow
**So that** I understand routing, auth, and rate limiting

## Interactive Behavior

- Toggle edge policies (auth, rate limit, routing)
- Step through service-to-service hops
- Show security boundaries

## Acceptance Criteria

- Edge policies visibly change the flow
- Service mesh hops are traceable
- Reset returns to default path

## Files to Create/Modify

- app/learning/api-gateway-mesh/page.tsx
- components/learning/api-gateway-mesh/*

## Estimated Effort

- Medium (2-3 weeks)
