import { Form, Input, InputNumber, Select, Modal, Button, message } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RackDataType } from "./const";
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
    warehouse: string;
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
  initialValues: RackDataType | Record<string, unknown>;
}

const ModalEdit = ({ isOpen, onClose, onFinish, initialValues }: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [warehouses, setWarehouses] = useState<WarehouseType[]>([]);
  const [areaConfigs, setAreaConfigs] = useState<AreaConfigType[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingAreas, setLoadingAreas] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        setLoading(true);
        setError(null);
        const {data} = await apiClient.get(domain.warehouse.get_all);
        if (!data.metaData) {
          throw new Error('No warehouse data received');
        }
        setWarehouses(data.metaData);
      } catch (error) {
        console.error('Failed to fetch warehouses:', error);
        setError(t("common.create_error"));
        message.error(t("common.create_error"));
      } finally {
        setLoading(false);
      }
    };
    
    const fetchAreaConfigs = async () => {
      try {
        setLoadingAreas(true);
        setError(null);
        const {data} = await apiClient.get(domain.areaconfig.get_all);
        if (!data.metaData) {
          throw new Error('No area config data received');
        }
        setAreaConfigs(data.metaData);
      } catch (error) {
        console.error('Failed to fetch area configs:', error);
        setError(t("common.create_error"));
        message.error(t("common.create_error"));
      } finally {
        setLoadingAreas(false);
      }
    };

    if (isOpen) {
      fetchWarehouses();
      fetchAreaConfigs();
    }
  }, [isOpen, t]);

  useEffect(() => {
    if (isOpen && Object.keys(initialValues).length > 0) {
      form.setFieldsValue({
        ...initialValues,
        warehouse: initialValues?.warehouse?._id || initialValues.warehouse,
        area_config: initialValues?.area_config?._id || initialValues.area_config,
    });
    }
  }, [form, initialValues, isOpen]);

  const handleWarehouseChange = (value: string) => {
    form.setFieldValue('area_config', undefined); // Reset area_config when warehouse changes
  };

  const handleClose = () => {
    form.resetFields();
    setError(null);
    onClose();
  };
  const warehouse = Form.useWatch('warehouse', form);
  // Filter area configs based on selected warehouse
  const filteredAreaConfigs = warehouse
    ? areaConfigs.filter(area => area.warehouse === warehouse)
    : [];

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      title={t("rack.management.edit_title")}
      footer={[
        <Button key="cancel" onClick={handleClose}>
          {t("common.cancel")}
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          onClick={() => form.submit()}
          loading={loading || loadingAreas}
          disabled={!!error}
        >
          {t("common.save")}
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
      >
        <Form.Item
          name="location_code"
          label={t("rack.location_code")}
          rules={[
            { required: true, message: t("common.required") },
            { pattern: /^[A-Za-z0-9-]+$/, message: t("validation.alphanumeric") }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item 
          name="row" 
          label={t("rack.row")} 
          rules={[
            { required: true, message: t("common.required") },
            { type: 'number', min: 1, message: t("validation.positive_number") }
          ]}
        >
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item 
          name="column" 
          label={t("rack.column")} 
          rules={[
            { required: true, message: t("common.required") },
            { type: 'number', min: 1, message: t("validation.positive_number") }
          ]}
        >
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item 
          name="position" 
          label={t("rack.position")} 
          rules={[{ required: true, message: t("common.required") }]
          }
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
          rules={[{ required: true, message: t("common.required") }]
          }
        >
          <Select>
            <Select.Option value="horizontal">{t("rack.direction.horizontal")}</Select.Option>
            <Select.Option value="vertical">{t("rack.direction.vertical")}</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item 
          name="status" 
          label={t("rack.status")} 
          rules={[{ required: true, message: t("common.required") }]
          }
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
          rules={[{ required: true, message: t("common.required") }]
          }
        >
          <Select
            loading={loading}
            onChange={handleWarehouseChange}
            placeholder={t("common.select_warehouse")}
            disabled={loading}
            options={warehouses.map(warehouse => ({
              label: warehouse.name,
              value: warehouse._id
            }))}
          />
        </Form.Item>

        <Form.Item 
          name="area_config" 
          label={t("rack.area_config")} 
          rules={[{ required: true, message: t("common.required") }]
          }
        >
          <Select
            loading={loadingAreas}
            disabled={!warehouse|| loadingAreas}
            options={filteredAreaConfigs.map(area => ({
              label: area.name,
              value: area._id
            }))}
            placeholder={warehouse
              ? t("common.select_area") 
              : t("common.select_warehouse_first")}
          />
        </Form.Item>

        <Form.Item 
          name="rcs" 
          label={t("rack.rcs")} 
          rules={[{ required: true, message: t("common.required") }]
          }
          tooltip={t("rack.rcs.tooltip")}
        >
          <Input />
        </Form.Item>

        {error && (
          <div className="text-red-500 mb-4">
            {error}
          </div>
        )}
      </Form>
    </Modal>
  );
};

export default ModalEdit;
