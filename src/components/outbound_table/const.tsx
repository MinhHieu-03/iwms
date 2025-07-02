import React from "react";
import { ColumnsType } from "antd/es/table";
import { Tag, Button, Popconfirm } from "antd";
import dayjs from "dayjs";

export interface DataType {
  _id: string;
  sku: string;
  qty: number;
  unit: string;
  location: string;
  status: string;
  inventory: {
    product_name: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export const domain = {
  list: "/outbound/list",
  create: "/outbound",
  update: "/outbound",
  remove: "/outbound",
};

export const lang_key = "outbound.table";

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'orange';
    case 'in_progress':
      return 'blue';
    case 'completed':
      return 'green';
    case 'cancelled':
      return 'red';
    case 'wait_fill':
      return 'yellow';
    default:
      return 'default';
  }
};

export const RenderCol = ({ t, onCancel }: {onCancel: (data: DataType) =>void ; t: (key: string) => string }): ColumnsType<DataType> => [
  {
    title: t("outbound.sku"),
    dataIndex: "sku",
    key: "sku",
    width: 120,
  },
  {
    title: t("outbound.product_name"),
    dataIndex: ["inventory", "product_name"],
    key: "product_name",
    width: 200,
  },
  {
    title: t("outbound.qty"),
    dataIndex: "qty",
    key: "qty",
    width: 80,
    align: "right",
  },
  {
    title: t("outbound.unit"),
    dataIndex: "unit",
    key: "unit",
    width: 80,
  },
  {
    title: t("outbound.location"),
    dataIndex: "location",
    key: "location",
    width: 120,
  },
  {
    title: t("outbound.status"),
    dataIndex: "status",
    key: "status",
    width: 120,
    render: (status: string) => {
      return (
        <Tag color={getStatusColor(status)}>
          {status}
        </Tag>
      );
    },
  },
  {
    title: t("common.actions"),
    key: "actions",
    width: 100,
    render: (_, record: DataType) => (
      <Popconfirm
        title={t("inbound.confirm_cancel")}
        // description={t("inbound.confirm_cancel_description")}
        okText={t("submit")}
        cancelText={t("common.cancel")}
        okType="danger"
        onConfirm={() => {
          // Handle cancel action
          console.log('Cancel confirmed for:', record._id);
          onCancel(record)
          // Add your cancel API call here
        }}
      >
        <Button 
          type="primary" 
          danger 
          size="small"
          disabled={record.status === 'completed' || record.status === 'cancelled'}
        >
          {t("common.cancel")}
        </Button>
      </Popconfirm>
    ),
  },
  // {
  //   title: t("common.created_at"),
  //   dataIndex: "createdAt",
  //   key: "createdAt",
  //   width: 150,
  //   render: (text: string) => (text ? dayjs(text).format("YYYY-MM-DD HH:mm") : "-"),
  // },
  // {
  //   title: t("common.updated_at"),
  //   dataIndex: "updatedAt",
  //   key: "updatedAt",
  //   width: 150,
  //   render: (text: string) => (text ? dayjs(text).format("YYYY-MM-DD HH:mm") : "-"),
  // },
];
