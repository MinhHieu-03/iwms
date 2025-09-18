import { SearchOutlined } from "@ant-design/icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ConfigProvider, DatePicker, Input, message, Modal, Table } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { debounce } from "lodash";
import { Filter, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import BasePagination from "@/components/ui/antd-pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import apiClient from "@/lib/axios";

import { createDummyData } from "@/lib/dummyData";
import { domain, IssueTimeScheduleDataType, RenderCol } from "./const";
import FilterPanel from "./FilterPanel";
import KitManagementHeader from "./KitManagementHeader";
import ModalDetail from "./modal_detail";

const { RangePicker } = DatePicker;
const { list, create, update, remove, merge_kit } = domain;

const IssueTimeScheduleTable = ({
  setCurrent,
  setDataMerge,
  missionData,
  setKitData,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({ page: 1, perPage: 10 });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>(
    sessionStorage.getItem("activeKit")
      ? JSON.parse(sessionStorage.getItem("activeKit") || "[]")
      : []
  );
  const [searchText, setSearchText] = useState<string>("");

  // Filter states
  const [filters, setFilters] = useState({
    issue_ord_no: null as string | null,
    timeIssueRange: null as [Dayjs, Dayjs] | null,
    aReqdTimeRange: null as [Dayjs, Dayjs] | null,
  });
  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  const [showFilters, setShowFilters] = useState(false);
  // Debounce filters to avoid too many API calls
  const debouncedSetFilters = useCallback(
    debounce((newFilters) => {
      setDebouncedFilters(newFilters);
    }, 1000),
    []
  );

  useEffect(() => {
    debouncedSetFilters(filters);
  }, [filters, debouncedSetFilters]);

  // TanStack Query for data fetching
  const {
    data: queryData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [
      "issueTimeSchedule",
      pageInfo.page,
      pageInfo.perPage,
      debouncedFilters,
    ],
    queryFn: async () => {
      try {
        const { data } = await apiClient.post(list, {
          limit: pageInfo.perPage,
          page: pageInfo.page,
          filter: debouncedFilters,
        });
        // const fakeData = await creatKitData();
        return {
          metaData: [
            // {
            //   A_reqd_time: "2025-06-10T09:00:00.000Z",
            //   cusdesch_cd1: "00",
            //   cusdesch_cd2: "00",
            //   ent_dt: "2025-06-10T17:00:00.000Z",
            //   fact_c: "ASY1",
            //   intdesch_cd: "02",
            //   issue_ord_no: "K374160",
            //   line_c: "ASY1",
            //   plan_issue_dt: "2025-06-10T17:00:00.000Z",
            //   prod_no: "Common",
            //   section_c: "9855",
            //   time_issue: "2025-06-10T06:00:00.000Z",
            //   upd_dt: "2025-06-10T17:00:00.000Z",
            //   userid: "Job",
            //   type: "urgent",
            // },
            ...data.metaData,
          ],
          total: data.total,
        };
      } catch (apiError) {
        console.warn("API not available, using mock data:", apiError);
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Derived state from query data
  const dataList = useMemo(() => {
    if (!queryData?.metaData) return [];

    const activeKit = sessionStorage.getItem("activeKit");
    const activeElement = activeKit ? JSON.parse(activeKit) : [];

    return queryData.metaData.map((i) => {
      if (activeElement.includes(i.issue_ord_no)) {
        return { ...i, status: "in progress", key: i._id };
      }
      return { ...i, key: i._id };
    });
  }, [queryData]);

  const total = queryData?.total || 0;

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

  // Show error message when query fails
  useEffect(() => {
    if (error) {
      message.error(t("common.error.fetch_data"));
    }
  }, [error, t]);

  const _handleDetail = (record: IssueTimeScheduleDataType) => {
    setDetailModal({
      isOpen: true,
      data: record,
    });
  };

  // Clear all filters
  const clearFilters = () => {
    const clearedFilters = {
      issue_ord_no: null,
      timeIssueRange: null,
      aReqdTimeRange: null,
    };
    setFilters(clearedFilters);
    setDebouncedFilters(clearedFilters);
    setSearchText("");
  };

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return !!(
      searchText ||
      filters.issue_ord_no ||
      filters.timeIssueRange ||
      filters.aReqdTimeRange
    );
  }, [searchText, filters]);

  const columns = useMemo(
    () =>
      RenderCol({
        t,
        onDetail: _handleDetail,
      }),
    [t]
  );

  const rowSelection = {
    columnTitle: (
      <div className="flex flex-col items-center">
        <span className="text-md">
          {t("issue_time_schedule.table.selected")}
        </span>
        <span className="text-xs text-gray-500">
          {selectedRowKeys.length}/4
        </span>
      </div>
    ),
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      if (selectedRowKeys.length > 4) {
        message.warning("You can only select up to 4 items");
        return;
      }
      setSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record: IssueTimeScheduleDataType) => {
      const activeKit = sessionStorage.getItem("activeKit");
      return {
        disabled:
          activeKit ||
          (selectedRowKeys.length >= 4 &&
            !selectedRowKeys.includes(record.issue_ord_no)) ||
          rowInProgress.includes(record.issue_ord_no),
      };
    },
  };

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      sessionStorage.clear();
    });
  }, []);

  const orderPicking = async () => {
    try {
      setLoading(true);
      if (selectedRowKeys.length === 0) {
        message.warning(
          "Please select at least one item to create a picking order"
        );
        return;
      }
      const body = {
        kit_no: selectedRowKeys,
        plan_issue_dt: [],
        A_reqd_time: [],
        time_issue: [],
        status: "in_progress",
        gate: "gate1",
      };
      selectedRowKeys.map((item) => {
        const itemData = dataList.find((i) => i.issue_ord_no === item);
        if (itemData) {
          body.plan_issue_dt.push(itemData.plan_issue_dt);
          body.A_reqd_time.push(itemData.A_reqd_time);
          body.time_issue.push(itemData.time_issue);
        }
        return item;
      });
      console.log("body", body);
      //
      await apiClient.post(merge_kit, body);
      setCurrent(1);
      setLoading(false);
    } catch (error) {
      message.error("Error creating picking order");
      console.error("Error creating picking order:", error);
      setLoading(false);
      return;
    }
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
            onCreateOrder={orderPicking}
            onRefresh={refetch}
            loading={loading}
          />
        </CardHeader>
        <CardContent>
          <div className="mb-4 space-y-4">
            {/* Search and Filter Toggle Row */}
            <div className="flex gap-4 justify-between items-center">
              <span className="">
                {rowInProgress.length
                  ? `${rowInProgress.length} kit đang xử lý`
                  : ""}
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
                  Bộ lọc
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
            <FilterPanel
              showFilters={showFilters}
              filters={filters}
              setFilters={setFilters}
              filteredDataLength={queryData?.metaData?.length || 0}
              dataListLength={queryData?.total || 0}
              hasActiveFilters={hasActiveFilters}
              clearFilters={clearFilters}
            />
          </div>{" "}
            <Table
              columns={columns}
              dataSource={queryData?.metaData || []}
              rowSelection={rowSelection}
              loading={isLoading}
              scroll={{ x: 1800 }}
              rowClassName={(record) =>
                record.type === "urgent" ? "bg-red-200" : ""
              }
              pagination={false}
              size="middle"
              bordered
              rowKey="issue_ord_no"
            />
          <div className="mt-4 flex justify-end">
            <BasePagination
              current={pageInfo.page}
              pageSize={pageInfo.perPage}
              total={queryData?.total || 0}
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
      <ModalDetail
        isOpen={detailModal.isOpen}
        onCancel={() => setDetailModal({ isOpen: false, data: null })}
        data={detailModal.data}
      />
    </div>
  );
};

export default IssueTimeScheduleTable;
