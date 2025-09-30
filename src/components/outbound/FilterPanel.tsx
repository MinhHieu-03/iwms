import { DatePicker, Input, Select } from 'antd';
import { Dayjs } from 'dayjs';
import { Button } from '@/components/ui/button';
import { mappingStatusTag, mappingTypeTag } from "./const";
import { useTranslation } from 'react-i18next';

const { RangePicker } = DatePicker;

interface FilterPanelProps {
  showFilters: boolean;
  filters: {
    issue_ord_no: string | null;
    status: string | null;
    type: string | null;
    timeIssueRange: [Dayjs, Dayjs] | null;
    aReqdTimeRange: [Dayjs, Dayjs] | null;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    issue_ord_no: string | null;
    status: string | null;
    type: string | null;
    timeIssueRange: [Dayjs, Dayjs] | null;
    aReqdTimeRange: [Dayjs, Dayjs] | null;
  }>>;
  filteredDataLength: number;
  dataListLength: number;
  hasActiveFilters: boolean;
  onFilterChange?: (newFilter: any) => void;
  clearFilters: () => void;
}

export const lang_key = "issue_time_schedule.table";

const FilterPanel: React.FC<FilterPanelProps> = ({
  showFilters,
  filters,
  setFilters,
  filteredDataLength,
  dataListLength,
  hasActiveFilters,
  onFilterChange,
  clearFilters,
}) => {
  const { t } = useTranslation();
  if (!showFilters) return null;

  return (
    <div className='bg-gray-50 p-4 rounded-lg border'>
      <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
        {/* Kit No Filter */}
        <div>
          <label className='block text-sm font-medium mb-2'>
            {t(`${lang_key}.issue_order_no`)}
          </label>
          <Input
            placeholder={t(`${lang_key}.issue_order_no`)}
            value={filters.issue_ord_no}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                issue_ord_no: e.target.value,
              }))
            }
            allowClear
            style={{ width: '100%' }}
          />
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {t(`${lang_key}.issue_status`)}
          </label>
          <Select
            placeholder={t(`${lang_key}.issue_status`)}
            value={filters.status}
            onChange={(value) => {
              if (onFilterChange) {
                onFilterChange({ status: value }); 
              } else {
                setFilters((prev) => ({ ...prev, status: value })); 
              }
            }}
            allowClear
            style={{ width: "100%" }}
            options={Object.entries(mappingStatusTag).map(([key]) => ({
              label: mappingStatusTag[key],
              value: key,
            }))}
          />
        </div>

        {/* Type Kit Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {t(`${lang_key}.issue_kit_type`)}
          </label>
          <Select
            placeholder={t(`${lang_key}.issue_kit_type`)}
            value={filters.type}
            onChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                type: value,
              }))
            }
            allowClear
            style={{ width: "100%" }}
            options={Object.entries(mappingTypeTag).map(([key]) => ({
              label: mappingTypeTag[key],
              value: key,
            }))}
          />
        </div>

        {/* Issue Time Range */}
        <div>
          <label className='block text-sm font-medium mb-2'>
            {t(`${lang_key}.issue_time`)}
          </label>
          <RangePicker
            placeholder={['From date', 'To date']}
            value={filters.timeIssueRange}
            onChange={(dates) =>
              setFilters((prev) => ({
                ...prev,
                timeIssueRange: dates,
              }))
            }
            style={{ width: '100%' }}
            showTime
            format='YYYY-MM-DD HH:mm'
          />
        </div>

        {/* Required Time Range */}
        <div>
          <label className='block text-sm font-medium mb-2'>
            {t(`${lang_key}.required_time`)}
          </label>
          <RangePicker
            placeholder={['From date', 'To date']}
            value={filters.aReqdTimeRange}
            onChange={(dates) =>
              setFilters((prev) => ({
                ...prev,
                aReqdTimeRange: dates,
              }))
            }
            style={{ width: '100%' }}
            showTime
            format='YYYY-MM-DD HH:mm'
          />
        </div>
      </div>

      {/* Filter Summary */}
      <div className='mt-3 pt-3 border-t border-gray-200'>
        <div className='flex items-center justify-between text-sm text-gray-600'>
          <span>
            Showing {filteredDataLength} of {dataListLength} records
          </span>
          {hasActiveFilters && (
            <Button
              size='sm'
              variant='ghost'
              onClick={clearFilters}
              className='text-blue-600 hover:text-blue-800'
            >
              Reset all filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;