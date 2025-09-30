import React, { useEffect, useState } from "react";
import { Table, Modal, Descriptions, Button, Spin, Tag } from "antd";

interface Param {
  name: string;
  type: string;
  value: string | number;
}

interface DeviceState {
  name: string;
  type: string;
  description: string;
  connected: boolean;
  setting: Record<string, any>;
  config: Record<string, any>;
  state: Record<string, any>;
  _id: string;
}

interface Message {
  task_log_id: string;
  device_name: string;
  task_name: string;
  param: Param[];
  result: {
    code: number;
    desc: string;
    flow: string;
  };
  userdata: string;
  device_state: DeviceState;
}

interface Notify {
  _id: string;
  type: string;
  url: string;
  message: Message;
  status: string;
  attempt: number;
  create_at: string;
  update_at: string;
}

const mockData = [
  {
    type: "begin",
    url: "http://example.com",
    message: {
      task_log_id: "68ca8b2a5fab7b5fd496d5c0",
      device_name: "RCS1",
      task_name: "gen pre-schedule task",
      param: [
        {
          name: "pos",
          type: "str",
          value: "PK01",
        },
        {
          name: "priority",
          type: "int",
          value: "1",
        },
        {
          name: "timeout",
          type: "float",
          value: "10",
        },
      ],
      result: {
        code: 0,
        desc: "",
        flow: "ok",
      },
      userdata: "my data 1",
      device_state: {
        name: "RCS1",
        type: "RCS",
        description: "my rcs",
        connected: true,
        setting: {},
        config: {
          host: "192.168.0.10",
          port: 8000,
        },
        state: {
          mission: {},
        },
        _id: "68ca8ae6805624d69928bd92",
      },
    },
    status: "failed",
    attempt: 10,
    create_at: "2025-09-17T17:19:22.183000",
    update_at: "2025-09-19T15:46:31.156000",
    _id: "68ca8b2a5fab7b5fd496d5c1",
  },
];

const Notify = () => {
  const [data, setData] = useState<Notify[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedNotify, setSelectedNotify] = useState<Notify | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const columns = [
    {
      title: "Device Name",
      dataIndex: ["message", "device_name"],
      key: "device_name",
    },
    {
      title: "Task Name",
      dataIndex: ["message", "task_name"],
      key: "task_name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "done" ? "green" : "blue"}>{status}</Tag>
      ),
    },
    { title: "Attempts", dataIndex: "attempt", key: "attempt" },
    { title: "Created At", dataIndex: "create_at", key: "create_at" },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 500);
  }, []);

  const handleRowClick = (record: Notify) => {
    setSelectedNotify(record);
    setModalVisible(true);
  };

  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <Table
          loading={loading}
          dataSource={data}
          columns={columns}
          rowKey="_id"
          onRow={(record) => ({
            onClick: () => {
              setSelectedNotify(record);
              setModalVisible(true);
            },
          })}
          style={{ cursor: "pointer" }}
        />
      )}

      <Modal
        title="Notify"
        open={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
        width={700}
      >
        {selectedNotify && (
          <Descriptions title="Notify Details" bordered column={1}>
            <Descriptions.Item label="Type">
              {selectedNotify.type}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag
                color={selectedNotify.status === "done" ? "green" : "blue"}
              ></Tag>
              {selectedNotify.status}
            </Descriptions.Item>
            <Descriptions.Item label="Attempts">
              {selectedNotify.attempt}
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {selectedNotify.create_at}
            </Descriptions.Item>
            <Descriptions.Item label="Updated At">
              {selectedNotify.update_at}
            </Descriptions.Item>
            <Descriptions.Item label="Device Name">
              {selectedNotify.message.device_name}
            </Descriptions.Item>
            <Descriptions.Item label="Task Name">
              {selectedNotify.message.task_name}
            </Descriptions.Item>
            <Descriptions.Item label="Userdata">
              {selectedNotify.message.userdata}
            </Descriptions.Item>
            <Descriptions.Item label="Result">
              Code: {selectedNotify.message.result.code}, Desc:{" "}
              {selectedNotify.message.result.desc}, Flow:{" "}
              {selectedNotify.message.result.flow}
            </Descriptions.Item>
            <Descriptions.Item label="Params">
              {selectedNotify.message.param?.map((p, idx) => (
                <div key={`${p.name}-${idx}`}>
                  {p.name} ({p.type}): {p.value ?? "N/A"}
                </div>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="Device State">
              {selectedNotify.message.device_state ? (
                <>
                  Name: {selectedNotify.message.device_state.name}, Type:{" "}
                  {selectedNotify.message.device_state.type}, Connected:{" "}
                  {selectedNotify.message.device_state.connected ? "Yes" : "No"}
                </>
              ) : (
                "N/A"
              )}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
};

export default Notify;
