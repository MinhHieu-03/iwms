import { useState } from "react";
import { Tag, Descriptions, Modal } from "antd";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown } from "lucide-react";

interface Param {
  assigned: boolean;
  name: string;
  type: string;
  value: string;
}

interface Flow {
  ok: number;
  fail: number;
  timeout: number;
}

interface Task {
  device_name: string;
  name: string;
  param: Param[];
  flow?: Flow;
}

interface Mission {
  _id: string;
  name: string;
  status: string;
  last_task_index: number;
  current_task_index: number;
  create_at: string;
  update_at: string;
  start: number;
  tasks: Task[];
}

interface ModalMissionProps {
  visible: boolean;
  onClose: () => void;
  mission: Mission | null;
}

export default function ModalMission({
  visible,
  onClose,
  mission,
}: ModalMissionProps) {
  return (
    <Modal
      open={visible}
      title="Mission"
      width={800}
      onCancel={onClose}
      footer={null}
    >
      {mission && (
        <div>
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="Status">
              <Tag color={mission.status === "done" ? "green" : "blue"}>
                {mission.status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Last Task Index">
              {mission.last_task_index}
            </Descriptions.Item>
            <Descriptions.Item label="Current Task Index">
              {mission.current_task_index}
            </Descriptions.Item>
            <Descriptions.Item label="Start">{mission.start}</Descriptions.Item>
            <Descriptions.Item label="Created At">
              {mission.create_at}
            </Descriptions.Item>
            <Descriptions.Item label="Updated At">
              {mission.update_at}
            </Descriptions.Item>
          </Descriptions>

          <div>
            <h3 className="text-lg font-semibold mb-2">Tasks</h3>
            <div className="flex flex-col gap-3">
              {mission.tasks.map((task, index) => (
                <Collapsible key={index}>
                  <CollapsibleTrigger className="w-full flex items-center justify-between rounded-md border px-4 py-2 hover:bg-gray-100">
                    <div className="font-medium">
                      <div className="flex flex-col text-left">
                        <div className="font-sans">
                          {index}. {task.name || `Task ${index + 1}`}
                        </div>
                        <div className="text-sm text-gray-500">
                          Device: {task.device_name || "N/A"}
                        </div>
                        {task.flow && (
                          <div className="text-sm text-gray-500">
                            Flow → ok: {task.flow.ok}, Fail: {task.flow.fail},
                            Timeout: {task.flow.timeout}
                          </div>
                        )}
                      </div>
                    </div>
                    <ChevronDown />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3">
                    <div className="border rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Value</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {task.param.map((p, pIdx) => (
                            <TableRow key={pIdx}>
                              <TableCell>{p.name}</TableCell>
                              <TableCell>{p.type}</TableCell>
                              <TableCell>{p.value}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
