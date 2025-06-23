import React from "react";
import { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import dayjs from "dayjs";

export interface DataType {
  _id: string;
  pic: string;
  sku: string;
  origin: string;
  product_name: string;
  destination: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export const domain = {
  list: "/inbound/list",
  create: "/inbound",
  update: "/inbound",
  remove: "/inbound",
};

export const lang_key = "inbound.table";

const getStatusColor = (status: string) => {
  switch (status) {
    case 'wait_fill':
      return 'orange';
    case 'in_progress':
      return 'blue';
    case 'completed':
      return 'green';
    case 'cancelled':
      return 'red';
    default:
      return 'default';
  }
};

export const RenderCol = ({ t }: { t: (key: string) => string }): ColumnsType<DataType> => [
  {
    title: t("inbound.pic"),
    dataIndex: "pic",
    key: "pic",
    width: 120,
  },
  {
    title: t("inbound.sku"),
    dataIndex: "sku",
    key: "sku",
    width: 150,
  },
  {
    title: t("inbound.origin"),
    dataIndex: "origin",
    key: "origin",
    width: 120,
    render: (origin: string) => t(`inbound.origin.${origin}`),
  },
  {
    title: t("inbound.product_name"),
    dataIndex: "product_name",
    key: "product_name",
    width: 200,
  },
  {
    title: t("inbound.destination"),
    dataIndex: "destination",
    key: "destination",
    width: 150,
  },
  {
    title: t("inbound.status"),
    dataIndex: "status",
    key: "status",
    width: 120,
    render: (status: string) => {
      return (
        <Tag color={getStatusColor(status)}>
          {t(`inbound.status.${status}`)}
        </Tag>
      );
    },
  },
  {
    title: t("common.created_at"),
    dataIndex: "createdAt",
    key: "createdAt",
    width: 150,
    render: (text: string) => (text ? dayjs(text).format("YYYY-MM-DD HH:mm") : "-"),
  },
  {
    title: t("common.updated_at"),
    dataIndex: "updatedAt",
    key: "updatedAt",
    width: 150,
    render: (text: string) => (text ? dayjs(text).format("YYYY-MM-DD HH:mm") : "-"),
  },
];
