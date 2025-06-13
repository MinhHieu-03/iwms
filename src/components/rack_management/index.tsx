import { ReloadOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { message, Table, Modal, Input, Select, Space } from "antd";
import { Plus } from "lucide-react";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import BasePagination from "@/components/ui/antd-pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import apiClient from "@/lib/axios";

import { domain, lang_key, RenderCol, RackDataType } from "./const";
import ModalAdd, { type FormValues } from "./modal_create";
import ModalEdit, { type FormValues as FormValuesEdit } from "./modal_update";

const { list, create, update, remove } = domain;

const RackManagement = () => {
    const { t } = useTranslation();
    const [pageInfo, setPageInfo] = useState({ page: 1, perPage: 10 });
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState<number>(0);
    const [dataList, setDataList] = useState<RackDataType[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [warehouseFilter, setWarehouseFilter] = useState<string>("");
    const [formEdit, setFormEdit] = useState<{
        isOpen: boolean;
        data: RackDataType | Record<string, unknown>;
    }>({
        isOpen: false,
        data: {},
    });

    const requestDataList = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await apiClient.post(list, {
                limit: pageInfo.perPage,
                page: pageInfo.page,
            });
            setDataList(data.metaData);
            setTotal(data.total);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [pageInfo]);

    const handleFinish = (values: FormValues) => {
        const payload = {
            ...values,
        };

        apiClient
            .post(create, payload)
            .then(() => {
                message.success(t("rack.messages.create_success"));
                setIsOpen(false);
                requestDataList();
            })
            .catch((err) => {
                message.error(t("rack.messages.create_error"));
                console.error(err);
            });
    };

    const handleUpdateFinish = (values: FormValuesEdit) => {
        const payload = {
            ...values,
        };

        apiClient
            .patch(`${update}/${formEdit?.data?._id}`, payload)
            .then(() => {
                message.success(t("rack.messages.update_success"));
                setFormEdit({
                    isOpen: false,
                    data: {},
                });
                requestDataList();
            })
            .catch((err) => {
                message.error(t("rack.messages.update_error"));
                console.error(err);
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
                    await Promise.all(
                        selectedRowKeys.map((id) => apiClient.delete(`${remove}/${id}`))
                    );
                    message.success(t("rack.messages.delete_success"));
                    setSelectedRowKeys([]);
                    requestDataList();
                } catch (error) {
                    console.error(error);
                    message.error(t("rack.messages.delete_error"));
                }
            },
        });
    };

    const clearFilters = () => {
        setSearchText("");
        setStatusFilter("");
        setWarehouseFilter("");
    };

    useEffect(() => {
        requestDataList();
    }, [requestDataList]);

    // Filtered and searched data
    const filteredData = useMemo(() => {
        let filtered = dataList;

        // Apply search filter
        if (searchText) {
            filtered = filtered.filter(item =>
                item.location_code.toLowerCase().includes(searchText.toLowerCase()) ||
                item.warehouse?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
                item.area_config?.name?.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        // Apply status filter
        if (statusFilter) {
            filtered = filtered.filter(item => item.status === statusFilter);
        }

        // Apply warehouse filter
        if (warehouseFilter) {
            filtered = filtered.filter(item => item.warehouse?._id === warehouseFilter);
        }

        return filtered;
    }, [dataList, searchText, statusFilter, warehouseFilter]);

    // Get unique statuses and warehouses for filter options
    const statusOptions = useMemo(() => {
        const statuses = [...new Set(dataList.map(item => item.status))];
        return statuses.map(status => ({
            label: t(`rack.status.${status}`),
            value: status
        }));
    }, [dataList, t]);

    const warehouseOptions = useMemo(() => {
        const warehouses = [...new Set(dataList.map(item => item.warehouse))];
        return warehouses.filter(Boolean).map(warehouse => ({
            label: warehouse.name,
            value: warehouse._id
        }));
    }, [dataList]);

    const columns = [
        ...RenderCol({ t }),
        {
            title: t("common.actions"),
            key: "actions",
            render: (_: unknown, record: RackDataType) => (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                        setFormEdit({
                            isOpen: true,
                            data: record,
                        })
                    }
                >
                    {t("common.edit")}
                </Button>
            ),
        },
    ];

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between py-2">
                    <CardTitle>{t(`${lang_key}.title`)}</CardTitle>
                    <div className="flex items-center gap-2">
                        {selectedRowKeys.length > 0 && (
                            <Button
                                onClick={handleDeleteSelected}
                                variant="destructive"
                                className="ml-2"
                            >
                                <DeleteOutlined className="mr-2" />
                                {t("btn.delete")} ({selectedRowKeys.length})
                            </Button>
                        )}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={requestDataList}
                            disabled={loading}
                        >
                            <ReloadOutlined className="mr-2 h-4 w-4" />
                            {t("btn.reload")}
                        </Button>
                        <Button size="sm" onClick={() => setIsOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            {t("btn.create_new")}
                        </Button>
                    </div>
                </div>
                
                {/* Search and Filter Controls */}
                <div className="flex flex-wrap gap-4 mt-4">
                    <Input
                        placeholder={t("rack.search.placeholder")}
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 300 }}
                        allowClear
                    />
                    <Select
                        placeholder={t("rack.filter.all_statuses")}
                        value={statusFilter}
                        onChange={setStatusFilter}
                        style={{ width: 150 }}
                        allowClear
                        options={[
                            { label: t("rack.filter.all_statuses"), value: "" },
                            ...statusOptions
                        ]}
                    />
                    <Select
                        placeholder={t("rack.filter.all_warehouses")}
                        value={warehouseFilter}
                        onChange={setWarehouseFilter}
                        style={{ width: 200 }}
                        allowClear
                        options={[
                            { label: t("rack.filter.all_warehouses"), value: "" },
                            ...warehouseOptions
                        ]}
                    />
                    {(searchText || statusFilter || warehouseFilter) && (
                        <Button
                            variant="outline"
                            onClick={clearFilters}
                            size="sm"
                        >
                            {t("rack.filter.clear_filters")}
                        </Button>
                    )}
                </div>
            </CardHeader>

            <CardContent>
                <Table
                    rowKey="_id"
                    loading={loading}
                    columns={columns}
                    dataSource={filteredData}
                    pagination={false}
                    rowSelection={{
                        selectedRowKeys,
                        onChange: setSelectedRowKeys,
                    }}
                />
                <BasePagination
                    current={pageInfo.page}
                    pageSize={pageInfo.perPage}
                    total={filteredData.length}
                    onChange={(page, perPage) => { setPageInfo({ page, perPage }); }}
                />
            </CardContent>

            <ModalAdd
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onFinish={handleFinish}
            />

            <ModalEdit
                isOpen={formEdit.isOpen}
                onClose={() =>
                    setFormEdit({
                        isOpen: false,
                        data: {},
                    })
                }
                onFinish={handleUpdateFinish}
                initialValues={formEdit.data}
            />
        </Card>
    );
};

export default RackManagement;
