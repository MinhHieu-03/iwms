import { ColumnsType } from "antd/es/table";
export const lang_key = "warehouses_management";
export const title = "Quản lý kho";
export interface DataType {
  _id?: string;
  createdAt: string;
  name: string;
  description: string;
  [key: string]: unknown; // Add index signature for compatibility
}

export const domain = {
  list: "warehouse/list",
  create: "warehouse",
  update: "warehouse",
  upload: "upload",
  download: "download",
  remove: "warehouse",
};
export const RenderCol: ({ t }) => ColumnsType<DataType> = ({ t }) => {
  return [
    {
      dataIndex: "name",
      title: t(`${lang_key}.name`),
    },
    {
      dataIndex: "description",
      title: t(`${lang_key}.description`),
    },
    {
      dataIndex: "createdAt",
      title: t(`${lang_key}.createdAt`),
      render: (value: string) => new Date(value).toLocaleString(),
    },
  ];
};

export const renderCreateForm = (dataRole: unknown, dataList: unknown) => {
  return [
    {
      label: "Name",
      name: "name",
      rules: [{ required: true, message: "Please input the name!" }],
    },
    {
      label: "Description",
      name: "description",
    },
  ];
};

export const renderEditForm = (dataRole: unknown) => {
  return [
    {
      label: "Name",
      name: "name",
    },
    {
      label: "Description", 
      name: "description",
    },
  ];
};
