import { ArchitectureExplorer } from "@/components/ArchitectureExplorer";

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
    </div>
  );
}
