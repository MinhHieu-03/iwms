import { ColumnsType } from "antd/es/table";
import { Button, Popconfirm, Tag } from "antd";
import dayjs from "dayjs";

export interface IssueTimeScheduleDataType {
  _id?: string;
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

export const domain = {
  list: "/issue-time-schedule/list",
  create: "/issue-time-schedule",
  update: "/issue-time-schedule",
  remove: "/issue-time-schedule",
  detail: "/issue-time-schedule",
};

export const lang_key = "issue_time_schedule.table";

export const RenderCol = ({ 
  t, 
  onEdit,
  onDelete,
  onDetail
}: { 
  t: (key: string) => string;
  onEdit: (record: IssueTimeScheduleDataType) => void;
  onDelete: (id: string) => void;
  onDetail: (record: IssueTimeScheduleDataType) => void;
}): ColumnsType<IssueTimeScheduleDataType> => [
  {
    title: t(`${lang_key}.section`),
    dataIndex: "section_c",
    key: "section_c",
    width: 100,
    sorter: (a, b) => a.section_c.localeCompare(b.section_c),
  },
  {
    title: t(`${lang_key}.factory`),
    dataIndex: "fact_c",
    key: "fact_c",
    width: 100,
  },
  {
    title: t(`${lang_key}.line`),
    dataIndex: "line_c",
    key: "line_c",
    width: 100,
  },
  {
    title: t(`${lang_key}.product_no`),
    dataIndex: "prod_no",
    key: "prod_no",
    width: 120,
  },
  // {
  //   title: t(`${lang_key}.customer_desc_1`),
  //   dataIndex: "cusdesch_cd1",
  //   key: "cusdesch_cd1",
  //   width: 120,
  // },
  // {
  //   title: t(`${lang_key}.customer_desc_2`),
  //   dataIndex: "cusdesch_cd2",
  //   key: "cusdesch_cd2",
  //   width: 120,
  // },
  // {
  //   title: t(`${lang_key}.internal_desc`),
  //   dataIndex: "intdesch_cd",
  //   key: "intdesch_cd",
  //   width: 120,
  // },
  {
    title: t(`${lang_key}.issue_order_no`),
    dataIndex: "issue_ord_no",
    key: "issue_ord_no",
    width: 150,
    render: (text) => <span className="font-medium text-blue-600">{text}</span>,
  },
  {
    title: t(`${lang_key}.plan_issue_date`),
    dataIndex: "plan_issue_dt",
    key: "plan_issue_dt",
    width: 150,
    render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm"),
    sorter: (a, b) => dayjs(a.plan_issue_dt).unix() - dayjs(b.plan_issue_dt).unix(),
  },
  {
    title: t(`${lang_key}.required_time`),
    dataIndex: "A_reqd_time",
    key: "A_reqd_time",
    width: 150,
    render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm"),
  },
  {
    title: t(`${lang_key}.issue_time`),
    dataIndex: "time_issue",
    key: "time_issue",
    width: 150,
    render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm"),
  },
  // {
  //   title: t(`${lang_key}.user_id`),
  //   dataIndex: "userid",
  //   key: "userid",
  //   width: 100,
  // },
  // {
  //   title: t(`${lang_key}.entry_date`),
  //   dataIndex: "ent_dt",
  //   key: "ent_dt",
  //   width: 150,
  //   render: (date) => dayjs(date).format("YYYY-MM-DD"),
  // },
  // {
  //   title: t(`${lang_key}.update_date`),
  //   dataIndex: "upd_dt",
  //   key: "upd_dt",
  //   width: 150,
  //   render: (date) => dayjs(date).format("YYYY-MM-DD"),
  // },
  {
    title: t("common.action"),
    key: "action",
    fixed: "right",
    width: 150,
    render: (_, record) => (
      <div className="flex gap-2">
        <Button
          type="primary"
          size="small"
          onClick={() => onDetail(record)}
        >
          {t("common.detail")}
        </Button>
        {/* <Button
          type="default"
          size="small"
          onClick={() => onEdit(record)}
        >
          {t("common.edit")}
        </Button> */}
        {/* <Popconfirm
          title={t("common.confirm_delete")}
          onConfirm={() => onDelete(record._id || record.key)}
          okText={t("common.yes")}
          cancelText={t("common.no")}
        >
          <Button type="primary" danger size="small">
            {t("common.delete")}
          </Button>
        </Popconfirm> */}
      </div>
    ),
  },
];

// Mock data for development/testing
export const mockData: IssueTimeScheduleDataType[] = [
  {
    key: "1",
    _id: "1",
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
    upd_dt: "2025-06-10T17:00:00.000Z"
  },
  {
    key: "2",
    _id: "2",
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
    upd_dt: "2025-06-11T17:00:00.000Z"
  },
  {
    key: "3",
    _id: "3",
    section_c: "9857",
    fact_c: "ASY3",
    line_c: "ASY3",
    prod_no: "Premium",
    cusdesch_cd1: "02",
    cusdesch_cd2: "02",
    intdesch_cd: "04",
    issue_ord_no: "KANB1103",
    plan_issue_dt: "2025-06-12T17:00:00.000Z",
    A_reqd_time: "2025-06-12T09:00:00.000Z",
    time_issue: "2025-06-12T06:00:00.000Z",
    userid: "Admin",
    ent_dt: "2025-06-12T17:00:00.000Z",
    upd_dt: "2025-06-12T17:00:00.000Z"
  }
];
