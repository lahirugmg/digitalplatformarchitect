import { ArchitectureExplorer } from "@/components/ArchitectureExplorer";
import { SolutionL0Diagram } from "@/components/diagrams/SolutionL0Diagram";
import {
  BusinessL0Diagram,
  BusinessL1Diagram,
  BusinessL2Diagram,
  SolutionL1Diagram,
  SolutionL2Diagram,
  DeploymentL0Diagram,
  DeploymentL1Diagram,
  DeploymentL2Diagram,
} from "@/components/diagrams/samples/ArchitectureSamples";

export const metadata = {
  title: "Architecture Documentation",
  description: "Interactive architecture documentation across business, solution, and deployment views (L0–L2).",
};

export default function ArchitectureDocumentationToolPage() {
  return (
    <div className="container">
      <div className="page-hero">
        <h1 className="page-title">Architecture Documentation</h1>
        <p className="lede">
          Browse architecture documentation across Business, Solution, and Deployment views. Toggle roles and depth to see how L0–L2 perspectives connect.
        </p>
      </div>

  <section className="stack gap-lg">
    <ArchitectureExplorer maxLevelLimit={2} />
  </section>

  
      {/* Visual language guidance summary */}
      <section className="stack gap-sm" style={{ marginTop: 8 }}>
        <div className="diagram-header">
          <h3 className="section-title">How To Read These Diagrams</h3>
          <p className="section-description">A compact guide to the notation used across our architecture illustrations.</p>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <div className="prose">
            <ul>
              <li><strong>Shapes</strong>: Use different silhouettes to signal what a thing is (for example, service, datastore, user). A given shape should map to one category only.</li>
              <li><strong>Labels</strong>: Be explicit about what the text names — a capability, a product, or a specific technology. Only label items that benefit from clarification.</li>
              <li><strong>Connectors</strong>: Arrows show direction. Vary line style to convey semantics: solid for synchronous calls, dashed for asynchronous or control, dotted for occasional/batch. A single line means one logical link unless annotated.</li>
              <li><strong>Color</strong>: Color carries meaning, not decoration. Common encodings include lifecycle (current/planned), ownership, or licensing (OSS/commercial). Keep the palette consistent and define it in the legend.</li>
              <li><strong>Layout</strong>: Position is informative. Left→right or top→bottom usually indicates flow from source to consumer. Boxes that span lanes represent cross‑cutting or shared capabilities.</li>
              <li><strong>Icons</strong>: Treat icons as hints, not substitutes for names. If an icon implies a chosen product, pair it with the name and clarify whether it is implemented or merely an option.</li>
              <li><strong>Legend</strong>: Every diagram should include a small key that decodes shapes, colors, and line styles, plus any important caveats directly on the figure.</li>
              <li><strong>Glossary</strong>: Maintain a short glossary for recurring terms and abbreviations so meanings stay consistent across documents and teams.</li>
            </ul>
          </div>
        </div>
  </section>

  {/* Sample diagrams by level and category */}
  <section className="stack gap-lg" style={{ marginTop: 24 }}>
    <div className="diagram-header">
      <h2 className="section-title">Sample Diagrams</h2>
      <p className="section-description">Illustrative examples for Business, Solution, and Deployment architectures across L0–L2 using the enterprise building blocks.</p>
    </div>

    {/* L0 row */}
    <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 16 }}>
      <div className="card" style={{ padding: 12 }}>
        <h3 className="section-title" style={{ fontSize: 16 }}>Business L0</h3>
        <BusinessL0Diagram />
      </div>
      <div className="card" style={{ padding: 12 }}>
        <h3 className="section-title" style={{ fontSize: 16 }}>Solution L0</h3>
        <SolutionL0Diagram />
      </div>
      <div className="card" style={{ padding: 12 }}>
        <h3 className="section-title" style={{ fontSize: 16 }}>Deployment L0</h3>
        <DeploymentL0Diagram />
      </div>
    </div>

    {/* L1 row */}
    <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 16 }}>
      <div className="card" style={{ padding: 12 }}>
        <h3 className="section-title" style={{ fontSize: 16 }}>Business L1</h3>
        <BusinessL1Diagram />
      </div>
      <div className="card" style={{ padding: 12 }}>
        <h3 className="section-title" style={{ fontSize: 16 }}>Solution L1</h3>
        <SolutionL1Diagram />
      </div>
      <div className="card" style={{ padding: 12 }}>
        <h3 className="section-title" style={{ fontSize: 16 }}>Deployment L1</h3>
        <DeploymentL1Diagram />
      </div>
    </div>

    {/* L2 row */}
    <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 16 }}>
      <div className="card" style={{ padding: 12 }}>
        <h3 className="section-title" style={{ fontSize: 16 }}>Business L2</h3>
        <BusinessL2Diagram />
      </div>
      <div className="card" style={{ padding: 12 }}>
        <h3 className="section-title" style={{ fontSize: 16 }}>Solution L2</h3>
        <SolutionL2Diagram />
      </div>
      <div className="card" style={{ padding: 12 }}>
        <h3 className="section-title" style={{ fontSize: 16 }}>Deployment L2</h3>
        <DeploymentL2Diagram />
      </div>
    </div>
  </section>
    </div>
  );
}
