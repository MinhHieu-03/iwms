import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "@/components/ui/button";

interface SearchFormProps {
  filters: {
    sku: string;
    location: string;
    product_name: string;
    status: string | null;
  };
  onFilterChange: (values: any) => void;
  handleFilter: (values: any) => void;
  showFilters: boolean;
}

const SearchForm = ({
  filters,
  onFilterChange,
  handleFilter,
  showFilters,
}: SearchFormProps) => {
  if (!showFilters) return null;

  return (
    <div className="mb-4 space-y-4 p-4 border rounded-md bg-gray-50">
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">SKU</label>
          <Input
            placeholder="Search SKU"
            value={filters.sku}
            onChange={(e) => {
              const newFilters = { ...filters, sku: e.target.value };
              onFilterChange(newFilters);
              handleFilter(newFilters);
            }}
            prefix={<SearchOutlined />}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <Input
            placeholder="Search location"
            value={filters.location}
            onChange={(e) => {
              const newFilters = { ...filters, location: e.target.value };
              onFilterChange(newFilters);
              handleFilter(newFilters);
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <Input
            placeholder="Search product name"
            value={filters.product_name}
            onChange={(e) => {
              const newFilters = { ...filters, product_name: e.target.value };
              onFilterChange(newFilters);
              handleFilter(newFilters);
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <Select
            placeholder="Select status"
            value={filters.status}
            onChange={(value) => {
              const newFilters = { ...filters, status: value };
              onFilterChange(newFilters);
              handleFilter(newFilters);
            }}
            allowClear
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
