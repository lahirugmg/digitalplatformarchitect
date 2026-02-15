# FEAT-006: Add undo/redo functionality in playgrounds

**Status:** Proposed
**Priority:** High
**Category:** UX Enhancement
**Effort:** Medium
**Created:** 2026-02-14

## Description

Implement undo/redo for all playground actions so users can experiment without fear of mistakes.

## User Story

**As a** user
**I want** to undo my recent actions in playgrounds
**So that** I can experiment freely without worrying about mistakes

## Current State

Currently:
- No undo/redo functionality
- Mistakes require manual reversal or reload
- Users hesitant to experiment
- No command history

## Proposed Solution

### 1. Use Zustand with Temporal Middleware

```bash
npm install zustand
```

```typescript
// lib/stores/useHistoryStore.ts
import { create } from 'zustand';
import { temporal } from 'zustand/middleware';

interface HistoryState {
  nodes: Node[];
  edges: Edge[];
}

export const useHistoryStore = create<HistoryState>()(
  temporal(
    (set) => ({
      nodes: [],
      edges: [],
      setNodes: (nodes) => set({ nodes }),
      setEdges: (edges) => set({ edges }),
    }),
    {
      limit: 20, // Keep last 20 states
    }
  )
);

// Access undo/redo
const { undo, redo, clear } = useHistoryStore.temporal.getState();
```

### 2. Implement in Data Pipeline

```typescript
// app/playgrounds/data-pipeline/components/DataPipelineCanvas.tsx
'use client';

import { useHistoryStore } from '@/lib/stores/useHistoryStore';

export function DataPipelineCanvas() {
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  const { undo, redo, clear, pastStates, futureStates } =
    useHistoryStore.temporal.getState();

  const canUndo = pastStates.length > 0;
  const canRedo = futureStates.length > 0;

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleUndo = () => {
    if (canUndo) {
      undo();
      const state = useHistoryStore.getState();
      setNodes(state.nodes);
      setEdges(state.edges);
      toast.info('Undone');
    }
  };

  const handleRedo = () => {
    if (canRedo) {
      redo();
      const state = useHistoryStore.getState();
      setNodes(state.nodes);
      setEdges(state.edges);
      toast.info('Redone');
    }
  };

  // Save state on every change
  const onNodesChange = useCallback((changes) => {
    const newNodes = applyNodeChanges(changes, nodes);
    setNodes(newNodes);
    useHistoryStore.getState().setNodes(newNodes);
  }, [nodes]);

  const onEdgesChange = useCallback((changes) => {
    const newEdges = applyEdgeChanges(changes, edges);
    setEdges(newEdges);
    useHistoryStore.getState().setEdges(newEdges);
  }, [edges]);

  return (
    <div>
      {/* Undo/Redo Toolbar */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <button
          onClick={handleUndo}
          disabled={!canUndo}
          className="bg-white px-3 py-2 rounded-lg shadow disabled:opacity-50"
          title="Undo (Cmd+Z)"
        >
          ↶ Undo
        </button>
        <button
          onClick={handleRedo}
          disabled={!canRedo}
          className="bg-white px-3 py-2 rounded-lg shadow disabled:opacity-50"
          title="Redo (Cmd+Shift+Z)"
        >
          ↷ Redo
        </button>
        <span className="bg-white px-3 py-2 rounded-lg shadow text-sm text-slate-600">
          {pastStates.length} actions
        </span>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      />
    </div>
  );
}
```

### 3. Alternative: Custom Hook

```typescript
// hooks/useUndoRedo.ts
import { useState, useCallback } from 'react';

interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

export function useUndoRedo<T>(initialState: T, limit = 20) {
  const [state, setState] = useState<HistoryState<T>>({
    past: [],
    present: initialState,
    future: [],
  });

  const set = useCallback((newPresent: T) => {
    setState((currentState) => ({
      past: [...currentState.past, currentState.present].slice(-limit),
      present: newPresent,
      future: [],
    }));
  }, [limit]);

  const undo = useCallback(() => {
    setState((currentState) => {
      if (currentState.past.length === 0) return currentState;

      const previous = currentState.past[currentState.past.length - 1];
      const newPast = currentState.past.slice(0, currentState.past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [currentState.present, ...currentState.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((currentState) => {
      if (currentState.future.length === 0) return currentState;

      const next = currentState.future[0];
      const newFuture = currentState.future.slice(1);

      return {
        past: [...currentState.past, currentState.present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  const reset = useCallback((newPresent: T) => {
    setState({
      past: [],
      present: newPresent,
      future: [],
    });
  }, []);

  return {
    state: state.present,
    set,
    undo,
    redo,
    reset,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
    historyLength: state.past.length,
  };
}

// Usage
const {
  state: pipeline,
  set: setPipeline,
  undo,
  redo,
  canUndo,
  canRedo,
} = useUndoRedo({ nodes: [], edges: [] });
```

### 4. Action History Viewer (Optional)

```typescript
// components/HistoryPanel.tsx
export function HistoryPanel() {
  const { pastStates } = useHistoryStore.temporal.getState();

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold mb-2">History</h3>
      <div className="space-y-1">
        {pastStates.slice(-10).reverse().map((state, i) => (
          <div key={i} className="text-sm text-slate-600">
            {getActionDescription(state)}
          </div>
        ))}
      </div>
    </div>
  );
}

function getActionDescription(state: any): string {
  // Analyze state diff to describe action
  // "Added Kafka node"
  // "Connected API to Database"
  // "Deleted Redis node"
  return 'Action';
}
```

## Acceptance Criteria

- [ ] Undo last 20 actions
- [ ] Redo previously undone actions
- [ ] Keyboard shortcuts (Cmd+Z, Cmd+Shift+Z)
- [ ] Visual indication of undo/redo availability
- [ ] Works for adding/removing nodes
- [ ] Works for adding/removing connections
- [ ] Works for moving nodes
- [ ] Works for changing node properties
- [ ] Optional: Action history viewer
- [ ] Toast notifications on undo/redo
- [ ] Clears redo stack when new action taken
- [ ] Works across all playgrounds

## Keyboard Shortcuts

| Action | Mac | Windows/Linux |
|--------|-----|---------------|
| Undo | Cmd+Z | Ctrl+Z |
| Redo | Cmd+Shift+Z | Ctrl+Shift+Z |
| Redo (alt) | Cmd+Y | Ctrl+Y |

## Files to Create/Modify

```
lib/stores/useHistoryStore.ts (new) - or hooks/useUndoRedo.ts
components/UndoRedoToolbar.tsx (new)
app/playgrounds/data-pipeline/components/DataPipelineCanvas.tsx
app/playgrounds/pattern-composer/page.tsx
app/playgrounds/message-flow/page.tsx
app/playgrounds/enterprise-integration/page.tsx
```

## Benefits

✅ Users can experiment freely without fear
✅ Reduces mistakes and frustration
✅ Professional feature expected in design tools
✅ Faster iteration and learning
✅ Better user confidence
✅ Keyboard power users work faster

## Technical Considerations

### Performance
- Limit history to 20 states to prevent memory issues
- Deep clone state on each change (performance cost)
- Consider throttling/debouncing rapid changes

### State Structure
- Store complete state snapshots vs. action diffs
- Snapshots: Simple but memory-intensive
- Diffs: Complex but memory-efficient

### Integration with ReactFlow
- ReactFlow has internal state that needs coordination
- Use controlled components (useNodesState, useEdgesState)
- Ensure sync between history and ReactFlow state

## Estimated Effort

**Medium** (10-14 hours):
- 3 hours: Implement undo/redo hook or store
- 4 hours: Integrate with Data Pipeline
- 3 hours: Integrate with other playgrounds
- 2 hours: Keyboard shortcuts and UI
- 2 hours: Testing and polish

## Dependencies

- zustand (if using temporal middleware) OR custom hook
- FEAT-001 (Toast notifications for feedback)

## Testing Checklist

- [ ] Undo adding node
- [ ] Undo removing node
- [ ] Undo adding connection
- [ ] Undo removing connection
- [ ] Undo moving node
- [ ] Redo after undo
- [ ] Redo stack clears on new action
- [ ] Keyboard shortcuts work
- [ ] Visual states update correctly
- [ ] History limit works (max 20)
- [ ] Works after save/load
- [ ] No memory leaks with large histories
- [ ] Test on all playgrounds
- [ ] Toast notifications appear

## Future Enhancements

- Named checkpoints/bookmarks
- Branch history (tree structure)
- Export/import action history
- Replay actions (animation)
- Collaborative undo/redo (multi-user)
- Action descriptions in history panel
- Search history
- Undo/redo specific actions (selective undo)
- Time travel debugging

## Related Issues

- Improves: Overall playground UX
- Enables: More experimentation and learning
- Complements: FEAT-002 (Export), FEAT-007 (Tutorials)

## Success Metrics

After implementation, track:
- Average undo operations per session
- Redo usage (indicates users exploring alternatives)
- User feedback on feature
- Reduction in "reset" button usage
