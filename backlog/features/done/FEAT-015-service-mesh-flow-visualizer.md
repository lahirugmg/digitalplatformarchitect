# FEAT-015: Live service mesh and data flow visualizer

**Status:** Proposed
**Priority:** Medium
**Category:** Visualization
**Effort:** Medium
**Created:** 2026-02-14

## Overview

Provide an interactive diagram that shows request flow through a service mesh to microservices, data stores, and queues.

## User Story

**As an** architect
**I want** to trace service-to-service flows
**So that** I can understand dependencies and bottlenecks

## Interactive Behavior

- Toggle layers: Core Components, Data Flow, Security Boundaries
- Hover states to highlight hop-by-hop path
- Pan/zoom and reset view
- Isolate a specific flow path

## Proposed UI

- Central canvas with layered diagram
- Legend panel for toggles
- Reset and isolate controls

## Acceptance Criteria

- Users can toggle layers without losing diagram context
- Path tracing highlights start to end services
- Reset returns to default view

## Files to Create/Modify

- app/service-mesh/page.tsx
- components/service-mesh/*
- lib/service-mesh.ts

## Estimated Effort

- Medium (2-3 weeks)

## Success Metrics

- Increased use of application and services block
- Improved understanding of cross-service dependencies
