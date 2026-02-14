---
title: Resequencer
type: Enterprise Integration Pattern
keywords: message ordering, sequence restoration, out-of-order messages, message sequence, ordering
---

# Resequencer

## Overview
The Resequencer pattern restores the proper order to a sequence of related messages that may have been received out of order. It stores out-of-sequence messages temporarily and releases them in the correct sequence.

## Problem
Messaging systems do not guarantee that messages will arrive in the same order they were sent, especially when messages travel through different routes or processing steps. Some processing logic requires messages to be processed in a specific order. How can we get a stream of related but out-of-sequence messages back into the correct order?

## Solution
Use a Resequencer to store out-of-order messages and re-release them in the proper sequence. The resequencer uses sequence information in each message (such as sequence numbers) to determine the correct order. It buffers messages until it can release them in sequence, handling missing messages through timeouts or other strategies.

## Key Characteristics
- Examines sequence information in messages
- Buffers messages until correct sequence is available
- Releases messages in proper order
- Handles missing or late-arriving messages
- Uses timeouts to prevent indefinite waiting
- Supports gap detection and notification
- Can operate in streaming or batch mode
- Maintains state of expected sequence

## When to Use
- Messages must be processed in specific order
- Parallel processing causes messages to arrive out of sequence
- Different routes have different latencies
- Message priority affects delivery order
- Need to restore original message sequence
- Dependencies exist between sequential messages
- Processing logic assumes ordered input
- Batch processing requires sorted data

## Related Patterns
- Message Sequence: Marks messages with sequence information
- Aggregator: May need resequencing before aggregation
- Splitter: May create messages that need resequencing
- Composed Message Processor: Processes ordered message sequences
- Correlation Identifier: Groups related messages for sequencing
- Content-Based Router: May cause messages to arrive out of order
- Scatter-Gather: Often requires resequencing of responses
