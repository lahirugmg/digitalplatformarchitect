'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Expand } from 'lucide-react';

// Dynamically import the playground canvas to avoid SSR issues
const PlaygroundCanvas = dynamic(
  () => import('../architecture-playground/components/PlaygroundCanvas'),
  { ssr: false }
);

const PersonaSelector = dynamic(
  () => import('../architecture-playground/components/PersonaSelector'),
  { ssr: false }
);

const LevelControls = dynamic(
  () => import('../architecture-playground/components/LevelControls'),
  { ssr: false }
);

export default function EmbeddedPlayground() {
  const [isMinimized, setIsMinimized] = useState(false);

  if (isMinimized) {
    return (
      <div className="bg-white border-2 border-purple-300 rounded-lg p-4 cursor-pointer hover:shadow-lg transition"
           onClick={() => setIsMinimized(false)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🏛️</div>
            <div>
              <h3 className="font-bold text-lg">Interactive Architecture Playground</h3>
              <p className="text-sm text-slate-600">Click to expand and explore</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            Expand Playground
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-2xl border-2 border-purple-300 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🏛️</div>
            <div>
              <h2 className="text-xl font-bold">Interactive Architecture Playground</h2>
              <p className="text-sm text-purple-100">
                Explore enterprise architecture from Business to Code
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/architecture-playground"
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition flex items-center gap-2"
            >
              <Expand className="w-4 h-4" />
              Full Screen
            </Link>
            <button
              onClick={() => setIsMinimized(true)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition"
            >
              Minimize
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-[320px_1fr] gap-0">
        {/* Left Controls */}
        <div className="bg-slate-50 border-r border-slate-200 p-4 space-y-4 max-h-[600px] overflow-y-auto">
          <PersonaSelector />
          <LevelControls />

          {/* Quick Info */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-3">
            <h3 className="text-sm font-bold text-purple-900 mb-2">🎯 Try This</h3>
            <ul className="text-xs text-purple-800 space-y-1.5">
              <li>1. Choose your role above</li>
              <li>2. Click on any component</li>
              <li>3. Switch detail levels (L0-L3)</li>
              <li>4. Explore different perspectives!</li>
            </ul>
          </div>

          {/* Feature Highlights */}
          <div className="bg-white border border-slate-200 rounded-lg p-3">
            <h3 className="text-xs font-bold text-slate-700 mb-2">✨ What's Special</h3>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>✓ 5 Persona Views</li>
              <li>✓ 4 Detail Levels</li>
              <li>✓ Real Architecture Example</li>
              <li>✓ Interactive Exploration</li>
            </ul>
          </div>
        </div>

        {/* Right Canvas */}
        <div className="h-[600px] relative">
          <PlaygroundCanvas architectureId="ecommerce-platform" />

          {/* Overlay Instructions (shown on first load) */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur rounded-lg shadow-lg p-4 max-w-xs border border-purple-200">
            <h4 className="font-bold text-sm text-purple-900 mb-2">👆 Getting Started</h4>
            <ul className="text-xs text-slate-700 space-y-1">
              <li>• <strong>Scroll</strong> to zoom in/out</li>
              <li>• <strong>Drag</strong> to pan around</li>
              <li>• <strong>Click nodes</strong> to see details</li>
              <li>• <strong>Try different personas</strong> on the left</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-slate-50 border-t border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Viewing: <strong>E-Commerce Platform</strong> Architecture
          </div>
          <Link
            href="/architecture-playground"
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium text-sm"
          >
            Open in Full Screen →
          </Link>
        </div>
      </div>
    </div>
  );
}
