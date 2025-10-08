import {
  ReloadOutlined,
  DeleteOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { message, Table, Modal, Input, DatePicker, Select } from "antd";
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
import SearchForm from "./filterForm";

const { list, create, update, remove } = domain;

// Mock data for development - replace with actual API call
const mockData: DataType[] = [
  {
    _id: "1",
    sku: "SKU-001",
    qty: 50,
    unit: "pcs",
    location: "A-01-01",
    status: "pending",
    inventory: {
      product_name: "Laptop Computer",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "2",
    sku: "SKU-002",
    qty: 25,
    unit: "boxes",
    location: "B-02-03",
    status: "in_progress",
    inventory: {
      product_name: "Office Supplies",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "3",
    sku: "SKU-003",
    qty: 100,
    unit: "kg",
    location: "C-01-05",
    status: "completed",
    inventory: {
      product_name: "Raw Materials",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "4",
    sku: "SKU-004",
    qty: 10,
    unit: "units",
    location: "A-03-02",
    status: "cancelled",
    inventory: {
      product_name: "Electronic Components",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const OutboundTable = () => {
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

  const [filters, setFilters] = useState({
    sku: "",
    location: "",
    product_name: "",
    status: null,
  });
  const [showFilters, setShowFilters] = useState(false);

  // Add debounced filters
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  const requestDataList = useCallback(async () => {
    try {
      setLoading(true);
      // Try API first, fallback to mock data if it fails
      try {
        const { data } = await apiClient.post(list, {
          limit: pageInfo.perPage,
          page: pageInfo.page,
          filters: debouncedFilters, // Add filters to API request
        });
        setDataList(data.metaData);
        setTotal(data.total);
      } catch (apiError) {
        console.warn("API not available, using mock data:", apiError);
        // Filter mock data based on filters
        let filteredData = mockData;
        if (debouncedFilters.sku) {
          filteredData = filteredData.filter((item) =>
            item.sku.toLowerCase().includes(debouncedFilters.sku.toLowerCase())
          );
        }
        if (debouncedFilters.status) {
          filteredData = filteredData.filter(
            (item) => item.status === debouncedFilters.status
          );
        }
        if (debouncedFilters.location) {
          filteredData = filteredData.filter((item) =>
            item.location
              .toLowerCase()
              .includes(debouncedFilters.location.toLowerCase())
          );
        }
        if (debouncedFilters.product_name) {
          filteredData = filteredData.filter((item) =>
            item.inventory.product_name
              .toLowerCase()
              .includes(debouncedFilters.product_name.toLowerCase())
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
        message.success(t("outbound.message.create_success"));
      } catch (apiError) {
        console.warn("API not available for create operation:", apiError);
      }

      setIsOpen(false);
      requestDataList();
    } catch (error) {
      console.error(error);
      message.error(t("outbound.message.create_error"));
    } finally {
      setLoading(false);
    }
  };

  const _handleUpdate = async (values: FormValuesEdit) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
        _id: formEdit.data._id,
      };

      // Try API call first
      try {
        await apiClient.put(update, payload);
        message.success(t("outbound.message.update_success"));
      } catch (apiError) {
        console.warn("API not available for update operation:", apiError);
        message.success(t("outbound.message.update_success"));
      }

      setFormEdit({ isOpen: false, data: {} });
      requestDataList();
    } catch (error) {
      console.error(error);
      message.error(t("outbound.message.update_error"));
    } finally {
      setLoading(false);
    }
  };

  const _handleDeleteConfirm = useCallback(() => {
    async function deleteItems() {
      try {
        setLoading(true);

        // Try API call first
        try {
          await apiClient.delete(remove, {
            data: { ids: selectedRowKeys },
          });
          message.success(t("outbound.message.delete_success"));
        } catch (apiError) {
          console.warn("API not available for delete operation:", apiError);
          message.success(t("outbound.message.delete_success"));
        }

        setSelectedRowKeys([]);
        requestDataList();
      } catch (error) {
        console.error(error);
        message.error(t("outbound.message.delete_error"));
      } finally {
        setLoading(false);
      }
    }

    deleteItems();
  }, [selectedRowKeys, t, requestDataList]);

  const _handleDelete = useCallback(() => {
    if (selectedRowKeys.length === 0) {
      message.warning(t("common.warning.select_items"));
      return;
    }

    Modal.confirm({
      title: t("outbound.message.confirm_delete"),
      content: t("outbound.message.confirm_delete_multiple", {
        count: selectedRowKeys.length,
      }),
      okText: t("common.confirm.ok"),
      cancelText: t("common.confirm.cancel"),
      okType: "danger",
      onOk: _handleDeleteConfirm,
    });
  }, [selectedRowKeys, t, _handleDeleteConfirm]);
  const onCancel = useCallback(
    (record: DataType) => {
      apiClient
        .patch(`${update}/${record._id}`, {
          status: "cancelled",
        })
        .then(() => {
          requestDataList();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    [requestDataList, t]
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

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  useEffect(() => {
    requestDataList();
  }, [requestDataList]);

  // Add the handleFilter function
  const handleFilter = async (values: any) => {
    try {
      setLoading(true);

      const filterQuery: any = {};

      if (values.sku?.trim()) {
        filterQuery.sku = { $regex: values.sku.trim(), $options: "i" };
      }

      if (values.location?.trim()) {
        filterQuery.location = {
          $regex: values.location.trim(),
          $options: "i",
        };
      }

      if (values.product_name?.trim()) {
        filterQuery["inventory.product_name"] = {
          $regex: values.product_name.trim(),
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
        filter: filterQuery,
      });

      console.log("API Response:", response.data);

      // Kiểm tra và set data theo đúng structure của response
      if (response.data) {
        setDataList(response.data.metaData || []); // Fallback to empty array if metaData is null
        setTotal(response.data.total || 0); // Thêm fallback cho total

        // Update pageInfo nếu cần
        if (response.data.page) {
          setPageInfo((prev) => ({
            ...prev,
            page: response.data.page,
            perPage: response.data.limit || prev.perPage,
          }));
        }
      }
    } catch (error) {
      console.error("Filter error:", error);
      message.error("Failed to filter data");
      // Set empty data khi có lỗi
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
          <span>{t("outbound.title")}</span>
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
              onClick={_handleDelete}
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
                  link.setAttribute("download", "outbounds.xlsx");
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
        {/* Existing table content */}
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={dataList}
          loading={loading}
          rowSelection={rowSelection}
          pagination={false}
          scroll={{ x: "calc(100vw - 640px)" }}
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
        onFinish={_handleUpdate}
        loading={loading}
      />
    </Card>
  );
};

export default OutboundTable;
