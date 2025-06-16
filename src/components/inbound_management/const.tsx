import { ColumnsType } from "antd/es/table";
import { Tag } from "antd";

export const lang_key = "inbound_management";
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
      render: (value: string) => <Tag color="blue">{value}</Tag>,
    },
    {
      dataIndex: "packingMethod",
      title: t(`${lang_key}.packing_method`),
      width: 120,
      render: (value: string) => <Tag color="purple">{value}</Tag>,
    },
    {
      dataIndex: "bin_code",
      title: t(`${lang_key}.bin_code`),
      width: 120,
    },
    {
      dataIndex: "supplier",
      title: t(`${lang_key}.supplier`),
      width: 150,
    },
    {
      dataIndex: "invoice_code",
      title: t(`${lang_key}.invoice_code`),
      width: 120,
    },
    {
      dataIndex: "status",
      title: t(`${lang_key}.status`),
      width: 100,
      render: (value: string) => (
        <Tag color={getStatusColor(value)}>{value.toUpperCase()}</Tag>
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

export const renderCreateForm = (dataRole: unknown, dataList: unknown) => {
  return [
    {
      label: "SKU",
      name: "sku",
      rules: [{ required: true, message: "Please input the SKU!" }],
    },
    {
      label: "Quantity",
      name: "quantity",
      type: "number",
      rules: [{ required: true, message: "Please input the quantity!" }],
    },
    {
      label: "Store Method",
      name: "storeMethod",
      type: "select",
      items: STORE_METHOD_OPTIONS,
      rules: [{ required: true, message: "Please select store method!" }],
    },
    {
      label: "Packing Method",
      name: "packingMethod",
      type: "select",
      items: PACKING_METHOD_OPTIONS,
      rules: [{ required: true, message: "Please select packing method!" }],
    },
    {
      label: "Bin Code",
      name: "bin_code",
      rules: [{ required: true, message: "Please input the bin code!" }],
    },
    {
      label: "Supplier",
      name: "supplier",
      rules: [{ required: true, message: "Please input the supplier!" }],
    },
    {
      label: "Invoice Code",
      name: "invoice_code",
      rules: [{ required: true, message: "Please input the invoice code!" }],
    },
    {
      label: "Status",
      name: "status",
      type: "select",
      items: STATUS_OPTIONS,
      rules: [{ required: true, message: "Please select status!" }],
    },
    {
      label: "Note",
      name: "note",
    },
  ];
};

export const renderEditForm = (dataRole: unknown) => {
  return [
    {
      label: "SKU",
      name: "sku",
    },
    {
      label: "Quantity",
      name: "quantity",
      type: "number",
    },
    {
      label: "Store Method",
      name: "storeMethod",
      type: "select",
      items: STORE_METHOD_OPTIONS,
    },
    {
      label: "Packing Method",
      name: "packingMethod",
      type: "select",
      items: PACKING_METHOD_OPTIONS,
    },
    {
      label: "Bin Code",
      name: "bin_code",
    },
    {
      label: "Supplier",
      name: "supplier",
    },
    {
      label: "Invoice Code",
      name: "invoice_code",
    },
    {
      label: "Status",
      name: "status",
      type: "select",
      items: STATUS_OPTIONS,
    },
    {
      label: "Note",
      name: "note",
    },
  ];
};
