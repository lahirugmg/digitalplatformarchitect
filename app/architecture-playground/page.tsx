import { Metadata } from 'next';
import Link from 'next/link';
import PlaygroundCanvas from './components/PlaygroundCanvas';
import PersonaSelector from './components/PersonaSelector';
import LevelControls from './components/LevelControls';
import ContextPanel from './components/ContextPanel';

export const metadata: Metadata = {
  title: 'Interactive Architecture Playground | Digital Platform Architect',
  description: 'Explore enterprise architecture with our interactive, persona-driven playground. Bridge theory and practice with zoomable architecture diagrams.',
};

export default function ArchitecturePlaygroundPage() {
  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white px-6 py-4 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">🏛️ Interactive Architecture Playground</h1>
            <p className="text-purple-100">
              Explore how theory meets practice with persona-driven, multi-level architecture views
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/"
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition"
            >
              ← Home
            </Link>
            <Link
              href="/playgrounds"
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition"
            >
              Other Playgrounds
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Controls */}
        <div className="w-80 bg-white border-r border-slate-200 overflow-y-auto p-4 space-y-4">
          <PersonaSelector />
          <LevelControls />

          {/* Info Panel */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-bold text-blue-900 mb-2">💡 How to Use</h3>
            <ul className="text-xs text-blue-800 space-y-2">
              <li>• <strong>Choose your role</strong> to see relevant information</li>
              <li>• <strong>Select detail level</strong> (L0-L3) to zoom in/out</li>
              <li>• <strong>Click nodes</strong> to view detailed information</li>
              <li>• <strong>Scroll to zoom</strong> on the canvas</li>
              <li>• <strong>Drag to pan</strong> around the architecture</li>
            </ul>
          </div>

          {/* Features */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="text-sm font-bold text-purple-900 mb-2">✨ Features</h3>
            <ul className="text-xs text-purple-800 space-y-1">
              <li>✓ 5 Persona Views</li>
              <li>✓ 4 Detail Levels (L0-L3)</li>
              <li>✓ Theory ↔ Practice Links</li>
              <li>✓ Real Metrics & KPIs</li>
              <li>✓ Code Examples</li>
            </ul>
          </div>
        </div>

        {/* Center - Canvas */}
        <div className="flex-1 flex flex-col">
          <PlaygroundCanvas architectureId="ecommerce-platform" />
        </div>

        {/* Right Sidebar - Context Panel */}
        <div className="w-96 bg-white border-l border-slate-200 overflow-y-auto">
          <ContextPanel />
        </div>
      </div>
    </div>
  );
}
