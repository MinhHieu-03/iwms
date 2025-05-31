
import React, { useState, useCallback, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  Edge
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
  type MasterDataItem
} from "@/data/warehouseData";

const StorageModelConfig = () => {
  const { toast } = useToast();
  
  const [hierarchyData, setHierarchyData] = useState<StorageHierarchy[]>(storageHierarchy);
  const [flowsData, setFlowsData] = useState<StorageFlow[]>(storageFlows);
  const [masterDataItems, setMasterDataItems] = useState<MasterDataItem[]>(masterData);

  // ReactFlow state using data from warehouse file
  const [nodes, setNodes, onNodesChange] = useNodesState(storageHierarchyNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(storageHierarchyEdges);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [editingNode, setEditingNode] = useState<string | null>(null);
  const [editingNodeName, setEditingNodeName] = useState<string>("");

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  // Handle node selection
  const onSelectionChange = useCallback((params: any) => {
    setSelectedNodes(params.nodes.map((node: Node) => node.id));
  }, []);

  // Handle double click to edit node name
  const onNodeDoubleClick = useCallback((event: React.MouseEvent, node: Node) => {
    setEditingNode(node.id);
    setEditingNodeName((node.data as { label: string }).label);
  }, []);

  // Add new node
  const addNewNode = useCallback(() => {
    const newNodeId = `node-${Date.now()}`;
    const newNode: Node = {
      id: newNodeId,
      type: 'default',
      data: { label: 'New Node' },
      position: { x: 300, y: 300 },
      style: { 
        background: '#f0f0f0', 
        border: '2px solid #666',
        borderRadius: '12px',
        padding: '10px',
        minWidth: '100px'
      }
    };
    
    setNodes((nds) => [...nds, newNode]);
    toast({ title: "New node added successfully" });
  }, [setNodes, toast]);

  // Delete selected nodes
  const deleteSelectedNodes = useCallback(() => {
    if (selectedNodes.length === 0) return;
    
    setNodes((nds) => nds.filter((node) => !selectedNodes.includes(node.id)));
    setEdges((eds) => eds.filter((edge) => 
      !selectedNodes.includes(edge.source) && !selectedNodes.includes(edge.target)
    ));
    setSelectedNodes([]);
    toast({ title: `${selectedNodes.length} node(s) deleted successfully` });
  }, [selectedNodes, setNodes, setEdges, toast]);

  // Save node name edit
  const saveNodeEdit = useCallback(() => {
    if (!editingNode) return;
    
    setNodes((nds) => nds.map((node) => 
      node.id === editingNode 
        ? { ...node, data: { ...node.data, label: editingNodeName } }
        : node
    ));
    setEditingNode(null);
    setEditingNodeName("");
    toast({ title: "Node name updated successfully" });
  }, [editingNode, editingNodeName, setNodes, toast]);

  // Cancel node edit
  const cancelNodeEdit = useCallback(() => {
    setEditingNode(null);
    setEditingNodeName("");
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Delete' && selectedNodes.length > 0) {
        deleteSelectedNodes();
      }
      if (event.key === 'Escape' && editingNode) {
        cancelNodeEdit();
      }
      if (event.key === 'Enter' && editingNode) {
        saveNodeEdit();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedNodes, editingNode, deleteSelectedNodes, cancelNodeEdit, saveNodeEdit]);

  const [selectedTags, setSelectedTags] = useState<string[]>(["Plastic Bin", "Carton"]);

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
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
                <Button onClick={addNewNode} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Node
                </Button>
                {selectedNodes.length > 0 && (
                  <Button onClick={deleteSelectedNodes} variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete ({selectedNodes.length})
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg bg-gray-50" style={{ height: '500px' }}>
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  onSelectionChange={onSelectionChange}
                  onNodeDoubleClick={onNodeDoubleClick}
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
                      <p className="text-xs text-gray-600 mb-2">
                        Double-click to edit • Delete key to remove • Drag to rearrange
                      </p>
                      {selectedNodes.length > 0 && (
                        <p className="text-xs text-blue-600">
                          {selectedNodes.length} node(s) selected
                        </p>
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
                  <Button onClick={saveNodeEdit} size="sm">Save</Button>
                  <Button onClick={cancelNodeEdit} variant="outline" size="sm">Cancel</Button>
                </div>
              )}
            </div>
          </CardContent>
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
                        <Badge variant={flow.rules.priority === 'high' ? 'destructive' : 
                                      flow.rules.priority === 'medium' ? 'default' : 'secondary'}>
                          {flow.rules.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={flow.status === 'active' ? 'default' : 'secondary'}>
                          {flow.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500">
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
                        <Button variant="outline" size="sm" className="text-red-500">
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
