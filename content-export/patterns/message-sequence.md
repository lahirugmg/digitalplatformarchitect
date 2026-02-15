# Message Sequence

## Summary
A Message Sequence is a pattern used to send a large piece of data by breaking it down into a series of smaller, individual messages. Each message is marked with information that allows the receiver to reassemble the original data.

## What it is
Messaging systems often have a limit on the size of a single message. When you need to transmit data that is larger than this limit, you can use the Message Sequence pattern.

Here's how it works:
1.  The large data is split into smaller chunks.
2.  Each chunk is sent as a separate message.
3.  Each message in the sequence is tagged with special metadata in its header:
    *   **Sequence ID:** A unique ID that is the same for all messages in the sequence.
    *   **Position ID:** A number that indicates the order of the message in the sequence (e.g., 1, 2, 3...).
    *   **End Indicator:** A flag that marks the last message in the sequence.

The receiver collects the messages, uses the Sequence ID to group them, the Position ID to order them correctly, and the End Indicator to know when it has received all the parts. Once all messages in the sequence have arrived, the receiver can reassemble the original large data structure.

This pattern is often used with the `Splitter` and `Aggregator` patterns. The `Splitter` breaks the data into a sequence, and the `Aggregator` on the receiving end reassembles it.
