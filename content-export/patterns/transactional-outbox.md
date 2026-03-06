---
title: Transactional Outbox
slug: transactional-outbox
type: pattern
category: Distributed Data
keywords: event driven, reliable messaging, database outbox, dual write problem
---

# Transactional Outbox

## Summary
A pattern used to reliably publish events to a message broker at the exact same time state is updated in a local database, avoiding the "dual-write" problem in distributed systems.

## What it is
When a microservice needs to update a database and publish a message/event to a message broker (like Kafka or RabbitMQ) regarding that update, doing both operations introduces a distributed transaction problem. If the database update succeeds but the message broker is temporarily down, the event is never published. Conversely, if the message is published but the database transaction rolls back, downstream services act on bad data. This is called the "dual-write" problem.

The Transactional Outbox pattern solves this by:
1. Creating an "Outbox" table in the same database as the business entities.
2. Updating the business entity and inserting a record into the Outbox table within the **same local ACID database transaction**.
3. A separate, asynchronous process (like Debezium for Change Data Capture, or a polling cron job) reads the Outbox table and publishes the messages to the broker.
4. Once successfully published, the outbox record is marked as processed or deleted.

## Trade-offs

### Pros
- **Guaranteed Delivery**: Ensures "At-Least-Once" delivery of events. If the database transaction commits, the event is guaranteed to eventually be published.
- **Atomicity without 2PC**: Avoids the need for complex, locking Two-Phase Commits between the database and the message broker.

### Cons
- **Eventual Consistency**: There is a small delay between the database update taking place and the event actually appearing on the message broker.
- **At-Least-Once Duplication**: The background publisher might publish the message, crash before marking it as "sent" in the database, and then restart and publish it again. Downstream consumers **must** be idempotent.
- **Database Load**: Polling the outbox table heavily can put a load on the primary transactional database (which is why CDC tools like Debezium are often preferred over polling).
