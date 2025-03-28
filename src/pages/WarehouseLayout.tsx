
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { generateWarehouseData } from "@/lib/utils";

const WarehouseLayout = () => {
  const [viewMode, setViewMode] = useState("2d");
  
  // Generate sample warehouse data
  const warehouseCells = generateWarehouseData(10, 15);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Warehouse Layout</h2>
        <Tabs value={viewMode} onValueChange={setViewMode}>
          <TabsList>
            <TabsTrigger value="2d">2D View</TabsTrigger>
            <TabsTrigger value="3d">3D View</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <Card className="p-6">
        <TabsContent value="2d" className="mt-0">
          <div className="border rounded overflow-auto p-4">
            <div className="flex justify-end mb-4">
              <div className="flex space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Occupied</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-200 rounded-full mr-2"></div>
                  <span>Empty</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-15 gap-1">
              {warehouseCells.map((cell) => (
                <div
                  key={cell.id}
                  className={`w-10 h-10 flex items-center justify-center text-xs border rounded ${
                    cell.occupied ? "bg-green-100 border-green-500" : "bg-gray-100"
                  }`}
                  title={cell.content || "Empty"}
                >
                  {cell.content ? cell.content.split('-')[1] : ""}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="3d" className="mt-0">
          <div className="border rounded p-4 h-96 flex items-center justify-center bg-gray-50">
            <p className="text-center text-gray-500">
              3D visualization of the warehouse would be rendered here.<br />
              (Feature in development)
            </p>
          </div>
        </TabsContent>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Warehouse Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm text-gray-500 mb-1">Total Cells</h4>
            <p className="text-2xl font-bold">{warehouseCells.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-sm text-gray-500 mb-1">Occupied</h4>
            <p className="text-2xl font-bold">
              {warehouseCells.filter(cell => cell.occupied).length}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm text-gray-500 mb-1">Empty</h4>
            <p className="text-2xl font-bold">
              {warehouseCells.filter(cell => !cell.occupied).length}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="text-sm text-gray-500 mb-1">Utilization</h4>
            <p className="text-2xl font-bold">
              {Math.round((warehouseCells.filter(cell => cell.occupied).length / warehouseCells.length) * 100)}%
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WarehouseLayout;
