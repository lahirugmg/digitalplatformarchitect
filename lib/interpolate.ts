/**
 * Linear interpolation utility functions for WSO2 APIM capacity planning
 */

// Type definitions
interface PerformanceData {
  hardware: {
    instance: string;
    vCPU: number;
    memGiB: number;
    os: string;
    java: string;
  };
  concurrency: number[];
  messageSizesB: number[];
  apis: string[];
  throughput: {
    [apiType: string]: {
      [messageSize: string]: {
        [concurrency: string]: number;
      };
    };
  };
  latency: {
    [apiType: string]: {
      [messageSize: string]: {
        [concurrency: string]: {
          avg: number;
          p90: number;
          p99: number;
        };
      };
    };
  };
}

/**
 * Performs linear interpolation between two points
 * @param x - The input value to interpolate
 * @param x0 - Lower bound x value
 * @param y0 - Lower bound y value
 * @param x1 - Upper bound x value
 * @param y1 - Upper bound y value
 * @returns Interpolated y value
 */
export function linearInterpolate(x: number, x0: number, y0: number, x1: number, y1: number): number {
  if (x1 === x0) return y0; // Avoid division by zero
  return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

// Returns a value for a desired concurrency using the data available in a row.
// If the exact concurrency value is missing or non-positive, it linearly
// interpolates between the nearest lower and upper available concurrencies.
function getValueAtConcurrency(
  row: Record<string, number> | undefined,
  desiredConcurrency: number
): number {
  if (!row) return 0;
  const keys = Object.keys(row).map((k) => Number(k)).sort((a, b) => a - b);
  if (keys.length === 0) return 0;
  const exact = row[desiredConcurrency.toString()];
  if (typeof exact === 'number' && exact > 0) return exact;

  // Find nearest lower and upper available keys with positive values
  let lower: number | undefined;
  let upper: number | undefined;
  for (const k of keys) {
    const v = row[k.toString()];
    if (k <= desiredConcurrency && v > 0) lower = k;
    if (k >= desiredConcurrency && v > 0) { upper = k; break; }
  }

  if (lower == null && upper == null) return 0;
  if (lower == null) return row[upper!.toString()] ?? 0;
  if (upper == null) return row[lower!.toString()] ?? 0;
  const y0 = row[lower.toString()] ?? 0;
  const y1 = row[upper.toString()] ?? 0;
  if (y0 <= 0 && y1 <= 0) return 0;
  if (lower === upper) return y0;
  return linearInterpolate(desiredConcurrency, lower, y0, upper, y1);
}

/**
 * Finds the two nearest values in a sorted array
 * @param value - Value to find bounds for
 * @param array - Sorted array of numbers
 * @returns Object with lower and upper bounds or exact match
 */
export function findBounds(value: number, array: number[]): { exact?: number; lower?: number; upper?: number } {
  // Check for exact match
  if (array.includes(value)) {
    return { exact: value };
  }

  // Find bounds for interpolation
  let lower: number | undefined;
  let upper: number | undefined;

  for (let i = 0; i < array.length; i++) {
    if (array[i] < value) {
      lower = array[i];
    } else if (array[i] > value && upper === undefined) {
      upper = array[i];
      break;
    }
  }

  // Handle edge cases
  if (lower === undefined) {
    // Value is below the smallest element, use the first two elements for extrapolation
    return { lower: array[0], upper: array[1] };
  }
  if (upper === undefined) {
    // Value is above the largest element, use the last two elements for extrapolation
    return { lower: array[array.length - 2], upper: array[array.length - 1] };
  }

  return { lower, upper };
}

/**
 * Interpolates throughput based on message size for a given concurrency and API type
 */
export function interpolateThroughputByMessageSize(
  messageSize: number,
  concurrency: number,
  apiType: string,
  performanceData: PerformanceData
): number {
  const messageSizes = performanceData.messageSizesB;
  const throughputData = performanceData.throughput?.[apiType];

  if (!throughputData || Object.keys(throughputData).length === 0) {
    return 0;
  }

  // Clamp out-of-range message sizes to avoid extrapolation to negative values
  if (messageSize <= messageSizes[0]) {
    const row = throughputData[messageSizes[0].toString()];
    return getValueAtConcurrency(row, concurrency);
  }
  if (messageSize >= messageSizes[messageSizes.length - 1]) {
    const row = throughputData[messageSizes[messageSizes.length - 1].toString()];
    return getValueAtConcurrency(row, concurrency);
  }

  const bounds = findBounds(messageSize, messageSizes);

  if (bounds.exact !== undefined) {
    const row = throughputData[bounds.exact.toString()];
    return getValueAtConcurrency(row, concurrency);
  }

  if (bounds.lower !== undefined && bounds.upper !== undefined) {
    const rowLower = throughputData[bounds.lower.toString()];
    const rowUpper = throughputData[bounds.upper.toString()];
    const y0 = getValueAtConcurrency(rowLower, concurrency);
    const y1 = getValueAtConcurrency(rowUpper, concurrency);
    if (y0 <= 0 && y1 <= 0) return 0;
    return linearInterpolate(messageSize, bounds.lower, y0, bounds.upper, y1);
  }

  // Fallback - use nearest value
  const nearest = messageSizes.reduce((prev: number, curr: number) => 
    Math.abs(curr - messageSize) < Math.abs(prev - messageSize) ? curr : prev
  );
  return getValueAtConcurrency(throughputData[nearest.toString()], concurrency);
}

/**
 * Interpolates throughput based on concurrency for a given message size and API type
 */
export function interpolateThroughputByConcurrency(
  concurrency: number,
  messageSize: number,
  apiType: string,
  performanceData: PerformanceData
): number {
  const concurrencies = performanceData.concurrency;
  const row = performanceData.throughput?.[apiType]?.[messageSize.toString()];
  if (!row || Object.keys(row).length === 0) return 0;

  // Clamp out-of-range concurrencies to avoid extrapolation artifacts
  if (concurrency <= concurrencies[0]) {
    return row[concurrencies[0].toString()] ?? getValueAtConcurrency(row, concurrencies[0]);
  }
  if (concurrency >= concurrencies[concurrencies.length - 1]) {
    const last = concurrencies[concurrencies.length - 1];
    return row[last.toString()] ?? getValueAtConcurrency(row, last);
  }

  const bounds = findBounds(concurrency, concurrencies);

  if (bounds.exact !== undefined) {
    // If exact value is missing or non-positive, interpolate within the row
    const exact = row[bounds.exact.toString()];
    if (typeof exact === 'number' && exact > 0) return exact;
    return getValueAtConcurrency(row, concurrency);
  }

  if (bounds.lower !== undefined && bounds.upper !== undefined) {
    // If either bound is missing, try nearest available keys in the row
    const y0 = getValueAtConcurrency(row, bounds.lower);
    const y1 = getValueAtConcurrency(row, bounds.upper);
    if (y0 <= 0 && y1 <= 0) return 0;
    return linearInterpolate(concurrency, bounds.lower, y0, bounds.upper, y1);
  }

  // Fallback - use nearest value
  const nearest = concurrencies.reduce((prev: number, curr: number) => 
    Math.abs(curr - concurrency) < Math.abs(prev - concurrency) ? curr : prev
  );
  return getValueAtConcurrency(row, nearest);
}

/**
 * Gets interpolated throughput for given parameters
 */
export function getInterpolatedThroughput(
  messageSize: number,
  concurrency: number,
  apiType: string,
  performanceData: PerformanceData
): number {
  const messageSizes = performanceData.messageSizesB;
  const concurrencies = performanceData.concurrency;

  // Clamp inputs to known data range to prevent negative extrapolation
  const clampedMessageSize = clamp(messageSize, messageSizes[0], messageSizes[messageSizes.length - 1]);
  const clampedConcurrency = clamp(concurrency, concurrencies[0], concurrencies[concurrencies.length - 1]);

  // If throughput data for apiType is missing, return 0 to indicate no data
  const apiData = performanceData.throughput?.[apiType];
  if (!apiData || Object.keys(apiData).length === 0) {
    return 0;
  }

  // Check if both values are exact matches
  if (messageSizes.includes(clampedMessageSize) && concurrencies.includes(clampedConcurrency)) {
    const row = apiData[clampedMessageSize.toString()];
    return getValueAtConcurrency(row, clampedConcurrency);
  }

  // If message size is exact but concurrency needs interpolation
  if (messageSizes.includes(clampedMessageSize)) {
    return interpolateThroughputByConcurrency(clampedConcurrency, clampedMessageSize, apiType, performanceData);
  }

  // If concurrency is exact but message size needs interpolation
  if (concurrencies.includes(clampedConcurrency)) {
    return interpolateThroughputByMessageSize(clampedMessageSize, clampedConcurrency, apiType, performanceData);
  }

  // Both need interpolation - use bilinear interpolation
  return bilinearInterpolateThroughput(clampedMessageSize, clampedConcurrency, apiType, performanceData);
}

/**
 * Performs bilinear interpolation for both message size and concurrency
 */
function bilinearInterpolateThroughput(
  messageSize: number,
  concurrency: number,
  apiType: string,
  performanceData: PerformanceData
): number {
  const messageSizes = performanceData.messageSizesB;
  const concurrencies = performanceData.concurrency;

  const msgBounds = findBounds(messageSize, messageSizes);
  const concBounds = findBounds(concurrency, concurrencies);

  if (msgBounds.lower === undefined || msgBounds.upper === undefined ||
      concBounds.lower === undefined || concBounds.upper === undefined) {
    // Fallback to simple interpolation
    const nearestMsgSize = messageSizes.reduce((prev: number, curr: number) => 
      Math.abs(curr - messageSize) < Math.abs(prev - messageSize) ? curr : prev
    );
    return interpolateThroughputByConcurrency(concurrency, nearestMsgSize, apiType, performanceData);
  }

  // Get the four corner points
  const throughputData = performanceData.throughput?.[apiType];
  if (!throughputData) return 0;
  const rowLower = throughputData[msgBounds.lower.toString()];
  const rowUpper = throughputData[msgBounds.upper.toString()];
  const q11 = getValueAtConcurrency(rowLower, concBounds.lower);
  const q12 = getValueAtConcurrency(rowLower, concBounds.upper);
  const q21 = getValueAtConcurrency(rowUpper, concBounds.lower);
  const q22 = getValueAtConcurrency(rowUpper, concBounds.upper);
  if (q11 <= 0 && q21 <= 0) return 0;
  if (q12 <= 0 && q22 <= 0) return 0;

  // Interpolate along message size axis first
  const r1 = linearInterpolate(messageSize, msgBounds.lower, q11, msgBounds.upper, q21);
  const r2 = linearInterpolate(messageSize, msgBounds.lower, q12, msgBounds.upper, q22);

  // Then interpolate along concurrency axis
  return linearInterpolate(concurrency, concBounds.lower, r1, concBounds.upper, r2);
}

/**
 * Interpolates latency metrics for given parameters
 */
export function getInterpolatedLatency(
  messageSize: number,
  concurrency: number,
  apiType: string,
  performanceData: PerformanceData
): { avg: number; p90: number; p99: number } | null {
  const messageSizes = performanceData.messageSizesB;
  const concurrencies = performanceData.concurrency;
  const latencyRoot = performanceData.latency as any;
  const latencyData = latencyRoot ? latencyRoot[apiType] : undefined;

  if (!latencyData) {
    return null;
  }

  // Find the nearest available data point for latency
  const nearestMsgSize = messageSizes.reduce((prev: number, curr: number) => 
    Math.abs(curr - messageSize) < Math.abs(prev - messageSize) ? curr : prev
  );
  
  const nearestConcurrency = concurrencies.reduce((prev: number, curr: number) => 
    Math.abs(curr - concurrency) < Math.abs(prev - concurrency) ? curr : prev
  );

  const group = latencyData[nearestMsgSize.toString()];
  const latencyPoint = group ? group[nearestConcurrency.toString()] : undefined;
  
  if (!latencyPoint) {
    return null;
  }

  // For simplicity, return the nearest latency data
  // In a more sophisticated implementation, we could interpolate latency as well
  return {
    avg: latencyPoint.avg,
    p90: latencyPoint.p90,
    p99: latencyPoint.p99
  };
}

/**
 * Calculates recommended number of nodes
 */
export function calculateRecommendedNodes(
  targetTps: number,
  perNodeThroughput: number,
  safetyHeadroom: number
): number {
  const effectiveCapacity = perNodeThroughput * (1 - safetyHeadroom / 100);
  if (!isFinite(effectiveCapacity) || effectiveCapacity <= 0) {
    return 1; // Ensure at least one node is recommended
  }
  return Math.max(1, Math.ceil(targetTps / effectiveCapacity));
}

/**
 * Converts message size to bytes based on unit
 */
export function convertToBytes(value: number, unit: string): number {
  switch (unit.toLowerCase()) {
    case 'bytes':
    case 'b':
      return value;
    case 'kib':
    case 'kb':
      return value * 1024;
    case 'mib':
    case 'mb':
      return value * 1024 * 1024;
    default:
      return value;
  }
}

/**
 * Formats bytes to human-readable format
 */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KiB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MiB`;
}

/**
 * Gets T-shirt size recommendation based on node count
 */
export function getTShirtSize(nodeCount: number): string {
  if (nodeCount <= 2) return 'S';
  if (nodeCount <= 5) return 'M';
  if (nodeCount <= 10) return 'L';
  return 'XL';
}
