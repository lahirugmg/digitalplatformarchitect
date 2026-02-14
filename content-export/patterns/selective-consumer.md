---
title: Selective Consumer
type: Enterprise Integration Pattern
keywords: filtering, message selection, criteria-based consumption
---

# Selective Consumer

## Overview

Selective Consumer allows a message receiver to filter and consume only messages that match specific criteria, ignoring irrelevant messages on a shared channel.

## Problem

How can a message consumer receive only messages it's interested in? When multiple types of messages flow through a shared channel, a consumer may only want to process messages that meet certain criteria. Processing all messages wastes resources and complicates the receiver logic.

## Solution

Implement a Selective Consumer that specifies selection criteria when subscribing to a channel. The consumer receives only messages that match its filter criteria, while other messages pass to different consumers or are ignored.

## Key Characteristics

- **Filter Criteria**: Specifies which messages to receive
- **Selective Processing**: Processes only relevant messages
- **Resource Efficiency**: Avoids processing unwanted messages
- **Multiple Consumers**: Different consumers have different criteria
- **Expression-Based**: Uses query or filter expressions
- **Early Filtering**: Messages filtered before delivery

## When to Use

- Shared channels with heterogeneous message types
- Consumer only processes specific message categories
- Performance optimization through early filtering
- Multiple consumers with different interests
- Topic-based subscription models
- Event filtering in event-driven architectures
- Message prioritization scenarios

## Implementation Considerations

- **Filter Syntax**: Choose expressive filter language
- **Performance**: Filter evaluation should be fast
- **Message Headers**: Place filterable data in headers
- **Dynamic Filters**: Allow runtime filter updates
- **Unmatched Messages**: Handle messages no consumer wants
- **Filter Complexity**: Balance power vs simplicity

## Related Patterns

- Message Filter
- Content-Based Router
- Message
- Publish-Subscribe Channel
- Message Selector (messaging infrastructure feature)
