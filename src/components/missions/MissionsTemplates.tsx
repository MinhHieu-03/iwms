
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  FileText, 
  ArrowRight,
  Trash2, 
  FileEdit,
  Copy,
  Search,
  CalendarDays,
  Filter,
  MoreVertical,
  CheckCircle2
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type TemplateType = {
  id: string;
  name: string;
  description: string;
  steps: number;
  lastModified: string;
  category: string;
  status: "active" | "draft" | "archived";
};

const MissionsTemplates = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<TemplateType[]>([
    {
      id: "t-001",
      name: "Pickup and Delivery",
      description: "Standard pickup and delivery process with verification",
      steps: 5,
      lastModified: "2023-05-10T14:30:00",
      category: "Transport",
      status: "active",
    },
    {
      id: "t-002",
      name: "Zone Transfer",
      description: "Move items between warehouse zones",
      steps: 3,
      lastModified: "2023-05-08T09:15:00",
      category: "Transport",
      status: "active",
    },
    {
      id: "t-003",
      name: "Inventory Check",
      description: "Automated inventory verification process",
      steps: 7,
      lastModified: "2023-05-12T11:20:00",
      category: "Inventory",
      status: "draft",
    },
    {
      id: "t-004",
      name: "Pallet Transport",
      description: "Heavy pallet transportation between storage areas",
      steps: 4,
      lastModified: "2023-05-11T16:45:00",
      category: "Transport",
      status: "active",
    },
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null);
  const [isNewTemplateDialogOpen, setIsNewTemplateDialogOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    category: "Transport",
  });

  const handleCreateTemplate = () => {
    const id = `t-${(templates.length + 1).toString().padStart(3, '0')}`;
    setTemplates([
      ...templates,
      {
        id,
        name: newTemplate.name,
        description: newTemplate.description,
        steps: 1,
        lastModified: new Date().toISOString(),
        category: newTemplate.category,
        status: "draft",
      },
    ]);
    setIsNewTemplateDialogOpen(false);
    setNewTemplate({ name: "", description: "", category: "Transport" });
    
    // Navigate to the new template
    navigate(`/missions/templates/${id}`);
    
    // Show success toast
    toast("Template created", {
      description: `"${newTemplate.name}" has been created successfully.`,
      icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    });
  };

  const handleDeleteTemplate = () => {
    if (templateToDelete) {
      const templateName = templates.find(t => t.id === templateToDelete)?.name;
      setTemplates(templates.filter(template => template.id !== templateToDelete));
      setIsDeleteDialogOpen(false);
      setTemplateToDelete(null);
      
      // Show success toast
      toast("Template deleted", {
        description: `"${templateName}" has been deleted.`,
      });
    }
  };

  const confirmDelete = (id: string) => {
    setTemplateToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mission Templates</h2>
        <Dialog open={isNewTemplateDialogOpen} onOpenChange={setIsNewTemplateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-warehouse-primary text-white hover:bg-warehouse-primary/90">
              <Plus className="mr-1 h-4 w-4" /> New Template
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
              <DialogDescription>
                Create a new mission template for robots to follow.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="template-name">Template Name</Label>
                <Input 
                  id="template-name"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                  placeholder="Enter template name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="template-desc">Description</Label>
                <textarea 
                  id="template-desc"
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                  placeholder="Brief description of the template"
                  className="min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="template-category">Category</Label>
                <select 
                  id="template-category"
                  value={newTemplate.category}
                  onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="Transport">Transport</option>
                  <option value="Inventory">Inventory</option>
                  <option value="Picking">Picking</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewTemplateDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleCreateTemplate}
                disabled={!newTemplate.name}
                className="bg-warehouse-primary text-white hover:bg-warehouse-primary/90"
              >
                Create Template
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-1 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <CalendarDays className="mr-1 h-4 w-4" />
            Date
          </Button>
        </div>
      </div>

      {filteredTemplates.length === 0 ? (
        <div className="text-center py-10 border rounded-lg bg-gray-50">
          <FileText className="mx-auto h-10 w-10 text-gray-400 mb-2" />
          <h3 className="text-lg font-medium mb-1">No templates found</h3>
          <p className="text-sm text-gray-500">
            {searchQuery ? "Try a different search term" : "Create your first template to get started"}
          </p>
          {searchQuery && (
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setSearchQuery("")}
            >
              Clear search
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="h-full hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="flex items-center text-lg">
                    <FileText className="h-5 w-5 text-warehouse-secondary mr-2" />
                    {template.name}
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <Link to={`/missions/templates/${template.id}`}>
                          <FileEdit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        <span>Duplicate</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => confirmDelete(template.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex space-x-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {template.category}
                  </Badge>
                  <Badge 
                    variant={template.status === "active" ? "default" : "outline"}
                    className={
                      template.status === "active" ? "bg-green-500 text-xs" : 
                      template.status === "draft" ? "text-amber-500 border-amber-500 text-xs" : 
                      "text-gray-500 border-gray-500 text-xs"
                    }
                  >
                    {template.status.charAt(0).toUpperCase() + template.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{template.steps} steps</span>
                  <span>Modified: {new Date(template.lastModified).toLocaleDateString()}</span>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-warehouse-primary hover:text-warehouse-primary/80"
                    asChild
                  >
                    <Link to={`/missions/templates/${template.id}`}>
                      Edit <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Template</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this template? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteTemplate}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MissionsTemplates;
