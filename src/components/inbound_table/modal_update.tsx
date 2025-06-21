import { Form, Input, Modal, Select } from "antd";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { DataType } from "./const";

interface ModalEditProps {
  formEdit: {
    isOpen: boolean;
    data: DataType | Record<string, unknown>;
  };
  setFormEdit: (formEdit: { isOpen: boolean; data: DataType | Record<string, unknown> }) => void;
  _handleFinish: (values: FormValues) => void;
}

export interface FormValues {
  sku: string;
  origin: string;
  product_name: string;
  status: string;
}

const { Option } = Select;

const ModalEdit = ({ formEdit, setFormEdit, _handleFinish }: ModalEditProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (formEdit.isOpen && formEdit.data) {
      form.setFieldsValue(formEdit.data);
    }
  }, [formEdit.isOpen, formEdit.data, form]);

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    form.resetFields();
    setFormEdit({ isOpen: false, data: {} });
  };

  const onFinish = (values: FormValues) => {
    _handleFinish(values);
    form.resetFields();
  };

  return (
    <Modal
      title={t("inbound.edit")}
      open={formEdit.isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={t("inbound.btn.save")}
      cancelText={t("inbound.btn.cancel")}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label={t("inbound.sku")}
          name="sku"
          rules={[{ required: true, message: t("inbound.validation.sku_required") }]}
        >
          <Input placeholder={t("inbound.placeholder.sku")} />
        </Form.Item>

        <Form.Item
          label={t("inbound.origin")}
          name="origin"
          rules={[{ required: true, message: t("inbound.validation.origin_required") }]}
        >
          <Select placeholder={t("inbound.placeholder.origin")}>
            <Option value="inbound">{t("inbound.origin.inbound")}</Option>
            <Option value="outbound">{t("inbound.origin.outbound")}</Option>
            <Option value="internal">{t("inbound.origin.internal")}</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={t("inbound.product_name")}
          name="product_name"
          rules={[{ required: true, message: t("inbound.validation.product_name_required") }]}
        >
          <Input placeholder={t("inbound.placeholder.product_name")} />
        </Form.Item>

        <Form.Item
          label={t("inbound.status")}
          name="status"
          rules={[{ required: true, message: t("inbound.validation.status_required") }]}
        >
          <Select placeholder={t("inbound.placeholder.status")}>
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
