import Dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import { Drawer, Table, Input, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Search } from "lucide-react";
import PickingItemModal from "../PickingItemModal";

interface PickingItem {
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

interface PickingDrawerProps {
  open: boolean;
  onClose: () => void;
  data?: PickingItem[];
}

const defaultData: PickingItem[] = [
 {
      "id": 1,
      "section_c": "2671",
      "line_c": "SUBC",
      "issord_no": "KANB1101",
      "issord_dtl_no": "T011757",
      "material_no": "62730380                  ",
      "issue_qty": 200,
      "issued_qty": 200,
      "plan_dt": "2025-06-10T17:00:00.000Z",
    },
    {
      "id": 2,
      "section_c": "9855",
      "line_c": "ASY1",
      "issord_no": "KANB1101",
      "issord_dtl_no": "T974613",
      "material_no": "60988854                  ",
      "issue_qty": 1000,
      "issued_qty": 1000,
      "plan_dt": "2025-06-10T17:00:00.000Z",
    },
    {
      "id": 3,
      "section_c": "9855",
      "line_c": "ASY1",
      "issord_no": "KANB1101",
      "issord_dtl_no": "T974614",
      "material_no": "60988953                  ",
      "issue_qty": 700,
      "issued_qty": 700,
      "plan_dt": "2025-06-10T17:00:00.000Z",
    },
    {
      "id": 4,
      "section_c": "9855",
      "line_c": "ASY1",
      "issord_no": "KANB1101",
      "issord_dtl_no": "T974615",
      "material_no": "13107026                  ",
      "issue_qty": 300,
      "issued_qty": 300,
      "plan_dt": "2025-06-10T17:00:00.000Z",
    },
    {
      "id": 5,
      "section_c": "9855",
      "line_c": "ASY1",
      "issord_no": "KANB1101",
      "issord_dtl_no": "T974616",
      "material_no": "65206995                  ",
      "issue_qty": 400,
      "issued_qty": 400,
      "plan_dt": "2025-06-10T17:00:00.000Z",
    },
    {
      "id": 6,
      "section_c": "9855",
      "line_c": "ASY1",
      "issord_no": "KANB1101",
      "issord_dtl_no": "T974617",
      "material_no": "13107021                  ",
      "issue_qty": 400,
      "issued_qty": 400,
      "plan_dt": "2025-06-10T17:00:00.000Z",
    },
    {
      "id": 7,
      "section_c": "9855",
      "line_c": "ASY1",
      "issord_no": "KANB1101",
      "issord_dtl_no": "T974618",
      "material_no": "69228992                  ",
      "issue_qty": 300,
      "issued_qty": 300,
      "plan_dt": "2025-06-10T17:00:00.000Z",
    },
];

const PickingDrawer: React.FC<PickingDrawerProps> = ({
  open,
  onClose,
  data = [],
}) => {
  const [searchText, setSearchText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<PickingItem | null>(null);
  const [actionValue, setActionValue] = useState("");
  const skuRef = React.useRef(null);

  const filteredData = useMemo(() => {
    const listVal = defaultData.filter((item) =>
      item.material_no.toLowerCase().includes(searchText.toLowerCase()) ||
      item.issord_no.toLowerCase().includes(searchText.toLowerCase()) ||
      item.issord_dtl_no.toLowerCase().includes(searchText.toLowerCase())
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
    <>
      <Drawer
        title="Yêu cầu cấp vật tư"
        placement="bottom"
        height={"90vh"}
        onClose={onClose}
        open={open}
        zIndex={100}
      >
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Danh sách vật phẩm cần lấy</h3>
          <Input
            autoFocus
            ref={skuRef}
            value={inputValue}
            placeholder="Tìm kiếm theo mã vật liệu, số lệnh xuất hoặc số chi tiết..."
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
            dataSource={filteredData}
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
        </div>
      </Drawer>

      <PickingItemModal
        selectedItem={selectedItem}
        onClose={() => {
          setSelectedItem(null);
          setActionValue("");
        }}
        actionValue={actionValue}
        setActionValue={setActionValue}
      />
    </>
  );
};

// Define columns for the Ant Design table
const columns: ColumnsType<PickingItem> = [
  {
    title: "Mã vật tư",
    dataIndex: "material_no",
    key: "material_no",
    render: (text) => text?.trim(),
  },
  {
    title: "Mã KIT",
    dataIndex: "issord_no",
    key: "issord_no",
  },
  {
    title: "Mã KIT dtl",
    dataIndex: "issord_dtl_no",
    key: "issord_dtl_no",
  },
  {
    title: "Phân loại",
    dataIndex: "section_c",
    key: "section_c",
    width: 100,
  },
  {
    title: "Dây chuyền",
    dataIndex: "line_c",
    key: "line_c",
    width: 100,
  },
  {
    title: "Số lượng yêu cầu",
    dataIndex: "issue_qty",
    key: "issue_qty",
    width: 150,
  },
  {
    title: "Số lượng đã xuất",
    dataIndex: "issued_qty",
    key: "issued_qty",
    width: 150,
    render: (text, record) => (
      <span className={record.issued_qty < record.issue_qty ? "text-orange-500" : "text-green-600"}>
        {text}
      </span>
    ),
  },
  {
    title: "Thời gian kế hoạch",
    dataIndex: "plan_dt",
    key: "plan_dt",
    render: (text) => Dayjs(text).format("YYYY-MM-DD HH:mm"),
  },
];
export default PickingDrawer;
export type { PickingItem, PickingDrawerProps };
