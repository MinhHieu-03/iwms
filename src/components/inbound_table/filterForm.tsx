import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "@/components/ui/button";

interface SearchFormProps {
  filters: {
    sku: string;
    origin: string;
    product_name: string;
    destination: string;
    status: string | null;
  };
  onFilterChange: (values: any) => void;
  showFilters: boolean;
}

const SearchForm = ({
  filters,
  onFilterChange,
  showFilters,
}: SearchFormProps) => {
  if (!showFilters) return null;

  return (
    <div className="mb-4 space-y-4 p-4 border rounded-md bg-gray-50">
      <div className="grid grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">SKU</label>
          <Input
            placeholder="Mã vật tư"
            value={filters.sku}
            onChange={(e) =>
              onFilterChange({ ...filters, sku: e.target.value })
            }
            prefix={<SearchOutlined />}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Origin</label>
          <Select
            placeholder="Phân loại"
            value={filters.origin}
            onChange={(value) => onFilterChange({ ...filters, origin: value })}
            allowClear
            style={{ width: "100%" }}
          >
            <Select.Option value="inbound">Inbound</Select.Option>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <Input
            placeholder="Tên vật tư"
            value={filters.product_name}
            onChange={(e) =>
              onFilterChange({ ...filters, product_name: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Destination</label>
          <Input
            placeholder="Vị trí lưu kho"
            value={filters.destination}
            onChange={(e) =>
              onFilterChange({ ...filters, destination: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <Select
            placeholder="Trạng thái"
            value={filters.status}
            onChange={(value) => onFilterChange({ ...filters, status: value })}
            allowClear
            style={{ width: "100%" }}
          >
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="in_progress">In Progress</Select.Option>
            <Select.Option value="completed">Completed</Select.Option>
            <Select.Option value="cancelled">Cancelled</Select.Option>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
