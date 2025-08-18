import React, { useState } from "react";
import { Steps } from "antd";
import Issue_time_schedule from "@/components/issue_time_schedule";
import MergeKitTable from "@/components/issue_time_schedule/merge_kit";
import MissionList from "@/components/issue_time_schedule/mission_list";
import OIOutbound from "@/components/issue_time_schedule/oi_outbound";

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
  const onChange = (value: number) => {
    setCurrent(value);
  };

  const [dataMerge, setDataMerge] = useState([]);
  return (
    <div className="space-y-6">
      <Steps
        type="navigation"
        // size=""
        current={current}
        onChange={onChange}
        className="site-navigation-steps"
        items={[
          {
            title: "Danh sách Kit",
            // subTitle: "00:00:05",
            // status: 'finish',
            description: "Quản lý kit vật tư.",
          },
          {
            title: "Danh sách gộp vật tư",
            // subTitle: "00:01:02",
            // status: 'process',
            description: "Quản lý danh sách gộp vật tư.",
          },
          {
            title: "Mission",
            // subTitle: "waiting for longlong time",
            // status: 'wait',
            description: "Quản lý nhiệm vụ robot",
          },
          {
            title: "Step 3",
            subTitle: "waiting for longlong time",
            // status: 'wait',
            description: "This is a description.",
          },
        ]}
      />
      {current === 0 ? <Issue_time_schedule setCurrent={setCurrent} setDataMerge={setDataMerge} />: null}
      {current === 1 ? <MergeKitTable missionData={dataMerge} />: null}
      {current === 2 ? <MissionList missionData={dataMerge} />: null}
      {current === 3 ? <OIOutbound />: null}
    </div>
  );
};

export default OrdersTab;
