import { Drawer, Descriptions, Tag, Table, Spin } from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { IssueTimeScheduleDataType } from "./const";
import apiClient from "@/lib/axios";
import { createDummyData } from "@/lib/dummyData";

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
  const [issueDataDetails, setIssueDataDetails] = useState<IssueDataDetail[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  // Fetch additional issue data when modal opens and data is available
  useEffect(() => {
    const fetchIssueData = async () => {
      if (isOpen && data?.issue_ord_no) {
        setLoading(true);
        try {
          // const { data: issueData } = await apiClient.get(
          //   `issue-data/issord/${data.issue_ord_no}`
          // );
          const issueData = await createDummyData({
            issue_ord_no: [data.issue_ord_no],
          });
          console.log("issueData", issueData);
          if (data.status === "fill") {
            issueData.metaData.forEach((item) => {
              item.issued_qty = item.issue_qty;
            });
          } else if (data.status === "in progress") {
            issueData.metaData.forEach((item) => {
              item.issued_qty = Math.floor(Math.random() * item.issue_qty);
            });
          } else {
            issueData.metaData.forEach((item) => {
              item.issued_qty = 0;
            });
          }
          setIssueDataDetails(
            issueData.metaData as unknown as IssueDataDetail[]
          );
        } catch (error) {
          console.error("Error fetching issue data:", error);
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
      title: t("issue_time_schedule.table.id", "STT"),
      dataIndex: "STT",
      key: "STT",
      width: 60,
      render: (text: string, record: IssueDataDetail, index: number) =>
        index + 1,
    },
    {
      title: t("issue_time_schedule.modal.material_no"),
      dataIndex: "material_no",
      key: "material_no",
      width: 150,
      render: (text: string) => text?.trim(),
    },
    {
      title: t("issue_time_schedule.modal.material_name", "Material Name"),
      dataIndex: "material_name",
      key: "material_name",
      width: 150,
      render: (text: string) => text?.trim(),
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      key: "unit",
      width: 100,
    },
    {
      title: t("issue_time_schedule.modal.issue_qty", "Issue Qty"),
      dataIndex: "issue_qty",
      key: "issue_qty",
      width: 80,
      align: "right" as const,
    },
    {
      title: t("issue_time_schedule.modal.issued_qty", "Issued Qty"),
      dataIndex: "issued_qty",
      key: "issued_qty",
      width: 80,
      align: "right" as const,
    },
    // {
    //   title: t("issue_time_schedule.table.plan_date", "Plan Date"),
    //   dataIndex: "plan_dt",
    //   key: "plan_dt",
    //   width: 120,
    //   render: (text: string) => (
    //     <Tag color="geekblue">{dayjs(text).format("YYYY-MM-DD")}</Tag>
    //   ),
    // },
  ];

  return (
    <Drawer
      title={t(
        "issue_time_schedule.modal.detail_title",
        "Issue Time Schedule Details"
      )}
      open={isOpen}
      onClose={onCancel}
      placement="bottom"
      height="90vh"
      className="issue-detail-drawer"
    >
      <div className="space-y-6">
        <Descriptions
          title={t(
            "issue_time_schedule.modal.basic_information",
            "Basic Information"
          )}
          bordered
          size="small"
          column={2}
        >
          <Descriptions.Item
            label={t("issue_time_schedule.form.section", "Section")}
          >
            <Tag color="blue">{data.section_c}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label={t("issue_time_schedule.form.line", "Line")}>
            <Tag color="orange">{data.line_c}</Tag>
          </Descriptions.Item>
          <Descriptions.Item
            label={t(
              "issue_time_schedule.form.issue_order_no",
              "Issue Order Number"
            )}
          >
            <span className="font-medium text-blue-600">
              {data.issue_ord_no}
            </span>
          </Descriptions.Item>
        </Descriptions>

        <Descriptions
          title={t(
            "issue_time_schedule.modal.time_information",
            "Time Information"
          )}
          bordered
          size="small"
          column={1}
        >
          <Descriptions.Item
            label={t(
              "issue_time_schedule.form.plan_issue_date",
              "Plan Issue Date"
            )}
          >
            <Tag color="cyan">
              {dayjs(data.plan_issue_dt).format("YYYY-MM-DD HH:mm:ss")}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item
            label={t("issue_time_schedule.form.required_time", "Required Time")}
          >
            <Tag color="lime">
              {dayjs(data.A_reqd_time).format("YYYY-MM-DD HH:mm:ss")}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item
            label={t("issue_time_schedule.form.issue_time", "Issue Time")}
          >
            <Tag color="red">
              {dayjs(data.time_issue).format("YYYY-MM-DD HH:mm:ss")}
            </Tag>
          </Descriptions.Item>
        </Descriptions>

        {/* Issue Data Details Table */}
        <div>
          <h4 className="font-semibold mb-3">
            {t(
              "issue_time_schedule.modal.issue_data_details",
              "Issue Data Details"
            )}
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
