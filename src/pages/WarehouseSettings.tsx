
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Warehouse, Layout, Database, Edit, Save, X, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";
import LayoutConfig from "@/components/warehouse-settings/LayoutConfig";
import StorageModelConfig from "@/components/warehouse-settings/StorageModelConfig";

const WarehouseSettings = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("layout");

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Settings Saved",
      description: "Warehouse configuration has been updated successfully.",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-warehouse-primary/10 to-warehouse-secondary/10 rounded-lg p-6 border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-warehouse-primary/20 p-3 rounded-lg">
              <Warehouse className="h-8 w-8 text-warehouse-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t('warehouse_settings')}</h1>
              <p className="text-muted-foreground">Configure warehouse layout, storage models, and operational parameters</p>
            </div>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleCancel} variant="outline">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-warehouse-primary hover:bg-warehouse-primary/90">
                  <Save className="h-4 w-4 mr-2" />
                  {t('save_changes')}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="bg-warehouse-primary hover:bg-warehouse-primary/90">
                <Edit className="h-4 w-4 mr-2" />
                Edit Configuration
              </Button>
            )}
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="layout" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <Layout className="h-4 w-4 mr-2" />
            {t('layout_config')}
          </TabsTrigger>
          <TabsTrigger value="storage" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <Database className="h-4 w-4 mr-2" />
            {t('storage_model')}
          </TabsTrigger>
          <TabsTrigger value="operations" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <Settings className="h-4 w-4 mr-2" />
            Operations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="layout" className="mt-6">
          <LayoutConfig />
        </TabsContent>

        <TabsContent value="storage" className="mt-6">
          <StorageModelConfig />
        </TabsContent>

        <TabsContent value="operations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Operational Parameters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Robot Configuration</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Max Concurrent Missions</label>
                        <p className="text-2xl font-bold">25</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Default Speed (m/s)</label>
                        <p className="text-2xl font-bold">1.5</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Safety Parameters</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Emergency Stop Zones</label>
                        <p className="text-2xl font-bold">12</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Safety Distance (m)</label>
                        <p className="text-2xl font-bold">0.5</p>
                      </div>
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
