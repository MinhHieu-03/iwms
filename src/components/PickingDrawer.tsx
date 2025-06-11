import React from "react";
import { Drawer, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface PickingItem {
  no: number;
  order: string;
  sku: string;
  quantity: number;
  status: number;
}

interface PickingDrawerProps {
  open: boolean;
  onClose: () => void;
  data?: PickingItem[];
}

const PickingDrawer: React.FC<PickingDrawerProps> = ({ 
  open, 
  onClose, 
  data = [] 
}) => {
  // Default mock data if no data is provided
  const defaultData: PickingItem[] = [
    {
      no: 1,
      order: 'od1',
      sku: "sku1",
      quantity: 20,
      status: 10
    },
    {
      no: 2,
      order: 'od2',
      sku: "sku2",
      quantity: 15,
      status: 5
    },
    {
      no: 3,
      order: 'od3',
      sku: "sku3",
      quantity: 30,
      status: 20
    }
  ];

  const pickingData = data.length > 0 ? data : defaultData;

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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <Drawer
      title="Picking Details"
      placement="right"
      width={800}
      onClose={onClose}
      open={open}
    >
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Items to Pick</h3>
        <Table
          columns={columns}
          dataSource={pickingData}
          rowKey="no"
          pagination={false}
          size="middle"
        />
      </div>
    </Drawer>
  );
};

export default PickingDrawer;
export type { PickingItem, PickingDrawerProps };
