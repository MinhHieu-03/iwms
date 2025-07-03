import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Package, Play, Search } from "lucide-react";
import PickingDrawer from "@/components/issue_time_schedule/PickingDrawer";
import { Input, Table as AntTable } from "antd";
import type { ColumnsType } from "antd/es/table";
import Issue_time_schedule from "@/components/issue_time_schedule";

// Data interface for the new format
interface OutboundData {
  key: string;
  section_c: string;
  fact_c: string;
  line_c: string;
  prod_no: string;
  cusdesch_cd1: string;
  cusdesch_cd2: string;
  intdesch_cd: string;
  issue_ord_no: string;
  plan_issue_dt: string;
  A_reqd_time: string;
  time_issue: string;
  userid: string;
  ent_dt: string;
  upd_dt: string;
}

// Mock data with the specified format
const mockOutboundData: OutboundData[] = [
  {
    key: "1",
    section_c: "9855",
    fact_c: "ASY1",
    line_c: "ASY1",
    prod_no: "Common",
    cusdesch_cd1: "00",
    cusdesch_cd2: "00",
    intdesch_cd: "02",
    issue_ord_no: "KANB1101",
    plan_issue_dt: "2025-06-10T17:00:00.000Z",
    A_reqd_time: "2025-06-10T09:00:00.000Z",
    time_issue: "2025-06-10T06:00:00.000Z",
    userid: "Job",
    ent_dt: "2025-06-10T17:00:00.000Z",
    upd_dt: "2025-06-10T17:00:00.000Z",
  },
  {
    key: "2",
    section_c: "9856",
    fact_c: "ASY2",
    line_c: "ASY2",
    prod_no: "Common",
    cusdesch_cd1: "01",
    cusdesch_cd2: "01",
    intdesch_cd: "03",
    issue_ord_no: "KANB1102",
    plan_issue_dt: "2025-06-11T17:00:00.000Z",
    A_reqd_time: "2025-06-11T09:00:00.000Z",
    time_issue: "2025-06-11T06:00:00.000Z",
    userid: "Job",
    ent_dt: "2025-06-11T17:00:00.000Z",
    upd_dt: "2025-06-11T17:00:00.000Z",
  },
];

const OrdersTab: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [showPickingModal, setShowPickingModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Filter data based on search text
  const filteredData = mockOutboundData.filter(
    (item) =>
      item.issue_ord_no.toLowerCase().includes(searchText.toLowerCase()) ||
      item.section_c.toLowerCase().includes(searchText.toLowerCase()) ||
      item.fact_c.toLowerCase().includes(searchText.toLowerCase())
  );

  // Define columns for Ant Design Table
  const columns: ColumnsType<OutboundData> = [
    {
      title: "Section",
      dataIndex: "section_c",
      key: "section_c",
      width: 100,
      sorter: (a, b) => a.section_c.localeCompare(b.section_c),
    },
    {
      title: "Factory",
      dataIndex: "fact_c",
      key: "fact_c",
      width: 100,
    },
    {
      title: "Line",
      dataIndex: "line_c",
      key: "line_c",
      width: 100,
    },
    {
      title: "Product No.",
      dataIndex: "prod_no",
      key: "prod_no",
      width: 120,
    },
    {
      title: "Customer Desc 1",
      dataIndex: "cusdesch_cd1",
      key: "cusdesch_cd1",
      width: 120,
    },
    {
      title: "Customer Desc 2",
      dataIndex: "cusdesch_cd2",
      key: "cusdesch_cd2",
      width: 120,
    },
    {
      title: "Internal Desc",
      dataIndex: "intdesch_cd",
      key: "intdesch_cd",
      width: 120,
    },
    {
      title: "Issue Order No.",
      dataIndex: "issue_ord_no",
      key: "issue_ord_no",
      width: 150,
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Plan Issue Date",
      dataIndex: "plan_issue_dt",
      key: "plan_issue_dt",
      width: 150,
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) =>
        new Date(a.plan_issue_dt).getTime() -
        new Date(b.plan_issue_dt).getTime(),
    },
    {
      title: "Required Time",
      dataIndex: "A_reqd_time",
      key: "A_reqd_time",
      width: 150,
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Issue Time",
      dataIndex: "time_issue",
      key: "time_issue",
      width: 150,
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "User ID",
      dataIndex: "userid",
      key: "userid",
      width: 100,
    },
    {
      title: "Entry Date",
      dataIndex: "ent_dt",
      key: "ent_dt",
      width: 150,
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Update Date",
      dataIndex: "upd_dt",
      key: "upd_dt",
      width: 150,
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  // Row selection configuration
  const rowSelection = {
    selectedRowKeys: selectedOrders,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedOrders(selectedRowKeys as string[]);
    },
    onSelectAll: (
      selected: boolean,
      selectedRows: OutboundData[],
      changeRows: OutboundData[]
    ) => {
      if (selected) {
        setSelectedOrders(filteredData.map((item) => item.key));
      } else {
        setSelectedOrders([]);
      }
    },
  };

  const handleStartPicking = () => {
    if (selectedOrders.length === 0) {
      toast({
        title: "No Orders Selected",
        description: "Please select at least one order to start picking",
        variant: "destructive",
      });
      return;
    }
    setShowPickingModal(true);

    toast({
      title: "Picking Started",
      description: `Started picking for ${selectedOrders.length} order(s)`,
    });
    setSelectedOrders([]);
  };

  const handleStartPacking = () => {
    if (selectedOrders.length === 0) {
      toast({
        title: "No Orders Selected",
        description: "Please select at least one order to start packing",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Packing Started",
      description: `Started packing for ${selectedOrders.length} order(s)`,
    });
    setSelectedOrders([]);
  };

  const handleOrderClick = (record: OutboundData) => {
    // Handle row click - you can navigate or perform other actions
    console.log("Clicked row:", record);
  };

  return (
    <div className="space-y-6">
      <Issue_time_schedule />
      <PickingDrawer
        open={showPickingModal}
        onClose={() => setShowPickingModal(false)}
      />
    </div>
  );
};

export default OrdersTab;
