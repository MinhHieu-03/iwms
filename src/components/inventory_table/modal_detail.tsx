import { Modal, Descriptions, Tag, Divider } from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { InventoryDataType } from "./const";

interface ModalDetailProps {
  isOpen: boolean;
  data: InventoryDataType | null;
  onClose: () => void;
}

const ModalDetail = ({ isOpen, data, onClose }: ModalDetailProps) => {
  const { t } = useTranslation();

  if (!data) return null;

  const statusMap: Record<string, { text: string; color: string }> = {
    wait_fill: { text: t("status.wait_fill"), color: "orange" },
    fill: { text: t("status.fill"), color: "blue" },
    in_progress: { text: t("status.in_progress"), color: "processing" },
    completed: { text: t("status.completed"), color: "success" },
    low_stock: { text: t("status.low_stock"), color: "warning" },
    out_of_stock: { text: t("status.out_of_stock"), color: "error" },
  };

  const statusInfo = statusMap[data.status] || { text: t("status.unknown"), color: "default" };
  const totalItems = data.store.find(item => item.key === "Item")?.qty || 0;

  return (
    <Modal
      title={t("inventory.detail")}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={700}
    >
      <Descriptions
        bordered
        column={2}
        size="small"
        labelStyle={{ fontWeight: "bold", width: "30%" }}
      >
        <Descriptions.Item label={t("inventory.sku")} span={1}>
          <span className="font-mono text-blue-600">{data.sku}</span>
        </Descriptions.Item>
        <Descriptions.Item label={t("inventory.location_code")} span={1}>
          <span className="font-mono">{data.locationCode}</span>
        </Descriptions.Item>
        <Descriptions.Item label={t("inventory.product_name")} span={2}>
          {data.product_name}
        </Descriptions.Item>
        <Descriptions.Item label={t("inventory.status")} span={1}>
          <Tag color={statusInfo.color}>{statusInfo.text}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label={t("inventory.total_items")} span={1}>
          <span className="font-semibold text-blue-600 text-lg">
            {totalItems.toLocaleString()}
          </span>
        </Descriptions.Item>
        <Descriptions.Item label={t("inventory.created_at")} span={1}>
          {dayjs(data.createdAt).format("DD/MM/YYYY HH:mm:ss")}
        </Descriptions.Item>
        <Descriptions.Item label={t("inventory.updated_at")} span={1}>
          {dayjs(data.updatedAt).format("DD/MM/YYYY HH:mm:ss")}
        </Descriptions.Item>
      </Descriptions>

      <Divider orientation="left" orientationMargin="0">
        <span className="text-lg font-semibold">{t("inventory.store_items")}</span>
      </Divider>

      <div className="space-y-3">
        {data.store.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
          >
            <div className="flex items-center space-x-3">
              <Tag
                color={
                  item.key === "Item" 
                    ? "blue" 
                    : item.key === "Bag" 
                    ? "green" 
                    : item.key === "Plastic Bin"
                    ? "orange"
                    : "purple"
                }
                className="min-w-[100px] text-center"
              >
                {item.key}
              </Tag>
            </div>
            <div className="text-right">
              <span className="text-lg font-semibold text-gray-700">
                {item.qty.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 ml-1">units</span>
            </div>
          </div>
        ))}
      </div>

      {data.locationId && (
        <>
          <Divider orientation="left" orientationMargin="0">
            <span className="text-sm font-medium text-gray-600">{t("inventory.technical_info")}</span>
          </Divider>
          <Descriptions
            size="small"
            column={1}
            labelStyle={{ fontWeight: "normal", color: "#666" }}
          >
            <Descriptions.Item label={t("inventory.location_id")}>
              <span className="font-mono text-xs text-gray-500">{data.locationId}</span>
            </Descriptions.Item>
            <Descriptions.Item label={t("inventory.record_id")}>
              <span className="font-mono text-xs text-gray-500">{data._id}</span>
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Modal>
  );
};

export default ModalDetail;
