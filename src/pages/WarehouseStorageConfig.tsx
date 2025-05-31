
import React from "react";
import { Package } from "lucide-react";
import StorageModelConfig from "@/components/warehouse-settings/StorageModelConfig";

const WarehouseStorageConfig = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Package className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Storage Model Configuration</h1>
      </div>

      <StorageModelConfig />
    </div>
  );
};

export default WarehouseStorageConfig;
