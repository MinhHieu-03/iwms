

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, Thermometer, Eye, Grid3X3, Building, Box } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Warehouse2DView from "@/components/WarehouseVisualization/Warehouse2DView";
import Warehouse3DView from "@/components/WarehouseVisualization/Warehouse3DView";
import { WarehouseHeatmap } from "@/components/WarehouseVisualization/WarehouseHeatmap";

const WarehouseLayout = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("2d");
  const [highlightedRack, setHighlightedRack] = useState<string | null>(null);
  const [hoveredRack, setHoveredRack] = useState<string | null>(null);

  // Mock data for warehouse areas and racks with all required properties
  const mockAreas = [
    {
      id: "area-1",
      warehouseId: "warehouse-1",
      name: "Main Storage Area",
      type: "storage" as const,
      status: "active" as const,
      description: "Primary storage area for incoming and outgoing inventory",
      capacity: 1000,
      currentUtilization: 750,
      dimensions: { length: 100, width: 50, height: 8 },
      createdAt: new Date().toISOString()
    },
    {
      id: "area-2",
      warehouseId: "warehouse-1",
      name: "Receiving Area",
      type: "receiving" as const,
      status: "active" as const,
      description: "Area for receiving incoming shipments",
      capacity: 500,
      currentUtilization: 200,
      dimensions: { length: 50, width: 30, height: 6 },
      createdAt: new Date().toISOString()
    }
  ];

  const mockRacks = [
    {
      id: "rack-1",
      locationCode: "A01-01",
      areaId: "area-1",
      row: 1,
      column: 1,
      level: 1,
      status: "occupied" as const,
      warehouse: "Main Warehouse",
      area: "Storage Area A",
      capacity: 100,
      currentLoad: 75,
      dimensions: { width: 2.5, height: 3.0, depth: 1.2 },
      createdAt: new Date().toISOString(),
      storedItems: [
        {
          id: "item-1",
          sku: "SKU-001",
          productName: "Widget A",
          quantity: 25,
          storeMethod: "Bin" as const,
          storeCode: "A001",
          packingMethod: "Carton" as const,
          packingCode: "PK0001",
          partner: "Tech Supplies Inc.",
          inboundOrderId: "IN-001",
          status: "stored" as const,
          storedAt: new Date().toISOString()
        }
      ]
    },
    {
      id: "rack-2",
      locationCode: "A01-02",
      areaId: "area-1",
      row: 1,
      column: 2,
      level: 1,
      status: "empty" as const,
      warehouse: "Main Warehouse",
      area: "Storage Area A",
      capacity: 100,
      currentLoad: 0,
      dimensions: { width: 2.5, height: 3.0, depth: 1.2 },
      createdAt: new Date().toISOString(),
      storedItems: []
    },
    {
      id: "rack-3",
      locationCode: "B01-01",
      areaId: "area-2",
      row: 1,
      column: 1,
      level: 1,
      status: "occupied" as const,
      warehouse: "Main Warehouse",
      area: "Receiving Area",
      capacity: 80,
      currentLoad: 45,
      dimensions: { width: 2.0, height: 2.5, depth: 1.0 },
      createdAt: new Date().toISOString(),
      storedItems: [
        {
          id: "item-2",
          sku: "SKU-002",
          productName: "Component B",
          quantity: 15,
          storeMethod: "Pallet" as const,
          storeCode: "B001",
          packingMethod: "Box" as const,
          packingCode: "PK0002",
          partner: "Industrial Supplies Co.",
          inboundOrderId: "IN-002",
          status: "stored" as const,
          storedAt: new Date().toISOString()
        }
      ]
    }
  ];

  const mockSections = [
    {
      id: "section-1",
      name: "Section A",
      rows: 5,
      columns: 8,
      occupancy: 75
    }
  ];

  const handleRackClick = (rackId: string) => {
    setHighlightedRack(rackId);
    console.log(`Clicked rack: ${rackId}`);
  };

  const handleRackHover = (rackId: string | null) => {
    setHoveredRack(rackId);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-warehouse-primary/10 to-warehouse-secondary/10 rounded-lg p-6 border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-warehouse-primary/20 p-3 rounded-lg">
              <Building className="h-8 w-8 text-warehouse-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t('warehouse_layout')}</h1>
              <p className="text-muted-foreground">Interactive warehouse floor plan with real-time robot tracking and analytics</p>
            </div>
          </div>
          <Button className="bg-warehouse-primary hover:bg-warehouse-primary/90">
            <Eye className="h-4 w-4 mr-2" />
            Full Screen View
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted/50">
          <TabsTrigger value="2d" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <Map className="h-4 w-4 mr-2" />
            2D Layout
          </TabsTrigger>
          <TabsTrigger value="3d" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <Box className="h-4 w-4 mr-2" />
            3D View
          </TabsTrigger>
          <TabsTrigger value="heatmap" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <Thermometer className="h-4 w-4 mr-2" />
            Activity Heatmap
          </TabsTrigger>
          <TabsTrigger value="zones" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <Grid3X3 className="h-4 w-4 mr-2" />
            Zone Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="2d" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5" />
                2D Warehouse View
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Warehouse2DView 
                area={mockAreas[0]}
                racks={mockRacks}
                highlightedRack={highlightedRack}
                hoveredRack={hoveredRack}
                onRackClick={handleRackClick}
                onRackHover={handleRackHover}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="3d" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Box className="h-5 w-5" />
                3D Warehouse View
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] w-full">
                <Warehouse3DView 
                  areas={mockAreas}
                  racks={mockRacks}
                  highlightedRack={highlightedRack}
                  hoveredRack={hoveredRack}
                  activeAreaId="area-1"
                  onRackClick={handleRackClick}
                  onRackHover={handleRackHover}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heatmap" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="h-5 w-5" />
                Activity Heatmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <WarehouseHeatmap sections={mockSections} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zones" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Zone A - Receiving</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Capacity:</span>
                    <span>85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Robots:</span>
                    <span>3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-green-600">Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Zone B - Storage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Capacity:</span>
                    <span>92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Robots:</span>
                    <span>5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-green-600">Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Zone C - Shipping</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Capacity:</span>
                    <span>67%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Robots:</span>
                    <span>2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-green-600">Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WarehouseLayout;

