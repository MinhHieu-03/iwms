import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Trash2,
  ChevronDown,
  Download,
  Share2,
  Copy,
  PlusCircle,
  XCircle,
  Workflow,
  Plus
} from "lucide-react";
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
import { getAllTemplates } from "@/data/missionTemplatesData";
import { 
  storageHierarchyNodes,
  storageHierarchyEdges
} from "@/data/warehouseData";

const EditMissionTemplate = () => {
  const { toast } = useToast();
const { t } = useTranslation();  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null);

  // Use data from the new data source
  const templates = getAllTemplates();

  const [nodes, setNodes, onNodesChange] = useNodesState(storageHierarchyNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(storageHierarchyEdges);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <PlusCircle className="mr-1 h-4 w-4" /> Add Node <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Basic Node</DropdownMenuItem>
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
        </div>
      </div>

      <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Workflow className="h-5 w-5" />
                Storage Hierarchy Visualization
              </CardTitle>
              <div className="flex items-center gap-2">
                {/* <Button onClick={addNewNode} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Node
                </Button>
                {selectedNodes.length === 2 && (
                  <Button onClick={addEdgeBetweenSelected} size="sm" variant="outline">
                    Connect Selected
                  </Button>
                )}
                {selectedNodes.length > 0 && (
                  <Button onClick={deleteSelectedNodes} variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete ({selectedNodes.length})
                  </Button>
                )}
                <Button onClick={logEdgeInfo} size="sm" variant="outline">
                  Log Graph Info
                </Button> */}
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
                  onEdgesChange={(val) => {
                    console.log("Edges_changed:", val);
                    onEdgesChange(val)
                  }}
                  // onConnect={onConnect}
                  // onSelectionChange={onSelectionChange}
                  // onNodeDoubleClick={onNodeDoubleClick}
                  // onEdgeClick={onEdgeClick}
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
                      {/* {selectedNodes.length > 0 && (
                        <div className="mt-2 pt-2 border-t">
                          <p className="text-xs text-blue-600 font-medium">
                            {selectedNodes.length} node(s) selected:
                          </p>
                          <p className="text-xs text-gray-500">
                            {selectedNodes.join(", ")}
                          </p>
                          {selectedNodes.length === 2 && (
                            <p className="text-xs text-green-600 mt-1">
                              Ready to connect: {selectedNodes[0]} → {selectedNodes[1]}
                            </p>
                          )}
                        </div>
                      )} */}
                    </div>
                  </Panel>
                </ReactFlow>
              </div>
              
              {/* {editingNode && (
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
              )} */}
            </div>
          </CardContent>
        </Card>
      
      {/* {selectedNode && (
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
      )} */}
    </div>
  );
};

export default EditMissionTemplate;
