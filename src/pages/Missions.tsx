import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, History, FileText, Play, Pause, Square, RotateCcw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import MissionsHistory from "@/components/missions/MissionsHistory";
import MissionsTemplates from "@/components/missions/MissionsTemplates";

const Missions = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("active");

  const [missionsHistory, setMissionsHistory] = useState([
    {
      id: "H001",
      robotId: "R-002",
      task: "Inventory Scan",
      status: "completed",
      startTime: "08:00",
      endTime: "08:45",
      result: "Success"
    },
    {
      id: "H002",
      robotId: "R-005",
      task: "Package Delivery",
      status: "failed",
      startTime: "09:15",
      endTime: "09:30",
      result: "Obstacle Detected"
    },
    {
      id: "H003",
      robotId: "R-009",
      task: "Shelf Stocking",
      status: "completed",
      startTime: "10:00",
      endTime: "10:30",
      result: "Success"
    }
  ]);

  const missionTemplates = [
    {
      id: "T001",
      name: "Morning Inventory Check",
      description: "Scans all inventory locations before opening",
      tasks: ["Scan A-1", "Scan B-5", "Scan C-9"]
    },
    {
      id: "T002",
      name: "Evening Security Patrol",
      description: "Patrols warehouse perimeter after closing",
      tasks: ["Check Gate 1", "Check Gate 2", "Check Fence Line"]
    }
  ];
  const activeMissions = [
    {
      id: "M001",
      robotId: "R-001",
      task: "Pick & Place",
      status: "in_progress",
      progress: 75,
      startTime: "09:30",
      estimatedCompletion: "10:15",
      location: "Zone A-12"
    },
    {
      id: "M002",
      robotId: "R-003",
      task: "Inventory Count",
      status: "pending",
      progress: 0,
      startTime: "10:00",
      estimatedCompletion: "11:30",
      location: "Zone B-05"
    },
    {
      id: "M003",
      robotId: "R-007",
      task: "Transport",
      status: "in_progress",
      progress: 45,
      startTime: "09:45",
      estimatedCompletion: "10:30",
      location: "Zone C-08"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "default";
      case "in_progress": return "secondary";
      case "pending": return "outline";
      case "failed": return "destructive";
      default: return "outline";
    }
  };

  const handleMissionAction = (missionId: string, action: string) => {
    console.log(`${action} mission ${missionId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-warehouse-primary/10 to-warehouse-secondary/10 rounded-lg p-6 border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-warehouse-primary/20 p-3 rounded-lg">
              <Bot className="h-8 w-8 text-warehouse-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t('robot_missions')}</h1>
              <p className="text-muted-foreground">Monitor and manage automated warehouse robot operations</p>
            </div>
          </div>
          <Button className="bg-warehouse-primary hover:bg-warehouse-primary/90">
            <Play className="h-4 w-4 mr-2" />
            Start New Mission
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="active" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <Bot className="h-4 w-4 mr-2" />
            Active Missions
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <History className="h-4 w-4 mr-2" />
            {t('mission_history')}
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <FileText className="h-4 w-4 mr-2" />
            {t('templates')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <div className="grid gap-4">
            {activeMissions.map((mission) => (
              <Card key={mission.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <CardTitle className="text-lg">{mission.task}</CardTitle>
                      <Badge variant={getStatusColor(mission.status)}>
                        {mission.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleMissionAction(mission.id, 'pause')}>
                        <Pause className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleMissionAction(mission.id, 'restart')}>
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleMissionAction(mission.id, 'stop')}>
                        <Square className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Robot ID</p>
                      <p className="font-medium">{mission.robotId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{mission.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Start Time</p>
                      <p className="font-medium">{mission.startTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Est. Completion</p>
                      <p className="font-medium">{mission.estimatedCompletion}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-medium">{mission.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-warehouse-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${mission.progress}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <MissionsHistory />
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <MissionsTemplates />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Missions;
