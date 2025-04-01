
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Warehouse, Save, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const WarehouseSettings = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
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
        title: t('zone_added'),
        description: `${newZone.name} ${t('zone_added_description')}`,
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
        title: t('dock_added'),
        description: `${newDock.name} ${t('dock_added_description')}`,
      });
    }
  };

  const handleDeleteZone = (id: string) => {
    setZones(zones.filter(zone => zone.id !== id));
    toast({
      title: t('zone_deleted'),
      description: t('zone_deleted_description'),
    });
  };

  const handleDeleteDock = (id: string) => {
    setDocks(docks.filter(dock => dock.id !== id));
    toast({
      title: t('dock_deleted'),
      description: t('dock_deleted_description'),
    });
  };

  const handleSaveStructure = () => {
    toast({
      title: t('structure_saved'),
      description: t('structure_saved_description'),
    });
    // In a real app, we would save to a database here
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t('warehouse_settings')}</h2>
        <Button onClick={handleSaveStructure}>
          <Save className="mr-2 h-4 w-4" />
          {t('save_structure')}
        </Button>
      </div>

      <Tabs defaultValue="zones">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="zones">{t('storage_zones')}</TabsTrigger>
          <TabsTrigger value="docks">{t('loading_docks')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="zones" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Warehouse className="mr-2 h-5 w-5" />
                {t('add_zone')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zoneName">{t('zone_name')}</Label>
                  <Input 
                    id="zoneName" 
                    value={newZone.name}
                    onChange={(e) => setNewZone({...newZone, name: e.target.value})}
                    placeholder="e.g., Storage Zone C"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zoneRows">{t('number_of_rows')}</Label>
                  <Input 
                    id="zoneRows" 
                    type="number" 
                    value={newZone.rows}
                    onChange={(e) => setNewZone({...newZone, rows: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zoneColumns">{t('number_of_columns')}</Label>
                  <Input 
                    id="zoneColumns" 
                    type="number" 
                    value={newZone.columns}
                    onChange={(e) => setNewZone({...newZone, columns: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zoneShelfLevels">{t('shelf_levels')}</Label>
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
                {t('add_zone')}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('configured_storage_zones')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {zones.map((zone) => (
                  <div key={zone.id} className="border rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{zone.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {zone.rows} {t('rows')} × {zone.columns} {t('columns')} × {zone.shelfLevels} {t('levels')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">{t('edit')}</Button>
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
              <CardTitle>{t('add_loading_dock')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dockName">{t('dock_name')}</Label>
                  <Input 
                    id="dockName" 
                    value={newDock.name}
                    onChange={(e) => setNewDock({...newDock, name: e.target.value})}
                    placeholder="e.g., Dock 8"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dockType">{t('dock_type')}</Label>
                  <Select
                    value={newDock.type}
                    onValueChange={(value) => setNewDock({...newDock, type: value})}
                  >
                    <SelectTrigger id="dockType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inbound">{t('inbound')}</SelectItem>
                      <SelectItem value="outbound">{t('outbound')}</SelectItem>
                      <SelectItem value="both">{t('both')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dockStatus">{t('status')}</Label>
                  <Select
                    value={newDock.status}
                    onValueChange={(value) => setNewDock({...newDock, status: value})}
                  >
                    <SelectTrigger id="dockStatus">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">{t('active')}</SelectItem>
                      <SelectItem value="maintenance">{t('maintenance')}</SelectItem>
                      <SelectItem value="inactive">{t('inactive')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleAddDock} className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                {t('add_dock')}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('configured_loading_docks')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {docks.map((dock) => (
                  <div key={dock.id} className="border rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{dock.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t('type')}: <span className="capitalize">{t(dock.type as TranslationKey)}</span> • 
                        {t('status')}: <span className={`capitalize ${
                          dock.status === 'active' ? 'text-green-500' : 
                          dock.status === 'maintenance' ? 'text-amber-500' : 'text-red-500'
                        }`}>{t(dock.status as TranslationKey)}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">{t('edit')}</Button>
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
