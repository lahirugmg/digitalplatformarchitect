export type Pattern = {
  slug: string;
  title: string;
  aka?: string[];
  summary: string;
  sections: Array<
    | { kind: "text"; title: string; body: string }
    | { kind: "list"; title: string; items: string[] }
  >;
  keywords: string[];
};

export const patterns: Record<string, Pattern> = {
  "cell-based-architecture": {
    slug: "cell-based-architecture",
    title: "Cell‑Based Architecture",
    aka: ["CBA", "cell architecture"],
    summary:
      "A decentralized, cloud‑native reference architecture where independently deployable ‘cells’ act as self‑contained units exposing APIs/events, each with its own gateway and control, enabling enterprise‑level agility, modularity, and governance.",
    keywords: [
      "cell",
      "decentralized",
      "cloud native",
      "governance",
      "DDD",
      "API",
      "events",
      "composability",
      "control plane",
      "gateway"
    ],
    sections: [
      { kind: "text", title: "What it is", body:
        "A reference architecture that organizes systems into self‑contained units called cells. Each cell encapsulates a cohesive set of capabilities (microservices, integrations, data, policies) and exposes well‑defined APIs, events, and streams via a cell gateway. Cells are managed with strong governance and can be composed into end‑to‑end solutions across private, public, or hybrid clouds." },
      { kind: "list", title: "Core properties", items: [
        "Scalability: elastic components and infrastructure awareness",
        "Modularity: versioned, replicable units with clear interfaces (DDD‑aligned)",
        "Composability: uniform, recursive composition via APIs, events, and streams",
        "Governance: managed, observable, policy‑enforced execution"
      ]},
      { kind: "list", title: "Cell building blocks", items: [
        "Cell gateway: unified ingress/egress for APIs, events, and streams",
        "Local control plane: policy, routing, discovery, and observability",
        "Internal components: microservices/functions/integrations + storage",
        "Well‑defined interfaces: REST/gRPC, messaging, and event streams",
        "Security: identity, authZ policies, isolation and quotas"
      ]},
      { kind: "list", title: "Cell types", items: [
        "Logic: business services, functions, microgateways",
        "Integration: mediation/micro‑ESB, adapters, lightweight caches",
        "Legacy: COTS and existing systems wrapped as cells",
        "External: SaaS/partner‑owned cells",
        "Data: databases, brokers, files as data cells",
        "Security: IDP and user stores",
        "Channel: web/mobile/IoT apps (end‑user channels)"
      ]},
      { kind: "list", title: "Benefits", items: [
        "Enterprise agility via decentralized teams and bounded contexts",
        "Reuse and faster delivery through composable capabilities",
        "Consistent governance, security, and observability per cell",
        "Hybrid/multi‑cloud portability with clear interfaces"
      ]},
      { kind: "list", title: "Trade-offs", items: [
        "Higher platform complexity (gateways/control planes and policies)",
        "Needs strong standards for interfaces and lifecycles",
        "Operational overhead vs. centralized/layered approaches"
      ]},
      { kind: "list", title: "When to use", items: [
        "Enterprises evolving beyond layered/SOA to decentralized models",
        "Multiple autonomous teams delivering domain‑aligned capabilities",
        "Hybrid/multi‑cloud deployments needing strong governance",
        "Desire to compose new apps from existing cell capabilities"
      ]}
    ]
  },
  "layered-architecture": {
    slug: "layered-architecture",
    title: "Layered Architecture",
    aka: ["n-tier"],
    summary:
      "Organize code into layers (presentation, business, persistence, database) with clear responsibilities and boundaries (often deployed across N‑tiers).",
    keywords: ["presentation", "business", "persistence", "database", "n-tier"],
    sections: [
      {
        kind: "text",
        title: "What it is",
        body:
          "A classic approach that separates concerns into horizontal layers. Calls flow top-to-bottom; lower layers do not depend on upper layers."
      },
      { kind: "list", title: "Layers", items: [
        "Presentation: UI, controllers, input validation",
        "Business: domain rules, use cases, orchestration",
        "Persistence: repositories, mappers, data access abstractions",
        "Database: actual storage engine and schema"
      ]},
      { kind: "list", title: "Benefits", items: [
        "Clear separation of concerns and testability",
        "Common in teams and well understood",
        "Fits monoliths and simple distributed systems"
      ]},
      { kind: "list", title: "Trade-offs", items: [
        "Risk of anemic domain models",
        "Harder to enforce boundaries in large codebases",
        "Vertical slices may cut across many layers (slower changes)",
        "Chatty calls across layers and rigidity if abstractions harden too early"
      ]},
      { kind: "list", title: "When to use", items: [
        "CRUD-heavy business apps",
        "Stable domains with predictable workflows",
        "Small-to-medium teams favoring simplicity"
      ]}
    ]
  },
  "microservice-architecture": {
    slug: "microservice-architecture",
    title: "Microservice Architecture",
    summary:
      "Independent, deployable services aligned to business domains, communicating via APIs, events, or streams.",
    keywords: ["domain", "independent deploy", "api", "events", "devops"],
    sections: [
      { kind: "text", title: "What it is", body:
        "A distributed style decomposing systems into small services owned by autonomous teams, enabling independent releases and scaling." },
      { kind: "list", title: "Responsibilities", items: [
        "Each service owns its data and contracts",
        "Resilience patterns: retries, timeouts, circuit breakers",
        "Observability and platform guardrails"
      ]},
      { kind: "list", title: "Patterns", items: [
        "Domain-driven boundaries",
        "Saga and outbox for consistency",
        "BFF for tailored client APIs",
        "Service mesh for zero trust"
      ]},
      { kind: "list", title: "Trade-offs", items: [
        "Operational complexity and higher cognitive load",
        "Distributed systems failure modes",
        "Testing and data consistency become harder"
      ]},
      { kind: "list", title: "When to use", items: [
        "Complex, evolving domains with many teams",
        "Need for independent scaling and releases",
        "Strong platform engineering in place"
      ]}
    ]
  },
  "event-driven-architecture": {
    slug: "event-driven-architecture",
    title: "Event-Driven Architecture",
    summary:
      "Systems communicate through events, enabling loose coupling, async workflows, and reactive behavior.",
    keywords: ["events", "pub/sub", "async", "streaming", "eda"],
    sections: [
      { kind: "text", title: "What it is", body:
        "Producers emit events describing facts; consumers react asynchronously. Brokers or streaming platforms handle delivery and retention." },
      { kind: "list", title: "Patterns", items: [
        "Pub/sub via topics",
        "Event sourcing + CQRS",
        "Choreography vs. orchestration",
        "CDC for legacy integration"
      ]},
      { kind: "list", title: "Distinctions (pub/sub vs. event sourcing vs. CQRS + events)", items: [
        "Pub/Sub: fire-and-forget notifications or data distribution; consumers act independently; minimal state in the broker",
        "Event Sourcing: events are the source of truth for state; rebuild state by replaying the event log",
        "CQRS + Events: separate write and read models; events propagate changes to build optimized read projections"
      ]},
      { kind: "list", title: "Trade-offs", items: [
        "Complexity in reasoning about flow",
        "Event contract governance is critical",
        "Eventual consistency impacts UX and design"
      ]},
      { kind: "list", title: "When to use", items: [
        "High throughput, decoupled workloads",
        "Real-time analytics and streaming ETL",
        "Integrating heterogeneous systems asynchronously"
      ]}
    ]
  },
  "client-server": {
    slug: "client-server",
    title: "N‑Tier (Client‑Server) Architecture",
    summary:
      "Multi-tier runtime architecture (e.g., presentation, application, data) where clients request services from servers across tiers.",
    keywords: ["n-tier", "request/response", "network", "api", "rpc"],
    sections: [
      { kind: "text", title: "What it is", body:
        "A foundational distributed style evolving from 2‑tier to N‑tier deployments: presentation (UI), application/services, and data tiers communicate over a network." },
      { kind: "list", title: "Benefits", items: [
        "Simplicity and clear boundaries",
        "Centralized control, security, and scaling",
        "Ubiquitous across web and enterprise"
      ]},
      { kind: "list", title: "Distinctions vs. Layered Architecture", items: [
        "N‑tier describes deployment/runtime tiers; layered describes code organization",
        "Many systems use both: layered code deployed across N runtime tiers"
      ]},
      { kind: "list", title: "Trade-offs", items: [
        "Server bottlenecks and single points of failure",
        "State management and session handling",
        "Latency sensitivity for chatty protocols"
      ]}
    ]
  },
  "plugin-based": {
    slug: "plugin-based",
    title: "Microkernel / Plugin Architecture",
    aka: ["microkernel", "plug-in", "modular architecture"],
    summary:
      "Core system exposes extension points; features are delivered as plugins loaded at runtime or build time.",
    keywords: ["extensibility", "plugins", "modules", "extensions"],
    sections: [
      { kind: "text", title: "What it is", body:
        "A modular approach where the host provides contracts and lifecycle hooks, and plugins implement optional features independently. Resonates with OSGi/Eclipse RCP and modern modular frameworks." },
      { kind: "list", title: "Benefits", items: [
        "Extensible and customizable platforms",
        "Isolated failure and independent delivery",
        "Encourages inner-source and community"
      ]},
      { kind: "list", title: "Trade-offs", items: [
        "Versioning and compatibility management",
        "Security and sandboxing of plugins",
        "Discovery and dependency management"
      ]}
    ]
  },
  "hexagonal-architecture": {
    slug: "hexagonal-architecture",
    title: "Hexagonal Architecture",
    aka: ["ports and adapters"],
    summary:
      "Domain-centric design separating core logic from external concerns via ports (interfaces) and adapters.",
    keywords: ["ports", "adapters", "domain", "testing", "isolation"],
    sections: [
      { kind: "text", title: "What it is", body:
        "Core business logic depends only on abstractions (ports); adapters implement I/O concerns like databases, brokers, and HTTP." },
      { kind: "list", title: "Benefits", items: [
        "High testability and substitution of infrastructures",
        "Clear boundaries and dependency inversion",
        "Supports both monoliths and services"
      ]},
      { kind: "list", title: "Distinctions vs. Clean Architecture", items: [
        "Hexagonal emphasizes external I/O at the boundary via ports/adapters",
        "Clean emphasizes concentric layers and the dependency rule",
        "Both are domain‑centric; naming and diagrams differ more than intent"
      ]},
      { kind: "list", title: "Trade-offs", items: [
        "More boilerplate (ports, adapters, mappers)",
        "Requires discipline in large teams"
      ]}
    ]
  },
  "clean-architecture": {
    slug: "clean-architecture",
    title: "Clean Architecture",
    aka: ["uncle bob", "screaming architecture"],
    summary:
      "Domain‑centric, dependency‑inversion style family emphasizing concentric layers (entities, use cases, interfaces) and the Dependency Rule.",
    keywords: ["use cases", "entities", "dependency rule"],
    sections: [
      { kind: "text", title: "What it is", body:
        "Best viewed as a family of domain‑centered, dependency‑inversion styles (closely related to Hexagonal and Onion). Many teams use it as a style; others apply its principles (boundaries, Dependency Rule, use‑case orientation) within other patterns." },
      { kind: "list", title: "Benefits", items: [
        "Framework-agnostic domain core",
        "Improved testability and maintainability"
      ]},
      { kind: "list", title: "Distinctions vs. Hexagonal", items: [
        "Clean organizes the code into rings (entities, use cases, interfaces)",
        "Hexagonal organizes around ports/adapters for I/O",
        "Teams often combine both; treat them as a family of domain‑centric styles"
      ]}
    ]
  },
  "cqrs": {
    slug: "cqrs",
    title: "CQRS",
    aka: ["Command Query Responsibility Segregation"],
    summary:
      "Separate write and read models to optimize for different workloads; often paired with events.",
    keywords: ["reads", "writes", "event sourcing", "materialized views"],
    sections: [
      { kind: "text", title: "What it is", body:
        "Commands mutate write models; queries read denormalized projections. Enables scaling and performance tuning per side." },
      { kind: "list", title: "Trade-offs", items: [
        "Eventual consistency",
        "More moving parts and governance"
      ]}
    ]
  },
  "serverless": {
    slug: "serverless",
    title: "Serverless",
    summary:
      "Event-driven functions and managed services with autoscaling and pay-per-use.",
    keywords: ["faas", "managed services", "scale to zero"],
    sections: [
      { kind: "text", title: "What it is", body:
        "A deployment model using functions, managed databases, and event sources. Reduces ops burden but couples to provider runtime." },
      { kind: "list", title: "Trade-offs", items: [
        "Cold starts and latency variance",
        "Observability and local dev challenges",
        "Vendor lock-in considerations"
      ]}
    ]
  },
  "monolithic": {
    slug: "monolithic",
    title: "Monolithic Architecture",
    summary:
      "Single deployable unit combining multiple modules. Simple operationally and effective for many products.",
    keywords: ["single deploy", "simplicity", "cohesion"],
    sections: [
      { kind: "text", title: "What it is", body:
        "A cohesive application packaged and deployed as one unit. Can still be well-modularized internally with clear boundaries." },
      { kind: "list", title: "Benefits", items: [
        "Operational simplicity and easier debugging",
        "Easier local development",
        "Great for small teams and early stages"
      ]},
      { kind: "list", title: "Trade-offs", items: [
        "Scale and release coupling",
        "Risk of big-ball-of-mud without discipline"
      ]}
    ]
  }
  ,
  "domain-centric-architecture": {
    slug: "domain-centric-architecture",
    title: "Domain-Centric Architecture",
    aka: ["onion/hexagonal/clean family", "DDD-aligned", "domain-centric layering"],
    summary:
      "A family of styles that place the domain model and use cases at the center, enforcing boundaries and dependency inversion.",
    keywords: ["domain", "boundaries", "ports", "dependency rule", "DDD"],
    sections: [
      { kind: "text", title: "What it is", body:
        "Unifies Hexagonal (ports & adapters), Onion, and Clean Architecture. Each expresses the same core ideas with different emphasis and diagrams." },
      { kind: "list", title: "Common principles", items: [
        "Explicit boundaries between domain and infrastructure",
        "Dependency rule: point inwards toward higher-level policies",
        "Ports (interfaces) decouple core from adapters (I/O)",
        "Testability via domain isolation and replaceable adapters"
      ]},
      { kind: "list", title: "Benefits", items: [
        "Long-term maintainability and flexibility",
        "Framework-agnostic domain core",
        "Facilitates microservices and modular monoliths"
      ]},
      { kind: "list", title: "Trade-offs", items: [
        "More abstractions and boilerplate",
        "Requires discipline and shared understanding"
      ]},
      { kind: "list", title: "When to use", items: [
        "Evolving domains with complex business rules",
        "Need to swap infrastructures (DBs, brokers, UI)",
        "Desire for high testability and clear boundaries"
      ]}
    ]
  },
  
  "service-oriented-architecture": {
    slug: "service-oriented-architecture",
    title: "Service-Oriented Architecture (SOA)",
    aka: ["SOA"],
    summary:
      "Reusable, contract-driven services integrated via mediation (often ESBs) with centralized governance; a precursor to microservices.",
    keywords: ["contracts", "reusability", "governance", "ESB"],
    sections: [
      { kind: "text", title: "What it is", body:
        "An architectural style organizing capabilities as interoperable services with well-defined contracts, often mediated by an ESB for routing, transformation, and policy." },
      { kind: "list", title: "Benefits", items: [
        "Promotes reuse and consistent contracts",
        "Centralized policy and visibility",
        "Good fit for heterogeneous enterprise landscapes"
      ]},
      { kind: "list", title: "Trade-offs", items: [
        "Risk of central ESB becoming a bottleneck",
        "Tighter coupling via shared schemas and governance",
        "Slower change velocity vs. decentralized approaches"
      ]},
      { kind: "list", title: "When to use", items: [
        "Large enterprises with many legacy systems",
        "Strong need for standardization and mediation",
        "Gradual modernization toward microservices"
      ]}
    ]
  },
  "onion-architecture": {
    slug: "onion-architecture",
    title: "Onion Architecture",
    aka: ["domain-centric layering"],
    summary:
      "Domain-centric layering with the domain model at the center; infrastructure concerns form outer rings; enforces dependency rule inward.",
    keywords: ["onion", "layers", "dependency rule", "domain"],
    sections: [
      { kind: "text", title: "What it is", body:
        "A domain-first style with concentric layers: domain model at the core, then application services, then infrastructure. Dependencies point inward to protect the domain." },
      { kind: "list", title: "Benefits", items: [
        "Strong separation of concerns and testability",
        "Easier to replace infrastructure and frameworks",
        "Aligns well with DDD and modularization"
      ]},
      { kind: "list", title: "Trade-offs", items: [
        "More indirection/boilerplate (mappers, interfaces)",
        "Requires discipline to maintain boundaries"
      ]},
      { kind: "list", title: "Related", items: [
        "Hexagonal (Ports & Adapters)",
        "Clean Architecture",
        "Domain-Centric Architecture"
      ]}
    ]
  },
  "space-based-architecture": {
    slug: "space-based-architecture",
    title: "Space-Based Architecture",
    aka: ["in-memory data grid"],
    summary:
      "Scale and resilience via partitioned, replicated in-memory data grids and collocated processing; minimizes database contention.",
    keywords: ["IMDG", "grid", "partitioning", "replication", "latency"],
    sections: [
      { kind: "text", title: "What it is", body:
        "A style that distributes state and processing across an in-memory grid. Requests are routed to partitions holding relevant data; replicas provide failover." },
      { kind: "list", title: "Benefits", items: [
        "Very low latency and high throughput",
        "Resilience via replication and partition isolation",
        "Reduces load on centralized databases"
      ]},
      { kind: "list", title: "Trade-offs", items: [
        "Complexity in partitioning and data affinity",
        "State synchronization and consistency challenges",
        "Operational overhead for grid management"
      ]},
      { kind: "list", title: "When to use", items: [
        "High-throughput, low-latency domains (trading, ecommerce)",
        "Hot data sets amenable to partitioning",
        "When DB contention or latency is a bottleneck"
      ]}
    ]
  },
  "data-mesh": {
    slug: "data-mesh",
    title: "Data Mesh",
    summary:
      "Decentralized, domain-oriented data ownership; data as a product with federated governance and platform self-service.",
    keywords: ["domains", "data product", "governance", "mesh"],
    sections: [
      { kind: "text", title: "What it is", body:
        "A socio-technical approach applying domain-driven design to analytics: teams own data products with clear contracts, quality, and discoverability." },
      { kind: "list", title: "Benefits", items: [
        "Scales data ownership with domains",
        "Improves accountability and quality",
        "Promotes interoperability via contracts"
      ]},
      { kind: "list", title: "Trade-offs", items: [
        "Requires strong governance enablement",
        "Investment in platform and tooling",
        "Risk of fragmentation without standards"
      ]},
      { kind: "list", title: "When to use", items: [
        "Large orgs with many data domains",
        "Bottlenecked centralized data teams",
        "Desire for faster, domain-owned analytics"
      ]}
    ]
  },
  "pipes-and-filters": {
    slug: "pipes-and-filters",
    title: "Pipes and Filters",
    summary:
      "Compose sequential processing via independent filters connected by pipes; foundation for ETL, streaming, and reactive pipelines.",
    keywords: ["ETL", "streaming", "pipeline", "filters"],
    sections: [
      { kind: "text", title: "What it is", body:
        "An integration style where data flows through a series of filters (transformations), connected by pipes (channels), enabling composability and reuse." },
      { kind: "list", title: "Benefits", items: [
        "Loose coupling and composability",
        "Parallelization and scalability",
        "Testable, reusable processing stages"
      ]},
      { kind: "list", title: "Trade-offs", items: [
        "End-to-end latency across many stages",
        "Error handling and backpressure management",
        "Observability across distributed pipelines"
      ]},
      { kind: "list", title: "When to use", items: [
        "ETL/ELT and data transformation",
        "Streaming and event processing",
        "Workflow orchestration with reusable steps"
      ]}
    ]
  },
  "zero-trust-security": {
    slug: "zero-trust-security",
    title: "Zero-Trust Security Architecture",
    summary:
      "Never trust, always verify. Security model assuming breach and requiring verification for every access request.",
    keywords: ["zero trust", "verification", "least privilege", "identity", "network security"],
    sections: [
      { kind: "text", title: "What it is", body:
        "A security framework that eliminates implicit trust and requires verification for every user, device, and service attempting access, regardless of location." },
      { kind: "list", title: "Core Principles", items: [
        "Verify explicitly: Use all available data points for authentication",
        "Least privilege access: Limit user and service permissions to minimum required",
        "Assume breach: Design for containment and minimize blast radius"
      ]},
      { kind: "list", title: "Implementation Components", items: [
        "Identity and Access Management with multi-factor authentication",
        "Network micro-segmentation and policy enforcement",
        "Device compliance and endpoint protection",
        "Real-time risk assessment and adaptive policies"
      ]},
      { kind: "list", title: "Benefits", items: [
        "Reduced attack surface and lateral movement",
        "Improved visibility and audit trails",
        "Better compliance posture",
        "Support for remote work and cloud adoption"
      ]},
      { kind: "list", title: "When to use", items: [
        "Cloud-first or hybrid infrastructure",
        "Regulatory compliance requirements",
        "Remote workforce or BYOD environments",
        "Legacy perimeter security proving inadequate"
      ]}
    ]
  },
  "oauth2-patterns": {
    slug: "oauth2-patterns",
    title: "OAuth2 & OIDC Patterns",
    summary:
      "Secure authorization and authentication patterns using OAuth2 flows and OpenID Connect for identity federation.",
    keywords: ["oauth2", "oidc", "authorization", "authentication", "tokens", "federation"],
    sections: [
      { kind: "text", title: "What it is", body:
        "OAuth2 provides secure authorization flows, while OpenID Connect adds authentication. Together they enable identity federation and API access control." },
      { kind: "list", title: "Common Flows", items: [
        "Authorization Code Flow: Server-side apps with confidential clients",
        "PKCE Flow: Mobile and SPA apps requiring additional security",
        "Client Credentials Flow: Service-to-service authentication",
        "Device Flow: Input-constrained devices (IoT, smart TV)"
      ]},
      { kind: "list", title: "Token Types", items: [
        "Access Token: Bearer token for API authorization (JWT or opaque)",
        "Refresh Token: Long-lived token for obtaining new access tokens",
        "ID Token: JWT containing user identity information (OIDC)",
        "Token introspection for real-time validation"
      ]},
      { kind: "list", title: "Security Considerations", items: [
        "Token storage and transmission security",
        "Proper scope management and least privilege",
        "Token lifetime and refresh strategies",
        "PKCE for public clients and CSRF protection"
      ]},
      { kind: "list", title: "When to use", items: [
        "API access control and resource protection",
        "Single sign-on across multiple applications",
        "Third-party integrations and partner access",
        "Modern web and mobile application authentication"
      ]}
    ]
  },
  "api-security-gateway": {
    slug: "api-security-gateway",
    title: "API Security Gateway Pattern",
    summary:
      "Centralized security enforcement for APIs including authentication, authorization, rate limiting, and threat protection.",
    keywords: ["api gateway", "security", "rate limiting", "authentication", "authorization", "waf"],
    sections: [
      { kind: "text", title: "What it is", body:
        "A security-focused API gateway that provides centralized policy enforcement, threat protection, and observability for API traffic." },
      { kind: "list", title: "Security Capabilities", items: [
        "Authentication and authorization enforcement",
        "Rate limiting and DDoS protection",
        "Request/response filtering and validation",
        "SSL/TLS termination and certificate management",
        "Web Application Firewall (WAF) integration"
      ]},
      { kind: "list", title: "Threat Protection", items: [
        "SQL injection and XSS prevention",
        "OWASP API Security Top 10 coverage",
        "Bot detection and IP reputation filtering",
        "Payload size limits and format validation"
      ]},
      { kind: "list", title: "Observability", items: [
        "Security event logging and SIEM integration",
        "Real-time security metrics and alerting",
        "API usage analytics and anomaly detection",
        "Compliance reporting and audit trails"
      ]},
      { kind: "list", title: "When to use", items: [
        "Protecting public-facing APIs",
        "Enforcing consistent security policies",
        "High-traffic environments requiring protection",
        "Regulatory compliance requirements"
      ]}
    ]
  },
  "data-encryption-patterns": {
    slug: "data-encryption-patterns",
    title: "Data Encryption Patterns",
    summary:
      "Comprehensive data protection using encryption at rest, in transit, and in use, with proper key management.",
    keywords: ["encryption", "key management", "data protection", "tls", "database encryption"],
    sections: [
      { kind: "text", title: "What it is", body:
        "A set of patterns for protecting data confidentiality through encryption across all states: at rest, in transit, and in processing." },
      { kind: "list", title: "Encryption at Rest", items: [
        "Database encryption (TDE - Transparent Data Encryption)",
        "File system and volume encryption",
        "Application-level field encryption",
        "Cloud storage encryption with customer-managed keys"
      ]},
      { kind: "list", title: "Encryption in Transit", items: [
        "TLS/SSL for HTTP and API communications",
        "Message queue encryption (Kafka, RabbitMQ)",
        "Database connection encryption",
        "VPN and network-level encryption"
      ]},
      { kind: "list", title: "Key Management", items: [
        "Hardware Security Modules (HSM) for key storage",
        "Key rotation and lifecycle management",
        "Envelope encryption for scalable key management",
        "Key escrow and recovery procedures"
      ]},
      { kind: "list", title: "Advanced Patterns", items: [
        "Format-preserving encryption for legacy systems",
        "Homomorphic encryption for computation on encrypted data",
        "Searchable encryption for encrypted databases",
        "Client-side encryption with zero-knowledge architecture"
      ]},
      { kind: "list", title: "When to use", items: [
        "Handling sensitive personal or financial data",
        "Regulatory compliance (GDPR, HIPAA, PCI-DSS)",
        "Zero-trust security architectures",
        "Multi-tenant environments requiring data isolation"
      ]}
    ]
  }
  ,
  "broker-architecture": {
    slug: "broker-architecture",
    title: "Broker (Message‑Brokered)",
    aka: ["broker", "message-brokered"],
    summary:
      "Decouple producers and consumers via a broker that routes, buffers, and delivers messages (queues/topics).",
    keywords: ["broker", "queue", "topic", "pub/sub", "routing"],
    sections: [
      { kind: "text", title: "What it is", body:
        "A mediator style where components communicate indirectly through a broker. The broker handles routing (direct, fanout, topic), buffering, retries, and dead letters." },
      { kind: "list", title: "Benefits", items: [
        "Temporal decoupling and backpressure handling",
        "Scalable consumers (competing consumers)",
        "Failure isolation via DLQs and retries"
      ]},
      { kind: "list", title: "Trade-offs", items: [
        "Operational complexity of the broker",
        "At-least-once semantics require idempotency",
        "Debugging multi-hop flows is harder"
      ]},
      { kind: "list", title: "When to use", items: [
        "Asynchronous work dispatch and integration",
        "Decoupling services with variable load",
        "Bridging unreliable or bursty producers"
      ]}
    ]
  },
  "blackboard-architecture": {
    slug: "blackboard-architecture",
    title: "Blackboard",
    summary:
      "Multiple specialized components collaborate by reading/writing to a shared knowledge source (the blackboard) until a solution emerges.",
    keywords: ["ai", "knowledge source", "collaboration", "control"],
    sections: [
      { kind: "text", title: "What it is", body:
        "A problem-solving style where independent knowledge sources incrementally contribute partial solutions to a shared blackboard, guided by a control component." },
      { kind: "list", title: "Benefits", items: [
        "Flexible problem decomposition and collaboration",
        "Supports heuristic or uncertain domains",
        "Extensible with new knowledge sources"
      ]},
      { kind: "list", title: "Trade-offs", items: [
        "Designing the control strategy is complex",
        "Performance tuning can be difficult",
        "Shared state contention without careful design"
      ]},
      { kind: "list", title: "When to use", items: [
        "Complex problem domains (e.g., recognition, planning)",
        "When multiple heuristics contribute to solutions",
        "Research/AI or analytics-heavy systems"
      ]}
    ]
  },
  "bijira-mcp-servers": {
    slug: "bijira-mcp-servers",
    title: "Bijira's MCP Servers - Code for AI",
    aka: ["mcp servers", "model context protocol", "ai gateway"],
    summary:
      "Transform existing APIs into AI-consumable MCP Servers using WSO2 Bijira, enabling AI agents to interact with business systems through natural language.",
    keywords: ["mcp", "ai agents", "api transformation", "code for ai", "bijira"],
    sections: [
      {
        kind: "text",
        title: "\"APIM for AI\" vs. \"AI for APIM\"",
        body:
          "WSO2 Bijira's MCP Servers fall squarely into the \"Code for AI\" category. They allow developers to expose existing APIs or HTTP backends directly as MCP Servers, making them consumable by AI agents. Instead of AI writing your logic, your code becomes the tool - invoked by AI agents to interact with business systems, orchestrate workflows, and execute real actions."
      },
      {
        kind: "list",
        title: "Getting Started with MCP in Bijira",
        items: [
          "Create a Project - Organize resources (API proxies, MCP servers) into a single lifecycle-managed unit",
          "Create an MCP Server - Expose an HTTP API or use an existing API Proxy",
          "Manage Tools - Bijira auto-generates tool definitions from OpenAPI specs or proxies",
          "Test - Use the built-in Inspector to validate tool invocation before publishing",
          "Publish & Promote - Deploy MCP Servers to production and publish them into the Developer Portal",
          "Discovery & Integration - AI agents discover MCP servers via the MCP Hub, subscribe using OAuth tokens"
        ]
      },
      {
        kind: "list",
        title: "Ways to Expose an MCP Server",
        items: [
          "Expose an Existing MCP Server via Proxy - Create a proxy inside Bijira for lifecycle management and governance",
          "Transform a REST API into an MCP Server - Wrap existing REST APIs with auto-generated tool schemas",
          "Import an API Contract (OpenAPI) - Generate MCP server tools from OpenAPI definitions instantly",
          "Leverage API Proxies - Use existing API Proxies in Bijira as the base for your MCP Server"
        ]
      },
      {
        kind: "list",
        title: "MCP Hub & Discovery",
        items: [
          "Centralized MCP Hub portal for AI agent and developer discovery",
          "Self-service subscription and configuration workflows",
          "OAuth-based authentication and authorization for MCP servers",
          "Tool catalog with searchable capabilities and metadata",
          "Integration with VS Code Copilot and other AI development environments"
        ]
      },
      {
        kind: "list",
        title: "Lifecycle Management",
        items: [
          "Structured progression: Created → Developed → Tested → Published",
          "Quality gates ensuring governance and promotion readiness",
          "Version management and backward compatibility",
          "Rollback and deployment strategies for MCP servers",
          "Performance monitoring and usage analytics"
        ]
      },
      {
        kind: "list",
        title: "AI Agent Integration Patterns",
        items: [
          "Natural language to API translation via MCP protocol",
          "Context-aware tool selection and parameter mapping",
          "Multi-step workflow orchestration through AI agents",
          "Error handling and retry mechanisms for AI-driven API calls",
          "Session management and state persistence across interactions"
        ]
      },
      {
        kind: "list",
        title: "Security & Governance",
        items: [
          "OAuth2 token-based authentication for AI agent access",
          "Fine-grained authorization policies for tool invocation",
          "Audit logging and compliance tracking for AI actions",
          "Rate limiting and quota management for AI agent usage",
          "Data privacy and PII protection in AI interactions"
        ]
      },
      {
        kind: "list",
        title: "Benefits",
        items: [
          "Unlock AI-driven automation by making APIs discoverable through natural language",
          "Maintain security, governance, and control while enabling AI access",
          "Reuse existing API investments without rebuilding for AI consumption",
          "Accelerate AI agent development with standardized tool interfaces",
          "Bridge the gap between traditional APIs and AI-native applications"
        ]
      },
      {
        kind: "list",
        title: "When to use",
        items: [
          "Enabling AI agents to interact with existing business systems",
          "Building AI-powered workflow automation and orchestration",
          "Creating natural language interfaces for complex APIs",
          "Implementing conversational AI with real system integration",
          "Modernizing legacy systems for AI consumption"
        ]
      }
    ]
  }
};

// Order for homepage: first 6 are the focus topics requested
export const patternList = [
  patterns["layered-architecture"],
  patterns["microservice-architecture"],
  patterns["cell-based-architecture"],
  patterns["event-driven-architecture"],
  patterns["client-server"],
  patterns["plugin-based"],
  patterns["hexagonal-architecture"],
  // security patterns
  patterns["zero-trust-security"],
  patterns["api-security-gateway"],
  patterns["data-encryption-patterns"],
  // extras
  patterns["onion-architecture"],
  patterns["domain-centric-architecture"],
  patterns["clean-architecture"],
  patterns["cqrs"],
  patterns["serverless"],
  patterns["monolithic"],
  patterns["service-oriented-architecture"],
  patterns["space-based-architecture"],
  patterns["data-mesh"],
  patterns["pipes-and-filters"],
  patterns["broker-architecture"],
  patterns["blackboard-architecture"]
];
