import { Form, Input, InputNumber, Select, Modal, Button } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import apiClient from "@/lib/axios";
import { domain } from "@/lib/domain";

interface WarehouseType {
    _id: string;
    name: string;
    description: string;
    location: string;
    status: string;
}

interface AreaConfigType {
    _id: string;
    name: string;
    description: string;
    warehouse: {
        _id: string;
        name: string;
    };
    status: string;
}

export interface FormValues {
    location_code: string;
    row: number;
    column: number;
    position: string;
    direction: string;
    status: string;
    warehouse: string;
    area_config: string;
    rcs: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onFinish: (values: FormValues) => void;
}

const ModalAdd = ({ isOpen, onClose, onFinish }: Props) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [warehouses, setWarehouses] = useState<WarehouseType[]>([]);
    const [areaConfigs, setAreaConfigs] = useState<AreaConfigType[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingAreas, setLoadingAreas] = useState(false);
    const warehouse = Form.useWatch('warehouse', form);
    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                setLoading(true);
                const { data } = await apiClient.get(domain.warehouse.get_all);
                setWarehouses(data.metaData);
            } catch (error) {
                console.error('Failed to fetch warehouses:', error);
            } finally {
                setLoading(false);
            }
        }; const fetchAreaConfigs = async () => {
            try {
                setLoadingAreas(true);
                const { data } = await apiClient.get(domain.areaconfig.get_all);
                setAreaConfigs(data.metaData);
            } catch (error) {
                console.error('Failed to fetch area configs:', error);
            } finally {
                setLoadingAreas(false);
            }
        };

        if (isOpen) {
            fetchWarehouses();
            fetchAreaConfigs();
        }
    }, [isOpen]);

    const handleClose = () => {
        form.resetFields();
        onClose();
    };

    const areaConfigOptions = areaConfigs
        .filter((config) => config.warehouse._id === warehouse)
        .map((config) => ({
            label: config.name,
            value: config._id,
        }));
    console.log('Area Config Options:', areaConfigOptions, warehouse);
    return (
        <Modal
            open={isOpen}
            onCancel={handleClose}
            title={t("rack.management.add_title")}
            footer={[
                <Button key="cancel" onClick={handleClose}>
                    {t("common.cancel")}
                </Button>,
                <Button key="submit" type="primary" onClick={() => form.submit()}>
                    {t("common.create")}
                </Button>,
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={(values) => {
                    onFinish(values);
                    form.resetFields();
                }}
            >            <Form.Item
                name="location_code"
                label={t("rack.location_code")}
                rules={[
                    { required: true, message: t("common.required") },
                    { 
                        pattern: /^[A-Za-z0-9-]+$/, 
                        message: t("rack.validation.location_code_format") 
                    }
                ]}
            >
                    <Input placeholder="e.g., A1-01-L" />
                </Form.Item>

                <Form.Item
                    name="row"
                    label={t("rack.row")}
                    rules={[{ required: true, message: t("common.required") }]}
                >
                    <InputNumber min={1} style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                    name="column"
                    label={t("rack.column")}
                    rules={[{ required: true, message: t("common.required") }]}
                >
                    <InputNumber min={1} style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                    name="position"
                    label={t("rack.position")}
                    rules={[{ required: true, message: t("common.required") }]}
                >
                    <Select>
                        <Select.Option value="top-left">{t("rack.position.top_left")}</Select.Option>
                        <Select.Option value="top-right">{t("rack.position.top_right")}</Select.Option>
                        <Select.Option value="bottom-left">{t("rack.position.bottom_left")}</Select.Option>
                        <Select.Option value="bottom-right">{t("rack.position.bottom_right")}</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="direction"
                    label={t("rack.direction")}
                    rules={[{ required: true, message: t("common.required") }]}
                >
                    <Select>
                        <Select.Option value="horizontal">{t("rack.direction.horizontal")}</Select.Option>
                        <Select.Option value="vertical">{t("rack.direction.vertical")}</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="status"
                    label={t("rack.status")}
                    rules={[{ required: true, message: t("common.required") }]}
                >
                    <Select>
                        <Select.Option value="empty">{t("rack.status.empty")}</Select.Option>
                        <Select.Option value="occupied">{t("rack.status.occupied")}</Select.Option>
                        <Select.Option value="reserved">{t("rack.status.reserved")}</Select.Option>
                        <Select.Option value="maintenance">{t("rack.status.maintenance")}</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="warehouse"
                    label={t("rack.warehouse")}
                    rules={[{ required: true, message: t("common.required") }]}
                >
                    <Select
                        loading={loading}
                        placeholder={t("common.select_warehouse")}
                        options={warehouses.map(warehouse => ({
                            label: warehouse.name,
                            value: warehouse._id
                        }))}
                        onChange={() => {
                            // Clear area_config when warehouse changes
                            form.setFieldValue('area_config', undefined);
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name="area_config"
                    label={t("rack.area_config")}
                    rules={[{ required: true, message: t("common.required") }]}
                >
                    <Select
                        loading={loadingAreas}
                        options={areaConfigOptions}
                        disabled={!form.getFieldValue('warehouse')}
                        placeholder={warehouse 
                            ? t("common.select_area") 
                            : t("common.select_warehouse_first")}
                    />
                </Form.Item>

                <Form.Item
                    name="rcs"
                    label={t("rack.rcs")}
                    tooltip={t("rack.rcs.tooltip")}
                    rules={[
                        { required: true, message: t("common.required") },
                        { 
                            pattern: /^[A-Za-z0-9]+$/, 
                            message: t("rack.validation.rcs_format") 
                        }
                    ]}
                >
                    <Input placeholder="e.g., RCS001" />
                </Form.Item>        </Form>
        </Modal>
    );
};

export default ModalAdd;
