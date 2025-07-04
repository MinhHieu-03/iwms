import React from "react";
import { useTranslation } from "react-i18next";
import InventoryTable from "@/components/inventory_table";

const Inventory = () => {
  const { t } = useTranslation();

  return (
    <div>
      <InventoryTable />
    </div>
  );
};

export default Inventory;
