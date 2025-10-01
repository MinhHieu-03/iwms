import React, { useEffect, useState } from "react";
import { Table, Spin, Tag, Modal, Descriptions } from "antd";
import { getMissionTemplate } from "@/api/missionSettingApi";
import apiClient from "@/lib/axios";

interface Param {
  assigned: boolean;
  name: string;
  type: string;
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
  tasks: Task[];
}

const API_URL = "http://35.184.194.168:3142/log/mission";
const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNzU5NTE2Mzk3fQ.6JSSuxVnGiXDMonUkH6SOZEVrmhORyBrfusFAXSvrOY";

export default function MissionTemplatePage() {
  const [data, setData] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(false);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  const missionColumns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "done" ? "green" : "blue"}>{status}</Tag>
      ),
    },
    {
      title: "Last Task Index",
      dataIndex: "last_task_index",
      key: "last_task_index",
    },
    {
      title: "Current Task Index",
      dataIndex: "current_task_index",
      key: "current_task_index",
    },
  ];

  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <Table
          loading={loading}
          dataSource={data}
          columns={missionColumns}
          rowKey="_id"
          onRow={(record) => ({
            onClick: () => {
              setSelectedMission(record);
              setModalVisible(true);
            },
          })}
          style={{ cursor: "pointer" }}
        />
      )}

      <Modal
        open={modalVisible}
        title="Mission"
        width={800}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {selectedMission && (
          <div>
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Status">
                <Tag
                  color={selectedMission.status === "done" ? "green" : "blue"}
                >
                  {selectedMission.status}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Last Task Index">
                {selectedMission.last_task_index}
              </Descriptions.Item>
              <Descriptions.Item label="Current Task Index">
                {selectedMission.current_task_index}
              </Descriptions.Item>
              <Descriptions.Item label="Start">
                {selectedMission.start}
              </Descriptions.Item>
              <Descriptions.Item label="Created At">
                {selectedMission.create_at}
              </Descriptions.Item>
              <Descriptions.Item label="Updated At">
                {selectedMission.update_at}
              </Descriptions.Item>
            </Descriptions>

            <div style={{ marginTop: 20 }}>
              <h3>Tasks</h3>
              {selectedMission.tasks.map((task, idx) => (
                <Descriptions
                  key={idx}
                  title={`${task.device_name} - ${task.name}`}
                  bordered
                  column={1}
                  size="small"
                  style={{ marginBottom: 12 }}
                >
                  {task.param.map((p, pIdx) => (
                    <Descriptions.Item
                      key={pIdx}
                      label={`${p.name} (${p.type})`}
                    >
                      {p.value}
                    </Descriptions.Item>
                  ))}
                </Descriptions>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
