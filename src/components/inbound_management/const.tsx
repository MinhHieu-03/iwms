import { ColumnsType } from "antd/es/table";
import { Tag } from "antd";

export const lang_key = "inbound";
export const title = "Quản lý nhập kho";

export interface DataType {
  _id?: string;
  createdAt: string;
  pic: string;
  sku: string;
  origin: string;
  product_name: string;
  destination: string;
  status: "wait_fill" | "new" | "pending" | "done" | "fill";
  location: string;
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
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  updatedAt: string;
  __v: number;
  // Legacy fields for backwards compatibility
  quantity?: number;
  storeMethod?: "Bin" | "Carton" | "Kit";
  packingMethod?: "Carton" | "Kit";
  bin_code?: string;
  supplier?: string;
  invoice_code?: string;
  note?: string;
  [key: string]: unknown; // Add index signature for compatibility
}

export const domain = {
  list: "inbound/list",
  create: "inbound",
  update: "inbound",
  upload: "inbound/upload",
  download: "inbound/download",
  remove: "inbound",
};

export const STORE_METHOD_OPTIONS = [
  { value: "Bin", label: "Bin" },
  { value: "Carton", label: "Carton" },
  { value: "Kit", label: "Kit" },
];

export const PACKING_METHOD_OPTIONS = [
  { value: "Carton", label: "Carton" },
  { value: "Kit", label: "Kit" },
];

export const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "pending", label: "Pending" },
  { value: "done", label: "Done" },
];

// Updated functions to support translation
export const getStoreMethodOptions = (t: (key: string) => string) => [
  { value: "Bin", label: t(`${lang_key}.store_method_bin`) },
  { value: "Carton", label: t(`${lang_key}.store_method_carton`) },
  { value: "Kit", label: t(`${lang_key}.store_method_kit`) },
];

export const getPackingMethodOptions = (t: (key: string) => string) => [
  { value: "Carton", label: t(`${lang_key}.packing_method_carton`) },
  { value: "Kit", label: t(`${lang_key}.packing_method_kit`) },
];

export const getStatusOptions = (t: (key: string) => string) => [
  { value: "new", label: t(`${lang_key}.status_new`) },
  { value: "pending", label: t(`${lang_key}.status_pending`) },
  { value: "done", label: t(`${lang_key}.status_done`) },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "new":
      return "blue";
    case "pending":
      return "orange";
    case "done":
      return "green";
    case "wait_fill":
      return "yellow";
    default:
      return "default";
  }
};

export const RenderCol: ({ t }) => ColumnsType<DataType> = ({ t }) => {
  return [
    {
      dataIndex: "pic",
      title: "Công nhân",
      width: 100,
    },
    {
      dataIndex: "sku",
      title: 'Mã vật tư',
      width: 120,
    },
    // {
    //   dataIndex: "product_name",
    //   title: t(`${lang_key}.product_name`),
    //   width: 150,
    // },
    // {
    //   dataIndex: "origin",
    //   title: t(`${lang_key}.origin`),
    //   width: 100,
    // },
    {
      dataIndex: "destination",
      title: "Vị trí lưu kho",
      width: 150,
      // render: (text, record) => (
      //   <span>{record.status === "fill" ? text : ""}</span>
      // ),
    },
    {
      dataIndex: ["inventory", "bin_code"],
      title: "Mã thùng",
      width: 120,
    },
    {
      dataIndex: ["inventory", "store"],
      title: t(`${lang_key}.store_info`),
      width: 200,
      render: (store: Array<{ key: string; qty: number }>) => (
        <div>
          {store?.map((item, index) => (
            <Tag key={index} color="blue">
              {item.key}: {item.qty}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      dataIndex: "status",
      title: "Trạng thái",
      width: 100,
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
      dataIndex: "createdAt",
      title: "Ngày tạo",
      width: 150,
      render: (value: string) => new Date(value).toLocaleString(),
    },
    // {
    //   dataIndex: "updatedAt",
    //   title: t(`${lang_key}.updated_at`),
    //   width: 150,
    //   render: (value: string) => new Date(value).toLocaleString(),
    // },
  ];
};

export const renderCreateForm = (
  dataRole: unknown,
  dataList: unknown,
  t: (key: string) => string
) => {
  return [
    {
      label: t(`${lang_key}.sku`),
      name: "sku",
      rules: [
        { required: true, message: t(`${lang_key}.validation.sku_required`) },
      ],
    },
    {
      label: t(`${lang_key}.quantity`),
      name: "quantity",
      type: "number",
      rules: [
        {
          required: true,
          message: t(`${lang_key}.validation.quantity_required`),
        },
      ],
    },
    {
      label: t(`${lang_key}.store_method`),
      name: "storeMethod",
      type: "select",
      items: getStoreMethodOptions(t),
      rules: [
        {
          required: true,
          message: t(`${lang_key}.validation.store_method_required`),
        },
      ],
    },
    {
      label: t(`${lang_key}.packing_method`),
      name: "packingMethod",
      type: "select",
      items: getPackingMethodOptions(t),
      rules: [
        {
          required: true,
          message: t(`${lang_key}.validation.packing_method_required`),
        },
      ],
    },
    {
      label: t(`${lang_key}.bin_code`),
      name: "bin_code",
      rules: [
        {
          required: true,
          message: t(`${lang_key}.validation.bin_code_required`),
        },
      ],
    },
    {
      label: t(`${lang_key}.supplier`),
      name: "supplier",
      rules: [
        {
          required: true,
          message: t(`${lang_key}.validation.supplier_required`),
        },
      ],
    },
    {
      label: t(`${lang_key}.invoice_code`),
      name: "invoice_code",
      rules: [
        {
          required: true,
          message: t(`${lang_key}.validation.invoice_code_required`),
        },
      ],
    },
    {
      label: t(`${lang_key}.status`),
      name: "status",
      type: "select",
      items: getStatusOptions(t),
      rules: [
        {
          required: true,
          message: t(`${lang_key}.validation.status_required`),
        },
      ],
    },
    {
      label: t(`${lang_key}.note`),
      name: "note",
    },
  ];
};

export const renderEditForm = (
  dataRole: unknown,
  t: (key: string) => string
) => {
  return [
    {
      label: t(`${lang_key}.sku`),
      name: "sku",
    },
    {
      label: t(`${lang_key}.quantity`),
      name: "quantity",
      type: "number",
    },
    {
      label: t(`${lang_key}.store_method`),
      name: "storeMethod",
      type: "select",
      items: getStoreMethodOptions(t),
    },
    {
      label: t(`${lang_key}.packing_method`),
      name: "packingMethod",
      type: "select",
      items: getPackingMethodOptions(t),
    },
    {
      label: t(`${lang_key}.bin_code`),
      name: "bin_code",
    },
    {
      label: t(`${lang_key}.supplier`),
      name: "supplier",
    },
    {
      label: t(`${lang_key}.invoice_code`),
      name: "invoice_code",
    },
    {
      label: t(`${lang_key}.status`),
      name: "status",
      type: "select",
      items: getStatusOptions(t),
    },
    {
      label: t(`${lang_key}.note`),
      name: "note",
    },
  ];
};
