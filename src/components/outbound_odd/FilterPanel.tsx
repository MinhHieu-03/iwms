import { DatePicker, Input } from 'antd';
import { Dayjs } from 'dayjs';
import { Button } from '@/components/ui/button';

const { RangePicker } = DatePicker;

interface FilterPanelProps {
  showFilters: boolean;
  filters: {
    issue_ord_no: string | null;
    timeIssueRange: [Dayjs, Dayjs] | null;
    aReqdTimeRange: [Dayjs, Dayjs] | null;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    issue_ord_no: string | null;
    timeIssueRange: [Dayjs, Dayjs] | null;
    aReqdTimeRange: [Dayjs, Dayjs] | null;
  }>>;
  filteredDataLength: number;
  dataListLength: number;
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  showFilters,
  filters,
  setFilters,
  filteredDataLength,
  dataListLength,
  hasActiveFilters,
  clearFilters,
}) => {
  if (!showFilters) return null;

  return (
    <div className='bg-gray-50 p-4 rounded-lg border'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {/* Kit No Filter */}
        <div>
          <label className='block text-sm font-medium mb-2'>
            Kit No.
          </label>
          <Input
            placeholder='Lọc theo Kit No.'
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

        {/* Issue Time Range */}
        <div>
          <label className='block text-sm font-medium mb-2'>
            Giờ bắt đầu cần cấp
          </label>
          <RangePicker
            placeholder={['Từ ngày', 'Đến ngày']}
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
            Giờ cần có mặt ở nhà máy
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