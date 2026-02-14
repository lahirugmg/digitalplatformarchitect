---
title: Message Store
type: Enterprise Integration Pattern
keywords: persistence, storage, archival, audit
---

# Message Store

## Overview

Message Store captures and persists message information in a central repository, enabling message replay, audit trails, and historical analysis.

## Problem

How can you report and query message information without consuming the messages? Messages flowing through channels are transient - once consumed, they're gone. But many scenarios require persistent storage of messages for auditing, compliance, replay, or analysis.

## Solution

Use a Message Store to capture and persist copies of messages passing through the system. The store maintains messages in a central repository where they can be queried, analyzed, replayed, or used for audit purposes without affecting the primary message flow.

## Key Characteristics

- **Persistence**: Messages stored durably
- **Queryable**: Search and retrieve historical messages
- **Replay Capability**: Re-send stored messages
- **Audit Trail**: Complete message history
- **Non-intrusive**: Doesn't affect message flow
- **Centralized**: Single repository for all messages

## When to Use

- Regulatory compliance and audit requirements
- Message replay for error recovery
- Business intelligence and analytics
- Debugging and troubleshooting
- Historical data analysis
- Dispute resolution
- System testing with real data

## Implementation Considerations

- **Storage Capacity**: Messages can accumulate quickly
- **Query Performance**: Indexing strategy is important
- **Retention Policy**: Define how long to keep messages
- **Security**: Protect sensitive message data
- **Partitioning**: Distribute storage for scalability
- **Backup and Recovery**: Ensure data durability

## Related Patterns

- Wire Tap
- Message History
- Message Channel
- Message Endpoint
- Test Message
