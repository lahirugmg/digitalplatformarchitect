---
title: Recipient List
type: Enterprise Integration Pattern
keywords: dynamic recipients, multiple recipients, broadcast, multicast, recipient determination
---

# Recipient List

## Overview
The Recipient List pattern routes a message to a dynamically specified list of recipients. Unlike static broadcast, the list of recipients is determined at runtime based on message content, external configuration, or runtime conditions.

## Problem
When a message needs to be sent to multiple recipients, the specific set of recipients may vary based on runtime conditions. Hard-coding recipient lists creates tight coupling and makes the system inflexible. How can we route a message to a list of recipients that is determined dynamically?

## Solution
Use a Recipient List to route messages to a list of dynamically specified recipients. The pattern inspects the message or consults external configuration to determine the current list of interested parties, then sends the message to each recipient on the list. The recipient list can be contained in the message itself, stored in an external registry, or calculated based on business rules.

## Key Characteristics
- Determines recipients dynamically at runtime
- Can route to variable number of destinations
- Recipients determined by message content or external rules
- Each recipient receives a copy of the message
- Supports both sequential and parallel delivery
- Recipient list can change without code modification
- Can handle empty recipient lists gracefully

## When to Use
- Set of message recipients varies based on content or conditions
- Recipient list is maintained externally or in a registry
- Number of recipients changes over time
- Different message instances require different recipient sets
- Need to decouple sender from specific recipient knowledge
- Recipients subscribe or unsubscribe dynamically
- Routing rules are managed by business users
- Need to audit or log which recipients received messages

## Related Patterns
- Content-Based Router: Routes to single destination based on content
- Publish-Subscribe: Recipients subscribe statically to message types
- Scatter-Gather: Sends to multiple recipients and aggregates responses
- Message Dispatcher: Distributes messages to different consumers
- Dynamic Router: More general pattern for runtime routing decisions
