import { Node, Edge } from 'reactflow';
import { ArchitectureComponent, ArchitectureConnection, DetailLevel, Persona } from './types';
import { NODE_CATEGORY_COLORS, CONNECTION_TYPE_STYLES } from './constants';
import { PersonaFilter } from './persona-filter';

export function toReactFlowNode(
  component: ArchitectureComponent,
  level: DetailLevel,
  persona: Persona
): Node {
  const transformed = PersonaFilter.transformComponent(component, persona);
  const levelData = component.levels[level];

  return {
    id: component.id,
    type: `custom-${level.toLowerCase()}`,
    position: component.position,
    data: {
      label: transformed.names.display || transformed.names.technical,
      component: transformed,
      level,
      persona,
      levelData,
      color: NODE_CATEGORY_COLORS[component.type] || '#64748b',
      icon: component.icon
    }
  };
}

export function toReactFlowEdge(
  connection: ArchitectureConnection,
  level: DetailLevel
): Edge {
  const style = CONNECTION_TYPE_STYLES[connection.type] || CONNECTION_TYPE_STYLES.sync;
  const label = connection.labels?.[level] || '';

  return {
    id: connection.id,
    source: connection.source,
    target: connection.target,
    type: connection.style?.animated ? 'smoothstep' : 'default',
    animated: connection.style?.animated ?? style.animated,
    style: {
      strokeDasharray: style.dashed ? '5,5' : undefined,
      stroke: connection.style?.color || style.color,
      strokeWidth: connection.style?.width || 2
    },
    label,
    labelStyle: {
      fill: connection.style?.labelColor || '#64748b',
      fontSize: 12
    },
    labelBgStyle: {
      fill: connection.style?.labelBgColor || '#ffffff'
    }
  };
}

export function toReactFlow(
  components: ArchitectureComponent[],
  connections: ArchitectureConnection[],
  level: DetailLevel,
  persona: Persona
): { nodes: Node[]; edges: Edge[] } {
  const nodes = components.map(comp => toReactFlowNode(comp, level, persona));
  const edges = connections.map(conn => toReactFlowEdge(conn, level));

  return { nodes, edges };
}
