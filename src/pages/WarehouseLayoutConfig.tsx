import AreaManagement from "@/components/area_management";
import RackManagement from "@/components/rack_management";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WarehousesManagement from "@/components/warehouses_management";
import { useI18n } from "@/contexts/useI18n";

const WarehouseLayoutConfig = () => {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <Tabs defaultValue="warehouses" className="w-full">
        <TabsList className="inline-flex gap-1 min-w-0 w-full">
          <TabsTrigger value="warehouses" className="flex-1 min-w-0 data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            {t('warehouse_layout_config.warehouses_tab')}
          </TabsTrigger>
          <TabsTrigger value="areas" className="flex-1 min-w-0 data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            {t('warehouse_layout_config.areas_tab')}
          </TabsTrigger>
          <TabsTrigger value="racks" className="flex-1 min-w-0 data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            {t('warehouse_layout_config.racks_tab')}
          </TabsTrigger>
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
