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

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await getMissionTemplate({});

      if (data?.success) {
        const filteredData = data.data
          .filter((template) => {
            return (
              template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              template.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            );
          })
          .map((template) => missionTemplateGenForm(template));

        setDataList(
          filteredData.slice(
            (pageInfo.page - 1) * pageInfo.perPage,
            pageInfo.page * pageInfo.perPage
          )
        );

        setTotal(filteredData.length);

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

  useEffect(() => {
    setPageInfo({ page: 1, perPage: pageInfo.perPage });
  }, [searchQuery]);

  useEffect(() => {
    fetchData();
  }, [searchQuery, pageInfo.page, pageInfo.perPage]);

  const handleDelete = async (payload: string[]) => {
    try {
      const { data } = await deleteMissionTemplate(payload);

      setSelectedRowKeys([]);

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
    }
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
        handleDelete={handleDelete}
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
    </div>
  );
};

export default App;
