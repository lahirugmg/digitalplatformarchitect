# Point-to-Point Channel

## Summary
A Point-to-Point Channel ensures that only one of the receivers on a channel will receive a particular message. It's used for direct, one-to-one communication between two applications.

## What it is
The Point-to-Point Channel pattern is used when you want to send a message from one application to another, and you want to be sure that only one receiver gets it. Even if there are multiple receivers listening on the channel, only one of them will consume the message.

This is different from a `Publish-Subscribe Channel`, where a message is broadcast to all interested receivers. A Point-to-Point Channel is like sending a letter to a specific person, while a Publish-Subscribe Channel is like posting on a public message board.

This pattern is often implemented using message queues. The sender puts a message on the queue, and one of the receivers takes it off the queue to process it. This is useful for tasks like:
*   Sending a command to a specific service.
*   Offloading work to a pool of worker processes.
*   Implementing a request/reply conversation where the reply should only go back to the original requester.
