import { MessagingDiagram } from "./diagrams/blocks/MessagingDiagram";
import { IntegrationDiagram } from "./diagrams/blocks/IntegrationDiagram";
import { APIDiagram } from "./diagrams/blocks/APIDiagram";
import { IAMDiagram } from "./diagrams/blocks/IAMDiagram";
import { IDPDiagram } from "./diagrams/blocks/IDPDiagram";
import { DataPlatformDiagram } from "./diagrams/blocks/DataPlatformDiagram";
import { ObservabilityDiagram } from "./diagrams/blocks/ObservabilityDiagram";
import { SecurityDiagram } from "./diagrams/blocks/SecurityDiagram";
import { CloudNativeDiagram } from "./diagrams/blocks/CloudNativeDiagram";
import { CollaborationDiagram } from "./diagrams/blocks/CollaborationDiagram";

const blockDiagrams: Record<string, React.ComponentType> = {
  "messaging-streaming-platform": MessagingDiagram,
  "enterprise-integration": IntegrationDiagram,
  "api-management": APIDiagram,
  "identity-access-management": IAMDiagram,
  "internal-developer-platform": IDPDiagram,
  "data-platform": DataPlatformDiagram,
  "observability-operations": ObservabilityDiagram,
  "security-services": SecurityDiagram,
  "cloud-native-platform-services": CloudNativeDiagram,
  "collaboration-knowledge-platforms": CollaborationDiagram,
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
