---
title: Circuit Breaker
slug: circuit-breaker
type: pattern
category: Resiliency
keywords: fault tolerance, failure handling, circuit breaker, cascading failures, timeouts, retries
---

# Circuit Breaker

## Summary
The Circuit Breaker pattern prevents an application from repeatedly trying to execute an operation that is likely to fail, allowing it to continue without waiting for the fault to be fixed or wasting CPU cycles.

## What it is
In distributed systems, calls to remote resources and services can fail due to transient faults (slow network connections, timeouts, or the resource being overcommitted or temporarily unavailable). Rather than waiting for a timeout and repeatedly sending requests to a heavily loaded or broken service—which can cause cascading failures across the entire system—a Circuit Breaker acts as a proxy that monitors for failures. 

If failures reach a certain threshold, the circuit "trips" (opens) and all further calls to the circuit breaker return with an error immediately, or return a predefined fallback response, without making the call to the remote service.

The Circuit Breaker typically operates through three states:
1. **Closed**: Requests flow freely. The breaker tracks the number of recent failures.
2. **Open**: The failure threshold has been exceeded. All requests immediately fail or fallback.
3. **Half-Open**: After a timeout, the breaker lets a limited number of test requests through to check if the underlying service has recovered. If successful, it switches back to Closed. If it fails, it returns to Open.

## Trade-offs

### Pros
- **Prevents Cascading Failures**: Protects downstream services from localized network crashes or overloaded databases.
- **Fail Fast**: Instead of blocking threads while waiting for a timeout, the system rejects requests instantly, keeping latency low under load.
- **Graceful Degradation**: Can trigger fallback mechanisms (e.g., returning stale cached data or a default value) when the circuit is open.

### Cons
- **Complexity**: Requires careful tuning of failure thresholds, timeout windows, and half-open testing strategies to avoid flapping.
- **State Management**: Managing circuit state across a cluster of instances can be difficult (local memory vs. centralized store).
