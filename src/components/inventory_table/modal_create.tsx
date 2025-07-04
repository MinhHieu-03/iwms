import { useState } from "react";
import { Modal, Form, Input, Select, InputNumber, Button, Row, Col } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export interface FormValues {
  sku: string;
  product_name: string;
  locationCode: string;
  store: Array<{
    key: string;
    qty: number;
  }>;
  status: string;
}

interface ModalAddProps {
  isOpen: boolean;
  onClose: () => void;
  onFinish: (values: FormValues) => void;
  loading: boolean;
}

const storeKeyOptions = [
  { label: "Plastic Bin", value: "Plastic Bin" },
  { label: "Bag", value: "Bag" },
  { label: "Item", value: "Item" },
  { label: "Box", value: "Box" },
  { label: "Pallet", value: "Pallet" },
];

const statusOptions = [
  { label: "Wait Fill", value: "wait_fill" },
  { label: "Fill", value: "fill" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
  { label: "Low Stock", value: "low_stock" },
  { label: "Out of Stock", value: "out_of_stock" },
];

const ModalAdd = ({ isOpen, onClose, onFinish, loading }: ModalAddProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleFinish = (values: FormValues) => {
    onFinish(values);
    form.resetFields();
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={t("inventory.create_new")}
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      width={800}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          store: [
            { key: "Plastic Bin", qty: 0 },
            { key: "Bag", qty: 0 },
            { key: "Item", qty: 0 },
          ],
          status: "wait_fill",
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="sku"
              label={t("inventory.sku")}
              rules={[
                { required: true, message: t("validation.required", { field: "SKU" }) },
              ]}
            >
              <Input placeholder={t("inventory.sku_placeholder")} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="locationCode"
              label={t("inventory.location_code")}
              rules={[
                { required: true, message: t("validation.required", { field: "Location Code" }) },
              ]}
            >
              <Input placeholder={t("inventory.location_code_placeholder")} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="product_name"
          label={t("inventory.product_name")}
          rules={[
            { required: true, message: t("validation.required", { field: "Product Name" }) },
          ]}
        >
          <Input placeholder={t("inventory.product_name_placeholder")} />
        </Form.Item>

        <Form.Item
          name="status"
          label={t("inventory.status")}
          rules={[
            { required: true, message: t("validation.required", { field: "Status" }) },
          ]}
        >
          <Select
            placeholder={t("inventory.status_placeholder")}
            options={statusOptions}
          />
        </Form.Item>

        <Form.Item label={t("inventory.store_items")}>
          <Form.List name="store">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row key={key} gutter={16} align="middle">
                    <Col span={10}>
                      <Form.Item
                        {...restField}
                        name={[name, "key"]}
                        rules={[
                          { required: true, message: t("validation.required", { field: "Store Type" }) },
                        ]}
                      >
                        <Select
                          placeholder={t("inventory.store_type_placeholder")}
                          options={storeKeyOptions}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item
                        {...restField}
                        name={[name, "qty"]}
                        rules={[
                          { required: true, message: t("validation.required", { field: "Quantity" }) },
                          { type: "number", min: 0, message: t("validation.min_value", { min: 0 }) },
                        ]}
                      >
                        <InputNumber
                          placeholder={t("inventory.quantity_placeholder")}
                          style={{ width: "100%" }}
                          min={0}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <MinusCircleOutlined
                        onClick={() => remove(name)}
                        style={{ color: "#ff4d4f", fontSize: "16px" }}
                      />
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    {t("inventory.add_store_item")}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>

        <div className="flex justify-end gap-2 mt-6">
          <Button onClick={handleCancel}>
            {t("btn.cancel")}
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {t("btn.create")}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalAdd;
