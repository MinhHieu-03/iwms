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
}

const defaultData: PickingItem[] = [
  {
    id: 17,
    material_no: "19004803                  ",
    issord_no: "KANB1101",
    issord_dtl_no: "T974628",
    issue_qty: 1000,
    inventory_qty: 14000,
    inventory: {
      _id: "68678a1cef7da51a1db6f05b",
      sku: "19004803",
      product_name: "test",
      locationId: "68678a1625a739200aa35f5a",
      locationCode: "A-02/02-02",
      store: [
        {
          key: "Carton",
          qty: 1,
        },
        {
          key: "Bag",
          qty: 14,
        },
        {
          key: "Item",
          qty: 14000,
        },
      ],
      status: "fill",
      available: 14000,
      createdAt: "2025-07-04T08:00:28.128Z",
      updatedAt: "2025-07-04T08:03:50.690Z",
      __v: 0,
    },
  },
];

const PickingDrawer: React.FC<PickingDrawerProps> = ({
  missionData,
}) => {
  const [searchText, setSearchText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<PickingItem | null>(null);
  const [actionValue, setActionValue] = useState("");
  const skuRef = React.useRef(null);

  const filteredData = useMemo(() => {
    const listVal = defaultData.filter(
      (item) =>
        item.material_no.toLowerCase().includes(searchText.toLowerCase()) ||
        item.issord_no.toLowerCase().includes(searchText.toLowerCase()) ||
        item.issord_dtl_no.toLowerCase().includes(searchText.toLowerCase()) ||
        item.inventory.sku.toLowerCase().includes(searchText.toLowerCase()) ||
        item.inventory.product_name
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        item.inventory.locationCode
          .toLowerCase()
          .includes(searchText.toLowerCase())
    );

    if (searchText && listVal.length > 0) {
      setTimeout(() => {
        setSelectedItem(listVal[0]);
        setSearchText("");
        setInputValue("");
      }, 500);
    }

    return listVal;
  }, [searchText, defaultData]);

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
            <div className="flex items-center gap-2">
              Danh sách nhiệm vụ
            </div>
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
        dataSource={missionData}
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
    title: "SKU",
    dataIndex: ["inventory", "sku"],
    key: "sku",
    width: 120,
  },
  {
    title: "Tên sản phẩm",
    dataIndex: ["inventory", "product_name"],
    key: "product_name",
    width: 150,
  },
  {
    title: "Vị trí",
    dataIndex: ["inventory", "locationCode"],
    key: "locationCode",
    width: 120,
  },
  {
    title: "Mã vật tư",
    dataIndex: "material_no",
    key: "material_no",
    render: (text) => text?.trim(),
    width: 150,
  },
  {
    title: "Mã KIT",
    dataIndex: "issord_no",
    key: "issord_no",
    width: 120,
  },
  {
    title: "Mã KIT dtl",
    dataIndex: "issord_dtl_no",
    key: "issord_dtl_no",
    width: 120,
  },
  {
    title: "Số lượng yêu cầu",
    dataIndex: "issue_qty",
    key: "issue_qty",
    width: 130,
  },
  {
    title: "Số lượng tồn kho",
    dataIndex: "inventory_qty",
    key: "inventory_qty",
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
  {
    title: "Trạng thái",
    dataIndex: ["inventory", "status"],
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
        {status === "fill" ? "Đầy" : status === "empty" ? "Trống" : status}
      </span>
    ),
  },
  {
    title: "Số lượng có sẵn",
    dataIndex: ["inventory", "available"],
    key: "available",
    width: 140,
    render: (text) => text?.toLocaleString(),
  },
];
export default PickingDrawer;
export type { PickingItem, PickingDrawerProps };
