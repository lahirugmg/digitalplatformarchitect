---
title: N‑Tier (Client‑Server) Architecture
slug: client-server
type: architecture-pattern
keywords: n-tier, request/response, network, api, rpc
---

# N‑Tier (Client‑Server) Architecture

## Summary
Multi-tier runtime architecture (e.g., presentation, application, data) where clients request services from servers across tiers.

## What it is

A foundational distributed style evolving from 2‑tier to N‑tier deployments: presentation (UI), application/services, and data tiers communicate over a network.

## Benefits

- Simplicity and clear boundaries
- Centralized control, security, and scaling
- Ubiquitous across web and enterprise

## Distinctions vs. Layered Architecture

- N‑tier describes deployment/runtime tiers; layered describes code organization
- Many systems use both: layered code deployed across N runtime tiers

## Trade-offs

- Server bottlenecks and single points of failure
- State management and session handling
- Latency sensitivity for chatty protocols


