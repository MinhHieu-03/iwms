
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import Warehouse2DView from "@/components/WarehouseVisualization/Warehouse2DView";
import Warehouse3DView from "@/components/WarehouseVisualization/Warehouse3DView";
import { ViewIcon, Layers3Icon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { warehouseAreas, racks, warehouses } from "@/data/warehouseData";

const WarehouseLayout = () => {
  const [highlightedRack, setHighlightedRack] = useState<string | null>(null);
  const [hoveredRack, setHoveredRack] = useState<string | null>(null);
  const [activeAreaId, setActiveAreaId] = useState<string>(warehouseAreas[0]?.id || "");
  const { t } = useLanguage();

  const handleRackClick = (rackId: string) => {
    setHighlightedRack(rackId);
  };

  const handleRackHover = (rackId: string | null) => {
    setHoveredRack(rackId);
  };

  // Get active areas with at least one rack
  const areasWithRacks = warehouseAreas.filter(area => 
    racks.some(rack => rack.areaId === area.id)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Layers3Icon className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Warehouse Layout</h1>
      </div>

      {/* Area Navigation */}
      <Tabs value={activeAreaId} onValueChange={setActiveAreaId} className="w-full">
        <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${areasWithRacks.length}, 1fr)` }}>
          {areasWithRacks.map((area) => (
            <TabsTrigger key={area.id} value={area.id} className="text-sm">
              {area.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="h-[700px] w-full mt-4">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full rounded-l-md overflow-hidden border-r">
                <div className="bg-warehouse-primary text-white p-2 font-medium flex items-center">
                  <Layers3Icon className="h-4 w-4 mr-2" />
                  {t('2d_layout')}
                </div>
                <div className="h-[660px] overflow-auto">
                  {areasWithRacks.map((area) => (
                    <TabsContent key={area.id} value={area.id} className="h-full mt-0 p-4">
                      <Warehouse2DView
                        area={area}
                        racks={racks.filter(rack => rack.areaId === area.id)}
                        highlightedRack={highlightedRack}
                        hoveredRack={hoveredRack}
                        onRackClick={handleRackClick}
                        onRackHover={handleRackHover}
                      />
                    </TabsContent>
                  ))}
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full rounded-r-md overflow-hidden border-l">
                <div className="bg-warehouse-primary text-white p-2 font-medium flex items-center">
                  <ViewIcon className="h-4 w-4 mr-2" />
                  {t('3d_visualization')}
                </div>
                <div className="h-[660px]">
                  <Warehouse3DView
                    areas={areasWithRacks}
                    racks={racks}
                    highlightedRack={highlightedRack}
                    hoveredRack={hoveredRack}
                    activeAreaId={activeAreaId}
                    onRackClick={handleRackClick}
                    onRackHover={handleRackHover}
                  />
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </Tabs>
    </div>
  );
};

export default WarehouseLayout;
