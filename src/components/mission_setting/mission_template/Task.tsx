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

const mockData = [
  {
    mission_log_id: "68d51e09bc3cf1c9eb3a9865",
    result: {
      code: 1,
      desc: "Timeout to call api bind",
      flow: "timeout",
    },
    next: -1,
    status: "done",
    create_at: "2025-09-25T17:48:42.061000",
    update_at: "2025-09-25T17:48:42.146000",
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
    _id: "68d51e0abc3cf1c9eb3a9866",
  },
  {
    mission_log_id: "68d51e59bc3cf1c9eb3a9868",
    result: {
      code: 1,
      desc: "Timeout to call api bind",
      flow: "timeout",
    },
    next: -1,
    status: "done",
    create_at: "2025-09-25T17:50:01.912000",
    update_at: "2025-09-25T17:50:01.963000",
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
    _id: "68d51e59bc3cf1c9eb3a9869",
  },
];

const Task = () => {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 500);
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
        visible={modalVisible}
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
