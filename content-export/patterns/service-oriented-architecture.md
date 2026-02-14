---
title: Service-Oriented Architecture (SOA)
slug: service-oriented-architecture
type: architecture-pattern
aka: SOA
keywords: contracts, reusability, governance, ESB
---

# Service-Oriented Architecture (SOA)

## Summary
Reusable, contract-driven services integrated via mediation (often ESBs) with centralized governance; a precursor to microservices.

## What it is

An architectural style organizing capabilities as interoperable services with well-defined contracts, often mediated by an ESB for routing, transformation, and policy.

## Benefits

- Promotes reuse and consistent contracts
- Centralized policy and visibility
- Good fit for heterogeneous enterprise landscapes

## Trade-offs

- Risk of central ESB becoming a bottleneck
- Tighter coupling via shared schemas and governance
- Slower change velocity vs. decentralized approaches

## When to use

- Large enterprises with many legacy systems
- Strong need for standardization and mediation
- Gradual modernization toward microservices


