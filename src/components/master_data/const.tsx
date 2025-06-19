import { ColumnsType } from "antd/es/table";

export const lang_key = "master_data";
export const title = "Quản lý dữ liệu chính";

export interface DataType {
  _id?: string;
  material_no: string;
  material_nm: string;
  material_tp: string;
  pk_style: number | string;
  new_pk_style: number | string;
  flg: number | string;
  comment: string;
  user_id: string;
  ent_dt: string;
  upd_dt: string;
  [key: string]: unknown;
}

export const domain = {
  list: "master-data/list",
  create: "master-data",
  update: "master-data",
  upload: "master-data/upload",
  download: "master-data/download",
  remove: "master-data",
};

export const RenderCol: ({ t }) => ColumnsType<DataType> = ({ t }) => {
  return [
    {
      dataIndex: "material_no",
      title: t(`${lang_key}.material_no`),
      width: 150,
      fixed: 'left',
    },
    {
      dataIndex: "material_nm",
      title: t(`${lang_key}.material_nm`),
      width: 200,
    },
    {
      dataIndex: "material_tp",
      title: t(`${lang_key}.material_tp`),
      width: 150,
    },
    {
      dataIndex: "pk_style",
      title: t(`${lang_key}.pk_style`),
      width: 120,
    },
    {
      dataIndex: "new_pk_style",
      title: t(`${lang_key}.new_pk_style`),
      width: 120,
    },
    {
      dataIndex: "flg",
      title: t(`${lang_key}.flg`),
      width: 100,
    },
    {
      dataIndex: "comment",
      title: t(`${lang_key}.comment`),
      width: 200,
      ellipsis: true,
    },
    {
      dataIndex: "user_id",
      title: t(`${lang_key}.user_id`),
      width: 120,
    },
    {
      dataIndex: "ent_dt",
      title: t(`${lang_key}.ent_dt`),
      width: 180,
      render: (value: string) => value ? new Date(value).toLocaleString() : '',
    },
    {
      dataIndex: "upd_dt",
      title: t(`${lang_key}.upd_dt`),
      width: 180,
      render: (value: string) => value ? new Date(value).toLocaleString() : '',
    },
  ];
};

export const renderCreateForm = (dataRole: unknown, dataList: unknown) => {
  return [
    {
      label: "Material No",
      name: "material_no",
      rules: [{ required: true, message: "master_data.validation.material_no_required" }],
    },
    {
      label: "Material Name", 
      name: "material_nm",
      rules: [{ required: true, message: "master_data.validation.material_nm_required" }],
    },
    {
      label: "Material Type",
      name: "material_tp", 
      rules: [{ required: true, message: "master_data.validation.material_tp_required" }],
    },
    {
      label: "PK Style",
      name: "pk_style",
      type: "number",
    },
    {
      label: "New PK Style",
      name: "new_pk_style",
      type: "number",
    },
    {
      label: "Flag",
      name: "flg",
      type: "number",
    },
    {
      label: "Comment",
      name: "comment",
      type: "textarea",
    },
    {
      label: "User ID",
      name: "user_id",
    },
  ];
};

export const renderEditForm = (dataRole: unknown) => {
  return [
    {
      label: "Material No",
      name: "material_no",
      rules: [{ required: true, message: "master_data.validation.material_no_required" }],
    },
    {
      label: "Material Name",
      name: "material_nm", 
      rules: [{ required: true, message: "master_data.validation.material_nm_required" }],
    },
    {
      label: "Material Type",
      name: "material_tp",
      rules: [{ required: true, message: "master_data.validation.material_tp_required" }],
    },
    {
      label: "PK Style",
      name: "pk_style",
      type: "number",
    },
    {
      label: "New PK Style",
      name: "new_pk_style",
      type: "number",
    },
    {
      label: "Flag",
      name: "flg",
      type: "number",
    },
    {
      label: "Comment",
      name: "comment",
      type: "textarea",
    },
    {
      label: "User ID",
      name: "user_id",
    },
  ];
};
