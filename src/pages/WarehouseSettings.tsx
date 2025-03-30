
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Warehouse, Grid3X3, Forklift, Ruler, Map, PackageOpen, Sliders } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const WarehouseSettings = () => {
  const [warehouseConfig, setWarehouseConfig] = useState({
    name: "Main Warehouse",
    width: 100,
    length: 150,
    height: 15,
    unit: "meters",
    aisles: 12,
    rows: 24,
    rackLevels: 4,
    storageCapacity: 10000,
    loadingDocks: 6,
    chargingStations: 8,
    temperatureControl: "ambient",
    securityLevel: "high",
  });

  const [zoneMappings, setZoneMappings] = useState([
    { id: "A", name: "Receiving", color: "#34D399" },
    { id: "B", name: "Storage - Heavy Items", color: "#60A5FA" },
    { id: "C", name: "Storage - Standard Items", color: "#A78BFA" },
    { id: "D", name: "Packing", color: "#FBBF24" },
    { id: "E", name: "Shipping", color: "#F87171" },
  ]);

  const [newZone, setNewZone] = useState({
    id: "",
    name: "",
    color: "#6366F1",
  });

  const handleConfigChange = (field: string, value: string | number) => {
    setWarehouseConfig({
      ...warehouseConfig,
      [field]: value,
    });
  };

  const handleZoneChange = (index: number, field: string, value: string) => {
    const newZoneMappings = [...zoneMappings];
    newZoneMappings[index] = {
      ...newZoneMappings[index],
      [field]: value,
    };
    setZoneMappings(newZoneMappings);
  };

  const addNewZone = () => {
    if (!newZone.id || !newZone.name) return;
    
    setZoneMappings([...zoneMappings, { ...newZone }]);
    setNewZone({
      id: "",
      name: "",
      color: "#6366F1",
    });
  };

  const deleteZone = (index: number) => {
    const newZoneMappings = [...zoneMappings];
    newZoneMappings.splice(index, 1);
    setZoneMappings(newZoneMappings);
  };

  const saveWarehouseSettings = () => {
    toast.success("Warehouse settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Warehouse Settings</h2>
        <Button 
          onClick={saveWarehouseSettings}
          className="bg-warehouse-primary text-white hover:bg-warehouse-primary/90"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>

      <Tabs defaultValue="structure" className="space-y-4">
        <TabsList>
          <TabsTrigger value="structure" className="flex items-center gap-2">
            <Warehouse className="h-4 w-4" />
            <span>Structure</span>
          </TabsTrigger>
          <TabsTrigger value="zones" className="flex items-center gap-2">
            <Grid3X3 className="h-4 w-4" />
            <span>Zones</span>
          </TabsTrigger>
          <TabsTrigger value="equipment" className="flex items-center gap-2">
            <Forklift className="h-4 w-4" />
            <span>Equipment</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Sliders className="h-4 w-4" />
            <span>Advanced</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="structure">
          <Card>
            <CardHeader>
              <CardTitle>Warehouse Structure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="warehouse-name">Warehouse Name</Label>
                  <Input
                    id="warehouse-name"
                    value={warehouseConfig.name}
                    onChange={(e) => handleConfigChange("name", e.target.value)}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="text-base font-medium mb-2 flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-gray-500" />
                    <span>Dimensions</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="warehouse-width">Width</Label>
                      <div className="flex">
                        <Input
                          id="warehouse-width"
                          type="number"
                          value={warehouseConfig.width}
                          onChange={(e) => handleConfigChange("width", parseInt(e.target.value))}
                          className="rounded-r-none"
                        />
                        <Select 
                          value={warehouseConfig.unit}
                          onValueChange={(value) => handleConfigChange("unit", value)}
                        >
                          <SelectTrigger className="w-24 rounded-l-none border-l-0">
                            <SelectValue placeholder="Unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="meters">meters</SelectItem>
                            <SelectItem value="feet">feet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="warehouse-length">Length</Label>
                      <Input
                        id="warehouse-length"
                        type="number"
                        value={warehouseConfig.length}
                        onChange={(e) => handleConfigChange("length", parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="warehouse-height">Height</Label>
                      <Input
                        id="warehouse-height"
                        type="number"
                        value={warehouseConfig.height}
                        onChange={(e) => handleConfigChange("height", parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <Separator className="my-4" />
                  <h3 className="text-base font-medium mb-2 flex items-center gap-2">
                    <Map className="h-4 w-4 text-gray-500" />
                    <span>Layout</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="warehouse-aisles">Number of Aisles</Label>
                      <Input
                        id="warehouse-aisles"
                        type="number"
                        value={warehouseConfig.aisles}
                        onChange={(e) => handleConfigChange("aisles", parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="warehouse-rows">Rows per Aisle</Label>
                      <Input
                        id="warehouse-rows"
                        type="number"
                        value={warehouseConfig.rows}
                        onChange={(e) => handleConfigChange("rows", parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="warehouse-levels">Rack Levels</Label>
                      <Input
                        id="warehouse-levels"
                        type="number"
                        value={warehouseConfig.rackLevels}
                        onChange={(e) => handleConfigChange("rackLevels", parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <Separator className="my-4" />
                  <h3 className="text-base font-medium mb-2 flex items-center gap-2">
                    <PackageOpen className="h-4 w-4 text-gray-500" />
                    <span>Capacity & Facilities</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="storage-capacity">Storage Capacity (items)</Label>
                      <Input
                        id="storage-capacity"
                        type="number"
                        value={warehouseConfig.storageCapacity}
                        onChange={(e) => handleConfigChange("storageCapacity", parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loading-docks">Loading Docks</Label>
                      <Input
                        id="loading-docks"
                        type="number"
                        value={warehouseConfig.loadingDocks}
                        onChange={(e) => handleConfigChange("loadingDocks", parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="charging-stations">Charging Stations</Label>
                      <Input
                        id="charging-stations"
                        type="number"
                        value={warehouseConfig.chargingStations}
                        onChange={(e) => handleConfigChange("chargingStations", parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
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
              <div className="space-y-6">
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-3 text-sm font-medium text-muted-foreground bg-muted/50">
                    <div className="col-span-2">Zone ID</div>
                    <div className="col-span-4">Zone Name</div>
                    <div className="col-span-4">Color</div>
                    <div className="col-span-2 text-right">Actions</div>
                  </div>

                  {zoneMappings.map((zone, index) => (
                    <div key={zone.id} className="grid grid-cols-12 p-3 items-center text-sm border-t">
                      <div className="col-span-2">
                        <Input 
                          value={zone.id} 
                          onChange={(e) => handleZoneChange(index, "id", e.target.value)}
                          className="h-8"
                        />
                      </div>
                      <div className="col-span-4">
                        <Input 
                          value={zone.name} 
                          onChange={(e) => handleZoneChange(index, "name", e.target.value)}
                          className="h-8"
                        />
                      </div>
                      <div className="col-span-4 flex items-center gap-3">
                        <input 
                          type="color" 
                          value={zone.color}
                          onChange={(e) => handleZoneChange(index, "color", e.target.value)}
                          className="w-8 h-8 rounded cursor-pointer"
                        />
                        <span className="text-xs">{zone.color}</span>
                      </div>
                      <div className="col-span-2 text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => deleteZone(index)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-12 gap-3 items-end">
                  <div className="col-span-2">
                    <Label htmlFor="new-zone-id">Zone ID</Label>
                    <Input 
                      id="new-zone-id"
                      value={newZone.id} 
                      onChange={(e) => setNewZone({...newZone, id: e.target.value})}
                      className="h-8"
                      placeholder="F"
                    />
                  </div>
                  <div className="col-span-4">
                    <Label htmlFor="new-zone-name">Zone Name</Label>
                    <Input 
                      id="new-zone-name"
                      value={newZone.name} 
                      onChange={(e) => setNewZone({...newZone, name: e.target.value})}
                      className="h-8"
                      placeholder="Returns Processing"
                    />
                  </div>
                  <div className="col-span-4">
                    <Label htmlFor="new-zone-color">Zone Color</Label>
                    <div className="flex items-center gap-3">
                      <input 
                        id="new-zone-color"
                        type="color" 
                        value={newZone.color}
                        onChange={(e) => setNewZone({...newZone, color: e.target.value})}
                        className="w-8 h-8 rounded cursor-pointer"
                      />
                      <span className="text-xs">{newZone.color}</span>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Button 
                      onClick={addNewZone}
                      disabled={!newZone.id || !newZone.name}
                      className="w-full"
                    >
                      Add Zone
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="equipment">
          <Card>
            <CardHeader>
              <CardTitle>Equipment Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-base font-medium mb-3">Robot Fleet</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <div className="font-medium">Transport Robots</div>
                          <div className="text-sm text-gray-500">Basic transport between zones</div>
                        </div>
                        <Input 
                          type="number" 
                          className="w-20 text-center" 
                          defaultValue="12"
                        />
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <div className="font-medium">Picking Robots</div>
                          <div className="text-sm text-gray-500">Specialized for item picking</div>
                        </div>
                        <Input 
                          type="number" 
                          className="w-20 text-center" 
                          defaultValue="8"
                        />
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <div className="font-medium">Heavy Lift Robots</div>
                          <div className="text-sm text-gray-500">For pallet and heavy load transport</div>
                        </div>
                        <Input 
                          type="number" 
                          className="w-20 text-center" 
                          defaultValue="5"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-medium mb-3">Fixed Equipment</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <div className="font-medium">Conveyor Belts</div>
                          <div className="text-sm text-gray-500">Automated item transport</div>
                        </div>
                        <Input 
                          type="number" 
                          className="w-20 text-center" 
                          defaultValue="6"
                        />
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <div className="font-medium">Barcode Scanners</div>
                          <div className="text-sm text-gray-500">Fixed position scanners</div>
                        </div>
                        <Input 
                          type="number" 
                          className="w-20 text-center" 
                          defaultValue="24"
                        />
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <div className="font-medium">Packing Stations</div>
                          <div className="text-sm text-gray-500">For order preparation</div>
                        </div>
                        <Input 
                          type="number" 
                          className="w-20 text-center" 
                          defaultValue="10"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="temperature-control">Temperature Control</Label>
                      <Select 
                        value={warehouseConfig.temperatureControl}
                        onValueChange={(value) => handleConfigChange("temperatureControl", value)}
                      >
                        <SelectTrigger id="temperature-control">
                          <SelectValue placeholder="Select temperature control" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ambient">Ambient</SelectItem>
                          <SelectItem value="refrigerated">Refrigerated</SelectItem>
                          <SelectItem value="frozen">Frozen</SelectItem>
                          <SelectItem value="climate-controlled">Climate Controlled</SelectItem>
                          <SelectItem value="mixed">Mixed Zones</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="security-level">Security Level</Label>
                      <Select 
                        value={warehouseConfig.securityLevel}
                        onValueChange={(value) => handleConfigChange("securityLevel", value)}
                      >
                        <SelectTrigger id="security-level">
                          <SelectValue placeholder="Select security level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="maximum">Maximum</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-warehouse-primary focus:ring-warehouse-primary"
                          defaultChecked 
                        />
                        <span>Enable automated inventory checks</span>
                      </Label>
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-warehouse-primary focus:ring-warehouse-primary"
                          defaultChecked 
                        />
                        <span>Enable predictive maintenance</span>
                      </Label>
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-warehouse-primary focus:ring-warehouse-primary"
                          defaultChecked 
                        />
                        <span>Enable energy optimization</span>
                      </Label>
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-warehouse-primary focus:ring-warehouse-primary"
                          defaultChecked 
                        />
                        <span>Enable route optimization</span>
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WarehouseSettings;
