"use client";

import { useState, useEffect, useMemo } from "react";
import performanceData from "@/data/wso2-apim-4.5.0-performance.json";
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

export default function CapacityPlanner() {
  // Form state
  const [messageSize, setMessageSize] = useState<number>(1);
  const [messageSizeUnit, setMessageSizeUnit] = useState<string>("KiB");
  const [targetTps, setTargetTps] = useState<number>(1000);
  const [concurrentUsers, setConcurrentUsers] = useState<number>(200);
  const [trafficType, setTrafficType] = useState<string>("echo");
  const [safetyHeadroom, setSafetyHeadroom] = useState<number>(30);

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
  }, [messageSize, messageSizeUnit, targetTps, concurrentUsers, trafficType, safetyHeadroom]);

  return (
    <div className="capacity-planner">
      <div className="stack gap-xl">
        <div className="planner-panels">
        {/* Input Controls */}
        <div className="section-card">
          <div className="section-content">
            <h2 className="section-title">Configuration</h2>
            <div className="planner-form">
              
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
                <label className="form-label">Traffic Type</label>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      value="echo"
                      checked={trafficType === "echo"}
                      onChange={(e) => setTrafficType(e.target.value)}
                    />
                    <span className="radio-label">
                      Pass-through (Echo API)
                      <span className="radio-desc">Higher throughput, minimal processing</span>
                    </span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      value="mediation"
                      checked={trafficType === "mediation"}
                      onChange={(e) => setTrafficType(e.target.value)}
                    />
                    <span className="radio-label">
                      Mediation (Payload Transform)
                      <span className="radio-desc">Lower throughput due to processing overhead</span>
                    </span>
                  </label>
                </div>
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
                  onChange={(e) => setSafetyHeadroom(Number(e.target.value) || 0)}
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
                <div className="assumption-item">
                  <strong>Backend Delay:</strong> {performanceData.metadata.testConditions.backendDelay}
                </div>
                <div className="assumption-item">
                  <strong>Security:</strong> {performanceData.metadata.testConditions.security}
                </div>
              </div>
            </div>
          </div>

          <div className="disclaimer-card">
            <h3 className="disclaimer-title">⚠️ Important Disclaimer</h3>
            <p className="disclaimer-text">
              {performanceData.notes.disclaimer}
            </p>
            <div className="disclaimer-links">
              <a 
                href="https://apim.docs.wso2.com/en/4.5.0/install-and-setup/setup/deployment-best-practices/performance-tests-results/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="disclaimer-link"
              >
                📊 View Complete WSO2 APIM 4.5.0 Test Results
              </a>
              <a 
                href="https://github.com/wso2/performance-apim" 
                target="_blank" 
                rel="noopener noreferrer"
                className="disclaimer-link"
              >
                🔬 WSO2 Performance Repository
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
