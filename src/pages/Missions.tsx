import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, FileText, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import MissionsHistory from "@/components/missions/MissionsHistory";
import MissionsTemplates from "@/components/missions/MissionsTemplates";
import TemplateGraph from "@/components/missions/TemplateGraph";
import StatusBadge from "@/components/StatusBadge";
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

const Missions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const currentPath = location.pathname;
  
  const isHistoryTab = currentPath === "/missions" || currentPath === "/missions/";
  const isTemplatesTab = currentPath.includes("/missions/templates");
  
  const activeTab = isHistoryTab ? "history" : isTemplatesTab ? "templates" : "history";

  const [isNewMissionDialogOpen, setIsNewMissionDialogOpen] = useState(false);
  const [newMission, setNewMission] = useState({
    name: "",
    description: "",
    type: "standard",
    priority: "medium"
  });

  const handleTabChange = (value: string) => {
    if (value === "history") {
      navigate("/missions");
    } else if (value === "templates") {
      navigate("/missions/templates");
    }
  };

  const handleCreateMission = () => {
    // In a real app, we would save the mission to the database here
    toast.success(`Mission "${newMission.name}" created successfully`);
    setIsNewMissionDialogOpen(false);
    setNewMission({
      name: "",
      description: "",
      type: "standard",
      priority: "medium"
    });
  };

  const robotStatuses = [
    { id: "Robot-01", status: "Busy", battery: 82, location: "Moving: A-12 → D-05" },
    { id: "Robot-02", status: "Available", battery: 67, location: "Dock-1" },
    { id: "Robot-03", status: "Busy", battery: 45, location: "Moving: B-08 → Loading" },
    { id: "Robot-04", status: "Charging", battery: 23, location: "Charging Station" },
    { id: "Robot-05", status: "Maintenance", battery: 0, location: "Maintenance Bay" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button className="bg-warehouse-primary text-white hover:bg-warehouse-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          New Mission
        </Button>
      </div>

      <Dialog open={isNewMissionDialogOpen} onOpenChange={setIsNewMissionDialogOpen}>
        <DialogTrigger asChild>
          <Button className="bg-warehouse-primary text-white hover:bg-warehouse-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            New Mission
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Mission</DialogTitle>
            <DialogDescription>
              Create a new mission for robots to execute.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="mission-name">Mission Name</Label>
              <Input 
                id="mission-name"
                value={newMission.name}
                onChange={(e) => setNewMission({...newMission, name: e.target.value})}
                placeholder="Enter mission name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mission-desc">Description</Label>
              <textarea 
                id="mission-desc"
                value={newMission.description}
                onChange={(e) => setNewMission({...newMission, description: e.target.value})}
                placeholder="Brief description of the mission"
                className="min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mission-type">Type</Label>
                <select 
                  id="mission-type"
                  value={newMission.type}
                  onChange={(e) => setNewMission({...newMission, type: e.target.value})}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="standard">Standard</option>
                  <option value="pickup">Pickup</option>
                  <option value="delivery">Delivery</option>
                  <option value="transport">Transport</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mission-priority">Priority</Label>
                <select 
                  id="mission-priority"
                  value={newMission.priority}
                  onChange={(e) => setNewMission({...newMission, priority: e.target.value})}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewMissionDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleCreateMission}
              disabled={!newMission.name}
              className="bg-warehouse-primary text-white hover:bg-warehouse-primary/90"
            >
              Create Mission
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList className="bg-background border border-border p-1">
          <TabsTrigger 
            value="history" 
            className="flex items-center gap-2 data-[state=active]:bg-warehouse-primary data-[state=active]:text-white transition-colors"
          >
            <History className="h-4 w-4" />
            <span>History</span>
          </TabsTrigger>
          <TabsTrigger 
            value="templates" 
            className="flex items-center gap-2 data-[state=active]:bg-warehouse-primary data-[state=active]:text-white transition-colors"
          >
            <FileText className="h-4 w-4" />
            <span>Templates</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="history">
          {location.pathname === "/missions" && <MissionsHistory />}
        </TabsContent>
        
        <TabsContent value="templates">
          {location.pathname === "/missions/templates" && <MissionsTemplates />}
        </TabsContent>
      </Tabs>
      
      {currentPath.match(/\/missions\/templates\/t-\d+/) && <TemplateGraph />}
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Robot Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {robotStatuses.map((robot) => (
            <div key={robot.id} className="border rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">{robot.id}</h4>
                <StatusBadge status={robot.status} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Battery</span>
                  <span>{robot.battery}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      robot.battery > 60 ? 'bg-green-500' : 
                      robot.battery > 30 ? 'bg-yellow-500' : 
                      'bg-red-500'
                    }`} 
                    style={{ width: `${robot.battery}%` }}
                  />
                </div>
                <div className="pt-2 text-sm">
                  <span className="text-gray-500">Location:</span> {robot.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Missions;
