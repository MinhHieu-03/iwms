import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Settings = () => {
  const [warehouseSettings, setWarehouseSettings] = useState({
    name: "Main Warehouse",
    rows: 10,
    columns: 15,
    shelfHeight: 3,
    temperatureControl: true,
    automationLevel: "high",
  });

  const handleSettingChange = (setting: string, value: string | number | boolean) => {
    setWarehouseSettings({
      ...warehouseSettings,
      [setting]: value,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">System Settings</h2>
      
      <Tabs defaultValue="warehouse" className="space-y-4">
        <TabsList>
          <TabsTrigger value="warehouse">Warehouse Configuration</TabsTrigger>
          <TabsTrigger value="robots">Robot Settings</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        {/* Warehouse Configuration Tab */}
        <TabsContent value="warehouse" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Warehouse Structure</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="warehouseName">Warehouse Name</Label>
                  <Input 
                    id="warehouseName" 
                    value={warehouseSettings.name} 
                    onChange={(e) => handleSettingChange("name", e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="rows">Number of Rows</Label>
                  <Input 
                    id="rows" 
                    type="number" 
                    value={warehouseSettings.rows} 
                    onChange={(e) => handleSettingChange("rows", parseInt(e.target.value))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="columns">Number of Columns</Label>
                  <Input 
                    id="columns" 
                    type="number" 
                    value={warehouseSettings.columns} 
                    onChange={(e) => handleSettingChange("columns", parseInt(e.target.value))}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="shelfHeight">Shelf Height (levels)</Label>
                  <Input 
                    id="shelfHeight" 
                    type="number" 
                    value={warehouseSettings.shelfHeight} 
                    onChange={(e) => handleSettingChange("shelfHeight", parseInt(e.target.value))}
                  />
                </div>
                
                <div className="flex items-center space-x-2 pt-4">
                  <input 
                    id="temperatureControl" 
                    type="checkbox" 
                    checked={warehouseSettings.temperatureControl} 
                    onChange={(e) => handleSettingChange("temperatureControl", e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-warehouse-primary focus:ring-warehouse-primary"
                  />
                  <Label htmlFor="temperatureControl">Temperature Controlled Environment</Label>
                </div>
                
                <div>
                  <Label htmlFor="automationLevel">Automation Level</Label>
                  <select 
                    id="automationLevel" 
                    value={warehouseSettings.automationLevel}
                    onChange={(e) => handleSettingChange("automationLevel", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-warehouse-primary focus:ring-warehouse-primary"
                  >
                    <option value="low">Low - Manual with minimal automation</option>
                    <option value="medium">Medium - Partially automated processes</option>
                    <option value="high">High - Fully automated operations</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button>Save Configuration</Button>
            </div>
          </Card>
        </TabsContent>
        
        {/* Robot Settings Tab */}
        <TabsContent value="robots" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Robot Configuration</h3>
            <p className="text-gray-500 mb-4">Configure settings for warehouse robots.</p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="maxSpeed">Maximum Robot Speed (m/s)</Label>
                <Input id="maxSpeed" type="number" defaultValue="1.2" />
              </div>
              
              <div>
                <Label htmlFor="batteryThreshold">Low Battery Alert Threshold (%)</Label>
                <Input id="batteryThreshold" type="number" defaultValue="20" />
              </div>
              
              <div>
                <Label htmlFor="pathPlanning">Path Planning Algorithm</Label>
                <select 
                  id="pathPlanning" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-warehouse-primary focus:ring-warehouse-primary"
                  defaultValue="aStar"
                >
                  <option value="aStar">A* Algorithm</option>
                  <option value="dijkstra">Dijkstra's Algorithm</option>
                  <option value="rrt">RRT (Rapidly-exploring Random Tree)</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button>Save Robot Settings</Button>
            </div>
          </Card>
        </TabsContent>
        
        {/* Other tabs would have similar structures */}
        <TabsContent value="security" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Security Settings</h3>
            <p className="text-gray-500">Configure security settings for the warehouse system.</p>
            <div className="mt-4 text-center text-gray-400">
              Security settings content to be implemented.
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
            <p className="text-gray-500">Configure how and when you receive system notifications.</p>
            <div className="mt-4 text-center text-gray-400">
              Notification settings content to be implemented.
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
