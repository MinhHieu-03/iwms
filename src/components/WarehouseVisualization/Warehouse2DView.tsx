import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Map as MapIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Rack } from "@/data/warehouseData";
import apiClient from "@/lib/axios";
import { Warehouse2DViewProps } from "./types";
import { STATUS_COLOR } from "./constants";
import { generateCellId } from "./utils";
import RackGrid from "./RackGrid";

const Warehouse2DView: React.FC<Warehouse2DViewProps> = ({
  area,
  hoveredRack,
  onRackHover,
}) => {
  const { t } = useTranslation();

  const {
    data: rackGroups = new Map<string, Rack[]>(),
    isLoading,
    error,
  } = useQuery({
    queryKey: ["area-data", area],
    queryFn: async () => {
      const { data } = await apiClient.get("/area", { area_config: area });
      const convertedData: Record<string, Rack[]> = {};

      data.metaData.forEach((item: any) => {
        const { row, column, location_code, _id } = item;
        const rackList: Rack[] = [];

        for (let i = 1; i <= row; i++) {
          for (let j = 1; j <= column; j++) {
            const locationCode = generateCellId(location_code, i, j);
            rackList.push({
              _id,
              areaId: locationCode,
              id: locationCode,
              locationCode,
              location_code: locationCode,
              capacity: row * column,
              row: i,
              column: j,
              level: 1,
              skus: [],
              status: "empty" as const,
              warehouse: area || "",
              area: location_code,
              currentLoad: 0,
              dimensions: {
                width: 1,
                height: 1,
                depth: 1,
              },
              createdAt: new Date().toISOString(),
            });
          }
        }
        convertedData[item.location_code] = rackList;
      });
      
      return new Map(Object.entries(convertedData));
    },
    enabled: !!area,
  });

  return (
    <div className="space-y-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapIcon className="h-5 w-5" />
            {t("warehouse.2d_view")}
          </CardTitle>

          <div className="flex flex-wrap gap-2 text-xs">
            {Object.keys(STATUS_COLOR).map((status) => (
              <div key={status} className="flex items-center gap-1">
                <div
                  className={`w-3 h-3 ${STATUS_COLOR[status]} rounded`}
                ></div>
                <span>{t(`status.${status}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>
      
      {isLoading && (
        <div className="p-4 text-center">
          <div className="text-sm text-gray-500">{t("loading")}...</div>
        </div>
      )}
      
      {error && (
        <div className="p-4 text-center">
          <div className="text-sm text-red-500">
            {t("error.fetch_failed")}: {error.message}
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {Array.from(rackGroups.entries()).map(([rackId, rackList], index) => (
          <RackGrid
            area={area}
            index={index}
            key={rackId}
            rackId={rackId}
            racks={rackList}
            hoveredRack={hoveredRack}
            onRackHover={onRackHover}
          />
        ))}
      </div>
    </div>
  );
};

export default Warehouse2DView;
