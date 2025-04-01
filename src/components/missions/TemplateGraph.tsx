
import React, { useState, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeftIcon, 
  Save, 
  PlusCircle, 
  Trash2,
  ChevronDown,
  Download,
  Share2,
  Copy
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Panel,
  MarkerType,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// Define the type for graph data
interface GraphData {
  nodes: any[];
  edges: any[];
}

// Define the props type for the component
interface TemplateGraphProps {
  data?: GraphData;
}

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Start" },
    position: { x: 250, y: 5 },
    style: { background: "#d0f0c0", border: "1px solid #4caf50" },
  },
  {
    id: "2",
    data: { label: "Navigate to Zone A" },
    position: { x: 250, y: 100 },
  },
  {
    id: "3",
    data: { label: "Pick Item #12345" },
    position: { x: 250, y: 200 },
  },
  {
    id: "4",
    data: { label: "If: Item Found?" },
    position: { x: 250, y: 300 },
    style: { background: "#f8f9d2", border: "1px solid #b3b44b" },
  },
  {
    id: "5",
    data: { label: "Navigate to Zone B" },
    position: { x: 100, y: 400 },
  },
  {
    id: "6",
    data: { label: "Report Missing Item" },
    position: { x: 400, y: 400 },
  },
  {
    id: "7",
    type: "output",
    data: { label: "Complete Mission" },
    position: { x: 250, y: 500 },
    style: { background: "#ffcccc", border: "1px solid #ff5252" },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    label: "Yes",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e4-6",
    source: "4",
    target: "6",
    label: "No",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e5-7",
    source: "5",
    target: "7",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e6-7",
    source: "6",
    target: "7",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];

// Empty template initial state
const emptyNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Start" },
    position: { x: 250, y: 100 },
    style: { background: "#d0f0c0", border: "1px solid #4caf50" },
  },
  {
    id: "2",
    type: "output",
    data: { label: "End" },
    position: { x: 250, y: 200 },
    style: { background: "#ffcccc", border: "1px solid #ff5252" },
  },
];

const emptyEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];

const nodeTypes = {};

const TemplateGraph: React.FC<TemplateGraphProps> = ({ data }) => {
  const { id } = useParams<{ id: string }>();
  const isNewTemplate = id?.startsWith('t-new');
  
  const [templateName, setTemplateName] = useState(isNewTemplate ? "New Template" : `Template ${id?.split('-')[1]}`);
  const [templateDescription, setTemplateDescription] = useState(isNewTemplate ? "" : "This template defines the workflow for robots to pick items from storage.");
  
  // Use provided data or fallback to empty/initial templates
  const startingNodes = data ? data.nodes : (isNewTemplate ? emptyNodes : initialNodes);
  const startingEdges = data ? data.edges : (isNewTemplate ? emptyEdges : initialEdges);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(startingNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(startingEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: any) => {
    setSelectedNode(node);
  }, []);

  const addNewNode = () => {
    const newId = (nodes.length + 1).toString();
    const newNode = {
      id: newId,
      data: { label: "New Node" },
      position: {
        x: 250,
        y: nodes.reduce((maxY, node) => Math.max(maxY, node.position.y), 0) + 100,
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };
  
  const handleSaveTemplate = () => {
    // In a real app, we would save the template to the database
    toast.success("Template saved successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            asChild
          >
            <Link to="/missions/templates">
              <ArrowLeftIcon className="mr-1 h-4 w-4" /> Back
            </Link>
          </Button>
          <h2 className="text-2xl font-bold">
            {isNewTemplate ? 'Create New Template' : `Edit Template: ${id}`}
          </h2>
        </div>
        <div className="space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <PlusCircle className="mr-1 h-4 w-4" /> Add Node <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={addNewNode}>Basic Node</DropdownMenuItem>
              <DropdownMenuItem>Decision Node</DropdownMenuItem>
              <DropdownMenuItem>Action Node</DropdownMenuItem>
              <DropdownMenuItem>Wait Node</DropdownMenuItem>
              <DropdownMenuItem>End Node</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                More <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" /> Export Template
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" /> Share
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                <Trash2 className="mr-2 h-4 w-4" /> Delete Template
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            className="bg-warehouse-primary text-white hover:bg-warehouse-primary/90"
            onClick={handleSaveTemplate}
          >
            <Save className="mr-1 h-4 w-4" /> Save Template
          </Button>
        </div>
      </div>

      <Tabs defaultValue="editor">
        <TabsList className="mb-4">
          <TabsTrigger value="editor">Visual Editor</TabsTrigger>
          <TabsTrigger value="json">JSON</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor" className="space-y-4">
          <div className="h-[600px] border rounded-md">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              fitView
              nodeTypes={nodeTypes}
            >
              <Controls />
              <MiniMap />
              <Background gap={16} size={1} />
              <Panel position="top-right">
                <div className="bg-white border p-2 rounded-md shadow-sm text-xs">
                  Click on nodes and edges to select them
                </div>
              </Panel>
            </ReactFlow>
          </div>
          
          {selectedNode && (
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Node Properties</CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                <div className="space-y-2">
                  <div>
                    <label className="text-xs font-medium">ID:</label>
                    <input 
                      type="text" 
                      value={selectedNode.id} 
                      readOnly
                      className="ml-2 text-xs border rounded px-2 py-1 bg-gray-50" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium">Label:</label>
                    <input 
                      type="text" 
                      defaultValue={selectedNode.data?.label} 
                      className="ml-2 text-xs border rounded px-2 py-1" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium">Type:</label>
                    <select className="ml-2 text-xs border rounded px-2 py-1">
                      <option value="default">Default</option>
                      <option value="input">Start</option>
                      <option value="output">End</option>
                      <option value="decision">Decision</option>
                    </select>
                  </div>
                  <div className="pt-2">
                    <Button size="sm" variant="destructive" className="text-xs h-7">
                      <Trash2 className="mr-1 h-3 w-3" /> Delete Node
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="json">
          <Card>
            <CardContent className="pt-6">
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto h-[500px] text-sm">
                {JSON.stringify({ nodes, edges }, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Template Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Template Name</label>
                  <input 
                    type="text" 
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    className="border rounded px-3 py-2"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea 
                    rows={3}
                    value={templateDescription}
                    onChange={(e) => setTemplateDescription(e.target.value)}
                    className="border rounded px-3 py-2"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Category</label>
                  <select className="border rounded px-3 py-2">
                    <option>Pick and Place</option>
                    <option>Transport</option>
                    <option>Inventory</option>
                    <option>Custom</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <input type="checkbox" id="is-active" />
                  <label htmlFor="is-active" className="text-sm">Active template (available for use)</label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TemplateGraph;
