import { useCallback, useEffect, useState } from "react";
import { Table, Tag, Button, Popconfirm, message, Card } from "antd";
import wcsApiClient from "@/lib/wcsApiConfig";
import { Pause, Play, XCircle } from "lucide-react";
import ModalMission from "./ModalMission";
import BasePagination from "@/components/ui/antd-pagination";
import ModalTrigger from "./ModalTrigger";
import SearchForm from "./filterMission";
import { CardContent } from "@/components/ui/card";
import dayjs from "dayjs";

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

export default function MissionTemplatePage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Mission[]>([]);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    perPage: 10,
  });
  const [detailVisible, setDetailVisible] = useState(false);
  const [triggerVisible, setTriggerVisible] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    status: null,
    from_time: null,
    to_time: null,
  });

  const getMissionList = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        name: filters.name || undefined,
        status: filters.status || undefined,
        from_time: filters.from_time || undefined,
        to_time: filters.to_time || undefined,
      };

      const { data } = await wcsApiClient.get("/log/mission", params);
      if (data.success) {
        const sorted = [...data.data].sort(
          (a: Mission, b: Mission) =>
            new Date(b.create_at).getTime() - new Date(a.create_at).getTime()
        );
        setData(sorted);
      } else {
        message.error(data.desc || "Không thể tải danh sách mission");
      }
    } catch (error: any) {
      message.error(
        error?.response?.data?.message || "Lỗi khi tải danh sách mission"
      );
    } finally {
      setLoading(false);
    }
  }, [pageInfo, filters]);

  useEffect(() => {
    getMissionList();
  }, []);

  const pauseMission = async (record: Mission) => {
    try {
      const { data } = await wcsApiClient.post("/mission/trigger", {
        id: record._id,
        trig: "pause",
      });

      if (data.success) {
        message.success(`Mission "${record.name}" đã tạm dừng`);
        getMissionList();
      } else {
        message.error(data.desc || "Tạm dừng mission thất bại");
      }
    } catch (error: any) {
      console.error("pauseMission error", error);
      message.error(
        error?.response?.data?.message || "Tạm dừng mission thất bại"
      );
    }
  };

  const cancelMission = async (record: Mission) => {
    try {
      const { data } = await wcsApiClient.post("/mission/trigger", {
        id: record._id,
        trig: "cancel",
      });

      if (data.success) {
        message.success(`Mission "${record.name}" đã bị hủy`);
        getMissionList();
      } else {
        message.error(data.desc || "Hủy mission thất bại");
      }
    } catch (error: any) {
      console.error("cancelMission error", error);
      message.error(error?.response?.data?.message || "Hủy mission thất bại");
    }
  };

  const resumeMission = async (record: Mission) => {
    setSelectedMission(record);
    setTriggerVisible(true);
  };

  const missionColumns = [
    { title: "ID", dataIndex: "_id", key: "_id" },
    { title: "Template Name", dataIndex: "name", key: "name" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const statusColorMap: Record<string, string> = {
          new: "blue",
          process: "geekblue",
          pause: "orange",
          done: "green",
          no_task: "default",
          cancelled: "red",
        };

        return <Tag color={statusColorMap[status] || "gray"}>{status}</Tag>;
      },
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
    {
      title: "Updated At",
      dataIndex: "update_at",
      key: "update_at",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, record: Mission) => (
        <div className="flex items-center justify-center gap-2">
          {/* Resume */}
          <Button
            onClick={(e) => {
              e.stopPropagation();
              resumeMission(record);
            }}
          >
            <Play className="h-4 w-4 text-green-600" />
          </Button>

          {/* Pause */}
          <Popconfirm
            title={`Bạn có chắc muốn tạm dừng "${record.name}"?`}
            onConfirm={(e) => {
              e?.stopPropagation();
              pauseMission(record);
            }}
            onCancel={(e) => e?.stopPropagation()}
            okText="Có"
            cancelText="Không"
          >
            <Button onClick={(e) => e.stopPropagation()}>
              <Pause className="h-4 w-4 text-yellow-600" />
            </Button>
          </Popconfirm>

          {/* Cancel */}
          <Popconfirm
            title={`Bạn có chắc muốn hủy "${record.name}"?`}
            onConfirm={(e) => {
              e?.stopPropagation();
              cancelMission(record);
            }}
            onCancel={(e) => e?.stopPropagation()}
            okText="Có"
            cancelText="Không"
          >
            <Button danger onClick={(e) => e.stopPropagation()}>
              <XCircle className="h-4 w-4 text-red-600" />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <Card>
        <CardContent>
          <SearchForm
            filters={filters}
            onFilterChange={setFilters}
            onSubmit={getMissionList}
          />
          <Table
            loading={loading}
            dataSource={data}
            columns={missionColumns}
            rowKey="_id"
            onRow={(record) => ({
              onClick: () => {
                setSelectedMission(record);
                setDetailVisible(true);
              },
            })}
            style={{ cursor: "pointer" }}
          />
        </CardContent>

        <ModalMission
          visible={detailVisible}
          onClose={() => setDetailVisible(false)}
          mission={selectedMission}
        />

        <ModalTrigger
          detailVisible={triggerVisible}
          onClose={() => setTriggerVisible(false)}
          mission={selectedMission}
          fetchMissions={getMissionList}
          page={pageInfo.page}
          limit={pageInfo.perPage}
        />
      </Card>
    </>
  );
}
