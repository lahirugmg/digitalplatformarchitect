import { MessagingDiagram } from "./diagrams/blocks/MessagingDiagram";
import { IntegrationDiagram } from "./diagrams/blocks/IntegrationDiagram";
import { APIDiagram } from "./diagrams/blocks/APIDiagram";
import { IAMDiagram } from "./diagrams/blocks/IAMDiagram";
import { IDPDiagram } from "./diagrams/blocks/IDPDiagram";
import { DataPlatformDiagram } from "./diagrams/blocks/DataPlatformDiagram";
import { ObservabilityDiagram } from "./diagrams/blocks/ObservabilityDiagram";
import { SecurityDiagram } from "./diagrams/blocks/SecurityDiagram";
import { ApplicationServicesDiagram } from "./diagrams/blocks/ApplicationServicesDiagram";
import { AIMLDiagram } from "./diagrams/blocks/AIMLDiagram";

const blockDiagrams: Record<string, React.ComponentType> = {
  "application-services": ApplicationServicesDiagram,
  "messaging-streaming-platform": MessagingDiagram,
  "enterprise-integration": IntegrationDiagram,
  "api-management": APIDiagram,
  "identity-access-management": IAMDiagram,
  "internal-developer-platform": IDPDiagram,
  "data-platform": DataPlatformDiagram,
  "ai-ml-intelligent-services": AIMLDiagram,
  "observability-operations": ObservabilityDiagram,
  "security-services": SecurityDiagram,
};

export function BlockDiagram({ slug }: { slug: string }) {
  const DiagramComponent = blockDiagrams[slug];
  
  if (!DiagramComponent) {
    return null;
  }

  return (
    <div className="block-diagram">
      <DiagramComponent />
    </div>
  );
}
