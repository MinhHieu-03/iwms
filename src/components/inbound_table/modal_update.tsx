import { Form, Input, Modal, Select } from "antd";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
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
  origin: string;
  product_name: string;
  status: string;
}

const { Option } = Select;

const ModalEdit = ({ isOpen, data, onClose, onFinish, loading }: ModalEditProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen && data && '_id' in data) {
      const typedData = data as DataType;
      form.setFieldsValue({
        sku: typedData.sku,
        origin: typedData.origin,
        product_name: typedData.product_name,
        status: typedData.status,
      });
    }
  }, [isOpen, data, form]);

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

  return (
    <Modal
      title={t("inbound.edit")}
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
          label={t("inbound.sku")}
          name="sku"
          rules={[{ required: true, message: t("validation.required", { field: t("inbound.sku") }) }]}
        >
          <Input placeholder={t("inbound.sku_placeholder")} />
        </Form.Item>

        <Form.Item
          label={t("inbound.origin")}
          name="origin"
          rules={[{ required: true, message: t("validation.required", { field: t("inbound.origin") }) }]}
        >
          <Select placeholder={t("inbound.origin_placeholder")}>
            <Option value="inbound">{t("inbound.origin.inbound")}</Option>
            <Option value="outbound">{t("inbound.origin.outbound")}</Option>
            <Option value="internal">{t("inbound.origin.internal")}</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={t("inbound.product_name")}
          name="product_name"
          rules={[{ required: true, message: t("validation.required", { field: t("inbound.product_name") }) }]}
        >
          <Input placeholder={t("inbound.product_name_placeholder")} />
        </Form.Item>

        <Form.Item
          label={t("inbound.status")}
          name="status"
          rules={[{ required: true, message: t("validation.required", { field: t("inbound.status") }) }]}
        >
          <Select placeholder={t("inbound.status_placeholder")}>
            <Option value="wait_fill">{t("inbound.status.wait_fill")}</Option>
            <Option value="in_progress">{t("inbound.status.in_progress")}</Option>
            <Option value="completed">{t("inbound.status.completed")}</Option>
            <Option value="cancelled">{t("inbound.status.cancelled")}</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEdit;
