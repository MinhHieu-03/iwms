
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { warehouseSections } from "@/lib/mock-data";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import Warehouse2DView from "@/components/WarehouseVisualization/Warehouse2DView";
import Warehouse3DView from "@/components/WarehouseVisualization/Warehouse3DView";
import { ViewIcon, Layers3Icon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WarehouseLayout = () => {
  const [highlightedShelf, setHighlightedShelf] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const { t } = useLanguage();

  const handleShelfClick = (shelfId: string) => {
    setHighlightedShelf(shelfId);
  };

  return (
    <div className="space-y-6">
      <div className="h-[700px] w-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full rounded-l-md overflow-hidden border-r">
              <div className="bg-warehouse-primary text-white p-2 font-medium flex items-center">
                <Layers3Icon className="h-4 w-4 mr-2" />
                {t('2d_layout')}
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
                {t('3d_visualization')}
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
    </div>
  );
};

export default WarehouseLayout;
