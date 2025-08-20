import { Drawer, Descriptions, Tag, Table, Spin } from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useState, useEffect } from "react";

interface ModalDetailProps {
  isOpen: boolean;
  onCancel: () => void;
  data: any;
}

const ModalMergeKit: React.FC<ModalDetailProps> = ({
  isOpen,
  onCancel,
  data,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  if (!data) return null;

  const mergeData = data.reduce((acc: any[], record: any) => {
    const existingIndex = acc.findIndex(
      (item) => item.material_no === record.material_no
    );
    if (existingIndex >= 0) {
      acc[existingIndex].issue_qty += record.issue_qty;
      if (!acc[existingIndex].issue_ord_no.includes(record.issue_ord_no)) {
        acc[existingIndex].issue_ord_no = [
          ...(Array.isArray(acc[existingIndex].issue_ord_no)
            ? acc[existingIndex].issue_ord_no
            : [acc[existingIndex].issue_ord_no]),
          record.issue_ord_no,
        ];
      }
      if (record.issued_qty) {
        acc[existingIndex].issued_qty =
          (acc[existingIndex].issued_qty || 0) + record.issued_qty;
      }
    } else {
      acc.push({ ...record });
    }
    return acc;
  }, []);

  const issueDataColumns = [
    {
      title: t("issue_time_schedule.table.id", "STT"),
      dataIndex: "STT",
      key: "STT",
      width: 60,
      render: (text: string, record: any, index: number) => index + 1,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "material_name",
      key: "material_name",
      width: 150,
    },
    // {
    //   title: "Vị trí",
    //   dataIndex: ["inventory", "locationCode"],
    //   key: "locationCode",
    //   width: 120,
    // },
    {
      title: "Mã vật tư",
      dataIndex: "material_no",
      key: "material_no",
      render: (text) => text?.trim(),
      width: 150,
    },
    {
      title: "Mã KIT",
      dataIndex: "issue_ord_no",
      key: "issue_ord_no",
      render: (text: string | string[]) => {
        if (Array.isArray(text)) {
          return text.join(", ");
        }
        return text;
      },
      width: 120,
    },
    {
      title: "Mã KIT dtl",
      dataIndex: "issord_dtl_no",
      key: "issord_dtl_no",
      width: 120,
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      key: "unit",
      width: 100,
    },
    {
      title: "Số lượng yêu cầu",
      dataIndex: "issue_qty",
      key: "issue_qty",
      width: 130,
    },
    {
      title: "Số lượng tồn kho",
      dataIndex: "issued_qty",
      key: "issued_qty",
      width: 140,
      render: (text, record) => (
        <span
          className={
            record.inventory_qty < record.issue_qty
              ? "text-red-500 font-medium"
              : "text-green-600"
          }
        >
          {text?.toLocaleString()}
        </span>
      ),
    },
  ];

  return (
    <Drawer
      title={"Danh sách gộp KIT"}
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
          <Descriptions.Item
            label={t("issue_time_schedule.form.factory", "Factory")}
          >
            <Tag color="green">{data.fact_c}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label={t("issue_time_schedule.form.line", "Line")}>
            <Tag color="orange">{data.line_c}</Tag>
          </Descriptions.Item>
          <Descriptions.Item
            label={t("issue_time_schedule.form.product_no", "Product Number")}
          >
            <Tag color="purple">{data.prod_no}</Tag>
          </Descriptions.Item>
          <Descriptions.Item
            label={t(
              "issue_time_schedule.form.customer_desc_1",
              "Customer Description 1"
            )}
          >
            {data.cusdesch_cd1}
          </Descriptions.Item>
          <Descriptions.Item
            label={t(
              "issue_time_schedule.form.customer_desc_2",
              "Customer Description 2"
            )}
          >
            {data.cusdesch_cd2}
          </Descriptions.Item>
          <Descriptions.Item
            label={t(
              "issue_time_schedule.form.internal_desc",
              "Internal Description"
            )}
          >
            {data.intdesch_cd}
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

        <Descriptions
          title={t(
            "issue_time_schedule.modal.system_information",
            "System Information"
          )}
          bordered
          size="small"
          column={2}
        >
          <Descriptions.Item
            label={t("issue_time_schedule.form.user_id", "User ID")}
          >
            <Tag color="default">{data.userid}</Tag>
          </Descriptions.Item>
          <Descriptions.Item
            label={t("issue_time_schedule.form.entry_date", "Entry Date")}
          >
            {dayjs(data.ent_dt).format("YYYY-MM-DD")}
          </Descriptions.Item>
          <Descriptions.Item
            label={t("issue_time_schedule.form.update_date", "Update Date")}
            span={2}
          >
            {dayjs(data.upd_dt).format("YYYY-MM-DD HH:mm:ss")}
          </Descriptions.Item>
        </Descriptions>

        {/* Timeline comparison */}
        <div className="bg-gray-50 p-4 rounded">
          <h4 className="font-semibold mb-3">
            {t("issue_time_schedule.modal.time_comparison", "Time Comparison")}
          </h4>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="w-24 text-sm font-medium">
                {t("issue_time_schedule.modal.issue_time_label", "Issue Time")}:
              </span>
              <Tag color="red">{dayjs(data.time_issue).format("HH:mm")}</Tag>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-24 text-sm font-medium">
                {t(
                  "issue_time_schedule.modal.required_time_label",
                  "Required Time"
                )}
                :
              </span>
              <Tag color="lime">{dayjs(data.A_reqd_time).format("HH:mm")}</Tag>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-24 text-sm font-medium">
                {t("issue_time_schedule.modal.plan_issue_label", "Plan Issue")}:
              </span>
              <Tag color="cyan">
                {dayjs(data.plan_issue_dt).format("HH:mm")}
              </Tag>
            </div>
          </div>
        </div>

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
              dataSource={mergeData}
              rowKey="material_no"
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

export default ModalMergeKit;
