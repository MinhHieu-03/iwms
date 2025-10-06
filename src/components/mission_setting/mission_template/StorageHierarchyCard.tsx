import {
  createMissionTemplate,
  patchMissionTemplate,
} from "@/api/missionSettingApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/contexts/useI18n";
import { useToast } from "@/hooks/use-toast";
import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MarkerType,
  MiniMap,
  Node,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Button, Input } from "antd";
import { ArrowDown, ChevronDown, Workflow } from "lucide-react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { initEdges, initNodes } from "./const";
import CustomStartNode, { CustomEndNode } from "./CustomStartNode";
import CustomStorageNode from "./CustomStorageNode";
import MissionTemplatesCard from "./MissionTemplatesCard";
import { NodeForm } from "./NodeForm";

interface StorageHierarchyCardProps {
  className?: string;
  missionData?: any;
  mode?: string;
  onClose?: () => void;
}

const StorageHierarchyCard: React.FC<StorageHierarchyCardProps> = ({
  className = "flex-1 mr-4",
  missionData = {},
  mode = "update",
  onClose = () => {},
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [startNode, setStartNode] = useState<string | number>(-1);
  const [templateName, setTemplateName] = useState("");
  const [showInstruction, setShowInstruction] = useState(true);
  const reactFlowInstanceRef = useRef<any>(null);

  const { toast } = useToast();
  const { t } = useI18n();

  useEffect(() => {
    setTemplateName(missionData?.name || "");
    setStartNode(missionData?.start ?? -1);

    setEdges(initEdges(missionData));
    setNodes(initNodes(missionData));
  }, [missionData]);

  useEffect(() => {
    if (!reactFlowInstanceRef.current) return;
    const id = setTimeout(() => {
      try {
        reactFlowInstanceRef.current.fitView({ padding: 0.2, duration: 300 });
      } catch (e) {}
    }, 0);
    return () => clearTimeout(id);
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
      const newNodeIndex = nodes.length - 1;
      const newNode: Node = {
        id: `${Date.now()}`,
        type: "customStorage",
        position: {
          x: Math.random() * 400 + 100,
          y: Math.random() * 300 + 100,
        },
        data: {
          ...templateStep,
          index: nodes.length - 1,
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
      if (params.source === "start") {
        if (startNode !== -1) {
          return;
        }
        // Store the target node id directly instead of index
        setStartNode(params.target);
      }
      if (
        edges.find(
          (e) =>
            e.source === params.source && e.sourceHandle === params.sourceHandle
        )
      ) {
        return;
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

      const deletedNodeIds = deletedNodes.map((dn) => dn.id);
      setNodes((prev) => {
        const newNodes = prev
          .filter((n) => !deletedNodeIds.includes(n.id))
          .map((n, index) => {
            const data = n.data ?? {};
            const flow = data.flow ?? { ok: -1, timeout: -1, fail: -1 };

            const newFlow = {
              ok:
                flow.ok !== -1 && deletedNodeIds.includes(flow.ok.toString())
                  ? -1
                  : flow.ok,
              timeout:
                flow.timeout !== -1 &&
                deletedNodeIds.includes(flow.timeout.toString())
                  ? -1
                  : flow.timeout,
              fail:
                flow.fail !== -1 &&
                deletedNodeIds.includes(flow.fail.toString())
                  ? -1
                  : flow.fail,
            };

            return {
              ...n,
              data: {
                ...data,
                index: index - 1,
                flow: newFlow,
              },
            };
          });
        return newNodes;
      });
    },
    [nodes, startNode]
  );

  const checkUnconnectedNode = () => {
    let sourceIsTarget = false;
    const targetedList = edges.map((e) => {
      if (e.target === e.source) {
        sourceIsTarget = true;
      }
      return e.target;
    });
    const unconnectedNode = nodes.filter(
      (n) => !targetedList.includes(n.id) && n.id !== "start"
    );
    return { unconnectedNode, sourceIsTarget };
  };

  const handleDeleteEdge = useCallback(
    (deletedEdges: Edge[]) => {
      if (!deletedEdges?.length) return;

      if (deletedEdges.some((e) => e.source === "start")) {
        setStartNode(-1);
      }

      setNodes((prev) => {
        return prev.map((node) => {
          const data = node.data ?? {};
          const flow = data.flow ?? { ok: -1, timeout: -1, fail: -1 };

          const affectedEdges = deletedEdges.filter(
            (e) => e.source === node.id
          );

          const newFlow = { ...flow };

          for (const e of affectedEdges) {
            switch (e.sourceHandle) {
              case "output-1":
                newFlow.ok = -1;
                break;
              case "output-2":
                newFlow.timeout = -1;
                break;
              case "output-3":
                newFlow.fail = -1;
                break;
            }
          }

          return {
            ...node,
            data: {
              ...data,
              flow: newFlow,
            },
          };
        });
      });
    },
    [nodes, startNode]
  );

  const onNodeClick = (event: React.MouseEvent, node: any) => {
    if (node.id !== "start") {
      const data = node.data ?? {};
      const flow = data.flow ?? { ok: -1, timeout: -1, fail: -1 };
      setSelectedNode({
        ...node,
        data: {
          ...data,
          flow: {
            ok:
              flow.ok !== -1
                ? nodes.findIndex((n) => n.id === flow.ok.toString()) - 1
                : -1,
            timeout:
              flow.timeout !== -1
                ? nodes.findIndex((n) => n.id === flow.timeout.toString()) - 1
                : -1,
            fail:
              flow.fail !== -1
                ? nodes.findIndex((n) => n.id === flow.fail.toString()) - 1
                : -1,
          },
        },
      });
    }
  };

  console.log("nodes", nodes);
  console.log("edges", edges);

  const checkConnectivity = (start: string) => {
    if (!nodes.find((n) => n.id === start)) {
      return false;
    }

    const visited = new Set();
    const queue = [start];

    while (queue.length > 0) {
      const node = queue.shift();

      if (visited.has(node)) continue;
      visited.add(node);

      for (const edge of edges.filter((e) => e.source === node)) {
        if (!visited.has(edge.target)) queue.push(edge.target);
      }
    }

    return visited.size === nodes.length;
  };

  const handleSaveChanges = async () => {
    if (
      checkUnconnectedNode().unconnectedNode.length > 0 ||
      checkUnconnectedNode().sourceIsTarget
    ) {
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
    } else if (!checkConnectivity("start")) {
      toast({
        title: t("common.error"),
        variant: "destructive",
        description: t("mission_template.all_nodes_must_have_start_node"),
      });
      return;
    } else {
      try {
        const taskList = nodes
          .filter((n) => n.id !== "start")
          .map((n) => {
            const { label, index, ...data } = n.data;
            const flow = data.flow ?? { ok: -1, timeout: -1, fail: -1 };
            const formattedData = {
              ...data,
              flow: {
                ok:
                  flow.ok !== -1
                    ? nodes.findIndex((n) => n.id === flow.ok.toString()) - 1
                    : -1,
                timeout:
                  flow.timeout !== -1
                    ? nodes.findIndex((n) => n.id === flow.timeout.toString()) -
                      1
                    : -1,
                fail:
                  flow.fail !== -1
                    ? nodes.findIndex((n) => n.id === flow.fail.toString()) - 1
                    : -1,
              },
            };
            return formattedData;
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
          start: nodes.findIndex((n) => n.id === startNode.toString()) - 1,
          tasks: taskList,
          ui_data: nodeLocations,
        };

        // console.log("missionTemplate", missionTemplate);

        let response;
        if (mode === "create") {
          response = await createMissionTemplate(missionTemplate);
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
          onClose();
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
                onInit={(instance) => {
                  reactFlowInstanceRef.current = instance;
                  try {
                    instance.fitView({ padding: 0.2, duration: 300 });
                  } catch (e) {}
                }}
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
                  <div className="h-10">
                    <Button
                      className="absolute top-0 right-0"
                      onClick={() => setShowInstruction(!showInstruction)}
                    >
                      <ChevronDown
                        className={`h-4 w-4 ${
                          showInstruction ? "rotate-180" : ""
                        }`}
                      />
                    </Button>
                  </div>

                  <div
                    className={`bg-white border p-3 rounded-md shadow-sm text-sm ${
                      showInstruction ? "block" : "hidden"
                    }`}
                  >
                    <h4 className="font-medium mb-2">Instruction</h4>
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
