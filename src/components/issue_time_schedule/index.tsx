import {
  ReloadOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { message, Table, Modal, Input } from "antd";
import { Eye, Plus } from "lucide-react";
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
  IssueTimeScheduleDataType,
} from "./const";
import ModalAdd, { type FormValues } from "./modal_create";
import ModalEdit, { type FormValues as FormValuesEdit } from "./modal_update";
import ModalDetail from "./modal_detail";
import PickingDrawer from "./PickingDrawer";
import { createDummyData, creatKitData } from "@/lib/dummyData";
import DrawerOI from "./modal_oi";
import KitManagementHeader from "./KitManagementHeader";

const { list, create, update, remove } = domain;

const IssueTimeScheduleTable = ({ setDataMerge, setCurrent, setKitData }) => {
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
  const [missionData, setDataMission] = useState([]);
  const [isOpenOI, setIsOpenOI] = useState<boolean>(false);
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

  // Filter data based on search text
  const filteredData = useMemo(() => {
    if (!searchText) return dataList;

    return dataList.filter(
      (item) =>
        item.issue_ord_no.toLowerCase().includes(searchText.toLowerCase()) ||
        item.section_c.toLowerCase().includes(searchText.toLowerCase()) ||
        item.fact_c.toLowerCase().includes(searchText.toLowerCase()) ||
        item.line_c.toLowerCase().includes(searchText.toLowerCase()) ||
        item.prod_no.toLowerCase().includes(searchText.toLowerCase()) ||
        item.userid.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [dataList, searchText]);

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
    getCheckboxProps: (record: IssueTimeScheduleDataType) => ({
      disabled:
        (selectedRowKeys.length >= 4 &&
          !selectedRowKeys.includes(record.issue_ord_no)) ||
        rowInProgress.includes(record.issue_ord_no),
    }),
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
    setIsOpenOI(true);
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
    sessionStorage.setItem("activeKit", JSON.stringify(selectedRowKeys));
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
          <div className="mb-4 flex gap-4 items-center">
            <Input
              placeholder="Search by order number, section, factory, line, product..."
              prefix={<SearchOutlined className="text-gray-400" />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: "400px" }}
              allowClear
            />
            <span>
              {rowInProgress.length
                ? `${rowInProgress.length} kit đang xử lý`
                : ""}
            </span>
          </div>

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
              total={total}
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

      <DrawerOI isOpen={isOpenOI} selectedItem={{}} setIsOpen={setIsOpenOI} />
    </div>
  );
};

export default IssueTimeScheduleTable;
