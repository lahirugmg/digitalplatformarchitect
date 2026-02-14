---
title: Scatter-Gather
type: Enterprise Integration Pattern
keywords: broadcast and aggregate, request-reply, parallel processing, fan-out fan-in, broadcast
---

# Scatter-Gather

## Overview
The Scatter-Gather pattern broadcasts a message to multiple recipients and re-aggregates the responses back into a single message. It combines the recipient list and aggregator patterns to distribute work and collect results.

## Problem
When a single request requires information from multiple sources, sending sequential requests is inefficient. The system needs to query multiple endpoints in parallel and combine their responses. How can we maintain the overall message flow when a message needs to be sent to multiple recipients, each of which may send a reply?

## Solution
Use Scatter-Gather to broadcast a message to multiple recipients and then use an aggregator to collect and combine the responses into a single reply message. The scatter phase distributes the request to all recipients (either all known recipients or a dynamic list), and the gather phase waits for responses and aggregates them based on correlation identifiers.

## Key Characteristics
- Broadcasts message to multiple recipients in parallel
- Collects and correlates responses from all recipients
- Aggregates responses into single result message
- Supports timeout for non-responsive recipients
- Can handle partial responses when some recipients fail
- Improves performance through parallel execution
- Maintains correlation between request and responses
- Supports both best-effort and guaranteed response collection

## When to Use
- Need information from multiple sources for single operation
- Parallel processing improves response time
- Want to compare or combine results from multiple providers
- Implementing quote comparison or price checking
- Distributing work across multiple processors
- Need redundancy with multiple service providers
- Aggregating search results from multiple sources
- Collecting bids or proposals from multiple participants

## Related Patterns
- Recipient List: Scatter phase uses dynamic recipient determination
- Aggregator: Gather phase uses aggregation logic
- Request-Reply: Each recipient interaction follows request-reply
- Correlation Identifier: Links requests with responses
- Splitter: May split message before scattering
- Composed Message Processor: Processes the aggregated results
- Competing Consumers: Alternative for parallel processing
