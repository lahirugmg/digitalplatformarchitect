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
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">🔗 Enterprise Integration Patterns</h1>
            <p className="text-slate-600">Learn integration patterns through interactive scenarios</p>
          </div>
          <a
            href="/playgrounds"
            className="px-6 py-2 border border-slate-300 rounded-lg font-medium hover:bg-slate-50"
          >
            ← Back to Playgrounds
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Scenario Selector */}
        <div className="w-64 bg-white border-r border-slate-200 p-4 overflow-y-auto">
          <h3 className="font-bold mb-4 text-sm uppercase text-slate-500">Integration Scenarios</h3>

          <div className="space-y-3">
            {scenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => setScenario(s.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition ${
                  scenario === s.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{s.icon}</span>
                  <span className="font-semibold text-sm">{s.name}</span>
                </div>
                <p className="text-xs text-slate-600">{s.description}</p>
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">✅ Patterns Covered</h4>
            <ul className="text-xs text-slate-700 space-y-1">
              <li>• Message Transformation</li>
              <li>• Content-Based Router</li>
              <li>• Message Filter</li>
              <li>• Aggregator</li>
              <li>• Splitter</li>
            </ul>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-slate-50 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Scenario Content */}
            {scenario === 'data-transformation' && <DataTransformationScenario />}
            {scenario === 'message-routing' && <MessageRoutingScenario />}
            {scenario === 'aggregation' && <AggregationScenario />}
          </div>
        </div>

        {/* Info Panel */}
        <div className="w-80 bg-white border-l border-slate-200 p-4 overflow-y-auto">
          <h3 className="font-bold mb-3">Pattern Guide</h3>

          {scenario === 'data-transformation' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h4 className="font-semibold mb-2">Message Translator</h4>
                <p className="text-sm text-slate-700">
                  Translates messages between different data formats without changing the semantic meaning.
                </p>
              </div>
              <div className="text-sm space-y-2">
                <div><strong>Use Case:</strong> Legacy system integration</div>
                <div><strong>Tools:</strong> XSLT, JSONata, Apache Camel</div>
                <div><strong>Example:</strong> XML → JSON, CSV → Avro</div>
              </div>
            </div>
          )}

          {scenario === 'message-routing' && (
            <div className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <h4 className="font-semibold mb-2">Content-Based Router</h4>
                <p className="text-sm text-slate-700">
                  Routes messages to different destinations based on message content.
                </p>
              </div>
              <div className="text-sm space-y-2">
                <div><strong>Use Case:</strong> Dynamic routing logic</div>
                <div><strong>Tools:</strong> Apache Camel, MuleSoft, WSO2 ESB</div>
                <div><strong>Example:</strong> Route by region, customer type, priority</div>
              </div>
            </div>
          )}

          {scenario === 'aggregation' && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <h4 className="font-semibold mb-2">Message Aggregator</h4>
                <p className="text-sm text-slate-700">
                  Combines multiple related messages into a single message.
                </p>
              </div>
              <div className="text-sm space-y-2">
                <div><strong>Use Case:</strong> Collecting responses from multiple sources</div>
                <div><strong>Tools:</strong> Apache Camel Aggregator, Spring Integration</div>
                <div><strong>Example:</strong> Gather inventory from warehouses</div>
              </div>
            </div>
          )}
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
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">🔄 Data Transformation Challenge</h3>
        <p className="text-slate-600 mb-4">
          Transform XML from a legacy CRM system into JSON for your modern microservice API.
        </p>

        <PatternCanvas nodes={nodes} edges={edges}>
          <div
            className={`absolute top-0 left-0 text-xs font-mono p-1 rounded shadow-lg transition-all duration-100 ${packetColor}`}
            style={{ transform: `translate(${packet.x}px, ${packet.y}px)` }}
          >
            {packet.data}
          </div>
        </PatternCanvas>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold mb-2">Transformation Logic</h4>
          <ul className="text-sm space-y-1">
            <li>• Flatten nested Name structure</li>
            <li>• Rename ID → customerId</li>
            <li>• Combine First + Last → fullName</li>
            <li>• Remove phone formatting</li>
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
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">🔀 Content-Based Routing</h3>
        <p className="text-slate-600 mb-4">
          Route customer orders to the appropriate fulfillment center based on shipping address.
        </p>

        <PatternCanvas nodes={nodes} edges={edges} />

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
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">📦 Message Aggregation</h3>
        <p className="text-slate-600 mb-4">
          Combine inventory data from multiple warehouses into a single consolidated report.
        </p>

        <PatternCanvas nodes={nodes} edges={edges} />

        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm">
          <strong>Aggregation Strategy:</strong> Wait for responses from all 3 warehouses (timeout: 5s),
          then combine by SKU and sum quantities.
        </div>
      </div>
    </div>
  )
}
