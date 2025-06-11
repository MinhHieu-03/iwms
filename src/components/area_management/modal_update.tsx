import { Form, Input, Modal, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import apiClient from "@/lib/axios";
import { DataType } from "./const";

interface ModalEditProps {
  formEdit: {
    isOpen: boolean;
    data: Partial<DataType>;
  };
  setFormEdit: (value: { isOpen: boolean; data: Partial<DataType> }) => void;
  _handleFinish: (values: any) => void;
}

interface Warehouse {
  _id: string;
  name: string;
}

const ModalEdit = ({ formEdit, setFormEdit, _handleFinish }: ModalEditProps) => {
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

    if (formEdit.isOpen) {
      fetchWarehouses();
    }
  }, [formEdit.isOpen]);

  useEffect(() => {
    if (formEdit.isOpen) {
      form.setFieldsValue(formEdit.data);
    }
  }, [formEdit]);

  return (
    <Modal
      title={t("area.edit")}
      open={formEdit.isOpen}
      onOk={() => form.submit()}
      onCancel={() => setFormEdit({ isOpen: false, data: {} })}
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
        </Form.Item>        <Form.Item
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
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEdit;
