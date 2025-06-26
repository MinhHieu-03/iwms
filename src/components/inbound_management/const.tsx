import { ColumnsType } from "antd/es/table";
import { Tag } from "antd";

export const lang_key = "inbound";
export const title = "Quản lý nhập kho";

export interface DataType {
  _id?: string;
  createdAt: string;
  sku: string;
  quantity: number;
  storeMethod: "Bin" | "Carton" | "Kit";
  packingMethod: "Carton" | "Kit";
  bin_code: string;
  supplier: string;
  invoice_code: string;
  status: "new" | "pending" | "done";
  note: string;
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
    default:
      return "default";
  }
};

export const RenderCol: ({ t }) => ColumnsType<DataType> = ({ t }) => {
  return [
    {
      dataIndex: "sku",
      title: t(`${lang_key}.sku`),
      width: 120,
    },
    {
      dataIndex: "quantity",
      title: t(`${lang_key}.quantity`),
      width: 100,
    },
    {
      dataIndex: "storeMethod",
      title: t(`${lang_key}.store_method`),
      width: 120,
      render: (value: string) => <Tag color="blue">{value?.toLowerCase()}</Tag>,
    },
    {
      dataIndex: "packingMethod",
      title: t(`${lang_key}.packing_method`),
      width: 120,
      render: (value: string) => <Tag color="purple">{value?.toLowerCase()}</Tag>,
    },
    {
      dataIndex: "bin_code",
      title: t(`${lang_key}.bin_code`),
      width: 120,
    },
    {
      dataIndex: "status",
      title: t(`${lang_key}.status`),
      width: 100,
      render: (value: string) => (
        <Tag color={getStatusColor(value)}>{value}</Tag>
      ),
    },
    {
      dataIndex: "note",
      title: t(`${lang_key}.note`),
      width: 200,
      ellipsis: true,
    },
    {
      dataIndex: "createdAt",
      title: t(`${lang_key}.created_at`),
      width: 150,
      render: (value: string) => new Date(value).toLocaleString(),
    },
  ];
};

export const renderCreateForm = (dataRole: unknown, dataList: unknown, t: (key: string) => string) => {
  return [
    {
      label: t(`${lang_key}.sku`),
      name: "sku",
      rules: [{ required: true, message: t(`${lang_key}.validation.sku_required`) }],
    },
    {
      label: t(`${lang_key}.quantity`),
      name: "quantity",
      type: "number",
      rules: [{ required: true, message: t(`${lang_key}.validation.quantity_required`) }],
    },
    {
      label: t(`${lang_key}.store_method`),
      name: "storeMethod",
      type: "select",
      items: getStoreMethodOptions(t),
      rules: [{ required: true, message: t(`${lang_key}.validation.store_method_required`) }],
    },
    {
      label: t(`${lang_key}.packing_method`),
      name: "packingMethod",
      type: "select",
      items: getPackingMethodOptions(t),
      rules: [{ required: true, message: t(`${lang_key}.validation.packing_method_required`) }],
    },
    {
      label: t(`${lang_key}.bin_code`),
      name: "bin_code",
      rules: [{ required: true, message: t(`${lang_key}.validation.bin_code_required`) }],
    },
    {
      label: t(`${lang_key}.supplier`),
      name: "supplier",
      rules: [{ required: true, message: t(`${lang_key}.validation.supplier_required`) }],
    },
    {
      label: t(`${lang_key}.invoice_code`),
      name: "invoice_code",
      rules: [{ required: true, message: t(`${lang_key}.validation.invoice_code_required`) }],
    },
    {
      label: t(`${lang_key}.status`),
      name: "status",
      type: "select",
      items: getStatusOptions(t),
      rules: [{ required: true, message: t(`${lang_key}.validation.status_required`) }],
    },
    {
      label: t(`${lang_key}.note`),
      name: "note",
    },
  ];
};

export const renderEditForm = (dataRole: unknown, t: (key: string) => string) => {
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
