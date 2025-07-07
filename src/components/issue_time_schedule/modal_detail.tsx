import { Drawer, Descriptions, Tag, Table, Spin } from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { IssueTimeScheduleDataType } from "./const";
import apiClient from "@/lib/axios";

interface IssueDataDetail {
  id: number;
  section_c: string;
  line_c: string;
  issord_no: string;
  issord_dtl_no: string;
  material_no: string;
  issue_qty: number;
  issued_qty: number;
  plan_dt: string;
}

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
  const [issueDataDetails, setIssueDataDetails] = useState<IssueDataDetail[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch additional issue data when modal opens and data is available
  useEffect(() => {
    const fetchIssueData = async () => {
      if (isOpen && data?.issue_ord_no) {
        setLoading(true);
        try {
          const {data: issueData} = await apiClient.get(`issue-data/issord/${data.issue_ord_no}`);
          setIssueDataDetails(issueData.metaData || []);
        } catch (error) {
          console.error('Error fetching issue data:', error);
          setIssueDataDetails([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchIssueData();
  }, [isOpen, data?.issue_ord_no]);

  if (!data) return null;

  // Table columns for issue data details
  const issueDataColumns = [
    {
      title: t("issue_time_schedule.table.id", "ID"),
      dataIndex: "id",
      key: "id",
      width: 60,
    },
    {
      title: t("issue_time_schedule.table.section", "Section"),
      dataIndex: "section_c",
      key: "section_c",
      width: 80,
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: t("issue_time_schedule.table.line", "Line"),
      dataIndex: "line_c",
      key: "line_c",
      width: 80,
      render: (text: string) => <Tag color="orange">{text}</Tag>,
    },
    {
      title: t("issue_time_schedule.table.issue_order_detail", "Issue Order Detail"),
      dataIndex: "issord_dtl_no",
      key: "issord_dtl_no",
      width: 120,
    },
    {
      title: t("issue_time_schedule.table.material_no", "Material Number"),
      dataIndex: "material_no",
      key: "material_no",
      width: 150,
      render: (text: string) => text?.trim(),
    },
    {
      title: t("issue_time_schedule.table.issue_qty", "Issue Qty"),
      dataIndex: "issue_qty",
      key: "issue_qty",
      width: 80,
      align: "right" as const,
    },
    {
      title: t("issue_time_schedule.table.issued_qty", "Issued Qty"),
      dataIndex: "issued_qty",
      key: "issued_qty",
      width: 80,
      align: "right" as const,
    },
    {
      title: t("issue_time_schedule.table.plan_date", "Plan Date"),
      dataIndex: "plan_dt",
      key: "plan_dt",
      width: 120,
      render: (text: string) => (
        <Tag color="geekblue">
          {dayjs(text).format("YYYY-MM-DD")}
        </Tag>
      ),
    },
  ];

  return (
    <Drawer
      title={t("issue_time_schedule.modal.detail_title", "Issue Time Schedule Details")}
      open={isOpen}
      onClose={onCancel}
      placement="bottom"
      height="95vh"
      className="issue-detail-drawer"
    >
      <div className="space-y-6">
        <Descriptions
          title={t("issue_time_schedule.modal.basic_information", "Basic Information")}
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
          title={t("issue_time_schedule.modal.time_information", "Time Information")}
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
          title={t("issue_time_schedule.modal.system_information", "System Information")}
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
          <h4 className="font-semibold mb-3">{t("issue_time_schedule.modal.time_comparison", "Time Comparison")}</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="w-24 text-sm font-medium">{t("issue_time_schedule.modal.issue_time_label", "Issue Time")}:</span>
              <Tag color="red">{dayjs(data.time_issue).format("HH:mm")}</Tag>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-24 text-sm font-medium">{t("issue_time_schedule.modal.required_time_label", "Required Time")}:</span>
              <Tag color="lime">{dayjs(data.A_reqd_time).format("HH:mm")}</Tag>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-24 text-sm font-medium">{t("issue_time_schedule.modal.plan_issue_label", "Plan Issue")}:</span>
              <Tag color="cyan">{dayjs(data.plan_issue_dt).format("HH:mm")}</Tag>
            </div>
          </div>
        </div>

        {/* Issue Data Details Table */}
        <div>
          <h4 className="font-semibold mb-3">
            {t("issue_time_schedule.modal.issue_data_details", "Issue Data Details")}
          </h4>
          <Spin spinning={loading}>
            <Table
              columns={issueDataColumns}
              dataSource={issueDataDetails}
              rowKey="id"
              size="small"
              scroll={{ x: 800 }}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`,
              }}
            />
          </Spin>
        </div>
      </div>
    </Drawer>
  );
};

export default ModalDetail;
