import { ColumnsType } from "antd/es/table";

export const lang_key = "master_data";
export const title = "Master data";

export interface DataType {
  _id?: string;
  material_no: string;
  material_nm: string;
  material_tp: string;
  pk_style: number | string;
  pk_style1: number | string;
  new_pk_style: number | string;
  flg: number | string;
  flg1: number | string;
  data2: string;
  data3: string;
  comment: string;
  user_id: string;
  ent_dt: string;
  upd_dt: string;
  [key: string]: unknown;
}

export const domain = {
  list: "material-mst/list",
  create: "master-data",
  update: "material-mst",
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
      title: t(`pk_style`),
      width: 150,
    },
    {
      dataIndex: "pk_style1",
      title: t(`pk_style1`),
      width: 150,
    },
    {
      dataIndex: "max_pk",
      title: t(`max_pk`),
      width: 150,
    },
    {
      dataIndex: "flg",
      title: t(`flg`),
      width: 100,
    },
    {
      dataIndex: "flg1",
      title: t(`flg1`),
      width: 100,
    },
    {
      dataIndex: "data2",
      title: t(`data2`),
      width: 150,
    },
    {
      dataIndex: "data3",
      title: t(`data3`),
      width: 150,
    },
    {
      dataIndex: "comment",
      title: t(`comment`),
      width: 200,
      ellipsis: true,
    },
    {
      dataIndex: "user_id",
      title: t(`user_id`),
      width: 150,
    },
    {
      dataIndex: "ent_dt",
      title: t(`ent_dt`),
      width: 180,
    },
    {
      dataIndex: "upd_dt",
      title: t(`upd_dt`),
      width: 180,
    },
  ];
};

export const renderCreateForm = (dataRole: unknown, dataList: unknown) => {
  return [
    {
      label: "Mã vật tư",
      name: "material_no",
      rules: [{ required: true, message: "master_data.validation.material_no_required" }],
    },
    {
      label: "Tên vật tư", 
      name: "material_nm",
      rules: [{ required: true, message: "master_data.validation.material_nm_required" }],
    },
    {
      label: "Kiểu vật tư",
      name: "material_tp", 
      rules: [{ required: true, message: "master_data.validation.material_tp_required" }],
    },
    {
      label: "Qui cách đóng gói",
      name: "pk_style",
      type: "number",
    },
    {
      label: "Qui cách đóng gói mới",
      name: "new_pk_style",
      type: "number",
    },
    {
      label: "PCS/Bag",
      name: "pcs_bag",
      type: "number",
    },
    // {
    //   label: "Cờ",
    //   name: "flg",
    //   type: "number",
    // },
    // {
    //   label: "Ghi chú",
    //   name: "comment",
    //   type: "textarea",
    // },
    // {
    //   label: "Người tạo",
    //   name: "user_id",
    // },
  ];
};

export const renderEditForm = (dataRole: unknown) => {
  return [
    {
      label: "Mã vật tư",
      name: "material_no",
      rules: [{ required: true, message: "master_data.validation.material_no_required" }],
    },
    {
      label: "Tên vật tư", 
      name: "material_nm", 
      rules: [{ required: true, message: "master_data.validation.material_nm_required" }],
    },
    {
      label: "Kiểu vật tư",
      name: "material_tp",
      rules: [{ required: true, message: "master_data.validation.material_tp_required" }],
    },
    {
      label: "Qui cách đóng gói",
      name: "pk_style",
      type: "number",
    },
    {
      label: "Qui cách đóng gói 1",
      name: "pk_style1",
      type: "number",
    },
    {
      label: "Qui cách đóng gói 2",
      name: "pk_style2",
      type: "number",
    },
    {
      label: "Flag",
      name: "flg",
      type: "number",
    },
    {
      label: "Flag 1",
      name: "flg1",
      type: "number",
    },
    {
      label: "Data 2",
      name: "data2",
    },
    {
      label: "Data 3",
      name: "data3",
    },
    {
      label: "Ghi chú",
      name: "comment",
      type: "textarea",
    },
    {
      label: "User ID",
      name: "user_id",
    },
  ];
};
