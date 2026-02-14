---
title: Microservice Architecture
slug: microservice-architecture
type: architecture-pattern
keywords: domain, independent deploy, api, events, devops
---

# Microservice Architecture

## Summary
Independent, deployable services aligned to business domains, communicating via APIs, events, or streams.

## What it is

A distributed style decomposing systems into small services owned by autonomous teams, enabling independent releases and scaling.

## Responsibilities

- Each service owns its data and contracts
- Resilience patterns: retries, timeouts, circuit breakers
- Observability and platform guardrails

## Patterns

- Domain-driven boundaries
- Saga and outbox for consistency
- BFF for tailored client APIs
- Service mesh for zero trust

## Trade-offs

- Operational complexity and higher cognitive load
- Distributed systems failure modes
- Testing and data consistency become harder

## When to use

- Complex, evolving domains with many teams
- Need for independent scaling and releases
- Strong platform engineering in place


