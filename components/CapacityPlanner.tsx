"use client";

import { useState, useEffect, useMemo } from "react";
import wso2apim450 from "../data/wso2-apim-4.5.0-performance.json";
import wso2mi440 from "../data/wso2-mi-4.4.0-performance.json";
import wso2bi2025q3 from "../data/wso2-ballerina-integrator-2025q3.json";

// Simple on-demand Linux hourly pricing (USD) for common instance types
// Source: Approx. public on-demand pricing (region-dependent). Adjust as needed.
const INSTANCE_HOURLY_COST_USD: Record<string, number> = {
  "c5.large": 0.085,
};

function formatCurrencyUSD(amount: number): string {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}
import { 
  getInterpolatedThroughput, 
  getInterpolatedLatency, 
  calculateRecommendedNodes,
  convertToBytes,
  formatBytes,
  getTShirtSize 
} from "@/lib/interpolate";

interface CalculationResults {
  perNodeThroughput: number;
  recommendedNodes: number;
  effectiveCapacity: number;
  latency: { avg: number; p90: number; p99: number } | null;
  tShirtSize: string;
}

type DatasetKey = "wso2-apim-4.5.0" | "wso2-mi-4.4.0" | "wso2-ballerina-integrator-2025q3";

const DATASETS: Record<DatasetKey, { label: string; data: any } > = {
  "wso2-apim-4.5.0": { label: "WSO2 API Manager 4.5.0", data: wso2apim450 },
  "wso2-mi-4.4.0": { label: "WSO2 Micro Integrator 4.4.0", data: wso2mi440 },
  "wso2-ballerina-integrator-2025q3": { label: "WSO2 Ballerina Integrator 2025 Q3", data: wso2bi2025q3 },
};

const TRAFFIC_OPTIONS: Record<DatasetKey, { value: string; label: string; desc?: string }[]> = {
  "wso2-apim-4.5.0": [
    { value: "echo", label: "Pass-through (Echo API)", desc: "Higher throughput, minimal processing" },
    { value: "mediation", label: "Mediation (Payload Transform)", desc: "Lower throughput due to processing overhead" },
  ],
  "wso2-mi-4.4.0": [
    { value: "directProxy", label: "Direct Proxy", desc: "PassThrough Proxy Service calling backend" },
    { value: "directApi", label: "Direct API", desc: "PassThrough API Service calling backend" },
    { value: "cbrTransportHeaderProxy", label: "CBR Transport Header Proxy", desc: "Routes based on HTTP header" },
    { value: "xsltProxy", label: "XSLT Proxy", desc: "XSLT transformations on request/response" },
  ],
  "wso2-ballerina-integrator-2025q3": [
    { value: "pt_http_h1c_h1c", label: "Passthrough HTTP (h1c → h1c)", desc: "An HTTP Service that forwards all requests to an HTTP back-end service." },
    { value: "json2xml_http", label: "JSON → XML HTTP", desc: "An HTTP Service that transforms JSON requests to XML and forwards them to an HTTP back-end service." },
    { value: "pt_https_h1_h1", label: "Passthrough HTTPS (h1 → h1)", desc: "An HTTPS Service that forwards all requests to an HTTPS back-end service." },
    { value: "json2xml_https", label: "JSON → XML HTTPS", desc: "An HTTPS Service that transforms JSON requests to XML and forwards them to an HTTPS back-end service." },
    { value: "h2_downgrade", label: "HTTP/2 client & server downgrade", desc: "An HTTP/2 (with TLS) server accepts requests from an HTTP/1.1 (with TLS) client and the HTTP/2 (with TLS) client sends requests to an HTTP/1.1 (with TLS) back-end service; both upstream and downstream are downgraded to HTTP/1.1 (with TLS)." }
  ],
};

export default function CapacityPlanner() {
  // Form state
  const [messageSize, setMessageSize] = useState<number>(1);
  const [messageSizeUnit, setMessageSizeUnit] = useState<string>("KiB");
  const [targetTps, setTargetTps] = useState<number>(1000);
  const [concurrentUsers, setConcurrentUsers] = useState<number>(200);
  const [trafficType, setTrafficType] = useState<string>("echo");
  const [safetyHeadroom, setSafetyHeadroom] = useState<number>(30);
  const [dataset, setDataset] = useState<DatasetKey>("wso2-apim-4.5.0");

  const performanceData = DATASETS[dataset].data;
  const datasetLabel = DATASETS[dataset].label;
  const trafficOptions = TRAFFIC_OPTIONS[dataset];
  const selectedTrafficMeta = trafficOptions.find((o) => o.value === trafficType);

  // Ensure trafficType is valid for the selected dataset
  useEffect(() => {
    const valid = TRAFFIC_OPTIONS[dataset].map(o => o.value);
    if (!valid.includes(trafficType)) {
      setTrafficType(valid[0]);
    }
  }, [dataset]);

  // Calculate results
  const results: CalculationResults = useMemo(() => {
    const messageSizeBytes = convertToBytes(messageSize, messageSizeUnit);
    
    const perNodeThroughput = getInterpolatedThroughput(
      messageSizeBytes, 
      concurrentUsers, 
      trafficType, 
      performanceData
    );
    
    const recommendedNodes = calculateRecommendedNodes(
      targetTps, 
      perNodeThroughput, 
      safetyHeadroom
    );
    
    const effectiveCapacity = perNodeThroughput * (1 - safetyHeadroom / 100);
    
    const latency = getInterpolatedLatency(
      messageSizeBytes, 
      concurrentUsers, 
      trafficType, 
      performanceData
    );
    
    const tShirtSize = getTShirtSize(recommendedNodes);

    return {
      perNodeThroughput,
      recommendedNodes,
      effectiveCapacity,
      latency,
      tShirtSize
    };
  }, [messageSize, messageSizeUnit, targetTps, concurrentUsers, trafficType, safetyHeadroom, dataset]);

  // Annual cost estimate based on instance type and recommended node count
  const instanceType = performanceData.hardware.instance;
  const hourly = INSTANCE_HOURLY_COST_USD[instanceType];
  const annualCost = hourly ? results.recommendedNodes * hourly * 24 * 365 : null;

  const hasThroughputData = Boolean(performanceData?.throughput?.[trafficType]) &&
    Object.keys(performanceData?.throughput?.[trafficType] || {}).length > 0;

  const testConditions = (performanceData as any)?.metadata?.testConditions as
    | { backendDelay?: string; security?: string }
    | undefined;

  const disclaimerText = (performanceData as any)?.notes?.disclaimer ??
    `Performance results are indicative and may vary by environment and workload. Dataset: ${datasetLabel}.`;

  return (
    <div className="capacity-planner">
      <div className="stack gap-xl">
        <div className="planner-panels">
        {/* Input Controls */}
        <div className="section-card">
          <div className="section-content">
            <h2 className="section-title">Configuration</h2>
            <div className="planner-form">
              {/* Dataset selection */}
              <div className="form-group">
                <label className="form-label">
                  Dataset
                  <span className="form-hint">Choose product/version for baseline results</span>
                </label>
                <select
                  className="form-select"
                  value={dataset}
                  onChange={(e) => setDataset(e.target.value as DatasetKey)}
                >
                  {Object.entries(DATASETS).map(([key, meta]) => (
                    <option key={key} value={key}>{meta.label}</option>
                  ))}
                </select>
              </div>
              
              {/* Message Size */}
              <div className="form-group">
                <label className="form-label">
                  Average Message Size
                  <span className="form-hint">Size of API request/response payload (Max 100 KiB)</span>
                </label>
                <div className="input-group">
                  {/** Determine dynamic max based on unit: 100 KiB or 102,400 Bytes */}
                  {/** Note: We clamp values in onChange as well */}
                  {(() => null)()}
                  
                  <input
                    type="number"
                    value={messageSize}
                    max={messageSizeUnit === "KiB" ? 100 : 102400}
                    onChange={(e) => {
                      const raw = Number(e.target.value);
                      const max = messageSizeUnit === "KiB" ? 100 : 102400;
                      const next = isNaN(raw) || raw < 1 ? 1 : Math.min(raw, max);
                      setMessageSize(next);
                    }}
                    min="1"
                    className="form-input"
                    placeholder="1"
                  />
                  <select
                    value={messageSizeUnit}
                    onChange={(e) => {
                      const unit = e.target.value;
                      // If switching to KiB, cap at 100; if Bytes, cap at 102400
                      const max = unit === "KiB" ? 100 : 102400;
                      setMessageSizeUnit(unit);
                      setMessageSize((prev) => Math.min(prev, max));
                    }}
                    className="form-select"
                  >
                    <option value="Bytes">Bytes</option>
                    <option value="KiB">KiB</option>
                  </select>
                </div>
              </div>

              {/* Target TPS */}
              <div className="form-group">
                <label className="form-label">
                  Target TPS
                  <span className="form-hint">Expected transactions per second</span>
                </label>
                <input
                  type="number"
                  value={targetTps}
                  onChange={(e) => setTargetTps(Number(e.target.value) || 1)}
                  min="1"
                  className="form-input"
                  placeholder="1000"
                />
              </div>

              {/* Concurrent Users */}
              <div className="form-group">
                <label className="form-label">
                  Concurrent Users
                  <span className="form-hint">Number of simultaneous users (official tests use 100/200/500/1000)</span>
                </label>
                <input
                  type="number"
                  value={concurrentUsers}
                  onChange={(e) => setConcurrentUsers(Number(e.target.value) || 1)}
                  min="1"
                  className="form-input"
                  placeholder="200"
                />
              </div>

              {/* Traffic Type */}
              <div className="form-group">
                <label className="form-label">
                  Traffic Type
                  {selectedTrafficMeta?.desc && (
                    <span className="form-hint">{selectedTrafficMeta.desc}</span>
                  )}
                </label>
                <select
                  className="form-select"
                  value={trafficType}
                  onChange={(e) => setTrafficType(e.target.value)}
                >
                  {trafficOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Safety Headroom */}
              <div className="form-group">
                <label className="form-label">
                  Safety Headroom (%)
                  <span className="form-hint">Capacity buffer to handle traffic spikes</span>
                </label>
                <input
                  type="number"
                  value={safetyHeadroom}
                  onChange={(e) => {
                    const raw = Number(e.target.value);
                    const next = isNaN(raw) ? 0 : Math.max(0, Math.min(raw, 90));
                    setSafetyHeadroom(next);
                  }}
                  min="0"
                  max="90"
                  className="form-input"
                  placeholder="30"
                />
              </div>

            </div>
          </div>
        </div>

        {/* Results */}
        <div className="section-card">
          <div className="section-content">
            <h2 className="section-title">Capacity Estimation</h2>
            
            {/* Key Metrics */}
            <div className="results-grid">
              {!hasThroughputData && (
                <div className="result-card" style={{ gridColumn: "1 / -1" }}>
                  <div className="result-label">Dataset Incomplete</div>
                  <div className="result-unit">No throughput data found for the selected dataset and traffic type.</div>
                </div>
              )}
              <div className="result-card primary">
                <div className="result-value">{results.recommendedNodes}</div>
                <div className="result-label">Recommended Nodes</div>
                <div className="result-unit">
                  Node size: {performanceData.hardware.vCPU} vCPU, {performanceData.hardware.memGiB} GiB
                </div>
                <div className="result-badge">{results.tShirtSize}</div>
              </div>
              
              <div className="result-card">
                <div className="result-value">{results.perNodeThroughput.toLocaleString()}</div>
                <div className="result-label">TPS per Node</div>
                <div className="result-unit">{formatBytes(convertToBytes(messageSize, messageSizeUnit))} payload</div>
              </div>
              
              <div className="result-card">
                <div className="result-value">{results.effectiveCapacity.toLocaleString()}</div>
                <div className="result-label">Effective Capacity per Node</div>
                <div className="result-unit">with {safetyHeadroom}% headroom</div>
              </div>
              
              <div className="result-card">
                <div className="result-value">{(results.recommendedNodes * results.effectiveCapacity).toLocaleString()}</div>
                <div className="result-label">Total Cluster Capacity</div>
                <div className="result-unit">TPS</div>
              </div>

              <div className="result-card">
                <div className="result-value">{annualCost != null ? formatCurrencyUSD(annualCost) : "—"}</div>
                <div className="result-label">Estimated Annual Cost</div>
                <div className="result-unit">
                  {instanceType}
                  {hourly ? ` @ $${hourly.toFixed(3)}/hr` : " (price unknown)"}
                </div>
              </div>
            </div>

            {/* Latency Information */}
            {results.latency && (
              <div className="latency-section">
                <h3 className="subsection-title">Indicative Latency</h3>
                <div className="latency-metrics">
                  <div className="latency-item">
                    <span className="latency-label">Average:</span>
                    <span className="latency-value">{results.latency.avg}ms</span>
                  </div>
                  <div className="latency-item">
                    <span className="latency-label">90th Percentile:</span>
                    <span className="latency-value">{results.latency.p90}ms</span>
                  </div>
                  <div className="latency-item">
                    <span className="latency-label">99th Percentile:</span>
                    <span className="latency-value">{results.latency.p99}ms</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        </div>

        {/* Assumptions & Disclaimer */}
        <div className="assumptions-section">
          <div className="assumption-card">
            <h3 className="assumption-title">⚙️ Test Environment & Assumptions</h3>
            <div className="assumption-content">
              <div className="assumption-grid">
                <div className="assumption-item">
                  <strong>Hardware:</strong> {performanceData.hardware.instance} ({performanceData.hardware.vCPU} vCPU, {performanceData.hardware.memGiB} GiB)
                </div>
                <div className="assumption-item">
                  <strong>OS:</strong> {performanceData.hardware.os}
                </div>
                <div className="assumption-item">
                  <strong>Java:</strong> {performanceData.hardware.java}
                </div>
                {testConditions?.backendDelay && (
                  <div className="assumption-item">
                    <strong>Backend Delay:</strong> {testConditions.backendDelay}
                  </div>
                )}
                {testConditions?.security && (
                  <div className="assumption-item">
                    <strong>Security:</strong> {testConditions.security}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="disclaimer-card">
            <h3 className="disclaimer-title">⚠️ Important Disclaimer</h3>
            <p className="disclaimer-text">
              {disclaimerText}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
