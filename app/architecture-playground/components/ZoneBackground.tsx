'use client';

import { usePlaygroundStore } from '@/lib/architecture-playground/store';
import { ArchitectureZone } from '@/lib/architecture-playground/types';

interface ZoneBackgroundProps {
  zones: ArchitectureZone[];
}

export default function ZoneBackground({ zones }: ZoneBackgroundProps) {
  const { level } = usePlaygroundStore();

  // Filter zones visible at current level
  const visibleZones = zones.filter(zone =>
    !zone.visibleAtLevels || zone.visibleAtLevels.includes(level)
  );

  // Sort by layer (top to bottom)
  const sortedZones = [...visibleZones].sort((a, b) => a.layer - b.layer);

  // Only show zones at L0 and L1
  if (level !== 'L0' && level !== 'L1') {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        {sortedZones.map((zone, index) => {
          // Calculate position based on layer
          const height = 150;
          const padding = 20;
          const y = index * (height + padding) + 50;

          return (
            <g key={zone.id}>
              {/* Zone background rectangle */}
              <rect
                x="50"
                y={y}
                width="calc(100% - 100px)"
                height={height}
                fill={zone.color || '#f1f5f9'}
                stroke="#cbd5e1"
                strokeWidth="2"
                strokeDasharray="5,5"
                rx="8"
                opacity="0.6"
              />

              {/* Zone label */}
              <text
                x="70"
                y={y + 25}
                fontSize="14"
                fontWeight="600"
                fill="#475569"
              >
                {zone.name}
              </text>

              {/* Zone description */}
              {zone.description && (
                <text
                  x="70"
                  y={y + 45}
                  fontSize="11"
                  fill="#64748b"
                >
                  {zone.description}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
