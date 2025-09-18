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
  onDetail,
}: {
  t: (key: string) => string;
  // onEdit: (record: IssueTimeScheduleDataType) => void;
  // onDelete: (id: string) => void;
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
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    width: 60,
    render: (status) => mappingStatusTag[status] || mappingStatusTag['new'],
  },

  {
    title: "Loại Kit",
    dataIndex: "type",
    key: "type",
    width: 50,
    render: (type) =>
      type ? (
        <Tag color="red">Kit đề nghị</Tag>
      ) : (
        <Tag color="blue">{"Kit thường"}</Tag>
      ),
  },
  // {
  //   title: t(`${lang_key}.section`),
  //   dataIndex: "section_c",
  //   key: "section_c",
  //   width: 60,
  //   sorter: (a, b) => a.section_c.localeCompare(b.section_c),
  // },
  // {
  //   title: t(`${lang_key}.line`),
  //   dataIndex: "line_c",
  //   key: "line_c",
  //   width: 60,
  // },
  {
    title: t(`${lang_key}.issue_time`),
    dataIndex: "time_issue",
    key: "time_issue",
    width: 110,
    render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm"),
  },
  {
    title: t(`${lang_key}.required_time`),
    dataIndex: "A_reqd_time",
    key: "A_reqd_time",
    width: 150,
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

const mappingStatusTag = {
  new: <Tag color="blue">Mới</Tag>,
  "in progress": <Tag color="red">Đang xuất</Tag>,
  fill: <Tag color="green">Đã xuất</Tag>,
};
