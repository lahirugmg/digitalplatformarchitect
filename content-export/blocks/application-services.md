---
title: Application & Services
slug: application-services
type: building-block
keywords: applications, microservices, monoliths, business logic, saas, legacy, services
---

# Application & Services

## Summary
The foundational layer that encapsulates the enterprise's business logic and capabilities, regardless of architectural style. This block represents the 'source of truth' for business functionality.

## What it is

The foundational layer that encapsulates the enterprise's business logic and capabilities, regardless of architectural style. It includes microservices built for agility and scale, legacy applications that continue to provide critical business value, monolithic services that may still operate in certain domains, and packaged/third-party SaaS services consumed within the enterprise. This block represents the 'source of truth' for business functionality. It provides the core services that other building blocks — such as API Management, Integration, and Identity — expose, secure, orchestrate, and observe to deliver consistent digital experiences.

## Core Responsibilities

- Business logic implementation and domain expertise
- Data persistence and state management
- Business process orchestration and workflows
- Domain-specific functionality and capabilities
- Integration with external systems and services
- Compliance with business rules and regulations

## Application Architectures

- Microservices: Domain-driven, independently deployable, API-first
- Modular monoliths: Well-structured, cohesive but deployable as single unit
- Legacy applications: Critical business systems requiring modernization
- Serverless functions: Event-driven, stateless compute for specific tasks
- Hybrid architectures: Combining multiple styles based on requirements

## Service Types & Patterns

- Domain services: Core business capabilities (orders, payments, inventory)
- Application services: Cross-cutting functionality (notifications, reporting)
- Infrastructure services: Technical capabilities (caching, queuing)
- Composite services: Orchestrating multiple domain services
- Adapter services: Wrapping legacy systems with modern interfaces
- Proxy services: Mediating access to external systems

## Legacy & Modernization

- Legacy application assessment and categorization
- Strangler fig pattern for gradual modernization
- API-first facades for legacy system integration
- Event-driven modernization with change data capture
- Database modernization and data migration strategies
- Incremental refactoring and bounded context extraction

## SaaS & Third-Party Integration

- SaaS application integration and data synchronization
- Third-party API consumption and rate limiting
- Vendor lock-in mitigation and abstraction layers
- Multi-tenant SaaS configuration and customization
- SaaS security and compliance management
- Cost optimization and usage monitoring

## Development & Deployment

- Domain-driven design and bounded context definition
- API-first development with contract testing
- Continuous integration and deployment pipelines
- Feature flagging and progressive deployment
- Service mesh integration for cross-cutting concerns
- Container orchestration and cloud-native deployment

## Data Management

- Database per service pattern for data ownership
- Event sourcing and CQRS for complex domains
- Distributed transaction management and saga patterns
- Data consistency models and eventual consistency
- Caching strategies and read/write optimization
- Data archival and lifecycle management

## Quality & Reliability

- Circuit breakers and bulkhead patterns for resilience
- Health checks and readiness probes
- Distributed tracing and application performance monitoring
- Load testing and capacity planning
- Error handling and retry mechanisms
- Service-level objectives (SLOs) and error budgets

## Security & Compliance

- Application-level security controls and input validation
- Service-to-service authentication and authorization
- Data encryption at rest and in transit
- Audit logging and compliance reporting
- Vulnerability scanning and security testing
- Privacy by design and data protection

## Architecture Patterns

- Domain-driven design with bounded contexts
- Event-driven architecture with domain events
- CQRS and event sourcing for complex business logic
- Hexagonal architecture for testability and isolation
- Microservices with database per service
- Modular monolith with clear module boundaries

## Tech Examples

- Frameworks: Spring Boot, .NET Core, Node.js, Django, Ruby on Rails
- Runtimes: Java/JVM, .NET, Node.js runtime, Python, Go
- Databases: PostgreSQL, MySQL, MongoDB, Cassandra, Redis
- Messaging: Apache Kafka, RabbitMQ, AWS SQS/SNS, Azure Service Bus
- Containers: Docker, Kubernetes, OpenShift, Cloud Run
- SaaS: Salesforce, Workday, ServiceNow, Microsoft 365

## KPIs/SLIs/SLOs

- Application availability and uptime (99.5%+ for critical services)
- Response time: P50/P95/P99 latency for key business operations
- Throughput: Transactions per second and concurrent user capacity
- Error rates: Business logic errors, system errors, and timeouts
- Development velocity: Lead time for features and deployment frequency
- Business metrics: Conversion rates, user engagement, revenue impact


