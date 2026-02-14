---
title: Space-Based Architecture
slug: space-based-architecture
type: architecture-pattern
aka: in-memory data grid
keywords: IMDG, grid, partitioning, replication, latency
---

# Space-Based Architecture

## Summary
Scale and resilience via partitioned, replicated in-memory data grids and collocated processing; minimizes database contention.

## What it is

A style that distributes state and processing across an in-memory grid. Requests are routed to partitions holding relevant data; replicas provide failover.

## Benefits

- Very low latency and high throughput
- Resilience via replication and partition isolation
- Reduces load on centralized databases

## Trade-offs

- Complexity in partitioning and data affinity
- State synchronization and consistency challenges
- Operational overhead for grid management

## When to use

- High-throughput, low-latency domains (trading, ecommerce)
- Hot data sets amenable to partitioning
- When DB contention or latency is a bottleneck


