---
title: Aggregator
type: Enterprise Integration Pattern
keywords: message aggregation, combining messages, correlation, batch creation, message composition
---

# Aggregator

## Overview
The Aggregator pattern combines multiple related messages into a single comprehensive message. It collects and stores individual messages until a complete set of related messages has been received, then publishes a single aggregated message to the output channel.

## Problem
In distributed systems, related information often arrives in separate messages. The receiving system may require all related data to be available together for processing. How can we combine the results of individual, but related messages so that they can be processed as a whole?

## Solution
Use an Aggregator to collect and combine related messages until a completion condition is met, then publish a single aggregated message. The aggregator uses correlation identifiers to group related messages, applies a completion strategy to determine when all expected messages have arrived, and combines the message contents using an aggregation strategy.

## Key Characteristics
- Correlates related messages using common identifiers
- Stores partial results until completion criteria are met
- Combines multiple messages into single composite message
- Supports various completion conditions (count, timeout, content)
- Handles out-of-order message arrival
- Can discard or process incomplete message sets
- Maintains state between message arrivals
- Supports both stateful and stateless aggregation strategies

## When to Use
- Related information arrives in multiple separate messages
- Complete data set needed before processing can occur
- Messages are split earlier in the process flow
- Responses from multiple services need to be combined
- Need to create batch messages from individual items
- Partial data is insufficient for business logic
- Want to reduce downstream processing by batching
- Need to wait for multiple asynchronous responses

## Related Patterns
- Splitter: Opposite pattern that breaks messages apart
- Scatter-Gather: Combines splitting and aggregation
- Composed Message Processor: Processes aggregated messages
- Message Sequence: Manages ordered related messages
- Correlation Identifier: Enables message grouping for aggregation
- Resequencer: May need to order messages before aggregation
- Process Manager: Coordinates complex aggregation scenarios
