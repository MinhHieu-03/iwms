import { ColumnsType } from "antd/es/table";
import { Tag, Tooltip, Select, Button, Space, message } from "antd";
import dayjs from "dayjs";

export enum MISSION_STATE {
  NEW = "new",
  PROCESSING = "processing",
  DONE = "done",
  ERROR = "error",
  DONE_PICKING = "done_picking",
  DONE_PICKING_SPLIT = "done_picking_split",
}

export enum MISSION_TYPE {
  INBOUND = "inbound",
  OUTBOUND = "outbound",
  INTERNAL = "internal",
  BACK_WHS = "back_to_whs",
  TRANSFER_GATE = "transfer_gate",
}

export interface MissionInventory {
  material_no?: string;
  qty?: number;
  qty_available?: number;
}

export interface StatusItem {
  status: string;
  updateAt: Date;
}

export interface MissionDataType {
  _id: string;
  mission_code?: string;
  robot_code?: string;
  origin?: string;
  destination?: string;
  description?: string;
  bin_id?: string;
  inventory?: MissionInventory;
  inventory_id?: string | null;
  kit_merger?: string;
  state?: MISSION_STATE;
  status_list: StatusItem[];
  type: MISSION_TYPE;
  ETA?: number;
  createdAt: string;
  updatedAt: string;
}

export const domain = {
  list: "/mission/list",
  create: "/mission",
  update: "/mission",
  remove: "/mission",
  detail: "/mission",
  updateStatus: "/mission/status", // New endpoint for status updates
};

// Helper function to get status color and text
export const getStatusDisplay = (
  state: MISSION_STATE,
  t: (key: string) => string
): { text: string; color: string } => {
  const stateMap: Record<string, { text: string; color: string }> = {
    new: { text: t("mission.state.new"), color: "default" },
    processing: { text: t("mission.state.processing"), color: "processing" },
    done: { text: t("mission.state.done"), color: "success" },
    error: { text: t("mission.state.error"), color: "error" },
    done_picking: { text: t("mission.state.done_picking"), color: "green" },
  };

  return stateMap[state || 'new'] || {
    text: t("mission.state.unknown"),
    color: "default",
  };
};

// Get available status transitions based on current state
export const getAvailableStatusTransitions = (currentState: MISSION_STATE): MISSION_STATE[] => {
  const transitions: Record<MISSION_STATE, MISSION_STATE[]> = {
    [MISSION_STATE.NEW]: [MISSION_STATE.PROCESSING, MISSION_STATE.ERROR],
    [MISSION_STATE.PROCESSING]: [MISSION_STATE.DONE_PICKING, MISSION_STATE.DONE, MISSION_STATE.ERROR],
    [MISSION_STATE.DONE_PICKING]: [MISSION_STATE.DONE, MISSION_STATE.ERROR],
    [MISSION_STATE.DONE_PICKING_SPLIT]: [MISSION_STATE.DONE, MISSION_STATE.ERROR],

    [MISSION_STATE.ERROR]: [MISSION_STATE.NEW, MISSION_STATE.PROCESSING],
    [MISSION_STATE.DONE]: [], // Terminal state - no transitions allowed
  };

  return transitions[currentState] || Object.values(MISSION_STATE);
};

export const lang_key = "mission.table";

// Status update handler interface
export interface StatusUpdateHandler {
  (missionId: string, newStatus: MISSION_STATE): Promise<void>;
}

export const RenderCol = ({
  t,
  onStatusUpdate,
}: {
  t: (key: string) => string;
  onStatusUpdate?: StatusUpdateHandler;
}): ColumnsType<MissionDataType> => [
  {
    title: t("mission.mission_code"),
    dataIndex: "_id",
    key: "_id",
    width: 150,
    fixed: "left",
  },
  {
    title: t("mission.robot_code"),
    dataIndex: "robot_code",
    key: "robot_code",
    width: 120,
    render: (text: string) => text || "-",
  },
  {
    title: t("mission.origin"),
    dataIndex: "origin",
    key: "origin",
    width: 120,
    render: (text: string) => text || "-",
  },
  {
    title: t("mission.destination"),
    dataIndex: "destination",
    key: "destination",
    width: 120,
    render: (text: string) => text || "-",
  },
  {
    title: t("mission.type"),
    dataIndex: "type",
    key: "type",
    width: 130,
    render: (type: MISSION_TYPE) => {
      const typeMap: Record<string, { text: string; color: string }> = {
        inbound: { text: t("mission.type.inbound"), color: "blue" },
        outbound: { text: t("mission.type.outbound"), color: "green" },
        internal: { text: t("mission.type.internal"), color: "orange" },
        back_to_whs: { text: t("mission.type.back_whs"), color: "purple" },
        transfer_gate: { text: t("mission.type.transfer_gate"), color: "cyan" },
      };

      const typeInfo = typeMap[type] || {
        text: t("mission.type.unknown"),
        color: "default",
      };
      return <Tag color={typeInfo.color}>{typeInfo.text}</Tag>;
    },
  },
  {
    title: t("mission.state"),
    dataIndex: "state",
    key: "state",
    width: 120,
    render: (state: MISSION_STATE) => {
      const stateInfo = getStatusDisplay(state, t);
      return <Tag color={stateInfo.color}>{stateInfo.text}</Tag>;
    },
  },
  {
    title: t("mission.bin_id"),
    dataIndex: "bin_id",
    key: "bin_id",
    width: 120,
    render: (text: string) => text || "-",
  },
  {
    title: t("mission.inventory"),
    key: "inventory",
    dataIndex: "inventory",
    width: 200,
    render: (inventory: MissionInventory) => {
      if (!inventory) return "-";
      return (
        <div className="flex flex-col gap-1">
          {inventory.material_no && (
            <Tag color="blue">
              {t("mission.inventory_material_no")}: {inventory.material_no}
            </Tag>
          )}
          {inventory.qty && (
            <Tag color="green">
              {t("mission.inventory_qty")}: {inventory.qty}
            </Tag>
          )}
          {inventory.qty_available && (
            <Tag color="orange">
              {t("mission.inventory_qty_available")}: {inventory.qty_available}
            </Tag>
          )}
        </div>
      );
    },
  },
  // {
  //   title: t("mission.description"),
  //   dataIndex: "description",
  //   key: "description",
  //   width: 200,
  //   ellipsis: {
  //     showTitle: false,
  //   },
  //   render: (text: string) => (
  //     <Tooltip placement="topLeft" title={text}>
  //       {text || "-"}
  //     </Tooltip>
  //   ),
  // },
  // {
  //   title: t("mission.eta"),
  //   dataIndex: "ETA",
  //   key: "ETA",
  //   width: 100,
  //   render: (eta: number) => eta ? `${eta} min` : "-",
  // },
  {
    title: t("mission.status_history"),
    key: "status_list",
    dataIndex: "status_list",
    width: 200,
    render: (statusList: StatusItem[]) => {
      if (!statusList || statusList.length === 0) return "-";
      const latestStatus = statusList[statusList.length - 1];
      return (
        <div className="flex flex-col gap-1">
          <Tag color="blue">
            {latestStatus.status}
          </Tag>
          <span className="text-xs text-gray-500">
            {dayjs(latestStatus.updateAt).format("DD/MM/YYYY HH:mm")}
          </span>
        </div>
      );
    },
  },
  {
    title: t("common.created_at"),
    dataIndex: "createdAt",
    key: "createdAt",
    width: 120,
    render: (text: string) => dayjs(text).format("DD/MM/YYYY HH:mm"),
  },
  {
    title: t("common.action"),
    key: "action",
    fixed: "right",
    width: 180,
    render: (_: any, record: MissionDataType) => {
      const handleStatusChange = async (newStatus: MISSION_STATE) => {
        if (onStatusUpdate) {
          try {
            await onStatusUpdate(record._id, newStatus);
            message.success(t("mission.status_updated_successfully"));
          } catch (error) {
            message.error(t("mission.status_update_failed"));
            console.error("Status update error:", error);
          }
        }
      };

      // Get available status transitions for current state
      const allStatusOptions = [
        { value: MISSION_STATE.NEW, label: t("mission.state.new"), color: "default" },
        { value: MISSION_STATE.PROCESSING, label: t("mission.state.processing"), color: "processing" },
        { value: MISSION_STATE.DONE_PICKING, label: "hoàn thành pick tổng", color: "green" },
        { value: MISSION_STATE.DONE_PICKING_SPLIT, label: "hoàn thành chia hàng", color: "green" },
        { value: MISSION_STATE.ERROR, label: t("mission.state.error"), color: "error" },
        { value: MISSION_STATE.DONE, label: t("mission.state.done"), color: "success" },
      ];

      return (
        <Space direction="vertical" size="small">
          <Select
            value={record.state}
            onChange={handleStatusChange}
            style={{ width: 140 }}
            size="small"
            placeholder={t("mission.select_status")}
            // disabled={!onStatusUpdate || isDoneState}
          >
            {allStatusOptions.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                  {option.label}
              </Select.Option>
            ))}
          </Select>
        </Space>
      );
    },
  }
];

// Mock data for development and testing
export const mockData: MissionDataType[] = [
  {
    _id: "1",
    mission_code: "MSN001",
    robot_code: "ROB001",
    origin: "A01-01-01",
    destination: "B02-02-02",
    description: "Transfer items from storage A to storage B",
    bin_id: "BIN001",
    inventory: {
      material_no: "MAT001",
      qty: 10,
      qty_available: 8,
    },
    inventory_id: "inv001",
    kit_merger: "kit001",
    state: MISSION_STATE.PROCESSING,
    status_list: [
      { status: "Created", updateAt: new Date("2024-01-01T10:00:00Z") },
      { status: "In Progress", updateAt: new Date("2024-01-01T10:30:00Z") },
    ],
    type: MISSION_TYPE.INBOUND,
    ETA: 15,
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-01T10:30:00Z",
  },
  {
    _id: "2",
    mission_code: "MSN002",
    robot_code: "ROB002",
    origin: "C03-01-01",
    destination: "GATE_01",
    description: "Outbound delivery to gate 1",
    bin_id: "BIN002",
    inventory: {
      material_no: "MAT002",
      qty: 5,
      qty_available: 5,
    },
    inventory_id: "inv002",
    state: MISSION_STATE.DONE,
    status_list: [
      { status: "Created", updateAt: new Date("2024-01-01T09:00:00Z") },
      { status: "In Progress", updateAt: new Date("2024-01-01T09:15:00Z") },
      { status: "Completed", updateAt: new Date("2024-01-01T09:45:00Z") },
    ],
    type: MISSION_TYPE.OUTBOUND,
    ETA: 20,
    createdAt: "2024-01-01T09:00:00Z",
    updatedAt: "2024-01-01T09:45:00Z",
  },
  {
    _id: "3",
    mission_code: "MSN003",
    robot_code: "ROB001",
    origin: "D04-02-01",
    destination: "D04-02-02",
    description: "Internal stock reorganization",
    bin_id: "BIN003",
    inventory: {
      material_no: "MAT003",
      qty: 20,
      qty_available: 15,
    },
    inventory_id: "inv003",
    state: MISSION_STATE.NEW,
    status_list: [
      { status: "Created", updateAt: new Date("2024-01-01T11:00:00Z") },
    ],
    type: MISSION_TYPE.INTERNAL,
    ETA: 10,
    createdAt: "2024-01-01T11:00:00Z",
    updatedAt: "2024-01-01T11:00:00Z",
  },
  {
    _id: "4",
    mission_code: "MSN004",
    robot_code: "ROB003",
    origin: "E05-01-01",
    destination: "WHS_MAIN",
    description: "Return to main warehouse",
    bin_id: "BIN004",
    inventory: {
      material_no: "MAT004",
      qty: 8,
      qty_available: 8,
    },
    inventory_id: "inv004",
    state: MISSION_STATE.ERROR,
    status_list: [
      { status: "Created", updateAt: new Date("2024-01-01T12:00:00Z") },
      { status: "In Progress", updateAt: new Date("2024-01-01T12:15:00Z") },
      { status: "Error: Path blocked", updateAt: new Date("2024-01-01T12:30:00Z") },
    ],
    type: MISSION_TYPE.BACK_WHS,
    ETA: 25,
    createdAt: "2024-01-01T12:00:00Z",
    updatedAt: "2024-01-01T12:30:00Z",
  },
  {
    _id: "5",
    mission_code: "MSN005",
    robot_code: "ROB002",
    origin: "F06-01-01",
    destination: "GATE_02",
    description: "Transfer to gate 2 for pickup",
    bin_id: "BIN005",
    inventory: {
      material_no: "MAT005",
      qty: 12,
      qty_available: 10,
    },
    inventory_id: "inv005",
    state: MISSION_STATE.DONE_PICKING,
    status_list: [
      { status: "Created", updateAt: new Date("2024-01-01T13:00:00Z") },
      { status: "In Progress", updateAt: new Date("2024-01-01T13:10:00Z") },
      { status: "Picking Complete", updateAt: new Date("2024-01-01T13:25:00Z") },
    ],
    type: MISSION_TYPE.TRANSFER_GATE,
    ETA: 18,
    createdAt: "2024-01-01T13:00:00Z",
    updatedAt: "2024-01-01T13:25:00Z",
  },
];