"use client";

import { create } from "zustand";
import type { Persona, Plane, EdgeKind } from "@/lib/api-arch/schema";

export type PersonaFilter = Persona | "all";

type Filters = {
  planes: Record<Plane, boolean>;
  edges: Record<EdgeKind, boolean>;
};

type State = {
  persona: PersonaFilter;
  filters: Filters;
  selectedNodeId?: string;
  flowId?: string;
  stepIndex: number;
  search: string;
};

type Actions = {
  setPersona: (p: PersonaFilter) => void;
  togglePlane: (pl: Plane) => void;
  toggleEdgeKind: (k: EdgeKind) => void;
  selectNode: (id?: string) => void;
  setFlow: (id?: string) => void;
  setStep: (i: number) => void;
  setSearch: (s: string) => void;
  setFromQuery: (q: URLSearchParams) => void;
};

const defaults: Filters = {
  planes: { control: true, data: true, support: true },
  edges: { "data": true, "control": true, "observability": true, "security": true, "ci-cd": true },
};

export const useApimStore = create<State & Actions>((set) => ({
  persona: "all",
  filters: defaults,
  stepIndex: 0,
  search: "",
  setPersona: (p) => set({ persona: p }),
  togglePlane: (pl) => set((s) => ({ filters: { ...s.filters, planes: { ...s.filters.planes, [pl]: !s.filters.planes[pl] } } })),
  toggleEdgeKind: (k) => set((s) => ({ filters: { ...s.filters, edges: { ...s.filters.edges, [k]: !s.filters.edges[k] } } })),
  selectNode: (id) => set({ selectedNodeId: id }),
  setFlow: (id) => set({ flowId: id, stepIndex: 0 }),
  setStep: (i) => set({ stepIndex: Math.max(0, i) }),
  setSearch: (s) => set({ search: s }),
  setFromQuery: (q) => set({
    persona: (q.get("persona") as PersonaFilter) || "all",
    flowId: q.get("flow") || undefined,
    stepIndex: q.get("step") ? parseInt(q.get("step") as string, 10) : 0,
    search: q.get("search") || ""
  })
}));

