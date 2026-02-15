# Message Endpoint

## Summary
A Message Endpoint connects an application to a messaging system, allowing it to send and receive messages. It hides the details of the messaging infrastructure from the application's business logic.

## What it is
A Message Endpoint is the point of contact between an application and a messaging channel. It's a component that is responsible for handling the communication with the messaging system.

When an application needs to send data, it passes the data to the endpoint. The endpoint then creates a message and sends it on a specific channel. When a message arrives for the application, the endpoint receives it, extracts the data, and passes it to the application in a simple format.

By using Message Endpoints, the application's core logic doesn't need to know about the specifics of the messaging system. This makes the application easier to develop, test, and maintain. It also makes it possible to change the messaging system without having to change the application's business logic.
