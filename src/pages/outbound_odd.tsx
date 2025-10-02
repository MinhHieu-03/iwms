import Issue_time_schedule from "@/components/outbound_odd";
import MissionList from "@/components/outbound_odd/mission_list";
import OutboundHeader from "@/components/OutboundHeader";
import { Tabs } from "antd";
import React, { useState } from "react";

const OrdersTab: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [selectedGate, setSelectedGate] = useState("gate1");

  const handleGateChange = (gate: string) => {
    setSelectedGate(gate);
  };

  return (
    <div className="space-y-2">
      <OutboundHeader
        selectedGate={selectedGate}
        onGateChange={handleGateChange}
        title="Quản lý xuất kho hàng lẻ"
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
            label: "OI Cấp & Xuất hàng lẻ",
          },
          {
            key: "1",
            label: "Danh sách Kit gộp lẻ",
          },
        ]}
        onChange={(key) => setCurrent(Number(key))}
      />
      {current === 0 ? (
        <Issue_time_schedule setCurrent={setCurrent} gate={selectedGate} />
      ) : null}
      {/* {current === 1 ? <OIOutbound /> : null} */}
      {current === 1 ? <MissionList gate={selectedGate} /> : null}
    </div>
  );
};

export default OrdersTab;
