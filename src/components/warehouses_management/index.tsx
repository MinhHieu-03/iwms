import { ReloadOutlined, DeleteOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Table, Modal } from "antd";
import { ColumnsType } from "antd/es/table";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
  DataType,
} from "./const";
import ModalAdd from "./modal_create";
import ModalEdit from "./modal_update";

const { list, create, update, upload, download, remove } = domain;

const App = () => {
  const { i18n, t } = useTranslation();

  // const userResponse = useSelector(selectUser) as IUserResponse;
  // const dispatch = useDispatch<any>();
  // const userPermission = {};
  // const permission =
  //   get(userPermission, "permission['manage_account/list_account']") || "";
  // const { showMessage } = useMessage();

  const [pageInfo, setPageInfo] = useState({
    page: 1,
    perPage: 10,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formEdit, setFormEdit] = useState<{
    isOpen: boolean;
    data: DataType | Record<string, unknown>;
  }>({
    isOpen: false,
    data: {
      name: "",
      description: "",
      createdAt: new Date().toISOString(),
    },
  });
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [dataList, setDataList] = useState<DataType[]>([]);
  const [dataRole, setDataRole] = useState<unknown[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const requestDataList = async () => {
    try {
      setLoading(true);
      const params = {
        limit: pageInfo.perPage,
        page: pageInfo.page,
      };
      const { data } = await apiClient.post(list, params);
      if (data) {
        setDataList(data.metaData);
        setTotal(data.total);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };
  const _handleFinish = (values: { [key: string]: unknown }) => {
    const payload = {
      ...values,
    };

    apiClient
      .post(create, payload)
      .then((data) => {
        // showMessage('success', t('msg.add_acc'));
        setIsOpen(false);
        requestDataList();
      })
      .catch((err) => {
        // showMessage('error', err?.response?.data?.message || err.message);
      });
  };

  const _handleUpdateFinish = (values: { [key: string]: unknown }) => {
    const payload = {
      ...values,
    };

    apiClient
      .patch(`${update}/${formEdit?.data?._id}`, payload)
      .then((data) => {
        // showMessage('success', t('msg.edit_acc'));
        setFormEdit({
          isOpen: false,
          data: {},
        });
        requestDataList();
      })
      .catch((err) => {
        // showMessage('error', err?.response?.data?.message || err.message);
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
          // Assuming API endpoint accepts array of ids
          await apiClient.delete(`${remove}`, {}, { ids: selectedRowKeys});
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

  const columns: ColumnsType<DataType> = useMemo(() => {
    const col = RenderCol({ t });
    return col || [];
  }, [t]);

  useEffect(() => {
    // if (!permission.includes('r')) return;
    requestDataList();
  }, [pageInfo]);

  const handleReload = () => {
    requestDataList();
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  return (
    <Card>
      <Header
        setIsOpen={setIsOpen}
        requestDataList={requestDataList}
        handleReload={handleReload}
        selectedRowKeys={selectedRowKeys}
        onDelete={handleDeleteSelected}
      />
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
          onRow={(record, rowIndex) => {
            return {
              onClick: (e) => {
                // Prevent row click action when clicking on checkboxes
                if (
                  (e.target as HTMLElement).closest(".ant-checkbox-wrapper")
                ) {
                  return;
                }
                setFormEdit({
                  isOpen: true,
                  data: record,
                });
              },
            };
          }}
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
        title={t("btn.add_acc")}
        itemsRender={renderCreateForm(dataRole, dataList)}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        _handleFinish={_handleFinish}
      />
      <ModalEdit
        title={t("manager_acc.edit_acc")}
        itemsRender={renderEditForm(dataRole)}
        formEdit={formEdit}
        setFormEdit={setFormEdit}
        _handleFinish={_handleUpdateFinish}
      />
    </Card>
  );
};

const Header = ({
  setIsOpen,
  requestDataList,
  handleReload,
  selectedRowKeys = [],
  onDelete,
}) => {
  const { t } = useTranslation();
  const uploadProps: UploadProps = {
    name: "file",
    accept: ".xlsx,.xls", // Only allow Excel files
    fileList: [],
    beforeUpload: (file) => {
      const formData = new FormData();
      formData.append("file", file);
      apiClient
        .upload(`${upload}`, formData)
        .then(() => {
          requestDataList();
          message.success("File uploaded successfully!");
        })
        .catch((err) => {
          console.error("Upload error:", err);
          message.error("File upload failed.");
        });

      return false;
    },
  };

  const handleDownload = async () => {
    try {
      const response = await apiClient.get(`${download}`, {
        responseType: "blob", // Important for binary files÷ßß
      });

      // Create a Blob URL
      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", "sku.xlsx"); // Replace with your desired file name
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      message.success("File downloaded successfully!");
    } catch (error) {
      message.error("File download failed.");
      console.error("Download error:", error);
    }
  };
  return (
    <CardHeader>
      <div
        className="flex items-center justify-between"
        style={{ padding: "10px 0" }}
      >
        <CardTitle>{t(lang_key)}</CardTitle>
        <div className="flex items-center">
          <>
            <Button onClick={() => setIsOpen(true)} variant="default">
              <Plus className="mr-2 h-4 w-4" />
              {t("btn.create_new")}
            </Button>
            {selectedRowKeys.length > 0 && (
              <Button onClick={onDelete} variant="destructive" className="ml-2">
                <DeleteOutlined className="mr-2" />
                {t("btn.delete")} ({selectedRowKeys.length})
              </Button>
            )}
            {/* <Upload {...uploadProps}>
              <Button className="ml-2" variant="outline">
                <UploadOutlined />
                {t("btn.import")}
              </Button>
            </Upload> */}
            {/* <Button className="ml-2" onClick={handleDownload} variant="outline"> */}
            <Button className="ml-2" onClick={handleReload} variant="outline">
              <ReloadOutlined />
              {t("btn.reload")}
            </Button>
          </>
        </div>
      </div>
    </CardHeader>
  );
};

export default App;
