---
title: Saga
slug: saga
type: pattern
category: Distributed Data
keywords: distributed transactions, data consistency, choreography, orchestration, compensating transactions
---

# Saga Pattern

## Summary
The Saga pattern is an architectural pattern used to manage data consistency across microservices in distributed transaction scenarios. It provides a way to execute a sequence of local transactions without relying on distributed transactions (like Two-Phase Commit).

## What it is
In a microservice architecture, a single business workflow often spans multiple services, each with its own isolated database (Database-per-service pattern). Because standard ACID transactions don't span across multiple databases, a Saga manages a distributed business process by breaking it down into a sequence of smaller, local transactions.

If a local transaction in the sequence fails, the Saga executes a series of **Compensating Transactions** that undo the changes made by the preceding local transactions.

There are two primary ways to organize a Saga:
1. **Choreography**: Each local transaction publishes domain events that trigger local transactions in other services. There is no central coordinator.
2. **Orchestration**: An overarching orchestrator (an object or service) tells each participant what local transactions to execute and tracks the state of the overall workflow.

## Trade-offs

### Pros
- **Maintains Data Consistency**: Ensures eventual consistency across distinct services without requiring slow, locking distributed transactions (2PC).
- **Scalability**: Keeps services highly decoupled and avoids locking shared resources for long periods.

### Cons
- **Complex Failure Handling**: Developers must write code for both the "forward" transaction and the "compensating" transaction to handle undo scenarios safely.
- **Lack of Isolation**: While eventually consistent, other concurrent operations might read partially committed data mid-saga (a phenomenon known as lack of Isolation in ACID).
- **Debugging Difficulty**: In Choreography, reasoning about the flow of an overall transaction across event brokers can be extremely difficult.
