---
title: Content Enricher
type: Enterprise Integration Pattern
keywords: data enrichment, message enhancement, data augmentation, supplemental data, message transformation
---

# Content Enricher

## Overview
The Content Enricher pattern accesses an external data source to augment a message with additional information. It adds missing data elements to messages, making them more useful for downstream processing without requiring the sender to include all possible data.

## Problem
Messages often contain only essential or identifying information, but downstream processors may require additional data. Requiring senders to include all possible data creates unnecessary coupling and message overhead. How can we communicate with another system if the message originator does not have all the required data items available?

## Solution
Use a Content Enricher to access an external data source to supplement the message with the missing information. The enricher extracts key identifiers from the message, queries one or more data sources using those identifiers, and adds the retrieved information to the message before forwarding it to the next processing step.

## Key Characteristics
- Augments messages with additional data
- Queries external data sources based on message content
- Does not remove existing message content
- Can retrieve data from multiple sources
- Supports both synchronous and asynchronous enrichment
- Maintains message identity and correlation
- Can cache frequently accessed enrichment data
- Handles missing or unavailable enrichment data gracefully

## When to Use
- Messages lack complete information for processing
- Sender should not know about all required data
- Need to add reference data or master data
- Reducing initial message size for efficiency
- Enrichment data changes independently from message flow
- Multiple sources provide supplemental information
- Need to translate codes to descriptions
- Adding computed or derived values to messages
- Augmenting with real-time data from external services

## Related Patterns
- Content Filter: Removes data rather than adding it
- Message Translator: Transforms message structure
- Claim Check: Retrieves previously stored data
- Normalizer: Converts different formats to common format
- Pipes and Filters: Can include enricher in processing pipeline
- Service Activator: May invoke enrichment services
- External Service Gateway: Accesses enrichment data sources
