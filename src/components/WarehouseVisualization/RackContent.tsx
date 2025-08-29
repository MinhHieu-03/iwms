import React from "react";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { RackContentProps } from "./types";

const RackContent: React.FC<RackContentProps> = ({ rack }) => {
  const { t } = useTranslation();

  return (
    <div className="w-80 p-0">
      <div className="bg-warehouse-primary text-white px-3 py-2 text-sm font-medium rounded-md">
        {rack.locationCode}
      </div>
      <div className="p-3 dark:bg-gray-800">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>{t("common.status")}:</span>
            <Badge
              variant={rack.status === "occupied" ? "default" : "secondary"}
            >
              <span className="capitalize">
                {t(`status.${rack.status}`) || rack.status.replace("_", " ")}
              </span>
            </Badge>
          </div>

          {rack?.skus?.length > 0 && (
            <div className="flex justify-between">
              <span>{t("sku_config")}:</span>
              <span>{rack.skus.join(", ")}</span>
            </div>
          )}

          {rack?.inventory?.sku && (
            <div className="flex justify-between">
              <span>{t("sku_store")}:</span>
              <span>{rack.inventory.sku}</span>
            </div>
          )}

          {rack?.inventory?.store && (
            <p className="mt-5 font-semibold">{t("store_item")}: </p>
          )}

          {rack?.inventory?.store?.map(
            ({ key, qty }: { key: string; qty: number }, index: number) => (
              <div key={index} className="flex justify-between">
                <span>{key}:</span>
                <span>{qty}</span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default RackContent;
