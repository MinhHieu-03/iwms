
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
import { PlusCircle } from "lucide-react";
import MissionsHistory from "@/components/missions/MissionsHistory";
import MissionsTemplates from "@/components/missions/MissionsTemplates";
import { useNavigate } from "react-router-dom";

const Missions = () => {
  const navigate = useNavigate();
  const [missionName, setMissionName] = useState("");
  const [missionType, setMissionType] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateMission = () => {
    // Here you'd handle mission creation logic
    console.log("Creating new mission:", { missionName, missionType });
    setIsDialogOpen(false);
    setMissionName("");
    setMissionType("");
  };

  const handleNewTemplate = () => {
    navigate("/missions/templates/new");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Robot Missions</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Mission
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Mission</DialogTitle>
              <DialogDescription>
                Define the parameters for your new robot mission.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="mission-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="mission-name"
                  value={missionName}
                  onChange={(e) => setMissionName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="mission-type" className="text-right">
                  Type
                </Label>
                <Input
                  id="mission-type"
                  value={missionType}
                  onChange={(e) => setMissionType(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateMission}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="history">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          {/* New Template button appears only in templates tab */}
          {/* This button will be shown/hidden based on the active tab using JavaScript */}
          <div id="templateActions">
            <Button 
              variant="outline" 
              onClick={handleNewTemplate}
              className="hidden data-[state=visible]:inline-flex"
              data-tab-target="templates"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              New Template
            </Button>
          </div>
        </div>
        <TabsContent value="history">
          <MissionsHistory />
        </TabsContent>
        <TabsContent value="templates">
          <MissionsTemplates />
        </TabsContent>
      </Tabs>

      {/* Add script to toggle New Template button visibility */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const tabsList = document.querySelector('[role="tablist"]');
            const templateButton = document.querySelector('[data-tab-target="templates"]');
            
            if (tabsList && templateButton) {
              // Initial state
              if (tabsList.querySelector('[aria-selected="true"]').getAttribute('value') === 'templates') {
                templateButton.dataset.state = 'visible';
              }
              
              // Listen for tab changes
              tabsList.addEventListener('click', function(e) {
                const triggerEl = e.target.closest('[role="tab"]');
                if (triggerEl) {
                  const value = triggerEl.getAttribute('value');
                  templateButton.dataset.state = value === 'templates' ? 'visible' : '';
                }
              });
            }
          });
        `
      }} />
    </div>
  );
};

export default Missions;
