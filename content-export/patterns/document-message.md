# Document Message

## Summary
A Document Message is a message that contains a complete data structure or "document". The content of the message is the most important part, and the receiver can process it as a self-contained unit of information.

## What it is
The Document Message pattern is used to transfer a full data structure between applications. Unlike an Event Message, where the notification of an event is the primary concern, a Document Message is all about the data it carries.

Think of it like attaching a file to an email. The "file" (the document) has all the information needed for the receiver to do its work. The message body might be an XML document, a JSON object, or any other data format.

This pattern is useful when you need to send a complete set of data to another system. For example, sending a purchase order to a fulfillment system, or sending customer data to a CRM. The receiving application gets all the data at once and can decide what to do with it.
