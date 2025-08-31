"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  title: string;
  Diagram: React.ComponentType;
};

export function DiagramZoom({ title, Diagram }: Props) {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if ((e.ctrlKey || e.metaKey) && (e.key === "+" || e.key === "=")) {
        e.preventDefault();
        setScale((s) => Math.min(2.5, +(s + 0.1).toFixed(2)));
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "-") {
        e.preventDefault();
        setScale((s) => Math.max(0.75, +(s - 0.1).toFixed(2)));
      }
      if (e.key.toLowerCase() === "0" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setScale(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="diagram-shell">
      <div className="diagram-inner">
        <Diagram />
      </div>
      <button className="zoom-btn" aria-label={`Magnify ${title}`} onClick={() => setOpen(true)}>
        🔍 Magnify
      </button>

      {open && (
        <div className="diagram-modal" role="dialog" aria-modal="true" aria-label={`${title} – zoomed view`}>
          <div className="diagram-modal-backdrop" onClick={() => setOpen(false)} />
          <div className="diagram-modal-content">
            <div className="diagram-modal-header">
              <h3>{title}</h3>
              <div className="zoom-controls" aria-label="Zoom controls">
                <button onClick={() => setScale((s) => Math.max(0.75, +(s - 0.1).toFixed(2)))} aria-label="Zoom out">−</button>
                <span className="zoom-level">{Math.round(scale * 100)}%</span>
                <button onClick={() => setScale((s) => Math.min(2.5, +(s + 0.1).toFixed(2)))} aria-label="Zoom in">+</button>
                <button onClick={() => setScale(1)} aria-label="Reset zoom">Reset</button>
                <button className="close-btn" onClick={() => setOpen(false)} aria-label="Close">✕</button>
              </div>
            </div>
            <div className="diagram-modal-body" ref={stageRef}>
              <div className="zoom-stage" style={{ transform: `scale(${scale})` }}>
                <Diagram />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

