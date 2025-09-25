import { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { route as route_parent } from "../const";
import { createLangKey } from "@/lib/utils";
import { MarkerType, Node, Edge } from "@xyflow/react";

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

export interface DataType extends Omit<MissionTemplate, "tasks"> {}

export const missionTemplateGenForm = (data: MissionTemplate) => {
  const form: DataType = {
    ...data,
  };
  return form;
};

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
  ];
};

export const initEdges = (missionData: any): Edge[] => {
  if (!missionData?.tasks) return [];

  const initEdges = missionData.tasks.flatMap((task, index) => {
    return Object.entries(task.flow || {})
      .filter(([key, value]) => value !== -1)
      .map(([key, value]) => ({
        id: `e${index + 1}-${value}`,
        source: `${index + 1}`,
        target: `${value}`,
        sourceHandle:
          key === "ok"
            ? "output-1"
            : key === "timeout"
            ? "output-2"
            : "output-3",
        type: "default",
        style: { stroke: "#3b82f6", strokeWidth: 3 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#3b82f6" },
      }));
  });
  if (missionData.start !== undefined && missionData.start !== -1) {
    initEdges.push({
      id: "edge-start",
      source: "0",
      target: `${missionData.start}`,
      type: "default",
      style: { stroke: "#3b82f6", strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: "#3b82f6" },
    });
  }

  return initEdges;
};

export const initNodes = (missionData: any): Node[] => {
  const initNodes: Node[] = [
    {
      id: "0",
      type: "customStart",
      data: { label: "Start" },
      position: {
        x: 400,
        y: 0,
      },
    },
  ];

  if (!missionData?.tasks) return initNodes;

  initNodes.push(
    ...missionData.tasks.map(
      (task: any, index: number): Node => ({
        id: `${index + 1}`,
        type: "customStorage",
        data: {
          label: task.name,
          ...task,
        },
        position: {
          x: Math.floor(Math.random() * 400 + 100),
          y: Math.floor(Math.random() * 300 + 100),
        },
      })
    )
  );
  return initNodes;
};
