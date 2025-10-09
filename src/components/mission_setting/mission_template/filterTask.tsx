import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Select, DatePicker, Button } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

interface SearchFormProps {
  filters: {
    mission_log_id: string;
    status: string | null;
    from_time: null;
    to_time: null;
  };
  onFilterChange: (values: any) => void;
  onSubmit: () => void;
}

const SearchForm = ({ filters, onFilterChange, onSubmit }: SearchFormProps) => {
  return (
    <div className="mb-4 space-y-4 p-4 border rounded-md bg-gray-50">
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Mission Log ID
          </label>
          <Input
            placeholder="Mission Log ID"
            value={filters.mission_log_id}
            onChange={(e) =>
              onFilterChange({ ...filters, mission_log_id: e.target.value })
            }
            prefix={<SearchOutlined />}
            allowClear
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <Select
            placeholder="Trạng thái"
            value={filters.status}
            onChange={(value) => onFilterChange({ ...filters, status: value })}
            allowClear
            style={{ width: "100%" }}
          >
            <Select.Option value="created">Created</Select.Option>
            <Select.Option value="begin notify">Begin Notify</Select.Option>
            <Select.Option value="done">Done</Select.Option>
            <Select.Option value="end notify">End Notify</Select.Option>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ngày</label>
          <RangePicker
            style={{ width: "100%" }}
            value={
              filters.from_time && filters.to_time
                ? [dayjs(filters.from_time), dayjs(filters.to_time)]
                : null
            }
            onChange={(dates, dateStrings) =>
              onFilterChange({
                ...filters,
                from_time: dateStrings?.[0] || null,
                to_time: dateStrings?.[1] || null,
              })
            }
            allowClear
            showTime //
            format="YYYY-MM-DD HH:mm:ss"
          />
        </div>
        <div className="h-full flex items-end">
          <Button type="primary" onClick={onSubmit} className="w-full">
            <FilterOutlined />
            Lọc
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
