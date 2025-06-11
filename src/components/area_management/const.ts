import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

export interface DataType {
  _id: string;
  name: string;
  description: string;
  warehouse: {
    _id: string;
    name: string;
  };
  productions: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const domain = {
  list: "/areaconfig/list",
  create: "/areaconfig",
  update: "/areaconfig",
  remove: "/areaconfig",
};

export const lang_key = "area.management";

export const RenderCol = ({ t }: { t: (key: string) => string }): ColumnsType<DataType> => [
  {
    title: t("common.name"),
    dataIndex: "name",
    key: "name",
  },
  {
    title: t("common.description"),
    dataIndex: "description",
    key: "description",
  },
  {
    title: t("common.warehouse"),
    dataIndex: "warehouse",
    key: "warehouse",
    render: (warehouse: { _id: string; name: string }) => warehouse.name || t("common.not_assigned"),
  },
  {
    title: t("common.productions"),
    dataIndex: "productions",
    key: "productions",
    render: (productions: string[]) => productions.join(", "),
  },
  {
    title: t("common.status"),
    dataIndex: "isActive",
    key: "isActive",
    render: (isActive: boolean) => (isActive ? t("common.active") : t("common.inactive")),
  },
  {
    title: t("common.created_at"),
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date: string) => dayjs(date).format("DD/MM/YYYY HH:mm"),
  },
  {
    title: t("common.updated_at"),
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (date: string) => dayjs(date).format("DD/MM/YYYY HH:mm"),
  },
];
