---
title: Content Filter
type: Enterprise Integration Pattern
keywords: data filtering, message simplification, data removal, message reduction, selective data
---

# Content Filter

## Overview
The Content Filter pattern removes unneeded data items from a message, leaving only the information required by the recipient. It simplifies messages by stripping out unnecessary fields, reducing message size and complexity for downstream processors.

## Problem
Messages may contain more data than the recipient requires or is authorized to access. Sending complete messages wastes bandwidth, exposes sensitive information, and forces recipients to handle unnecessary data. How can we simplify messages to include only the data items that are relevant to the recipient?

## Solution
Use a Content Filter to remove unneeded data elements from a message, leaving only the items required by the recipient. The filter examines the message structure and creates a new message containing only the specified fields or data elements, while preserving the essential information and message identity.

## Key Characteristics
- Removes unnecessary data fields from messages
- Reduces message size and complexity
- Can filter based on recipient requirements
- Preserves message identity and correlation
- Supports field-level and structural filtering
- Does not modify retained data values
- Can implement security by removing sensitive fields
- Supports both whitelist and blacklist filtering approaches

## When to Use
- Recipients need only subset of available data
- Reducing message size for performance or cost
- Implementing field-level security and authorization
- Removing sensitive data before external transmission
- Adapting messages for different recipient capabilities
- Simplifying message structure for legacy systems
- Complying with data privacy regulations
- Reducing processing overhead for simple operations
- Different consumers need different data subsets

## Related Patterns
- Content Enricher: Adds data rather than removing it
- Message Filter: Filters entire messages rather than content
- Message Translator: May combine filtering with transformation
- Claim Check: Removes data by storing externally
- Canonical Data Model: May require filtering to common subset
- Normalizer: Transforms to common format, may include filtering
- Pipes and Filters: Can include content filters in pipeline
