import CapacityPlanner from "@/components/CapacityPlanner";

export const metadata = {
  title: "Capacity Planning Calculator",
  description: "Estimate gateway capacity and node count based on your traffic patterns and the selected dataset of performance test results.",
};

export default function APIMCapacityPlannerPage() {
  return (
    <div className="container">
      <div className="page-hero">
        <h1 className="page-title">Capacity Planning Calculator</h1>
        <p className="lede">
          Estimate gateway capacity and node count based on your traffic patterns, message sizes, and the selected dataset of official performance test results.
        </p>
      </div>
      
      <CapacityPlanner />
    </div>
  );
}
