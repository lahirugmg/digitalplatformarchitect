# FEAT-017: AI-integrated capability matrix

**Status:** Proposed
**Priority:** Medium
**Category:** AI Strategy
**Effort:** Medium
**Created:** 2026-02-14

## Overview

Create an interactive capability matrix that shows how AI impacts platform pillars (API Management, IAM, Observability, etc.) with dynamic KPIs.

## User Story

**As an** architect
**I want** to explore AI impact by platform pillar
**So that** I can align AI investments with platform strategy

## Interactive Behavior

- Capability cards grouped by pillar
- Toggle between "AI for Code" and "Code for AI"
- KPIs update based on selected pillar
- Click into a card for use-case details

## Proposed UI

- Grid of capability cards with tags
- KPI panel on the side
- Filters for pillar and AI mode

## Acceptance Criteria

- Selecting a pillar updates KPI panel
- Card click shows use-case details
- AI mode toggle updates visible content

## Files to Create/Modify

- app/ai-capability-matrix/page.tsx
- components/ai-capability-matrix/*
- lib/ai-capability-matrix.ts

## Estimated Effort

- Medium (2-3 weeks)

## Success Metrics

- Increased engagement with AI and platform content
- Better clarity in AI capability planning
