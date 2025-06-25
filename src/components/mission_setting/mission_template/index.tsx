import { ReloadOutlined, DeleteOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Table, Modal, Drawer } from "antd";
import { ColumnsType } from "antd/es/table";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import BasePagination from "@/components/ui/antd-pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import apiClient from "@/lib/axios";
import Detail from "./update";

import { mission_templates } from "@/data/missionData";
import {
  domain,
  RenderCol,
  type DataType, missionTemplateGenForm
} from "./const";
import Header from "./header";

const { list, create, update, upload, download, remove } = domain;

const App = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [showDetail, setShowDetail] = useState("");
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    perPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [dataList, setDataList] = useState<DataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  
  const reload = () => {
    setLoading(true);
    
    const filter_templates = mission_templates.filter(template => {
      return template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .map(template => missionTemplateGenForm(template));
    setDataList(filter_templates.slice(
      (pageInfo.page - 1) * pageInfo.perPage,
      pageInfo.page * pageInfo.perPage
    ));
    setTotal(filter_templates.length);
    setLoading(false);
  };
  useEffect(reload, [pageInfo]);
  useEffect(() => {
    setPageInfo({ page: 1, perPage: pageInfo.perPage });
    reload();
  }, [searchQuery]);

  const columns: ColumnsType<DataType> = useMemo(() => {
    const col = RenderCol({ t });
    console.log("col", col);
    return col || [];
  }, [t]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  return (
    <div className="space-y-4">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
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
            scroll={{ x: 'calc(100vw - 640px)' }}
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
            height={'94vh'}
            placement="bottom"
            onClose={() => setShowDetail("")}
            open={!!showDetail}
            >
              <Detail />
          </Drawer>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
