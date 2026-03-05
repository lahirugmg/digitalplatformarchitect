'use client'

import { useState, useEffect } from 'react'
import PatternCanvas from './components/PatternCanvas'
import { Node, Edge } from 'reactflow'

export default function EnterpriseIntegrationPlayground() {
  const [scenario, setScenario] = useState('data-transformation')

  const scenarios = [
    {
      id: 'data-transformation',
      name: 'Data Transformation',
      icon: '🔄',
      description: 'Transform data between different formats',
      challenge: 'Convert XML from legacy system to JSON for modern API',
    },
    {
      id: 'message-routing',
      name: 'Content-Based Routing',
      icon: '🔀',
      description: 'Route messages based on content',
      challenge: 'Route orders to different fulfillment centers based on region',
    },
    {
      id: 'aggregation',
      name: 'Message Aggregation',
      icon: '📦',
      description: 'Combine multiple messages into one',
      challenge: 'Aggregate inventory data from multiple warehouses',
    },
  ]

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[30%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute -top-[10%] right-[20%] w-[40%] h-[40%] rounded-full bg-emerald-600/10 blur-[100px]" />
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/5 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-1 tracking-tight text-white flex items-center gap-2">
              <span className="text-2xl">🏢</span> Enterprise Integration Patterns
            </h1>
            <p className="text-sm sm:text-base text-slate-400 font-medium">Learn integration patterns through interactive scenarios</p>
          </div>
          <a
            href="/playgrounds"
            className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-lg font-medium transition-all text-sm text-slate-300 hover:text-white flex items-center gap-2"
          >
            ← Back to Playgrounds
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Scenario Selector */}
        <div className="hidden sm:block w-72 bg-white/5 backdrop-blur-xl border-r border-white/10 p-5 overflow-y-auto" role="navigation" aria-label="Scenario selector">
          <h3 className="font-bold mb-5 text-xs uppercase tracking-wider text-slate-400">Integration Scenarios</h3>

          <div className="space-y-3">
            {scenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => setScenario(s.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group ${scenario === s.id
                    ? 'border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                  }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className={`flex items-center justify-center w-8 h-8 rounded-lg text-lg transition-colors ${scenario === s.id ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-slate-300 group-hover:text-white'}`}>
                    {s.icon}
                  </span>
                  <span className={`font-semibold tracking-tight ${scenario === s.id ? 'text-emerald-300' : 'text-slate-200 group-hover:text-white'}`}>{s.name}</span>
                </div>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">{s.description}</p>
              </button>
            ))}
          </div>

          <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <h4 className="font-bold mb-3 text-sm text-emerald-400 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Patterns Covered
            </h4>
            <ul className="text-xs text-emerald-200/70 space-y-2">
              <li className="flex items-center gap-2"><span className="text-emerald-500">•</span> Message Transformation</li>
              <li className="flex items-center gap-2"><span className="text-emerald-500">•</span> Content-Based Router</li>
              <li className="flex items-center gap-2"><span className="text-emerald-500">•</span> Message Filter</li>
              <li className="flex items-center gap-2"><span className="text-emerald-500">•</span> Aggregator</li>
              <li className="flex items-center gap-2"><span className="text-emerald-500">•</span> Splitter</li>
            </ul>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative bg-[#0f172a] p-8 overflow-y-auto">
          <div className="absolute inset-0 z-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
          <div className="max-w-4xl mx-auto relative z-10">
            {/* Scenario Content */}
            {scenario === 'data-transformation' && <DataTransformationScenario />}
            {scenario === 'message-routing' && <MessageRoutingScenario />}
            {scenario === 'aggregation' && <AggregationScenario />}
          </div>
        </div>

        {/* Info Panel */}
        <div className="hidden lg:block w-80 bg-white/5 backdrop-blur-xl border-l border-white/10 p-5 overflow-y-auto" role="complementary" aria-label="Pattern guide">
          <h3 className="font-bold mb-5 flex items-center gap-2 text-slate-200">
            <span className="text-xl">📚</span> Pattern Guide
          </h3>

          <div className="space-y-5">
            {scenario === 'data-transformation' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-4">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                  <h4 className="font-bold text-sm text-blue-400 mb-2">Message Translator</h4>
                  <p className="text-sm text-blue-200/80 leading-relaxed">
                    Translates messages between different data formats without changing the semantic meaning.
                  </p>
                </div>
                <div className="text-sm bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                  <div className="flex flex-col gap-1"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Use Case</span> <span className="text-slate-300">Legacy system integration</span></div>
                  <div className="flex flex-col gap-1"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tools</span> <span className="text-slate-300">XSLT, JSONata, Apache Camel</span></div>
                  <div className="flex flex-col gap-1"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Example</span> <span className="text-slate-300">XML → JSON, CSV → Avro</span></div>
                </div>
              </div>
            )}

            {scenario === 'message-routing' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-4">
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                  <h4 className="font-bold text-sm text-purple-400 mb-2">Content-Based Router</h4>
                  <p className="text-sm text-purple-200/80 leading-relaxed">
                    Routes messages to different destinations based on message content.
                  </p>
                </div>
                <div className="text-sm bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                  <div className="flex flex-col gap-1"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Use Case</span> <span className="text-slate-300">Dynamic routing logic</span></div>
                  <div className="flex flex-col gap-1"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tools</span> <span className="text-slate-300">Apache Camel, MuleSoft, WSO2</span></div>
                  <div className="flex flex-col gap-1"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Example</span> <span className="text-slate-300">Route by region or priority</span></div>
                </div>
              </div>
            )}

            {scenario === 'aggregation' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-4">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                  <h4 className="font-bold text-sm text-emerald-400 mb-2">Message Aggregator</h4>
                  <p className="text-sm text-emerald-200/80 leading-relaxed">
                    Combines multiple related messages into a single message.
                  </p>
                </div>
                <div className="text-sm bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                  <div className="flex flex-col gap-1"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Use Case</span> <span className="text-slate-300">Collecting responses from sources</span></div>
                  <div className="flex flex-col gap-1"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tools</span> <span className="text-slate-300">Camel Aggregator, Spring Int.</span></div>
                  <div className="flex flex-col gap-1"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Example</span> <span className="text-slate-300">Gathering warehouse inventory</span></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function DataTransformationScenario() {
  const [packet, setPacket] = useState({ x: 50, y: 165, data: '<xml>', type: 'xml' });

  useEffect(() => {
    const animate = () => {
      setPacket(p => {
        if (p.x > 550) return { ...p, x: 50, type: 'xml', data: '<xml>' }; // Reset
        const newX = p.x + 2;
        let newType = p.type;
        let newData = p.data;
        if (p.x > 300) {
          newType = 'json';
          newData = '{...}';
        }
        return { ...p, x: newX, type: newType, data: newData };
      });
    };
    const interval = setInterval(animate, 20);
    return () => clearInterval(interval);
  }, []);

  const nodes: Node[] = [
    { id: '1', position: { x: 0, y: 150 }, data: { label: 'Legacy CRM (XML)' }, style: { background: '#dbeafe', borderColor: '#93c5fd', width: 200 } },
    { id: '2', position: { x: 250, y: 150 }, data: { label: '🔄 Message Translator' }, style: { background: '#e0e7ff', borderColor: '#a5b4fc', width: 200 } },
    { id: '3', position: { x: 500, y: 150 }, data: { label: 'Microservice API (JSON)' }, style: { background: '#d1fae5', borderColor: '#6ee7b7', width: 200 } },
  ];

  const edges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: false },
    { id: 'e2-3', source: '2', target: '3', animated: false },
  ];

  const packetColor = packet.type === 'xml' ? 'bg-blue-300' : 'bg-green-300';

  return (
    <div className="space-y-6">
      <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl shadow-2xl p-6">
        <h3 className="text-xl font-bold mb-4 text-white">🔄 Data Transformation Challenge</h3>
        <p className="text-slate-400 mb-6">
          Transform XML from a legacy CRM system into JSON for your modern microservice API.
        </p>

        <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-6">
          <PatternCanvas nodes={nodes} edges={edges}>
            <div
              className={`absolute top-0 left-0 text-xs font-mono p-1 rounded shadow-lg transition-all duration-100 ${packetColor}`}
              style={{ transform: `translate(${packet.x}px, ${packet.y}px)` }}
            >
              {packet.data}
            </div>
          </PatternCanvas>
        </div>

        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <h4 className="font-bold mb-3 text-sm text-blue-400">Transformation Logic</h4>
          <ul className="text-sm text-blue-200/80 space-y-1.5">
            <li><span className="text-blue-500 mr-2">•</span>Flatten nested Name structure</li>
            <li><span className="text-blue-500 mr-2">•</span>Rename ID → customerId</li>
            <li><span className="text-blue-500 mr-2">•</span>Combine First + Last → fullName</li>
            <li><span className="text-blue-500 mr-2">•</span>Remove phone formatting</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function MessageRoutingScenario() {
  const nodes: Node[] = [
    { id: '1', position: { x: 250, y: 0 }, data: { label: 'Incoming Order' }, style: { background: '#dbeafe', borderColor: '#93c5fd' } },
    { id: '2', position: { x: 250, y: 150 }, data: { label: '🔀 Content-Based Router' }, style: { background: '#e0e7ff', borderColor: '#a5b4fc' } },
    { id: '3', position: { x: 0, y: 300 }, data: { label: 'Seattle FC' }, style: { background: '#d1fae5', borderColor: '#6ee7b7' } },
    { id: '4', position: { x: 250, y: 300 }, data: { label: 'New York FC' }, style: { background: '#dbeafe', borderColor: '#93c5fd' } },
    { id: '5', position: { x: 500, y: 300 }, data: { label: 'Chicago FC' }, style: { background: '#f3e8ff', borderColor: '#c084fc' } },
  ];

  const edges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', label: 'region = "west-coast"', animated: true },
    { id: 'e2-4', source: '2', target: '4', label: 'region = "east-coast"', animated: true },
    { id: 'e2-5', source: '2', target: '5', label: 'region = "central"', animated: true },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl shadow-2xl p-6">
        <h3 className="text-xl font-bold mb-4 text-white">🔀 Content-Based Routing</h3>
        <p className="text-slate-400 mb-6">
          Route customer orders to the appropriate fulfillment center based on shipping address.
        </p>

        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <PatternCanvas nodes={nodes} edges={edges} />
        </div>
      </div>
    </div>
  )
}

function AggregationScenario() {
  const nodes: Node[] = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: 'Warehouse A' }, style: { background: '#dbeafe', borderColor: '#93c5fd' } },
    { id: '2', position: { x: 250, y: 0 }, data: { label: 'Warehouse B' }, style: { background: '#d1fae5', borderColor: '#6ee7b7' } },
    { id: '3', position: { x: 500, y: 0 }, data: { label: 'Warehouse C' }, style: { background: '#f3e8ff', borderColor: '#c084fc' } },
    { id: '4', position: { x: 250, y: 150 }, data: { label: '📦 Message Aggregator' }, style: { background: '#ffedd5', borderColor: '#fb923c' } },
    { id: '5', position: { x: 250, y: 300 }, data: { label: 'Inventory Report' }, style: { background: '#fef3c7', borderColor: '#facc15' } },
  ];

  const edges: Edge[] = [
    { id: 'e1-4', source: '1', target: '4', animated: true },
    { id: 'e2-4', source: '2', target: '4', animated: true },
    { id: 'e3-4', source: '3', target: '4', animated: true },
    { id: 'e4-5', source: '4', target: '5', animated: true, label: 'Consolidated' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl shadow-2xl p-6">
        <h3 className="text-xl font-bold mb-4 text-white">📦 Message Aggregation</h3>
        <p className="text-slate-400 mb-6">
          Combine inventory data from multiple warehouses into a single consolidated report.
        </p>

        <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-6">
          <PatternCanvas nodes={nodes} edges={edges} />
        </div>

        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-sm text-emerald-200/90 leading-relaxed">
          <strong className="text-emerald-400">Aggregation Strategy:</strong> Wait for responses from all 3 warehouses (timeout: 5s),
          then combine by SKU and sum quantities.
        </div>
      </div>
    </div>
  )
}
