import { ColumnsType } from "antd/es/table";
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

export const RenderCol = ({ t }: { t: (key: string) => string }): ColumnsType<DataType> => [
  {
    title: t("inbound.pic"),
    dataIndex: "pic",
    key: "pic",
  },
  {
    title: t("inbound.sku"),
    dataIndex: "sku",
    key: "sku",
  },
  {
    title: t("inbound.origin"),
    dataIndex: "origin",
    key: "origin",
  },
  {
    title: t("inbound.product_name"),
    dataIndex: "product_name",
    key: "product_name",
  },
  {
    title: t("inbound.destination"),
    dataIndex: "destination",
    key: "destination",
  },
  {
    title: t("inbound.status"),
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      const statusMap: Record<string, { text: string; color: string }> = {
        wait_fill: { text: t("inbound.status.wait_fill"), color: "orange" },
        in_progress: { text: t("inbound.status.in_progress"), color: "blue" },
        completed: { text: t("inbound.status.completed"), color: "green" },
        cancelled: { text: t("inbound.status.cancelled"), color: "red" },
      };
      
      const statusInfo = statusMap[status] || { text: status, color: "default" };
      return statusInfo.text;
    },
  },
  {
    title: t("inbound.created_at"),
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date: string) => date ? dayjs(date).format("DD/MM/YYYY HH:mm") : "-",
  },
  {
    title: t("inbound.updated_at"),
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (date: string) => date ? dayjs(date).format("DD/MM/YYYY HH:mm") : "-",
  },
];
