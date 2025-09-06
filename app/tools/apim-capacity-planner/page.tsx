import CapacityPlanner from "@/components/CapacityPlanner";

export const metadata = {
  title: "WSO2 APIM Capacity Planning Calculator",
  description: "Interactive calculator to estimate gateway capacity and node count for WSO2 API Manager 4.5.0 based on traffic patterns and performance requirements.",
};

export default function APIMCapacityPlannerPage() {
  return (
    <div className="container">
      <div className="page-hero">
        <h1 className="page-title">WSO2 APIM 4.5.0 Capacity Planning Calculator</h1>
        <p className="lede">
          Estimate gateway capacity and node count for WSO2 API Manager 4.5.0 based on 
          your traffic patterns, message sizes, and performance requirements. This tool uses 
          official WSO2 APIM 4.5.0 performance test results as baseline data.
        </p>
      </div>
      
      <CapacityPlanner />
    </div>
  );
}