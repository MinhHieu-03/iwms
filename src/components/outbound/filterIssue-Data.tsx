import { Input, InputNumber, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

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
export const lang_key = "issue_time_schedule";

const FilterForm = ({
  filters,
  onFilterChange,
  showFilters,
}: SearchFormProps) => {
  const { t } = useTranslation();
  if (!showFilters) return null;

  return (
    <div className="mb-4 space-y-4 p-4 border rounded-md bg-gray-50">
      <div className="grid grid-cols-5 gap-4">
        {/* Material No */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {t(`${lang_key}.oi_modal.material_no`)}
          </label>
          <Input
            placeholder={t(`${lang_key}.oi_modal.material_no`)}
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
          <label className="block text-sm font-medium mb-1">
            {t(`${lang_key}.form.section`)}
          </label>
          <Input
            placeholder={t(`${lang_key}.form.section`)}
            value={filters.section_c || ""}
            onChange={(e) =>
              onFilterChange({ ...filters, section_c: e.target.value })
            }
            allowClear
          />
        </div>

        {/* Line */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {t(`${lang_key}.form.line`)}
          </label>
          <Input
            placeholder={t(`${lang_key}.form.line`)}
            value={filters.line_c || ""}
            onChange={(e) =>
              onFilterChange({ ...filters, line_c: e.target.value })
            }
            allowClear
          />
        </div>

        {/* Issue Qty */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {t(`${lang_key}.modal.issue_qty`)}
          </label>
          <InputNumber
            placeholder={t(`${lang_key}.modal.issue_qty`)}
            value={filters.issue_qty ?? undefined}
            onChange={(value) =>
              onFilterChange({ ...filters, issue_qty: value })
            }
            style={{ width: "100%" }}
          />
        </div>

        {/* Issued Qty */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {t(`${lang_key}.modal.issued_qty`)}
          </label>
          <InputNumber
            placeholder={t(`${lang_key}.modal.issued_qty`)}
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