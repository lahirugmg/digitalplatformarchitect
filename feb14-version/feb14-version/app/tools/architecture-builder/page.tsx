import { ArchitectureBuilder } from "@/components/ArchitectureBuilder";

export const metadata = {
  title: "Architecture Builder",
  description: "Drag and drop Building Blocks onto a canvas, connect them, and sketch your platform architecture.",
};

export default function ArchitectureBuilderPage() {
  return (
    <div className="container">
      <div className="page-hero">
        <h1 className="page-title">Architecture Builder</h1>
        <p className="lede">Drag Building Blocks from the palette, arrange them on the canvas, and click Connect to link components.</p>
      </div>

      <section className="stack gap-lg">
        <ArchitectureBuilder />
      </section>
    </div>
  );
}

