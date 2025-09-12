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
  status: string;
}

export const domain = {
  list: "/issue-time-schedule/list",
  create: "/issue-time-schedule",
  update: "/issue-time-schedule",
  remove: "/issue-time-schedule",
  detail: "/issue-time-schedule",
  merge_kit: "/kit-merger",
};

export const lang_key = "issue_time_schedule.table";

export const RenderCol = ({
  t,
  onEdit,
  onDelete,
  onDetail,
}: {
  t: (key: string) => string;
  onEdit: (record: IssueTimeScheduleDataType) => void;
  onDelete: (id: string) => void;
  onDetail: (record: IssueTimeScheduleDataType) => void;
}): ColumnsType<IssueTimeScheduleDataType> => [
  {
    title: t(`${lang_key}.issue_order_no`),
    dataIndex: "issue_ord_no",
    key: "issue_ord_no",
    width: 60,
    render: (text) => <span className="font-medium text-blue-600">{text}</span>,
  },
  {
    title: t(`${lang_key}.status`),
    dataIndex: "status",
    key: "status",
    width: 60,
    render: (status) => (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          status === "fill"
            ? "bg-green-100 text-green-800"
            : status === "in progress"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {status === "fill"
          ? "Đã xuất"
          : status === "in progress"
          ? "Đang xuất"
          : "Mới"}
      </span>
    ),
  },
  {
    title: t(`${lang_key}.section`),
    dataIndex: "section_c",
    key: "section_c",
    width: 60,
    sorter: (a, b) => a.section_c.localeCompare(b.section_c),
  },
  {
    title: t(`${lang_key}.line`),
    dataIndex: "line_c",
    key: "line_c",
    width: 60,
  },
  {
    title: t(`${lang_key}.issue_time`),
    dataIndex: "time_issue",
    key: "time_issue",
    width: 100,
    render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm"),
  },
  {
    title: t(`${lang_key}.required_time`),
    dataIndex: "A_reqd_time",
    key: "A_reqd_time",
    width: 100,
    render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm"),
    sorter: (a, b) => dayjs(a.A_reqd_time).unix() - dayjs(b.A_reqd_time).unix(),
  },
  {
    title: t(`${lang_key}.plan_issue_date`),
    dataIndex: "plan_issue_dt",
    key: "plan_issue_dt",
    width: 100,
    render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm"),
    sorter: (a, b) =>
      dayjs(a.plan_issue_dt).unix() - dayjs(b.plan_issue_dt).unix(),
  },
  {
    title: t("common.action"),
    key: "action",
    fixed: "right",
    width: 80,
    render: (_, record) => (
      <div className="flex items-center justify-center gap-2">
        <Button type="primary" size="small" onClick={() => onDetail(record)}>
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
