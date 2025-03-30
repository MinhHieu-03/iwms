
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Grid3X3,
  Save,
  RefreshCcw,
  FileSpreadsheet,
  Upload,
  Building2,
  Package,
} from "lucide-react";
import { toast } from "sonner";

const WarehouseSettings = () => {
  const [warehouseStructure, setWarehouseStructure] = useState({
    name: "Main Warehouse",
    dimensions: {
      length: 50,
      width: 30,
      height: 12,
    },
    zones: [
      { id: "A", name: "Storage Zone A", type: "storage", color: "#9b87f5" },
      { id: "B", name: "Storage Zone B", type: "storage", color: "#6E59A5" },
      { id: "C", name: "Loading Zone", type: "loading", color: "#F97316" },
      { id: "D", name: "Receiving Zone", type: "receiving", color: "#0EA5E9" },
    ],
    units: "meters",
    gridSize: 0.5,
    hasMultipleFloors: false,
    floorCount: 1,
  });

  const [shelving, setShelving] = useState({
    defaultShelfHeight: 2.5,
    defaultRowSpacing: 3,
    defaultAisleWidth: 2.5,
  });

  const [selectedZone, setSelectedZone] = useState(warehouseStructure.zones[0].id);

  const handleWarehouseUpdate = () => {
    toast.success("Warehouse settings updated successfully");
  };

  const handleZoneUpdate = (zoneId: string, field: string, value: any) => {
    setWarehouseStructure(prev => ({
      ...prev,
      zones: prev.zones.map(zone => 
        zone.id === zoneId ? { ...zone, [field]: value } : zone
      )
    }));
  };

  const handleAddZone = () => {
    const newId = String.fromCharCode(65 + warehouseStructure.zones.length);
    setWarehouseStructure(prev => ({
      ...prev,
      zones: [
        ...prev.zones, 
        { 
          id: newId, 
          name: `Zone ${newId}`, 
          type: "storage", 
          color: "#" + Math.floor(Math.random()*16777215).toString(16) 
        }
      ]
    }));
  };

  const handleRemoveZone = (zoneId: string) => {
    if (warehouseStructure.zones.length <= 1) {
      toast.error("Cannot remove last zone");
      return;
    }
    
    setWarehouseStructure(prev => ({
      ...prev,
      zones: prev.zones.filter(zone => zone.id !== zoneId)
    }));
    
    if (selectedZone === zoneId) {
      setSelectedZone(warehouseStructure.zones[0].id);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Warehouse Settings</h1>
        <Button onClick={handleWarehouseUpdate} className="bg-warehouse-primary hover:bg-warehouse-primary/90">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
      
      <Tabs defaultValue="structure" className="space-y-4">
        <TabsList>
          <TabsTrigger value="structure" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Structure
          </TabsTrigger>
          <TabsTrigger value="zones" className="flex items-center gap-2">
            <Grid3X3 className="h-4 w-4" />
            Zones & Layout
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Inventory Settings
          </TabsTrigger>
          <TabsTrigger value="import" className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            Import/Export
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="structure">
          <Card>
            <CardHeader>
              <CardTitle>Warehouse Structure</CardTitle>
              <CardDescription>
                Configure the physical dimensions and properties of your warehouse
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="warehouse-name">Warehouse Name</Label>
                <Input 
                  id="warehouse-name" 
                  value={warehouseStructure.name}
                  onChange={(e) => setWarehouseStructure({...warehouseStructure, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="length">Length ({warehouseStructure.units})</Label>
                  <Input 
                    id="length" 
                    type="number"
                    value={warehouseStructure.dimensions.length}
                    onChange={(e) => setWarehouseStructure({
                      ...warehouseStructure, 
                      dimensions: {
                        ...warehouseStructure.dimensions, 
                        length: parseFloat(e.target.value)
                      }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Width ({warehouseStructure.units})</Label>
                  <Input 
                    id="width" 
                    type="number"
                    value={warehouseStructure.dimensions.width}
                    onChange={(e) => setWarehouseStructure({
                      ...warehouseStructure, 
                      dimensions: {
                        ...warehouseStructure.dimensions, 
                        width: parseFloat(e.target.value)
                      }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height ({warehouseStructure.units})</Label>
                  <Input 
                    id="height" 
                    type="number"
                    value={warehouseStructure.dimensions.height}
                    onChange={(e) => setWarehouseStructure({
                      ...warehouseStructure, 
                      dimensions: {
                        ...warehouseStructure.dimensions, 
                        height: parseFloat(e.target.value)
                      }
                    })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="units">Measurement Units</Label>
                  <Select 
                    value={warehouseStructure.units}
                    onValueChange={(value) => setWarehouseStructure({...warehouseStructure, units: value})}
                  >
                    <SelectTrigger id="units">
                      <SelectValue placeholder="Select units" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meters">Meters</SelectItem>
                      <SelectItem value="feet">Feet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="grid-size">Grid Size ({warehouseStructure.units})</Label>
                  <div className="pt-2">
                    <Slider 
                      id="grid-size"
                      min={0.1}
                      max={2}
                      step={0.1}
                      value={[warehouseStructure.gridSize]}
                      onValueChange={(values) => setWarehouseStructure({...warehouseStructure, gridSize: values[0]})}
                    />
                    <div className="mt-1 text-right text-sm text-muted-foreground">
                      {warehouseStructure.gridSize} {warehouseStructure.units}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3 space-y-0">
                  <div className="flex h-4 items-center space-x-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                      id="multifloor"
                      checked={warehouseStructure.hasMultipleFloors}
                      onChange={(e) => setWarehouseStructure({...warehouseStructure, hasMultipleFloors: e.target.checked})}
                    />
                    <Label htmlFor="multifloor">Multiple Floors</Label>
                  </div>
                </div>
                
                {warehouseStructure.hasMultipleFloors && (
                  <div className="space-y-2">
                    <Label htmlFor="floor-count">Number of Floors</Label>
                    <Input 
                      id="floor-count" 
                      type="number"
                      min={1}
                      max={10}
                      value={warehouseStructure.floorCount}
                      onChange={(e) => setWarehouseStructure({...warehouseStructure, floorCount: parseInt(e.target.value)})}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Shelving Configuration</CardTitle>
              <CardDescription>
                Set default values for shelving units in your warehouse
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shelf-height">Default Shelf Height ({warehouseStructure.units})</Label>
                  <Input 
                    id="shelf-height" 
                    type="number"
                    step={0.1}
                    value={shelving.defaultShelfHeight}
                    onChange={(e) => setShelving({...shelving, defaultShelfHeight: parseFloat(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="row-spacing">Row Spacing ({warehouseStructure.units})</Label>
                  <Input 
                    id="row-spacing" 
                    type="number"
                    step={0.1}
                    value={shelving.defaultRowSpacing}
                    onChange={(e) => setShelving({...shelving, defaultRowSpacing: parseFloat(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aisle-width">Aisle Width ({warehouseStructure.units})</Label>
                  <Input 
                    id="aisle-width" 
                    type="number"
                    step={0.1}
                    value={shelving.defaultAisleWidth}
                    onChange={(e) => setShelving({...shelving, defaultAisleWidth: parseFloat(e.target.value)})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="zones">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Warehouse Zones</CardTitle>
                  <CardDescription>
                    Configure zones in your warehouse
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {warehouseStructure.zones.map((zone) => (
                    <div 
                      key={zone.id}
                      className={`p-3 border rounded-md cursor-pointer flex items-center justify-between ${selectedZone === zone.id ? 'border-primary bg-primary/5' : ''}`}
                      onClick={() => setSelectedZone(zone.id)}
                    >
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-3" 
                          style={{ backgroundColor: zone.color }}
                        />
                        <div>
                          <div className="font-medium">{zone.name}</div>
                          <div className="text-xs text-muted-foreground">Type: {zone.type}</div>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveZone(zone.id);
                        }}
                        className="h-8 w-8 p-0"
                      >
                        <span className="sr-only">Remove zone</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"/><path d="m18 9-6 6"/><path d="m12 9 6 6"/></svg>
                      </Button>
                    </div>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-4" 
                    onClick={handleAddZone}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                    Add Zone
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              {warehouseStructure.zones.map((zone) => (
                zone.id === selectedZone && (
                  <Card key={zone.id}>
                    <CardHeader>
                      <CardTitle>Zone Details: {zone.name}</CardTitle>
                      <CardDescription>
                        Configure details for this zone
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="zone-name">Zone Name</Label>
                        <Input 
                          id="zone-name" 
                          value={zone.name}
                          onChange={(e) => handleZoneUpdate(zone.id, "name", e.target.value)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="zone-type">Zone Type</Label>
                          <Select 
                            value={zone.type}
                            onValueChange={(value) => handleZoneUpdate(zone.id, "type", value)}
                          >
                            <SelectTrigger id="zone-type">
                              <SelectValue placeholder="Select zone type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="storage">Storage</SelectItem>
                              <SelectItem value="picking">Picking</SelectItem>
                              <SelectItem value="packing">Packing</SelectItem>
                              <SelectItem value="shipping">Shipping</SelectItem>
                              <SelectItem value="receiving">Receiving</SelectItem>
                              <SelectItem value="loading">Loading</SelectItem>
                              <SelectItem value="staging">Staging</SelectItem>
                              <SelectItem value="office">Office</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="zone-color">Zone Color</Label>
                          <div className="flex items-center space-x-2">
                            <Input 
                              id="zone-color" 
                              type="color"
                              value={zone.color}
                              onChange={(e) => handleZoneUpdate(zone.id, "color", e.target.value)}
                              className="w-12 h-12 p-1 border rounded-md"
                            />
                            <Input 
                              value={zone.color} 
                              onChange={(e) => handleZoneUpdate(zone.id, "color", e.target.value)}
                              className="font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Settings</CardTitle>
              <CardDescription>
                Configure inventory management settings for your warehouse
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Configure inventory settings such as SKU formats, reorder thresholds, and inventory tracking methods.
              </p>
              
              {/* Placeholder for future inventory settings */}
              <div className="rounded-md border border-dashed p-8 text-center">
                <h3 className="text-lg font-medium mb-2">Inventory Settings Coming Soon</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced inventory management settings will be available in a future update.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="import">
          <Card>
            <CardHeader>
              <CardTitle>Import & Export</CardTitle>
              <CardDescription>
                Import or export warehouse configuration data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-md p-6">
                  <h3 className="text-lg font-medium mb-2">Import Configuration</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload a JSON or CSV file to import warehouse configuration
                  </p>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">JSON or CSV (MAX. 10MB)</p>
                      </div>
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                </div>
                
                <div className="border rounded-md p-6">
                  <h3 className="text-lg font-medium mb-2">Export Configuration</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Export your current warehouse configuration
                  </p>
                  <div className="space-y-4">
                    <Button className="w-full" variant="outline">
                      <FileSpreadsheet className="mr-2 h-4 w-4" />
                      Export as JSON
                    </Button>
                    <Button className="w-full" variant="outline">
                      <FileSpreadsheet className="mr-2 h-4 w-4" />
                      Export as CSV
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Note: Importing a new configuration will override your current settings.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WarehouseSettings;
