
import React, { useState, useCallback } from "react";
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
  Panel
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { 
  storageHierarchy, 
  storageFlows, 
  masterData,
  type StorageHierarchy,
  type StorageFlow,
  type MasterDataItem
} from "@/data/warehouseData";

const StorageModelConfig = () => {
  const { toast } = useToast();
  
  const [hierarchyData, setHierarchyData] = useState<StorageHierarchy[]>(storageHierarchy);
  const [flowsData, setFlowsData] = useState<StorageFlow[]>(storageFlows);
  const [masterDataItems, setMasterDataItems] = useState<MasterDataItem[]>(masterData);

  // ReactFlow state for hierarchy visualization
  const initialNodes = [
    {
      id: 'plastic-bin',
      type: 'default',
      data: { label: 'Plastic Bin' },
      position: { x: 400, y: 50 },
      style: { 
        background: '#e3f2fd', 
        border: '2px solid #1976d2',
        borderRadius: '12px',
        padding: '10px',
        minWidth: '120px'
      }
    },
    {
      id: 'carton-1',
      type: 'default', 
      data: { label: 'Carton' },
      position: { x: 200, y: 200 },
      style: { 
        background: '#f3e5f5', 
        border: '2px solid #7b1fa2',
        borderRadius: '12px',
        padding: '10px',
        minWidth: '100px'
      }
    },
    {
      id: 'box-1',
      type: 'default',
      data: { label: 'Box' },
      position: { x: 400, y: 200 },
      style: { 
        background: '#e8f5e8', 
        border: '2px solid #388e3c',
        borderRadius: '12px',
        padding: '10px',
        minWidth: '100px'
      }
    },
    {
      id: 'kit-1',
      type: 'default',
      data: { label: 'Kit' },
      position: { x: 600, y: 200 },
      style: { 
        background: '#fff3e0', 
        border: '2px solid #f57c00',
        borderRadius: '12px',
        padding: '10px',
        minWidth: '100px'
      }
    },
    {
      id: 'box-2',
      type: 'default',
      data: { label: 'Box' },
      position: { x: 150, y: 350 },
      style: { 
        background: '#e8f5e8', 
        border: '2px solid #388e3c',
        borderRadius: '12px',
        padding: '10px',
        minWidth: '100px'
      }
    },
    {
      id: 'kit-2',
      type: 'default',
      data: { label: 'Kit' },
      position: { x: 250, y: 350 },
      style: { 
        background: '#fff3e0', 
        border: '2px solid #f57c00',
        borderRadius: '12px',
        padding: '10px',
        minWidth: '100px'
      }
    },
    {
      id: 'kit-3',
      type: 'default',
      data: { label: 'Kit' },
      position: { x: 400, y: 350 },
      style: { 
        background: '#fff3e0', 
        border: '2px solid #f57c00',
        borderRadius: '12px',
        padding: '10px',
        minWidth: '100px'
      }
    }
  ];

  const initialEdges = [
    {
      id: 'e-plastic-carton',
      source: 'plastic-bin',
      target: 'carton-1',
      animated: true,
      style: { stroke: '#1976d2', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#1976d2' }
    },
    {
      id: 'e-plastic-box',
      source: 'plastic-bin',
      target: 'box-1',
      animated: true,
      style: { stroke: '#1976d2', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#1976d2' }
    },
    {
      id: 'e-plastic-kit',
      source: 'plastic-bin',
      target: 'kit-1',
      animated: true,
      style: { stroke: '#1976d2', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#1976d2' }
    },
    {
      id: 'e-carton-box',
      source: 'carton-1',
      target: 'box-2',
      animated: true,
      style: { stroke: '#7b1fa2', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#7b1fa2' }
    },
    {
      id: 'e-carton-kit',
      source: 'carton-1',
      target: 'kit-2',
      animated: true,
      style: { stroke: '#7b1fa2', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#7b1fa2' }
    },
    {
      id: 'e-box-kit',
      source: 'box-1',
      target: 'kit-3',
      animated: true,
      style: { stroke: '#388e3c', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#388e3c' }
    }
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

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
                <Button variant="outline">Reload</Button>
                <Button>Save</Button>
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
                  fitView
                  attributionPosition="bottom-left"
                >
                  <Controls />
                  <MiniMap />
                  <Background gap={16} size={1} />
                  <Panel position="top-right">
                    <div className="bg-white border p-3 rounded-md shadow-sm text-sm">
                      <h4 className="font-medium mb-2">Storage Hierarchy</h4>
                      <p className="text-xs text-gray-600">
                        Drag to rearrange • Click edges to edit connections
                      </p>
                    </div>
                  </Panel>
                </ReactFlow>
              </div>
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
