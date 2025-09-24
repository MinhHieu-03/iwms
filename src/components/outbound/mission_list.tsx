import Dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import { Drawer, Table, Input, message, ConfigProvider, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Search } from 'lucide-react';
import PickingItemModal from '../PickingItemModal';
import { Button } from 'antd';
import BasePagination from '@/components/ui/antd-pagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import dayjs from 'dayjs';
import { t } from 'i18next';
import ModalMergeKit from './modal_merge_kit';
import ModalMission from './modal_mission';
import DrawerOI from './modal_oi';
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/axios';

interface PickingItem {
  id: number;
  section_c?: string;
  line_c?: string;
  issord_no: string;
  issord_dtl_no: string;
  material_no: string;
  material_name: string;
  issue_ord_no: string;
  unit: string;
  issue_qty: number;
  issued_qty?: number;
  inventory_qty: number;
  plan_dt?: string;
  inventory: {
    _id: string;
    sku: string;
    product_name: string;
    locationId: string;
    locationCode: string;
    store: Array<{
      key: string;
      qty: number;
    }>;
    status: string;
    available: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

interface PickingDrawerProps {
  gate?: string;
  // Props removed since data will be fetched internally via API
}

const PickingDrawer: React.FC<PickingDrawerProps> = ({ gate }) => {
  const [isOpenOI, setIsOpenOI] = useState<boolean | Object>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [selectedItem, setSelectedItem] = useState<PickingItem | null>(null);
  const [actionValue, setActionValue] = useState('');
  const skuRef = React.useRef(null);
  const [isOpenMission, setIsOpenMission] = useState(false);
  const [isOpenMerge, setIsOpenMerge] = useState(false);
  const [modalData, setModalData] = useState<any>(null);

  // TanStack Query for fetching kit merger data
  const {
    data: queryData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['kit-merger-list', gate],
    queryFn: async () => {
      try {
        const { data } = await apiClient.post(`kit-merger/list`, {
          filter: { gate, type: "STANDARD" },
        });
        console.log('Fetched kit merger data:', data);
        return data;
      } catch (apiError) {
        console.error('Failed to fetch kit merger data:', apiError);
        throw apiError;
      }
    },
    retry: 1,
    staleTime: 1 * 60 * 1000, // 1 minute
  });

  useEffect(() => {
    // console.log('dndd__', !selectedItem)
    if (!selectedItem) {
      skuRef.current?.focus();
      setTimeout(() => {
        skuRef.current?.focus();
      }, 500);
    }
  }, [selectedItem]);

  const onOpenMergeModal = (record: any) => {
    setLoading(true);
    apiClient
      .get(`material-merge/kit-merge/${record._id}`)
      .then((res) => {
        setModalData(res.data);
        setIsOpenMerge(true);
      })
      .catch((err) => {
        console.error('Failed to fetch merge data:', err);
        message.error('Failed to fetch merge data');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onOpenMissionModal = (record: any) => {
    setLoading(true);
    apiClient
      .get(`mission/kit-merge/${record._id}`)
      .then((res) => {
        setModalData(res.data);
        setIsOpenMission(true);
      })
      .catch((err) => {
        console.error('Failed to fetch merge data:', err);
        message.error('Failed to fetch merge data');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loadingOI = (record: any) => {
    setLoading(true);
    apiClient
      .get(`mission/kit-merge/${record._id}`)
      .then((res) => {
        setIsOpenOI({
          missions: res.data,
          kitMerge: record._id,
        });
      })
      .catch((err) => {
        console.error('Failed to fetch merge data:', err);
        message.error('Failed to fetch merge data');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const lang_key = 'issue_time_schedule.table';

  // Define columns for the Ant Design table
  const columns: ColumnsType<any> = [
    // {
    //   title: "Picking No",
    //   dataIndex: "_id",
    //   key: "_id",
    //   width: 150,
    // },
    {
      title: 'Kit No',
      dataIndex: 'kit_no',
      key: 'kit_no',
      width: 120,
      render: (text) => (
        <div className='space-y-1'>
          {text.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      ),
    },
    {
      title: t(`${lang_key}.required_time`),
      dataIndex: 'A_reqd_time',
      key: 'A_reqd_time',
      width: 260,
      render: (date) => (
        <div className='space-y-1'>
          {date.map((item, index) => (
            <div key={index}>{dayjs(item).format('YYYY-MM-DD HH:mm')}</div>
          ))}
        </div>
      ),
      sorter: (a, b) =>
        dayjs(a.A_reqd_time).unix() - dayjs(b.A_reqd_time).unix(),
    },
    {
      title: t(`${lang_key}.plan_issue_date`),
      dataIndex: 'plan_issue_dt',
      key: 'plan_issue_dt',
      width: 210,
      render: (date) => (
        <div className='space-y-1'>
          {date.map((item, index) => (
            <div key={index}>{dayjs(item).format('YYYY-MM-DD HH:mm')}</div>
          ))}
        </div>
      ),
      sorter: (a, b) =>
        dayjs(a.plan_issue_dt).unix() - dayjs(b.plan_issue_dt).unix(),
    },
    {
      title: t(`${lang_key}.issue_time`),
      dataIndex: 'time_issue',
      key: 'time_issue',
      width: 210,
      render: (date) => (
        <div className='space-y-1'>
          {date.map((item, index) => (
            <div key={index}>{dayjs(item).format('YYYY-MM-DD HH:mm')}</div>
          ))}
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => MAP_TAG[status] || status,
    },
    {
      title: 'Thiếu vật tư',
      dataIndex: 'missing_count',
      key: 'missing_count',
      width: 120,
      render: (missing_count) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800`}
        >
          {missing_count}
        </span>
      ),
    },
    {
      title: 'Hành động',
      dataIndex: 'issord_dtl_no',
      key: 'issord_dtl_no',
      render: (_, record) => (
        <div className='flex items-center gap-2'>
          <Button
            type='primary'
            size='small'
            loading={loading}
            onClick={() => onOpenMergeModal(record)}
          >
            {t('common.detail')}
          </Button>
          <Button
            type='primary'
            size='small'
            loading={loading}
            onClick={() => onOpenMissionModal(record)}
          >
            Xem nhiệm vụ
          </Button>

          <Button
            type='primary'
            loading={loading}
            onClick={() => loadingOI(record)}
            className='gap-2'
            size='small'
          >
            Truy cập OI
          </Button>
        </div>
      ),
      width: 100,
    },
  ];

  const currentKitMerge = useMemo(() => {
    return queryData?.metaData?.find(
      (item: any) => item.status === 'in_progress'
    );
  }, [queryData]);
  console.log('currentKitMerge', currentKitMerge);

  return (
    <div className='space-y-6'>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Vị trí theo tên bộ kit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
              {[1, 2, 3, 4].map((locationId) => {
                const dataKit =
                  currentKitMerge?.kit_no?.[locationId - 1] || null;
                console.log('dataKit', dataKit);
                return (
                  <div
                    key={locationId}
                    className='border-2 border-blue-300 rounded-xl p-6 flex justify-between bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
                  >
                    <h3 className='font-bold text-2xl text-blue-800'>
                      Kit {locationId}
                    </h3>
                    <div className='text-3xl font-black text-indigo-900 bg-white px-3 py-1 rounded-lg shadow-md'>
                      {dataKit || 'N/A'}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              Danh sách Kit gộp chẵn
            </div>
          </CardTitle>
        </CardHeader>
        <Input
          autoFocus
          ref={skuRef}
          value={inputValue}
          placeholder='Tìm kiếm theo SKU, tên sản phẩm, vị trí, mã vật liệu, số lệnh xuất...'
          prefix={<Search className='h-4 w-4 text-gray-400' />}
          onChange={(e) => {
            const value = e.target.value.trim();
            setInputValue(value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSearchText(inputValue.trim());
              setInputValue('');
              if (inputValue && 'speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(`OK`);
                utterance.rate = 0.9;
                utterance.volume = 0.5;
                speechSynthesis.speak(utterance);
              }
            }
          }}
          style={{ marginBottom: 16 }}
        />
        <Table
          columns={columns}
          dataSource={queryData?.metaData || []}
          rowKey='picking_no'
          pagination={false}
          size='middle'
          onRow={(record) => ({
            onClick: () => {
              setSelectedItem(record);
              setActionValue('');
            },
          })}
        />
      </Card>

      {isOpenMission && (
        <ModalMission
          isOpen={isOpenMission}
          onCancel={() => setIsOpenMission(false)}
          data={modalData}
        />
      )}

      {isOpenMerge && (
        <ModalMergeKit
          isOpen={isOpenMerge}
          onCancel={() => setIsOpenMerge(false)}
          data={modalData}
        />
      )}

      <DrawerOI isOpen={!!isOpenOI} setIsOpen={setIsOpenOI} data={isOpenOI} />
    </div>
  );
};

export default PickingDrawer;
export type { PickingItem, PickingDrawerProps };

const MAP_TAG: { [key: string]: JSX.Element } = {
  pending: <Tag color='yellow'>Đang chờ</Tag>,
  in_progress: <Tag color='blue'>Đang xử lý</Tag>,
  completed: <Tag color='green'>Hoàn thành</Tag>,
  cancelled: <Tag color='red'>Đã hủy</Tag>,
};
