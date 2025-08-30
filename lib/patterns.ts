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
  "layered-architecture": {
    slug: "layered-architecture",
    title: "Layered Architecture",
    aka: ["n-tier"],
    summary:
      "Organize code into layers (presentation, business, persistence, database) with clear responsibilities and boundaries.",
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
        "Vertical slices may cut across many layers (slower changes)"
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
    title: "Plugin-Based Architecture",
    aka: ["modular architecture"],
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
    aka: ["onion", "screaming architecture"],
    summary:
      "Layered concentric rings emphasizing use cases and entities, enforcing inward dependency flow.",
    keywords: ["use cases", "entities", "dependency rule"],
    sections: [
      { kind: "text", title: "What it is", body:
        "A refinement of layered/hexagonal stressing the dependency rule: source code dependencies point only inward toward higher-level policies." },
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
    aka: ["onion/hexagonal/clean family", "DDD-aligned"],
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
  }
};

// Order for homepage: first 6 are the focus topics requested
export const patternList = [
  patterns["layered-architecture"],
  patterns["microservice-architecture"],
  patterns["event-driven-architecture"],
  patterns["client-server"],
  patterns["plugin-based"],
  patterns["hexagonal-architecture"],
  // extras
  patterns["domain-centric-architecture"],
  patterns["clean-architecture"],
  patterns["cqrs"],
  patterns["serverless"],
  patterns["monolithic"],
  patterns["service-oriented-architecture"],
  patterns["space-based-architecture"],
  patterns["data-mesh"],
  patterns["pipes-and-filters"]
];
