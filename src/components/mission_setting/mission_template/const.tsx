import { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { route as route_parent } from "../const";
import { createLangKey } from "@/lib/utils";
import { MarkerType, Node, Edge } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Send, Trash } from "lucide-react";

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
  _id: string;
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

export const RenderCol: ({
  t,
  handleDelete,
  handleRunButton,
}) => ColumnsType<DataType> = ({ t, handleDelete, handleRunButton }) => {
  return [
    {
      dataIndex: "name",
      title: "Template Name",
    },
    {
      dataIndex: "action",
      title: "Action",
      render: (value: string, record: DataType) => (
        <div className="flex items-center justify-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              handleRunButton(record);
            }}
          >
            <Send className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete([record._id], "single");
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];
};

export const initEdges = (missionData: any): Edge[] => {
  if (!missionData?.tasks) return [];

  const initEdges = missionData.tasks.flatMap((task, index) => {
    return Object.entries(task.flow || {})
      .filter(([key, value]) => value !== -1)
      .map(([key, value]: any) => ({
        id: `edge-${index}-${value}`,
        source: `${index}`,
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
      source: "start",
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
      id: "start",
      type: missionData?.ui_data ? missionData.ui_data[0].type : "customStart",
      data: { label: "Start" },
      position: {
        x: missionData?.ui_data ? missionData.ui_data[0].x : 400,
        y: missionData?.ui_data ? missionData.ui_data[0].y : 0,
      },
    },
  ];

  if (!missionData?.tasks) return initNodes;

  initNodes.push(
    ...missionData.tasks.map(
      (task: any, index: number): Node => ({
        id: `${index}`,
        type: missionData.ui_data[index + 1]?.type || "customStorage",
        data: {
          ...task,
          label: task.name,
          index: index,
        },
        position: {
          x: missionData.ui_data[index + 1]?.x || 400,
          y: missionData.ui_data[index + 1]?.y || 100,
        },
      })
    )
  );
  return initNodes;
};
