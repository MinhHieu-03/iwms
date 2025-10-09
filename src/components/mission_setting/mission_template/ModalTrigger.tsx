// ModalTrigger.tsx
import { Modal, Form, Input, message } from "antd";
import { useEffect } from "react";
import wcsApiClient from "@/lib/wcsApiConfig";

interface Param {
  name: string;
  value: string;
}

interface Task {
  device_name: string;
  name: string;
  param: Param[];
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
  tasks?: Task[];
}

interface ModalTriggerProps {
  detailVisible: boolean;
  onClose: () => void;
  mission: Mission | null;
  fetchMissions: (page?: number, limit?: number) => Promise<void>;
  page: number;
  limit: number;
}

export default function ModalTrigger({
  detailVisible,
  onClose,
  mission,
  fetchMissions,
  page,
  limit,
}: ModalTriggerProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (mission) {
      form.setFieldsValue(mission);
    } else {
      form.resetFields();
    }
  }, [mission, form]);

  return (
    <Modal
      title="Trigger Mission"
      open={detailVisible}
      onCancel={onClose}
      onOk={async () => {
        const values = await form.validateFields();

        const tasksPayload = Array.isArray(values.tasks)
          ? values.tasks.map((task: any) => ({
              id: mission?._id,
              device_name: task.device_name,
              name: task.name,
              param: Array.isArray(task.param)
                ? task.param.map((p: any) => ({
                    name: p.name,
                    value: String(p.value || ""),
                  }))
                : [],
            }))
          : [];
        console.log("tasksPayload", tasksPayload);

        try {
          await wcsApiClient.patch(`/mission`, {
            id: mission?._id,
            tasks: tasksPayload,
          });
        } catch (error) {
          console.error(error);
          return;
        }

        try {
          await wcsApiClient.post("/mission/trigger", {
            id: mission?._id,
            trig: "resume",
          });
          message.success("Cập nhật thành công")
          onClose();
          fetchMissions(page, limit);
        } catch (error) {
          console.error(error);
        }
      }}
      okText="Cập nhật & Resume"
      cancelText="Hủy"
      width={800}
      bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="_id" hidden>
          <Input type="hidden" />
        </Form.Item>

        <h3>ID: {mission?._id}</h3>

        <Form.List name="tasks">
          {(fields) => (
            <div>
              {fields.map((field) => (
                <div
                  key={field.key}
                  style={{
                    marginBottom: 24,
                    border: "1px solid #ddd",
                    padding: 12,
                    borderRadius: 8,
                  }}
                >
                  <Form.Item
                    {...field}
                    name={[field.name, "device_name"]}
                    label="Device Name"
                  >
                    <Input disabled />
                  </Form.Item>

                  <Form.Item
                    {...field}
                    name={[field.name, "name"]}
                    label="Task Name"
                  >
                    <Input disabled />
                  </Form.Item>

                  <Form.List name={[field.name, "param"]}>
                    {(paramFields) => (
                      <div style={{ marginLeft: 20 }}>
                        {paramFields.map((paramField) => (
                          <div
                            key={paramField.key}
                            style={{
                              display: "flex",
                              gap: 12,
                              marginBottom: 12,
                              alignItems: "center",
                            }}
                          >
                            <Form.Item
                              {...paramField}
                              name={[paramField.name, "name"]}
                              label="Param Name"
                            >
                              <Input disabled />
                            </Form.Item>
                            <Form.Item
                              {...paramField}
                              name={[paramField.name, "value"]}
                              label="Value"
                            >
                              <Input />
                            </Form.Item>
                          </div>
                        ))}
                      </div>
                    )}
                  </Form.List>
                </div>
              ))}
            </div>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
}
