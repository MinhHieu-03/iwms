import { ReloadOutlined, DeleteOutlined } from "@ant-design/icons";
import { message, Table, Modal, Tag } from "antd";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import BasePagination from "@/components/ui/antd-pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import apiClient from "@/lib/axios";

import { domain, lang_key, RenderCol, DataType } from "./const";
import ModalAdd, { type FormValues } from "./modal_create";
import ModalEdit, { type FormValues as FormValuesEdit } from "./modal_update";

const { list, create, update, remove } = domain;

// Mock data for development - replace with actual API call
const mockData: DataType[] = [
  {
    _id: "1",
    pic: "admin",
    sku: "8898-3254",
    origin: "inbound",
    product_name: "nhua 32",
    destination: "A-02/01-03",
    status: "wait_fill",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "2",
    pic: "user1",
    sku: "7745-1122",
    origin: "inbound",
    product_name: "kim loai 15",
    destination: "B-01/02-05",
    status: "in_progress",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "3",
    pic: "user2",
    sku: "9988-7766",
    origin: "outbound",
    product_name: "go tre 22",
    destination: "C-03/01-01",
    status: "completed",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "4",
    pic: "admin",
    sku: "1122-3344",
    origin: "internal",
    product_name: "thep 45",
    destination: "A-01/03-02",
    status: "cancelled",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const InboundTable = () => {
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

  const requestDataList = useCallback(async () => {
    try {
      setLoading(true);
      // For now, using mock data - replace with actual API call
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
  }, [pageInfo.page, pageInfo.perPage]);

  const _handleFinish = (values: FormValues) => {
    const payload = {
      ...values,
    };

    apiClient
      .post(create, payload)
      .then(() => {
        message.success(t("inbound.message.create_success"));
        setIsOpen(false);
        requestDataList();
      })
      .catch((err) => {
        message.error(t("inbound.message.create_error"));
        console.error(err);
      });
  };

  const _handleUpdateFinish = (values: FormValuesEdit) => {
    const payload = {
      ...values,
    };

    apiClient
      .patch(`${update}/${formEdit?.data?._id}`, payload)
      .then(() => {
        message.success(t("inbound.message.update_success"));
        setFormEdit({
          isOpen: false,
          data: {},
        });
        requestDataList();
      })
      .catch((err) => {
        message.error(t("inbound.message.update_error"));
        console.error(err);
      });
  };

  const handleDeleteSelected = () => {
    if (selectedRowKeys.length === 0) return;

    Modal.confirm({
      title: t("inbound.message.confirm_delete"),
      content: t("inbound.message.confirm_delete_multiple", {
        count: selectedRowKeys.length,
      }),
      okText: t("inbound.btn.delete"),
      okType: "danger",
      cancelText: t("inbound.btn.cancel"),
      onOk: async () => {
        try {
          setLoading(true);
          await apiClient.delete(remove, {}, { ids: selectedRowKeys });
          message.success(t("inbound.message.delete_success"));
          setSelectedRowKeys([]);
          requestDataList();
        } catch (error) {
          console.error("Delete error:", error);
          message.error(t("inbound.message.delete_error"));
          setLoading(false);
        }
      },
    });
  };

  const columns = useMemo(() => {
    const baseColumns = RenderCol({ t });
    // Enhance status column with Tag component
    return baseColumns.map(col => {
      if (col.key === 'status') {
        return {
          ...col,
          render: (status: string) => {
            const statusMap: Record<string, { text: string; color: string }> = {
              wait_fill: { text: t("inbound.status.wait_fill"), color: "orange" },
              in_progress: { text: t("inbound.status.in_progress"), color: "blue" },
              completed: { text: t("inbound.status.completed"), color: "green" },
              cancelled: { text: t("inbound.status.cancelled"), color: "red" },
            };
            
            const statusInfo = statusMap[status] || { text: status, color: "default" };
            return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
          },
        };
      }
      return col;
    });
  }, [t]);

  useEffect(() => {
    requestDataList();
  }, [pageInfo, requestDataList]);

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
              {t("inbound.btn.create_new")}
            </Button>
            {selectedRowKeys.length > 0 && (
              <Button
                onClick={handleDeleteSelected}
                variant="destructive"
                className="ml-2"
              >
                <DeleteOutlined className="mr-2" />
                {t("inbound.btn.delete")} ({selectedRowKeys.length})
              </Button>
            )}
            <Button
              className="ml-2"
              onClick={requestDataList}
              variant="outline"
            >
              <ReloadOutlined />
              {t("inbound.btn.reload")}
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
          scroll={{ x: "calc(100vw - 640px)" }}
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
          current={pageInfo.page}
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

export default InboundTable;
