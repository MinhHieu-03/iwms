import { Modal, Descriptions, Tag, Timeline, Divider } from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { MissionDataType, MISSION_STATUS, MISSION_TYPE } from "./const";

interface ModalDetailProps {
  isOpen: boolean;
  data: MissionDataType | null;
  onClose: () => void;
}

const ModalDetail = ({ isOpen, data, onClose }: ModalDetailProps) => {
  const { t } = useTranslation();

  if (!data) return null;

  const getStateTag = (status: MISSION_STATUS) => {
    const stateMap: Record<string, { text: string; color: string }> = {
      new: { text: t("mission.state.new"), color: "default" },
      processing: { text: t("mission.state.processing"), color: "processing" },
      done: { text: t("mission.state.done"), color: "success" },
      error: { text: t("mission.state.error"), color: "error" },
      done_picking: { text: t("mission.state.done_picking"), color: "green" },
    };
    const stateInfo = stateMap[status || 'new'];
    return <Tag color={stateInfo.color}>{stateInfo.text}</Tag>;
  };

  const getTypeTag = (type: MISSION_TYPE) => {
    const typeMap: Record<string, { text: string; color: string }> = {
      inbound: { text: t("mission.type.inbound"), color: "blue" },
      outbound: { text: t("mission.type.outbound"), color: "green" },
      internal: { text: t("mission.type.internal"), color: "orange" },
      back_to_whs: { text: t("mission.type.back_whs"), color: "purple" },
      transfer_gate: { text: t("mission.type.transfer_gate"), color: "cyan" },
    };
    const typeInfo = typeMap[type];
    return <Tag color={typeInfo.color}>{typeInfo.text}</Tag>;
  };

  return (
    <Modal
      title={t("mission.detail_title")}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <div className="space-y-6">
        {/* Basic Information */}
        <div>
          <h3 className="text-lg font-semibold mb-3">{t("mission.basic_info")}</h3>
          <Descriptions column={2} bordered size="small">
            <Descriptions.Item label={t("mission.mission_code")}>
              <strong>{data?.mission_code}</strong>
            </Descriptions.Item>
            <Descriptions.Item label={t("mission.type")}>
              {getTypeTag(data?.type)}
            </Descriptions.Item>
            <Descriptions.Item label={t("mission.state")}>
              {getStateTag(data?.status || MISSION_STATUS.NEW)}
            </Descriptions.Item>
            <Descriptions.Item label={t("mission.robot_code")}>
              {data?.robot_code || "-"}
            </Descriptions.Item>
            <Descriptions.Item label={t("mission.origin")}>
              {data?.origin || "-"}
            </Descriptions.Item>
            <Descriptions.Item label={t("mission.destination")}>
              {data?.destination || "-"}
            </Descriptions.Item>
            <Descriptions.Item label={t("mission.bin_id")}>
              {data?.bin_id || "-"}
            </Descriptions.Item>
            <Descriptions.Item label={t("mission.eta")}>
              {data?.ETA ? `${data?.ETA} minutes` : "-"}
            </Descriptions.Item>
            <Descriptions.Item label={t("mission.description")} span={2}>
              {data?.description || "-"}
            </Descriptions.Item>
          </Descriptions>
        </div>

        {/* Inventory Information */}
        {data?.inventory && (
          <div>
            <h3 className="text-lg font-semibold mb-3">{t("mission.inventory_info")}</h3>
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label={t("mission.inventory_material_no")}>
                {data?.inventory.material_no || "-"}
              </Descriptions.Item>
              <Descriptions.Item label={t("mission.inventory_qty")}>
                {data?.inventory.qty || "-"}
              </Descriptions.Item>
              <Descriptions.Item label={t("mission.inventory_qty_available")} span={2}>
                {data?.inventory.qty_available || "-"}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}

        {/* Status History */}
        <div>
          <h3 className="text-lg font-semibold mb-3">{t("mission.status_history")}</h3>
          {data?.status_list && data?.status_list.length > 0 ? (
            <Timeline
              items={data?.status_list.map((status, index) => ({
                color: index === data?.status_list.length - 1 ? 'green' : 'blue',
                children: (
                  <div>
                    <div className="font-medium">{status.status}</div>
                    <div className="text-sm text-gray-500">
                      {dayjs(status.updateAt).format("DD/MM/YYYY HH:mm:ss")}
                    </div>
                  </div>
                ),
              }))}
            />
          ) : (
            <p className="text-gray-500">{t("mission.no_status_history")}</p>
          )}
        </div>

        {/* Additional Information */}
        <div>
          <h3 className="text-lg font-semibold mb-3">{t("mission.additional_info")}</h3>
          <Descriptions column={2} bordered size="small">
            <Descriptions.Item label={t("mission.inventory_id")}>
              {data?.inventory_id || "-"}
            </Descriptions.Item>
            <Descriptions.Item label={t("mission.kit_merger")}>
              {data?.kit_merger || "-"}
            </Descriptions.Item>
            <Descriptions.Item label={t("common.created_at")}>
              {dayjs(data?.createdAt).format("DD/MM/YYYY HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label={t("common.updated_at")}>
              {dayjs(data?.updatedAt).format("DD/MM/YYYY HH:mm:ss")}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDetail;