'use client'

import { useCallback, useMemo, useState } from 'react'
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  Position,
} from 'reactflow'
import 'reactflow/dist/style.css'

import { skillTreeData } from '@/lib/skill-tree'
import { UserProgress, unlockNode, completeNode } from '@/lib/unlock-system'
import SkillNode from './SkillNode'

const nodeTypes = {
  skillNode: SkillNode,
}

interface SkillTreeCanvasProps {
  userProgress: UserProgress
  onProgressUpdate: (progress: UserProgress) => void
  selectedBranch: string | null
}

export default function SkillTreeCanvas({
  userProgress,
  onProgressUpdate,
  selectedBranch,
}: SkillTreeCanvasProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)

  // Generate nodes and edges from skill tree data
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    const nodes: Node[] = []
    const edges: Edge[] = []

    const branchesToShow = selectedBranch
      ? skillTreeData.filter(b => b.id === selectedBranch)
      : skillTreeData

    let globalYOffset = 100

    branchesToShow.forEach((branch, branchIndex) => {
      const xOffset = branchIndex * 400 + 100
      const branchColor = getBranchColor(branch.id)

      // Add branch header node
      nodes.push({
        id: `branch-${branch.id}`,
        type: 'input',
        data: { label: `${branch.icon} ${branch.name}` },
        position: { x: xOffset, y: 50 },
        style: {
          background: branchColor,
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          padding: '12px 24px',
          fontWeight: 'bold',
          fontSize: '14px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        },
        draggable: false,
      })

      // Add skill nodes
      branch.nodes.forEach((skillNode, index) => {
        const isCompleted = userProgress.completedNodes.includes(skillNode.id)
        const isUnlocked = userProgress.unlockedNodes.includes(skillNode.id) || skillNode.unlocked
        const canUnlock = skillNode.prerequisites.every(prereq =>
          userProgress.completedNodes.includes(prereq)
        )

        nodes.push({
          id: skillNode.id,
          type: 'skillNode',
          data: {
            ...skillNode,
            isCompleted,
            isUnlocked,
            canUnlock,
            userTokens: userProgress.tokens,
            onUnlock: () => handleUnlockNode(skillNode.id, skillNode.difficulty),
            onComplete: () => handleCompleteNode(skillNode.id, skillNode.xp),
          },
          position: { x: xOffset, y: globalYOffset + index * 180 + 100 },
          draggable: false,
        })

        // Connect to branch header (first node)
        if (index === 0) {
          edges.push({
            id: `e-branch-${skillNode.id}`,
            source: `branch-${branch.id}`,
            target: skillNode.id,
            animated: false,
            style: { stroke: branchColor, strokeWidth: 2 },
            markerEnd: { type: MarkerType.ArrowClosed, color: branchColor },
          })
        }

        // Connect prerequisites
        skillNode.prerequisites.forEach(prereqId => {
          const isPrereqCompleted = userProgress.completedNodes.includes(prereqId)
          edges.push({
            id: `e-${prereqId}-${skillNode.id}`,
            source: prereqId,
            target: skillNode.id,
            animated: !isPrereqCompleted,
            style: {
              stroke: isPrereqCompleted ? '#10b981' : '#94a3b8',
              strokeWidth: isPrereqCompleted ? 3 : 2,
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: isPrereqCompleted ? '#10b981' : '#94a3b8',
            },
          })
        })
      })

      globalYOffset += branch.nodes.length * 180
    })

    return { nodes, edges }
  }, [skillTreeData, userProgress, selectedBranch])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  // Update nodes when userProgress changes
  useMemo(() => {
    setNodes(initialNodes)
    setEdges(initialEdges)
  }, [initialNodes, initialEdges, setNodes, setEdges])

  const handleUnlockNode = useCallback(
    (nodeId: string, difficulty: string) => {
      const result = unlockNode(userProgress, nodeId, difficulty)
      if (result.success) {
        onProgressUpdate(result.userProgress)
        // Show success notification
        alert(result.message)
      } else {
        alert(result.message)
      }
    },
    [userProgress, onProgressUpdate]
  )

  const handleCompleteNode = useCallback(
    (nodeId: string, xp: number) => {
      const newProgress = completeNode(userProgress, nodeId, xp)
      onProgressUpdate(newProgress)
      // Show success notification
      alert(`🎉 Node completed! +${xp} XP earned`)
    },
    [userProgress, onProgressUpdate]
  )

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
      >
        <Background color="#cbd5e1" gap={16} />
        <Controls />

        {/* Instructions overlay */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 max-w-md z-10">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            How to Progress
          </h3>
          <ul className="text-sm space-y-1 text-slate-700">
            <li>• <strong>Green nodes</strong> are unlocked and ready to learn</li>
            <li>• <strong>Blue nodes</strong> can be unlocked with tokens</li>
            <li>• <strong>Gray nodes</strong> are locked (complete prerequisites first)</li>
            <li>• Complete nodes to earn XP and unlock new skills!</li>
            <li>• Earn tokens daily to unlock new content</li>
          </ul>
        </div>
      </ReactFlow>
    </div>
  )
}

function getBranchColor(branchId: string): string {
  const colors: Record<string, string> = {
    integration: '#3b82f6',
    data: '#a855f7',
    cloud: '#06b6d4',
    security: '#ef4444',
    resilience: '#10b981',
    observability: '#f97316',
  }
  return colors[branchId] || '#64748b'
}
