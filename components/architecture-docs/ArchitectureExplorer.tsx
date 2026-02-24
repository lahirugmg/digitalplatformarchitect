'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import * as d3 from 'd3'

type NodeType = 'business' | 'solution' | 'deployment' | 'concept'

type ArchNode = {
  name: string
  level: number
  type: NodeType
  children?: ArchNode[]
  _children?: ArchNode[]
  info?: string
}

type RolePreset = 'business' | 'architect' | 'engineer' | 'all'

type SelectedNode = Pick<ArchNode, 'name' | 'level' | 'type' | 'info'>

const COLORS: Record<NodeType, string> = {
  concept: '#334155',
  business: '#1d4ed8',
  solution: '#0f766e',
  deployment: '#b45309',
}

const LEVEL_LABELS = ['L0', 'L1', 'L2', 'L3']

const ROLE_OPTIONS: Array<{ key: RolePreset; label: string }> = [
  { key: 'business', label: 'Business' },
  { key: 'architect', label: 'Architect' },
  { key: 'engineer', label: 'Engineer' },
  { key: 'all', label: 'All views' },
]

const ROLE_HINTS: Record<RolePreset, string> = {
  business:
    'Business leaders typically stay at L0-L2 to validate value streams, capabilities, and KPI alignment before delivery planning.',
  architect:
    'Architects bridge business and delivery. They usually need L0-L2 to compare options, interfaces, and design trade-offs.',
  engineer:
    'Engineers focus on implementation and runtime behavior, often working at L1-L2 with selected L3 detail for execution.',
  all: 'Combined mode helps compare what each audience sees and where important handoffs can be missed.',
}

const TYPE_LABELS: Record<NodeType, string> = {
  business: 'Business layer',
  solution: 'Solution layer',
  deployment: 'Deployment layer',
  concept: 'Concept',
}

const N = (
  name: string,
  level: number,
  type: NodeType,
  info?: string,
  children?: ArchNode[]
): ArchNode => ({ name, level, type, info, children })

const DATA_BY_ROLE: Record<RolePreset, ArchNode> = {
  business: N('Digital Platform', 0, 'concept', undefined, [
    N('Business Architecture', 0, 'business', 'L0-L2: value streams, capabilities, key processes, and KPIs.', [
      N('Value Streams', 1, 'business', undefined, [
        N('Capabilities', 2, 'business', 'Key processes and KPI definitions.', [
          N('Key Processes', 3, 'business'),
          N('KPIs', 3, 'business'),
        ]),
      ]),
    ]),
    N('Solution Architecture', 0, 'solution', 'L0-L1: solution areas, buy vs build, integrations, cost and risk.', [
      N('Solution Areas', 1, 'solution'),
      N('Buy vs Build', 1, 'solution'),
      N('Major Integrations', 1, 'solution'),
      N('Cost and Risk', 1, 'solution'),
    ]),
    N('Deployment Architecture', 0, 'deployment', 'L0: deployment options, resilience posture, and compliance notes.'),
  ]),

  architect: N('Digital Platform', 0, 'concept', undefined, [
    N('Business Architecture', 0, 'business', 'L0-L1: capability map, information domains, and traceability to OKRs.', [
      N('Capability Map', 1, 'business'),
      N('Information Domains', 1, 'business'),
      N('Traceability to OKRs', 1, 'business'),
    ]),
    N('Solution Architecture', 0, 'solution', 'L0-L2: context, container, and component views with interfaces and trade-offs.', [
      N('Context', 1, 'solution', undefined, [
        N('Systems and Actors', 2, 'solution'),
        N('External Dependencies', 2, 'solution'),
      ]),
      N('Containers', 1, 'solution', undefined, [
        N('APIs and Interfaces', 2, 'solution'),
        N('Patterns and Trade-offs', 2, 'solution'),
      ]),
      N('Components', 1, 'solution', undefined, [
        N('Modules and Services', 2, 'solution'),
        N('Contracts', 2, 'solution'),
      ]),
    ]),
    N('Deployment Architecture', 0, 'deployment', 'L0-L1: high-level topology, environments, and runtime concerns.', [
      N('High-level Topology', 1, 'deployment'),
      N('Environments', 1, 'deployment'),
      N('Runtime Concerns (HA/DR/Scaling)', 1, 'deployment'),
    ]),
  ]),

  engineer: N('Digital Platform', 0, 'concept', undefined, [
    N('Business Architecture', 0, 'business', 'L0-L1: enough domain context to understand intent.', [N('Domain Context', 1, 'business')]),
    N('Solution Architecture', 0, 'solution', 'L0-L2: components, APIs, schemas, contracts, and interaction flows.', [
      N('Components', 1, 'solution', undefined, [
        N('Modules and Services', 2, 'solution'),
        N('Data Schemas', 2, 'solution'),
        N('API Contracts', 2, 'solution'),
      ]),
      N('Interactions', 1, 'solution', undefined, [
        N('Sequence Flows', 2, 'solution'),
        N('Event Flows', 2, 'solution'),
      ]),
    ]),
    N('Deployment Architecture', 0, 'deployment', 'L0-L2: clusters, CI/CD, networking, secrets, and SLO/observability.', [
      N('Platform', 1, 'deployment', undefined, [
        N('Clusters and Nodes', 2, 'deployment'),
        N('Networking', 2, 'deployment'),
      ]),
      N('Operations', 1, 'deployment', undefined, [
        N('CI/CD', 2, 'deployment'),
        N('Secrets', 2, 'deployment'),
        N('SLOs and Observability', 2, 'deployment'),
      ]),
    ]),
  ]),

  all: N('Digital Platform', 0, 'concept', undefined, [
    N('Business Architecture', 0, 'business', 'Value streams to capabilities to process and KPI ownership.', [
      N('Value Streams', 1, 'business', undefined, [
        N('Capabilities', 2, 'business', undefined, [
          N('Key Processes', 3, 'business'),
          N('KPIs', 3, 'business'),
        ]),
      ]),
    ]),
    N('Solution Architecture', 0, 'solution', 'Context, containers, and components with interfaces and trade-offs.', [
      N('Context', 1, 'solution', undefined, [
        N('Systems and Actors', 2, 'solution'),
        N('External Dependencies', 2, 'solution'),
      ]),
      N('Containers', 1, 'solution', undefined, [
        N('APIs and Interfaces', 2, 'solution'),
        N('Patterns and Trade-offs', 2, 'solution'),
      ]),
      N('Components', 1, 'solution', undefined, [
        N('Modules and Services', 2, 'solution'),
        N('Contracts', 2, 'solution'),
      ]),
    ]),
    N('Deployment Architecture', 0, 'deployment', 'Topology, environments, resilience, and runtime controls.', [
      N('Topology', 1, 'deployment', undefined, [
        N('Cloud and Provider Options', 2, 'deployment'),
        N('Resilience Posture', 2, 'deployment'),
      ]),
      N('Environments', 1, 'deployment', undefined, [N('Dev/Test/Stage/Prod', 2, 'deployment')]),
      N('Runtime Concerns', 1, 'deployment', undefined, [
        N('HA/DR and Scaling', 2, 'deployment'),
        N('Compliance Notes', 2, 'deployment'),
        N('SLOs and Observability', 2, 'deployment'),
      ]),
    ]),
  ]),
}

function cloneDeep<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T
}

function toSelectedNode(node: ArchNode): SelectedNode {
  return {
    name: node.name,
    level: node.level,
    type: node.type,
    info: node.info,
  }
}

function collapseToLevel(root: ArchNode, maxLevel: number) {
  const visit = (node: ArchNode) => {
    if (!node.children) {
      return
    }

    if (node.level >= maxLevel) {
      node._children = node.children
      node.children = undefined
      return
    }

    node._children = undefined
    node.children.forEach(visit)
  }

  visit(root)
}

function toggleNode(node: ArchNode) {
  if (node.children) {
    node._children = node.children
    node.children = undefined
    return
  }

  if (node._children) {
    node.children = node._children
    node._children = undefined
  }
}

function countNodes(root: ArchNode, includeCollapsed: boolean): number {
  let count = 0

  const visit = (node: ArchNode) => {
    count += 1
    const branches = includeCollapsed
      ? [...(node.children ?? []), ...(node._children ?? [])]
      : [...(node.children ?? [])]

    branches.forEach(visit)
  }

  visit(root)
  return count
}

function countVisibleByType(root: ArchNode): Record<NodeType, number> {
  const totals: Record<NodeType, number> = {
    business: 0,
    solution: 0,
    deployment: 0,
    concept: 0,
  }

  const visit = (node: ArchNode) => {
    totals[node.type] += 1
    node.children?.forEach(visit)
  }

  visit(root)
  return totals
}

export function ArchitectureExplorer({
  data,
  defaultRole = 'business',
}: {
  data?: ArchNode
  defaultRole?: RolePreset
}) {
  const [rolePreset, setRolePreset] = useState<RolePreset>(defaultRole)
  const [maxLevel, setMaxLevel] = useState(2)
  const [renderVersion, setRenderVersion] = useState(0)
  const [selectedNode, setSelectedNode] = useState<SelectedNode | null>(null)

  const svgRef = useRef<SVGSVGElement | null>(null)
  const gRef = useRef<SVGGElement | null>(null)

  const roleData = useMemo(() => cloneDeep(data ?? DATA_BY_ROLE[rolePreset]), [data, rolePreset])
  const prepared = useMemo(() => {
    const seed = cloneDeep(roleData)
    collapseToLevel(seed, maxLevel)
    return seed
  }, [roleData, maxLevel])

  const totalNodes = useMemo(() => countNodes(roleData, true), [roleData])
  const visibleNodes = useMemo(() => countNodes(prepared, false), [prepared])
  const visibleByType = useMemo(() => countVisibleByType(prepared), [prepared])

  useEffect(() => {
    setSelectedNode(toSelectedNode(roleData))
  }, [roleData])

  useEffect(() => {
    const svgElement = svgRef.current
    const groupElement = gRef.current

    if (!svgElement || !groupElement) {
      return
    }

    const svg = d3.select(svgElement)
    const group = d3.select(groupElement)
    const width = svgElement.clientWidth || 960
    const height = svgElement.clientHeight || 520

    svg.on('.zoom', null)
    svg.on('dblclick', null)
    group.selectAll('*').remove()

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.4, 2.5])
      .on('zoom', (event) => {
        group.attr('transform', event.transform.toString())
      })

    svg.call(zoom)

    const root = d3.hierarchy(prepared)
    const tree = d3.tree<ArchNode>().size([height - 48, width - 260])
    const rootPoint = tree(root)

    group
      .selectAll<SVGPathElement, d3.HierarchyPointLink<ArchNode>>('path.link')
      .data(rootPoint.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', '#cbd5e1')
      .attr('stroke-width', 1.75)
      .attr('d', d3.linkHorizontal<d3.HierarchyPointLink<ArchNode>, d3.HierarchyPointNode<ArchNode>>()
        .x((d) => d.y)
        .y((d) => d.x))

    const node = group
      .selectAll<SVGGElement, d3.HierarchyPointNode<ArchNode>>('g.node')
      .data(rootPoint.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d) => `translate(${d.y},${d.x})`)
      .attr('tabindex', 0)
      .attr('role', 'button')
      .attr('aria-label', (d) => `${d.data.name}, ${TYPE_LABELS[d.data.type]}, ${LEVEL_LABELS[d.data.level]}`)
      .style('cursor', 'pointer')
      .on('click', (_, d) => {
        toggleNode(d.data)
        setSelectedNode(toSelectedNode(d.data))
        setRenderVersion((value) => value + 1)
      })
      .on('keydown', (event: any, d) => {
        if (event.key !== 'Enter' && event.key !== ' ') {
          return
        }

        event.preventDefault()
        toggleNode(d.data)
        setSelectedNode(toSelectedNode(d.data))
        setRenderVersion((value) => value + 1)
      })

    node
      .append('circle')
      .attr('r', 14)
      .attr('fill', (d) => COLORS[d.data.type])
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)

    node
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 4)
      .attr('font-size', 10)
      .attr('font-weight', 700)
      .attr('fill', '#ffffff')
      .text((d) => {
        if (d.data.children) {
          return '-'
        }

        if (d.data._children) {
          return '+'
        }

        return ''
      })

    node
      .append('text')
      .attr('x', 22)
      .attr('dy', 5)
      .attr('font-size', 13)
      .attr('font-family', 'var(--font-body), sans-serif')
      .attr('fill', '#0f172a')
      .text((d) => d.data.name)

    node
      .append('title')
      .text((d) => (d.data.info ? `${d.data.name}: ${d.data.info}` : d.data.name))

    try {
      const margin = 32
      const box = groupElement.getBBox()
      const scale = Math.min(
        2.5,
        Math.max(
          0.4,
          Math.min((width - margin * 2) / Math.max(1, box.width), (height - margin * 2) / Math.max(1, box.height))
        )
      )

      const tx = (width - scale * box.width) / 2 - scale * box.x
      const ty = (height - scale * box.height) / 2 - scale * box.y
      const fitted = d3.zoomIdentity.translate(tx, ty).scale(scale)

      svg.transition().duration(220).call(zoom.transform as any, fitted)
      svg.on('dblclick.zoom', null)
      svg.on('dblclick', () => {
        svg.transition().duration(220).call(zoom.transform as any, fitted)
      })
    } catch {
      // no-op if bbox fails on first paint
    }

    return () => {
      svg.on('.zoom', null)
      svg.on('dblclick', null)
    }
  }, [prepared, renderVersion])

  return (
    <section className="card-standard animate-fade-in" aria-label="Architecture documentation explorer">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Architecture Documentation Explorer</h2>
            <p className="text-sm text-slate-600">
              Compare what each role needs at each level of architectural detail.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
              {visibleNodes} visible nodes
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
              {totalNodes} total nodes
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div
            className="flex flex-wrap gap-2"
            role="radiogroup"
            aria-label="Select role view"
          >
            {ROLE_OPTIONS.map((option) => (
              <button
                key={option.key}
                type="button"
                role="radio"
                aria-checked={rolePreset === option.key}
                onClick={() => {
                  setRolePreset(option.key)
                  setMaxLevel(option.key === 'all' ? 3 : 2)
                }}
                className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  rolePreset === option.key
                    ? 'border-blue-700 bg-accent text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Detail level</span>
            {LEVEL_LABELS.map((label, index) => (
              <button
                key={label}
                type="button"
                aria-pressed={maxLevel === index}
                onClick={() => setMaxLevel(index)}
                className={`rounded-md border px-2.5 py-1 text-sm font-medium transition-colors duration-200 ${
                  maxLevel === index
                    ? 'border-blue-700 bg-accent text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                {label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setMaxLevel(3)}
              className="rounded-md border border-slate-300 bg-white px-2.5 py-1 text-sm font-medium text-slate-700 transition-colors duration-200 hover:border-slate-400 hover:bg-slate-50"
            >
              Expand all
            </button>
            <button
              type="button"
              onClick={() => setRenderVersion((value) => value + 1)}
              className="rounded-md border border-slate-300 bg-white px-2.5 py-1 text-sm font-medium text-slate-700 transition-colors duration-200 hover:border-slate-400 hover:bg-slate-50"
            >
              Refit view
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_260px]">
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="pointer-events-none absolute left-3 top-3 z-10 rounded-md bg-white/90 px-2 py-1 text-xs text-slate-500 shadow-sm">
            Drag to pan. Scroll to zoom. Double-click to refit.
          </div>
          <div className="h-[420px] sm:h-[500px]">
            <svg ref={svgRef} className="h-full w-full" role="img" aria-label="Interactive architecture documentation tree">
              <g ref={gRef} />
            </svg>
          </div>
        </div>

        <aside className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Role focus</p>
            <p className="mt-1 text-sm text-slate-700">{ROLE_HINTS[rolePreset]}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Current selection</p>
            {selectedNode ? (
              <div className="mt-2 space-y-1 rounded-lg border border-slate-200 bg-white p-3">
                <p className="text-sm font-semibold text-slate-900">{selectedNode.name}</p>
                <p className="text-xs text-slate-600">
                  {TYPE_LABELS[selectedNode.type]} - {LEVEL_LABELS[selectedNode.level]}
                </p>
                {selectedNode.info ? <p className="text-xs text-slate-600">{selectedNode.info}</p> : null}
              </div>
            ) : (
              <p className="mt-1 text-sm text-slate-600">Select a node to inspect details.</p>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Visible layer mix</p>
            <ul className="mt-2 space-y-2">
              {(Object.keys(TYPE_LABELS) as NodeType[]).map((type) => (
                <li key={type} className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs">
                  <span className="inline-flex items-center gap-2 text-slate-700">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[type] }} aria-hidden="true" />
                    {TYPE_LABELS[type]}
                  </span>
                  <span className="font-semibold text-slate-900">{visibleByType[type]}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  )
}
