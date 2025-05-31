
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Warehouse, Settings2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LayoutConfig from "@/components/warehouse-settings/LayoutConfig";
import StorageModelConfig from "@/components/warehouse-settings/StorageModelConfig";

const WarehouseSettings = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("layout-config");

  const settingSections = [
    { value: "layout-config", label: "Layout Configuration" },
    { value: "storage-model", label: "Storage Model Configuration" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold">{t('warehouse_settings')}</h2>
          <Select value={activeSection} onValueChange={setActiveSection}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select configuration type" />
            </SelectTrigger>
            <SelectContent>
              {settingSections.map((section) => (
                <SelectItem key={section.value} value={section.value}>
                  {section.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="min-h-[600px]">
        {activeSection === "layout-config" && <LayoutConfig />}
        {activeSection === "storage-model" && <StorageModelConfig />}
      </div>
    </div>
  );
};

export default WarehouseSettings;
