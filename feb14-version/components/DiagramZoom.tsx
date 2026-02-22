"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  title: string;
  children: React.ReactElement;
  clickToOpen?: boolean; // click preview to open (defaults to true)
};

export function DiagramZoom({ title, children, clickToOpen = true }: Props) {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const stageRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ dragging: boolean; startX: number; startY: number; scrollLeft: number; scrollTop: number }>({ dragging: false, startX: 0, startY: 0, scrollLeft: 0, scrollTop: 0 });
  const [baseSize, setBaseSize] = useState<{ w: number; h: number }>({ w: 1200, h: 800 });
  const scrollLockRef = useRef<{ overflow: string; paddingRight: string } | null>(null);
  const [modalContainer, setModalContainer] = useState<Element | null>(null);

  useEffect(() => {
    if (!open) {
      setModalContainer(null);
      return;
    }

    const container = document.createElement("div");
    container.setAttribute("data-diagram-modal-root", "");
    document.body.appendChild(container);
    setModalContainer(container);

    return () => {
      container.remove();
    };
  }, [open]);

  useEffect(() => {
    if (!open || !modalContainer) return;

    // Reset zoom/pan state before measuring the diagram
    setScale(1);
    dragState.current.dragging = false;
    if (bodyRef.current) {
      bodyRef.current.scrollLeft = 0;
      bodyRef.current.scrollTop = 0;
    }

    const measureSvgNaturalSize = (svg: SVGSVGElement) => {
      const viewBox = svg.viewBox?.baseVal;
      if (viewBox?.width && viewBox?.height) {
        return { w: viewBox.width, h: viewBox.height };
      }

      const widthAttr = svg.getAttribute('width');
      const heightAttr = svg.getAttribute('height');
      const widthFromAttr = widthAttr ? parseFloat(widthAttr) : 0;
      const heightFromAttr = heightAttr ? parseFloat(heightAttr) : 0;
      if (widthFromAttr && heightFromAttr) {
        return { w: widthFromAttr, h: heightFromAttr };
      }

      try {
        const box = svg.getBBox?.();
        if (box?.width && box?.height) {
          return { w: box.width, h: box.height };
        }
      } catch {}

      const rect = svg.getBoundingClientRect();
      if (rect.width && rect.height) {
        return { w: rect.width, h: rect.height };
      }

      return null;
    };

    let frame = 0;
    const measure = () => {
      const svg = stageRef.current?.querySelector('svg');
      if (!svg) {
        frame = requestAnimationFrame(measure);
        return;
      }
      const size = measureSvgNaturalSize(svg as SVGSVGElement);
      if (size?.w && size?.h) {
        setBaseSize({ w: Math.round(size.w), h: Math.round(size.h) });
      }
    };

    frame = requestAnimationFrame(measure);

    return () => cancelAnimationFrame(frame);
  }, [open, modalContainer]);

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

  // Prevent background scroll and layout shift while modal is open
  useEffect(() => {
    if (open) {
      const body = document.body as HTMLBodyElement;
      // Store previous inline styles to restore later
      scrollLockRef.current = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      body.style.overflow = 'hidden';
      if (scrollBarWidth > 0) body.style.paddingRight = `${scrollBarWidth}px`;
      return () => {
        // Restore styles
        body.style.overflow = scrollLockRef.current?.overflow ?? '';
        body.style.paddingRight = scrollLockRef.current?.paddingRight ?? '';
      };
    }
  }, [open]);

  return (
    <div className="diagram-shell">
      <div
        className="diagram-inner"
        onClick={() => clickToOpen && setOpen(true)}
        style={clickToOpen ? { cursor: 'zoom-in' } : undefined}
      >
        {children}
      </div>

      {open && modalContainer && createPortal(
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
                  {React.isValidElement(children) ? React.cloneElement(children) : children}
                </div>
              </div>
            </div>
          </div>
        </div>,
        modalContainer
      )}
    </div>
  );
}
