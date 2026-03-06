---
title: Strangler Fig
slug: strangler-fig
type: pattern
category: Migration
keywords: monolith migration, refactoring, routing, proxy, facade
---

# Strangler Fig Pattern

## Summary
The Strangler Fig pattern is a risk-mitigated strategy for incrementally migrating a legacy monolithic application to a new architecture (like microservices) by gradually replacing specific pieces of functionality.

## What it is
Migrating a massive, complex legacy monolith to a new microservices architecture via a "Big Bang" rewrite is notoriously risky and failure-prone. Instead, the Strangler Fig pattern allows teams to incrementally migrate the application by replacing it piece by piece over time.

The process resembles a Strangler Fig vine that grows around a host tree, eventually replacing it entirely:
1. **Identify**: Isolate a specific feature or domain within the monolith to migrate first (e.g., User Authentication or Shopping Cart).
2. **Implement**: Build the new microservice for that specific feature.
3. **Route**: Place an intermediary layer (like an API Gateway, Reverse Proxy, or Service Mesh) in front of the monolith. Configure this proxy to intercept requests.
4. **Strangle**: Configure the proxy to route traffic for the migrated feature to the *new* microservice, while allowing all other traffic to safely fall back to the legacy monolith.
5. **Repeat**: Continue migrating features and updating the proxy until the monolith handles no traffic and can be safely decommissioned ("strangled").

## Trade-offs

### Pros
- **Risk Mitigation**: If the new microservice fails or has bugs, reversing the migration is as simple as flipping a proxy route back to the original monolith.
- **Incremental Value**: Allows organizations to deliver business value and technical improvements steadily over time, rather than waiting years for a massive rewrite to complete.
- **Zero Downtime**: The transition is invisible to end-users as the frontend applications always hit the same proxy gateway.

### Cons
- **Data Synchronization Complexity**: The hardest part of the Strangler Fig pattern is data handling. Often, the new service needs data that still lives in the monolithic database, requiring complex synchronization processes, change data capture (CDC), or temporary anti-corruption layers.
- **Routing Overhead**: The proxy layer introduces an additional network hop and point of failure that must be carefully managed.
