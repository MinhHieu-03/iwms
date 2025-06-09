import { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";

export const lang_key = "warehouses_management";
export const title = "Quản lý kho";
interface DataType {
  _id?: string;
  sku: string;
  storage_model: string;
  action: string;
  production_name: string;
  carton_qty: number;
  box_qty: number;
  kit_qty: number;
  createdAt?: string;
  [key: string]: any; // Add index signature for compatibility
}

export const domain = {
  list: "list",
  create: "create",
  update: "update",
  upload: "upload",
  download: "download",
  remove: "remove",
};
export const RenderCol: ({t}) => ColumnsType<DataType> = ({ t }) => {
  return [
    {
      dataIndex: "stt",
      title: "STT",
      render: (_value: string, _record: DataType, index: number) => index + 1,
    },
    {
      dataIndex: "sku",
      title: "SKU",
    },
    {
      dataIndex: "production_name",
      title: t(`${lang_key}.production_name`),
    },
    {
      dataIndex: "storage_model",
      title: t(`${lang_key}.storage_model`),
    },
    {
      dataIndex: "carton_qty",
      title: t(`${lang_key}.carton_qty`),
    },
    {
      dataIndex: "box_qty",
      title: t(`${lang_key}.box_qty`),
    },
    {
      dataIndex: "kit_qty",
      title: t(`${lang_key}.kit_qty`),
    },
    {
      dataIndex: "action",
      title: t(`${lang_key}.action`),
    },
  ];
};

const itemsRender = (dataRole: any, dataList: any) => {
  return [
    {
      label: "SKU",
      name: "sku",
      rules: [
        {
          required: true,
          message: t("validate.blank_sku"),
        },
        () => ({
          validator(_: unknown, value: unknown) {
            const skuValid = dataList.find(
              (data: unknown) => data?.sku === value
            );
            if (value && skuValid) {
              return Promise.reject(new Error(t("validate.duplicate_sku")));
            }
            return Promise.resolve();
          },
        }),
      ],
      placeholder: `${t("common.input")} SKU`,
    },
    {
      label: t(`${lang_key}.production_name`),
      name: "production_name",
      rules: [
        {
          required: true,
          message: t("validate.blank_production_name"),
        },
      ],
      placeholder: `${t("common.input")} ${t(
        `${lang_key}.production_name`
      ).toLowerCase()}`,
    },
    {
      label: t(`${lang_key}.storage_model`),
      name: "storage_model",
      rules: [
        {
          required: true,
          message: t("validate.blank_storage_model"),
        },
      ],
      placeholder: `${t("common.input")} ${t(
        `${lang_key}.storage_model`
      ).toLowerCase()}`,
    },
    {
      label: t(`${lang_key}.carton_qty`),
      name: "carton_qty",
      type: "number",
      rules: [
        {
          required: true,
          message: t("validate.blank_carton_qty"),
        },
      ],
      placeholder: `${t("common.input")} ${t(
        `${lang_key}.carton_qty`
      ).toLowerCase()}`,
    },
    {
      label: t(`${lang_key}.box_qty`),
      name: "box_qty",
      type: "number",
      rules: [
        {
          required: true,
          message: t("validate.blank_box_qty"),
        },
      ],
      placeholder: `${t("common.input")} ${t(
        `${lang_key}.box_qty`
      ).toLowerCase()}`,
    },
    {
      label: t(`${lang_key}.kit_qty`),
      name: "kit_qty",
      type: "number",
      rules: [
        {
          required: true,
          message: t("validate.blank_kit_qty"),
        },
      ],
      placeholder: `${t("common.input")} ${t(
        `${lang_key}.kit_qty`
      ).toLowerCase()}`,
    },
    {
      label: t(`${lang_key}.action`),
      name: "action",
      rules: [
        {
          required: true,
          message: t("validate.blank_action"),
        },
      ],
      placeholder: `${t("common.input")} ${t(
        `${lang_key}.action`
      ).toLowerCase()}`,
    },
  ];
};

const itemsRenderEdit = (dataRole: unknown) => {
  return [
    {
      label: "SKU",
      name: "sku",
      rules: [
        {
          required: true,
          message: t("validate.blank_sku"),
        },
      ],
      placeholder: `${t("common.input")} SKU`,
    },
    {
      label: t(`${lang_key}.production_name`),
      name: "production_name",
      rules: [
        {
          required: true,
          message: t("validate.blank_production_name"),
        },
      ],
      placeholder: `${t("common.input")} ${t(
        `${lang_key}.production_name`
      ).toLowerCase()}`,
    },
    {
      label: t(`${lang_key}.storage_model`),
      name: "storage_model",
      rules: [
        {
          required: true,
          message: t("validate.blank_storage_model"),
        },
      ],
      placeholder: `${t("common.input")} ${t(
        `${lang_key}.storage_model`
      ).toLowerCase()}`,
    },
    {
      label: t(`${lang_key}.carton_qty`),
      name: "carton_qty",
      type: "number",
      rules: [
        {
          required: true,
          message: t("validate.blank_carton_qty"),
        },
        {
          type: "number",
          message: t("validate.number_carton_qty"),
        },
      ],
      placeholder: `${t("common.input")} ${t(
        `${lang_key}.carton_qty`
      ).toLowerCase()}`,
    },
    {
      label: t(`${lang_key}.box_qty`),
      name: "box_qty",
      type: "number",
      rules: [
        {
          required: true,
          message: t("validate.blank_box_qty"),
        },
        {
          type: "number",
          message: t("validate.number_box_qty"),
        },
      ],
      placeholder: `${t("common.input")} ${t(
        `${lang_key}.box_qty`
      ).toLowerCase()}`,
    },
    {
      label: t(`${lang_key}.kit_qty`),
      name: "kit_qty",
      type: "number",
      rules: [
        {
          required: true,
          message: t("validate.blank_kit_qty"),
        },
        {
          type: "number",
          message: t("validate.number_kit_qty"),
        },
      ],
      placeholder: `${t("common.input")} ${t(
        `${lang_key}.kit_qty`
      ).toLowerCase()}`,
    },
    {
      label: t(`${lang_key}.action`),
      name: "action",
      rules: [
        {
          required: true,
          message: t("validate.blank_action"),
        },
      ],
      placeholder: `${t("common.input")} ${t(
        `${lang_key}.action`
      ).toLowerCase()}`,
    },
  ];
};
