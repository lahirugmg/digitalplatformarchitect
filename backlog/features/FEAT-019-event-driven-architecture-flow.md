# FEAT-019: Event-driven architecture flow explorer

**Status:** Proposed
**Priority:** High
**Category:** Interactive Learning
**Effort:** Medium
**Created:** 2026-02-15

## Overview

Interactive flowchart that shows how events move from producers to topics and multiple consumers.

## User Story

**As an** architect
**I want** to follow an event lifecycle
**So that** I can reason about decoupling and scalability

## Interactive Behavior

- Step through event lifecycle stages
- Highlight producers, topics, and consumers
- Toggle fan-out and retry scenarios

## Acceptance Criteria

- Event flow is clear and sequential
- Users can toggle multiple consumers
- Failure path is visible

## Files to Create/Modify

- app/learning/event-driven/page.tsx
- components/learning/event-driven/*

## Estimated Effort

- Medium (2-3 weeks)
