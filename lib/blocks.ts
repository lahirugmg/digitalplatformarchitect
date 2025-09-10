export type Block = {
  slug: string;
  title: string;
  summary: string;
  sections: Array<
    | { kind: "text"; title: string; body: string }
    | { kind: "list"; title: string; items: string[] }
  >;
  keywords: string[];
};

export const blocks: Record<string, Block> = {
  "messaging-streaming-platform": {
    slug: "messaging-streaming-platform",
    title: "Messaging & Streaming Platform",
    summary:
      "Asynchronous messaging and streaming infrastructure for decoupled, reactive systems — from simple queues/topics to log-based streams and processing, with comprehensive security and observability.",
    keywords: ["messaging", "pub/sub", "streams", "cdc", "eda", "security", "observability"],
    sections: [
      { kind: "text", title: "What it is", body:
        "A comprehensive platform capability that provides messaging and streaming infrastructure to enable event-driven architectures. It spans simple messaging (queues/topics) and streaming (partitioned logs) with retention and replay, integrated with enterprise-grade security and observability." },
      { kind: "list", title: "Modes", items: [
        "Simple messaging: queues & topics for work dispatch, decoupling, and back-pressure (e.g., RabbitMQ, SQS)",
        "Streaming: append-only, partitioned logs for high-throughput events, replay, and stateful processing (e.g., Kafka, Pulsar)",
        "Hybrid: combining messaging reliability with streaming scale and retention"
      ]},
      { kind: "list", title: "Core Responsibilities", items: [
        "Durable delivery, ordering where required, and intelligent routing",
        "Consumer groups, auto-scaling, circuit breakers, and dead letter queues",
        "Schema governance, compatibility, and event catalog management",
        "End-to-end observability with distributed tracing and metrics",
        "Security: encryption, authentication, authorization, and audit trails",
        "Compliance: data retention policies, GDPR/privacy, and regulatory requirements"
      ]},
      { kind: "list", title: "Security & Compliance Capabilities", items: [
        "End-to-end encryption (TLS 1.3, mTLS) and data-at-rest encryption",
        "Fine-grained access control (RBAC, ABAC) with service identities",
        "Audit logging and compliance reporting for regulated industries",
        "Data sovereignty and residency controls",
        "Vulnerability scanning and security patching automation",
        "Zero-trust networking with service mesh integration"
      ]},
      { kind: "list", title: "Observability & Monitoring", items: [
        "Distributed tracing with OpenTelemetry integration",
        "Real-time metrics: throughput, latency, consumer lag, error rates",
        "Automated alerting on SLA breaches and system anomalies",
        "Log aggregation and correlation across event streams",
        "Performance profiling and bottleneck detection",
        "Business metrics: event volume, processing success rates, data quality"
      ]},
      { kind: "list", title: "Architecture Patterns", items: [
        "Pub/sub topics with competing consumers and load balancing",
        "Transactional outbox and saga orchestration patterns",
        "Event sourcing + CQRS with snapshotting and replay",
        "Streaming ETL with windowing and stateful processing",
        "Event-driven microservices with circuit breakers",
        "Change Data Capture (CDC) with exactly-once processing"
      ]},
      { kind: "list", title: "Performance & Reliability Patterns", items: [
        "Partitioning strategies for horizontal scaling",
        "Backpressure handling and flow control mechanisms",
        "Idempotent processing and duplicate detection",
        "Graceful degradation and chaos engineering readiness",
        "Multi-region replication and disaster recovery",
        "Auto-healing and self-balancing consumer groups"
      ]},
      { kind: "list", title: "Tech Examples", items: [
        "Apache Kafka (with Kafka Streams, ksqlDB, Schema Registry)",
        "Redpanda (high-performance Kafka-compatible)",
        "RabbitMQ (with clustering and federation)",
        "AWS MSK, EventBridge, SQS/SNS",
        "Azure Event Hubs, Service Bus",
        "Google Pub/Sub, Cloud Tasks"
      ]},
      { kind: "list", title: "KPIs/SLIs/SLOs", items: [
        "End-to-end latency (P50, P95, P99) and throughput",
        "Message delivery success rate and duplicate rates",
        "Consumer lag/backlog and processing time",
        "System availability and MTTR for incidents",
        "Security: unauthorized access attempts and compliance violations",
        "Cost efficiency: resource utilization and scaling events"
      ]}
    ]
  },
  "enterprise-integration": {
    slug: "enterprise-integration",
    title: "Enterprise Integration",
    summary:
      "Patterns and tooling to connect heterogeneous systems reliably and securely.",
    keywords: ["eip", "etl", "connectors", "edi", "soi"],
    sections: [
      {
        kind: "text",
        title: "What it is",
        body:
          "Integration services enable interoperability across SaaS, legacy, and bespoke systems using a mix of synchronous and asynchronous patterns."
      },
      {
        kind: "list",
        title: "Responsibilities",
        items: [
          "Connectivity (REST, SOAP, JDBC, SFTP, EDI)",
          "Mediation (mapping, transformation, enrichment)",
          "Orchestration and routing",
          "Operational visibility and error handling"
        ]
      },
      {
        kind: "list",
        title: "Core capabilities",
        items: [
          "Connector catalog and lifecycle",
          "Contract-first transformations and testing",
          "Secrets management and policy enforcement",
          "Self-service integration pipelines"
        ]
      },
      {
        kind: "list",
        title: "Architecture patterns",
        items: [
          "Canonical data models",
          "Event-driven integration",
          "File-based and batch with idempotency",
          "Edge adapters and strangler patterns"
        ]
      },
      {
        kind: "list",
        title: "Tech examples",
        items: ["WSO2 Integrator: Ballerina Integrator", "WSO2 IPaaS solution: Devant", "MuleSoft", "Boomi", "Apache Camel", "Spring Integration", "Azure Integration Services"]
      },
      {
        kind: "list",
        title: "KPIs/SLIs",
        items: [
          "Success rate and MTTR for integrations",
          "Throughput and latency per flow",
          "Change lead time and failure rate",
          "Partner SLA adherence"
        ]
      }
    ]
  },
  "api-management": {
    slug: "api-management",
    title: "API Management",
    summary:
      "Complete API lifecycle management platform enabling secure exposure, governance, and monetization of digital services across the enterprise with comprehensive developer experience and operational excellence.",
    keywords: ["api gateway", "developer portal", "policies", "rate limiting", "monetization", "analytics", "openapi", "developer experience", "api security", "lifecycle"],
    sections: [
      {
        kind: "text",
        title: "What it delivers",
        body:
          "A comprehensive platform that transforms your services into managed API products. API management enables API-first digital transformation by providing the control plane, runtime, and developer experience for designing, publishing, securing, and operating APIs as products. From design to retirement, every API gets professional-grade security, monitoring, and developer experience - enabling innovation while maintaining control."
      },
      {
        kind: "list",
        title: "Core Responsibilities",
        items: [
          "API gateway runtime with policy enforcement and traffic management",
          "Developer portal with self-service onboarding and documentation",
          "API lifecycle management: design, versioning, deployment, deprecation",
          "Security policy orchestration and threat protection",
          "Analytics, monitoring, and consumer insights",
          "API governance, compliance, and quality assurance"
        ]
      },
      {
        kind: "list",
        title: "API Design & Lifecycle Management",
        items: [
          "Contract-first design with OpenAPI, GraphQL, and AsyncAPI standards",
          "Graphical and declarative API design with OpenAPI/AsyncAPI support",
          "Version management with backward compatibility validation",
          "Lifecycle states: draft → published → deprecated → retired",
          "Contract-first development with mock servers and testing",
          "Automated CI/CD integration with quality gates",
          "Schema validation, contract testing, and breaking change detection"
        ]
      },
      {
        kind: "list",
        title: "Gateway & Traffic Management",
        items: [
          "High-performance request routing and intelligent load balancing",
          "Authentication, authorization, and fine-grained access control (OAuth2, OIDC, mTLS)",
          "Rate limiting, quotas, throttling, and traffic shaping",
          "Response caching, transformation, and content negotiation",
          "Dynamic rate limiting and throttling with burst protection",
          "Circuit breakers and failover for resilience",
          "Multi-region deployment with global traffic management"
        ]
      },
      {
        kind: "list",
        title: "Security & Policy Enforcement",
        items: [
          "Zero-trust security with mutual TLS and service-to-service authentication",
          "OAuth2, JWT, API keys, and mutual TLS authentication",
          "Fine-grained RBAC and scope-based access control",
          "API threat protection: injection attacks, DDoS, bot mitigation",
          "Request/response transformation and validation",
          "Data privacy enforcement with PII detection and masking",
          "Threat protection: SQL injection, XXE, DDoS mitigation",
          "Compliance frameworks: PCI-DSS, GDPR, SOX, HIPAA support",
          "Policy-as-code with version control and audit trails"
        ]
      },
      {
        kind: "list",
        title: "Developer Experience & Portal",
        items: [
          "Self-service developer portals with interactive documentation",
          "API catalog with search, filtering, and recommendations",
          "Interactive API documentation with try-it-out functionality",
          "SDK generation and code samples in multiple languages",
          "Sandbox environments and try-it-now capabilities",
          "Self-service API key management and subscription workflows",
          "API discovery and catalog with search and filtering",
          "Developer onboarding journeys and getting-started guides",
          "Community features: forums, feedback, and support integration"
        ]
      },
      {
        kind: "list",
        title: "Monetization & Business Models",
        items: [
          "Flexible subscription tiers and usage-based pricing",
          "Pay-per-call, freemium, and enterprise licensing options",
          "Billing integration with Stripe, PayPal, and enterprise systems",
          "Usage analytics and revenue optimization insights",
          "Partner marketplace and revenue sharing capabilities"
        ]
      },
      {
        kind: "list",
        title: "Analytics & Business Intelligence",
        items: [
          "Real-time dashboards with API performance metrics",
          "Consumer behavior analytics and adoption tracking",
          "API usage analytics and consumer behavior insights",
          "Error analysis with root cause identification",
          "Predictive analytics for capacity planning",
          "Custom reports and automated alerting",
          "AI-powered insights for API optimization",
          "Business metrics correlation with technical performance data"
        ]
      },
      {
        kind: "list",
        title: "Governance & Enterprise Scale",
        items: [
          "Multi-tenant architecture with organizational isolation",
          "Centralized governance with delegated workspace management",
          "Policy templates and standardization frameworks",
          "Audit trails and compliance reporting",
          "Role-based administration and approval workflows",
          "Enterprise SSO and directory integration"
        ]
      },
      {
        kind: "list",
        title: "MCP Hub & Server Management",
        items: [
          "Model Context Protocol (MCP) server registry and discovery",
          "MCP hub for centralized protocol server management",
          "Dynamic MCP server routing and load balancing",
          "Protocol version negotiation and compatibility management",
          "MCP server health monitoring and automatic failover",
          "Resource and tool exposure management across MCP servers",
          "Context sharing and state management between MCP sessions",
          "MCP server authentication and authorization policies"
        ]
      },
      {
        kind: "list",
        title: "Architecture Patterns",
        items: [
          "Centralized vs. distributed gateway patterns",
          "Backend-for-Frontend (BFF) with client-specific APIs",
          "API composition and aggregation patterns",
          "Event-driven APIs with webhooks and AsyncAPI",
          "Service mesh integration for zero-trust networking",
          "Multi-cloud and hybrid API deployment strategies",
          "Microgateway and distributed deployment models",
          "Zero-trust architecture with service mesh integration"
        ]
      },
      {
        kind: "list",
        title: "Integration Patterns",
        items: [
          "REST API with HATEOAS and resource-based design",
          "GraphQL APIs with schema federation and subscriptions",
          "gRPC services with Protocol Buffers and streaming",
          "WebSocket and Server-Sent Events for real-time APIs",
          "Async messaging integration with queues and topics",
          "Legacy system adaptation with protocol translation",
          "Event-driven APIs with webhooks and streaming"
        ]
      },
      {
        kind: "list",
        title: "AI & Advanced Integration",
        items: [
          "AI gateway for LLM API management and cost control",
          "Intelligent request routing and performance optimization",
          "Automated API documentation generation",
          "Anomaly detection and predictive maintenance",
          "Event streaming integration for real-time APIs",
          "Kubernetes operators and cloud-native deployment"
        ]
      },
      {
        kind: "list",
        title: "Monitoring & Observability",
        items: [
          "Distributed tracing across API calls with OpenTelemetry",
          "Real-time metrics: throughput, latency, error rates, and SLA compliance",
          "Performance monitoring with APM integration",
          "Alert management for SLA breaches and anomaly detection"
        ]
      },
      {
        kind: "list",
        title: "Tech Examples",
        items: [
          "Enterprise: WSO2 API Manager, Apigee, Azure API Management, IBM API Connect",
          "Cloud-native: Kong Gateway, Ambassador, Istio Gateway, AWS API Gateway",
          "WSO2 Choreo (cloud-native API management)",
          "Open source: Tyk, Gravitee, KrakenD, Zuul",
          "Service mesh: Istio, Linkerd, Consul Connect",
          "Documentation: Swagger UI, Redoc, Postman, Insomnia"
        ]
      },
      {
        kind: "list",
        title: "KPIs/SLIs/SLOs",
        items: [
          "Developer adoption: time-to-first-successful-call < 15 minutes",
          "API performance: P50/P95/P99 latency, throughput, and availability (99.9%+)",
          "Business impact: revenue per API and partner onboarding velocity",
          "Developer experience: time-to-first-call, API adoption rate, developer satisfaction",
          "Security metrics: threat detection rate, policy violation counts, vulnerability MTTR",
          "Security posture: zero security incidents and policy compliance",
          "Governance compliance: API standards adherence, documentation coverage, test coverage",
          "Operational efficiency: deployment frequency and change success rate"
        ]
      }
    ]
  },
  "identity-access-management": {
    slug: "identity-access-management",
    title: "Identity & Access Management",
    summary:
      "Centralized identity, authentication, authorization, and federation for users and services.",
    keywords: ["iam", "oidc", "saml", "rbac", "pki"],
    sections: [
      {
        kind: "text",
        title: "What it is",
        body:
          "IAM provides digital identity lifecycle, authn/z, federation, and policy enforcement for humans and workloads across the estate."
      },
      {
        kind: "list",
        title: "Responsibilities",
        items: [
          "Identity lifecycle (provisioning, deprovisioning)",
          "Authentication (MFA, risk-based)",
          "Authorization (RBAC, ABAC, PBAC)",
          "Federation (OIDC/SAML) and secrets/PKI"
        ]
      },
      {
        kind: "list",
        title: "Core capabilities",
        items: [
          "Policy as code and centralized auditing",
          "Service-to-service identity (mTLS, SPIFFE/SPIRE)",
          "Just-in-time and just-enough access",
          "Zero trust posture and session management"
        ]
      },
      {
        kind: "list",
        title: "Architecture patterns",
        items: [
          "Token-based auth (JWT, OAuth2)",
          "Attribute and policy-based access control",
          "Federated identity across SaaS and on-prem",
          "Workload identity with short-lived creds"
        ]
      },
      {
        kind: "list",
        title: "Tech examples",
        items: ["WSO2 Identity Server", "WSO2 IAM SaaS solution Asgardeo", "Keycloak", "Auth0", "Azure AD", "Okta", "SPIRE"]
      },
      {
        kind: "list",
        title: "KPIs/SLIs",
        items: [
          "Auth success rate and latency",
          "Policy evaluation latency",
          "Credential compromise and rotation compliance",
          "Access request lead time"
        ]
      }
    ]
  },
  "internal-developer-platform": {
    slug: "internal-developer-platform",
    title: "Internal Developer Platform",
    summary:
      "Golden paths, paved roads, and self-service capabilities for teams to ship reliably.",
    keywords: ["idp", "platform engineering", "golden paths", "backstage"],
    sections: [
      {
        kind: "text",
        title: "What it is",
        body:
          "An IDP productizes the platform: templates, automation, and curated experiences that reduce cognitive load and speed delivery."
      },
      {
        kind: "list",
        title: "Responsibilities",
        items: [
          "Service templates and scaffolding",
          "Standardized CI/CD and environments",
          "Catalog and discoverability",
          "Guardrails, policies, and cost controls"
        ]
      },
      {
        kind: "list",
        title: "Core capabilities",
        items: [
          "Self-service provisioning and lifecycle ops",
          "Golden paths and docs in-context",
          "Scorecards and reliability baselines",
          "Feedback loops and platform telemetry"
        ]
      },
      {
        kind: "list",
        title: "Delivery: DevOps & CI/CD",
        items: [
          "Standard CI pipelines with unit/integration tests and artifacts",
          "Security & quality gates (SAST/DAST, dependency scan, coverage)",
          "Automated CD with promotion/approvals/rollback",
          "Progressive delivery: blue/green, canary, feature flags",
          "GitOps controllers and declarative environments",
          "Ephemeral preview environments and env config management"
        ]
      },
      {
        kind: "list",
        title: "Runtime: Cloud Infrastructure & Orchestration",
        items: [
          "Cluster lifecycle and capacity management",
          "Scheduling, autoscaling (HPA/VPA), and health management",
          "Service discovery, routing, ingress/egress and policies",
          "Storage classes/volumes and data durability",
          "Network policy, load balancing, multi-AZ/region topologies",
          "Service mesh integration and runtime policy control"
        ]
      },
      {
        kind: "list",
        title: "Architecture patterns",
        items: [
          "Backstage or custom portal",
          "Templates + workflows as code",
          "Platform APIs and API-first integration",
          "Inner-source and contribution model"
        ]
      },
      {
        kind: "list",
        title: "Tech examples",
        items: ["WSO2 Choreo", "Backstage", "Humanitec", "Port", "Internal", "Harness IDP"]
      },
      {
        kind: "list",
        title: "KPIs/SLIs",
        items: [
          "Lead time for change (DORA)",
          "Deployment frequency and change failure rate (DORA)",
          "MTTR for incidents and rollbacks",
          "Pipeline success rate and duration",
          "Time to onboard and time-to-first PR",
          "Developer satisfaction (DevEx surveys)"
        ]
      }
    ]
  }
  ,
  "data-platform": {
    slug: "data-platform",
    title: "Data Platform",
    summary:
      "Lakehouse, BI/analytics, and ML pipelines with governance, quality, and lineage.",
    keywords: [
      "delta lake",
      "ETL/ELT",
      "BI",
      "ML pipelines",
      "catalog"
    ],
    sections: [
      {
        kind: "text",
        title: "What it is",
        body:
          "An enterprise data platform that ingests, stores, models, and serves analytical and operational data — enabling BI and ML with strong governance and observability."
      },
      {
        kind: "list",
        title: "Related patterns",
        items: [
          "Data Mesh (decentralized ownership, federated governance)",
          "Pipes and Filters (pipelines composition)",
          "Event-Driven Architecture (streaming ingestion)"
        ]
      },
      {
        kind: "list",
        title: "Responsibilities",
        items: [
          "Batch and streaming ingestion (CDC, connectors)",
          "Curated storage (lakehouse/warehouse) and modeling",
          "Metadata, catalog, lineage, and governance",
          "Pipelines orchestration and quality monitoring",
          "Serving: BI, ML features, and APIs"
        ]
      },
      {
        kind: "list",
        title: "Core capabilities",
        items: [
          "Medallion/layered data architecture",
          "Transformations (dbt/Spark/Flink) and orchestration",
          "Lineage, data contracts, and quality checks",
          "Feature store and reproducible ML pipelines"
        ]
      },
      {
        kind: "list",
        title: "Architecture patterns",
        items: [
          "Lambda/Kappa processing",
          "Data mesh with domain ownership",
          "CDC into lakes and warehouses",
          "Materialized views and serving layers"
        ]
      },
      {
        kind: "list",
        title: "Tech examples",
        items: [
          "Databricks/Delta Lake",
          "Snowflake",
          "BigQuery",
          "Apache Hudi/Iceberg",
          "dbt",
          "Airflow/Prefect"
        ]
      },
      {
        kind: "list",
        title: "KPIs/SLIs",
        items: [
          "Data freshness and completeness",
          "Pipeline success rate and duration",
          "Quality rule violations",
          "Lineage coverage"
        ]
      }
    ]
  },
  "observability-operations": {
    slug: "observability-operations",
    title: "Observability & Monitoring",
    summary:
      "Digital platform observability and monitoring with comprehensive telemetry, distributed tracing, and multi-layer visibility for reliable operations.",
    keywords: [
      "opentelemetry",
      "ebpf",
      "datadog",
      "distributed tracing",
      "slos",
      "metrics",
      "logging"
    ],
    sections: [
      { kind: "text", title: "What it is", body:
        "Comprehensive observability platform providing end-to-end visibility across network, application, service, and infrastructure layers. Combines signals collection, intelligent correlation, and operational guardrails to ensure reliable platform operations." },
      { kind: "list", title: "Observability Signals", items: [
        "Metrics: Time-series data for KPIs, performance, and resource utilization",
        "Logs: Structured application and system events with correlation",
        "Traces: Distributed request flow across microservices",
        "Profiles: Application performance profiling and resource analysis",
        "Events: Business and system events for correlation and alerting"
      ]},
      { kind: "list", title: "Data Collection Architecture", items: [
        "eBPF agents on nodes for network-level TCP Layer 4 observability",
        "OpenTelemetry (OTel) SDK/auto-instrumentation in applications",
        "OTel Collector or DataDog Agent on each node/sidecar",
        "Custom collectors for legacy systems and specialized protocols",
        "Synthetic monitoring and real user monitoring (RUM)"
      ]},
      { kind: "list", title: "Backend & Analytics", items: [
        "DataDog Metrics, APM, RUM, Synthetics, Security monitoring",
        "ELK Stack for log aggregation and search",
        "Prometheus/Grafana for metrics and alerting",
        "Jaeger/Tempo for distributed tracing storage",
        "Time-series databases with retention policies"
      ]},
      { kind: "list", title: "Network-Level Observability", items: [
        "TCP Layer 4 monitoring using eBPF technology",
        "Network traffic analysis across Identity Server, Gateway, and microservices",
        "Connection tracking, bandwidth utilization, and latency monitoring",
        "Network security monitoring and anomaly detection",
        "CNI health monitoring and kube-proxy error tracking"
      ]},
      { kind: "list", title: "Application-Level Observability", items: [
        "API statistics: error rates, HTTP response codes, latency",
        "Gateway and Identity Provider metrics publishing",
        "Application performance monitoring (APM)",
        "Business metrics and user journey tracking",
        "Code-level insights and performance bottleneck identification"
      ]},
      { kind: "list", title: "Service-Level Observability", items: [
        "Distributed tracing: Gateway → Identity Server → Microservice → DB",
        "W3C traceparent/tracestate propagation with B3 fallback",
        "Span attributes: api.name, api.operation, tenant, auth.method, user.flow",
        "Tail-based and dynamic sampling for performance optimization",
        "Trace-log correlation with trace_id/span_id injection"
      ]},
      { kind: "list", title: "Runtime & Infrastructure Observability", items: [
        "Kubernetes: Node pressure, pod restarts, OOMKilled, HPA/VPA behavior",
        "JVM monitoring: Heap usage, GC pause time, thread pools, JIT stats",
        "Database connections, slow queries, and performance metrics",
        "Cache hit/miss ratios, evictions, and memory utilization",
        "Message queue lag, requeue rates, and broker health"
      ]},
      { kind: "list", title: "Correlation & Context", items: [
        "Service, environment, version, region, and tenant correlation",
        "API name, user flow, and release tag tracking",
        "Cross-layer correlation between network, application, and infrastructure",
        "Business context integration with technical metrics",
        "Anomaly detection with contextual analysis"
      ]},
      { kind: "list", title: "Operational Guardrails", items: [
        "PII scrubbing and data privacy protection",
        "Intelligent sampling strategies and cost optimization",
        "Multi-tier data retention policies",
        "SLOs and error budget management",
        "Alert fatigue reduction and noise filtering"
      ]},
      { kind: "list", title: "Architecture patterns", items: [
        "RED metrics (Rate, Errors, Duration) and USE metrics (Utilization, Saturation, Errors)",
        "Centralized vs. federated observability models",
        "Event-driven alerting and correlation engines",
        "Chaos engineering and resilience testing",
        "Service mesh observability with sidecar telemetry"
      ]},
      { kind: "list", title: "Tech examples", items: [
        "DataDog (APM, Infrastructure, Logs, RUM, Synthetics)",
        "OpenTelemetry ecosystem (Collectors, SDKs, Auto-instrumentation)",
        "eBPF tools (Cilium, Falco, Pixie)",
        "ELK Stack (Elasticsearch, Logstash, Kibana)",
        "Prometheus, Grafana, Tempo, Loki",
        "Jaeger, Zipkin for distributed tracing"
      ]},
      { kind: "list", title: "KPIs/SLIs", items: [
        "MTTD (Mean Time to Detection) and MTTR (Mean Time to Recovery)",
        "SLO compliance and error budget consumption",
        "Alert precision: signal-to-noise ratio",
        "Observability coverage: trace, log, and metric completeness",
        "Platform reliability: uptime, availability, and performance SLAs"
      ]}
    ]
  },
  "ai-ml-intelligent-services": {
    slug: "ai-ml-intelligent-services",
    title: "AI/ML & Intelligent Services Platform",
    summary:
      "Where your data platform feeds into inference, model deployment, and continuous learning pipelines. This building block turns data into intelligence by managing ML models, embeddings, vector databases, and generative AI services.",
    keywords: ["ai", "ml", "machine learning", "models", "inference", "embeddings", "vector database", "generative ai", "llm"],
    sections: [
      {
        kind: "text",
        title: "What it is",
        body:
          "An intelligent services platform that transforms data into actionable intelligence through ML model lifecycle management, real-time inference, and generative AI capabilities. It bridges the gap between data platforms and business applications by providing scalable, production-ready AI services."
      },
      {
        kind: "list",
        title: "Core Responsibilities",
        items: [
          "ML model training, validation, and deployment pipelines",
          "Real-time and batch inference serving with auto-scaling",
          "Model registry and versioning with A/B testing capabilities",
          "Vector databases and embedding management for semantic search",
          "Generative AI services and LLM integration",
          "Continuous learning and model retraining automation"
        ]
      },
      {
        kind: "list",
        title: "Model Lifecycle Management",
        items: [
          "Experiment tracking and model versioning",
          "Automated training pipelines with hyperparameter tuning",
          "Model validation and performance monitoring",
          "Staged deployment with canary releases and rollbacks",
          "Model registry with metadata and lineage tracking",
          "Automated retraining triggers based on data drift"
        ]
      },
      {
        kind: "list",
        title: "Inference & Serving",
        items: [
          "High-performance model serving with GPU/CPU optimization",
          "Real-time inference APIs with sub-100ms latency",
          "Batch prediction processing for large datasets",
          "Auto-scaling based on traffic patterns and resource usage",
          "Multi-model serving and ensemble predictions",
          "Edge deployment for low-latency applications"
        ]
      },
      {
        kind: "list",
        title: "Vector & Embedding Services",
        items: [
          "Vector databases for similarity search and retrieval",
          "Embedding generation and management pipelines",
          "Semantic search and recommendation engines",
          "RAG (Retrieval-Augmented Generation) implementations",
          "Knowledge graph integration and entity linking",
          "Multi-modal embeddings for text, images, and audio"
        ]
      },
      {
        kind: "list",
        title: "Generative AI & LLM Integration",
        items: [
          "LLM deployment and fine-tuning infrastructure",
          "Prompt engineering and template management",
          "Multi-provider LLM gateway with cost optimization",
          "Content generation and summarization services",
          "Conversational AI and chatbot frameworks",
          "AI safety and content moderation pipelines"
        ]
      },
      {
        kind: "list",
        title: "Data Integration & Feature Engineering",
        items: [
          "Feature stores with real-time and batch feature serving",
          "Data pipeline integration with streaming and batch sources",
          "Feature engineering and transformation pipelines",
          "Data quality monitoring and drift detection",
          "Multi-source data fusion and enrichment",
          "Privacy-preserving ML with federated learning"
        ]
      },
      {
        kind: "list",
        title: "Monitoring & Observability",
        items: [
          "Model performance monitoring and alerting",
          "Data drift and concept drift detection",
          "Inference latency and throughput monitoring",
          "Model explainability and bias detection",
          "Resource utilization and cost tracking",
          "A/B testing and champion/challenger analysis"
        ]
      },
      {
        kind: "list",
        title: "Security & Governance",
        items: [
          "Model access control and authentication",
          "Data privacy and PII protection in ML pipelines",
          "Model audit trails and compliance reporting",
          "Adversarial attack detection and defense",
          "Bias detection and fairness monitoring",
          "Responsible AI governance and ethics frameworks"
        ]
      },
      {
        kind: "list",
        title: "Architecture Patterns",
        items: [
          "Microservices architecture for ML model serving",
          "Event-driven ML pipelines with real-time triggers",
          "Lambda architecture for batch and stream processing",
          "Model-as-a-Service (MaaS) with API-first design",
          "Multi-cloud and hybrid ML deployment strategies",
          "Edge computing for distributed inference"
        ]
      },
      {
        kind: "list",
        title: "Tech Examples",
        items: [
          "ML Platforms: MLflow, Kubeflow, SageMaker, Vertex AI",
          "Model Serving: TensorFlow Serving, TorchServe, Seldon, KServe",
          "Vector Databases: Pinecone, Weaviate, Qdrant, Chroma",
          "LLM Infrastructure: Hugging Face, Ollama, vLLM, LangChain",
          "Feature Stores: Feast, Tecton, Hopsworks",
          "Monitoring: Evidently, WhyLabs, Neptune, Weights & Biases"
        ]
      },
      {
        kind: "list",
        title: "KPIs/SLIs/SLOs",
        items: [
          "Model accuracy and performance metrics (precision, recall, F1)",
          "Inference latency: P50/P95/P99 response times",
          "Model serving availability and uptime (99.9%+)",
          "Data freshness and pipeline success rates",
          "Resource utilization and cost per inference",
          "Model drift detection and retraining frequency"
        ]
      }
    ]
  },
  "application-services": {
    slug: "application-services",
    title: "Application & Services",
    summary:
      "The foundational layer that encapsulates the enterprise's business logic and capabilities, regardless of architectural style. This block represents the 'source of truth' for business functionality.",
    keywords: ["applications", "microservices", "monoliths", "business logic", "saas", "legacy", "services"],
    sections: [
      {
        kind: "text",
        title: "What it is",
        body:
          "The foundational layer that encapsulates the enterprise's business logic and capabilities, regardless of architectural style. It includes microservices built for agility and scale, legacy applications that continue to provide critical business value, monolithic services that may still operate in certain domains, and packaged/third-party SaaS services consumed within the enterprise. This block represents the 'source of truth' for business functionality. It provides the core services that other building blocks — such as API Management, Integration, and Identity — expose, secure, orchestrate, and observe to deliver consistent digital experiences."
      },
      {
        kind: "list",
        title: "Core Responsibilities",
        items: [
          "Business logic implementation and domain expertise",
          "Data persistence and state management",
          "Business process orchestration and workflows",
          "Domain-specific functionality and capabilities",
          "Integration with external systems and services",
          "Compliance with business rules and regulations"
        ]
      },
      {
        kind: "list",
        title: "Application Architectures",
        items: [
          "Microservices: Domain-driven, independently deployable, API-first",
          "Modular monoliths: Well-structured, cohesive but deployable as single unit",
          "Legacy applications: Critical business systems requiring modernization",
          "Serverless functions: Event-driven, stateless compute for specific tasks",
          "Hybrid architectures: Combining multiple styles based on requirements"
        ]
      },
      {
        kind: "list",
        title: "Service Types & Patterns",
        items: [
          "Domain services: Core business capabilities (orders, payments, inventory)",
          "Application services: Cross-cutting functionality (notifications, reporting)",
          "Infrastructure services: Technical capabilities (caching, queuing)",
          "Composite services: Orchestrating multiple domain services",
          "Adapter services: Wrapping legacy systems with modern interfaces",
          "Proxy services: Mediating access to external systems"
        ]
      },
      {
        kind: "list",
        title: "Legacy & Modernization",
        items: [
          "Legacy application assessment and categorization",
          "Strangler fig pattern for gradual modernization",
          "API-first facades for legacy system integration",
          "Event-driven modernization with change data capture",
          "Database modernization and data migration strategies",
          "Incremental refactoring and bounded context extraction"
        ]
      },
      {
        kind: "list",
        title: "SaaS & Third-Party Integration",
        items: [
          "SaaS application integration and data synchronization",
          "Third-party API consumption and rate limiting",
          "Vendor lock-in mitigation and abstraction layers",
          "Multi-tenant SaaS configuration and customization",
          "SaaS security and compliance management",
          "Cost optimization and usage monitoring"
        ]
      },
      {
        kind: "list",
        title: "Development & Deployment",
        items: [
          "Domain-driven design and bounded context definition",
          "API-first development with contract testing",
          "Continuous integration and deployment pipelines",
          "Feature flagging and progressive deployment",
          "Service mesh integration for cross-cutting concerns",
          "Container orchestration and cloud-native deployment"
        ]
      },
      {
        kind: "list",
        title: "Data Management",
        items: [
          "Database per service pattern for data ownership",
          "Event sourcing and CQRS for complex domains",
          "Distributed transaction management and saga patterns",
          "Data consistency models and eventual consistency",
          "Caching strategies and read/write optimization",
          "Data archival and lifecycle management"
        ]
      },
      {
        kind: "list",
        title: "Quality & Reliability",
        items: [
          "Circuit breakers and bulkhead patterns for resilience",
          "Health checks and readiness probes",
          "Distributed tracing and application performance monitoring",
          "Load testing and capacity planning",
          "Error handling and retry mechanisms",
          "Service-level objectives (SLOs) and error budgets"
        ]
      },
      {
        kind: "list",
        title: "Security & Compliance",
        items: [
          "Application-level security controls and input validation",
          "Service-to-service authentication and authorization",
          "Data encryption at rest and in transit",
          "Audit logging and compliance reporting",
          "Vulnerability scanning and security testing",
          "Privacy by design and data protection"
        ]
      },
      {
        kind: "list",
        title: "Architecture Patterns",
        items: [
          "Domain-driven design with bounded contexts",
          "Event-driven architecture with domain events",
          "CQRS and event sourcing for complex business logic",
          "Hexagonal architecture for testability and isolation",
          "Microservices with database per service",
          "Modular monolith with clear module boundaries"
        ]
      },
      {
        kind: "list",
        title: "Tech Examples",
        items: [
          "Frameworks: Spring Boot, .NET Core, Node.js, Django, Ruby on Rails",
          "Runtimes: Java/JVM, .NET, Node.js runtime, Python, Go",
          "Databases: PostgreSQL, MySQL, MongoDB, Cassandra, Redis",
          "Messaging: Apache Kafka, RabbitMQ, AWS SQS/SNS, Azure Service Bus",
          "Containers: Docker, Kubernetes, OpenShift, Cloud Run",
          "SaaS: Salesforce, Workday, ServiceNow, Microsoft 365"
        ]
      },
      {
        kind: "list",
        title: "KPIs/SLIs/SLOs",
        items: [
          "Application availability and uptime (99.5%+ for critical services)",
          "Response time: P50/P95/P99 latency for key business operations",
          "Throughput: Transactions per second and concurrent user capacity",
          "Error rates: Business logic errors, system errors, and timeouts",
          "Development velocity: Lead time for features and deployment frequency",
          "Business metrics: Conversion rates, user engagement, revenue impact"
        ]
      }
    ]
  }
};

export const blockList = [
  blocks["application-services"],
  blocks["messaging-streaming-platform"],
  blocks["enterprise-integration"],
  blocks["api-management"],
  blocks["identity-access-management"],
  blocks["internal-developer-platform"],
  blocks["data-platform"],
  blocks["ai-ml-intelligent-services"],
  blocks["observability-operations"]
];
