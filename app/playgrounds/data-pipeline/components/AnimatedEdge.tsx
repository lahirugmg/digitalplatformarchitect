'use client';

import { memo, useMemo } from 'react';
import { EdgeProps, getBezierPath, EdgeLabelRenderer } from 'reactflow';
import styles from './AnimatedEdge.module.css';

export type EdgeData = {
  isRunning?: boolean;
  throughput?: number;
  quality?: number;
  isValid?: boolean;
  validationMessage?: string;
  backpressure?: number; // 0-100 percentage
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
    // Width based on throughput (3-12px) - wider for "rapids"
    return Math.min(3 + (data.throughput / 25000), 12);
  };

  // Determine flow characteristics based on throughput and quality
  const flowCharacteristics = useMemo(() => {
    const throughput = data?.throughput || 0;
    const quality = data?.quality || 100;
    const backpressure = data?.backpressure || 0;

    // Stream velocity classification
    let velocity: 'slow' | 'medium' | 'fast' = 'medium';
    if (throughput < 20000) velocity = 'slow';
    else if (throughput > 60000) velocity = 'fast';

    // Water quality classification
    let waterQuality: 'clean' | 'degraded' | 'polluted' = 'clean';
    if (quality < 70) waterQuality = 'polluted';
    else if (quality < 90) waterQuality = 'degraded';

    // Turbulence based on quality issues
    const isTurbulent = quality < 80;

    // Backpressure warning
    const hasBackpressure = backpressure > 60;

    return { velocity, waterQuality, isTurbulent, hasBackpressure };
  }, [data?.throughput, data?.quality, data?.backpressure]);

  // Get appropriate water effect class
  const getWaterEffectClass = () => {
    if (flowCharacteristics.hasBackpressure) return styles.backpressureGlow;
    if (flowCharacteristics.isTurbulent) return styles.waterEffectTurbulent;
    if (flowCharacteristics.velocity === 'fast') return styles.waterEffectFast;
    if (flowCharacteristics.velocity === 'slow') return styles.waterEffectSlow;
    return styles.waterEffect;
  };

  // Generate flowing particles for visual effect
  const particles = useMemo(() => {
    if (!data?.isRunning) return [];
    const particleCount = flowCharacteristics.velocity === 'fast' ? 8 :
                          flowCharacteristics.velocity === 'medium' ? 5 : 3;
    return Array.from({ length: particleCount }, (_, i) => ({
      id: `${id}-particle-${i}`,
      delay: (i * (3 / particleCount)).toFixed(2),
    }));
  }, [id, data?.isRunning, flowCharacteristics.velocity]);

  return (
    <>
      {/* SVG Definitions for water effects */}
      <defs>
        <filter id={`water-${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.01"
            numOctaves="2"
            result="turbulence"
          >
            <animate
              attributeName="baseFrequency"
              from="0.01 0.01"
              to="0.02 0.02"
              dur="5s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale={flowCharacteristics.isTurbulent ? "3" : "1.5"}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <linearGradient id={`gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={getEdgeColor()} stopOpacity="0.6" />
          <stop offset="50%" stopColor={getEdgeColor()} stopOpacity="1" />
          <stop offset="100%" stopColor={getEdgeColor()} stopOpacity="0.6" />
        </linearGradient>
      </defs>

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
          ['--edge-width' as any]: `${getEdgeWidth()}px`,
        }}
      />

      {/* Animated water flow overlay */}
      {data?.isRunning && (
        <>
          {/* Primary water flow */}
          <path
            d={edgePath}
            strokeWidth={getEdgeWidth()}
            stroke={`url(#gradient-${id})`}
            fill="none"
            strokeDasharray="10 10"
            strokeDashoffset="0"
            opacity="0.9"
            className={getWaterEffectClass()}
            style={{
              filter: `url(#water-${id})`,
              ['--edge-width' as any]: `${getEdgeWidth()}px`,
            }}
          />

          {/* Secondary shimmer effect for fast flow */}
          {flowCharacteristics.velocity === 'fast' && (
            <path
              d={edgePath}
              strokeWidth={Math.max(1, getEdgeWidth() * 0.3)}
              stroke="rgba(255, 255, 255, 0.8)"
              fill="none"
              strokeDasharray="5 15"
              className={styles.waterEffectFast}
              opacity="0.6"
            />
          )}

          {/* Backpressure warning indicator */}
          {flowCharacteristics.hasBackpressure && (
            <path
              d={edgePath}
              strokeWidth={getEdgeWidth() * 1.5}
              stroke="#ef4444"
              fill="none"
              opacity="0.4"
              className={styles.backpressureGlow}
              style={{ ['--edge-width' as any]: `${getEdgeWidth()}px` }}
            />
          )}
        </>
      )}

      {/* Edge labels */}
      <EdgeLabelRenderer>
        {/* Stream velocity indicator with water metaphor */}
        {data?.isRunning && data?.throughput !== undefined && (
          <div
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY - 25}px)`,
            }}
            className={styles.label}
          >
            <div className="flex items-center gap-1.5">
              {flowCharacteristics.velocity === 'fast' && <span title="Rapids - High throughput">🌊</span>}
              {flowCharacteristics.velocity === 'medium' && <span title="Flowing stream">💧</span>}
              {flowCharacteristics.velocity === 'slow' && <span title="Meandering brook">🏞️</span>}
              <span className="font-mono">{(data.throughput / 1000).toFixed(1)}K/s</span>
            </div>
          </div>
        )}

        {/* Data quality indicator with water purity metaphor */}
        {data?.isRunning && data?.quality !== undefined && data.quality < 100 && (
          <div
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            }}
            className={styles.label}
            title={`Water quality: ${flowCharacteristics.waterQuality}`}
          >
            <div className="flex items-center gap-1.5 text-xs">
              {flowCharacteristics.waterQuality === 'clean' && <span>💎</span>}
              {flowCharacteristics.waterQuality === 'degraded' && <span>🌿</span>}
              {flowCharacteristics.waterQuality === 'polluted' && <span>🟤</span>}
              <span>{data.quality}% pure</span>
            </div>
          </div>
        )}

        {/* Backpressure indicator with reservoir metaphor */}
        {data?.isRunning && flowCharacteristics.hasBackpressure && (
          <div
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY + 25}px)`,
            }}
            className={`${styles.label} ${styles.validationLabel}`}
          >
            <div className="flex items-center gap-1.5 text-xs">
              <span title="Reservoir filling - backpressure detected">🌡️</span>
              <span>Backpressure {data.backpressure}%</span>
            </div>
          </div>
        )}

        {/* Validation message */}
        {data?.isValid === false && data?.validationMessage && (
          <div
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY + (flowCharacteristics.hasBackpressure ? 45 : 25)}px)`,
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
