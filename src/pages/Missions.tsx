
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import MissionsHistory from "@/components/missions/MissionsHistory";
import MissionsTemplates from "@/components/missions/MissionsTemplates";
import TemplateGraph from "@/components/missions/TemplateGraph";

const Missions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine the active tab based on the current URL
  const currentPath = location.pathname;
  
  const isHistoryTab = currentPath === "/missions" || currentPath === "/missions/";
  const isTemplatesTab = currentPath.includes("/missions/templates");
  
  const activeTab = isHistoryTab ? "history" : isTemplatesTab ? "templates" : "history";

  // Handle tab change
  const handleTabChange = (value: string) => {
    if (value === "history") {
      navigate("/missions");
    } else if (value === "templates") {
      navigate("/missions/templates");
    }
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
      
      {/* Show template editor when on a specific template route */}
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
