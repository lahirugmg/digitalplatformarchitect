'use client';

import { useState } from 'react';
import { usePlaygroundStore } from '@/lib/architecture-playground/store';
import { ExternalLink, Code, BookOpen, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function ContextPanel() {
  const { architecture, focusNode, level, vertical } = usePlaygroundStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'theory' | 'practice' | 'metrics'>('overview');

  if (!focusNode || !architecture) {
    return (
      <div className="h-full flex items-center justify-center p-8 text-center">
        <div className="text-slate-400">
          <div className="text-4xl mb-2">👆</div>
          <p className="text-sm">Click on a component to view details</p>
        </div>
      </div>
    );
  }

  const component = architecture.components.find(c => c.id === focusNode);
  if (!component) return null;

  // Get vertical-specific content if available
  const verticalContent = component.verticals?.[vertical];
  const displayName = verticalContent?.name || component.names.display || component.names.technical;
  const displayDescription = verticalContent?.description || component.description;

  // Get level data - check vertical-specific first, then fall back to common
  let levelData = component.levels[level];
  if (verticalContent?.levels?.[level]) {
    levelData = { ...levelData, ...verticalContent.levels[level] } as any;
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-1">
          {displayName}
        </h2>
        {displayDescription && (
          <p className="text-sm text-slate-600">{displayDescription}</p>
        )}
        {/* Show current vertical as a badge */}
        <div className="mt-2">
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700 capitalize">
            {vertical} Architecture
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'theory', label: 'Theory', icon: BookOpen },
          { id: 'practice', label: 'Practice', icon: Code },
          { id: 'metrics', label: 'Metrics', icon: BarChart3 }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition flex items-center justify-center gap-2 ${
              activeTab === tab.id
                ? 'border-purple-500 text-purple-700 bg-purple-50'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Level-specific overview */}
            {level === 'L0' && levelData && 'businessCapability' in levelData && (
              <>
                <div>
                  <h3 className="text-sm font-bold text-slate-700 mb-2">Business Capability</h3>
                  <p className="text-sm text-slate-600">{levelData.businessCapability}</p>
                </div>

                {levelData.kpis && levelData.kpis.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-700 mb-2">Key Metrics</h3>
                    <div className="space-y-2">
                      {levelData.kpis.map((kpi: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center p-2 bg-slate-50 rounded">
                          <span className="text-sm text-slate-600">{kpi.name}</span>
                          <span className="text-sm font-bold text-slate-900">{kpi.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {level === 'L1' && levelData && 'systemType' in levelData && (
              <>
                <div>
                  <h3 className="text-sm font-bold text-slate-700 mb-2">System Type</h3>
                  <p className="text-sm text-slate-600">{levelData.systemType}</p>
                </div>

                {levelData.pattern && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-700 mb-2">Architecture Pattern</h3>
                    <span className="inline-block px-3 py-1 rounded-lg text-sm font-medium bg-purple-100 text-purple-700">
                      {levelData.pattern}
                    </span>
                  </div>
                )}

                {levelData.integrations && levelData.integrations.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-700 mb-2">Integrations ({levelData.integrations.length})</h3>
                    <ul className="space-y-1">
                      {levelData.integrations.map((integration: string) => (
                        <li key={integration} className="text-sm text-slate-600 flex items-center gap-2">
                          <span className="text-blue-500">→</span>
                          {integration}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {levelData.sla && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-700 mb-2">SLA</h3>
                    <div className="space-y-1">
                      {levelData.sla.uptime && (
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Uptime:</span>
                          <span className="font-medium">{levelData.sla.uptime}</span>
                        </div>
                      )}
                      {levelData.sla.latency && (
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Latency:</span>
                          <span className="font-medium">{levelData.sla.latency}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {level === 'L2' && levelData && 'techStack' in levelData && (
              <>
                <div>
                  <h3 className="text-sm font-bold text-slate-700 mb-2">Tech Stack</h3>
                  <div className="space-y-2">
                    {Object.entries(levelData.techStack).map(([key, value]) => (
                      value && (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-slate-600 capitalize">{key}:</span>
                          <span className="font-medium font-mono">{String(value)}</span>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'theory' && (
          <div className="space-y-4">
            {component.linkage.theoryPage && (
              <div>
                <h3 className="text-sm font-bold text-slate-700 mb-2">Learn the Theory</h3>
                <Link
                  href={component.linkage.theoryPage}
                  className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
                >
                  <BookOpen className="w-4 h-4" />
                  View Pattern Documentation
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            )}

            {component.linkage.relatedConcepts.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-slate-700 mb-2">Related Concepts</h3>
                <div className="flex flex-wrap gap-2">
                  {component.linkage.relatedConcepts.map(concept => (
                    <span key={concept} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                      {concept}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {component.linkage.references && component.linkage.references.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-slate-700 mb-2">References</h3>
                <ul className="space-y-2">
                  {component.linkage.references.map((ref, idx) => (
                    <li key={idx}>
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline flex items-center gap-2"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {ref.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {!component.linkage.theoryPage && component.linkage.relatedConcepts.length === 0 && (
              <p className="text-sm text-slate-500 italic">No theory documentation available for this component.</p>
            )}
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="space-y-4">
            {component.linkage.implementationGuides.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-slate-700 mb-2">Implementation Guides</h3>
                <ul className="space-y-2">
                  {component.linkage.implementationGuides.map((guide, idx) => (
                    <li key={idx}>
                      <Link href={guide} className="text-sm text-blue-600 hover:underline flex items-center gap-2">
                        <Code className="w-4 h-4" />
                        {guide.split('/').pop()?.replace(/-/g, ' ')}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {level === 'L3' && levelData && 'codeSnippets' in levelData && levelData.codeSnippets?.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-slate-700 mb-2">Code Examples</h3>
                <div className="space-y-2">
                  {levelData.codeSnippets.map((snippet: any, idx: number) => (
                    <a
                      key={idx}
                      href={snippet.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 bg-slate-50 rounded hover:bg-slate-100 transition"
                    >
                      <div className="text-sm font-mono text-blue-600 mb-1">{snippet.file}</div>
                      {snippet.description && (
                        <div className="text-xs text-slate-600">{snippet.description}</div>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {level === 'L3' && levelData && 'repositoryUrl' in levelData && levelData.repositoryUrl && (
              <div>
                <h3 className="text-sm font-bold text-slate-700 mb-2">Repository</h3>
                <a
                  href={levelData.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Source Code
                </a>
              </div>
            )}
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="space-y-4">
            {component.metrics?.cost && (
              <div>
                <h3 className="text-sm font-bold text-slate-700 mb-2">Cost</h3>
                <div className="text-2xl font-bold text-slate-900">
                  ${component.metrics.cost.monthly}
                  <span className="text-sm font-normal text-slate-600">/{component.metrics.cost.currency} month</span>
                </div>
                {component.metrics.cost.breakdown && (
                  <div className="mt-2 space-y-1">
                    {Object.entries(component.metrics.cost.breakdown).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-slate-600 capitalize">{key}:</span>
                        <span className="font-medium">${value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {component.metrics?.performance && (
              <div>
                <h3 className="text-sm font-bold text-slate-700 mb-2">Performance</h3>
                <div className="space-y-2">
                  {component.metrics.performance.rps && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Requests/sec:</span>
                      <span className="font-medium">{component.metrics.performance.rps}</span>
                    </div>
                  )}
                  {component.metrics.performance.p99Latency && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">P99 Latency:</span>
                      <span className="font-medium">{component.metrics.performance.p99Latency}ms</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {component.metrics?.reliability && (
              <div>
                <h3 className="text-sm font-bold text-slate-700 mb-2">Reliability</h3>
                <div className="space-y-2">
                  {component.metrics.reliability.uptime && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Uptime:</span>
                      <span className="font-medium">{component.metrics.reliability.uptime}%</span>
                    </div>
                  )}
                  {component.metrics.reliability.errorRate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Error Rate:</span>
                      <span className="font-medium">{component.metrics.reliability.errorRate}%</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!component.metrics && (
              <p className="text-sm text-slate-500 italic">No metrics available for this component.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
