
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import MissionsHistory from "@/components/missions/MissionsHistory";
import MissionsTemplates from "@/components/missions/MissionsTemplates";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAllTemplates } from "@/data/robotMissionsData";

const Missions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [missionData, setMissionData] = useState({
    name: "",
    robotCode: "",
    templateId: "",
    priority: "medium",
    pickupLocation: "",
    dropoffLocation: "",
    quantity: "1"
  });

  const templates = getAllTemplates();
  const robots = ["R001", "R002", "R003", "R004", "R005", "R006"];

  const handleCreateMission = () => {
    if (!missionData.name || !missionData.robotCode || !missionData.templateId) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    console.log("Creating new mission:", missionData);
    toast({
      title: t('mission_created') || "Mission Created",
      description: `Mission "${missionData.name}" has been created and assigned to ${missionData.robotCode}`,
    });

    setIsDialogOpen(false);
    setMissionData({
      name: "",
      robotCode: "",
      templateId: "",
      priority: "medium",
      pickupLocation: "",
      dropoffLocation: "",
      quantity: "1"
    });
  };

  const handleNewTemplate = () => {
    navigate("/missions/templates/new");
  };

  return (
    <div className="space-y-6 p-6">
      {/* <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Robot Missions</h1>
          <p className="text-muted-foreground">Manage robot missions and templates for warehouse automation</p>
        </div>
      </div> */}

      <Tabs defaultValue="history" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="history">Mission History</TabsTrigger>
            <TabsTrigger value="templates">Mission Templates</TabsTrigger>
          </TabsList>
          {/* <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              onClick={handleNewTemplate}
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              New Template
            </Button>
          </div> */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Mission
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Robot Mission</DialogTitle>
                <DialogDescription>
                  Configure and deploy a new mission for warehouse automation.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="mission-name" className="text-right">
                    Mission Name *
                  </Label>
                  <Input
                    id="mission-name"
                    value={missionData.name}
                    onChange={(e) => setMissionData({ ...missionData, name: e.target.value })}
                    className="col-span-3"
                    placeholder="e.g., Inbound Storage Task"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="robot-select" className="text-right">
                    Robot *
                  </Label>
                  <Select value={missionData.robotCode} onValueChange={(value) => setMissionData({ ...missionData, robotCode: value })}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a robot" />
                    </SelectTrigger>
                    <SelectContent>
                      {robots.map((robot) => (
                        <SelectItem key={robot} value={robot}>{robot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="template-select" className="text-right">
                    Template *
                  </Label>
                  <Select value={missionData.templateId} onValueChange={(value) => setMissionData({ ...missionData, templateId: value })}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a mission template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name} ({template.category})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="priority-select" className="text-right">
                    Priority
                  </Label>
                  <Select value={missionData.priority} onValueChange={(value) => setMissionData({ ...missionData, priority: value })}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="pickup-location" className="text-right">
                    Pickup Location
                  </Label>
                  <Input
                    id="pickup-location"
                    value={missionData.pickupLocation}
                    onChange={(e) => setMissionData({ ...missionData, pickupLocation: e.target.value })}
                    className="col-span-3"
                    placeholder="e.g., Dock-A or A01-01"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dropoff-location" className="text-right">
                    Dropoff Location
                  </Label>
                  <Input
                    id="dropoff-location"
                    value={missionData.dropoffLocation}
                    onChange={(e) => setMissionData({ ...missionData, dropoffLocation: e.target.value })}
                    className="col-span-3"
                    placeholder="e.g., B02-03 or Dock-B"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={missionData.quantity}
                    onChange={(e) => setMissionData({ ...missionData, quantity: e.target.value })}
                    className="col-span-3"
                    min="1"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateMission}>Create Mission</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="history" className="space-y-4">
          <MissionsHistory />
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <MissionsTemplates />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Missions;
