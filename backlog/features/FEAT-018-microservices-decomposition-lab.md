# FEAT-018: Microservices decomposition lab

**Status:** Proposed
**Priority:** High
**Category:** Interactive Learning
**Effort:** Medium
**Created:** 2026-02-15

## Overview

Interactive "before and after" diagrams that show how a monolith is decomposed into microservices with database-per-service.

## User Story

**As an** architect
**I want** to visualize a monolith split into services
**So that** I can understand boundaries and data ownership

## Interactive Behavior

- Toggle monolith vs. microservices view
- Progressive reveal of service extraction
- Highlight database-per-service pattern

## Acceptance Criteria

- Users can step through decomposition stages
- Each stage explains the trade-offs
- Visual differences are clear and labeled

## Files to Create/Modify

- app/learning/microservices/page.tsx
- components/learning/microservices/*

## Estimated Effort

- Medium (2-3 weeks)
