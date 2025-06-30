import { Form, InputNumber, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/axios";
import {uniq} from 'lodash';
interface ModalAddProps {
  isOpen: boolean;
  onClose: () => void;
  onFinish: (values: FormValues) => void;
  loading?: boolean;
}

export interface FormValues {
  sku: string;
  qty: number;
  unit: string;
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

  // Use TanStack Query for master data
  const { 
    data: masterData = [], 
    isLoading: loadingMasterData 
  } = useQuery({
    queryKey: ['master-data'],
    queryFn: async () => {
      const { data } = await apiClient.get('/master-data');
      return data?.metaData || [];
    },
    enabled: isOpen,
  });

  // Use TanStack Query for storage data
  const { 
    data: storageData = [], 
    isLoading: loadingStorageData 
  } = useQuery({
    queryKey: ['storage-model'],
    queryFn: async () => {
      const { data } = await apiClient.get('/storage-model');
      const dataNodes = data?.metaData?.[0]?.nodes || [];
      const allData = dataNodes.map(i => i?.data?.label) || [];
      console.log('uniq(allData)', uniq(allData));
      return uniq(allData);
    },
    enabled: isOpen,
  });

  const isDataLoading = loadingMasterData || loadingStorageData;

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
      title={t("outbound.create")}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={t("outbound.btn.save")}
      cancelText={t("outbound.btn.cancel")}
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
              message: t("outbound.validation.sku_required"),
            },
          ]}
        >
          <Select 
            placeholder={isDataLoading ? t("outbound.storage.loading") : t("outbound.placeholder.sku")}
            loading={isDataLoading}
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
          label={t("outbound.qty")}
          name="qty"
          rules={[
            {
              required: true,
              message: t("outbound.validation.qty_required"),
            },
            {
              type: "number",
              min: 1,
              message: t("outbound.validation.qty_positive"),
            },
          ]}
        >
          <InputNumber 
            placeholder={t("outbound.placeholder.qty")} 
            min={1}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label={t("outbound.storage")}
          name="unit"
          rules={[
            {
              required: true,
              message: t("outbound.validation.unit_required"),
            },
          ]}
        >
          <Select 
            placeholder={isDataLoading ? t("outbound.storage.loading") : t("outbound.placeholder.storage")}
            loading={isDataLoading}
          >
            {storageData.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option> 
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAdd;
