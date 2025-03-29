import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { warehouseSections } from "@/lib/mock-data";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import Warehouse2DView from "@/components/WarehouseVisualization/Warehouse2DView";
import Warehouse3DView from "@/components/WarehouseVisualization/Warehouse3DView";
import { ViewIcon, Layers3Icon } from "lucide-react";

const WarehouseLayout = () => {
  const [highlightedShelf, setHighlightedShelf] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("overview");

  const handleShelfClick = (shelfId: string) => {
    setHighlightedShelf(shelfId);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <ViewIcon className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="zones" className="flex items-center gap-2">
            <Layers3Icon className="h-4 w-4" />
            <span>Zones</span>
          </TabsTrigger>
          <TabsTrigger value="racks">Racks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Warehouse Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[700px] w-full">
                <ResizablePanelGroup direction="horizontal">
                  <ResizablePanel defaultSize={50} minSize={30}>
                    <div className="h-full rounded-l-md overflow-hidden border-r">
                      <div className="bg-warehouse-primary text-white p-2 font-medium flex items-center">
                        <Layers3Icon className="h-4 w-4 mr-2" />
                        2D Layout
                      </div>
                      <Warehouse2DView 
                        sections={warehouseSections} 
                        highlightedShelf={highlightedShelf} 
                        onShelfClick={handleShelfClick}
                      />
                    </div>
                  </ResizablePanel>
                  
                  <ResizableHandle withHandle />
                  
                  <ResizablePanel defaultSize={50} minSize={30}>
                    <div className="h-full rounded-r-md overflow-hidden border-l">
                      <div className="bg-warehouse-primary text-white p-2 font-medium flex items-center">
                        <ViewIcon className="h-4 w-4 mr-2" />
                        3D Visualization
                      </div>
                      <div className="h-[660px]">
                        <Warehouse3DView 
                          sections={warehouseSections}
                          highlightedShelf={highlightedShelf}
                        />
                      </div>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="zones">
          <Card>
            <CardHeader>
              <CardTitle>Warehouse Zones</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Manage warehouse zones and their configurations.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {warehouseSections.map((section) => (
                  <Card key={section.id} className="overflow-hidden">
                    <CardHeader className="bg-warehouse-primary/5 p-4">
                      <CardTitle className="text-lg">{section.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Size:</span>
                          <span className="font-medium">{section.rows} × {section.columns}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Occupancy:</span>
                          <span className="font-medium">{section.occupancy}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="racks">
          <Card>
            <CardHeader>
              <CardTitle>Rack Configurations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Configure storage racks and shelving units.</p>
              <div className="text-center text-muted-foreground p-8 border border-dashed rounded-md">
                Rack configuration functionality to be implemented.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WarehouseLayout;
