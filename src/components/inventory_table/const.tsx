import { ColumnsType } from "antd/es/table";
import { Tag, Tooltip } from "antd";
import dayjs from "dayjs";

export interface StoreItem {
  key: string;
  qty: number;
}

export interface InventoryDataType {
  _id: string;
  sku: string;
  product_name: string;
  locationId: string;
  locationCode: string;
  store: StoreItem[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const domain = {
  list: "/inventory/list",
  create: "/inventory",
  update: "/inventory",
  remove: "/inventory",
  detail: "/inventory",
};

export const lang_key = "inventory.table";

export const RenderCol = ({
  t,
}: {
  t: (key: string) => string;
}): ColumnsType<InventoryDataType> => [
  {
    title: t("inventory.location_code"),
    dataIndex: "locationCode",
    key: "locationCode",
    width: 120,
  },
  {
    title: t("inventory.status"),
    dataIndex: "status",
    key: "status",
    width: 120,
    render: (status: string) => {
      const statusMap: Record<string, { text: string; color: string }> = {
        wait_fill: { text: t("status.wait_fill"), color: "orange" },
        fill: { text: t("status.fill"), color: "blue" },
        in_progress: { text: t("status.in_progress"), color: "processing" },
        completed: { text: t("status.completed"), color: "success" },
        low_stock: { text: t("status.low_stock"), color: "warning" },
        out_of_stock: { text: t("status.out_of_stock"), color: "error" },
      };

      const statusInfo = statusMap[status] || {
        text: t("status.unknown"),
        color: "default",
      };
      return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
    },
  },
  {
    title: t("inventory.sku"),
    dataIndex: "sku",
    key: "sku",
    width: 120,
    fixed: "left",
  },
  // {
  //   title: t("inventory.product_name"),
  //   dataIndex: "product_name",
  //   key: "product_name",
  //   width: 200,
  //   ellipsis: {
  //     showTitle: false,
  //   },
  //   render: (text: string) => (
  //     <Tooltip placement="topLeft" title={text}>
  //       {text}
  //     </Tooltip>
  //   ),
  // },
  {
    title: t("inventory.store_items"),
    key: "store",
    dataIndex: "store",
    width: 250,
    render: (store: StoreItem[]) => {
      return (
        <div className="flex flex-wrap gap-1">
          {store?.map((item, index) => (
            <Tag
              key={index}
              color={
                item.key === "Item"
                  ? "blue"
                  : item.key === "Bag"
                  ? "green"
                  : "orange"
              }
            >
              {item.key}: {item.qty}
            </Tag>
          ))}
        </div>
      );
    },
  },
  {
    title: t("inventory.total_items"),
    key: "totalItems",
    width: 100,
    render: (_, record: InventoryDataType) => {
      const totalItems =
        record?.store?.find((item) => item.key === "Item")?.qty || 0;
      return (
        <span className="font-semibold text-blue-600">
          {totalItems.toLocaleString()}
        </span>
      );
    },
  },
  {
    title: t("inventory.available_items"),
    key: "available",
    dataIndex: "available",
    width: 100,
    render: (available: number) => {
      return (
        <span className="font-semibold text-green-600">
          {available ? available.toLocaleString() : 0}
        </span>
      );
    },
  },
  {
    title: t("inventory.created_at"),
    dataIndex: "createdAt",
    key: "createdAt",
    width: 140,
    render: (date: string) =>
      date ? dayjs(date).format("DD/MM/YYYY HH:mm") : "-",
  },
  // {
  //   title: t("inventory.updated_at"),
  //   dataIndex: "updatedAt",
  //   key: "updatedAt",
  //   width: 140,
  //   render: (date: string) => date ? dayjs(date).format("DD/MM/YYYY HH:mm") : "-",
  // },
];

// Mock data for development - replace with actual API call
export const mockData: InventoryDataType[] = [
  {
    _id: "686600e98ec92838f392be3c",
    sku: "9921445",
    product_name: "CABL867C1-42060",
    locationId: "6864bd4a25a739200aa35f47",
    locationCode: "A-02/05-02",
    store: [
      {
        key: "Plastic Bin",
        qty: 1,
      },
      {
        key: "Bag",
        qty: 20,
      },
      {
        key: "Item",
        qty: 3455,
      },
    ],
    status: "wait_fill",
    createdAt: "2025-07-03T04:02:49.145Z",
    updatedAt: "2025-07-03T04:02:49.145Z",
  },
  {
    _id: "686600e98ec92838f392be3d",
    sku: "8834567",
    product_name: "CONN245B2-15030",
    locationId: "6864bd4a25a739200aa35f48",
    locationCode: "B-01/03-01",
    store: [
      {
        key: "Plastic Bin",
        qty: 2,
      },
      {
        key: "Bag",
        qty: 50,
      },
      {
        key: "Item",
        qty: 1250,
      },
    ],
    status: "fill",
    createdAt: "2025-07-03T03:45:22.145Z",
    updatedAt: "2025-07-03T05:12:15.145Z",
  },
  {
    _id: "686600e98ec92838f392be3e",
    sku: "7712334",
    product_name: "RES455A3-78901",
    locationId: "6864bd4a25a739200aa35f49",
    locationCode: "C-03/02-05",
    store: [
      {
        key: "Plastic Bin",
        qty: 1,
      },
      {
        key: "Bag",
        qty: 5,
      },
      {
        key: "Item",
        qty: 89,
      },
    ],
    status: "low_stock",
    createdAt: "2025-07-02T08:30:10.145Z",
    updatedAt: "2025-07-03T02:15:30.145Z",
  },
  {
    _id: "686600e98ec92838f392be3f",
    sku: "5567890",
    product_name: "CAP123X5-99887",
    locationId: "6864bd4a25a739200aa35f50",
    locationCode: "A-01/01-03",
    store: [
      {
        key: "Plastic Bin",
        qty: 3,
      },
      {
        key: "Bag",
        qty: 75,
      },
      {
        key: "Item",
        qty: 5678,
      },
    ],
    status: "completed",
    createdAt: "2025-07-01T14:20:45.145Z",
    updatedAt: "2025-07-03T01:45:12.145Z",
  },
  {
    _id: "686600e98ec92838f392be40",
    sku: "3344556",
    product_name: "IND789Z2-11223",
    locationId: "6864bd4a25a739200aa35f51",
    locationCode: "D-04/01-02",
    store: [
      {
        key: "Plastic Bin",
        qty: 0,
      },
      {
        key: "Bag",
        qty: 0,
      },
      {
        key: "Item",
        qty: 0,
      },
    ],
    status: "out_of_stock",
    createdAt: "2025-06-30T10:15:30.145Z",
    updatedAt: "2025-07-02T16:30:22.145Z",
  },
];
