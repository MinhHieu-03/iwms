import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Filter } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import {
  warehouses,
  warehouseAreas,
  racks,
  pricingRules,
  type Warehouse,
  type WarehouseArea,
  type Rack,
  type PricingRule
} from "@/data/warehouseData";

const LayoutConfig = () => {
  const { toast } = useToast();

  // Use data from warehouseData.ts instead of mock data
  const [warehousesData, setWarehousesData] = useState<Warehouse[]>(warehouses);
  const [areasData, setAreasData] = useState<WarehouseArea[]>(warehouseAreas);
  const [racksData, setRacksData] = useState<Rack[]>(racks);
  const [pricingData, setPricingData] = useState<PricingRule[]>(pricingRules);

  const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null);
  const [editingArea, setEditingArea] = useState<WarehouseArea | null>(null);
  const [editingRack, setEditingRack] = useState<Rack | null>(null);
  const [editingPricing, setEditingPricing] = useState<PricingRule | null>(null);

  const [warehouseDialogOpen, setWarehouseDialogOpen] = useState(false);
  const [areaDialogOpen, setAreaDialogOpen] = useState(false);
  const [rackDialogOpen, setRackDialogOpen] = useState(false);
  const [pricingDialogOpen, setPricingDialogOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const variants = {
      empty: "secondary",
      occupied: "default",
      maintenance: "destructive",
      reserved: "outline",
      active: "default",
      inactive: "secondary"
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status}
      </Badge>
    );
  };

  const handleSaveWarehouse = (formData: FormData) => {
    const warehouse: Warehouse = {
      id: editingWarehouse?.id || `wh-${Date.now()}`,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      status: formData.get("status") as "active" | "inactive" | "maintenance",
      totalAreas: parseInt(formData.get("totalAreas") as string) || 0,
      totalRacks: parseInt(formData.get("totalRacks") as string) || 0
    };

    if (editingWarehouse) {
      setWarehousesData(prev => prev.map(w => w.id === warehouse.id ? warehouse : w));
      toast({ title: "Warehouse updated successfully" });
    } else {
      setWarehousesData(prev => [...prev, warehouse]);
      toast({ title: "Warehouse created successfully" });
    }

    setWarehouseDialogOpen(false);
    setEditingWarehouse(null);
  };

  const handleDeleteWarehouse = (id: string) => {
    setWarehousesData(prev => prev.filter(w => w.id !== id));
    toast({ title: "Warehouse deleted successfully" });
  };

  const handleSaveArea = (formData: FormData) => {
    const area: WarehouseArea = {
      id: editingArea?.id || `area-${Date.now()}`,
      warehouseId: formData.get("warehouseId") as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      type: formData.get("type") as WarehouseArea["type"],
      status: formData.get("status") as WarehouseArea["status"],
      capacity: parseInt(formData.get("capacity") as string) || 0,
      currentUtilization: parseInt(formData.get("currentUtilization") as string) || 0,
      createdAt: editingArea?.createdAt || new Date().toISOString()
    };

    if (editingArea) {
      setAreasData(prev => prev.map(a => a.id === area.id ? area : a));
      toast({ title: "Area updated successfully" });
    } else {
      setAreasData(prev => [...prev, area]);
      toast({ title: "Area created successfully" });
    }

    setAreaDialogOpen(false);
    setEditingArea(null);
  };

  const handleDeleteArea = (id: string) => {
    setAreasData(prev => prev.filter(a => a.id !== id));
    toast({ title: "Area deleted successfully" });
  };

  const handleSaveRack = (formData: FormData) => {
    const rack: Rack = {
      id: editingRack?.id || `rack-${Date.now()}`,
      areaId: formData.get("areaId") as string,
      locationCode: formData.get("locationCode") as string,
      row: parseInt(formData.get("row") as string) || 0,
      column: parseInt(formData.get("column") as string) || 0,
      level: parseInt(formData.get("level") as string) || 0,
      status: formData.get("status") as Rack["status"],
      warehouse: formData.get("warehouse") as string,
      area: formData.get("area") as string,
      capacity: parseInt(formData.get("capacity") as string) || 0,
      currentLoad: parseInt(formData.get("currentLoad") as string) || 0,
      dimensions: {
        width: parseFloat(formData.get("width") as string) || 0,
        height: parseFloat(formData.get("height") as string) || 0,
        depth: parseFloat(formData.get("depth") as string) || 0
      },
      createdAt: editingRack?.createdAt || new Date().toISOString()
    };

    if (editingRack) {
      setRacksData(prev => prev.map(r => r.id === rack.id ? rack : r));
      toast({ title: "Rack updated successfully" });
    } else {
      setRacksData(prev => [...prev, rack]);
      toast({ title: "Rack created successfully" });
    }

    setRackDialogOpen(false);
    setEditingRack(null);
  };

  const handleDeleteRack = (id: string) => {
    setRacksData(prev => prev.filter(r => r.id !== id));
    toast({ title: "Rack deleted successfully" });
  };

  return (
    <Tabs defaultValue="warehouse-areas" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="warehouse-areas">Warehouse Areas</TabsTrigger>
        <TabsTrigger value="area-structure">Area Structure</TabsTrigger>
        <TabsTrigger value="racks" className="flex-1 min-w-0">Rack Structure</TabsTrigger>
      </TabsList>

      <TabsContent value="warehouse-areas" className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Warehouse Area Management</CardTitle>
              <Dialog open={areaDialogOpen} onOpenChange={setAreaDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => { setEditingArea(null); setAreaDialogOpen(true); }}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Area
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingArea ? "Edit Area" : "Create New Area"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={(e) => { e.preventDefault(); handleSaveArea(new FormData(e.currentTarget)); }} className="space-y-4">
                    <div>
                      <Label htmlFor="warehouseId">Warehouse</Label>
                      <Select name="warehouseId" defaultValue={editingArea?.warehouseId || (warehousesData[0]?.id || "")}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {warehousesData.map(w => (
                            <SelectItem key={w.id} value={w.id}>{w.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="name">Area Name</Label>
                      <Input
                        id="name"
                        name="name"
                        defaultValue={editingArea?.name || ""}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        name="description"
                        defaultValue={editingArea?.description || ""}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select name="type" defaultValue={editingArea?.type || "storage"}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="storage">Storage</SelectItem>
                          <SelectItem value="inbound">Inbound</SelectItem>
                          <SelectItem value="outbound">Outbound</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="quality_control">Quality Control</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select name="status" defaultValue={editingArea?.status || "active"}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="capacity">Capacity</Label>
                        <Input
                          id="capacity"
                          name="capacity"
                          type="number"
                          defaultValue={editingArea?.capacity || 0}
                        />
                      </div>
                      <div>
                        <Label htmlFor="currentUtilization">Current Utilization</Label>
                        <Input
                          id="currentUtilization"
                          name="currentUtilization"
                          type="number"
                          defaultValue={editingArea?.currentUtilization || 0}
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      {editingArea ? "Update" : "Create"} Area
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>STT</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Utilization</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {areasData.map((area, index) => (
                  <TableRow key={area.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{area.name}</TableCell>
                    <TableCell>{area.description}</TableCell>
                    <TableCell>{area.type}</TableCell>
                    <TableCell>{getStatusBadge(area.status)}</TableCell>
                    <TableCell>{area.capacity}</TableCell>
                    <TableCell>{area.currentUtilization}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => { setEditingArea(area); setAreaDialogOpen(true); }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500"
                          onClick={() => handleDeleteArea(area.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="area-structure" className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Area Structure Configuration</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>STT</TableHead>
                  <TableHead>Warehouse</TableHead>
                  <TableHead>Area Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Utilization</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {areasData.map((area, index) => {
                  const warehouse = warehousesData.find(w => w.id === area.warehouseId);
                  return (
                    <TableRow key={area.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{warehouse?.name || 'Unknown'}</TableCell>
                      <TableCell>{area.name}</TableCell>
                      <TableCell>{area.type}</TableCell>
                      <TableCell>{getStatusBadge(area.status)}</TableCell>
                      <TableCell>{area.capacity}</TableCell>
                      <TableCell>{area.currentUtilization}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="racks" className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Rack Structure Management</CardTitle>
              <Dialog open={rackDialogOpen} onOpenChange={setRackDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => { setEditingRack(null); setRackDialogOpen(true); }}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Rack
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingRack ? "Edit Rack" : "Create New Rack"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={(e) => { e.preventDefault(); handleSaveRack(new FormData(e.currentTarget)); }} className="space-y-4">
                    <div>
                      <Label htmlFor="areaId">Area</Label>
                      <Select name="areaId" defaultValue={editingRack?.areaId || (areasData[0]?.id || "")}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {areasData.map(a => (
                            <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="locationCode">Location Code</Label>
                      <Input
                        id="locationCode"
                        name="locationCode"
                        defaultValue={editingRack?.locationCode || ""}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="row">Row</Label>
                        <Input
                          id="row"
                          name="row"
                          type="number"
                          defaultValue={editingRack?.row || 0}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="column">Column</Label>
                        <Input
                          id="column"
                          name="column"
                          type="number"
                          defaultValue={editingRack?.column || 0}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="level">Level</Label>
                        <Input
                          id="level"
                          name="level"
                          type="number"
                          defaultValue={editingRack?.level || 0}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select name="status" defaultValue={editingRack?.status || "empty"}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="empty">Empty</SelectItem>
                          <SelectItem value="occupied">Occupied</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="reserved">Reserved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="warehouse">Warehouse</Label>
                      <Input
                        id="warehouse"
                        name="warehouse"
                        defaultValue={editingRack?.warehouse || ""}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="area">Area</Label>
                      <Input
                        id="area"
                        name="area"
                        defaultValue={editingRack?.area || ""}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="capacity">Capacity</Label>
                        <Input
                          id="capacity"
                          name="capacity"
                          type="number"
                          defaultValue={editingRack?.capacity || 0}
                        />
                      </div>
                      <div>
                        <Label htmlFor="currentLoad">Current Load</Label>
                        <Input
                          id="currentLoad"
                          name="currentLoad"
                          type="number"
                          defaultValue={editingRack?.currentLoad || 0}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="width">Width (m)</Label>
                        <Input
                          id="width"
                          name="width"
                          type="number"
                          step="0.01"
                          defaultValue={editingRack?.dimensions?.width || 0}
                        />
                      </div>
                      <div>
                        <Label htmlFor="height">Height (m)</Label>
                        <Input
                          id="height"
                          name="height"
                          type="number"
                          step="0.01"
                          defaultValue={editingRack?.dimensions?.height || 0}
                        />
                      </div>
                      <div>
                        <Label htmlFor="depth">Depth (m)</Label>
                        <Input
                          id="depth"
                          name="depth"
                          type="number"
                          step="0.01"
                          defaultValue={editingRack?.dimensions?.depth || 0}
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      {editingRack ? "Update" : "Create"} Rack
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Location Code</TableHead>
                  <TableHead>Row</TableHead>
                  <TableHead>Column</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Warehouse</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Current Load</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {racksData.map((rack) => (
                  <TableRow key={rack.id}>
                    <TableCell className="font-medium">{rack.locationCode}</TableCell>
                    <TableCell>{rack.row}</TableCell>
                    <TableCell>{rack.column}</TableCell>
                    <TableCell>{rack.level}</TableCell>
                    <TableCell>{getStatusBadge(rack.status)}</TableCell>
                    <TableCell>{rack.warehouse}</TableCell>
                    <TableCell>{rack.area}</TableCell>
                    <TableCell>{rack.capacity}</TableCell>
                    <TableCell>{rack.currentLoad}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => { setEditingRack(rack); setRackDialogOpen(true); }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500"
                          onClick={() => handleDeleteRack(rack.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default LayoutConfig;
