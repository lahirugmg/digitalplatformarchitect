# Publish-Subscribe Channel

## Summary
A Publish-Subscribe Channel is a messaging channel that broadcasts messages from a single publisher to multiple subscribers. This allows for one-to-many communication and decouples the publisher from the subscribers.

## What it is
The Publish-Subscribe Channel pattern is used when you need to send a message to multiple receivers. A publisher sends a message to the channel, and the channel delivers a copy of the message to every subscriber that is listening to that channel.

This is different from a `Point-to-Point Channel`, where only one receiver gets the message. A Publish-Subscribe Channel is like a radio broadcast - one station transmits, and many listeners can tune in.

This pattern is useful for:
*   **Event Notification:** Notifying multiple parts of an application that something has changed.
*   **Decoupling:** The publisher doesn't need to know who the subscribers are, or how many there are. This makes the system more flexible and easier to maintain.
*   **Scalability:** You can add new subscribers without affecting the publisher or the other subscribers.

Publish-Subscribe channels are a fundamental building block of event-driven architectures. They are often implemented using message brokers with features like "topics" or "fanout exchanges".
