import { ColumnsType } from "antd/es/table";
import { Button, Popconfirm } from "antd";
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

export const RenderCol = ({ 
  t, 
  onCancel 
}: { 
  t: (key: string) => string;
  onCancel?: (record: DataType) => void;
}): ColumnsType<DataType> => [
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
        wait_fill: { text: t("status.wait_fill"), color: "orange" },
        fill: { text: t("status.fill"), color: "orange" },
        in_progress: { text: t("status.in_progress"), color: "blue" },
        completed: { text: t("status.completed"), color: "green" },
        cancelled: { text: t("status.cancelled"), color: "red" },
      };
      
      const statusInfo = statusMap[status] || { text: t("status.unknown"), color: "default" };
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
  {
    title: t("inbound.actions"),
    key: "actions",
    render: (_, record: DataType) => {
      return (
        <Popconfirm
          title={t("inbound.confirm_cancel")}
          description={t("inbound.confirm_cancel_description")}
          onConfirm={(e) => {e.stopPropagation();onCancel(record)}}
          onCancel={(e) => e.stopPropagation()}
          
          okText={t("submit")}
          cancelText={t("btn.cancel")}
        >
          <Button 
            type="primary" 
            danger 
            size="small"
            disabled={record.status !== "wait_fill"}
            onClick={(e) => e.stopPropagation()}
          >
            {t("common.cancel")}
          </Button>
        </Popconfirm>
      );
    },
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