
import React from "react";
import { Card } from "@/components/ui/card";
import { 
  Tabs,
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

const WarehouseLayout = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Warehouse Layout</h2>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="zones">Zones</TabsTrigger>
          <TabsTrigger value="racks">Racks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Warehouse Overview</h3>
            <p className="text-gray-500">View the overall layout of the warehouse.</p>
            <div className="mt-4 bg-gray-100 rounded-lg h-96 flex items-center justify-center">
              <p className="text-gray-400">Warehouse visualization will be displayed here</p>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="zones" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Warehouse Zones</h3>
            <p className="text-gray-500">Manage warehouse zones and their configurations.</p>
            <div className="mt-4 text-center text-gray-400">
              Zone configuration content to be implemented.
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="racks" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Rack Configurations</h3>
            <p className="text-gray-500">Configure storage racks and shelving units.</p>
            <div className="mt-4 text-center text-gray-400">
              Rack configuration content to be implemented.
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WarehouseLayout;
