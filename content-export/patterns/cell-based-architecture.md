---
title: Cell‑Based Architecture
slug: cell-based-architecture
type: architecture-pattern
aka: CBA, cell architecture
keywords: cell, decentralized, cloud native, governance, DDD, API, events, composability, control plane, gateway
---

# Cell‑Based Architecture

## Summary
A decentralized, cloud‑native reference architecture where independently deployable ‘cells’ act as self‑contained units exposing APIs/events, each with its own gateway and control, enabling enterprise‑level agility, modularity, and governance.

## What it is

A reference architecture that organizes systems into self‑contained units called cells. Each cell encapsulates a cohesive set of capabilities (microservices, integrations, data, policies) and exposes well‑defined APIs, events, and streams via a cell gateway. Cells are managed with strong governance and can be composed into end‑to‑end solutions across private, public, or hybrid clouds.

## Core properties

- Scalability: elastic components and infrastructure awareness
- Modularity: versioned, replicable units with clear interfaces (DDD‑aligned)
- Composability: uniform, recursive composition via APIs, events, and streams
- Governance: managed, observable, policy‑enforced execution

## Cell building blocks

- Cell gateway: unified ingress/egress for APIs, events, and streams
- Local control plane: policy, routing, discovery, and observability
- Internal components: microservices/functions/integrations + storage
- Well‑defined interfaces: REST/gRPC, messaging, and event streams
- Security: identity, authZ policies, isolation and quotas

## Cell types

- Logic: business services, functions, microgateways
- Integration: mediation/micro‑ESB, adapters, lightweight caches
- Legacy: COTS and existing systems wrapped as cells
- External: SaaS/partner‑owned cells
- Data: databases, brokers, files as data cells
- Security: IDP and user stores
- Channel: web/mobile/IoT apps (end‑user channels)

## Benefits

- Enterprise agility via decentralized teams and bounded contexts
- Reuse and faster delivery through composable capabilities
- Consistent governance, security, and observability per cell
- Hybrid/multi‑cloud portability with clear interfaces

## Trade-offs

- Higher platform complexity (gateways/control planes and policies)
- Needs strong standards for interfaces and lifecycles
- Operational overhead vs. centralized/layered approaches

## When to use

- Enterprises evolving beyond layered/SOA to decentralized models
- Multiple autonomous teams delivering domain‑aligned capabilities
- Hybrid/multi‑cloud deployments needing strong governance
- Desire to compose new apps from existing cell capabilities


