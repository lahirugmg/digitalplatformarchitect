# Event Message

## Summary
An Event Message is used to notify other applications about a change that has occurred in the sender. It enables asynchronous, decoupled communication.

## What it is
When a significant event happens in an application (e.g., an order is placed), it creates an "event message". This message is then sent over a messaging channel, often using a publish-subscribe model. Other applications can listen for these messages and react to the events.

Event messages are asynchronous, meaning the sender doesn't wait for a response. This decouples the applications from each other, making the system more resilient and scalable. The message itself is often lightweight and may only contain an identifier for the data that has changed, rather than the full data.
