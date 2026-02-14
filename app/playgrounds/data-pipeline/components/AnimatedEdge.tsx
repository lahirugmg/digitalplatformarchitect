'use client';

import { memo } from 'react';
import { EdgeProps, getBezierPath, EdgeLabelRenderer } from 'reactflow';
import styles from './AnimatedEdge.module.css';

export type EdgeData = {
  isRunning?: boolean;
  throughput?: number;
  quality?: number;
  isValid?: boolean;
  validationMessage?: string;
};

const AnimatedEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
}: EdgeProps<EdgeData>) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const getEdgeColor = () => {
    if (data?.isValid === false) return '#ef4444'; // red for invalid

    const edgeColors = [
      { threshold: 90, color: '#3b82f6' }, // clean blue water
      { threshold: 70, color: '#06b6d4' }, // cyan
      { threshold: 50, color: '#f59e0b' }, // amber (degraded quality)
      { threshold: 0, color: '#78350f' },   // brown (poor quality)
    ];

    if (data?.quality === undefined) return '#3b82f6'; // default blue

    const { color } = edgeColors.find(({ threshold }) => data.quality! >= threshold) || { color: '#78350f' };
    return color;
  };

  const getEdgeWidth = () => {
    if (!data?.throughput) return 3;
    // Width based on throughput (3-10px)
    return Math.min(3 + (data.throughput / 30000), 10);
  };

  return (
    <>
      {/* Main edge path */}
      <path
        id={id}
        className={styles.edgePath}
        d={edgePath}
        strokeWidth={getEdgeWidth()}
        stroke={getEdgeColor()}
        fill="none"
        markerEnd={markerEnd}
        style={{
          strokeDasharray: data?.isValid === false ? '5,5' : 'none',
          opacity: data?.isRunning ? 0.6 : 0.3,
        }}
      />

      {/* Animated overlay with water-like effect */}
      {data?.isRunning && (
        <path
          d={edgePath}
          strokeWidth={getEdgeWidth()}
          stroke={getEdgeColor()}
          fill="none"
          strokeDasharray="10 10"
          strokeDashoffset="0"
          opacity="0.8"
          className={styles.waterEffect}
          style={{ filter: 'url(#water)' }}
        />
      )}

      {/* Edge labels */}
      <EdgeLabelRenderer>
        {/* Throughput label */}
        {data?.isRunning && data?.throughput !== undefined && (
          <div
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY - 20}px)`,
            }}
            className={styles.label}
          >
            {(data.throughput / 1000).toFixed(1)}K/s
          </div>
        )}

        {/* Validation message */}
        {data?.isValid === false && data?.validationMessage && (
          <div
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY + 20}px)`,
            }}
            className={`${styles.label} ${styles.validationLabel}`}
          >
            ⚠️ {data.validationMessage}
          </div>
        )}
      </EdgeLabelRenderer>
    </>
  );
};

export default memo(AnimatedEdge);
