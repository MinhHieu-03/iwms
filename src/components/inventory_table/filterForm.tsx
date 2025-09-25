import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface SearchFormProps {
  filters: {
    sku: string;
    product_name: string;
    locationId: string;
    locationCode: string;
    store: any[];
    status: string | null;
  };
  onFilterChange: (values: any) => void;
  showFilters: boolean;
}
export enum INVENTORY_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
  DAMAGED = "DAMAGED",
  RESERVED = "RESERVED",
  FILL = "fill",
  WAIT_OUTBOUND = "wait_outbound",
  WAIT_FILL = "wait_fill",
  OUT_OF_STOCK = "out_of_stock",
}
interface StoreItem {
  key: string;
  qty: number;
}

const SearchForm = ({
  filters,
  onFilterChange,
  showFilters,
}: SearchFormProps) => {
  if (!showFilters) return null;
  const { t } = useTranslation();

  return (
    <div className="mb-4 space-y-4 p-4 border rounded-md bg-gray-50">
      <div className="grid grid-cols-4 gap-4">
        {/* Location Code */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {t("inventory.location_code")}
          </label>
          <Input
            placeholder={t("inventory.location_code_placeholder")}
            value={filters.locationCode}
            onChange={(e) =>
              onFilterChange({ ...filters, locationCode: e.target.value })
            }
          />
        </div>
        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {t("inventory.status")}
          </label>
          <Select
            placeholder={t("inventory.status_placeholder")}
            value={filters.status}
            onChange={(value) => onFilterChange({ ...filters, status: value })}
            allowClear
            style={{ width: "100%" }}
          >
            {Object.entries(INVENTORY_STATUS).map(([key, value]) => (
              <Select.Option key={value} value={value}>
                {key} {/* hoặc value nếu muốn hiển thị đúng chữ enum */}
              </Select.Option>
            ))}
          </Select>
        </div>
        {/* SKU */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {t("inventory.sku")}
          </label>
          <Input
            placeholder={t("inventory.sku_placeholder")}
            value={filters.sku}
            onChange={(e) =>
              onFilterChange({ ...filters, sku: e.target.value })
            }
          />
        </div>
        {/* Store */}
        {/* <div>
          <label className="block text-sm font-medium mb-1">
            {t("inventory.store_items")}
          </label>
          <Select
            mode="multiple"
            placeholder={t("inventory.store_items")}
            value={filters.store}
            onChange={(value) => onFilterChange({ ...filters, store: value })}
            allowClear
            style={{ width: "100%" }}
          >
            <Select.Option value="store1">Store 1</Select.Option>
            <Select.Option value="store2">Store 2</Select.Option>
            <Select.Option value="store3">Store 3</Select.Option>
          </Select>
        </div> */}
      </div>
    </div>
  );
};

export default SearchForm;
