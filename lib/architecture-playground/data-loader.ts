import { ArchitectureGraph } from './types';

export async function loadArchitecture(architectureId: string): Promise<ArchitectureGraph> {
  try {
    const data = await import(`./data/${architectureId}.json`);
    return data.default as ArchitectureGraph;
  } catch (error) {
    console.error(`Failed to load architecture: ${architectureId}`, error);
    throw new Error(`Architecture "${architectureId}" not found`);
  }
}

export async function getAvailableArchitectures(): Promise<{ id: string; title: string }[]> {
  return [
    { id: 'ecommerce-platform', title: 'E-Commerce Platform' },
    { id: 'business-architecture', title: 'Business Architecture' }
  ];
}

export function validateArchitecture(graph: ArchitectureGraph): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!graph.metadata?.id) errors.push('Missing metadata.id');
  if (!graph.metadata?.title) errors.push('Missing metadata.title');

  if (!Array.isArray(graph.components) || graph.components.length === 0) {
    errors.push('No components defined');
  }

  const componentIds = new Set<string>();
  graph.components?.forEach(comp => {
    if (componentIds.has(comp.id)) {
      errors.push(`Duplicate component ID: ${comp.id}`);
    }
    componentIds.add(comp.id);
  });

  graph.connections?.forEach(conn => {
    if (!componentIds.has(conn.source)) {
      errors.push(`Connection references unknown source: ${conn.source}`);
    }
    if (!componentIds.has(conn.target)) {
      errors.push(`Connection references unknown target: ${conn.target}`);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
}
