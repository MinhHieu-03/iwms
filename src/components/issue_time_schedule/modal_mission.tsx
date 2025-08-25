import { Drawer, Descriptions, Tag, Table, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { creatMissionData } from '@/lib/dummyData';

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

  const fetchData = async () => {
    const data = await creatMissionData();
    setMissionData(data.metaData);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      dataIndex: 'mission_no',
      key: 'mission_no',
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
      dataIndex: 'package_no',
      key: 'package_no',
      width: 100,
    },
    {
      title: 'Mã vật tư',
      dataIndex: 'material_no',
      key: 'material_no',
      render: (text) => text?.trim(),
      width: 120,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
    },
    {
      title: 'Vị trí cấp',
      dataIndex: 'supply_loc',
      key: 'supply_loc',
      width: 100,
    },
    {
      title: 'Vị trí nhận',
      dataIndex: 'receive_loc',
      key: 'receive_loc',
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
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            status === 'fill'
              ? 'bg-green-100 text-green-800'
              : status === 'empty'
              ? 'bg-red-100 text-red-800'
              : status === 'Done'
              ? 'bg-blue-100 text-blue-800'
              : status === 'new'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {status === 'fill'
            ? 'Đầy'
            : status === 'empty'
            ? 'Trống'
            : status === 'Done'
            ? 'Hoàn thành'
            : status === 'new'
            ? 'Mới'
            : 'Đang xử lí'}
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
                {missionData.length}
              </div>
              <div className='text-sm text-gray-600'>Tổng số nhiệm vụ</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-orange-600'>
                {new Set(missionData.map(item => item.material_no)).size}
              </div>
              <div className='text-sm text-gray-600'>Số loại vật tư</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-purple-600'>
                {missionData.filter(item => item.status === 'Done').length}
              </div>
              <div className='text-sm text-gray-600'>Nhiệm vụ hoàn thành</div>
            </div>
          </div>
        </div>
        {/* Issue Data Details Table */}
        <div>
          <h4 className='font-semibold mb-3'>Danh sách nhiệm vụ kit gộp</h4>
          <Spin spinning={loading}>
            <Table
              columns={issueDataColumns}
              dataSource={missionData}
              rowKey='mission_no'
              size='small'
              scroll={{ x: 1400 }}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
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
