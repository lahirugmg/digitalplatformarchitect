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
