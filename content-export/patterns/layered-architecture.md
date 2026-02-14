---
title: Layered Architecture
slug: layered-architecture
type: architecture-pattern
aka: n-tier
keywords: presentation, business, persistence, database, n-tier
---

# Layered Architecture

## Summary
Organize code into layers (presentation, business, persistence, database) with clear responsibilities and boundaries (often deployed across N‑tiers).

## What it is

A classic approach that separates concerns into horizontal layers. Calls flow top-to-bottom; lower layers do not depend on upper layers.

## Layers

- Presentation: UI, controllers, input validation
- Business: domain rules, use cases, orchestration
- Persistence: repositories, mappers, data access abstractions
- Database: actual storage engine and schema

## Benefits

- Clear separation of concerns and testability
- Common in teams and well understood
- Fits monoliths and simple distributed systems

## Trade-offs

- Risk of anemic domain models
- Harder to enforce boundaries in large codebases
- Vertical slices may cut across many layers (slower changes)
- Chatty calls across layers and rigidity if abstractions harden too early

## When to use

- CRUD-heavy business apps
- Stable domains with predictable workflows
- Small-to-medium teams favoring simplicity


