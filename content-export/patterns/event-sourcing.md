---
title: Event Sourcing
slug: event-sourcing
type: architecture-pattern
keywords: events, audit, replay, append-only, projections
---

# Event Sourcing

## Summary
Persist changes as an immutable sequence of events; rebuild state by replaying events and produce read models via projections.

## What it is

Instead of storing only current state, every change is recorded as an event in an append-only log. Current state can be derived by replaying events; read views are built via projections.

## Benefits

- Complete audit trail and time travel
- Natural integration with CQRS and streaming
- Great for complex domain invariants and debugging

## Trade-offs

- Event design and versioning complexity
- Migration and projection rebuild costs
- Eventual consistency for read models

## When to use

- Strong auditability requirements
- Complex workflows with temporal reasoning
- High-throughput event processing with projections


