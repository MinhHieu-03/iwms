import React, { useCallback, useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Panel,
  Node,
  addEdge,
  Connection,
  Edge,
  MarkerType,
} from "@xyflow/react";
import { Workflow } from "lucide-react";
import {
  storageHierarchyNodes,
  storageHierarchyEdges,
} from "@/data/warehouseData";
import { Button } from "antd";
import CustomStorageNode from "./CustomStorageNode";
import CustomStartNode, { CustomEndNode } from "./CustomStartNode";
import MissionTemplatesCard from "./MissionTemplatesCard";
import { NodeForm } from "./NodeForm";

interface StorageHierarchyCardProps {
  className?: string;
}

const StorageHierarchyCard: React.FC<StorageHierarchyCardProps> = ({
  className = "flex-1 mr-4",
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(storageHierarchyNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(storageHierarchyEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // Define custom node types
  const nodeTypes = useMemo(
    () => ({
      customStorage: CustomStorageNode,
      customStart: CustomStartNode,
      customEnd: CustomEndNode,
    }),
    []
  );

  const addNewNode = useCallback(() => {
    const newNodeId = `node-${Date.now()}`;
    const newNode: Node = {
      id: newNodeId,
      type: "customStorage", // Use our custom node type
      position: {
        x: Math.random() * 400 + 100, // Random position within a reasonable range
        y: Math.random() * 300 + 100,
      },
      data: {
        label: `New Node ${nodes.length + 1}`,
      },
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
  }, [nodes.length, setNodes]);

  const addNodeFromTemplate = useCallback(
    (templateStep: any) => {
      const newNodeId = `node-${Date.now()}`;
      const newNode: Node = {
        id: newNodeId,
        type: "customStorage",
        position: {
          x: Math.random() * 400 + 100,
          y: Math.random() * 300 + 100,
        },
        data: {
          ...templateStep,
          label: templateStep.name,
        },
      };

      setNodes((prevNodes) => [...prevNodes, newNode]);
    },
    [setNodes]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge: Edge = {
        ...params,
        id: `edge-${Date.now()}`,
        type: "default",
        style: { stroke: "#3b82f6", strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "#3b82f6",
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  return (
    <div className="flex">
      <Card className={className}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Workflow className="h-5 w-5" />
              Mission template
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button type="primary" onClick={addNewNode}>
                Create New Node
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div
              className="border rounded-lg bg-gray-50"
              style={{ height: "70vh" }}
            >
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={(val) => {
                  console.log("Edges_changed:", val);
                  onEdgesChange(val);
                }}
                onNodeDoubleClick={onNodeClick}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                attributionPosition="bottom-left"
                multiSelectionKeyCode="shift"
                selectNodesOnDrag={false}
              >
                <Controls />
                <MiniMap />
                <Background gap={16} size={1} />
                <Panel position="top-right">
                  <div className="bg-white border p-3 rounded-md shadow-sm text-sm">
                    <h4 className="font-medium mb-2">Mission Template</h4>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>
                        • Click "Create Start Node" to add a start node (no
                        input, 1 output)
                      </p>
                      <p>• Click "Create New Node" to add regular nodes</p>
                      <p>
                        • Regular nodes have 1 input (top) and 3 outputs
                        (bottom)
                      </p>
                      <p>• Double-click to edit node names</p>
                      <p>• Delete key to remove selected items</p>
                      <p>• Drag to rearrange nodes</p>
                      <p>
                        • Drag from connection points to create relationships
                      </p>
                    </div>
                  </div>
                </Panel>
              </ReactFlow>
            </div>
          </div>
        </CardContent>
      </Card>
      <MissionTemplatesCard onTemplateStepClick={addNodeFromTemplate} />
      <NodeForm
        isOpen={selectedNode !== null}
        onClose={() => setSelectedNode(null)}
        data={selectedNode}
      />
    </div>
  );
};

export default StorageHierarchyCard;
