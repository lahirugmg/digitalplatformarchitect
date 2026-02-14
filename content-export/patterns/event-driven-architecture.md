---
title: Event-Driven Architecture
slug: event-driven-architecture
type: architecture-pattern
keywords: events, pub/sub, async, streaming, eda
---

# Event-Driven Architecture

## Summary
Systems communicate through events, enabling loose coupling, async workflows, and reactive behavior.

## What it is

Producers emit events describing facts; consumers react asynchronously. Brokers or streaming platforms handle delivery and retention.

## Patterns

- Pub/sub via topics
- Event sourcing + CQRS
- Choreography vs. orchestration
- CDC for legacy integration

## Distinctions (pub/sub vs. event sourcing vs. CQRS + events)

- Pub/Sub: fire-and-forget notifications or data distribution; consumers act independently; minimal state in the broker
- Event Sourcing: events are the source of truth for state; rebuild state by replaying the event log
- CQRS + Events: separate write and read models; events propagate changes to build optimized read projections

## Trade-offs

- Complexity in reasoning about flow
- Event contract governance is critical
- Eventual consistency impacts UX and design

## When to use

- High throughput, decoupled workloads
- Real-time analytics and streaming ETL
- Integrating heterogeneous systems asynchronously


