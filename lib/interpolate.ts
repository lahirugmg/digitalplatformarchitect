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
  const throughputData = performanceData.throughput[apiType];

  // Clamp out-of-range message sizes to avoid extrapolation to negative values
  if (messageSize <= messageSizes[0]) {
    return throughputData[messageSizes[0].toString()][concurrency.toString()];
  }
  if (messageSize >= messageSizes[messageSizes.length - 1]) {
    return throughputData[messageSizes[messageSizes.length - 1].toString()][concurrency.toString()];
  }

  const bounds = findBounds(messageSize, messageSizes);

  if (bounds.exact !== undefined) {
    return throughputData[bounds.exact.toString()][concurrency.toString()];
  }

  if (bounds.lower !== undefined && bounds.upper !== undefined) {
    const y0 = throughputData[bounds.lower.toString()][concurrency.toString()];
    const y1 = throughputData[bounds.upper.toString()][concurrency.toString()];
    return linearInterpolate(messageSize, bounds.lower, y0, bounds.upper, y1);
  }

  // Fallback - use nearest value
  const nearest = messageSizes.reduce((prev: number, curr: number) => 
    Math.abs(curr - messageSize) < Math.abs(prev - messageSize) ? curr : prev
  );
  return throughputData[nearest.toString()][concurrency.toString()];
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
  const throughputData = performanceData.throughput[apiType][messageSize.toString()];

  // Clamp out-of-range concurrencies to avoid extrapolation artifacts
  if (concurrency <= concurrencies[0]) {
    return throughputData[concurrencies[0].toString()];
  }
  if (concurrency >= concurrencies[concurrencies.length - 1]) {
    return throughputData[concurrencies[concurrencies.length - 1].toString()];
  }

  const bounds = findBounds(concurrency, concurrencies);

  if (bounds.exact !== undefined) {
    return throughputData[bounds.exact.toString()];
  }

  if (bounds.lower !== undefined && bounds.upper !== undefined) {
    const y0 = throughputData[bounds.lower.toString()];
    const y1 = throughputData[bounds.upper.toString()];
    return linearInterpolate(concurrency, bounds.lower, y0, bounds.upper, y1);
  }

  // Fallback - use nearest value
  const nearest = concurrencies.reduce((prev: number, curr: number) => 
    Math.abs(curr - concurrency) < Math.abs(prev - concurrency) ? curr : prev
  );
  return throughputData[nearest.toString()];
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

  // Check if both values are exact matches
  if (messageSizes.includes(clampedMessageSize) && concurrencies.includes(clampedConcurrency)) {
    return performanceData.throughput[apiType][clampedMessageSize.toString()][clampedConcurrency.toString()];
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
  const throughputData = performanceData.throughput[apiType];
  const q11 = throughputData[msgBounds.lower.toString()][concBounds.lower.toString()];
  const q12 = throughputData[msgBounds.lower.toString()][concBounds.upper.toString()];
  const q21 = throughputData[msgBounds.upper.toString()][concBounds.lower.toString()];
  const q22 = throughputData[msgBounds.upper.toString()][concBounds.upper.toString()];

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
  const latencyData = performanceData.latency[apiType];

  // Find the nearest available data point for latency
  const nearestMsgSize = messageSizes.reduce((prev: number, curr: number) => 
    Math.abs(curr - messageSize) < Math.abs(prev - messageSize) ? curr : prev
  );
  
  const nearestConcurrency = concurrencies.reduce((prev: number, curr: number) => 
    Math.abs(curr - concurrency) < Math.abs(prev - concurrency) ? curr : prev
  );

  const latencyPoint = latencyData[nearestMsgSize.toString()]?.[nearestConcurrency.toString()];
  
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
