import { Drawer, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import BasePagination from "@/components/ui/antd-pagination";
import { Card, CardContent } from "@/components/ui/card";
import StorageHierarchyCard from "./StorageHierarchyCard";

import { mission_templates } from "@/data/missionData";
import {
  domain,
  missionTemplateGenForm,
  RenderCol,
  type DataType,
} from "./const";
import Header from "./header";
import {
  createMissionTemplate,
  deleteMissionTemplate,
  getMissionTemplate,
  runMissionApi,
} from "@/api/missionSettingApi";
import { useToast } from "@/hooks/use-toast";
import MissionForm from "./missionForm";
import { DeleteConfirmForm } from "@/components/common/DeleteConfirm";

const { list, create, update, upload, download, remove } = domain;

const App = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [showDetail, setShowDetail] = useState<any>(null);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    perPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [dataList, setDataList] = useState<DataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [selectedMission, setSelectedMission] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    data: string[];
    type: "single" | "multiple";
  }>({
    isOpen: false,
    data: [],
    type: "single",
  });

  const [allData, setAllData] = useState<DataType[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await getMissionTemplate({});

      if (data?.success) {
        const formattedData = data.data.map((template) =>
          missionTemplateGenForm(template)
        );
        setAllData(formattedData);

        toast({
          title: t("common.success"),
          description: data?.desc,
        });
      } else {
        toast({
          title: t("common.error"),
          description: data?.desc,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log("error", error);
      toast({
        title: t("common.error"),
        description: "An error occurred while fetching data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return allData;
    }

    return allData.filter((template) => {
      return (
        template.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [allData, searchQuery]);

  useEffect(() => {
    const startIndex = (pageInfo.page - 1) * pageInfo.perPage;
    const endIndex = startIndex + pageInfo.perPage;

    setDataList(filteredData.slice(startIndex, endIndex));
    setTotal(filteredData.length);
  }, [filteredData, pageInfo.page, pageInfo.perPage]);

  useEffect(() => {
    setPageInfo({ page: 1, perPage: pageInfo.perPage });
  }, [searchQuery]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (
    payload: string[],
    type: "single" | "multiple" = "single"
  ) => {
    setDeleteConfirm({
      isOpen: true,
      data: payload,
      type: type,
    });
  };

  const confirmDelete = async () => {
    try {
      const { data } = await deleteMissionTemplate(deleteConfirm.data);

      setSelectedRowKeys([]);
      setDeleteConfirm({
        isOpen: false,
        data: [],
        type: "single",
      });

      if (data.success) {
        fetchData();
        toast({
          title: t("common.delete_success"),
          description: data.desc,
        });
      } else {
        toast({
          title: t("common.delete_error"),
          description: data.desc,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log("error", error);
      setDeleteConfirm({
        isOpen: false,
        data: [],
        type: "single",
      });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm({
      isOpen: false,
      data: [],
      type: "single",
    });
  };

  const handleCreateMission = async (mission: any) => {
    try {
      const { data } = await createMissionTemplate(mission);

      if (data.success) {
        fetchData();
        toast({
          title: t("common.success"),
          description: data.desc,
        });
      } else {
        toast({
          title: t("common.error"),
          description: data.desc,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleRunButton = (mission: any) => {
    setSelectedMission(mission);
  };

  const handleRunMission = async (mission: any) => {
    try {
      const { data } = await runMissionApi(mission);

      if (data.success) {
        fetchData();
        toast({
          title: t("common.success"),
          description: data.desc,
        });
      } else {
        toast({
          title: t("common.error"),
          description: data.desc,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const columns: ColumnsType<DataType> = useMemo(() => {
    const col = RenderCol({ t, handleDelete, handleRunButton });
    return col || [];
  }, [t]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: string[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  return (
    <div className="space-y-4">
      <Header
        handleCreateMission={() =>
          setShowDetail({ mode: "new", onSubmit: handleCreateMission })
        }
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedRow={selectedRowKeys}
        handleDelete={(payload) => handleDelete(payload, "multiple")}
      />
      <Card>
        <CardContent>
          <Table
            rowSelection={rowSelection}
            size="middle"
            rowKey="_id"
            loading={loading}
            columns={columns}
            dataSource={dataList}
            pagination={false}
            scroll={{ x: "calc(100vw - 640px)" }}
            onRow={(record, rowIndex) => {
              return {
                onClick: (e) => {
                  // navigate(`/mission-setting/template/${record.id}`);
                  setShowDetail(record);
                },
              };
            }}
          />
          <BasePagination
            total={total}
            pageSize={pageInfo.perPage}
            current={pageInfo.page}
            onChange={(page: number, perPage: number) =>
              setPageInfo({ page, perPage })
            }
          />
          <Drawer
            title={t("mission_template.create_new_template")}
            height={"94vh"}
            placement="bottom"
            onClose={() => {
              setShowDetail(null);
              fetchData();
            }}
            open={!!showDetail}
          >
            <StorageHierarchyCard
              missionData={showDetail}
              mode={showDetail?._id ? "update" : "create"}
              onSubmit={handleCreateMission}
            />
          </Drawer>
        </CardContent>
      </Card>
      <MissionForm
        isOpen={selectedMission !== null}
        onClose={() => setSelectedMission(null)}
        onSubmit={handleRunMission}
        data={selectedMission}
      />
      <DeleteConfirmForm
        isOpen={deleteConfirm.isOpen}
        confirmation={
          deleteConfirm.type === "single"
            ? t("mission_template.delete_single_confirm")
            : t("mission_template.delete_multiple_confirm", {
                count: deleteConfirm.data.length,
              })
        }
        data={deleteConfirm.data}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default App;
