export const STATUS_LOCATION = {
  AVAILABLE: "available",
  UNAVAILABLE: "unavailable",
  DISABLED: "disable",
  FILL: "fill",
  WAIT_FILL: "wait_fill",
  WAIT_OUTBOUND: "wait_outbound",
  CONFIGURED: "configured",
} as const;

export const STATUS_COLOR: Record<string, string> = {
  [STATUS_LOCATION.AVAILABLE]: "bg-gray-100",
  [STATUS_LOCATION.UNAVAILABLE]: "bg-gray-700",
  [STATUS_LOCATION.DISABLED]: "bg-red-500",
  [STATUS_LOCATION.FILL]: "bg-blue-500",
  [STATUS_LOCATION.WAIT_FILL]: "bg-yellow-300",
  [STATUS_LOCATION.WAIT_OUTBOUND]: "bg-green-300",
  [STATUS_LOCATION.CONFIGURED]: "bg-gray-400",
};

export type StatusLocationType = typeof STATUS_LOCATION[keyof typeof STATUS_LOCATION];
