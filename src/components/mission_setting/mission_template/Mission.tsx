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

const mockData = [
  {
    last_task_index: 2,
    current_task_index: -1,
    status: "done",
    create_at: "2025-09-25T17:48:41.978000",
    update_at: "2025-09-25T17:48:42.055000",
    name: "qqw",
    start: 2,
    tasks: [
      {
        device_name: "RCS",
        name: "gen pre-schedule task",
        param: [
          {
            assigned: true,
            name: "pos",
            type: "str",
            value: "",
          },
          {
            assigned: true,
            name: "priority",
            type: "int",
            value: "",
          },
          {
            assigned: true,
            name: "timeout",
            type: "float",
            value: "",
          },
        ],
        flow: {
          ok: -1,
          fail: -1,
          timeout: -1,
        },
        notify: {
          begin: {
            enable: false,
            url: "",
            userdata: "",
          },
          end: {
            enable: false,
            url: "",
            userdata: "",
          },
        },
        timeout: 0,
        need_trigger: false,
      },
      {
        device_name: "RCS",
        name: "cancel task",
        param: [
          {
            assigned: true,
            name: "task_id",
            type: "str",
            value: "",
          },
          {
            assigned: true,
            name: "timeout",
            type: "float",
            value: "",
          },
        ],
        flow: {
          ok: 1,
          fail: -1,
          timeout: 3,
        },
        notify: {
          begin: {
            enable: false,
            url: "",
            userdata: "",
          },
          end: {
            enable: false,
            url: "",
            userdata: "",
          },
        },
        timeout: 0,
        need_trigger: false,
      },
      {
        device_name: "RCS",
        name: "bind container and bin",
        param: [
          {
            assigned: true,
            name: "container",
            type: "str",
            value: "",
          },
          {
            assigned: true,
            name: "bin",
            type: "str",
            value: "",
          },
          {
            assigned: true,
            name: "timeout",
            type: "float",
            value: "",
          },
        ],
        flow: {
          ok: -1,
          fail: -1,
          timeout: -1,
        },
        notify: {
          begin: {
            enable: false,
            url: "",
            userdata: "",
          },
          end: {
            enable: false,
            url: "",
            userdata: "",
          },
        },
        timeout: 0,
        need_trigger: false,
      },
    ],
    ui_data: [],
    _id: "68d51e09bc3cf1c9eb3a9865",
  },
  {
    last_task_index: -1,
    current_task_index: 2,
    status: "pause",
    create_at: "2025-09-25T17:49:21.907000",
    update_at: "2025-09-30T13:58:50.528000",
    name: "qqw",
    start: 2,
    tasks: [
      {
        device_name: "RCS",
        name: "gen pre-schedule task",
        param: [
          {
            assigned: true,
            name: "pos",
            type: "str",
            value: "1",
          },
          {
            assigned: true,
            name: "priority",
            type: "int",
            value: "2",
          },
          {
            assigned: true,
            name: "timeout",
            type: "float",
            value: "3",
          },
        ],
        flow: {
          ok: -1,
          fail: -1,
          timeout: -1,
        },
        notify: {
          begin: {
            enable: false,
            url: "",
            userdata: "",
          },
          end: {
            enable: false,
            url: "",
            userdata: "",
          },
        },
        timeout: 0,
        need_trigger: false,
      },
      {
        device_name: "RCS",
        name: "cancel task",
        param: [
          {
            assigned: true,
            name: "task_id",
            type: "str",
            value: "",
          },
          {
            assigned: true,
            name: "timeout",
            type: "float",
            value: "",
          },
        ],
        flow: {
          ok: 1,
          fail: -1,
          timeout: 3,
        },
        notify: {
          begin: {
            enable: false,
            url: "",
            userdata: "",
          },
          end: {
            enable: false,
            url: "",
            userdata: "",
          },
        },
        timeout: 0,
        need_trigger: false,
      },
      {
        device_name: "RCS",
        name: "bind container and bin",
        param: [
          {
            assigned: true,
            name: "container",
            type: "str",
            value: "",
          },
          {
            assigned: true,
            name: "bin",
            type: "str",
            value: "",
          },
          {
            assigned: true,
            name: "timeout",
            type: "float",
            value: "",
          },
        ],
        flow: {
          ok: -1,
          fail: -1,
          timeout: -1,
        },
        notify: {
          begin: {
            enable: false,
            url: "",
            userdata: "",
          },
          end: {
            enable: false,
            url: "",
            userdata: "",
          },
        },
        timeout: 0,
        need_trigger: false,
      },
    ],
    ui_data: [],
    _id: "68d51e31bc3cf1c9eb3a9867",
  },
  {
    last_task_index: 2,
    current_task_index: -1,
    status: "done",
    create_at: "2025-09-25T17:50:01.879000",
    update_at: "2025-09-25T17:50:01.906000",
    name: "qqw",
    start: 2,
    tasks: [
      {
        device_name: "RCS",
        name: "gen pre-schedule task",
        param: [
          {
            assigned: true,
            name: "pos",
            type: "str",
            value: "1",
          },
          {
            assigned: true,
            name: "priority",
            type: "int",
            value: "2",
          },
          {
            assigned: true,
            name: "timeout",
            type: "float",
            value: "3",
          },
        ],
        flow: {
          ok: -1,
          fail: -1,
          timeout: -1,
        },
        notify: {
          begin: {
            enable: false,
            url: "",
            userdata: "",
          },
          end: {
            enable: false,
            url: "",
            userdata: "",
          },
        },
        timeout: 0,
        need_trigger: false,
      },
      {
        device_name: "RCS",
        name: "cancel task",
        param: [
          {
            assigned: true,
            name: "task_id",
            type: "str",
            value: "",
          },
          {
            assigned: true,
            name: "timeout",
            type: "float",
            value: "",
          },
        ],
        flow: {
          ok: 1,
          fail: -1,
          timeout: 3,
        },
        notify: {
          begin: {
            enable: false,
            url: "",
            userdata: "",
          },
          end: {
            enable: false,
            url: "",
            userdata: "",
          },
        },
        timeout: 0,
        need_trigger: false,
      },
      {
        device_name: "RCS",
        name: "bind container and bin",
        param: [
          {
            assigned: true,
            name: "container",
            type: "str",
            value: "",
          },
          {
            assigned: true,
            name: "bin",
            type: "str",
            value: "",
          },
          {
            assigned: true,
            name: "timeout",
            type: "float",
            value: "",
          },
        ],
        flow: {
          ok: -1,
          fail: -1,
          timeout: -1,
        },
        notify: {
          begin: {
            enable: false,
            url: "",
            userdata: "",
          },
          end: {
            enable: false,
            url: "",
            userdata: "",
          },
        },
        timeout: 0,
        need_trigger: false,
      },
    ],
    ui_data: [],
    _id: "68d51e59bc3cf1c9eb3a9868",
  },
];

export default function MissionTemplatePage() {
  const [data, setData] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(false);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setData(mockData)
      setLoading(false)
    }, 500)
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
        visible={modalVisible}
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
