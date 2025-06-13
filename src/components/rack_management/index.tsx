import { ReloadOutlined, DeleteOutlined } from "@ant-design/icons";
import { message, Table, Modal } from "antd";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
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
    const [formEdit, setFormEdit] = useState<{
        isOpen: boolean;
        data: RackDataType | Record<string, unknown>;
    }>({
        isOpen: false,
        data: {},
    });

    const requestDataList = async () => {
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
    };

    const handleFinish = (values: FormValues) => {
        const payload = {
            ...values,
        };

        apiClient
            .post(create, payload)
            .then(() => {
                message.success(t("common.create_success"));
                setIsOpen(false);
                requestDataList();
            })
            .catch((err) => {
                message.error(t("common.create_error"));
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
                message.success(t("common.update_success"));
                setFormEdit({
                    isOpen: false,
                    data: {},
                });
                requestDataList();
            })
            .catch((err) => {
                message.error(t("common.update_error"));
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
                    message.success(t("common.delete_success"));
                    setSelectedRowKeys([]);
                    requestDataList();
                } catch (error) {
                    console.error(error);
                    message.error(t("common.delete_error"));
                }
            },
        });
    };

    useEffect(() => {
        requestDataList();
    }, [pageInfo]);

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
            </CardHeader>

            <CardContent>
                <Table
                    rowKey="_id"
                    loading={loading}
                    columns={columns}
                    dataSource={dataList}
                    pagination={false}
                    rowSelection={{
                        selectedRowKeys,
                        onChange: setSelectedRowKeys,
                    }}
                />
                <BasePagination
                    current={pageInfo.page}
                    pageSize={pageInfo.perPage}
                    total={total}
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
