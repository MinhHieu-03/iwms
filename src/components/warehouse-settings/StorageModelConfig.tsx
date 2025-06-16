import React, { useState, useCallback, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Download, Upload, Workflow } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  MarkerType,
  Panel,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  storageHierarchy,
  storageFlows,
  masterData,
  storageHierarchyNodes,
  storageHierarchyEdges,
  type StorageHierarchy,
  type StorageFlow,
  type MasterDataItem,
} from "@/data/warehouseData";
import apiClient from "@/lib/axios";
import { Select } from "antd";

const StorageModelConfig = () => {
  const { toast } = useToast();

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

  const initData = async () => {
    const { data } = await apiClient.get("/storage-model");
    const dataFull = data?.metaData?.[0] || {};
    setNodes(dataFull.nodes || storageHierarchyNodes);
    setEdges(dataFull.edges || storageHierarchyEdges);
  };

  useEffect(() => {
    initData();
    // Initialize nodes and edges from storageHierarchyNodes and storageHierarchyEdges
  }, []);

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
        title: "Edge Added",
        description: `Connected ${connection.source} → ${connection.target}`,
      });
    },
    [setEdges, toast]
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
      data: { label: "New Node" },
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
    toast({ title: "New node added successfully" });
  }, [setNodes, toast]);

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
    toast({ title: `${selectedNodes.length} node(s) deleted successfully` });
  }, [selectedNodes, setNodes, setEdges, toast]);

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
    toast({ title: "Node name updated successfully" });
  }, [editingNode, editingNodeName, setNodes, toast]);

  // Cancel node edit
  const cancelNodeEdit = useCallback(() => {
    setEditingNode(null);
    setEditingNodeName("");
  }, []);

  // Add edge between selected nodes
  const addEdgeBetweenSelected = useCallback(() => {
    if (selectedNodes.length !== 2) {
      toast({
        title: "Select exactly 2 nodes",
        description:
          "You need to select exactly 2 nodes to create an edge between them",
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
      title: "Edge created",
      description: `Connected ${sourceId} → ${targetId}`,
    });
  }, [selectedNodes, setEdges, toast]);

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
        title: "Edge Selected",
        description: `${edge.source} → ${edge.target}`,
      });
    },
    [toast]
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

  const [selectedTags, setSelectedTags] = useState<string[]>([
    "Plastic Bin",
    "Carton",
  ]);

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const submit = async () => {
    try {
      await apiClient.post("/storage-model", {
        nodes: nodes,
        edges: edges,
      });
      console.log(edgesToTree(edges));
      toast({
        title: "Data saved successfully",
        description: "Your changes have been saved.",
      });
    } catch (error) {
      console.error("Error during submission:", error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your data.",
        variant: "destructive",
      });
    }
  };

  return (
    <Tabs defaultValue="storage-hierarchy" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="storage-hierarchy">Storage Hierarchy</TabsTrigger>
        <TabsTrigger value="storage-flow">Storage Flow</TabsTrigger>
        <TabsTrigger value="master-data">Master Data</TabsTrigger>
      </TabsList>

      <TabsContent value="storage-hierarchy" className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Workflow className="h-5 w-5" />
                Storage Hierarchy Visualization
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button onClick={addNewNode} size="sm" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Node
                </Button>
                {selectedNodes.length === 2 && (
                  <Button
                    onClick={addEdgeBetweenSelected}
                    size="sm"
                    variant="outline"
                  >
                    Connect Selected
                  </Button>
                )}
                {selectedNodes.length > 0 && (
                  <Button
                    onClick={deleteSelectedNodes}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete ({selectedNodes.length})
                  </Button>
                )}
                <Button onClick={submit} size="sm">
                  Save
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
                      <h4 className="font-medium mb-2">Storage Hierarchy</h4>
                      <div className="text-xs text-gray-600 space-y-1">
                        <p>• Double-click to edit node names</p>
                        <p>• Delete key to remove selected items</p>
                        <p>• Drag to rearrange nodes</p>
                        <p>• Drag from node edge to create connections</p>
                        <p>• Select 2 nodes + click "Connect" button</p>
                      </div>
                      {selectedNodes.length > 0 && (
                        <div className="mt-2 pt-2 border-t">
                          <p className="text-xs text-blue-600 font-medium">
                            {selectedNodes.length} node(s) selected:
                          </p>
                          <p className="text-xs text-gray-500">
                            {selectedNodes.join(", ")}
                          </p>
                          {selectedNodes.length === 2 && (
                            <p className="text-xs text-green-600 mt-1">
                              Ready to connect: {selectedNodes[0]} →{" "}
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
                  <span className="text-sm font-medium">Edit node name:</span>
                  <Input
                    value={editingNodeName}
                    onChange={(e) => setEditingNodeName(e.target.value)}
                    className="flex-1"
                    autoFocus
                  />
                  <Button onClick={saveNodeEdit} size="sm">
                    Save
                  </Button>
                  <Button onClick={cancelNodeEdit} variant="outline" size="sm">
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Workflow className="h-5 w-5" />
                Store Unit: 
              </CardTitle>
              <div className="flex-1 gap-2 pl-5">
                <Select
                  mode="multiple"
                  placeholder="Select Tags"
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

      <TabsContent value="storage-flow" className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Storage Flow Management</CardTitle>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New Flow
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                {selectedTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-3 py-1">
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-sm hover:text-red-500"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Flow Name</TableHead>
                    <TableHead>Source Level</TableHead>
                    <TableHead>Target Level</TableHead>
                    <TableHead>Max Capacity</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flowsData.map((flow) => (
                    <TableRow key={flow.id}>
                      <TableCell className="font-medium">{flow.name}</TableCell>
                      <TableCell>{flow.sourceLevel}</TableCell>
                      <TableCell>{flow.targetLevel}</TableCell>
                      <TableCell>{flow.rules.maxCapacity}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            flow.rules.priority === "high"
                              ? "destructive"
                              : flow.rules.priority === "medium"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {flow.rules.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            flow.status === "active" ? "default" : "secondary"
                          }
                        >
                          {flow.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Button className="w-24 mt-4">Save</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="master-data" className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Master Data Management</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New
                </Button>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Import Excel
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>STT</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Storage Model</TableHead>
                  <TableHead>Carton Qty</TableHead>
                  <TableHead>Box Qty</TableHead>
                  <TableHead>Kit Qty</TableHead>
                  <TableHead>Action Required</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {masterDataItems.slice(0, 10).map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{item.sku}</TableCell>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.storageModel}</TableCell>
                    <TableCell>{item.cartonQuantity}</TableCell>
                    <TableCell>{item.boxQuantity}</TableCell>
                    <TableCell>{item.kitQuantity}</TableCell>
                    <TableCell>{item.action}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
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
