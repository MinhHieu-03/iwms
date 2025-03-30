
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Warehouse, Save, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const WarehouseSettings = () => {
  const { toast } = useToast();
  const [zones, setZones] = useState([
    { id: "zone1", name: "Storage Zone A", rows: 10, columns: 15, shelfLevels: 4 },
    { id: "zone2", name: "Storage Zone B", rows: 8, columns: 12, shelfLevels: 5 },
    { id: "zone3", name: "Inbound Zone", rows: 5, columns: 8, shelfLevels: 3 },
  ]);

  const [docks, setDocks] = useState([
    { id: "dock1", name: "Dock 1", type: "inbound", status: "active" },
    { id: "dock2", name: "Dock 2", type: "inbound", status: "active" },
    { id: "dock3", name: "Dock 3", type: "inbound", status: "active" },
    { id: "dock4", name: "Dock 4", type: "outbound", status: "active" },
    { id: "dock5", name: "Dock 5", type: "outbound", status: "active" },
    { id: "dock6", name: "Dock 6", type: "outbound", status: "active" },
    { id: "dock7", name: "Dock 7", type: "outbound", status: "maintenance" },
  ]);

  const [newZone, setNewZone] = useState({
    name: "",
    rows: 10,
    columns: 10,
    shelfLevels: 4
  });

  const [newDock, setNewDock] = useState({
    name: "",
    type: "inbound",
    status: "active"
  });

  const handleAddZone = () => {
    if (newZone.name) {
      const zoneId = `zone${zones.length + 1}`;
      setZones([...zones, { id: zoneId, ...newZone }]);
      setNewZone({
        name: "",
        rows: 10,
        columns: 10,
        shelfLevels: 4
      });
      toast({
        title: "Zone Added",
        description: `${newZone.name} has been added to the warehouse.`,
      });
    }
  };

  const handleAddDock = () => {
    if (newDock.name) {
      const dockId = `dock${docks.length + 1}`;
      setDocks([...docks, { id: dockId, ...newDock }]);
      setNewDock({
        name: "",
        type: "inbound",
        status: "active"
      });
      toast({
        title: "Dock Added",
        description: `${newDock.name} has been added to the warehouse.`,
      });
    }
  };

  const handleDeleteZone = (id: string) => {
    setZones(zones.filter(zone => zone.id !== id));
    toast({
      title: "Zone Deleted",
      description: "The selected zone has been removed from the warehouse.",
    });
  };

  const handleDeleteDock = (id: string) => {
    setDocks(docks.filter(dock => dock.id !== id));
    toast({
      title: "Dock Deleted",
      description: "The selected dock has been removed from the warehouse.",
    });
  };

  const handleSaveStructure = () => {
    toast({
      title: "Structure Saved",
      description: "Your warehouse structure has been saved successfully.",
    });
    // In a real app, we would save to a database here
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Warehouse Settings</h2>
        <Button onClick={handleSaveStructure}>
          <Save className="mr-2 h-4 w-4" />
          Save Structure
        </Button>
      </div>

      <Tabs defaultValue="zones">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="zones">Storage Zones</TabsTrigger>
          <TabsTrigger value="docks">Loading Docks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="zones" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Warehouse className="mr-2 h-5 w-5" />
                Add Storage Zone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zoneName">Zone Name</Label>
                  <Input 
                    id="zoneName" 
                    value={newZone.name}
                    onChange={(e) => setNewZone({...newZone, name: e.target.value})}
                    placeholder="e.g., Storage Zone C"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zoneRows">Number of Rows</Label>
                  <Input 
                    id="zoneRows" 
                    type="number" 
                    value={newZone.rows}
                    onChange={(e) => setNewZone({...newZone, rows: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zoneColumns">Number of Columns</Label>
                  <Input 
                    id="zoneColumns" 
                    type="number" 
                    value={newZone.columns}
                    onChange={(e) => setNewZone({...newZone, columns: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zoneShelfLevels">Shelf Levels</Label>
                  <Input 
                    id="zoneShelfLevels" 
                    type="number" 
                    value={newZone.shelfLevels}
                    onChange={(e) => setNewZone({...newZone, shelfLevels: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
              <Button onClick={handleAddZone} className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Add Zone
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configured Storage Zones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {zones.map((zone) => (
                  <div key={zone.id} className="border rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{zone.name}</h3>
                      <p className="text-sm text-gray-500">
                        {zone.rows} rows × {zone.columns} columns × {zone.shelfLevels} levels
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteZone(zone.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="docks" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Add Loading Dock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dockName">Dock Name</Label>
                  <Input 
                    id="dockName" 
                    value={newDock.name}
                    onChange={(e) => setNewDock({...newDock, name: e.target.value})}
                    placeholder="e.g., Dock 8"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dockType">Dock Type</Label>
                  <Select
                    value={newDock.type}
                    onValueChange={(value) => setNewDock({...newDock, type: value})}
                  >
                    <SelectTrigger id="dockType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inbound">Inbound</SelectItem>
                      <SelectItem value="outbound">Outbound</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dockStatus">Status</Label>
                  <Select
                    value={newDock.status}
                    onValueChange={(value) => setNewDock({...newDock, status: value})}
                  >
                    <SelectTrigger id="dockStatus">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleAddDock} className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Add Dock
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configured Loading Docks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {docks.map((dock) => (
                  <div key={dock.id} className="border rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{dock.name}</h3>
                      <p className="text-sm text-gray-500">
                        Type: <span className="capitalize">{dock.type}</span> • 
                        Status: <span className={`capitalize ${
                          dock.status === 'active' ? 'text-green-500' : 
                          dock.status === 'maintenance' ? 'text-amber-500' : 'text-red-500'
                        }`}>{dock.status}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteDock(dock.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WarehouseSettings;
