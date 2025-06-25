import { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { route as route_parent } from "../const"
import { createLangKey } from "@/lib/utils"

export const route = [...route_parent, "template"];
export const lang_key = createLangKey(route);
export const title = "Quản lý kho";

export interface TaskData {
  id: string;
  name: string;
  device: string;
  param: any;
}

export interface MissionTemplate {
  id: string;
  name: string;
  description: string;
  tasks: TaskData[];
  createAt: string;
}

export interface DataType extends Omit<MissionTemplate, "tasks"> {
  task_num: number;
}

export const missionTemplateGenForm = (data: MissionTemplate) => {
  const form: DataType = {
    ...data,
    task_num: data.tasks.length
  }
  return form;
}

export const domain = {
  list: "mission_template/list",
  create: "mission_template",
  update: "mission_template",
  upload: "upload",
  download: "download",
  remove: "mission_template",
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
      dataIndex: "createAt",
      title: t(`${lang_key}.createAt`),
      render: (value: string) => new Date(value).toLocaleString(),
    },
    {
      dataIndex: "task_num",
      title: t(`${lang_key}.task_num`),
    },
  ];
};
