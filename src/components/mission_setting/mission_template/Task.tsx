import { CardContent, CardTitle } from "@/components/ui/card";
import wcsApiClient from "@/lib/wcsApiConfig";
import { FilterOutlined } from "@ant-design/icons";
import { Button, Card, Descriptions, Modal, Table, Tag, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import SearchForm from "./filterTask";
import { Filter } from "lucide-react";
import dayjs from "dayjs";

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

const Task = () => {
  const [data, setData] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [pageInfo, setPageInfo] = useState({ page: 1, perPage: 10 });

  const [filters, setFilters] = useState({
    mission_log_id: "",
    status: null,
    from_time: null,
    to_time: null,
  });
  const [showFilters, setShowFilters] = useState(false);

  const columns = [
    {
      title: "Misson log id",
      dataIndex: "mission_log_id",
      key: "mission_log_id",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const statusColorMap: Record<string, string> = {
          created: "blue",
          "begin notify": "geekblue",
          "end notify": "orange",
          done: "green",
        };

        return <Tag color={statusColorMap[status] || "gray"}>{status}</Tag>;
      },
    },
    {
      title: "Updated At",
      dataIndex: "update_at",
      key: "update_at",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
  ];

  const getTaskList = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        mission_log_id: filters.mission_log_id || undefined,
        status: filters.status || undefined,
        from_time: filters.from_time || undefined,
        to_time: filters.to_time || undefined,
      };

      const { data } = await wcsApiClient.get("/log/task", params);
      if (data.success) {
        const sorted = [...data.data].sort(
          (a: Task, b: Task) =>
            new Date(b.create_at).getTime() - new Date(a.create_at).getTime()
        );
        setData(sorted);
      } else {
        message.error(data.desc || "Không thể tải danh sách task");
      }
    } catch (error: any) {
      message.error(
        error?.response?.data?.message || "Lỗi khi tải danh sách task"
      );
    } finally {
      setLoading(false);
    }
  }, [pageInfo, filters]);

  useEffect(() => {
    getTaskList();
  }, []);

  const handleRowClick = (record: Task) => {
    setSelectedTask(record);
    setModalVisible(true);
  };

  return (
    <>
      <Card>
        <CardContent>
          <SearchForm
            filters={filters}
            onFilterChange={setFilters}
            onSubmit={getTaskList}
          />
          <Table
            loading={loading}
            dataSource={data}
            columns={columns}
            rowKey="_id"
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
              style: { cursor: "pointer" },
            })}
            pagination={{
              current: pageInfo.page,
              pageSize: pageInfo.perPage,
              onChange: (page) => setPageInfo((prev) => ({ ...prev, page })),
            }}
          />

          <Modal
            title="Task"
            open={modalVisible}
            footer={
              <Button onClick={() => setModalVisible(false)}>Close</Button>
            }
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
                  Code: {selectedTask.result.code}, Desc:{" "}
                  {selectedTask.result.desc}, Flow: {selectedTask.result.flow}
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
                  Enable: {selectedTask.notify.begin.enable ? "Yes" : "No"},
                  URL: {selectedTask.notify.begin.url}, Userdata:{" "}
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
        </CardContent>
      </Card>
    </>
  );
};

export default Task;
