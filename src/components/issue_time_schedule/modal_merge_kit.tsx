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
      width: 30,
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
      title: "Đơn vị",
      dataIndex: "unit",
      key: "unit",
      width: 80,
    },
    {
      title: "Số lượng yêu cầu",
      dataIndex: "issue_qty",
      key: "issue_qty",
      width: 120,
    },
    {
      title: "Số lượng tồn kho",
      dataIndex: "issued_qty",
      key: "issued_qty",
      width: 120,
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
        {/* Assumption Information Section */}
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          {/* Summary Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">
                  {new Set(mergeData.flatMap(item => 
                    Array.isArray(item.issue_ord_no) ? item.issue_ord_no : [item.issue_ord_no]
                  )).size}
                </div>
                <div className="text-gray-600">Tổng số KIT</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">
                  {mergeData.length}
                </div>
                <div className="text-gray-600">Tổng loại vật tư</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">
                  {mergeData.filter(item => (item.issued_qty || 0) >= (item.issue_qty || 0)).length}
                </div>
                <div className="text-gray-600">Đã hoàn thành</div>
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
