import Dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import { Drawer, Table, Input, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Search } from "lucide-react";
import PickingItemModal from "./PickingItemModal";

interface PickingItem {
  no: number;
  order: string;
  sku: string;
  quantity: string;
  ordered: string;
  conveyor: string;
  arrival_time: string | null;
}

interface PickingDrawerProps {
  open: boolean;
  onClose: () => void;
  data?: PickingItem[];
}

const defaultData: PickingItem[] = Array.from({ length: 20 }, (_, i) => ({
  no: 21 + i,
  order: `OD${String(i + 1).padStart(3, '0')}`,
  sku: `${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
  quantity: `${Math.floor(Math.random() * 5) * 10} / ${(Math.floor(Math.random() * 5) + 5) * 10}`,
  conveyor: Dayjs("2025-06-12T02:47:57.227Z").add(i * 15, 'minute').toISOString(),
  ordered: Dayjs("2025-06-12T02:47:57.227Z").subtract(Math.random() * 24, 'hour').toISOString(),
  arrival_time: Math.random() > 0.3 ? Dayjs("2025-06-12T02:47:57.227Z").add(i * 30, 'minute').toISOString() : null
})).concat([
  { "no": 1, "order": "OD001", "sku": "9802-4428", "quantity": "10 / 60", "conveyor": "2025-06-12T02:47:57.227Z", "ordered": "2025-06-11T18:34:21.467Z", "arrival_time": null },
  { "no": 2, "order": "OD002", "sku": "9802-4428", "quantity": "20 / 80", "conveyor": "2025-06-12T03:02:57.227Z", "ordered": "2025-06-11T03:36:00.207Z", "arrival_time": null }
  , { "no": 3, "order": "OD003", "sku": "9802-4428", "quantity": "10 / 80", "conveyor": "2025-06-12T03:17:57.227Z", "ordered": "2025-06-11T17:54:59.967Z", "arrival_time": null }
  , { "no": 4, "order": "OD004", "sku": "9802-4428", "quantity": "40 / 60", "conveyor": "2025-06-12T03:32:57.227Z", "ordered": "2025-06-11T21:11:22.735Z", "arrival_time": null },
  { "no": 5, "order": "OD005", "sku": "9802-4428", "quantity": "10 / 70", "conveyor": "2025-06-12T03:47:57.227Z", "ordered": "2025-06-11T18:07:39.945Z", "arrival_time": null },
  { "no": 6, "order": "OD006", "sku": "9802-4428", "quantity": "0 / 50", "conveyor": "2025-06-12T04:02:57.227Z", "ordered": "2025-06-11T07:32:02.388Z", "arrival_time": null }, { "no": 7, "order": "OD007", "sku": "3471-5031", "quantity": "0 / 80", "conveyor": "2025-06-12T04:17:57.227Z", "ordered": "2025-06-12T01:19:50.588Z", "arrival_time": "2025-06-12T05:47:57.227Z" }, { "no": 8, "order": "OD008", "sku": "4063-2278", "quantity": "20 / 80", "conveyor": "2025-06-12T04:32:57.227Z", "ordered": "2025-06-11T04:23:26.683Z", "arrival_time": null }, { "no": 9, "order": "OD009", "sku": "4204-9603", "quantity": "30 / 50", "conveyor": "2025-06-12T04:47:57.227Z", "ordered": "2025-06-11T20:21:07.819Z", "arrival_time": "2025-06-12T06:47:57.227Z" }, { "no": 10, "order": "OD010", "sku": "5133-8578", "quantity": "30 / 80", "conveyor": "2025-06-12T05:02:57.227Z", "ordered": "2025-06-11T21:02:14.240Z", "arrival_time": "2025-06-12T07:17:57.227Z" }, { "no": 11, "order": "OD011", "sku": "8640-0655", "quantity": "30 / 70", "conveyor": "2025-06-12T05:17:57.227Z", "ordered": "2025-06-12T01:28:55.357Z", "arrival_time": "2025-06-12T07:47:57.227Z" }, { "no": 12, "order": "OD012", "sku": "3161-8856", "quantity": "30 / 60", "conveyor": "2025-06-12T05:32:57.227Z", "ordered": "2025-06-11T04:34:53.090Z", "arrival_time": null }, { "no": 13, "order": "OD013", "sku": "1053-8628", "quantity": "10 / 70", "conveyor": "2025-06-12T05:47:57.227Z", "ordered": "2025-06-11T13:15:59.649Z", "arrival_time": null }, { "no": 14, "order": "OD014", "sku": "5894-0614", "quantity": "10 / 90", "conveyor": "2025-06-12T06:02:57.227Z", "ordered": "2025-06-11T14:49:55.541Z", "arrival_time": "2025-06-12T09:17:57.227Z" }, { "no": 15, "order": "OD015", "sku": "1244-4503", "quantity": "0 / 90", "conveyor": "2025-06-12T06:17:57.227Z", "ordered": "2025-06-11T12:07:02.238Z", "arrival_time": "2025-06-12T09:47:57.227Z" }, { "no": 16, "order": "OD016", "sku": "5711-2012", "quantity": "40 / 60", "conveyor": "2025-06-12T06:32:57.227Z", "ordered": "2025-06-11T12:31:09.280Z", "arrival_time": "2025-06-12T10:17:57.227Z" }, { "no": 17, "order": "OD017", "sku": "8632-5887", "quantity": "0 / 50", "conveyor": "2025-06-12T06:47:57.227Z", "ordered": "2025-06-11T05:07:42.517Z", "arrival_time": "2025-06-12T10:47:57.227Z" }, { "no": 18, "order": "OD018", "sku": "7407-4255", "quantity": "20 / 50", "conveyor": "2025-06-12T07:02:57.227Z", "ordered": "2025-06-11T13:01:32.504Z", "arrival_time": null }, { "no": 19, "order": "OD019", "sku": "9456-6144", "quantity": "40 / 90", "conveyor": "2025-06-12T07:17:57.227Z", "ordered": "2025-06-11T21:44:21.403Z", "arrival_time": null }, { "no": 20, "order": "OD020", "sku": "5042-8827", "quantity": "20 / 90", "conveyor": "2025-06-12T07:32:57.227Z", "ordered": "2025-06-11T05:04:45.819Z", "arrival_time": "2025-06-12T12:17:57.227Z" }]);

const PickingDrawer: React.FC<PickingDrawerProps> = ({
  open,
  onClose,
  data = []
}) => {
  const [searchText, setSearchText] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [selectedItem, setSelectedItem] = useState<PickingItem | null>(null);
  const [actionValue, setActionValue] = useState('');
  const skuRef = React.useRef(null);

  const filteredData = useMemo(() => {
    const listVal = defaultData
      .filter(item =>
        item.sku.toLowerCase().includes(searchText.toLowerCase())
      )
      .sort((a, b) => Dayjs(a.conveyor).valueOf() - Dayjs(b.conveyor).valueOf());

    if (searchText && listVal.length > 0) {
      setTimeout(() => {
        setSelectedItem(listVal[0]);
        setSearchText('');
        setInputValue('');
      }, 500);
    }

    return listVal;
  }, [searchText, defaultData]);

  useEffect(() => {
    if (!open) {
      setSearchText('');
      setInputValue('');
      setSelectedItem(null);
    }
  }, [open]);


  useEffect(() => {
    if (open) {
      // Focus on the SKU input when the drawer opens
      skuRef.current?.focus();
      setTimeout(() => {
        skuRef.current?.focus();
      }, 500)
    }
  }, [open]);
  useEffect(() => {
    // console.log('dndd__', !selectedItem)
    if (!selectedItem) {
      skuRef.current?.focus();
      setTimeout(() => {
        skuRef.current?.focus();
      }, 500)
    }
  }, [selectedItem]);

  return (
    <>
      <Drawer
        title="Picking Details"
        placement="bottom"
        height={'90vh'}
        onClose={onClose}
        open={open}
        zIndex={100}
      >
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Items to Pick</h3>
          <Input
            autoFocus
            ref={skuRef}
            value={inputValue}
            placeholder="Search by order or SKU..."
            prefix={<Search className="h-4 w-4 text-gray-400" />}
            onChange={(e) => {
              const value = e.target.value.trim();
              setInputValue(value);
              if (value === '' || (/^\d{0,4}-?\d{0,4}$/.test(value) && value.length === 9)) {
                setSearchText(value);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setSearchText('');
                setInputValue('');
              }
            }}
            style={{ marginBottom: 16 }}
          />
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="no"
            pagination={false}
            size="middle"
            onRow={(record) => ({
              onClick: () => {
                setSelectedItem(record);
                setActionValue('');
              },
            })}
          />
        </div>
      </Drawer>

      <PickingItemModal
        selectedItem={selectedItem}
        onClose={() => {
          setSelectedItem(null);
          setActionValue('');
        }}
        actionValue={actionValue}
        setActionValue={setActionValue}
      />
    </>
  );
};

// Define columns for the Ant Design table
const columns: ColumnsType<PickingItem> = [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no',
    width: 80,
  },
  {
    title: 'Order',
    dataIndex: 'order',
    key: 'order',
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Ordered',
    dataIndex: 'ordered',
    key: 'ordered',
    render: (text) => text ? Dayjs(text).format('HH:mm:ss') : <Button type="link" size="small">Pick</Button>,
  },
  {
    title: 'Conveyor',
    dataIndex: 'conveyor',
    key: 'conveyor',
    render: (text) => text ? Dayjs(text).format('HH:mm:ss') : <Button type="link" size="small">Pick</Button>,
  },
  {
    title: 'Arrival time',
    dataIndex: 'arrival_time',
    key: 'arrival_time',
    render: (text) => text ? Dayjs(text).format('HH:mm:ss') : <Button type="link" size="small">Pick</Button>,
  },
];
export default PickingDrawer;
export type { PickingItem, PickingDrawerProps };
