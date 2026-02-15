import { ArchitectureGraph, ArchitectureComponent, Persona, DetailLevel } from './types';
import { PERSONA_PROFILES } from './constants';

export class PersonaFilter {
  static filterGraph(
    graph: ArchitectureGraph,
    persona: Persona,
    maxLevel: DetailLevel
  ): ArchitectureGraph {
    const profile = PERSONA_PROFILES[persona];
    const maxLevelNum = parseInt(maxLevel[1]);

    const filteredComponents = graph.components.filter(component => {
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
    persona: Persona
  ): ArchitectureComponent {
    const useBusinessName = persona === 'business' || persona === 'ba';

    return {
      ...component,
      names: {
        ...component.names,
        display: useBusinessName ? component.names.business : component.names.technical
      }
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
