import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Filter, Building2, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import WarehousesManagement from "@/components/warehouses_management";
import AreaManagement from "@/components/area_management";
import RackManagement from "@/components/rack_management";
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

const WarehouseLayoutConfig = () => {
  const { toast } = useToast();

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
      status: formData.get("status") as "active" | "inactive" | "maintenance",
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

  const handleSavePricing = (formData: FormData) => {
    const pricing: PricingRule = {
      id: editingPricing?.id || `price-${Date.now()}`,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      type: formData.get("type") as PricingRule["type"],
      unitType: formData.get("unitType") as PricingRule["unitType"],
      basePrice: parseFloat(formData.get("basePrice") as string) || 0,
      currency: formData.get("currency") as string,
      conditions: {
        minVolume: formData.get("minVolume") ? parseFloat(formData.get("minVolume") as string) : undefined,
        maxVolume: formData.get("maxVolume") ? parseFloat(formData.get("maxVolume") as string) : undefined,
        itemType: formData.get("itemType") as string || undefined,
        priority: formData.get("priority") as PricingRule["conditions"]["priority"] || undefined,
      },
      status: formData.get("status") as "active" | "inactive",
      createdAt: editingPricing?.createdAt || new Date().toISOString()
    };

    if (editingPricing) {
      setPricingData(prev => prev.map(p => p.id === pricing.id ? pricing : p));
      toast({ title: "Pricing rule updated successfully" });
    } else {
      setPricingData(prev => [...prev, pricing]);
      toast({ title: "Pricing rule created successfully" });
    }

    setPricingDialogOpen(false);
    setEditingPricing(null);
  };

  const handleDeletePricing = (id: string) => {
    setPricingData(prev => prev.filter(p => p.id !== id));
    toast({ title: "Pricing rule deleted successfully" });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="warehouses" className="w-full">
        <TabsList className="inline-flex gap-1 min-w-0 w-full">
          <TabsTrigger value="warehouses" className="flex-1 min-w-0 data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">Warehouses</TabsTrigger>
          <TabsTrigger value="areas" className="flex-1 min-w-0 data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">Areas</TabsTrigger>
          <TabsTrigger value="racks" className="flex-1 min-w-0 data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">Rack Structure</TabsTrigger>
        </TabsList>

        <TabsContent value="warehouses" className="space-y-4">
          <WarehousesManagement />
        </TabsContent>

        <TabsContent value="areas" className="space-y-4">
          <AreaManagement />
        </TabsContent>

        <TabsContent value="racks" className="space-y-4">
          <RackManagement />
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default WarehouseLayoutConfig;
