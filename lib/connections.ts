export type Connection = {
  block: { name: string; slug: string };
  /** Optional subtopics to clarify scope within a block (e.g., Messaging vs Streaming) */
  subtopics?: string[];
  /** Comma separated label version kept for simple textual display */
  patterns: string;
  /** Slugs of the architectural patterns this block enables */
  patternSlugs: string[];
  description: string;
};

export const connections: Connection[] = [
  {
    block: { name: "Messaging & Streaming Platform", slug: "messaging-streaming-platform" },
    subtopics: ["Messaging", "Streaming", "Security", "Observability"],
    patterns: "Event-Driven, Microservices, CQRS",
    patternSlugs: ["event-driven-architecture", "microservice-architecture", "cqrs"],
    description: "Provides secure, observable messaging and streaming infrastructure to enable event-driven patterns, decouple services, support async workflows, and ensure enterprise-grade reliability.",
  },
  {
    block: { name: "Enterprise Integration", slug: "enterprise-integration" },
    patterns: "Layered, Client-Server, SOA",
    patternSlugs: ["layered-architecture", "client-server", "service-oriented-architecture"],
    description: "Connects heterogeneous systems, supports ETL, and ensures interoperability.",
  },
  {
    block: { name: "API Management", slug: "api-management" },
    patterns: "Microservices, Clean Architecture, MCP Servers",
    patternSlugs: ["microservice-architecture", "clean-architecture", "bijira-mcp-servers"],
    description: "Securely exposes APIs, enforces policies, manages discoverability, and enables AI agent integration.",
  },
  {
    block: { name: "Identity & Access Management", slug: "identity-access-management" },
    patterns: "Hexagonal, Clean, Client-Server",
    patternSlugs: ["hexagonal-architecture", "clean-architecture", "client-server"],
    description: "Provides authentication, authorization, and federation for all services.",
  },
  {
    block: { name: "Internal Developer Platform", slug: "internal-developer-platform" },
    patterns: "Microservices, Serverless",
    patternSlugs: ["microservice-architecture", "serverless"],
    description: "Enables self-service deployments, golden paths, and faster delivery cycles.",
  },
  {
    block: { name: "Data Platform", slug: "data-platform" },
    patterns: "Data Mesh, CQRS",
    patternSlugs: ["data-mesh", "cqrs"],
    description: "Treats data as a product, enabling insights, ML, and distributed governance.",
  },
  {
    block: { name: "Observability & Operations", slug: "observability-operations" },
    patterns: "All patterns",
    patternSlugs: [
      "microservice-architecture",
      "event-driven-architecture",
      "serverless",
      "layered-architecture",
      "hexagonal-architecture"
    ],
    description: "Provides visibility, SLOs, and resilience validation across architectures.",
  },
];
