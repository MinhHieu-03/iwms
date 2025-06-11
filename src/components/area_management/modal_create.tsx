import { Form, Input, Modal, Select, Switch } from "antd";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import apiClient from "@/lib/axios";

interface ModalAddProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  _handleFinish: (values: FormValues) => void;
}

interface Warehouse {
  _id: string;
  name: string;
}

export interface FormValues {
  name: string;
  description?: string;
  warehouse: string;
  productions: string[];
  isActive: boolean;
}

const ModalAdd = ({ isOpen, setIsOpen, _handleFinish }: ModalAddProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await apiClient.get('/warehouse');
        setWarehouses(response.data?.metaData || []);
      } catch (error) {
        console.error('Error fetching warehouses:', error);
      }
    };

    if (isOpen) {
      fetchWarehouses();
    }
  }, [isOpen]);

  return (
    <Modal
      title={t("area.create")}
      open={isOpen}
      onOk={() => form.submit()}
      onCancel={() => setIsOpen(false)}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          _handleFinish(values);
          form.resetFields();
        }}
      >
        <Form.Item
          name="name"
          label={t("common.name")}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label={t("common.description")}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="warehouse"
          label={t("common.warehouse")}
          rules={[{ required: true, message: t("common.required") }]}
        >
          <Select
            style={{ width: '100%' }}
            placeholder={t("common.select_warehouse")}
            options={warehouses.map(warehouse => ({
              label: warehouse.name,
              value: warehouse._id
            }))}
          />
        </Form.Item>
        <Form.Item
          name="productions"
          label={t("common.productions")}
          rules={[{ required: true, message: t("common.required") }]}
        >
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder={t("common.select_productions")}
            options={warehouses.map(warehouse => ({
              label: warehouse.name,
              value: warehouse.name
            }))}
          />
        </Form.Item>
        <Form.Item
          name="isActive"
          label={t("common.status")}
          valuePropName="checked"
          initialValue={true}
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAdd;
