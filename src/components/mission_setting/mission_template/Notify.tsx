import React, { useCallback, useEffect, useState } from "react";
import { Table, Modal, Descriptions, Tag, message, Card } from "antd";
import wcsApiClient from "@/lib/wcsApiConfig";
import { CardContent } from "@/components/ui/card";
import SearchForm from "./filterNotify";
import dayjs from "dayjs";

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

const Notify = () => {
  const [data, setData] = useState<Notify[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedNotify, setSelectedNotify] = useState<Notify | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [pageInfo, setPageInfo] = useState({ page: 1, perPage: 10 });
  const [filters, setFilters] = useState({
    task_log_id: "",
    status: null,
    from_time: null,
    to_time: null,
  });

  const getNotifyList = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        name: filters.task_log_id || undefined,
        status: filters.status || undefined,
        from_time: filters.from_time || undefined,
        to_time: filters.to_time || undefined,
      };

      const { data } = await wcsApiClient.get("/log/notify", params);
      if (data.success) {
        const sorted = [...data.data].sort(
          (a: Notify, b: Notify) =>
            new Date(b.create_at).getTime() - new Date(a.create_at).getTime()
        );
        setData(sorted);
      } else {
        message.error(data.desc || "Không thể tải danh sách notify");
      }
    } catch (error: any) {
      message.error(
        error?.response?.data?.message || "Lỗi khi tải danh sách notify"
      );
    } finally {
      setLoading(false);
    }
  }, [pageInfo, filters]);

  useEffect(() => {
    getNotifyList();
  }, []);

  const columns = [
    {
      title: "Task log id",
      dataIndex: ["message", "task_log_id"],
      key: "task_log_id",
    },
    {
      title: "Type",
      dataIndex: ["message", "type"],
      key: "type",
      render: (type: string) => (
        <Tag color={type === "begin" ? "green" : "red"}>{type}</Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const statusColorMap: Record<string, string> = {
          created: "blue",
          failed: "red",
          done: "green",
        };

        return <Tag color={statusColorMap[status] || "gray"}>{status}</Tag>;
      },
    },
    { title: "Attempts", dataIndex: "attempt", key: "attempt" },
    {
      title: "Updated At",
      dataIndex: "update_at",
      key: "update_at",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
  ];

  return (
    <>
      <Card>
        <CardContent>
          <SearchForm
            filters={filters}
            onFilterChange={setFilters}
            onSubmit={getNotifyList}
          />
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
                      Name: {selectedNotify.message.device_state.name} <br />
                      Type: {selectedNotify.message.device_state.type} <br />
                      Connected:{" "}
                      {selectedNotify.message.device_state.connected
                        ? "Yes"
                        : "No"}
                    </>
                  ) : (
                    "N/A"
                  )}
                </Descriptions.Item>
              </Descriptions>
            )}
          </Modal>
        </CardContent>
      </Card>
    </>
  );
};

export default Notify;
