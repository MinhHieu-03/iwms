import MasterTable from "@/components/master_data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useI18n } from "@/contexts/useI18n";
import {
  masterData,
  storageFlows,
  storageHierarchy,
  storageHierarchyEdges,
  storageHierarchyNodes,
  type MasterDataItem,
  type StorageFlow,
  type StorageHierarchy,
} from "@/data/warehouseData";
import apiClient from "@/lib/axios";
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
import { Select } from "antd";
import { Plus, Trash2, Workflow } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

const StorageModelConfig = () => {
  const { toast } = useToast();
  const { t } = useI18n();

  const [hierarchyData, setHierarchyData] =
    useState<StorageHierarchy[]>(storageHierarchy);
  const [flowsData, setFlowsData] = useState<StorageFlow[]>(storageFlows);
  const [masterDataItems, setMasterDataItems] =
    useState<MasterDataItem[]>(masterData);

  // ReactFlow state using data from warehouse file
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [editingNode, setEditingNode] = useState<string | null>(null);
  const [editingNodeName, setEditingNodeName] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const initData = useCallback(async () => {
    const { data } = await apiClient.get("/storage-model");
    const dataFull = data?.metaData?.[0] || {};
    setNodes(dataFull.nodes || storageHierarchyNodes);
    setEdges(dataFull.edges || storageHierarchyEdges);
    setSelectedTags(dataFull.storage_unit);
  }, [setNodes, setEdges]);

  useEffect(() => {
    initData();
    // Initialize nodes and edges from storageHierarchyNodes and storageHierarchyEdges
  }, [initData]);

  const onConnect = useCallback(
    (connection: Connection) => {
      // Here you can see the start and end when user draws connection
      console.log("New connection being created:");
      console.log("Start (source):", connection.source);
      console.log("End (target):", connection.target);
      console.log("Source Handle:", connection.sourceHandle);
      console.log("Target Handle:", connection.targetHandle);

      // Add markerEnd to the connection
      const connectionWithMarker = {
        ...connection,
        markerEnd: { type: MarkerType.ArrowClosed, color: "#1976d2" },
        animated: true,
        style: { stroke: "#1976d2", strokeWidth: 2 },
      };

      setEdges((eds) => addEdge(connectionWithMarker, eds));
      toast({
        title: t("edge_added"),
        description: `${t("connected")} ${connection.source} → ${connection.target}`,
      });
    },
    [setEdges, toast, t]
  );

  // Handle node selection
  const onSelectionChange = useCallback(
    (params: { nodes: Node[]; edges: Edge[] }) => {
      setSelectedNodes(params.nodes.map((node: Node) => node.id));
    },
    []
  );

  // Handle double click to edit node name
  const onNodeDoubleClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      setEditingNode(node.id);
      setEditingNodeName((node.data as { label: string }).label);
    },
    []
  );

  // Add new node
  const addNewNode = useCallback(() => {
    const newNodeId = `node-${Date.now()}`;
    const newNode: Node = {
      id: newNodeId,
      type: "default",
      data: { label: t("new_node") },
      position: { x: 300, y: 300 },
      style: {
        background: "#f0f0f0",
        border: "2px solid #666",
        borderRadius: "12px",
        padding: "10px",
        minWidth: "100px",
      },
    };

    setNodes((nds) => [...nds, newNode]);
    toast({ title: t("new_node_added_successfully") });
  }, [setNodes, toast, t]);

  // Delete selected nodes
  const deleteSelectedNodes = useCallback(() => {
    if (selectedNodes.length === 0) return;

    setNodes((nds) => nds.filter((node) => !selectedNodes.includes(node.id)));
    setEdges((eds) =>
      eds.filter(
        (edge) =>
          !selectedNodes.includes(edge.source) &&
          !selectedNodes.includes(edge.target)
      )
    );
    setSelectedNodes([]);
    toast({ title: `${selectedNodes.length} ${t("nodes_deleted_successfully")}` });
  }, [selectedNodes, setNodes, setEdges, toast, t]);

  // Save node name edit
  const saveNodeEdit = useCallback(() => {
    if (!editingNode) return;

    setNodes((nds) =>
      nds.map((node) =>
        node.id === editingNode
          ? { ...node, data: { ...node.data, label: editingNodeName } }
          : node
      )
    );
    setEditingNode(null);
    setEditingNodeName("");
    toast({ title: t("node_name_updated_successfully") });
  }, [editingNode, editingNodeName, setNodes, toast, t]);

  // Cancel node edit
  const cancelNodeEdit = useCallback(() => {
    setEditingNode(null);
    setEditingNodeName("");
  }, []);

  // Add edge between selected nodes
  const addEdgeBetweenSelected = useCallback(() => {
    if (selectedNodes.length !== 2) {
      toast({
        title: t("select_exactly_2_nodes"),
        description: t("select_exactly_2_nodes_description"),
        variant: "destructive",
      });
      return;
    }

    const [sourceId, targetId] = selectedNodes;
    const newEdge = {
      id: `edge-${Date.now()}`,
      source: sourceId,
      target: targetId,
      animated: true,
      style: { stroke: "#666", strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: "#666" },
    };

    console.log("Creating edge manually:");
    console.log("Source (start):", sourceId);
    console.log("Target (end):", targetId);

    setEdges((eds) => [...eds, newEdge]);
    toast({
      title: t("edge_created"),
      description: `${t("connected")} ${sourceId} → ${targetId}`,
    });
  }, [selectedNodes, setEdges, toast, t]);

  // Get edge information for debugging
  const logEdgeInfo = useCallback(() => {
    console.log("Current edges:");
    edges.forEach((edge) => {
      console.log(`Edge ${edge.id}: ${edge.source} → ${edge.target}`);
    });

    console.log("Current nodes:");
    nodes.forEach((node) => {
      console.log(
        `Node ${node.id}: ${node.data.label} at (${node.position.x}, ${node.position.y})`
      );
    });
  }, [edges, nodes]);

  // Handle edge selection for debugging
  const onEdgeClick = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      console.log("Edge clicked:");
      console.log("Edge ID:", edge.id);
      console.log("Source (start):", edge.source);
      console.log("Target (end):", edge.target);
      console.log("Full edge object:", edge);

      toast({
        title: t("edge_selected"),
        description: `${edge.source} → ${edge.target}`,
      });
    },
    [toast, t]
  );

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Delete" && selectedNodes.length > 0) {
        deleteSelectedNodes();
      }
      if (event.key === "Escape" && editingNode) {
        cancelNodeEdit();
      }
      if (event.key === "Enter" && editingNode) {
        saveNodeEdit();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    selectedNodes,
    editingNode,
    deleteSelectedNodes,
    cancelNodeEdit,
    saveNodeEdit,
  ]);


  const submit = async () => {
    try {
      await apiClient.post("/storage-model", {
        nodes: nodes,
        edges: edges,
        storage_unit: selectedTags
      });
      console.log(edgesToTree(edges));
      toast({
        title: t("data_saved_successfully"),
        description: t("changes_saved_description"),
      });
    } catch (error) {
      console.error("Error during submission:", error);
      toast({
        title: t("submission_error"),
        description: t("submission_error_description"),
        variant: "destructive",
      });
    }
  };

  return (
    <Tabs defaultValue="storage-hierarchy" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger  className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white" value="storage-hierarchy">{t("storage_hierarchy")}</TabsTrigger>
        {/* <TabsTrigger  className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white" value="storage-flow">Storage Flow</TabsTrigger> */}
        <TabsTrigger  className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white" value="master-data">{t("storage_master_data")}</TabsTrigger>
      </TabsList>

      <TabsContent value="storage-hierarchy" className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Workflow className="h-5 w-5" />
                {t("storage_hierarchy_visualization")}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button onClick={addNewNode} size="sm" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  {t("add_node")}
                </Button>
                {selectedNodes.length === 2 && (
                  <Button
                    onClick={addEdgeBetweenSelected}
                    size="sm"
                    variant="outline"
                  >
                    {t("connect_selected")}
                  </Button>
                )}
                {selectedNodes.length > 0 && (
                  <Button
                    onClick={deleteSelectedNodes}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {t("btn_delete")} ({selectedNodes.length})
                  </Button>
                )}
                <Button onClick={submit} size="sm">
                  {t("btn_edit")}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div
                className="border rounded-lg bg-gray-50"
                style={{ height: "50vh" }}
              >
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={(val) => {
                    console.log("Edges_changed:", val);
                    onEdgesChange(val);
                  }}
                  onConnect={onConnect}
                  onSelectionChange={onSelectionChange}
                  onNodeDoubleClick={onNodeDoubleClick}
                  onEdgeClick={onEdgeClick}
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
                      <h4 className="font-medium mb-2">{t("storage_hierarchy")}</h4>
                      <div className="text-xs text-gray-600 space-y-1">
                        <p>{t("storage_hierarchy_instructions.double_click")}</p>
                        <p>{t("storage_hierarchy_instructions.delete_key")}</p>
                        <p>{t("storage_hierarchy_instructions.drag_rearrange")}</p>
                        <p>{t("storage_hierarchy_instructions.drag_connect")}</p>
                        <p>{t("storage_hierarchy_instructions.select_connect")}</p>
                      </div>
                      {selectedNodes.length > 0 && (
                        <div className="mt-2 pt-2 border-t">
                          <p className="text-xs text-blue-600 font-medium">
                            {selectedNodes.length} {t("nodes_selected")}:
                          </p>
                          <p className="text-xs text-gray-500">
                            {selectedNodes.join(", ")}
                          </p>
                          {selectedNodes.length === 2 && (
                            <p className="text-xs text-green-600 mt-1">
                              {t("ready_to_connect")}: {selectedNodes[0]} →{" "}
                              {selectedNodes[1]}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </Panel>
                </ReactFlow>
              </div>

              {editingNode && (
                <div className="flex items-center gap-2 p-3 border rounded-md bg-blue-50">
                  <span className="text-sm font-medium">{t("edit_node_name")}:</span>
                  <Input
                    value={editingNodeName}
                    onChange={(e) => setEditingNodeName(e.target.value)}
                    className="flex-1"
                    autoFocus
                  />
                  <Button onClick={saveNodeEdit} size="sm">
                    {t("btn_edit")}
                  </Button>
                  <Button onClick={cancelNodeEdit} variant="outline" size="sm">
                    {t("btn_cancel")}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Workflow className="h-5 w-5" />
                {t("store_unit")}: 
              </CardTitle>
              <div className="flex-1 gap-2 pl-5">
                <Select
                  mode="multiple"
                  placeholder={t("select_tags")}
                  value={selectedTags}
                  onChange={(value) => setSelectedTags(value as string[])}
                  // style={{ width: "200px" }}
                  options={Array.from(new Set(nodes.map((node) => node?.data?.label))).map((tag) => ({
                    value: tag,
                    label: tag,
                  }))}
                  className="w-full"
                />
              </div>
            </div>
          </CardHeader>
        </Card>
      </TabsContent>

      <TabsContent value="master-data" className="space-y-4">
        <MasterTable />
      </TabsContent>
    </Tabs>
  );
};

export default StorageModelConfig;

function edgesToTree(edges) {
  const childMap = {};
  const parentSet = new Set();
  const childSet = new Set();

  for (const edge of edges) {
    const { source, target } = edge;

    if (!childMap[source]) {
      childMap[source] = [];
    }
    childMap[source].push(target);

    parentSet.add(source);
    childSet.add(target);
  }

  const roots = [...parentSet].filter((node) => !childSet.has(node));

  function buildTree(nodeId) {
    return {
      id: nodeId,
      children: (childMap[nodeId] || []).map(buildTree),
    };
  }

  return roots.map(buildTree);
}
