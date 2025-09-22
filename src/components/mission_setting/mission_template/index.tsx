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
import { deleteMissionTemplate } from "@/api/missionSettingApi";
import { useToast } from "@/hooks/use-toast";

const { list, create, update, upload, download, remove } = domain;

const App = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [showDetail, setShowDetail] = useState("");
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    perPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [dataList, setDataList] = useState<DataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const reload = () => {
    setLoading(true);

    const filter_templates = mission_templates
      .filter((template) => {
        return (
          template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
      .map((template) => missionTemplateGenForm(template));
    setDataList(
      filter_templates.slice(
        (pageInfo.page - 1) * pageInfo.perPage,
        pageInfo.page * pageInfo.perPage
      )
    );
    setTotal(filter_templates.length);
    setLoading(false);
  };

  useEffect(reload, [pageInfo]);

  useEffect(() => {
    setPageInfo({ page: 1, perPage: pageInfo.perPage });
    reload();
  }, [searchQuery]);

  const handleDelete = async (payload: string[]) => {
    const { data } = await deleteMissionTemplate(payload);
    setSelectedRowKeys([]);
    reload();
    if (data.success) {
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
  };

  const columns: ColumnsType<DataType> = useMemo(() => {
    const col = RenderCol({ t });
    console.log("col", col);
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
            rowKey="id"
            loading={loading}
            columns={columns}
            dataSource={dataList}
            pagination={false}
            scroll={{ x: "calc(100vw - 640px)" }}
            onRow={(record, rowIndex) => {
              return {
                onClick: (e) => {
                  // navigate(`/mission-setting/template/${record.id}`);
                  setShowDetail(record.id);
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
            onClose={() => setShowDetail("")}
            open={!!showDetail}
          >
            <StorageHierarchyCard />
          </Drawer>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
