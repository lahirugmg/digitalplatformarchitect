export type ApiFeatureCategory = {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  color: string;
};

export const apiManagementFeatures: ApiFeatureCategory[] = [
  {
    id: "api-design-types",
    title: "API Design & Types",
    description: "Create and manage diverse API types with comprehensive design tools",
    icon: "🎨",
    color: "primary",
    features: [
      "Create REST APIs (including from OpenAPI specifications)",
      "GraphQL API design and schema management",
      "Streaming APIs (WebSocket, WebSub/WebHook, Server-Sent Events)",
      "Expose SOAP services as REST endpoints",
      "AI API integration and management",
      "API prototypes and mocking capabilities",
      "API Products and versioning",
      "API revisions and lifecycle management",
      "Endpoint resiliency and high availability",
      "Documentation generation and collaboration tools"
    ]
  },
  {
    id: "security-auth",
    title: "Security & Authentication",
    description: "Comprehensive security framework with multiple authentication methods",
    icon: "🔒",
    color: "green",
    features: [
      "OAuth2/OIDC with JWT access tokens",
      "Multiple grant types and scopes management",
      "API Keys and certificate-based authentication",
      "Mutual TLS (mTLS) support",
      "Basic Authentication integration",
      "Certificate-bound tokens",
      "Token revocation, expiry, and persistence",
      "Threat protection (regex, JSON, XML validation)",
      "Role-based access control (RBAC) with XACML",
      "Open Policy Agent (OPA) policy validation",
      "Schema validation and security enforcement"
    ]
  },
  {
    id: "rate-limiting-qos",
    title: "Rate Limiting & QoS",
    description: "Advanced traffic management and quality of service controls",
    icon: "⚡",
    color: "orange",
    features: [
      "Throttling policies (application/subscription/custom)",
      "Access control and rate limiting",
      "Backend throughput limits",
      "Distributed burst control",
      "GraphQL query limits (depth and complexity)",
      "Streaming API rate limiting",
      "AI API usage controls",
      "Response caching at the gateway",
      "Dynamic rate adjustment",
      "SLA-based throttling policies"
    ]
  },
  {
    id: "gateways-deployment",
    title: "Gateways & Deployment",
    description: "Flexible deployment options across multiple gateway environments",
    icon: "🚀",
    color: "blue",
    features: [
      "Universal Gateway with policies and caching",
      "Environment-specific deployments and scaling",
      "Multi-gateway deployment strategies",
      "Custom hostname and domain management",
      "Federated gateways (AWS API Gateway integration)",
      "Developer Portal publishing",
      "Multi-portal publishing capabilities",
      "AWS import and migration tools",
      "Cloud-native deployment patterns",
      "Kubernetes operator support"
    ]
  },
  {
    id: "developer-portal",
    title: "Developer Portal & Consumption",
    description: "Self-service developer experience with comprehensive tooling",
    icon: "👥",
    color: "purple",
    features: [
      "API discovery with advanced search",
      "Marketplace Assistant for API recommendations",
      "Application management and lifecycle",
      "Automated key generation and management",
      "Access token provisioning",
      "Application sharing and collaboration",
      "Subscription workflows and approvals",
      "Integrated API consoles (REST/GraphQL)",
      "SOAP client integration",
      "Postman collection generation",
      "Multi-language SDK generation",
      "AI-powered API Chat assistance"
    ]
  },
  {
    id: "monetization-b2b",
    title: "Monetization & B2B",
    description: "Built-in monetization capabilities for API business models",
    icon: "💰",
    color: "green",
    features: [
      "Built-in API monetization platform",
      "Usage-based pricing models",
      "Subscription tier management",
      "Revenue tracking and analytics",
      "B2B consumption pattern analysis",
      "Federated authentication for partners",
      "Enterprise billing integration",
      "Partner marketplace capabilities",
      "Revenue sharing mechanisms",
      "Cost management and optimization"
    ]
  },
  {
    id: "governance",
    title: "Governance",
    description: "Enterprise governance with automated compliance and validation",
    icon: "📋",
    color: "blue",
    features: [
      "Ruleset catalog and management",
      "Automated rule validator",
      "CI/CD-driven governance workflows",
      "Governance CLI tools",
      "API definition linting and validation",
      "Compliance reporting and auditing",
      "Policy-as-code implementation",
      "Standards enforcement",
      "Quality gates and approvals",
      "Governance metrics and dashboards"
    ]
  },
  {
    id: "analytics-observability",
    title: "Analytics & Observability",
    description: "Comprehensive monitoring and analytics with enterprise integrations",
    icon: "📊",
    color: "teal",
    features: [
      "Choreo-based analytics with RBAC",
      "Real-time alerts and monitoring",
      "Proxy mode analytics",
      "ELK Stack integration (Elasticsearch, Logstash, Kibana)",
      "Datadog and OpenSearch integrations",
      "Custom analytics events publishing",
      "Access, audit, and correlation logs",
      "API and WebSocket logging",
      "Distributed tracing (OpenTracing/OpenTelemetry)",
      "Metrics collection (Prometheus/JMX)",
      "Performance monitoring and APM",
      "Business intelligence dashboards"
    ]
  },
  {
    id: "extensibility",
    title: "Extensibility & Customization",
    description: "Flexible platform with extensive customization capabilities",
    icon: "🔧",
    color: "orange",
    features: [
      "Product REST APIs (Publisher, Dev Portal, Admin)",
      "Gateway and Service Catalog APIs",
      "DevOps and Governance APIs",
      "Custom key and gateway extensions",
      "Workflow customization",
      "Custom grant types and handlers",
      "Single Sign-On (SSO) integration",
      "Deep portal theming capabilities",
      "UI customization framework",
      "Plugin and middleware support"
    ]
  },
  {
    id: "administration",
    title: "Administration & Platform",
    description: "Enterprise-grade platform management and administration",
    icon: "⚙️",
    color: "gray",
    features: [
      "Multitenancy support and isolation",
      "User and role management",
      "User store management and integration",
      "Multiple gateway setup and configuration",
      "External Key Manager integrations",
      "WSO2 IS, Keycloak, Okta, Auth0 support",
      "PingFederate and Azure AD integration",
      "GDPR compliance and data protection",
      "Security hardening and best practices",
      "Backup and disaster recovery"
    ]
  },
  {
    id: "ai-gateway",
    title: "AI Gateway (for AI/LLM APIs)",
    description: "Specialized gateway for AI and Large Language Model APIs",
    icon: "🤖",
    color: "purple",
    features: [
      "Backend security for AI services",
      "Per-model rate limiting and controls",
      "Multi-model routing with load balancing",
      "Automatic failover for AI services",
      "Vendor management with connectors",
      "Default and custom AI connectors",
      "Prompt management and templates",
      "Prompt decorators and enhancement",
      "AI guardrails with regex validation",
      "JSON schema validation for AI responses",
      "PII masking and data protection",
      "Content safety and filtering"
    ]
  }
];