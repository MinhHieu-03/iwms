import Dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import { Drawer, Table, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Search } from "lucide-react";
import PickingItemModal from "../PickingItemModal";
import { Button } from "@/components/ui/button";
import BasePagination from "@/components/ui/antd-pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PickingItem {
  id: number;
  section_c?: string;
  line_c?: string;
  issord_no: string;
  issord_dtl_no: string;
  material_no: string;
  material_name: string;
  kit_no: string | string[];
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
  open: boolean;
  missionData: any[]; // Replace with the actual type if available
  onClose: () => void;
  data?: PickingItem[];
  type?: any;
}

const PickingDrawer: React.FC<PickingDrawerProps> = ({
  open,
  missionData,
  type,
}) => {
  const [searchText, setSearchText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<PickingItem | null>(null);
  const [actionValue, setActionValue] = useState("");
  const skuRef = React.useRef(null);

  const mergeData = missionData.reduce((acc: any[], record: any) => {
    const existingIndex = acc.findIndex(
      (item) => item.material_no === record.material_no
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
    if (!open) {
      setSearchText("");
      setInputValue("");
      setSelectedItem(null);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      // Focus on the SKU input when the drawer opens
      skuRef.current?.focus();
      setTimeout(() => {
        skuRef.current?.focus();
      }, 500);
    }
  }, [open]);
  useEffect(() => {
    // console.log('dndd__', !selectedItem)
    if (!selectedItem) {
      skuRef.current?.focus();
      setTimeout(() => {
        skuRef.current?.focus();
      }, 500);
    }
  }, [selectedItem]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">Danh sách gộp vật tư</div>
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
          dataSource={mergeData}
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
    </div>
  );
};

// Define columns for the Ant Design table
const columns: ColumnsType<PickingItem> = [
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
    dataIndex: "kit_no",
    key: "kit_no",
    render: (text: string | string[]) => {
      console.log("text", text);

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
  // {
  //   title: "Trạng thái",
  //   dataIndex: ["inventory", "status"],
  //   key: "status",
  //   width: 100,
  //   render: (status) => (
  //     <span
  //       className={`px-2 py-1 rounded text-xs font-medium ${
  //         status === "fill"
  //           ? "bg-green-100 text-green-800"
  //           : status === "empty"
  //           ? "bg-red-100 text-red-800"
  //           : "bg-yellow-100 text-yellow-800"
  //       }`}
  //     >
  //       {status === "fill" ? "Đầy" : status === "empty" ? "Trống" : status}
  //     </span>
  //   ),
  // },
  // {
  //   title: "Số lượng có sẵn",
  //   dataIndex: ["inventory", "available"],
  //   key: "available",
  //   width: 140,
  //   render: (text) => text?.toLocaleString(),
  // },
];
export default PickingDrawer;
export type { PickingItem, PickingDrawerProps };
