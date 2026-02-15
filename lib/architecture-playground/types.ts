/**
 * Type definitions for the Interactive Architecture Playground
 *
 * This module defines the core data structures for representing
 * multi-level, persona-aware architecture diagrams with theory-practice linkage.
 */

// ============================================================================
// Core Type Definitions
// ============================================================================

export type DetailLevel = 'L0' | 'L1' | 'L2' | 'L3';
export type Persona =
  | 'business'           // Business Stakeholder
  | 'product'            // Product Manager
  | 'ba'                 // Business Analyst
  | 'uxdesigner'         // UX/UI Designer
  | 'ea'                 // Enterprise Architect
  | 'security'           // Security Architect
  | 'data'               // Data Architect
  | 'implementation'     // Implementation Lead (Dev/SRE)
  | 'qa';                // QA Engineer
export type NodeCategory = 'infrastructure' | 'service' | 'data' | 'integration' | 'security' | 'frontend' | 'platform';
export type ConnectionType = 'sync' | 'async' | 'data-flow' | 'dependency' | 'deployment';
export type PlaygroundMode = 'explore' | 'theory' | 'practice';
export type ViewType = 'flowchart' | 'capability-map' | 'system-landscape' | 'integration-patterns' |
                       'component-diagram' | 'deployment-view' | 'code-view' | 'api-specs' |
                       'deployment-configs' | 'data-flow' | 'journey-map';

// ============================================================================
// Architecture Component
// ============================================================================

export interface ArchitectureComponent {
  // Identity
  id: string;
  type: NodeCategory;

  // Multi-level naming
  names: {
    business: string;      // Business-friendly name
    technical: string;     // Technical/developer name
    display?: string;      // Auto-computed based on persona
  };

  // Description
  description?: string;

  // Level-specific details
  levels: {
    L0?: L0Details;
    L1?: L1Details;
    L2?: L2Details;
    L3?: L3Details;
  };

  // Theory ↔ Practice linkage
  linkage: TheoryPracticeLinkage;

  // Persona visibility rules
  visibility: VisibilityRules;

  // Visual positioning
  position: NodePosition;

  // Metrics & monitoring
  metrics?: ComponentMetrics;

  // Tags for filtering and search
  tags: string[];

  // Optional icon
  icon?: string;

  // Custom data for extensibility
  data?: Record<string, any>;
}

// ============================================================================
// Level-Specific Details
// ============================================================================

export interface L0Details {
  businessCapability: string;
  kpis: KPI[];
  icon?: string;
  color?: string;
  value?: string; // Business value statement
  owner?: string; // Business owner
}

export interface L1Details {
  systemType: string; // "Microservice", "Event Bus", "Database Cluster", etc.
  integrations: string[]; // IDs of connected systems
  pattern?: string; // Architecture pattern name
  sla?: SLA;
  responsibilities?: string[]; // What this system does
  boundaries?: string[]; // What this system doesn't do
}

export interface L2Details {
  techStack: TechStack;
  apis?: APIDefinitions;
  dependencies?: string[]; // Package/library dependencies
  configuration?: ConfigurationOverview;
  scalability?: ScalabilityInfo;
  security?: SecurityInfo;
}

export interface L3Details {
  repositoryUrl?: string;
  deploymentConfigs: DeploymentConfigs;
  codeSnippets: CodeSnippet[];
  configuration: Record<string, any>;
  monitoring?: MonitoringConfig;
  cicd?: CICDConfig;
  documentation?: DocumentationLinks;
}

// ============================================================================
// Supporting Types
// ============================================================================

export interface KPI {
  name: string;
  value: string;
  impact: 'high' | 'medium' | 'low';
  trend?: 'up' | 'down' | 'stable';
  unit?: string;
}

export interface SLA {
  uptime?: string; // e.g., "99.95%"
  latency?: string; // e.g., "200ms p99"
  throughput?: string; // e.g., "10K req/s"
  mttd?: string; // Mean Time to Detect
  mttr?: string; // Mean Time to Recover
}

export interface TechStack {
  runtime?: string; // "Spring Boot 3.2", "Node.js 20"
  language?: string; // "Java 21", "TypeScript 5"
  database?: string; // "PostgreSQL 16"
  cache?: string; // "Redis 7"
  messageQueue?: string; // "Kafka 3.6"
  framework?: string; // "Next.js 14", "React 18"
  other?: Record<string, string>;
}

export interface APIDefinitions {
  rest?: RESTAPIDefinition[];
  graphql?: GraphQLAPIDefinition;
  grpc?: GRPCAPIDefinition;
  websocket?: WebSocketAPIDefinition;
}

export interface RESTAPIDefinition {
  path: string;
  methods: ('GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH')[];
  description?: string;
  specUrl?: string; // OpenAPI spec URL
}

export interface GraphQLAPIDefinition {
  endpoint: string;
  schemaUrl?: string;
  playgroundUrl?: string;
}

export interface GRPCAPIDefinition {
  services: string[];
  protoUrl?: string;
}

export interface WebSocketAPIDefinition {
  endpoint: string;
  protocols?: string[];
}

export interface ConfigurationOverview {
  configFiles?: string[]; // ["application.yml", ".env"]
  secrets?: string[]; // Names of required secrets
  featureFlags?: string[];
}

export interface ScalabilityInfo {
  horizontal: boolean; // Can scale horizontally?
  vertical: boolean; // Can scale vertically?
  autoScaling?: {
    enabled: boolean;
    minInstances: number;
    maxInstances: number;
    metrics: string[]; // ["CPU", "Memory", "Request Rate"]
  };
}

export interface SecurityInfo {
  authentication?: string; // "OAuth 2.0", "JWT", "mTLS"
  authorization?: string; // "RBAC", "ABAC"
  encryption?: {
    inTransit: boolean;
    atRest: boolean;
  };
  compliance?: string[]; // ["GDPR", "SOC 2", "HIPAA"]
}

export interface DeploymentConfigs {
  kubernetes?: KubernetesConfig;
  terraform?: TerraformConfig;
  docker?: DockerConfig;
  cloudFormation?: CloudFormationConfig;
}

export interface KubernetesConfig {
  helmChart?: string;
  values?: Record<string, any>;
  manifests?: string[]; // URLs to manifest files
  namespace?: string;
}

export interface TerraformConfig {
  module: string;
  version?: string;
  variables?: Record<string, any>;
}

export interface DockerConfig {
  image: string;
  tag: string;
  dockerfileUrl?: string;
  registry?: string;
}

export interface CloudFormationConfig {
  templateUrl: string;
  parameters?: Record<string, any>;
}

export interface CodeSnippet {
  language: string;
  file: string;
  lineRange?: [number, number];
  url?: string;
  description?: string;
  code?: string; // Inline code if available
}

export interface MonitoringConfig {
  metrics?: string[]; // Prometheus metrics, etc.
  logs?: string[]; // Log aggregation tools
  traces?: string[]; // Distributed tracing
  dashboards?: string[]; // Dashboard URLs
  alerts?: string[]; // Alert rule URLs
}

export interface CICDConfig {
  platform: string; // "GitHub Actions", "Jenkins", "GitLab CI"
  pipelineUrl?: string;
  stages?: string[]; // ["Build", "Test", "Deploy"]
}

export interface DocumentationLinks {
  readme?: string;
  architecture?: string;
  api?: string;
  runbook?: string;
  postmortem?: string[];
}

export interface TheoryPracticeLinkage {
  theoryPage?: string; // Link to pattern/concept page
  practicePlayground?: string; // Link to interactive demo
  relatedConcepts: string[]; // Related concept IDs or URLs
  implementationGuides: string[]; // Links to how-to guides
  references?: Reference[];
}

export interface Reference {
  title: string;
  url: string;
  type: 'article' | 'book' | 'video' | 'documentation' | 'code';
}

export interface VisibilityRules {
  personas: Persona[]; // Which personas can see this component
  minLevel: DetailLevel; // Minimum zoom level to appear
  hideComplexity: boolean; // Hide for complexity-averse personas
  featuredFor?: Persona[]; // Highlighted for these personas
}

export interface NodePosition {
  x: number;
  y: number;
  layer?: number; // Z-index for layered views
  locked?: boolean; // Prevent repositioning
}

export interface ComponentMetrics {
  cost?: CostMetrics;
  performance?: PerformanceMetrics;
  reliability?: ReliabilityMetrics;
  usage?: UsageMetrics;
}

export interface CostMetrics {
  monthly: number;
  currency: string;
  breakdown?: Record<string, number>; // { "compute": 800, "storage": 200, "network": 200 }
}

export interface PerformanceMetrics {
  rps?: number; // Requests per second
  p50Latency?: number; // in milliseconds
  p95Latency?: number;
  p99Latency?: number;
  cpu?: number; // % utilization
  memory?: number; // MB used
}

export interface ReliabilityMetrics {
  uptime?: number; // %
  errorRate?: number; // %
  sloTarget?: number; // Service Level Objective
  sloActual?: number;
}

export interface UsageMetrics {
  activeUsers?: number;
  requestsPerDay?: number;
  dataProcessed?: string; // "10 TB/day"
}

// ============================================================================
// Architecture Connection (Edge)
// ============================================================================

export interface ArchitectureConnection {
  id: string;
  source: string; // Component ID
  target: string; // Component ID

  // Connection type
  type: ConnectionType;

  // Level-specific labels
  labels?: {
    L0?: string;
    L1?: string;
    L2?: string;
    L3?: string;
  };

  // Description
  description?: string;

  // Architecture pattern this connection implements
  pattern?: string; // "Request-Reply", "Pub-Sub", "SAGA", etc.

  // Visual styling
  style?: EdgeStyle;

  // Visibility rules
  visibility: VisibilityRules;

  // Data flow information
  dataFlow?: DataFlowInfo;

  // Custom data
  data?: Record<string, any>;
}

export interface EdgeStyle {
  animated?: boolean;
  dashed?: boolean;
  color?: string;
  width?: number;
  label?: string;
  labelBgColor?: string;
  labelColor?: string;
}

export interface DataFlowInfo {
  dataType?: string; // "Orders", "Events", "Logs"
  volume?: string; // "1M messages/day"
  frequency?: string; // "Real-time", "Batch (hourly)"
  protocol?: string; // "HTTP", "Kafka", "gRPC"
  format?: string; // "JSON", "Protobuf", "Avro"
}

// ============================================================================
// Architecture Graph
// ============================================================================

export interface ArchitectureGraph {
  metadata: GraphMetadata;
  components: ArchitectureComponent[];
  connections: ArchitectureConnection[];
  layouts?: LayoutConfig;
  presets?: ViewPreset[];
  annotations?: Annotation[];
}

export interface GraphMetadata {
  id: string;
  title: string;
  description: string;
  version: string;
  author: string;
  created: string; // ISO date
  updated: string; // ISO date
  tags?: string[];
  domain?: string; // "E-commerce", "FinTech", "Healthcare", etc.
}

export interface LayoutConfig {
  L0?: LayoutAlgorithm;
  L1?: LayoutAlgorithm;
  L2?: LayoutAlgorithm;
  L3?: LayoutAlgorithm;
}

export interface LayoutAlgorithm {
  algorithm: 'hierarchical' | 'force' | 'circular' | 'grid' | 'manual' | 'dagre' | 'elk';
  config?: Record<string, any>;
}

export interface ViewPreset {
  id: string;
  name: string;
  description?: string;
  persona: Persona;
  level: DetailLevel;
  focusNodes?: string[]; // Highlight these nodes
  highlightPaths?: string[][]; // Highlight these paths
  hiddenNodes?: string[]; // Hide these nodes
  annotations?: string[]; // Show these annotations
  zoom?: number;
  center?: { x: number; y: number };
}

export interface Annotation {
  id: string;
  type: 'note' | 'warning' | 'highlight' | 'region';
  title?: string;
  content: string;
  position: { x: number; y: number };
  attachedTo?: string; // Component ID
  level?: DetailLevel; // Only show at this level
  personas?: Persona[]; // Only show to these personas
  style?: {
    color?: string;
    backgroundColor?: string;
    borderColor?: string;
  };
}

// ============================================================================
// Persona Profile
// ============================================================================

export interface PersonaProfile {
  id: Persona;
  name: string;
  description: string;
  defaultLevel: DetailLevel;
  preferredViews: ViewType[];
  interests: string[];
  hideComplexity: boolean;
  icon?: string;
  color?: string;
}

// ============================================================================
// Zoom Configuration
// ============================================================================

export interface ZoomLevel {
  level: DetailLevel;
  scale: number; // Canvas scale factor (0.25 - 2.0)
  visibleNodes: string[]; // Node IDs visible at this level
  detailDensity: number; // Information density (0-1)
  transitions: {
    zoomIn?: DetailLevel;
    zoomOut?: DetailLevel;
  };
}

export interface ZoomThreshold {
  min: number;
  max: number;
}

// ============================================================================
// Playground State
// ============================================================================

export interface PlaygroundState {
  mode: PlaygroundMode;
  persona: Persona;
  level: DetailLevel;
  focusNode: string | null;
  selectedNodes: string[];
  viewport: {
    x: number;
    y: number;
    zoom: number;
  };
  activeOverlays: string[];
  showMinimap: boolean;
  showGrid: boolean;
}

// ============================================================================
// Export Configuration
// ============================================================================

export interface ExportConfig {
  format: 'png' | 'svg' | 'pdf' | 'json' | 'markdown' | 'mermaid' | 'plantuml' | 'terraform' | 'kubernetes';
  includePersonaView: boolean;
  includeLevel: boolean;
  selectedNodesOnly: boolean;
  includeTheoryLinks: boolean;
  includeMetrics: boolean;
  options?: Record<string, any>;
}

// ============================================================================
// Filter & Search
// ============================================================================

export interface FilterOptions {
  personas?: Persona[];
  levels?: DetailLevel[];
  categories?: NodeCategory[];
  tags?: string[];
  searchQuery?: string;
  showOnlyConnectedTo?: string; // Component ID
}

// ============================================================================
// Utility Types
// ============================================================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// ============================================================================
// Constants
// ============================================================================

export const DETAIL_LEVELS: DetailLevel[] = ['L0', 'L1', 'L2', 'L3'];
export const PERSONAS: Persona[] = [
  'business', 'product', 'ba', 'uxdesigner', 'ea',
  'security', 'data', 'implementation', 'qa'
];
export const NODE_CATEGORIES: NodeCategory[] = ['infrastructure', 'service', 'data', 'integration', 'security', 'frontend', 'platform'];
export const CONNECTION_TYPES: ConnectionType[] = ['sync', 'async', 'data-flow', 'dependency', 'deployment'];
