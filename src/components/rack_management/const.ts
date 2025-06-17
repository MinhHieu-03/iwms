import { ColumnsType } from "antd/es/table";

export interface RackDataType {
  _id: string;
  location_code: string;
  row: number;
  column: number;
  object_update: string;
  position: string;
  direction: string;
  status: string;
  warehouse: {
    _id: string;
    name: string;
  };
  area_config: {
    _id: string;
    name: string;
  };
  rcs: string;
  createdAt?: string;
  updatedAt?: string;
}

export const domain = {
  list: "/area/list",
  create: "/area",
  update: "/area",
  remove: "/area",
};

export const lang_key = "rack.management";

export const RenderCol = ({ t }: { t: (key: string) => string }): ColumnsType<RackDataType> => [
  {
    title: t("rack.location_code"),
    dataIndex: "location_code",
    key: "location_code",
    sorter: (a, b) => a.location_code.localeCompare(b.location_code),
    sortDirections: ['ascend', 'descend'],
  },
  // {
  //   title: t("rack.position"),
  //   dataIndex: "position",
  //   key: "position",
  //   render: (position: string) => t(`rack.position.${position.replace('-', '_')}`),
  // },
  // {
  //   title: t("rack.direction"),
  //   dataIndex: "direction",
  //   key: "direction",
  //   render: (direction: string) => t(`rack.direction.${direction}`),
  // },
  {
    title: t("rack.status"),
    dataIndex: "status",
    key: "status",
    render: (status: string) => t(`rack.status.${status}`),
    sorter: (a, b) => a.status.localeCompare(b.status),
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: t("rack.warehouse"),
    dataIndex: "warehouse",
    render: (warehouse: { _id: string; name: string }) => warehouse?.name || t("common.not_assigned"),
    key: "warehouse",
    sorter: (a, b) => (a.warehouse?.name || '').localeCompare(b.warehouse?.name || ''),
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: t("rack.area_config"),
    render: (record: RackDataType) => record.area_config?.name || t("common.not_assigned"),
    dataIndex: "area_config",
    key: "area_config",
    sorter: (a, b) => (a.area_config?.name || '').localeCompare(b.area_config?.name || ''),
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: t("common.row"),
    dataIndex: "row",
    key: "row",
    sorter: (a, b) => a.row - b.row,
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: t("common.column"),
    dataIndex: "column",
    key: "column",
    sorter: (a, b) => a.column - b.column,
    sortDirections: ['ascend', 'descend'],
  },
];
