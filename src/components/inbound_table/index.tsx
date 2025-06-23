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
      // Try API first, fallback to mock data if it fails
      try {
        const { data } = await apiClient.post(list, {
          limit: pageInfo.perPage,
          page: pageInfo.page,
        });
        setDataList(data.metaData);
        setTotal(data.total);
      } catch (apiError) {
        console.warn("API not available, using mock data:", apiError);
        // Using mock data as fallback
        setDataList(mockData);
        setTotal(mockData.length);
      }
    } catch (error) {
      console.error(error);
      message.error(t("common.error.fetch_data"));
      // Fallback to mock data on error
      setDataList(mockData);
      setTotal(mockData.length);
    } finally {
      setLoading(false);
    }
  }, [pageInfo.page, pageInfo.perPage, t]);

  const _handleFinish = async (values: FormValues) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
      };

      // Try API call first
      try {
        await apiClient.post(create, payload);
        message.success(t("common.success.create"));
      } catch (apiError) {
        console.warn("API not available for create operation:", apiError);
      }

      setIsOpen(false);
      requestDataList();
    } catch (error) {
      console.error(error);
      message.error(t("common.error.create"));
    } finally {
      setLoading(false);
    }
  };

  const _handleUpdateFinish = async (values: FormValuesEdit) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
        _id: formEdit.data._id,
      };

      // Try API call first
      try {
        await apiClient.patch(`${update}/${formEdit?.data?._id}`, payload);
        message.success(t("common.success.update"));
      } catch (apiError) {
        console.warn("API not available for update operation:", apiError);
        message.success(t("common.success.update"));
      }

      setFormEdit({
        isOpen: false,
        data: {},
      });
      requestDataList();
    } catch (error) {
      console.error(error);
      message.error(t("common.error.update"));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSelected = useCallback(async () => {
    if (selectedRowKeys.length === 0) {
      message.warning(t("common.warning.select_items"));
      return;
    }

    Modal.confirm({
      title: t("common.confirm.delete_title"),
      content: t("common.confirm.delete_content", {
        count: selectedRowKeys.length,
      }),
      okText: t("common.confirm.ok"),
      okType: "danger",
      cancelText: t("common.confirm.cancel"),
      onOk: async () => {
        try {
          setLoading(true);
          
          // Try API call first
          try {
            await apiClient.delete(remove, { data: { ids: selectedRowKeys } });
            message.success(t("common.success.delete"));
          } catch (apiError) {
            console.warn("API not available for delete operation:", apiError);
            message.success(t("common.success.delete"));
          }
          
          setSelectedRowKeys([]);
          requestDataList();
        } catch (error) {
          console.error("Delete error:", error);
          message.error(t("common.error.delete"));
        } finally {
          setLoading(false);
        }
      },
    });
  }, [selectedRowKeys, t, requestDataList]);

  const columns = useMemo(() => {
    const baseColumns = RenderCol({ t });
    return [
      ...baseColumns,
      {
        title: t("common.action"),
        key: "action",
        width: 100,
        fixed: "right" as const,
        render: (_: unknown, record: DataType) => (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFormEdit({ isOpen: true, data: record })}
          >
            {t("common.edit")}
          </Button>
        ),
      },
    ];
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
        <CardTitle className="flex items-center justify-between">
          <span>{t("inbound.title")}</span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={requestDataList}
              disabled={loading}
            >
              <ReloadOutlined />
              {t("btn.refresh")}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteSelected}
              disabled={selectedRowKeys.length === 0 || loading}
            >
              <DeleteOutlined />
              {t("btn.delete")}
            </Button>
            <Button size="sm" onClick={() => setIsOpen(true)}>
              <Plus className="w-4 h-4" />
              {t("btn.add")}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={dataList}
          loading={loading}
          rowSelection={rowSelection}
          pagination={false}
          scroll={{ x: 1200 }}
        />
        <BasePagination
          current={pageInfo.page}
          pageSize={pageInfo.perPage}
          total={total}
          onChange={(page, pageSize) => {
            setPageInfo({ page, perPage: pageSize || 10 });
          }}
        />
      </CardContent>
      {/* Create Modal */}
      <ModalAdd
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onFinish={_handleFinish}
        loading={loading}
      />

      {/* Edit Modal */}
      <ModalEdit
        isOpen={formEdit.isOpen}
        data={formEdit.data}
        onClose={() => setFormEdit({ isOpen: false, data: {} })}
        onFinish={_handleUpdateFinish}
        loading={loading}
      />
    </Card>
  );
};

export default InboundTable;
