import { Input, InputNumber, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface SearchFormProps {
  filters: {
    material_no: string | null;
    section_c: string | null;
    line_c: string | null;
    issue_qty: number | null;
    issued_qty: number | null;
  };
  onFilterChange: (values: any) => void;
  showFilters: boolean;
}

const FilterForm = ({
  filters,
  onFilterChange,
  showFilters,
}: SearchFormProps) => {
  if (!showFilters) return null;

  return (
    <div className="mb-4 space-y-4 p-4 border rounded-md bg-gray-50">
      <div className="grid grid-cols-5 gap-4">
        {/* Material No */}
        <div>
          <label className="block text-sm font-medium mb-1">Material No</label>
          <Input
            placeholder="Nhập material no"
            value={filters.material_no || ""}
            onChange={(e) =>
              onFilterChange({ ...filters, material_no: e.target.value })
            }
            prefix={<SearchOutlined />}
            allowClear
          />
        </div>

        {/* Section */}
        <div>
          <label className="block text-sm font-medium mb-1">Section</label>
          <Input
            placeholder="Nhập section"
            value={filters.section_c || ""}
            onChange={(e) =>
              onFilterChange({ ...filters, section_c: e.target.value })
            }
            allowClear
          />
        </div>

        {/* Line */}
        <div>
          <label className="block text-sm font-medium mb-1">Line</label>
          <Input
            placeholder="Nhập line"
            value={filters.line_c || ""}
            onChange={(e) =>
              onFilterChange({ ...filters, line_c: e.target.value })
            }
            allowClear
          />
        </div>

        {/* Issue Qty */}
        <div>
          <label className="block text-sm font-medium mb-1">Issue Qty</label>
          <InputNumber
            placeholder="Nhập issue qty"
            value={filters.issue_qty ?? undefined}
            onChange={(value) =>
              onFilterChange({ ...filters, issue_qty: value })
            }
            style={{ width: "100%" }}
          />
        </div>

        {/* Issued Qty */}
        <div>
          <label className="block text-sm font-medium mb-1">Issued Qty</label>
          <InputNumber
            placeholder="Nhập issued qty"
            value={filters.issued_qty ?? undefined}
            onChange={(value) =>
              onFilterChange({ ...filters, issued_qty: value })
            }
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterForm;
