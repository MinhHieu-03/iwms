import {
  ReloadOutlined,
  DeleteOutlined,
  UploadOutlined,
  LoginOutlined,
  LockFilled,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Table, Modal, Avatar } from "antd";
import { ColumnsType } from "antd/es/table";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import BasePagination from "@/components/ui/antd-pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import apiClient from "@/lib/axios";
import { z } from "zod";
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
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login, logout } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
const { list, create, update, upload, download, remove } = domain;

const InboundManagement = () => {
  const { i18n, t } = useTranslation();

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
      sku: "",
      quantity: 0,
      storeMethod: "Bin",
      packingMethod: "Carton",
      bin_code: "",
      supplier: "",
      invoice_code: "",
      status: "new",
      note: "",
      createdAt: new Date().toISOString(),
    },
  });
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [dataList, setDataList] = useState<DataType[]>([]);
  const [dataRole, setDataRole] = useState<unknown[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const requestDataList = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        limit: pageInfo.perPage,
        page: pageInfo.page,
      };
      const { data } = await apiClient.post(list, {
        ...params,
        populate: ["inventory"],
      });
      if (data) {
        setDataList(data.metaData);
        setTotal(data.total);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  }, [pageInfo.page, pageInfo.perPage]);

  const _handleFinish = (values: { [key: string]: unknown }) => {
    const payload = {
      ...values,
    };

    apiClient
      .post(create, payload)
      .then((data) => {
        message.success(t("common.create_success"));
        setIsOpen(false);
        requestDataList();
      })
      .catch((err) => {
        message.error(err?.response?.data?.message || err.message);
      });
  };

  const _handleUpdateFinish = (values: { [key: string]: unknown }) => {
    const payload = {
      ...values,
    };

    apiClient
      .patch(`${update}/${formEdit?.data?._id}`, payload)
      .then((data) => {
        message.success(t("common.update_success"));
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
          await apiClient.delete(`${remove}`, {}, { ids: selectedRowKeys });
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
    if (isAuthenticated) {
      requestDataList();
    } else {
      setDataList([]);
      setTotal(0);
    }
  }, [requestDataList, isAuthenticated]);

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
          scroll={{ x: "calc(100vw - 640px)" }}
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
          current={pageInfo.page}
          onChange={(page: number, perPage: number) =>
            setPageInfo({ page, perPage })
          }
        />
      </CardContent>
      <ModalAdd
        title={"OI nhập kho"}
        itemsRender={renderCreateForm(dataRole, dataList, t)}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        _handleFinish={_handleFinish}
      />
      {/* <ModalEdit
        title={t("inbound_management.edit_inbound")}
        itemsRender={renderEditForm(dataRole, t)}
        formEdit={formEdit}
        setFormEdit={setFormEdit}
        _handleFinish={_handleUpdateFinish}
      /> */}
    </Card>
  );
};

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Header = ({
  setIsOpen,
  requestDataList,
  handleReload,
  selectedRowKeys = [],
  onDelete,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { isAuthenticated, loading, error } = useAppSelector(
    (state) => state.auth
  );
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [user, setUser] = useState<any>(
    JSON.parse(localStorage.getItem("user") || "{}")
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleLogin = async (values: z.infer<typeof formSchema>) => {
    const resultAction = await dispatch(
      login({
        username: values.username,
        password: values.password,
      })
    );
    console.log("resultAction", resultAction);
    setIsOpenForm(false);

    if (login.fulfilled.match(resultAction)) {
      setUser(resultAction.payload.user);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    }
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Login failed",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

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
          message.success(t("common.upload_success"));
        })
        .catch((err) => {
          console.error("Upload error:", err);
          message.error(t("common.upload_error"));
        });

      return false;
    },
  };

  const handleDownload = async () => {
    try {
      const response = await apiClient.get(`${download}`, {
        responseType: "blob",
      });

      // Create a Blob URL
      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", "inbound.xlsx");
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      // message.success(t("common.download_success"));
    } catch (error) {
      // message.error(t("common.download_error"));
      console.error("Download error:", error);
    }
  };

  return (
    <CardHeader>
      <div
        className="flex items-center justify-between"
        style={{ padding: "10px 0" }}
      >
        <CardTitle>Yêu cầu nhập kho</CardTitle>
        <div className="flex items-center">
          <Button onClick={() => setIsOpen(true)} variant="default">
            <Plus className="mr-2 h-4 w-4" />
            OI nhập kho
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
          </Upload>
          <Button className="ml-2" onClick={handleDownload} variant="outline">
            {t("btn.export")}
          </Button> */}
          <Button className="ml-2" onClick={handleReload} variant="outline">
            <ReloadOutlined />
            Làm mới
          </Button>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="ml-2" variant="outline">
                  <UserOutlined />
                  {user?.name || ""}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium">{user?.name || ""}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => dispatch(logout())}>
                  <LogoutOutlined className="mr-2 h-4 w-4" />
                  <span className="text-red-500">{t("logout")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              className="ml-2"
              onClick={() => setIsOpenForm(true)}
              variant="default"
            >
              <UserOutlined />
              {t("login")}
            </Button>
          )}
        </div>
      </div>
      <Modal
        open={isOpenForm}
        onCancel={() => setIsOpenForm(false)}
        footer={null}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("username")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("username")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("password")}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("password")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t("loading") : t("login")}
            </Button>
          </form>
        </Form>
      </Modal>
    </CardHeader>
  );
};

export default InboundManagement;
