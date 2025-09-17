import { Drawer, Descriptions, Tag, Table, Spin, Button, Checkbox } from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { IssueTimeScheduleDataType } from "./const";
import apiClient from "@/lib/axios";
import { createDummyData } from "@/lib/dummyData";
import { render } from "@react-three/fiber";

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
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<IssueDataDetail[]>([]);
  const [showIncompleteOnly, setShowIncompleteOnly] = useState(false);

  // Fetch additional issue data when modal opens and data is available
  useEffect(() => {
    const fetchIssueData = async () => {
      if (isOpen && data?.issue_ord_no) {
        setLoading(true);
        try {
          const { data: issueData } = await apiClient.get(
            `issue-data/issord/${data.issue_ord_no}`
          );
          // const issueData = await createDummyData({
          //   issue_ord_no: [data.issue_ord_no],
          // });
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

  // Filter data based on checkbox
  const filteredIssueDataDetails = showIncompleteOnly
    ? issueDataDetails.filter(item => item.issue_qty > item.issued_qty)
    : issueDataDetails;

  // Row selection configuration
  const rowSelection = {
    selectedRowKeys,
    onChange: (
      newSelectedRowKeys: React.Key[],
      newSelectedRows: IssueDataDetail[]
    ) => {
      setSelectedRowKeys(newSelectedRowKeys);
      setSelectedRows(newSelectedRows);
    },
    onSelectAll: (
      selected: boolean,
      selectedRows: IssueDataDetail[],
      changeRows: IssueDataDetail[]
    ) => {
      console.log("Select all:", selected, selectedRows, changeRows);
    },
    onSelect: (
      record: IssueDataDetail,
      selected: boolean,
      selectedRows: IssueDataDetail[],
      nativeEvent: Event
    ) => {
      console.log("Select row:", record, selected, selectedRows);
    },
  };

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
      title: "Section",
      dataIndex: "section_c",
      key: "section_c",
      width: 150,
      render: (text: string) => text?.trim(),
    },
    {
      title: "Line",
      dataIndex: "line_c",
      key: "line_c",
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
      render: (text: number, record: IssueDataDetail) => (
        <span className={`${record.issue_qty > text ? "text-red-600" : "text-green-600"} font-medium`}>{text}</span>
      ),  
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
            "issue_time_schedule.modal.order_information",
            "Order Information"
          )}
          bordered
          size="small"
          column={2}
        >
          {/* <Descriptions.Item
            label={t("issue_time_schedule.form.section", "Section")}
          >
            <Tag color="blue">{data.section_c}</Tag>
          </Descriptions.Item> */}
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
          <Descriptions.Item label="Tổng số vật tư">
            <Tag color="green">
              {showIncompleteOnly 
                ? `${filteredIssueDataDetails.length}/${issueDataDetails.length} vật tư chưa lấy đủ`
                : `${issueDataDetails.length} vật tư`
              }
            </Tag>
          </Descriptions.Item>
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
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <h3 className="font-semibold">Danh sách vật tư</h3>
              <span className="ml-2 text-blue-600">
                ({selectedRowKeys.length} selected)
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox
                checked={showIncompleteOnly}
                onChange={(e) => {
                  setShowIncompleteOnly(e.target.checked);
                  // Clear selection when filter changes
                  setSelectedRowKeys([]);
                  setSelectedRows([]);
                }}
              >
                Chỉ hiển thị vật tư chưa lấy đủ
              </Checkbox>
              {selectedRowKeys.length > 0 && (
                <Button onClick={() => {}}>
                  Xác nhận lấy đủ hàng
                </Button>
              )}
            </div>
          </div>
          <Spin spinning={loading}>
            <Table
              columns={issueDataColumns}
              dataSource={filteredIssueDataDetails}
              rowKey="material_no"
              size="small"
              scroll={{ x: 800 }}
              rowSelection={rowSelection}
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
