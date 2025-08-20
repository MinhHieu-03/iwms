import Dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import { Drawer, Table, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Search } from "lucide-react";
import PickingItemModal from "../PickingItemModal";
import { Button } from "antd";
import BasePagination from "@/components/ui/antd-pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dayjs from "dayjs";
import { t } from "i18next";
import ModalMergeKit from "./modal_merge_kit";
import ModalMission from "./modal_mission";

interface PickingItem {
  id: number;
  section_c?: string;
  line_c?: string;
  issord_no: string;
  issord_dtl_no: string;
  material_no: string;
  material_name: string;
  kit_no: string;
  unit: string;
  issue_qty: number;
  issued_qty?: number;
  inventory_qty: number;
  plan_dt?: string;
  inventory: {
    _id: string;
    sku: string;
    product_name: string;
    locationId: string;
    locationCode: string;
    store: Array<{
      key: string;
      qty: number;
    }>;
    status: string;
    available: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

interface PickingDrawerProps {
  missionData: any[]; // Replace with the actual type if available
  kitData: any[];
}

const PickingDrawer: React.FC<PickingDrawerProps> = ({
  missionData,
  kitData,
}) => {
  const [searchText, setSearchText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<PickingItem | null>(null);
  const [actionValue, setActionValue] = useState("");
  const skuRef = React.useRef(null);
  const [modalDetail, setModalDetail] = useState<{
    isOpenMission: boolean;
    isOpenMerge: boolean;
    data: any;
  }>({
    isOpenMission: false,
    isOpenMerge: false,
    data: null,
  });

  console.log("missionData", missionData);

  console.log("kitData", kitData);

  const pickingData =
    kitData.length > 0
      ? [
          {
            picking_no: kitData.map((item) => item.issue_ord_no).join("_"),
            issue_orders: kitData.map((item) => item.issue_ord_no),
            A_reqd_time: kitData.map((item) => item.A_reqd_time),
            plan_issue_dt: kitData.map((item) => item.plan_issue_dt),
            time_issue: kitData.map((item) => item.time_issue),
            status: "In Progress",
          },
        ]
      : [];

  const splitedData = missionData.reduce((acc: any[], record: any) => {
    const existingIndex = acc.findIndex(
      (item) =>
        item.line_c === record.line_c && item.material_no === record.material_no
    );
    if (existingIndex >= 0) {
      acc[existingIndex].issue_qty += record.issue_qty;
      if (!acc[existingIndex].kit_no.includes(record.kit_no)) {
        acc[existingIndex].kit_no = [
          ...(Array.isArray(acc[existingIndex].kit_no)
            ? acc[existingIndex].kit_no
            : [acc[existingIndex].kit_no]),
          record.kit_no,
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

  useEffect(() => {
    // console.log('dndd__', !selectedItem)
    if (!selectedItem) {
      skuRef.current?.focus();
      setTimeout(() => {
        skuRef.current?.focus();
      }, 500);
    }
  }, [selectedItem]);

  const onOpenModal = (record: any, type: "mission" | "merge") => {
    console.log("record", record);
    setModalDetail({
      isOpenMission: type === "mission",
      isOpenMerge: type === "merge",
      data: missionData.filter((item) =>
        record.issue_orders.includes(item.kit_no)
      ),
    });
  };

  const lang_key = "issue_time_schedule.table";

  // Define columns for the Ant Design table
  const columns: ColumnsType<any> = [
    {
      title: "Picking NO",
      dataIndex: "picking_no",
      key: "picking_no",
      width: 150,
    },
    {
      title: "Issue Orders",
      dataIndex: "issue_orders",
      key: "issue_orders",
      width: 120,
      render: (text) => (
        <div className="space-y-1">
          {text.map((item, index) => (
            <div key={index} className="text-sm">
              {item}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: t(`${lang_key}.required_time`),
      dataIndex: "A_reqd_time",
      key: "A_reqd_time",
      width: 150,
      render: (date) => (
        <div className="space-y-1">
          {date.map((item, index) => (
            <div key={index} className="text-sm">
              {dayjs(item).format("YYYY-MM-DD HH:mm")}
            </div>
          ))}
        </div>
      ),
      sorter: (a, b) =>
        dayjs(a.A_reqd_time).unix() - dayjs(b.A_reqd_time).unix(),
    },
    {
      title: t(`${lang_key}.plan_issue_date`),
      dataIndex: "plan_issue_dt",
      key: "plan_issue_dt",
      width: 150,
      render: (date) => (
        <div className="space-y-1">
          {date.map((item, index) => (
            <div key={index} className="text-sm">
              {dayjs(item).format("YYYY-MM-DD HH:mm")}
            </div>
          ))}
        </div>
      ),
      sorter: (a, b) =>
        dayjs(a.plan_issue_dt).unix() - dayjs(b.plan_issue_dt).unix(),
    },
    {
      title: t(`${lang_key}.issue_time`),
      dataIndex: "time_issue",
      key: "time_issue",
      width: 150,
      render: (date) => (
        <div className="space-y-1">
          {date.map((item, index) => (
            <div key={index} className="text-sm">
              {dayjs(item).format("YYYY-MM-DD HH:mm")}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            status === "fill"
              ? "bg-green-100 text-green-800"
              : status === "empty"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {status === "fill"
            ? "Đầy"
            : status === "empty"
            ? "Trống"
            : "Đang xử lí"}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "issord_dtl_no",
      key: "issord_dtl_no",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Button
            type="primary"
            size="small"
            onClick={() => onOpenModal(record, "merge")}
          >
            Kit Merge
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => onOpenModal(record, "mission")}
          >
            Mission
          </Button>
        </div>
      ),
      width: 100,
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">Danh sách nhiệm vụ</div>
            {/* <div className="flex gap-2">
              <Button
                onClick={orderPicking}
                className="gap-2"
                disabled={selectedRowKeys.length === 0}
                size="sm"
              >
                <Plus className="h-4 w-4" />
                Tạo lệnh xuất hàng
              </Button>
              <Button
                onClick={requestDataList}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <ReloadOutlined className="h-4 w-4" />
                {t("btn.refresh")}
              </Button>
            </div> */}
          </CardTitle>
        </CardHeader>
        {/* <h3 className="text-lg font-semibold">Danh sách vật phẩm cần lấy</h3> */}
        <Input
          autoFocus
          ref={skuRef}
          value={inputValue}
          placeholder="Tìm kiếm theo SKU, tên sản phẩm, vị trí, mã vật liệu, số lệnh xuất..."
          prefix={<Search className="h-4 w-4 text-gray-400" />}
          onChange={(e) => {
            const value = e.target.value.trim();
            setInputValue(value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchText(inputValue.trim());
              setInputValue("");
              if (inputValue && "speechSynthesis" in window) {
                const utterance = new SpeechSynthesisUtterance(`OK`);
                utterance.rate = 0.9;
                utterance.volume = 0.5;
                speechSynthesis.speak(utterance);
              }
            }
          }}
          style={{ marginBottom: 16 }}
        />
        <Table
          columns={columns}
          dataSource={pickingData}
          rowKey="issord_dtl_no"
          pagination={false}
          size="middle"
          onRow={(record) => ({
            onClick: () => {
              setSelectedItem(record);
              setActionValue("");
            },
          })}
        />
      </Card>

      <ModalMission
        isOpen={modalDetail.isOpenMission}
        onCancel={() =>
          setModalDetail((prev) => ({ ...prev, isOpenMission: false }))
        }
        data={modalDetail.data}
      />

      <ModalMergeKit
        isOpen={modalDetail.isOpenMerge}
        onCancel={() =>
          setModalDetail((prev) => ({ ...prev, isOpenMerge: false }))
        }
        data={modalDetail.data}
      />
    </div>
  );
};

export default PickingDrawer;
export type { PickingItem, PickingDrawerProps };
