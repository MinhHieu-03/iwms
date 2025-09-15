import { Drawer, Descriptions, Tag, Table, Spin, Input, Select, Space, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { useState, useEffect, useMemo } from 'react';
import { creatMissionData } from '@/lib/dummyData';

const { Search } = Input;
const { Option } = Select;

interface ModalDetailProps {
  isOpen: boolean;
  onCancel: () => void;
  data?: any;
}

interface MissionData {
  _id: string;
  mission_no: string;
  package_no: string;
  material_no: string;
  quantity: number;
  supply_loc: string;
  receive_loc: string;
  robot_no: string;
  eta: string;
  status: string;
  issue_ord_no?: string;
  plan_issue_dt?: string;
  A_reqd_time?: string;
  time_issue?: string;
}

const ModalMission: React.FC<ModalDetailProps> = ({
  isOpen,
  onCancel,
  data,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [missionData, setMissionData] = useState<MissionData[]>([]);
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [materialNoFilter, setMaterialNoFilter] = useState<string>('');
  const [missionNoFilter, setMissionNoFilter] = useState<string>('');

  useEffect(() => {
    setMissionData(data);
  }, [data]);

  // Filter data based on selected filters
  const filteredData = useMemo(() => {
  //   const statusMatch = !statusFilter || item.status === statusFilter;
  //   const materialNoMatch = !materialNoFilter || 
  //     item.material_no?.toLowerCase().includes(materialNoFilter.toLowerCase());
  //   const missionNoMatch = !missionNoFilter || 
  //     item.mission_no?.toLowerCase().includes(missionNoFilter.toLowerCase());

  //   return statusMatch && materialNoMatch && missionNoMatch;
  // }, [statusFilter, materialNoFilter, missionNoFilter, missionData]);

  // Return the filtered mission data
  console.log('missionData', missionData);
  return missionData;
  }, [missionData]);

  // Predefined status options for filter
  

  //   const splitedData = data.reduce((acc: any[], record: any) => {
  //     const existingIndex = acc.findIndex(
  //       (item) =>
  //         item.line_c === record.line_c && item.material_no === record.material_no
  //     );
  //     if (existingIndex >= 0) {
  //       acc[existingIndex].issue_qty += record.issue_qty;
  //       if (!acc[existingIndex].issue_ord_no.includes(record.issue_ord_no)) {
  //         acc[existingIndex].issue_ord_no = [
  //           ...(Array.isArray(acc[existingIndex].issue_ord_no)
  //             ? acc[existingIndex].issue_ord_no
  //             : [acc[existingIndex].issue_ord_no]),
  //           record.issue_ord_no,
  //         ];
  //       }
  //       if (record.issued_qty) {
  //         acc[existingIndex].issued_qty =
  //           (acc[existingIndex].issued_qty || 0) + record.issued_qty;
  //       }
  //     } else {
  //       acc.push({ ...record });
  //     }
  //     return acc;
  //   }, []);

  const issueDataColumns = [
    {
      title: 'Mã nhiệm vụ',
      dataIndex: '_id',
      key: '_id',
      width: 150,
    },
    {
      title: 'loại nhiệm vụ',
      dataIndex: 'mission_type',
      key: 'mission_type',
      width: 150,
      render: (text) => text?.trim() || 'Xuất kho',
    },
    {
      title: 'Mã thùng',
      dataIndex: 'bin_id',
      key: 'bin_id',
      width: 100,
    },
    {
      title: 'Mã vật tư',
      dataIndex: 'inventory',
      key: 'inventory',
      width: 120,
      render: (inventory) => inventory?.material_no || 'N/A',
    },
    {
      title: 'Số lượng',
      dataIndex: 'inventory',
      key: 'inventory',
      width: 100,
      render: (inventory) => inventory?.qty || 'N/A',
    },
    {
      title: 'Vị trí cấp',
      dataIndex: 'origin',
      key: 'origin',
      width: 100,
      render: (origin) => origin || 'N/A',
    },
    {
      title: 'Vị trí nhận',
      dataIndex: 'destination',
      key: 'destination',
      width: 100,
    },
    {
      title: 'Robot',
      dataIndex: 'robot_no',
      key: 'robot_no',
      width: 100,
    },
    {
      title: 'ETA',
      dataIndex: 'eta',
      key: 'eta',
      width: 100,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'state',
      key: 'state',
      width: 100,
      sorter: (a, b) => {
        const statusOrder = { 'error': 0, 'new': 1, 'running': 2, 'done': 3 };
        const aOrder = statusOrder[a.status] !== undefined ? statusOrder[a.status] : 999;
        const bOrder = statusOrder[b.status] !== undefined ? statusOrder[b.status] : 999;
        return aOrder - bOrder;
      },
      sortDirections: ['ascend', 'descend'],
      render: (status) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            mapColor[status]}`}
        >
          {mapText[status] || status}
        </span>
      ),
    },
  ];

  return (
    <Drawer
      title={'Danh sách nhiệm vụ'}
      open={isOpen}
      onClose={onCancel}
      placement='bottom'
      height='90vh'
      className='issue-detail-drawer'
    >
      <div className='space-y-6'>
        {/* Summary Section */}
        <div className='bg-gray-50 p-4 rounded-lg'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='text-center'>
              <div className='text-2xl font-bold text-blue-600'>
                {filteredData.length}
              </div>
              <div className='text-sm text-gray-600'>Tổng số nhiệm vụ</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-orange-600'>
                {new Set(filteredData.map(item => item.material_no)).size}
              </div>
              <div className='text-sm text-gray-600'>Số loại vật tư</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-purple-600'>
                {filteredData.filter(item => item.status === 'completed').length}
              </div>
              <div className='text-sm text-gray-600'>Nhiệm vụ hoàn thành</div>
            </div>
          </div>
        </div>
        {/* Filter Section */}
        <div className='bg-white p-4 rounded-lg border border-gray-200'>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Trạng thái
                </label>
                <Select
                  placeholder="Chọn trạng thái"
                  value={statusFilter}
                  onChange={setStatusFilter}
                  style={{ width: '100%' }}
                  allowClear
                >
                  {statusOptions.map(option => (
                    <Option key={option.value} value={option.value}>
                      {option.label || "đang sử lý"}
                    </Option>
                  ))}
                </Select>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Mã vật tư
                </label>
                <Search
                  placeholder="Nhập mã vật tư"
                  value={materialNoFilter}
                  onChange={(e) => setMaterialNoFilter(e.target.value)}
                  allowClear
                />
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Mã nhiệm vụ
                </label>
                <Search
                  placeholder="Nhập mã nhiệm vụ"
                  value={missionNoFilter}
                  onChange={(e) => setMissionNoFilter(e.target.value)}
                  allowClear
                />
              </div>
            </Col>
          </Row>
        </div>

        {/* Issue Data Details Table */}
        <div>
          <h4 className='font-semibold mb-3'>Danh sách nhiệm vụ kit gộp</h4>
          <Spin spinning={loading}>
            <Table
              columns={issueDataColumns}
              dataSource={filteredData}
              rowKey='mission_no'
              size='small'
              rowClassName={(record) =>
                record.status === 'error'
                  ? "bg-red-100"
                  : ""
              }
              scroll={{ x: 1400 }}
              pagination={{
                pageSize: 20,
                // showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`,
              }}
            />
          </Spin>
        </div>
      </div>
    </Drawer>
  );
};

export default ModalMission;

const statusOptions = [
    { value: 'done', label: 'Hoàn thành' },
    { value: 'new', label: 'Đang đợi' },
    { value: 'error', label: 'Lỗi' },
    { value: 'running', label: 'Đang chạy' }
  ];
const mapText = {
    'done': 'Hoàn thành',
    'new': 'Đang đợi',
    'error': 'Lỗi',
    'running': 'Đang chạy'
}
const mapColor = {
  'done': 'bg-green-100 text-green-800',
  'new': 'bg-blue-100 text-blue-800',
  'error': 'bg-red-100 text-red-800',
  'running': 'bg-yellow-100 text-yellow-800'
}