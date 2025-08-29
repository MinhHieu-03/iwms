import {
  ReloadOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  message,
  Table,
  Modal,
  Input,
  Select as AntSelect,
  DatePicker,
} from "antd";

const { RangePicker } = DatePicker;
import { Eye, Plus, Filter, X } from "lucide-react";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import dayjs, { Dayjs } from "dayjs";

import { Button } from "@/components/ui/button";
import BasePagination from "@/components/ui/antd-pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import apiClient from "@/lib/axios";

import {
  domain,
  lang_key,
  RenderCol,
  IssueTimeScheduleDataType,
} from "./const";
import ModalAdd, { type FormValues } from "./modal_create";
import ModalEdit, { type FormValues as FormValuesEdit } from "./modal_update";
import ModalDetail from "./modal_detail";
import PickingDrawer from "./PickingDrawer";
import { createDummyData, creatKitData } from "@/lib/dummyData";
import KitManagementHeader from "./KitManagementHeader";

const { list, create, update, remove } = domain;

const IssueTimeScheduleTable = ({
  setCurrent,
  setDataMerge,
  missionData,
  setKitData,
}) => {
  const { t } = useTranslation();
  const [pageInfo, setPageInfo] = useState({ page: 1, perPage: 10 });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [dataList, setDataList] = useState<IssueTimeScheduleDataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>(
    sessionStorage.getItem("activeKit")
      ? JSON.parse(sessionStorage.getItem("activeKit") || "[]")
      : []
  );
  const [searchText, setSearchText] = useState<string>("");
  const [showPickingModal, setShowPickingModal] = useState(null);
  // const [missionData, setDataMission] = useState([]);
  const [isOpenOI, setIsOpenOI] = useState<boolean>(false);

  // Filter states
  const [filters, setFilters] = useState({
    status: null as string | null,
    timeIssueRange: null as [Dayjs, Dayjs] | null,
    aReqdTimeRange: null as [Dayjs, Dayjs] | null,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [formEdit, setFormEdit] = useState<{
    isOpen: boolean;
    data: IssueTimeScheduleDataType | Record<string, unknown>;
  }>({
    isOpen: false,
    data: {},
  });

  const [detailModal, setDetailModal] = useState<{
    isOpen: boolean;
    data: IssueTimeScheduleDataType | null;
  }>({
    isOpen: false,
    data: null,
  });
  let rowInProgress = sessionStorage.getItem("activeKit")
    ? JSON.parse(sessionStorage.getItem("activeKit") || "[]")
    : [];

  // Filter data based on search text and filters
  const filteredData = useMemo(() => {
    let filtered = dataList;

    // Apply text search filter
    if (searchText) {
      filtered = filtered.filter(
        (item) =>
          item.issue_ord_no.toLowerCase().includes(searchText.toLowerCase()) ||
          item.section_c.toLowerCase().includes(searchText.toLowerCase()) ||
          item.fact_c.toLowerCase().includes(searchText.toLowerCase()) ||
          item.line_c.toLowerCase().includes(searchText.toLowerCase()) ||
          item.prod_no.toLowerCase().includes(searchText.toLowerCase()) ||
          item.userid.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter((item) => item.status === filters.status);
    }

    // Apply time_issue date range filter
    if (filters.timeIssueRange) {
      filtered = filtered.filter((item) => {
        const itemDate = dayjs(item.time_issue);
        const [startDate, endDate] = filters.timeIssueRange;

        return (
          itemDate.isAfter(startDate.startOf("day")) &&
          itemDate.isBefore(endDate.endOf("day"))
        );
      });
    }

    // Apply A_reqd_time date range filter
    if (filters.aReqdTimeRange) {
      filtered = filtered.filter((item) => {
        const itemDate = dayjs(item.A_reqd_time);
        const [startDate, endDate] = filters.aReqdTimeRange;

        return (
          itemDate.isAfter(startDate.startOf("day")) &&
          itemDate.isBefore(endDate.endOf("day"))
        );
      });
    }

    return filtered;
  }, [dataList, searchText, filters]);

  const requestDataList = useCallback(async () => {
    try {
      setLoading(true);
      // Try API first, fallback to mock data if it fails
      try {
        // const { data } = await apiClient.post(list, {
        //   limit: pageInfo.perPage,
        //   page: pageInfo.page,
        // });
        // setDataList(data.metaData);
        // setTotal(data.total);

        const data = await creatKitData();
        const activeKit = sessionStorage.getItem("activeKit");
        const activeElement = activeKit ? JSON.parse(activeKit) : [];
        setSelectedRowKeys(activeElement);
        setDataList(
          data.metaData.map((i) => {
            if (activeElement.includes(i.issue_ord_no)) {
              return { ...i, status: "in progress", key: i._id };
            }
            return { ...i, key: i._id };
          })
        );
        setTotal(data.metaData.length);
      } catch (apiError) {
        console.warn("API not available, using mock data:", apiError);
        // Using mock data as fallback
      }
    } catch (error) {
      console.error(error);
      message.error(t("common.error.fetch_data"));
      // Fallback to mock data on error
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
        message.success("Record created successfully (using mock data)");
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
      };

      // Try API call first
      try {
        await apiClient.put(`${update}/${formEdit.data._id}`, payload);
        message.success(t("common.success.update"));
      } catch (apiError) {
        console.warn("API not available for update operation:", apiError);
        message.success("Record updated successfully (using mock data)");
      }

      setFormEdit({ isOpen: false, data: {} });
      requestDataList();
    } catch (error) {
      console.error(error);
      message.error(t("common.error.update"));
    } finally {
      setLoading(false);
    }
  };

  const _handleCancel = async (id: string) => {
    try {
      setLoading(true);
      // Try API call first
      try {
        await apiClient.delete(`${remove}/${id}`);
        message.success(t("common.success.delete"));
      } catch (apiError) {
        console.warn("API not available for delete operation:", apiError);
        message.success("Record deleted successfully (using mock data)");
      }

      requestDataList();
    } catch (error) {
      console.error(error);
      message.error(t("common.error.delete"));
    } finally {
      setLoading(false);
    }
  };

  const _handleEdit = (record: IssueTimeScheduleDataType) => {
    setFormEdit({
      isOpen: true,
      data: record,
    });
  };

  const _handleDetail = (record: IssueTimeScheduleDataType) => {
    setDetailModal({
      isOpen: true,
      data: record,
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      status: null,
      timeIssueRange: null,
      aReqdTimeRange: null,
    });
    setSearchText("");
  };

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      searchText ||
      filters.status ||
      filters.timeIssueRange ||
      filters.aReqdTimeRange
    );
  }, [searchText, filters]);

  const columns = useMemo(
    () =>
      RenderCol({
        t,
        onEdit: _handleEdit,
        onDelete: _handleCancel,
        onDetail: _handleDetail,
      }),
    [t]
  );

  const rowSelection = {
    // columnTitle: (
    //   <div className="flex flex-col items-center">
    //     <span className="text-md">
    //       {t("issue_time_schedule.table.selected")}
    //     </span>
    //     <span className="text-xs text-gray-500">
    //       {selectedRowKeys.length}/80
    //     </span>
    //   </div>
    // ),
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      if (selectedRowKeys.length > 80) {
        message.warning("You can only select up to 80 items");
        return;
      }
      setSelectedRowKeys(selectedRowKeys);
    },
    onSelectAll: (selected: boolean, selectedRows: any[], changeRows: any[]) => {
      if (selected) {
        // Select all available items (up to 80)
        const availableItems = filteredData
          .filter(record => !rowInProgress.includes(record.issue_ord_no))
          .slice(0, 80)
          .map(record => record.issue_ord_no);
        setSelectedRowKeys(availableItems);
      } else {
        // Deselect all
        setSelectedRowKeys([]);
      }
    },
    getCheckboxProps: (record: IssueTimeScheduleDataType) => {
      const activeKit = sessionStorage.getItem("activeKit");
      return {
        disabled:
          activeKit ||
          (selectedRowKeys.length >= 80 &&
            !selectedRowKeys.includes(record.issue_ord_no)) ||
          rowInProgress.includes(record.issue_ord_no),
      };
    },
  };

  const handleBulkDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select items to delete");
      return;
    }

    Modal.confirm({
      title: t("common.confirm_delete"),
      content: `Are you sure you want to delete ${selectedRowKeys.length} selected items?`,
      onOk: async () => {
        try {
          setLoading(true);
          // In a real application, you would call the API for bulk delete
          console.log("Bulk deleting:", selectedRowKeys);
          message.success(
            `${selectedRowKeys.length} items deleted successfully`
          );
          setSelectedRowKeys([]);
          requestDataList();
        } catch (error) {
          console.error(error);
          message.error("Failed to delete items");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  useEffect(() => {
    requestDataList();
    window.addEventListener("beforeunload", () => {
      sessionStorage.clear();
    });
  }, [requestDataList]);

  console.log("selectedRowKeys", selectedRowKeys);

  const orderPicking = async () => {
    // setIsOpenOI(true);
    if (selectedRowKeys.length === 0) {
      message.warning(
        "Please select at least one item to create a picking order"
      );
      return;
    }
    setKitData(
      dataList.filter((item) => selectedRowKeys.includes(item.issue_ord_no))
    );
    let issueData = [];
    await Promise.all(
      selectedRowKeys.map(async (keyItem) => {
        const data = await createDummyData({
          issue_ord_no: keyItem,
        });
        issueData.push(
          ...data.metaData.map((item) => ({
            ...item,
            issue_ord_no: keyItem,
          }))
        );
      })
    );
    setDataMerge(issueData);
    console.log("___issueData", issueData);
    // setDataMission(issueData);
    sessionStorage.setItem("activeKit", JSON.stringify(selectedRowKeys));
    setCurrent(1);
  };

  useEffect(() => {
    const selectedRowKeys = sessionStorage.getItem("activeKit");
    if (selectedRowKeys) {
      setSelectedRowKeys(JSON.parse(selectedRowKeys));
    }
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <KitManagementHeader
            selectedRowKeysLength={selectedRowKeys.length}
            rowInProgressLength={rowInProgress.length}
            onAccessOI={() => setIsOpenOI(true)}
            onCreateOrder={orderPicking}
            onRefresh={requestDataList}
          />
        </CardHeader>
        <CardContent>
          <div className="mb-4 space-y-4">
            {/* Search and Filter Toggle Row */}
            <div className="flex gap-4 justify-between items-center">
              <span className="">
                {rowInProgress.length
                  ? `${rowInProgress.length} kit đang xử lý`
                  : `${selectedRowKeys.length}/80 kit được chọn`}
              </span>
              <div className="flex gap-2 items-center">
                <Input
                  placeholder="Search by order number, section, factory, line, product..."
                  prefix={<SearchOutlined className="text-gray-400" />}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ width: "400px" }}
                  allowClear
                />
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant={showFilters ? "default" : "outline"}
                >
                  <Filter size={16} className="mr-1" />
                  Filters
                </Button>
                {hasActiveFilters && (
                  <Button
                    onClick={clearFilters}
                    variant="ghost"
                    size="sm"
                    title="Clear all filters"
                  >
                    <X size={16} />
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="bg-gray-50 p-4 rounded-lg border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Status Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Trạng thái
                    </label>
                    <AntSelect
                      placeholder="Lọc theo trạng thái"
                      value={filters.status}
                      onChange={(value) =>
                        setFilters((prev) => ({ ...prev, status: value }))
                      }
                      allowClear
                      style={{ width: "100%" }}
                    >
                      <AntSelect.Option value="fill">Đã xuất</AntSelect.Option>
                      <AntSelect.Option value="in progress">
                        Đang xuất
                      </AntSelect.Option>
                      <AntSelect.Option value="new">Mới</AntSelect.Option>
                    </AntSelect>
                  </div>

                  {/* Issue Time Range */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Giờ bắt đầu cần cấp
                    </label>
                    <RangePicker
                      placeholder={["Từ ngày", "Đến ngày"]}
                      value={filters.timeIssueRange}
                      onChange={(dates) =>
                        setFilters((prev) => ({
                          ...prev,
                          timeIssueRange: dates,
                        }))
                      }
                      style={{ width: "100%" }}
                      showTime
                      format="YYYY-MM-DD HH:mm"
                    />
                  </div>

                  {/* Required Time Range */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Giờ cần có mặt ở nhà máy
                    </label>
                    <RangePicker
                      placeholder={["From date", "To date"]}
                      value={filters.aReqdTimeRange}
                      onChange={(dates) =>
                        setFilters((prev) => ({
                          ...prev,
                          aReqdTimeRange: dates,
                        }))
                      }
                      style={{ width: "100%" }}
                      showTime
                      format="YYYY-MM-DD HH:mm"
                    />
                  </div>
                </div>

                {/* Filter Summary */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>
                      Showing {filteredData.length} of {dataList.length} records
                    </span>
                    {hasActiveFilters && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={clearFilters}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Reset all filters
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>{" "}
          <Table
            columns={columns}
            dataSource={filteredData}
            rowSelection={rowSelection}
            loading={loading}
            scroll={{ x: 1800 }}
            pagination={false}
            size="middle"
            bordered
            rowKey="issue_ord_no"
          />
          <div className="mt-4 flex justify-end">
            <BasePagination
              current={pageInfo.page}
              pageSize={pageInfo.perPage}
              total={filteredData.length}
              onChange={(page, pageSize) => {
                setPageInfo({ page, perPage: pageSize });
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

      {/* Add Modal */}
      <ModalAdd
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        onFinish={_handleFinish}
        loading={loading}
      />

      {/* Edit Modal */}
      <ModalEdit
        isOpen={formEdit.isOpen}
        onCancel={() => setFormEdit({ isOpen: false, data: {} })}
        onFinish={_handleUpdateFinish}
        loading={loading}
        data={formEdit.data as IssueTimeScheduleDataType}
      />

      {/* Detail Modal */}
      <ModalDetail
        isOpen={detailModal.isOpen}
        onCancel={() => setDetailModal({ isOpen: false, data: null })}
        data={detailModal.data}
      />
      {/*  */}

      <PickingDrawer
        open={showPickingModal}
        missionData={missionData}
        onClose={() => setShowPickingModal(null)}
      />
    </div>
  );
};

export default IssueTimeScheduleTable;
