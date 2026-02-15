'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import styles from './CustomNode.module.css';

export type NodeData = {
  label: string;
  icon: string;
  type: 'source' | 'streaming' | 'processing' | 'storage' | 'analytics';
  throughput?: number;
  quality?: number;
  status?: 'idle' | 'running' | 'warning' | 'error';
  writeIntensity?: number; // 0-100 representing write heat
  replicationLag?: number; // milliseconds
  consistencyModel?: 'CA' | 'CP' | 'AP'; // CAP theorem classification
};

const CustomNode = ({ data }: NodeProps<NodeData>) => {
  const getQualityColor = () => {
    if (data.quality === undefined) return 'bg-slate-200';

    const qualityColors = [
      { threshold: 90, color: 'bg-blue-500' },
      { threshold: 70, color: 'bg-blue-400' },
      { threshold: 50, color: 'bg-amber-500' },
      { threshold: 0, color: 'bg-red-500' },
    ];

    const { color } = qualityColors.find(({ threshold }) => data.quality! >= threshold) || { color: 'bg-red-500' };
    return color;
  };

  // Weather Station: Write intensity as temperature/heat
  const getTemperatureIndicator = () => {
    const intensity = data.writeIntensity || 0;
    if (intensity > 75) return { emoji: '🔥', color: 'text-red-600', label: 'Hot writes' };
    if (intensity > 50) return { emoji: '☀️', color: 'text-orange-500', label: 'Warm writes' };
    if (intensity > 25) return { emoji: '🌤️', color: 'text-yellow-500', label: 'Moderate writes' };
    return { emoji: '❄️', color: 'text-blue-400', label: 'Cool' };
  };

  // Replication as weather fronts
  const getReplicationStatus = () => {
    const lag = data.replicationLag || 0;
    if (lag > 1000) return { emoji: '🌩️', color: 'text-red-600', label: 'Storm (high lag)' };
    if (lag > 500) return { emoji: '⛅', color: 'text-amber-600', label: 'Cloudy (medium lag)' };
    if (lag > 100) return { emoji: '🌤️', color: 'text-blue-500', label: 'Partly cloudy' };
    return { emoji: '☀️', color: 'text-green-500', label: 'Clear (low lag)' };
  };

  // CAP theorem as climate zones
  const getClimateZone = () => {
    switch (data.consistencyModel) {
      case 'CA':
        return { emoji: '🌡️', color: 'text-amber-600', label: 'Temperate (CA - fragile)' };
      case 'CP':
        return { emoji: '🏜️', color: 'text-orange-600', label: 'Desert (CP - reliable but dry)' };
      case 'AP':
        return { emoji: '🌴', color: 'text-green-600', label: 'Tropical (AP - always flowing)' };
      default:
        return null;
    }
  };

  const temperature = getTemperatureIndicator();
  const replication = data.replicationLag !== undefined ? getReplicationStatus() : null;
  const climate = getClimateZone();

  return (
    <div className={`${styles.node} ${styles[data.status || 'idle']}`}>
      {/* Input Handle */}
      {data.type !== 'source' && (
        <Handle
          type="target"
          position={Position.Left}
          className={styles.handle}
        />
      )}

      {/* Node Content */}
      <div className={styles.content}>
        <span className={styles.icon}>{data.icon}</span>
        <div className={styles.details}>
          <div className={styles.label}>{data.label}</div>
          <div className={styles.type}>{data.type}</div>

          {/* Metrics when running */}
          {data.status === 'running' && (
            <div className={styles.metrics}>
              {data.throughput !== undefined && (
                <div className={styles.metricValue}>
                  {data.throughput.toLocaleString()} events/s
                </div>
              )}
              {data.quality !== undefined && (
                <div className={styles.qualityBarContainer}>
                  <div className={styles.qualityBar}>
                    <div
                      className={`${styles.qualityBarFill} ${getQualityColor()}`}
                      style={{ width: `${data.quality}%` }}
                    />
                  </div>
                  <span className={styles.qualityPercentage}>{data.quality}%</span>
                </div>
              )}
            </div>
          )}

          {/* Weather Station Indicators */}
          {data.status === 'running' && (
            <div className="mt-2 space-y-1">
              {/* Write intensity / Temperature */}
              {data.writeIntensity !== undefined && data.writeIntensity > 0 && (
                <div className="flex items-center gap-1 text-xs" title={temperature.label}>
                  <span className={temperature.color}>{temperature.emoji}</span>
                  <span className="text-slate-600">{data.writeIntensity}% writes</span>
                </div>
              )}

              {/* Replication lag / Weather front */}
              {replication && (
                <div className="flex items-center gap-1 text-xs" title={replication.label}>
                  <span className={replication.color}>{replication.emoji}</span>
                  <span className="text-slate-600">{data.replicationLag}ms lag</span>
                </div>
              )}

              {/* CAP climate zone */}
              {climate && (
                <div className="flex items-center gap-1 text-xs" title={climate.label}>
                  <span className={climate.color}>{climate.emoji}</span>
                  <span className="text-slate-600">{data.consistencyModel}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Output Handle */}
      {data.type !== 'analytics' && (
        <Handle
          type="source"
          position={Position.Right}
          className={styles.handle}
        />
      )}
    </div>
  );
};

export default memo(CustomNode);
