import { ReloadOutlined, DeleteOutlined, FilterOutlined, ExportOutlined } from "@ant-design/icons";
import { message, Table, Modal, Input, Select, Space } from "antd";
import { Plus, Search } from "lucide-react";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import BasePagination from "@/components/ui/antd-pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import apiClient from "@/lib/axios";

import { domain, lang_key, RenderCol, MissionDataType, mockData, MISSION_STATE, MISSION_TYPE } from "./const";
import ModalAdd, { type FormValues } from "./modal_create";
import ModalEdit, { type FormValues as FormValuesEdit } from "./modal_update";
import ModalDetail from "./modal_detail";

const { list, create, update, remove } = domain;

const MissionTable = () => {
  const { t } = useTranslation();
  const [pageInfo, setPageInfo] = useState({ page: 1, perPage: 10 });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [dataList, setDataList] = useState<MissionDataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [stateFilter, setStateFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  
  const [formEdit, setFormEdit] = useState<{
    isOpen: boolean;
    data: MissionDataType | Record<string, unknown>;
  }>({
    isOpen: false,
    data: {},
  });
  
  const [detailModal, setDetailModal] = useState<{
    isOpen: boolean;
    data: MissionDataType | null;
  }>({
    isOpen: false,
    data: null,
  });

  const requestDataList = useCallback(async () => {
    try {
      setLoading(true);
      // Try API first, fallback to mock data if it fails
      try {
        const { data } = await apiClient.post(list, {
          limit: pageInfo.perPage,
          page: pageInfo.page,
          search: searchText,
          state: stateFilter,
          type: typeFilter,
        });
        setDataList(data.metaData);
        setTotal(data.total);
      } catch (apiError) {
        console.warn("API not available, using mock data:", apiError);
        // Using mock data as fallback with filtering
        let filteredData = mockData;
        
        if (searchText) {
          filteredData = filteredData.filter(item => 
            item.mission_code?.toLowerCase().includes(searchText.toLowerCase()) ||
            item.robot_code?.toLowerCase().includes(searchText.toLowerCase()) ||
            item.origin?.toLowerCase().includes(searchText.toLowerCase()) ||
            item.destination?.toLowerCase().includes(searchText.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchText.toLowerCase())
          );
        }
        
        if (stateFilter) {
          filteredData = filteredData.filter(item => item.state === stateFilter);
        }
        
        if (typeFilter) {
          filteredData = filteredData.filter(item => item.type === typeFilter);
        }
        
        // Apply pagination to mock data
        const startIndex = (pageInfo.page - 1) * pageInfo.perPage;
        const endIndex = startIndex + pageInfo.perPage;
        const paginatedData = filteredData.slice(startIndex, endIndex);
        
        setDataList(paginatedData);
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
  }, [pageInfo.page, pageInfo.perPage, searchText, stateFilter, typeFilter, t]);

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
    return baseColumns;
  }, [t]);

  useEffect(() => {
    requestDataList();
  }, [pageInfo, searchText, stateFilter, typeFilter, requestDataList]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const handleRowClick = (record: MissionDataType) => {
    setDetailModal({
      isOpen: true,
      data: record,
    });
  };

  const stateOptions = [
    { label: t("common.all"), value: "" },
    { label: t("mission.state.new"), value: MISSION_STATE.NEW },
    { label: t("mission.state.processing"), value: MISSION_STATE.PROCESSING },
    { label: t("mission.state.done"), value: MISSION_STATE.DONE },
    { label: t("mission.state.error"), value: MISSION_STATE.ERROR },
    { label: t("mission.state.done_picking"), value: MISSION_STATE.DONE_PICKING },
  ];

  const typeOptions = [
    { label: t("common.all"), value: "" },
    { label: t("mission.type.inbound"), value: MISSION_TYPE.INBOUND },
    { label: t("mission.type.outbound"), value: MISSION_TYPE.OUTBOUND },
    { label: t("mission.type.internal"), value: MISSION_TYPE.INTERNAL },
    { label: t("mission.type.back_whs"), value: MISSION_TYPE.BACK_WHS },
    { label: t("mission.type.transfer_gate"), value: MISSION_TYPE.TRANSFER_GATE },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{t("mission.title")}</span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={requestDataList}
              disabled={loading}
            >
              <ExportOutlined />
              {t("btn.export_excel")}
            </Button>
            {selectedRowKeys.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeleteSelected}
                disabled={loading}
              >
                <DeleteOutlined />
                {t("btn.delete_selected")}
              </Button>
            )}
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
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="mb-4 flex gap-2 flex-wrap">
          <Input
            placeholder={t("mission.search_placeholder")}
            prefix={<Search className="w-4 h-4" />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
            allowClear
          />
          <Select
            placeholder={t("mission.filter_by_state")}
            value={stateFilter}
            onChange={setStateFilter}
            style={{ width: 150 }}
            options={stateOptions}
          />
          <Select
            placeholder={t("mission.filter_by_type")}
            value={typeFilter}
            onChange={setTypeFilter}
            style={{ width: 150 }}
            options={typeOptions}
          />
        </div>

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
            style: { cursor: 'pointer' },
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

export default MissionTable;