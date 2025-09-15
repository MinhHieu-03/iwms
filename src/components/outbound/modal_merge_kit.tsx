import { Drawer, Descriptions, Tag, Table, Spin, Checkbox } from "antd";
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
  const [showInsufficientOnly, setShowInsufficientOnly] = useState(false);

  if (!data) return null;

  const mergeData = data;

  // Filter data based on insufficient inventory
  const filteredData = showInsufficientOnly 
    ? mergeData.filter(item => (item.available_qty || 0) < (item.issue_qty || 0))
    : mergeData;

  const issueDataColumns = [
    {
      title: t("issue_time_schedule.table.id", "STT"),
      dataIndex: "STT",
      key: "STT",
      width: 30,
      render: (text: string, record: any, index: number) => index + 1,
    },
    {
      title: "Mã vật tư",
      dataIndex: "material_no",
      key: "material_no",
      render: (text) => text?.trim(),
      width: 150,
    },
    {
      title: "Số lượng yêu cầu",
      dataIndex: "issue_qty",
      key: "issue_qty",
      width: 120,
    },
    {
      title: "Số lượng tồn kho",
      dataIndex: "available_qty",
      key: "available_qty",
      width: 120,
      render: (text, record) => (
        <span
          className={
            record.available_qty < record.issue_qty
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
      title={"Danh sách vật tư KIT gộp chẵn"}
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">
                  {new Set(filteredData.flatMap(item => 
                    Array.isArray(item.issue_ord_no) ? item.issue_ord_no : [item.issue_ord_no]
                  )).size}
                </div>
                <div className="text-gray-600">
                  {showInsufficientOnly ? "KIT thiếu vật tư" : "Tổng số KIT"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">
                  {filteredData.length}
                </div>
                <div className="text-gray-600">
                  {showInsufficientOnly ? "Vật tư thiếu tồn kho" : "Tổng loại vật tư"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">
                  {filteredData.filter(item => (item.issued_qty || 0) >= (item.issue_qty || 0)).length}
                </div>
                <div className="text-gray-600">Đã hoàn thành</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-600">
                  {filteredData.filter(item => (item.issue_qty || 0) > (item.available_qty || 0)).length}
                </div>
                <div className="text-gray-600">Thiếu tồn kho</div>
              </div>
            </div>
        </div>
        {/* Issue Data Details Table */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold">
              
            </h4>
            <Checkbox
              checked={showInsufficientOnly}
              onChange={(e) => setShowInsufficientOnly(e.target.checked)}
              className="text-red-600"
            >
              <span className="text-red-600">Chỉ hiển thị vật tư không đủ tồn kho</span>
            </Checkbox>
          </div>
          {/*  */}
          <Spin spinning={loading}>
            <Table
              columns={issueDataColumns}
              dataSource={filteredData}
              rowKey="material_no"
              size="small"
              scroll={{ x: 800 }}
              rowClassName={(record) =>
                record.available_qty < record.issue_qty
                  ? "bg-red-100"
                  : "bg-green-100"
              }
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
