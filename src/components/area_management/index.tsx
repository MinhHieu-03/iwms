import { ReloadOutlined, DeleteOutlined } from "@ant-design/icons";
import { message, Table, Modal } from "antd";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import BasePagination from "@/components/ui/antd-pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import apiClient from "@/lib/axios";

import { domain, lang_key, RenderCol, DataType } from "./const";
import ModalAdd from "./modal_create";
import ModalEdit from "./modal_update";

const { list, create, update, remove } = domain;

const AreaManagement = () => {
  const { t } = useTranslation();
  const [pageInfo, setPageInfo] = useState({ page: 1, perPage: 10 });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [dataList, setDataList] = useState<DataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [formEdit, setFormEdit] = useState<{
    isOpen: boolean;
    data: DataType | Record<string, unknown>;
  }>({
    isOpen: false,
    data: {},
  });

  const requestDataList = async () => {
    try {
      setLoading(true);
      const { data } = await apiClient.post(list, {
        limit: pageInfo.perPage,
        page: pageInfo.page,
      });
      setDataList(data.metaData);
      setTotal(data.total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const _handleFinish = (values: { [key: string]: unknown }) => {
    const payload = {
      ...values,
    };

    apiClient
      .post(create, payload)
      .then(() => {
        message.success(t("common.create_success"));
        setIsOpen(false);
        requestDataList();
      })
      .catch((err) => {
        message.error(t("common.create_error"));
        console.error(err);
      });
  };

  const _handleUpdateFinish = (values: { [key: string]: unknown }) => {
    const payload = {
      ...values,
    };

    apiClient
      .patch(`${update}/${formEdit?.data?._id}`, payload)
      .then(() => {
        message.success(t("common.update_success"));
        setFormEdit({
          isOpen: false,
          data: {},
        });
        requestDataList();
      })
      .catch((err) => {
        message.error(t("common.update_error"));
        console.error(err);
      });
  };

  const handleDeleteSelected = () => {
    if (selectedRowKeys.length === 0) return;

    Modal.confirm({
      title: t("common.confirm_delete"),
      content: t("common.confirm_delete_multiple", {
        count: selectedRowKeys.length,
      }),
      okText: t("common.delete"),
      okType: "danger",
      cancelText: t("common.cancel"),
      onOk: async () => {
        try {
          setLoading(true);
          await apiClient.delete(remove, {}, { ids: selectedRowKeys });
          message.success(t("common.delete_success"));
          setSelectedRowKeys([]);
          requestDataList();
        } catch (error) {
          console.error("Delete error:", error);
          message.error(t("common.delete_error"));
          setLoading(false);
        }
      },
    });
  };

  const columns = useMemo(() => RenderCol({ t }), [t]);

  useEffect(() => {
    requestDataList();
  }, [pageInfo]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between py-2">
          <CardTitle>{t(lang_key)}</CardTitle>
          <div className="flex items-center">
            <Button onClick={() => setIsOpen(true)} variant="default">
              <Plus className="mr-2 h-4 w-4" />
              {t("btn.create_new")}
            </Button>
            {selectedRowKeys.length > 0 && (
              <Button onClick={handleDeleteSelected} variant="destructive" className="ml-2">
                <DeleteOutlined className="mr-2" />
                {t("btn.delete")} ({selectedRowKeys.length})
              </Button>
            )}
            <Button className="ml-2" onClick={requestDataList} variant="outline">
              <ReloadOutlined />
              {t("btn.reload")}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table
          rowSelection={rowSelection}
          size="middle"
          rowKey="_id"
          loading={loading}
          columns={columns}
          dataSource={dataList}
          pagination={false}
          scroll={{ x: 'calc(100vw - 640px)' }}
          onRow={(record) => ({
            onClick: (e) => {
              if (!(e.target as HTMLElement).closest(".ant-checkbox-wrapper")) {
                setFormEdit({ isOpen: true, data: record });
              }
            },
          })}
        />
        <BasePagination
          total={total}
          pageSize={pageInfo.perPage}
          currentPage={pageInfo.page}
          onChange={(page: number, perPage: number) =>
            setPageInfo({ page, perPage })
          }
        />
      </CardContent>
      <ModalAdd
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        _handleFinish={_handleFinish}
      />
      <ModalEdit
        formEdit={formEdit}
        setFormEdit={setFormEdit}
        _handleFinish={_handleUpdateFinish}
      />
    </Card>
  );
};

export default AreaManagement;
