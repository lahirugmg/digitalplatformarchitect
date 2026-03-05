import { Metadata } from 'next';
import Link from 'next/link';
import PlaygroundCanvas from './components/PlaygroundCanvas';
import PersonaSelector from './components/PersonaSelector';
import LevelControls from './components/LevelControls';
import ContextPanel from './components/ContextPanel';
import PersonaContextBootstrap from './components/PersonaContextBootstrap';

export const metadata: Metadata = {
  title: 'Interactive Architecture Playground | Digital Platform Architect',
  description: 'Explore enterprise architecture with our interactive, persona-driven playground. Bridge theory and practice with zoomable architecture diagrams.',
};

export default function ArchitecturePlaygroundPage() {
  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/5 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="flex justify-between items-center max-w-[1600px] mx-auto">
          <div>
            <h1 className="text-2xl font-bold mb-1 tracking-tight text-white flex items-center gap-3">
              <span className="text-3xl">🏛️</span> Architecture Playground
            </h1>
            <p className="text-slate-400 font-medium">
              Explore how theory meets practice with persona-driven, multi-level architecture views
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/"
              className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-lg font-medium transition-all text-sm text-slate-300 hover:text-white"
            >
              ← Home
            </Link>
            <Link
              href="/playgrounds"
              className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 hover:bg-blue-500/30 hover:border-blue-400/50 rounded-lg font-medium transition-all text-sm text-blue-300 hover:text-blue-200"
            >
              Other Playgrounds
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative z-10 max-w-[1600px] w-full mx-auto">
        {/* Left Sidebar - Controls */}
        <div className="w-80 bg-white/5 backdrop-blur-xl border-r border-white/10 overflow-y-auto p-5 space-y-6">
          <PersonaContextBootstrap />

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Perspective</h3>
            <PersonaSelector />
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Detail Level</h3>
            <LevelControls />
          </div>

          <div className="w-full h-px bg-white/10 my-6" />

          {/* Info Panel */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5">
            <h3 className="text-sm font-bold text-blue-400 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              How to Use
            </h3>
            <ul className="text-sm text-blue-200/70 space-y-2.5">
              <li className="flex items-start gap-2"><span className="text-blue-500">•</span> <strong>Choose your role</strong> to see relevant information</li>
              <li className="flex items-start gap-2"><span className="text-blue-500">•</span> <strong>Select detail level</strong> (L0-L3) to zoom in/out</li>
              <li className="flex items-start gap-2"><span className="text-blue-500">•</span> <strong>Click nodes</strong> to view detailed information</li>
              <li className="flex items-start gap-2"><span className="text-blue-500">•</span> <strong>Scroll to zoom</strong> on the canvas</li>
              <li className="flex items-start gap-2"><span className="text-blue-500">•</span> <strong>Drag to pan</strong> around the architecture</li>
            </ul>
          </div>

          {/* Features */}
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-5">
            <h3 className="text-sm font-bold text-purple-400 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Features
            </h3>
            <ul className="text-sm text-purple-200/70 space-y-2 grid grid-cols-2">
              <li className="flex items-center gap-1.5"><span className="text-purple-500">✓</span> 5 Roles</li>
              <li className="flex items-center gap-1.5"><span className="text-purple-500">✓</span> 4 Levels</li>
              <li className="flex items-center gap-1.5"><span className="text-purple-500">✓</span> Theory Links</li>
              <li className="flex items-center gap-1.5"><span className="text-purple-500">✓</span> Real KPIs</li>
              <li className="flex items-center gap-1.5 col-span-2"><span className="text-purple-500">✓</span> Code Examples</li>
            </ul>
          </div>
        </div>

        {/* Center - Canvas */}
        <div className="flex-1 flex flex-col relative bg-[#1e293b]">
          <div className="absolute inset-0 z-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
          <div className="relative z-10 w-full h-full">
            <PlaygroundCanvas architectureId="ecommerce-platform" />
          </div>
        </div>

        {/* Right Sidebar - Context Panel */}
        <div className="w-96 bg-white/5 backdrop-blur-xl border-l border-white/10 overflow-y-auto">
          <ContextPanel />
        </div>
      </div>
    </div>
  );
}
