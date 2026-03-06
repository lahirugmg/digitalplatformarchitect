---
title: Backends for Frontends (BFF)
slug: bff
type: pattern
category: API Design
keywords: api gateway, facade, mobile, web, graphql, experience api
---

# Backends for Frontends (BFF)

## Summary
The Backends for Frontends (BFF) pattern involves creating one dedicated backend API (or experience API) per user interface (or client type), rather than forcing all user interfaces to consume a single, generic enterprise API.

## What it is
In modern applications, a single backend is often consumed by vastly different clients: web browsers, native mobile apps, smartwatches, voice assistants, and third-party consumers. Each of these clients has entirely different constraints regarding screen size, network capability, processing power, and user flow.

A single "one-size-fits-all" API usually performs poorly across these distinct clients, forcing mobile apps to over-fetch unused data, or requiring clients to make dozens of chatty API calls to aggregate data themselves.

The BFF pattern dictates that a dedicated API layer is created *specifically* for a particular user interface. For example, the Mobile Development team builds and maintains an "iOS BFF." The Web team builds a "Web Desktop BFF."

These BFFs sit between the client and the downstream microservices. They are responsible for:
- **Aggregating** requests from multiple downstream domain services into a single response.
- **Formatting and Filtering** the data exactly as the UI needs it to prevent over-fetching.
- **Protocol Translation**, perhaps exposing a GraphQL interface to the frontend while communicating via gRPC to the backend services.

## Trade-offs

### Pros
- **Optimized Client Performance**: Clients receive precisely the data they need in exactly the format they need it, reducing payload size and network round-trips.
- **Team Autonomy**: Frontend teams can own and manage their specific BFF without waiting for deep-backend teams to add fields or modify endpoints.
- **Separation of Concerns**: Protects downstream microservices from containing UI-specific formatting logic.

### Cons
- **Code Duplication**: Multiple BFFs might end up duplicating aggregation or authorization logic. (This can be mitigated by moving core logic down to domain services).
- **Maintenance Burden**: Replaces one generalized API layer with multiple specialized ones, increasing the number of deployed artifacts that must be monitored and maintained.
