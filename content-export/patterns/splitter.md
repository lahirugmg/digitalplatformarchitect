---
title: Splitter
type: Enterprise Integration Pattern
keywords: message splitting, decomposition, batch processing, message breakdown, splitting
---

# Splitter

## Overview
The Splitter pattern breaks down a single message containing multiple elements into individual messages, each containing data related to one item. This enables independent processing of each element from a composite message.

## Problem
Messages may contain multiple logical items bundled together, such as a batch of orders or a collection of records. Processing systems often need to handle each item individually. How can we process a message containing multiple elements, each of which may have to be processed differently?

## Solution
Use a Splitter to break out the composite message into a series of individual messages, each containing data related to one item. The splitter examines the incoming message structure, identifies the individual elements, and creates separate messages for each element. Each resulting message can then be processed independently through the messaging system.

## Key Characteristics
- Decomposes composite messages into individual messages
- Creates one output message per logical element
- Maintains correlation between split messages if needed
- Can split based on message structure or content patterns
- Does not modify the individual element data
- Supports various splitting strategies (by count, by delimiter, by structure)
- Can include metadata about the split operation (count, sequence)

## When to Use
- Receiving batch messages that contain multiple items
- Individual items require different processing logic
- Need to process items in parallel for better performance
- Items have different priorities or destinations
- Want to apply routing logic to individual items
- Need to handle failures at the item level
- Processing capacity is based on individual items
- Different items in a batch may take different paths

## Related Patterns
- Aggregator: Opposite pattern that combines multiple messages
- Scatter-Gather: Splits messages and then re-aggregates responses
- Content-Based Router: Routes individual split messages based on content
- Composed Message Processor: Processes composite messages
- Message Sequence: Manages related messages that are part of a sequence
- Resequencer: May be needed to reorder split messages
