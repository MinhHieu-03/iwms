import { Form, Input, InputNumber, Modal, Select } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { DataType } from "./const";

interface ModalEditProps {
  isOpen: boolean;
  data: DataType | Record<string, unknown>;
  onClose: () => void;
  onFinish: (values: FormValues) => void;
  loading?: boolean;
}

export interface FormValues {
  sku: string;
  qty: number;
  unit: string;
  location: string;
  status: string;
  inventory: {
    product_name: string;
  };
}

const { Option } = Select;

const ModalEdit = ({ isOpen, data, onClose, onFinish, loading }: ModalEditProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const onFormFinish = (values: FormValues) => {
    onFinish(values);
    form.resetFields();
  };

  useEffect(() => {
    if (isOpen && data && '_id' in data) {
      const typedData = data as DataType;
      form.setFieldsValue({
        sku: typedData.sku,
        qty: typedData.qty,
        unit: typedData.unit,
        location: typedData.location,
        status: typedData.status,
        inventory: {
          product_name: typedData.inventory?.product_name,
        },
      });
    }
  }, [isOpen, data, form]);

  return (
    <Modal
      title={t("outbound.edit")}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={t("common.save")}
      cancelText={t("common.cancel")}
      confirmLoading={loading}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFormFinish}
        autoComplete="off"
      >
        <Form.Item
          label={t("outbound.sku")}
          name="sku"
          rules={[
            {
              required: true,
              message: t("validation.required", { field: t("outbound.sku") }),
            },
          ]}
        >
          <Input placeholder={t("outbound.sku_placeholder")} />
        </Form.Item>

        <Form.Item
          label={t("outbound.product_name")}
          name={["inventory", "product_name"]}
          rules={[
            {
              required: true,
              message: t("validation.required", { field: t("outbound.product_name") }),
            },
          ]}
        >
          <Input placeholder={t("outbound.product_name_placeholder")} />
        </Form.Item>

        <Form.Item
          label={t("outbound.qty")}
          name="qty"
          rules={[
            {
              required: true,
              message: t("validation.required", { field: t("outbound.qty") }),
            },
            {
              type: "number",
              min: 1,
              message: t("validation.min_number", { field: t("outbound.qty"), min: 1 }),
            },
          ]}
        >
          <InputNumber 
            placeholder={t("outbound.qty_placeholder")} 
            min={1}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label={t("outbound.unit")}
          name="unit"
          rules={[
            {
              required: true,
              message: t("validation.required", { field: t("outbound.unit") }),
            },
          ]}
        >
          <Select placeholder={t("outbound.unit_placeholder")}>
            <Option value="pcs">{t("outbound.units.pcs")}</Option>
            <Option value="kg">{t("outbound.units.kg")}</Option>
            <Option value="boxes">{t("outbound.units.boxes")}</Option>
            <Option value="units">{t("outbound.units.units")}</Option>
            <Option value="liters">{t("outbound.units.liters")}</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={t("outbound.location")}
          name="location"
          rules={[
            {
              required: true,
              message: t("validation.required", { field: t("outbound.location") }),
            },
          ]}
        >
          <Input placeholder={t("outbound.location_placeholder")} />
        </Form.Item>

        <Form.Item
          label={t("outbound.status")}
          name="status"
          rules={[
            {
              required: true,
              message: t("validation.required", { field: t("outbound.status") }),
            },
          ]}
        >
          <Select placeholder={t("outbound.status_placeholder")}>
            <Option value="pending">{t("outbound.status.pending")}</Option>
            <Option value="in_progress">{t("outbound.status.in_progress")}</Option>
            <Option value="completed">{t("outbound.status.completed")}</Option>
            <Option value="cancelled">{t("outbound.status.cancelled")}</Option>
            <Option value="wait_fill">{t("outbound.status.wait_fill")}</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEdit;
