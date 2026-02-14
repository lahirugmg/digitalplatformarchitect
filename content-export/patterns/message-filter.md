---
title: Message Filter
type: Enterprise Integration Pattern
keywords: filtering, message filtering, selective consumption, unwanted messages, message selection
---

# Message Filter

## Overview
The Message Filter pattern examines incoming messages and selectively passes only those that meet specified criteria to the next processing step. Messages that do not meet the criteria are discarded or routed to an alternate destination.

## Problem
An application may receive messages on a channel but is only interested in a subset of those messages. Processing all messages would waste resources and could lead to errors. How can a component avoid receiving uninteresting messages in the first place, or quickly discard them if they arrive?

## Solution
Use a Message Filter to eliminate undesired messages from a channel based on a set of criteria. The filter examines each message and either passes it through unchanged or discards it based on the filter logic. The filtering criteria can be based on message content, headers, properties, or metadata.

## Key Characteristics
- Examines messages against defined criteria
- Passes matching messages unchanged
- Discards or redirects non-matching messages
- Can filter based on content, headers, or metadata
- Reduces processing load on downstream components
- Does not modify messages that pass through
- Can be chained with other filters for complex selection

## When to Use
- Receiving messages from shared channels with mixed content
- Only a subset of messages is relevant for processing
- Need to reduce message volume to downstream systems
- Want to prevent invalid or incomplete messages from processing
- Need to implement quality gates in message flow
- Different message types share the same channel
- Need to filter out duplicate messages
- Regulatory or security requirements mandate message filtering

## Related Patterns
- Content-Based Router: Routes messages to different destinations rather than filtering
- Message Selector: Filters at the receiver rather than in the channel
- Pipes and Filters: Can include message filters in processing pipeline
- Wire Tap: Observes messages without filtering
- Selective Consumer: Consumer chooses which messages to receive
