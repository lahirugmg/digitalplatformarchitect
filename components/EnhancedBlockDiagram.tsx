import { MessagingDiagram } from "./diagrams/blocks/MessagingDiagram";
import { IntegrationDiagram } from "./diagrams/blocks/IntegrationDiagram";
import { APIDiagram } from "./diagrams/blocks/APIDiagram";
import { IAMDiagram } from "./diagrams/blocks/IAMDiagram";
import { IDPDiagram } from "./diagrams/blocks/IDPDiagram";
import { DataPlatformDiagram } from "./diagrams/blocks/DataPlatformDiagram";
import { ObservabilityDiagram } from "./diagrams/blocks/ObservabilityDiagram";
import { SecurityDiagram } from "./diagrams/blocks/SecurityDiagram";

// Enhanced versions of diagrams for detailed views
const enhancedBlockDiagrams: Record<string, React.ComponentType> = {
  "messaging-streaming-platform": MessagingDiagram,
  "enterprise-integration": IntegrationDiagram,
  "api-management": APIDiagram,
  "identity-access-management": IAMDiagram,
  "internal-developer-platform": IDPDiagram,
  "data-platform": DataPlatformDiagram,
  "observability-operations": ObservabilityDiagram,
  "security-services": SecurityDiagram,
};

export function EnhancedBlockDiagram({ 
  slug, 
  title,
  interactive = true 
}: { 
  slug: string;
  title: string;
  interactive?: boolean;
}) {
  const DiagramComponent = enhancedBlockDiagrams[slug];
  
  if (!DiagramComponent) {
    return null;
  }

  return (
    <div className={`enhanced-block-diagram ${interactive ? 'interactive' : ''}`}>
      <div className="diagram-header">
        <h3>{title} Architecture</h3>
        <p className="diagram-subtitle">
          Detailed view showing components, connections, and data flow
        </p>
      </div>
      <div className="enhanced-diagram-container">
        <DiagramComponent />
        {interactive && (
          <div className="diagram-overlay">
            <div className="diagram-controls">
              <button className="diagram-control-btn" title="Zoom In">
                🔍+
              </button>
              <button className="diagram-control-btn" title="Reset View">
                ↻
              </button>
              <button className="diagram-control-btn" title="Full Screen">
                ⛶
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="diagram-legend">
        <div className="legend-item">
          <div className="legend-color legend-primary"></div>
          <span>Core Components</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-secondary"></div>
          <span>Supporting Services</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-flow"></div>
          <span>Data Flow</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-security"></div>
          <span>Security Boundary</span>
        </div>
      </div>
    </div>
  );
}
