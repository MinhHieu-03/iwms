import { Modal, Descriptions, Tag } from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { IssueTimeScheduleDataType } from "./const";

interface ModalDetailProps {
  isOpen: boolean;
  onCancel: () => void;
  data: IssueTimeScheduleDataType | null;
}

const ModalDetail: React.FC<ModalDetailProps> = ({
  isOpen,
  onCancel,
  data,
}) => {
  const { t } = useTranslation();

  if (!data) return null;

  return (
    <Modal
      title={t("issue_time_schedule.modal.detail_title", "Issue Time Schedule Details")}
      open={isOpen}
      onCancel={onCancel}
      footer={null}
      width={900}
    >
      <div className="space-y-6">
        <Descriptions
          title="Basic Information"
          bordered
          size="small"
          column={2}
        >
          <Descriptions.Item label={t("issue_time_schedule.form.section", "Section")}>
            <Tag color="blue">{data.section_c}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label={t("issue_time_schedule.form.factory", "Factory")}>
            <Tag color="green">{data.fact_c}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label={t("issue_time_schedule.form.line", "Line")}>
            <Tag color="orange">{data.line_c}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label={t("issue_time_schedule.form.product_no", "Product Number")}>
            <Tag color="purple">{data.prod_no}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label={t("issue_time_schedule.form.customer_desc_1", "Customer Description 1")}>
            {data.cusdesch_cd1}
          </Descriptions.Item>
          <Descriptions.Item label={t("issue_time_schedule.form.customer_desc_2", "Customer Description 2")}>
            {data.cusdesch_cd2}
          </Descriptions.Item>
          <Descriptions.Item label={t("issue_time_schedule.form.internal_desc", "Internal Description")}>
            {data.intdesch_cd}
          </Descriptions.Item>
          <Descriptions.Item label={t("issue_time_schedule.form.issue_order_no", "Issue Order Number")}>
            <span className="font-medium text-blue-600">{data.issue_ord_no}</span>
          </Descriptions.Item>
        </Descriptions>

        <Descriptions
          title="Time Information"
          bordered
          size="small"
          column={1}
        >
          <Descriptions.Item label={t("issue_time_schedule.form.plan_issue_date", "Plan Issue Date")}>
            <Tag color="cyan">
              {dayjs(data.plan_issue_dt).format("YYYY-MM-DD HH:mm:ss")}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label={t("issue_time_schedule.form.required_time", "Required Time")}>
            <Tag color="lime">
              {dayjs(data.A_reqd_time).format("YYYY-MM-DD HH:mm:ss")}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label={t("issue_time_schedule.form.issue_time", "Issue Time")}>
            <Tag color="red">
              {dayjs(data.time_issue).format("YYYY-MM-DD HH:mm:ss")}
            </Tag>
          </Descriptions.Item>
        </Descriptions>

        <Descriptions
          title="System Information"
          bordered
          size="small"
          column={2}
        >
          <Descriptions.Item label={t("issue_time_schedule.form.user_id", "User ID")}>
            <Tag color="default">{data.userid}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label={t("issue_time_schedule.form.entry_date", "Entry Date")}>
            {dayjs(data.ent_dt).format("YYYY-MM-DD")}
          </Descriptions.Item>
          <Descriptions.Item label={t("issue_time_schedule.form.update_date", "Update Date")} span={2}>
            {dayjs(data.upd_dt).format("YYYY-MM-DD HH:mm:ss")}
          </Descriptions.Item>
        </Descriptions>

        {/* Timeline comparison */}
        <div className="bg-gray-50 p-4 rounded">
          <h4 className="font-semibold mb-3">Time Comparison</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="w-24 text-sm font-medium">Issue Time:</span>
              <Tag color="red">{dayjs(data.time_issue).format("HH:mm")}</Tag>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-24 text-sm font-medium">Required Time:</span>
              <Tag color="lime">{dayjs(data.A_reqd_time).format("HH:mm")}</Tag>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-24 text-sm font-medium">Plan Issue:</span>
              <Tag color="cyan">{dayjs(data.plan_issue_dt).format("HH:mm")}</Tag>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDetail;
