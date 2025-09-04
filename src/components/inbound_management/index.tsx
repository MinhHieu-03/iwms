import { DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { keyBy, uniq } from "lodash";
import type { UploadProps } from "antd";
import { message, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import OutboundHeader from "@/components/OutboundHeader";
import BasePagination from "@/components/ui/antd-pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import apiClient from "@/lib/axios";
import { login } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { DataType, domain, RenderCol, renderCreateForm } from "./const";
import ModalAdd from "./modal_create";
const { list, create, update, upload, download, remove } = domain;

const InboundManagement = () => {
  const { i18n, t } = useTranslation();
  const queryClient = useQueryClient();

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
  const [dataRole, setDataRole] = useState<unknown[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // TanStack Query for fetching data
  // Convert fetchMasterData to TanStack Query
  const {
    data: masterData,
    error: masterDataError,
  } = useQuery({
    queryKey: ["master-data"],
    queryFn: async () => {
      const { data } = await apiClient.get("/master-data");
      if (data?.metaData?.length) {
        return keyBy(data?.metaData, "material_no");
      }
      // // Fallback to fakeData if no real data
      // return keyBy(fakeData, "material_no");
    },
    // enabled: isOpen, // Only fetch when modal is open
    staleTime: 10 * 60 * 1000, // Data stays fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Cache for 10 minutes
  });

  const {
    data: queryData,
    isLoading: loading,
    error,
    refetch: requestDataList,
  } = useQuery({
    queryKey: [
      "inbound-data",
      pageInfo.page,
      pageInfo.perPage,
      isAuthenticated,
    ],
    queryFn: async () => {
      const params = {
        limit: pageInfo.perPage,
        page: pageInfo.page,
      };
      const { data } = await apiClient.post(list, {
        ...params,
        populate: ["inventory"],
      });
      return data;
    },
    enabled: isAuthenticated, // Only run query when authenticated
    staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
  });

  const dataList = queryData?.metaData || [];
  const total = queryData?.total || 0;

  const _handleFinish = (values: { [key: string]: unknown }) => {
    const payload = {
      ...values,
    };

    apiClient
      .post(create, payload)
      .then((data) => {
        message.success(t("common.create_success"));
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ["inbound-data"] });
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
          await apiClient.delete(`${remove}`, {}, { ids: selectedRowKeys });
          message.success(t("common.delete_success"));
          setSelectedRowKeys([]);
          queryClient.invalidateQueries({ queryKey: ["inbound-data"] });
        } catch (error) {
          console.error("Delete error:", error);
          message.error(t("common.delete_error"));
        }
      },
    });
  };

  const columns: ColumnsType<DataType> = useMemo(() => {
    const col = RenderCol({ t });
    return col || [];
  }, [t]);

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
        masterData={masterData}
      />
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
  const queryClient = useQueryClient();
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
          queryClient.invalidateQueries({ queryKey: ["inbound-data"] });
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

  const [selectedGate, setSelectedGate] = useState("1");
  return (
    <div>
      <OutboundHeader
        selectedGate={selectedGate}
        onGateChange={setSelectedGate}
        title="Quản lý nhập kho"
      />
      <CardHeader>
        <div
          className="flex items-center justify-between"
          style={{ paddingBottom: "10px" }}
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
            <Button className="ml-2" onClick={handleReload} variant="outline">
              <ReloadOutlined />
              Làm mới
            </Button>
          </div>
        </div>
        <Modal
          open={isOpenForm}
          onCancel={() => setIsOpenForm(false)}
          footer={null}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="space-y-4"
            >
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
    </div>
  );
};

export default InboundManagement;
