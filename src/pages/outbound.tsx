import React, { useState } from "react";
import { Steps, Tabs } from "antd";
import Issue_time_schedule from "@/components/outbound";
import MissionList from "@/components/outbound/mission_list";
import OIOutbound from "@/components/outbound/oi_outbound";
import OutboundHeader from "@/components/OutboundHeader";

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
  const [current, setCurrent] = useState(0);
  const [selectedGate, setSelectedGate] = useState("gate1");

  const handleGateChange = (gate: string) => {
    setSelectedGate(gate);
    console.log("Gate changed to:", gate);
  };

  return (
    <div className="space-y-2">
      <OutboundHeader 
        selectedGate={selectedGate}
        onGateChange={handleGateChange}
        title="Quản lý xuất kho hàng chẵn"
      />
      <Tabs
        type="card"
        size="large"
        defaultActiveKey="1"
        className="site-navigation-steps full-width-tabs tall-tabs colorful-tabs"
        tabBarGutter={0}
        activeKey={current.toString()}
        items={[
          {
            key: "0",
            label: "OI Cấp & Xuất hàng chẵn",
          },
          {
            key: "1",
            label: "Danh sách Kit gộp chẵn",
          },
        ]}
        onChange={(key) => setCurrent(Number(key))}
      />
      {current === 0 ? (
        <Issue_time_schedule
          setCurrent={setCurrent}
          gate={selectedGate}
        />
      ) : null}
      {/* {current === 1 ? <OIOutbound /> : null} */}
      {current === 1 ? (
        <MissionList 
          gate={selectedGate} />
      ) : null}
    </div>
  );
};

export default OrdersTab;
