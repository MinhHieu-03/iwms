import React, { useEffect, useState } from "react";
import { Table, Modal, Descriptions, Button, Tag } from "antd";

interface Param {
  assigned: boolean;
  name: string;
  type: string;
  value: string | number;
}

interface NotifyDetail {
  enable: boolean;
  url: string;
  userdata: string;
}

interface Task {
  _id: string;
  mission_log_id: string;
  device_name: string;
  name: string;
  status: string;
  create_at: string;
  update_at: string;
  param: Param[];
  flow: Record<string, number>;
  notify: {
    begin: NotifyDetail;
    end: NotifyDetail;
  };
  result: {
    code: number;
    desc: string;
    flow: string;
  };
}

const API_URL = "http://35.184.194.168:3142/log/task";
const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNzU5NTE2Mzk3fQ.6JSSuxVnGiXDMonUkH6SOZEVrmhORyBrfusFAXSvrOY";

const Task = () => {
  const [data, setData] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const columns = [
    { title: "Device Name", dataIndex: "device_name", key: "device_name" },
    { title: "Mission Name", dataIndex: "name", key: "name" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "done" ? "green" : "blue"}>{status}</Tag>
      ),
    },
    { title: "Created At", dataIndex: "create_at", key: "create_at" },
  ];

  useEffect(() => {
    fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: AUTH_TOKEN,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setData(json.data);
        } else {
          console.error("API response invalid:", json);
        }
      })
      .catch((err) => {
        console.error("API call failed:", err);
      });
  }, []);

  const handleRowClick = (record: Task) => {
    setSelectedTask(record);
    setModalVisible(true);
  };

  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="_id"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
          style: { cursor: "pointer" },
        })}
      />

      <Modal
        title="Task"
        open={modalVisible}
        footer={<Button onClick={() => setModalVisible(false)}>Close</Button>}
        onCancel={() => setModalVisible(false)}
        width={700}
      >
        {selectedTask && (
          <Descriptions title="Mission Details" bordered column={1}>
            <Descriptions.Item label="Device Name">
              {selectedTask.device_name}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag
                color={selectedTask.status === "done" ? "green" : "blue"}
              ></Tag>
              {selectedTask.status}
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {selectedTask.create_at}
            </Descriptions.Item>
            <Descriptions.Item label="Updated At">
              {selectedTask.update_at}
            </Descriptions.Item>
            <Descriptions.Item label="Result">
              Code: {selectedTask.result.code}, Desc: {selectedTask.result.desc}
              , Flow: {selectedTask.result.flow}
            </Descriptions.Item>
            <Descriptions.Item label="Params">
              {selectedTask.param.map((p) => (
                <div key={p.name}>
                  {p.name} ({p.type}): {p.value || "N/A"}{" "}
                  {p.assigned ? "(assigned)" : ""}
                </div>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="Flow">
              {Object.entries(selectedTask.flow).map(([k, v]) => (
                <div key={k}>
                  {k}: {v}
                </div>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="Notify Begin">
              Enable: {selectedTask.notify.begin.enable ? "Yes" : "No"}, URL:{" "}
              {selectedTask.notify.begin.url}, Userdata:{" "}
              {selectedTask.notify.begin.userdata}
            </Descriptions.Item>
            <Descriptions.Item label="Notify End">
              Enable: {selectedTask.notify.end.enable ? "Yes" : "No"}, URL:{" "}
              {selectedTask.notify.end.url}, Userdata:{" "}
              {selectedTask.notify.end.userdata}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
};

export default Task;
