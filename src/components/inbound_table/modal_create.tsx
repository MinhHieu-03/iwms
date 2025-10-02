import { Form, Input, Modal, Select, InputNumber, Button } from "antd";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import apiClient from "@/lib/axios";
import { uniq } from "lodash";

interface ModalAddProps {
  isOpen: boolean;
  onClose: () => void;
  onFinish: (values: FormValues) => void;
  loading?: boolean;
}

export interface FormValues {
  sku: string;
  product_name: string;
  store: Array<{
    key: string;
    qty: number;
  }>;
}

interface MasterDataItem {
  _id: string;
  material_no: string;
  material_nm: string;
  material_tp: string;
  pk_style: number | string;
  new_pk_style: number | string;
  flg: number | string;
  comment: string;
  user_id: string;
  ent_dt: string;
  upd_dt: string;
}

const { Option } = Select;

const ModalAdd = ({ isOpen, onClose, onFinish, loading }: ModalAddProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [masterData, setMasterData] = useState<MasterDataItem[]>([]);
  const [storageData, setStorageData] = useState<string[]>([]);
  const [loadingMasterData, setLoadingMasterData] = useState(false);
  const sku = Form.useWatch('sku', form);

  useEffect(() => {
    if (sku) {
      const selectedItem = masterData.find(item => item.material_no === sku);
      if (selectedItem) {
        form.setFieldsValue({
          product_name: selectedItem.material_nm,
        });
      }
    }
  }, [sku, masterData, form]);
  
  // Fetch master data for SKU options
  useEffect(() => {
    if (isOpen) {
      fetchMasterData();
      fetchStorageData();
    }
  }, [isOpen]);

  const fetchMasterData = async () => {
    setLoadingMasterData(true);
    try {
      const { data } = await apiClient.get('/master-data');
      setMasterData(data?.metaData || []);
    } catch (error) {
      console.error('Error fetching master data:', error);
    } finally {
      setLoadingMasterData(false);
    }
  };

  const fetchStorageData = async () => {
    try {
      const { data } = await apiClient.get('/storage-model');
      const dataNodes = data?.metaData?.[0]?.nodes || [];
      const allData = dataNodes.map(i => i?.data?.label) || [];
      setStorageData(uniq(allData));
    } catch (error) {
      console.error('Error fetching storage data:', error);
    }
  };

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
      title={t("inbound.create")}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={t("btn.save")}
      cancelText={t("btn.cancel")}
      confirmLoading={loading}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFormFinish}
        autoComplete="off"
        initialValues={{
          store: [{ key: '', qty: 10 }]
        }}
      >
        <Form.Item
          label={t("inbound.sku")}
          name="sku"
          rules={[{ required: true, message: t("validation.required", { field: t("inbound.sku") }) }]}
        >
          <Select 
            placeholder={loadingMasterData ? t("common.loading") : t("inbound.sku_placeholder")}
            loading={loadingMasterData}
            showSearch
            filterOption={(input, option) => {
              const label = `${option?.value} - ${masterData.find(item => item.material_no === option?.value)?.material_nm || ''}`;
              return label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
            }}
          >
            {masterData.map((item) => (
              <Option key={item._id} value={item.material_no}>
                {item.material_no} - {item.material_nm}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={t("inbound.product_name")}
          name="product_name"
          rules={[{ required: true, message: t("validation.required", { field: t("inbound.product_name") }) }]}
        >
          <Input placeholder={t("inbound.product_name_placeholder")} />
        </Form.Item>

        <Form.List name="store">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} style={{ display: 'flex', marginBottom: 8, alignItems: 'center', gap: 8 }}>
                  <Form.Item
                    {...restField}
                    name={[name, 'key']}
                    rules={[{ required: true, message: t("validation.required", { field: t("inbound.storage_location") }) }]}
                    style={{ flex: 1 }}
                  >
                    <Select 
                      placeholder={loadingMasterData ? t("common.loading") : t("inbound.storage_location_placeholder")}
                      loading={loadingMasterData}
                    >
                      {storageData.map((item) => (
                        <Option key={item} value={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'qty']}
                    rules={[
                      { required: true, message: t("validation.required", { field: t("inbound.quantity") }) },
                      { type: 'number', min: 1, message: t("validation.min_value", { field: t("inbound.quantity"), min: 1 }) }
                    ]}
                    style={{ width: 120 }}
                  >
                    <InputNumber 
                      placeholder={t("inbound.quantity_placeholder")} 
                      min={1}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                  {fields.length > 1 && (
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  )}
                </div>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add({ key: '', qty: 10 })} block icon={<PlusOutlined />}>
                  {t("inbound.add_storage_location")}
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default ModalAdd;
