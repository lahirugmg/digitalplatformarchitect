"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { blockList } from "@/lib/blocks";

type NodeModel = {
  id: string;
  slug: string;
  title: string;
  x: number;
  y: number;
};

type EdgeModel = {
  id: string;
  from: string;
  to: string;
};

function uid(prefix = "id") {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function ArchitectureBuilder() {
  const [nodes, setNodes] = useState<NodeModel[]>([]);
  const [edges, setEdges] = useState<EdgeModel[]>([]);
  const [connectMode, setConnectMode] = useState(false);
  const [connectFrom, setConnectFrom] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);

  // Palette items from blockList
  const palette = useMemo(() => blockList.map(b => ({ slug: b.slug, title: b.title })), []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current || !canvasRef.current) return;
      const { left, top } = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - left - dragRef.current.offsetX;
      const y = e.clientY - top - dragRef.current.offsetY;
      setNodes(prev => prev.map(n => n.id === dragRef.current!.id ? { ...n, x, y } : n));
    };
    const onUp = () => { dragRef.current = null; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const onCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const slug = e.dataTransfer.getData("application/block-slug");
    const title = e.dataTransfer.getData("application/block-title");
    if (!slug || !canvasRef.current) return;
    const { left, top } = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - left - 60; // place with small offset
    const y = e.clientY - top - 20;
    const id = uid("node");
    setNodes(prev => [...prev, { id, slug, title: title || slug, x, y }]);
  };

  const onCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onNodeMouseDown = (e: React.MouseEvent, id: string) => {
    if (!canvasRef.current) return;
    const target = e.currentTarget as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    dragRef.current = { id, offsetX: e.clientX - rect.left, offsetY: e.clientY - rect.top };
    setSelectedNode(id);
  };

  const handleConnectClick = (nodeId: string) => {
    if (!connectMode) return;
    if (!connectFrom) {
      setConnectFrom(nodeId);
      return;
    }
    if (connectFrom === nodeId) {
      setConnectFrom(null);
      return;
    }
    const id = uid("edge");
    setEdges(prev => [...prev, { id, from: connectFrom, to: nodeId }]);
    setConnectFrom(null);
  };

  const removeSelected = () => {
    if (!selectedNode) return;
    setEdges(prev => prev.filter(e => e.from !== selectedNode && e.to !== selectedNode));
    setNodes(prev => prev.filter(n => n.id !== selectedNode));
    setSelectedNode(null);
  };

  const clearAll = () => {
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
    setConnectFrom(null);
  };

  const exportJSON = () => {
    const payload = JSON.stringify({ nodes, edges }, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'architecture-builder.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // helper to compute center positions for lines
  const getNodeCenter = (n: NodeModel) => ({ x: n.x + 100, y: n.y + 28 });

  return (
    <div className="builder">
      <div className="builder-toolbar">
        <div className="builder-actions">
          <button className={`btn ${connectMode ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setConnectMode(v => !v)}>
            {connectMode ? 'Connecting… (click nodes)' : 'Connect Nodes'}
          </button>
          <button className="btn btn-secondary" onClick={removeSelected} disabled={!selectedNode}>Delete Selected</button>
          <button className="btn btn-secondary" onClick={clearAll}>Clear</button>
          <button className="btn btn-secondary" onClick={exportJSON}>Export JSON</button>
        </div>
        <div className="builder-hint">Tip: Drag blocks from the left, drag nodes to move. Click two nodes in Connect mode to link them.</div>
      </div>

      <div className="builder-content">
        <aside className="builder-palette">
          <div className="palette-header">Building Blocks</div>
          <div className="palette-items">
            {palette.map(item => (
              <div
                key={item.slug}
                className="palette-item"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("application/block-slug", item.slug);
                  e.dataTransfer.setData("application/block-title", item.title);
                }}
                title={item.title}
              >
                <div className="palette-item-title">{item.title}</div>
                <div className="palette-item-slug">{item.slug}</div>
              </div>
            ))}
          </div>
        </aside>

        <div
          className="builder-canvas"
          ref={canvasRef}
          onDrop={onCanvasDrop}
          onDragOver={onCanvasDragOver}
          role="application"
          aria-label="Architecture canvas"
        >
          <svg className="builder-edges" xmlns="http://www.w3.org/2000/svg">
            {edges.map(edge => {
              const from = nodes.find(n => n.id === edge.from);
              const to = nodes.find(n => n.id === edge.to);
              if (!from || !to) return null;
              const a = getNodeCenter(from);
              const b = getNodeCenter(to);
              return (
                <line
                  key={edge.id}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="var(--border-strong)"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
              );
            })}
            <defs>
              <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <polygon points="0 0, 6 3, 0 6" fill="var(--border-strong)" />
              </marker>
            </defs>
          </svg>

          {nodes.map(n => (
            <div
              key={n.id}
              className={`builder-node ${selectedNode === n.id ? 'selected' : ''} ${connectFrom === n.id ? 'connecting' : ''}`}
              style={{ left: n.x, top: n.y }}
              onMouseDown={(e) => onNodeMouseDown(e, n.id)}
              onClick={() => handleConnectClick(n.id)}
            >
              <div className="node-title">{n.title}</div>
              <div className="node-slug">{n.slug}</div>
              <a className="node-link" href={`/blocks/${n.slug}`} target="_blank" rel="noopener noreferrer">Open</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

