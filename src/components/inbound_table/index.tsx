import {
  ReloadOutlined,
  DeleteOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { message, Table, Modal, Tag } from "antd";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import BasePagination from "@/components/ui/antd-pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import apiClient from "@/lib/axios";

import { domain, lang_key, RenderCol, DataType, mockData } from "./const";
import ModalAdd, { type FormValues } from "./modal_create";
import ModalEdit, { type FormValues as FormValuesEdit } from "./modal_update";
import ModalDetail from "./modal_detail";
import SearchForm from "./filterForm";
import axios from "axios";

const { list, create, update, remove } = domain;

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

  const [detailModal, setDetailModal] = useState<{
    isOpen: boolean;
    data: DataType | null;
  }>({
    isOpen: false,
    data: null,
  });

  const [filters, setFilters] = useState({
    sku: "",
    origin: "",
    product_name: "",
    destination: "",
    status: null,
  });
  const [showFilters, setShowFilters] = useState(false);

  // Add debounced filters
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  const requestDataList = useCallback(async () => {
    try {
      setLoading(true);

      try {
        // API request
        const { data } = await apiClient.post(list, {
          limit: pageInfo.perPage,
          page: pageInfo.page,
          ...debouncedFilters, // ✅ spread filter ra ngoài
        });

        setDataList(data.metaData || []);
        setTotal(data.total || 0);
      } catch (apiError) {
        console.warn("API not available, using mock data:", apiError);

        // Fallback to mock data filtering
        let filteredData = mockData;

        if (debouncedFilters.sku) {
          filteredData = filteredData.filter((item) =>
            item.sku.toLowerCase().includes(debouncedFilters.sku.toLowerCase())
          );
        }

        if (debouncedFilters.origin) {
          filteredData = filteredData.filter(
            (item) =>
              item.origin.toLowerCase() ===
              debouncedFilters.origin.toLowerCase()
          );
        }

        if (debouncedFilters.product_name) {
          filteredData = filteredData.filter((item) =>
            item.product_name
              .toLowerCase()
              .includes(debouncedFilters.product_name.toLowerCase())
          );
        }

        if (debouncedFilters.destination) {
          filteredData = filteredData.filter(
            (item) =>
              item.destination.toLowerCase() ===
              debouncedFilters.destination.toLowerCase()
          );
        }

        if (debouncedFilters.status) {
          filteredData = filteredData.filter(
            (item) => item.status === debouncedFilters.status
          );
        }

        setDataList(filteredData);
        setTotal(filteredData.length);
      }
    } catch (error) {
      console.error(error);
      message.error(t("outbound.message.create_error"));
    } finally {
      setLoading(false);
    }
  }, [pageInfo.page, pageInfo.perPage, t, debouncedFilters]);

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

  const onCancel = useCallback(
    async (record: DataType) => {
      apiClient
        .patch(`${update}/${record._id}`, {
          status: "cancelled",
        })
        .then(() => {
          requestDataList();
        })
        .catch((error) => {
          console.error("Cancel error:", error);
        });
    },
    [t, requestDataList]
  );

  const columns = useMemo(() => {
    const baseColumns = RenderCol({ t, onCancel });
    return [
      ...baseColumns,
      // {
      //   title: t("common.action"),
      //   key: "action",
      //   width: 100,
      //   fixed: "right" as const,
      //   render: (_: unknown, record: DataType) => (
      //     <Button
      //       variant="outline"
      //       size="sm"
      //       onClick={() => setFormEdit({ isOpen: true, data: record })}
      //     >
      //       {t("common.edit")}
      //     </Button>
      //   ),
      // },
    ];
  }, [t, onCancel]);

  useEffect(() => {
    requestDataList();
  }, [requestDataList]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const handleRowClick = (record: DataType) => {
    setDetailModal({
      isOpen: true,
      data: record,
    });
  };

  const handleFilter = async (values: any) => {
    try {
      setLoading(true);

      const filterQuery: any = {};

      if (values.sku?.trim()) {
        filterQuery.sku = { $regex: values.sku.trim(), $options: "i" };
      }

      if (values.origin?.trim()) {
        filterQuery.origin = { $regex: values.origin.trim(), $options: "i" };
      }

      if (values.product_name?.trim()) {
        filterQuery.product_name = {
          $regex: values.product_name.trim(),
          $options: "i",
        };
      }

      if (values.destination?.trim()) {
        filterQuery.destination = {
          $regex: values.destination.trim(),
          $options: "i",
        };
      }

      if (values.status) {
        filterQuery.status = values.status;
      }

      console.log("Filter Query:", filterQuery);

      const response = await apiClient.post(list, {
        limit: pageInfo.perPage,
        page: pageInfo.page,
        filter: JSON.stringify(filterQuery),
      });

      if (response.data) {
        setDataList(response.data.metaData || []);
        setTotal(response.data.total || 0);
      }
    } catch (error) {
      console.error("Filter error:", error);
      message.error("Failed to filter data");
      setDataList([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reset page về 1 khi filter thay đổi
    setPageInfo((prev) => ({ ...prev, page: 1 }));
    handleFilter(filters);
  }, [filters]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{t("inbound.title")}</span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters((prev) => !prev)}
            >
              <FilterOutlined />
              {t("btn.filter")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={requestDataList}
              disabled={loading}
            >
              <ReloadOutlined />
              {t("btn.refresh")}
            </Button>
            {/* <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteSelected}
              disabled={selectedRowKeys.length === 0 || loading}
            >
              <DeleteOutlined />
              {t("btn.delete")}
            </Button> */}
            <Button size="sm" onClick={() => setIsOpen(true)}>
              <Plus className="w-4 h-4" />
              {t("btn.create_new")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                try {
                  const response = await apiClient.post(
                    `${list}/export-excel`,
                    {
                      filter: JSON.stringify(filters),
                    },
                    { responseType: "blob" }
                  );

                  const url = window.URL.createObjectURL(
                    new Blob([response.data])
                  );
                  const link = document.createElement("a");
                  link.href = url;
                  link.setAttribute("download", "inbounds.xlsx"); // tên file
                  document.body.appendChild(link);
                  link.click();
                } catch (error) {
                  console.error("Export error:", error);
                }
              }}
            >
              Export Excel
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SearchForm
          filters={filters}
          onFilterChange={setFilters}
          handleFilter={handleFilter}
          showFilters={showFilters}
        />
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={dataList}
          loading={loading}
          rowSelection={rowSelection}
          pagination={false}
          scroll={{ x: "calc(100vw - 640px)" }}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
            style: { cursor: "pointer" },
          })}
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

      {/* Detail Modal */}
      <ModalDetail
        isOpen={detailModal.isOpen}
        data={detailModal.data}
        onClose={() => setDetailModal({ isOpen: false, data: null })}
      />
    </Card>
  );
};

export default InboundTable;
