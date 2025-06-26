import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

export interface StoreItem {
  key: string;
  qty: number;
}

export interface InventoryType {
  _id: string;
  sku: string;
  product_name: string;
  locationId: string;
  locationCode: string;
  store: StoreItem[];
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

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
  inventory?: InventoryType;
}

export const domain = {
  list: "/inbound/list",
  create: "/inbound",
  update: "/inbound",
  remove: "/inbound",
  detail: "/inbound",
};

export const lang_key = "inbound.table";

export const RenderCol = ({ t }: { t: (key: string) => string }): ColumnsType<DataType> => [
  // {
  //   title: t("inbound.pic"),
  //   dataIndex: "pic",
  //   key: "pic",
  // },
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
        wait_fill: { text: status, color: "orange" },
        in_progress: { text: status, color: "blue" },
        completed: { text: status, color: "green" },
        cancelled: { text: status, color: "red" },
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



// Mock data for development - replace with actual API call
export const mockData: DataType[] = [
  {
    _id: "1",
    pic: "admin",
    sku: "8898-3254",
    origin: "inbound",
    product_name: "nhua 32",
    destination: "A-02/01-03",
    status: "wait_fill",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "2",
    pic: "user1",
    sku: "7745-1122",
    origin: "inbound",
    product_name: "kim loai 15",
    destination: "B-01/02-05",
    status: "in_progress",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "3",
    pic: "user2",
    sku: "9988-7766",
    origin: "outbound",
    product_name: "go tre 22",
    destination: "C-03/01-01",
    status: "completed",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "4",
    pic: "admin",
    sku: "1122-3344",
    origin: "internal",
    product_name: "thep 45",
    destination: "A-01/03-02",
    status: "cancelled",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];