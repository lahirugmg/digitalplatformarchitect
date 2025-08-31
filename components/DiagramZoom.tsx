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
  const bodyRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ dragging: boolean; startX: number; startY: number; scrollLeft: number; scrollTop: number }>({ dragging: false, startX: 0, startY: 0, scrollLeft: 0, scrollTop: 0 });
  const [baseSize, setBaseSize] = useState<{ w: number; h: number }>({ w: 1200, h: 800 });

  useEffect(() => {
    if (!open) return;
    // Reset zoom and measure base size of the SVG content
    setScale(1);
    const rAF = requestAnimationFrame(() => {
      const svg = stageRef.current?.querySelector('svg');
      if (svg) {
        const rect = svg.getBoundingClientRect();
        if (rect.width && rect.height) {
          setBaseSize({ w: Math.round(rect.width), h: Math.round(rect.height) });
        }
      }
    });
    return () => cancelAnimationFrame(rAF);
  }, [open]);

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
            <div
              className="diagram-modal-body"
              ref={bodyRef}
              style={{ cursor: dragState.current.dragging ? "grabbing" : "grab" }}
              onPointerDown={(e) => {
                const el = bodyRef.current;
                if (!el) return;
                dragState.current.dragging = true;
                dragState.current.startX = e.clientX;
                dragState.current.startY = e.clientY;
                dragState.current.scrollLeft = el.scrollLeft;
                dragState.current.scrollTop = el.scrollTop;
                (e.target as Element).setPointerCapture?.(e.pointerId);
              }}
              onPointerMove={(e) => {
                if (!dragState.current.dragging) return;
                const el = bodyRef.current;
                if (!el) return;
                const dx = e.clientX - dragState.current.startX;
                const dy = e.clientY - dragState.current.startY;
                el.scrollLeft = dragState.current.scrollLeft - dx;
                el.scrollTop = dragState.current.scrollTop - dy;
              }}
              onPointerUp={(e) => {
                dragState.current.dragging = false;
                (e.target as Element).releasePointerCapture?.(e.pointerId);
              }}
              onPointerLeave={() => {
                dragState.current.dragging = false;
              }}
              onDoubleClick={(e) => {
                // Double-click to zoom in towards clicked point
                const el = bodyRef.current;
                if (!el) return;
                const newScale = Math.min(2.5, +(scale + 0.25).toFixed(2));
                const rect = el.getBoundingClientRect();
                const offsetX = e.clientX - rect.left + el.scrollLeft;
                const offsetY = e.clientY - rect.top + el.scrollTop;
                const ratio = newScale / scale;
                // Keep the clicked point under cursor after zoom
                el.scrollLeft = offsetX * ratio - (e.clientX - rect.left);
                el.scrollTop = offsetY * ratio - (e.clientY - rect.top);
                setScale(newScale);
              }}
            >
              <div
                className="zoom-canvas"
                style={{ width: baseSize.w * scale, height: baseSize.h * scale, position: 'relative' }}
              >
                <div
                  className="zoom-stage"
                  ref={stageRef}
                  style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: baseSize.w, height: baseSize.h }}
                >
                  <Diagram />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
