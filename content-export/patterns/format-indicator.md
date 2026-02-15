# Format Indicator

## Summary
A Format Indicator is metadata that is included in a message to tell the receiver how to interpret the message's content. It allows message formats to evolve over time while maintaining compatibility.

## What it is
When applications exchange messages, they need to agree on a data format. But what happens when that format needs to change? The Format Indicator pattern solves this problem by adding information to the message that indicates its format.

This can be done in a few ways:
*   **Version Number:** A simple number or string (e.g., "1.0", "2.1") that identifies the format version.
*   **Foreign Key:** A unique ID that refers to an external schema definition.
*   **Format Document:** The schema itself is embedded within the message.

By including a Format Indicator, a receiving application can support multiple message formats. It can inspect the indicator and then choose the correct logic to process the message content. This makes the integration more robust and easier to maintain as the systems evolve.
