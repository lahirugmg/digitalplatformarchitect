import { create } from 'zustand';
import { PlaygroundState, Persona, DetailLevel, PlaygroundMode, ArchitectureGraph, ArchitectureVertical } from './types';

interface PlaygroundStore extends PlaygroundState {
  architecture: ArchitectureGraph | null;
  setArchitecture: (arch: ArchitectureGraph) => void;
  setPersona: (persona: Persona) => void;
  setLevel: (level: DetailLevel) => void;
  setVertical: (vertical: ArchitectureVertical) => void;
  setMode: (mode: PlaygroundMode) => void;
  setFocusNode: (nodeId: string | null) => void;
  toggleNodeSelection: (nodeId: string) => void;
  clearSelection: () => void;
  setViewport: (viewport: { x: number; y: number; zoom: number }) => void;
  toggleOverlay: (overlayId: string) => void;
  setShowMinimap: (show: boolean) => void;
  setShowGrid: (show: boolean) => void;
}

export const usePlaygroundStore = create<PlaygroundStore>((set) => ({
  architecture: null,
  mode: 'explore',
  persona: 'ea',
  level: 'L1',
  vertical: 'solution',
  focusNode: null,
  selectedNodes: [],
  viewport: { x: 0, y: 0, zoom: 1 },
  activeOverlays: [],
  showMinimap: true,
  showGrid: false,

  setArchitecture: (arch) => set({ architecture: arch }),
  setPersona: (persona) => set({ persona }),
  setLevel: (level) => set({ level }),
  setVertical: (vertical) => set({ vertical }),
  setMode: (mode) => set({ mode }),
  setFocusNode: (nodeId) => set({ focusNode: nodeId }),

  toggleNodeSelection: (nodeId) =>
    set((state) => ({
      selectedNodes: state.selectedNodes.includes(nodeId)
        ? state.selectedNodes.filter((id) => id !== nodeId)
        : [...state.selectedNodes, nodeId]
    })),

  clearSelection: () => set({ selectedNodes: [] }),
  setViewport: (viewport) => set({ viewport }),

  toggleOverlay: (overlayId) =>
    set((state) => ({
      activeOverlays: state.activeOverlays.includes(overlayId)
        ? state.activeOverlays.filter((id) => id !== overlayId)
        : [...state.activeOverlays, overlayId]
    })),

  setShowMinimap: (show) => set({ showMinimap: show }),
  setShowGrid: (show) => set({ showGrid: show })
}));
