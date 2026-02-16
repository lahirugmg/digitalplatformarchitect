import { ArchitectureGraph, ArchitectureComponent, Persona, DetailLevel, ArchitectureVertical } from './types';
import { PERSONA_PROFILES } from './constants';

export class PersonaFilter {
  static filterGraph(
    graph: ArchitectureGraph,
    persona: Persona,
    maxLevel: DetailLevel,
    vertical?: ArchitectureVertical
  ): ArchitectureGraph {
    const profile = PERSONA_PROFILES[persona];
    const maxLevelNum = parseInt(maxLevel[1]);

    const filteredComponents = graph.components.filter(component => {
      // Check vertical visibility if vertical is specified
      if (vertical && component.verticals?.[vertical]) {
        if (!component.verticals[vertical].visible) {
          return false;
        }
      }

      if (!component.visibility.personas.includes(persona)) {
        return false;
      }

      if (profile.hideComplexity && component.visibility.hideComplexity) {
        return false;
      }

      const minLevelNum = parseInt(component.visibility.minLevel[1]);
      if (minLevelNum > maxLevelNum) {
        return false;
      }

      return true;
    });

    const visibleComponentIds = new Set(filteredComponents.map(c => c.id));

    const filteredConnections = graph.connections.filter(connection => {
      if (!visibleComponentIds.has(connection.source) || !visibleComponentIds.has(connection.target)) {
        return false;
      }

      if (!connection.visibility.personas.includes(persona)) {
        return false;
      }

      const minLevelNum = parseInt(connection.visibility.minLevel[1]);
      if (minLevelNum > maxLevelNum) {
        return false;
      }

      return true;
    });

    return {
      ...graph,
      components: filteredComponents,
      connections: filteredConnections
    };
  }

  static transformComponent(
    component: ArchitectureComponent,
    persona: Persona,
    vertical?: ArchitectureVertical
  ): ArchitectureComponent {
    const useBusinessName = persona === 'business' || persona === 'ba';

    // Get vertical-specific name if available
    let displayName: string;
    let description = component.description;

    if (vertical && component.verticals?.[vertical]) {
      displayName = component.verticals[vertical].name;
      description = component.verticals[vertical].description;
    } else {
      displayName = useBusinessName ? component.names.business : component.names.technical;
    }

    return {
      ...component,
      names: {
        ...component.names,
        display: displayName
      },
      description
    };
  }

  static getRelevantMetrics(component: ArchitectureComponent, persona: Persona): any[] {
    const profile = PERSONA_PROFILES[persona];
    const metrics: any[] = [];

    profile.interests.forEach(interest => {
      if (interest === 'cost' && component.metrics?.cost) {
        metrics.push({
          label: 'Monthly Cost',
          value: `$${component.metrics.cost.monthly}`,
          icon: 'DollarSign'
        });
      }
      if (interest === 'performance' && component.metrics?.performance) {
        metrics.push({
          label: 'Performance',
          value: `${component.metrics.performance.rps} req/s`,
          icon: 'Zap'
        });
      }
      if (interest === 'reliability' && component.metrics?.reliability) {
        metrics.push({
          label: 'Uptime',
          value: `${component.metrics.reliability.uptime}%`,
          icon: 'Shield'
        });
      }
    });

    return metrics;
  }
}
