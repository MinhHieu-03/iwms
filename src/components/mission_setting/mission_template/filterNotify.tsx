import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Select, DatePicker, Button } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

interface SearchFormProps {
  filters: {
    task_log_id: string;
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
          <label className="block text-sm font-medium mb-1">Task log id</label>
          <Input
            placeholder="Task log id"
            value={filters.task_log_id}
            onChange={(e) =>
              onFilterChange({ ...filters, task_log_id: e.target.value })
            }
            prefix={<SearchOutlined />}
            allowClear
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <Select
            style={{ width: "100%" }}
            value={filters.status}
            onChange={(value) => onFilterChange({ ...filters, status: value })}
            allowClear
            placeholder="Chọn trạng thái"
          >
            <Select.Option value="created">Created</Select.Option>
            <Select.Option value="done">Done</Select.Option>
            <Select.Option value="failed">Failed</Select.Option>
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
            showTime
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
