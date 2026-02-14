---
title: Broker (Message‑Brokered)
slug: broker-architecture
type: architecture-pattern
aka: broker, message-brokered
keywords: broker, queue, topic, pub/sub, routing
---

# Broker (Message‑Brokered)

## Summary
Decouple producers and consumers via a broker that routes, buffers, and delivers messages (queues/topics).

## What it is

A mediator style where components communicate indirectly through a broker. The broker handles routing (direct, fanout, topic), buffering, retries, and dead letters.

## Benefits

- Temporal decoupling and backpressure handling
- Scalable consumers (competing consumers)
- Failure isolation via DLQs and retries

## Trade-offs

- Operational complexity of the broker
- At-least-once semantics require idempotency
- Debugging multi-hop flows is harder

## When to use

- Asynchronous work dispatch and integration
- Decoupling services with variable load
- Bridging unreliable or bursty producers


