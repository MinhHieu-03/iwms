import { ReloadOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { message, Table, Modal, Space, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { Plus, UserPlus } from "lucide-react";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import BasePagination from "@/components/ui/antd-pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import apiClient from "@/lib/axios";

import {
  domain,
  lang_key,
  RenderCol,
  renderCreateForm,
  renderEditForm,
  UserDataType,
} from "./const";
import ModalAdd from "./modal_create";
import ModalEdit from "./modal_update";

const { list, create, update, remove } = domain;

const UserManagement = () => {
  const { i18n, t } = useTranslation();

  const [pageInfo, setPageInfo] = useState({
    page: 1,
    perPage: 10,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formEdit, setFormEdit] = useState<{
    isOpen: boolean;
    data: UserDataType | Record<string, unknown>;
  }>({
    isOpen: false,
    data: {
      name: "",
      email: "",
      password: "",
      role: "",
      status: "active",
      department: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [dataList, setDataList] = useState<UserDataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const requestDataList = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        limit: pageInfo.perPage,
        page: pageInfo.page,
      };
      const { data } = await apiClient.post(list, params);
      if (data) {
        setDataList(data.metaData || data.data || []);
        setTotal(data.total || 0);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
      message.error(t('common.fetch_error'));
    }
  }, [pageInfo.perPage, pageInfo.page, t]);

  const _handleFinish = (values: { [key: string]: unknown }) => {
    const payload = {
      ...values,
      ent_dt: new Date().toISOString(),
      upd_dt: new Date().toISOString(),
    };

    apiClient
      .post(create, payload)
      .then(() => {
        message.success(t('common.create_success'));
        setIsOpen(false);
        requestDataList();
      })
      .catch((err) => {
        message.error(err?.response?.data?.reason || err.message);
      });
  };

  const _handleUpdateFinish = (values: { [key: string]: unknown }) => {
    const payload = {
      ...values,
      upd_dt: new Date().toISOString(),
    };

    apiClient
      .patch(`${update}/${formEdit.data._id}`, payload)
      .then(() => {
        message.success(t('common.update_success'));
        setFormEdit({
          isOpen: false,
          data: {},
        });
        requestDataList();
      })
      .catch((err) => {
        message.error(err?.response?.data?.message || err.message);
      });
  };

  const _handleDelete = useCallback((id: string) => {
    Modal.confirm({
      title: t('common.confirm_delete'),
      content: t('common.confirm_delete_message'),
      okText: t('btn.delete'),
      cancelText: t('btn.cancel'),
      okType: 'danger',
      onOk() {
        apiClient
          .delete(`${remove}/${id}`)
          .then(() => {
            message.success(t('common.delete_success'));
            requestDataList();
          })
          .catch((err) => {
            message.error(err?.response?.data?.message || err.message);
          });
      },
    });
  }, [t, requestDataList]);

  const _handleBulkDelete = useCallback(() => {
    if (selectedRowKeys.length === 0) {
      message.warning(t('common.select_items_to_delete'));
      return;
    }

    Modal.confirm({
      title: t('common.confirm_bulk_delete'),
      content: t('common.confirm_bulk_delete_message', { count: selectedRowKeys.length }),
      okText: t('btn.delete'),
      cancelText: t('btn.cancel'),
      okType: 'danger',
      onOk() {
        Promise.all(
          selectedRowKeys.map(id => apiClient.delete(`${remove}/${id}`))
        )
          .then(() => {
            message.success(t('common.bulk_delete_success'));
            setSelectedRowKeys([]);
            requestDataList();
          })
          .catch((err) => {
            message.error(err?.response?.data?.message || err.message);
          });
      },
    });
  }, [selectedRowKeys, t, requestDataList]);

  const columns: ColumnsType<UserDataType> = useMemo(() => {
    const baseColumns = RenderCol({ t });
    
    const actionColumn: ColumnsType<UserDataType>[0] = {
      title: t('common.actions'),
      key: 'actions',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title={t('btn.edit')}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setFormEdit({
                  isOpen: true,
                  data: record,
                });
              }}
            >
              <EditOutlined className="h-4 w-4" />
            </Button>
          </Tooltip>
          <Tooltip title={t('btn.delete')}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => _handleDelete(record._id!)}
            >
              <DeleteOutlined className="h-4 w-4 text-red-500" />
            </Button>
          </Tooltip>
        </Space>
      ),
    };

    return [...baseColumns, actionColumn];
  }, [t, _handleDelete]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  useEffect(() => {
    requestDataList();
  }, [requestDataList]);

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              {t(`${lang_key}.title`) || "User Management"}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={requestDataList}
                disabled={loading}
              >
                <ReloadOutlined className="h-4 w-4" />
                {t('btn.refresh')}
              </Button>
              {selectedRowKeys.length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={_handleBulkDelete}
                >
                  <DeleteOutlined className="h-4 w-4" />
                  {t('btn.delete_selected')} ({selectedRowKeys.length})
                </Button>
              )}
              <Button
                size="sm"
                onClick={() => setIsOpen(true)}
              >
                <Plus className="h-4 w-4" />
                {t(`${lang_key}.add_user`)}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table
            dataSource={dataList}
            columns={columns}
            loading={loading}
            rowKey="_id"
            rowSelection={rowSelection}
            pagination={false}
            scroll={{ x: 1200 }}
            size="small"
          />
          
          <div className="flex justify-center mt-4">
            <BasePagination
              current={pageInfo.page}
              pageSize={pageInfo.perPage}
              total={total}
              onChange={(page, pageSize) => {
                setPageInfo({ page, perPage: pageSize || 10 });
              }}
              showSizeChanger
              showQuickJumper
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} items`
              }
            />
          </div>
        </CardContent>
      </Card>

      <ModalAdd
        title={t(`${lang_key}.add_user`)}
        itemsRender={renderCreateForm({ t })}
        _handleFinish={_handleFinish}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <ModalEdit
        title={t(`${lang_key}.edit_user`)}
        itemsRender={renderEditForm({ t })}
        _handleFinish={_handleUpdateFinish}
        isOpen={formEdit.isOpen}
        setIsOpen={(isOpen) =>
          setFormEdit((prev) => ({ ...prev, isOpen }))
        }
        data={formEdit.data}
      />
    </div>
  );
};

export default UserManagement;
