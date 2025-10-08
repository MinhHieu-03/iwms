import { Modal, Descriptions, Tag, Spin, Table, message } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useCallback } from "react";
import { DataType, StoreItem, domain } from "./const";
import apiClient from "@/lib/axios";

interface ModalDetailProps {
  isOpen: boolean;
  data: DataType | null;
  onClose: () => void;
}

const ModalDetail = ({ isOpen, data, onClose }: ModalDetailProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [detailData, setDetailData] = useState<DataType | null>(null);

  const fetchDetailData = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const {data} = await apiClient.get(`${domain.detail}/${id}`);
      setDetailData(data.metaData || null);
    } catch (error) {
      console.error("Failed to fetch detail data:", error);
      message.error(t("common.error.fetch_data"));
      // Fallback to original data if API fails
      setDetailData(data);
    } finally {
      setLoading(false);
    }
  }, [data, t]);

  useEffect(() => {
    if (isOpen && data?._id) {
      fetchDetailData(data._id);
    }
  }, [isOpen, data?._id, fetchDetailData]);

  const displayData = detailData || data;

  if (!displayData) return null;

  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      wait_fill: "orange",
      in_progress: "blue",
      completed: "green",
      cancelled: "red",
    };
    return statusMap[status] || "default";
  };

  return (
    <Modal
      title={t("inbound.detail_title")}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={1000}
      destroyOnClose
    >
      <Spin spinning={loading}>
        <Descriptions
          bordered
          column={2}
          size="middle"
          labelStyle={{ fontWeight: "bold", width: "150px" }}
        >
          <Descriptions.Item label={t("inbound.id")} span={2}>
            {displayData._id}
          </Descriptions.Item>
          
          <Descriptions.Item label={t("inbound.pic")}>
            {displayData.pic}
          </Descriptions.Item>
          
          <Descriptions.Item label={t("inbound.sku")}>
            {displayData.sku}
          </Descriptions.Item>
          
          <Descriptions.Item label={t("inbound.origin")}>
            {displayData.origin}
          </Descriptions.Item>
          
          <Descriptions.Item label={t("inbound.destination")}>
            {displayData.destination}
          </Descriptions.Item>
          
          <Descriptions.Item label={t("inbound.product_name")} span={2}>
            {displayData.product_name}
          </Descriptions.Item>
          
          <Descriptions.Item label={t("inbound.status")} span={2}>
            <Tag color={getStatusColor(displayData.status)}>
              {displayData.status}
            </Tag>
          </Descriptions.Item>
          
          <Descriptions.Item label={t("inbound.created_at")}>
            {displayData.createdAt ? dayjs(displayData.createdAt).format("DD/MM/YYYY HH:mm:ss") : "-"}
          </Descriptions.Item>
          
          <Descriptions.Item label={t("inbound.updated_at")}>
            {displayData.updatedAt ? dayjs(displayData.updatedAt).format("DD/MM/YYYY HH:mm:ss") : "-"}
          </Descriptions.Item>
        </Descriptions>

        {/* Inventory Section */}
        {displayData.inventory && (
          <div style={{ marginTop: 24 }}>
            <h3 style={{ marginBottom: 16 }}>{t("inbound.inventory_title")}</h3>
            <Descriptions
              bordered
              column={2}
              size="middle"
              labelStyle={{ fontWeight: "bold", width: "150px" }}
            >
              <Descriptions.Item label={t("inbound.inventory_id")} span={2}>
                {displayData.inventory._id}
              </Descriptions.Item>
              
              <Descriptions.Item label={t("inbound.inventory_sku")}>
                {displayData.inventory.sku}
              </Descriptions.Item>
              
              <Descriptions.Item label={t("inbound.inventory_product_name")}>
                {displayData.inventory.product_name}  
              </Descriptions.Item>
              
              <Descriptions.Item label={t("inbound.location_id")}>
                {displayData.inventory.locationId}
              </Descriptions.Item>
              
              <Descriptions.Item label={t("inbound.location_code")}>
                {displayData.inventory.locationCode}
              </Descriptions.Item>
              
              <Descriptions.Item label={t("inbound.inventory_status")} span={2}>
                <Tag color={getStatusColor(displayData.inventory.status)}>
                  {displayData.inventory.status}
                </Tag>
              </Descriptions.Item>
            </Descriptions>

            {/* Store Items Table */}
            <div style={{ marginTop: 16 }}>
              <h4 style={{ marginBottom: 12 }}>{t("inbound.store_items")}</h4>
              <Table
                dataSource={displayData.inventory.store}
                rowKey="key"
                pagination={false}
                size="small"
                columns={[
                  {
                    title: t("inbound.store_key"),
                    dataIndex: "key",
                    key: "key",
                  },
                  {
                    title: t("inbound.store_quantity"),
                    dataIndex: "qty",
                    key: "qty",
                    align: "right",
                  },
                ]}
              />
            </div>
          </div>
        )}
      </Spin>
    </Modal>
  );
};

export default ModalDetail;
