# Correlation Identifier

## Summary
A Correlation Identifier is a unique ID that is added to a request message and is then returned in the corresponding reply message, allowing the requester to match replies with their original requests in an asynchronous system.

## What it is
In asynchronous messaging systems, when a requester sends a message, it doesn't wait for a reply. The reply can arrive at any time. To associate the reply with the original request, the requester generates a unique ID (the Correlation Identifier) and adds it to the request message's header.

When the replier processes the request, it copies this Correlation Identifier to the reply message. When the requester receives the reply, it uses the Correlation Identifier to find the original request and process the reply in the correct context.

This pattern is essential for implementing request/reply conversations over asynchronous messaging channels. It's also a fundamental building block for distributed tracing, allowing you to track a single transaction as it flows through multiple services.
