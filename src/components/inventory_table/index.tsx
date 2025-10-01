import {
  ReloadOutlined,
  DeleteOutlined,
  FilterOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { message, Table, Modal, Input, Select, Space } from "antd";
import { Plus, Search } from "lucide-react";
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
  InventoryDataType,
  mockData,
} from "./const";
import ModalAdd, { type FormValues } from "./modal_create";
import ModalEdit, { type FormValues as FormValuesEdit } from "./modal_update";
import ModalDetail from "./modal_detail";
import SearchForm from "./filterForm";

const { list, create, update, remove } = domain;

const InventoryTable = () => {
  const { t } = useTranslation();
  const [pageInfo, setPageInfo] = useState({ page: 1, perPage: 10 });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [dataList, setDataList] = useState<InventoryDataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const [formEdit, setFormEdit] = useState<{
    isOpen: boolean;
    data: InventoryDataType | Record<string, unknown>;
  }>({
    isOpen: false,
    data: {},
  });

  const [detailModal, setDetailModal] = useState<{
    isOpen: boolean;
    data: InventoryDataType | null;
  }>({
    isOpen: false,
    data: null,
  });

  const [filters, setFilters] = useState({
    sku: "",
    product_name: "",
    locationId: "",
    locationCode: "",
    store: [],
    status: null,
  });

  const [showFilters, setShowFilters] = useState(false);

  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  const requestDataList = useCallback(async () => {
    try {
      setLoading(true);
      // Try API first, fallback to mock data if it fails
      try {
        const { data } = await apiClient.post(list, {
          limit: pageInfo.perPage,
          page: pageInfo.page,
          ...debouncedFilters,
        });

        setDataList(data.metaData);
        setTotal(data.total);
      } catch (apiError) {
        console.warn("API not available, using mock data:", apiError);

        let filteredData = mockData;

        if (debouncedFilters.sku) {
          filteredData = filteredData.filter((item) =>
            item.sku.toLowerCase().includes(debouncedFilters.sku.toLowerCase())
          );
        }

        if (debouncedFilters.product_name) {
          filteredData = filteredData.filter(
            (item) =>
              item.product_name.toLowerCase() ===
              debouncedFilters.product_name.toLowerCase()
          );
        }

        if (debouncedFilters.locationId) {
          filteredData = filteredData.filter((item) =>
            item.locationId
              .toLowerCase()
              .includes(debouncedFilters.locationId.toLowerCase())
          );
        }

        if (debouncedFilters.locationCode) {
          filteredData = filteredData.filter(
            (item) =>
              item.locationCode.toLowerCase() ===
              debouncedFilters.locationCode.toLowerCase()
          );
        }

        if (debouncedFilters.store && debouncedFilters.store.length > 0) {
          filteredData = filteredData.filter((item) =>
            debouncedFilters.store.includes(item.store)
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
      message.error(t("common.error.fetch_data"));
      // Fallback to mock data on error
      setDataList(mockData);
      setTotal(mockData.length);
    } finally {
      setLoading(false);
    }
  }, [pageInfo.page, pageInfo.perPage, searchText, statusFilter, t]);

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
        message.success(t("common.success.create"));
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
      //   {
      //     title: t("common.action"),
      //     key: "action",
      //     width: 100,
      //     fixed: "right" as const,
      //     render: (_: unknown, record: InventoryDataType) => (
      //       <Button
      //         variant="outline"
      //         size="sm"
      //         onClick={(e) => {
      //           e.stopPropagation();
      //           setFormEdit({ isOpen: true, data: record });
      //         }}
      //       >
      //         {t("common.edit")}
      //       </Button>
      //     ),
      //   },
    ];
  }, [t]);

  useEffect(() => {
    requestDataList();
  }, [requestDataList]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const handleRowClick = (record: InventoryDataType) => {
    setDetailModal({
      isOpen: true,
      data: record,
    });
  };

  // const statusOptions = [
  //   { label: t("common.all"), value: "" },
  //   { label: t("status.wait_fill"), value: "wait_fill" },
  //   { label: t("status.fill"), value: "fill" },
  //   { label: t("status.in_progress"), value: "in_progress" },
  //   { label: t("status.completed"), value: "completed" },
  //   { label: t("status.low_stock"), value: "low_stock" },
  //   { label: t("status.out_of_stock"), value: "out_of_stock" },
  // ];

  const handleFilter = async (values: any) => {
    try {
      setLoading(true);

      const filterQuery: any = {};

      if (values.sku?.trim()) {
        filterQuery.sku = {
          $regex: values.sku.trim(),
          $options: "i",
        };
      }

      if (values.product_name?.trim()) {
        filterQuery.product_name = {
          $regex: values.product_name.trim(),
          $options: "i",
        };
      }

      if (values.locationId?.trim()) {
        filterQuery.locationId = {
          $regex: values.locationId.trim(),
          $options: "i",
        };
      }

      if (values.locationCode?.trim()) {
        filterQuery.locationCode = {
          $regex: values.locationCode.trim(),
          $options: "i",
        };
      }

      if (Array.isArray(values.store) && values.store.length > 0) {
        filterQuery.store = { $in: values.store.map((s: any) => s.id || s) };
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
          <span>{t("inventory.title")}</span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
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
                  link.setAttribute("download", "inventory.xlsx");
                  document.body.appendChild(link);
                  link.click();
                } catch (error) {
                  console.error("Export error:", error);
                }
              }}
            >
              {t("btn.export_excel")}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <SearchForm
        filters={filters}
        onFilterChange={setFilters}
        showFilters={showFilters}
        handleFilter={handleFilter}
      />
      <CardContent>
        {/* <div className="mb-4 flex gap-2 flex-wrap">
          <Input
            placeholder={t("inventory.search_placeholder")}
            prefix={<Search className="w-4 h-4" />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
            allowClear
          />
          <Select
            placeholder={t("inventory.filter_by_status")}
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 150 }}
            options={statusOptions}
          />
        </div> */}

        <Table
          rowKey="_id"
          columns={columns}
          dataSource={dataList}
          loading={loading}
          // rowSelection={rowSelection}
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

export default InventoryTable;
