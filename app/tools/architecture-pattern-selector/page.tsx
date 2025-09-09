import { ArchitecturePatternSelector } from "@/components/ArchitecturePatternSelector";

export const metadata = {
  title: "Architecture Pattern Selector",
  description: "Interactive tool to help you choose the right architectural patterns based on your business needs and technical constraints.",
};

export default function ArchitecturePatternSelectorPage() {
  return (
    <div className="container">
      <div className="page-hero">
        <h1 className="page-title">Architecture Pattern Selector</h1>
        <p className="lede">
          Answer a few questions about your system requirements to get personalized architecture pattern recommendations 
          with detailed guidance across six key platform pillars.
        </p>
      </div>

      <section className="stack gap-lg">
        <ArchitecturePatternSelector />
      </section>
    </div>
  );
}