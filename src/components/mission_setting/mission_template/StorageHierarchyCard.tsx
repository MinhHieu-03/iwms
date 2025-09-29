import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import "@xyflow/react/dist/style.css";
import { Workflow } from "lucide-react";
import {
  storageHierarchyNodes,
  storageHierarchyEdges,
} from "@/data/warehouseData";
import { Button, Input } from "antd";
import CustomStorageNode from "./CustomStorageNode";
import CustomStartNode, { CustomEndNode } from "./CustomStartNode";
import MissionTemplatesCard from "./MissionTemplatesCard";
import { NodeForm } from "./NodeForm";
import { useToast } from "@/hooks/use-toast";
import { patchMissionTemplate } from "@/api/missionSettingApi";
import { initEdges, initNodes } from "./const";
import { useI18n } from "@/contexts/useI18n";

interface StorageHierarchyCardProps {
  className?: string;
  missionData?: any;
  mode?: string;
  onSubmit?: (data: any) => Promise<any>;
}

const StorageHierarchyCard: React.FC<StorageHierarchyCardProps> = ({
  className = "flex-1 mr-4",
  missionData = {},
  mode = "update",
  onSubmit = () => Promise.resolve(),
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [startNode, setStartNode] = useState<string | number>(-1);
  const [templateName, setTemplateName] = useState("");

  const { toast } = useToast();
  const { t } = useI18n();

  useEffect(() => {
    setTemplateName(missionData?.name || "");
    setStartNode(missionData?.start || -1);
  }, [missionData]);

  useEffect(() => {
    setEdges(initEdges(missionData));
    setNodes(initNodes(missionData));
  }, [missionData]);

  const nodeTypes = useMemo(
    () => ({
      customStorage: CustomStorageNode,
      customStart: CustomStartNode,
      customEnd: CustomEndNode,
    }),
    []
  );

  const addNodeFromTemplate = useCallback(
    (templateStep: any) => {
      const newNodeIndex = nodes.length;
      const newNodeId = `${newNodeIndex}`;
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
          flow: { ok: -1, timeout: -1, fail: -1 },
          notify: {
            begin: { enable: false, url: "", userdata: "" },
            end: { enable: false, url: "", userdata: "" },
          },
          param: Object.entries(templateStep.param).map(([key, value]) => ({
            name: key,
            type: value,
            value: "",
            assigned: false,
          })),
          timeout: 0,
          need_trigger: false,
        },
      };

      setNodes((prevNodes) => [...prevNodes, newNode]);
    },
    [nodes]
  );

  const setNodeFlow = useCallback(
    (param: any) => {
      setNodes((prevNodes) => {
        const sourceNode = prevNodes.find((node) => node.id === param.source);
        if (!sourceNode) return prevNodes;

        const sourceNodeData = {
          ...sourceNode.data,
          flow:
            sourceNode.data.flow && typeof sourceNode.data.flow === "object"
              ? { ...sourceNode.data.flow }
              : { ok: -1, timeout: -1, fail: -1 },
        };

        switch (param.sourceHandle) {
          case "output-1":
            sourceNodeData.flow.ok = param.target;
            break;
          case "output-2":
            sourceNodeData.flow.timeout = param.target;
            break;
          case "output-3":
            sourceNodeData.flow.fail = param.target;
            break;
          default:
            return prevNodes;
        }

        return prevNodes.map((node) =>
          node.id === param.source ? { ...node, data: sourceNodeData } : node
        );
      });
    },
    [nodes]
  );

  const handleUpdateNode = useCallback(
    (data: any, id: string) => {
      setNodes((prevNodes) => {
        return prevNodes.map((node) =>
          node.id === id ? { ...node, data: data } : node
        );
      });
    },
    [nodes]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      if (params.source === "0") {
        if (startNode !== -1) {
          return;
        }
        // Store the target node id directly instead of index
        setStartNode(params.target);
      }
      setNodeFlow(params);
      const newEdge: Edge = {
        ...params,
        id: `edge-${Date.now()}`,
        type: "default",
        style: { stroke: "#3b82f6", strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#3b82f6" },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [edges, startNode, setNodeFlow]
  );

  const handleDeleteNode = useCallback(
    (deletedNodes: Node[]) => {
      if (!deletedNodes?.length) return;

      if (deletedNodes.some((n) => n.id === startNode.toString())) {
        setStartNode(-1);
      }

      setNodes((prevNodes) => {
        // 1) Xác định các id bị xóa và filter ra danh sách node còn lại
        const deletedIdSet = new Set(deletedNodes.map((dn) => dn.id));
        const kept = prevNodes.filter((n) => !deletedIdSet.has(n.id));

        // 2) Cập nhật flow connections - set to -1 if target is deleted
        return kept.map((node) => {
          const data: any = node.data ?? {};
          const flow = data.flow ?? { ok: -1, timeout: -1, fail: -1 };

          return {
            ...node,
            data: {
              ...data,
              flow: {
                ok: deletedIdSet.has(flow.ok) ? -1 : flow.ok,
                timeout: deletedIdSet.has(flow.timeout) ? -1 : flow.timeout,
                fail: deletedIdSet.has(flow.fail) ? -1 : flow.fail,
              },
            },
          };
        });
      });
    },
    [nodes, startNode]
  );

  const checkUnconnectedNode = () => {
    const targetedList = edges.map((e) => e.target);
    const unconnectedNode = nodes.filter(
      (n) => !targetedList.includes(n.id) && n.id !== "0"
    );

    return unconnectedNode;
  };

  const handleDeleteEdge = useCallback(
    (deletedEdges: Edge[]) => {
      if (!deletedEdges?.length) return;

      if (deletedEdges.some((e) => e.source === "0")) {
        setStartNode(-1);
      }
      setNodes((prevNodes) => {
        const sourceToTargets = new Map<string, Set<string>>();

        for (const e of deletedEdges) {
          const targets = sourceToTargets.get(e.source) ?? new Set();
          targets.add(e.target);
          sourceToTargets.set(e.source, targets);
        }
        if (sourceToTargets.size === 0) return prevNodes;

        return prevNodes.map((node: any) => {
          const targets = sourceToTargets.get(node.id);
          if (!targets) return node;
          const flow = node.data?.flow ?? { ok: -1, timeout: -1, fail: -1 };
          const nextFlow = {
            ok: targets.has(flow.ok) ? -1 : flow.ok,
            timeout: targets.has(flow.timeout) ? -1 : flow.timeout,
            fail: targets.has(flow.fail) ? -1 : flow.fail,
          };
          if (
            nextFlow.ok === flow.ok &&
            nextFlow.timeout === flow.timeout &&
            nextFlow.fail === flow.fail
          ) {
            return node;
          }
          return { ...node, data: { ...node.data, flow: nextFlow } };
        });
      });
    },
    [nodes, startNode]
  );

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    if (node.id !== "0") setSelectedNode(node);
  };

  const handleSaveChanges = async () => {
    if (checkUnconnectedNode().length > 0) {
      toast({
        title: t("common.error"),
        variant: "destructive",
        description: t("mission_template.node_not_connected"),
      });
      return;
    } else if (templateName.trim() === "") {
      toast({
        title: t("common.error"),
        variant: "destructive",
        description: t("mission_template.enter_template_name"),
      });
      return;
    } else if (startNode === -1) {
      toast({
        title: t("common.error"),
        variant: "destructive",
        description: t("mission_template.connect_start_node"),
      });
      return;
    } else {
      try {
        const taskList = nodes
          .filter((n) => n.id !== "0")
          .map((n) => {
            const { label, ...data } = n.data;
            return data;
          });

        const nodeLocations = nodes.map(
          ({ position, type }: { position: any; type: string }) => {
            return {
              x: position.x,
              y: position.y,
              type: type,
            };
          }
        );

        const missionTemplate = {
          name: templateName.trim(),
          start: startNode,
          tasks: taskList,
          ui_data: nodeLocations,
        };

        let response;
        if (mode === "create") {
          response = await missionData.onSubmit(missionTemplate);
        } else {
          response = await patchMissionTemplate(
            missionTemplate,
            missionData._id
          );
        }

        if (response.data.success) {
          toast({
            title: t("common.success"),
            description: t("mission_template.updated_successfully"),
          });
        } else {
          toast({
            title: t("common.error"),
            variant: "destructive",
            description: response.data.desc,
          });
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <div className="flex">
      <Card className={className}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Workflow className="h-5 w-5" />
              <Input
                // placeholder="Mission Template Name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
              />
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button type="primary" onClick={handleSaveChanges}>
                Save changes
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
                  onEdgesChange(val);
                }}
                onNodeDoubleClick={onNodeClick}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                attributionPosition="bottom-left"
                multiSelectionKeyCode="shift"
                selectNodesOnDrag={false}
                onNodesDelete={handleDeleteNode}
                onEdgesDelete={handleDeleteEdge}
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
                      <p>• Double-click to edit node</p>
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
        onSubmit={handleUpdateNode}
        data={selectedNode?.data}
        id={selectedNode?.id}
      />
    </div>
  );
};

export default StorageHierarchyCard;
