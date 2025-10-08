interface TaskTemplate {
  id: string;
  name: string;
  param: any;
}

export interface DeviceType {
  id: string;
  name: string;
  description: string;
  config: string[];
  task: TaskTemplate[];
}

export interface DeviceData {
  id: string;
  name: string;
  description: string;
  type: string;
  connected: boolean;
  state?: any;
  config?: any;
  setting?: any;
}

const deviceTypes: DeviceType[] = [
  {
    id: "type-1",
    name: "Sensor",
    description: "Environmental monitoring device",
    config: ["temperature", "humidity", "pressure"],
    task: [
      {
        id: "task-1-1",
        name: "ReadTemperature",
        param: { unit: "celsius", interval: 60 },
      },
      {
        id: "task-1-2",
        name: "ReadHumidity",
        param: { range: "0-100", precision: 2 },
      },
      {
        id: "task-1-3",
        name: "Calibrate",
        param: { auto: true, schedule: "daily" },
      },
    ],
  },
  {
    id: "type-2",
    name: "Actuator",
    description: "Control device for automation",
    config: ["speed", "direction", "mode"],
    task: [
      {
        id: "task-2-1",
        name: "SetSpeed",
        param: { value: 100, unit: "rpm" },
      },
      {
        id: "task-2-2",
        name: "ChangeDirection",
        param: { direction: "forward" },
      },
      {
        id: "task-2-3",
        name: "ToggleMode",
        param: { mode: "auto" },
      },
    ],
  },
  {
    id: "type-3",
    name: "Gateway",
    description: "Network communication device",
    config: ["ip_address", "port", "protocol"],
    task: [
      {
        id: "task-3-1",
        name: "Ping",
        param: { target: "192.168.1.1", count: 4 },
      },
      {
        id: "task-3-2",
        name: "UpdateFirmware",
        param: { version: "2.0.1", source: "cloud" },
      },
      {
        id: "task-3-3",
        name: "Restart",
        param: { delay: 5 },
      },
    ],
  },
];

const devices: DeviceData[] = [
  {
    id: "device-1",
    name: "TempSensor-01",
    description: "Temperature sensor in lab 1",
    type: "type-1",
    connected: true,
    state: "active",
    config: { temperature: 22.5, humidity: 45, pressure: 1013 },
    setting: { temperature: 22.5, humidity: 45, pressure: 1013 },
  },
  {
    id: "device-2",
    name: "TempSensor-02",
    description: "Temperature sensor in lab 2",
    type: "type-1",
    connected: false,
    state: "idle",
    config: { temperature: 23.0, humidity: 50, pressure: 1012 },
    setting: { temperature: 23.0, humidity: 50, pressure: 1012 },
  },
  {
    id: "device-3",
    name: "TempSensor-03",
    description: "Temperature sensor in warehouse",
    type: "type-1",
    connected: true,
    state: "active",
    config: { temperature: 20.0, humidity: 55, pressure: 1010 },
    setting: { temperature: 20.0, humidity: 55, pressure: 1010 },
  },
  {
    id: "device-4",
    name: "Motor-01",
    description: "Motor in production line A",
    type: "type-2",
    connected: true,
    state: "running",
    config: { speed: 150, direction: "forward", mode: "manual" },
    setting: { speed: 150, direction: "forward", mode: "manual" },
  },
  {
    id: "device-5",
    name: "Motor-02",
    description: "Motor in production line B",
    type: "type-2",
    connected: true,
    state: "running",
    config: { speed: 120, direction: "reverse", mode: "auto" },
    setting: { speed: 120, direction: "reverse", mode: "auto" },
  },
  {
    id: "device-6",
    name: "Motor-03",
    description: "Motor in warehouse",
    type: "type-2",
    connected: false,
    state: "stopped",
    config: { speed: 0, direction: "forward", mode: "manual" },
    setting: { speed: 0, direction: "forward", mode: "manual" },
  },
  {
    id: "device-7",
    name: "Gateway-01",
    description: "Main network gateway",
    type: "type-3",
    connected: true,
    state: "operational",
    config: { ip_address: "192.168.1.100", port: 8080, protocol: "TCP" },
    setting: { ip_address: "192.168.1.100", port: 8080, protocol: "TCP" },
  },
  {
    id: "device-8",
    name: "Gateway-02",
    description: "Backup network gateway",
    type: "type-3",
    connected: true,
    state: "standby",
    config: { ip_address: "192.168.1.101", port: 8081, protocol: "UDP" },
    setting: { ip_address: "192.168.1.101", port: 8081, protocol: "UDP" },
  },
  {
    id: "device-9",
    name: "Gateway-03",
    description: "Secondary network gateway",
    type: "type-3",
    connected: false,
    state: "offline",
    config: { ip_address: "192.168.1.102", port: 8082, protocol: "TCP" },
    setting: { ip_address: "192.168.1.102", port: 8082, protocol: "TCP" },
  },
  {
    id: "device-10",
    name: "Sensor-04",
    description: "Temperature sensor in office",
    type: "type-1",
    connected: true,
    state: "active",
    config: { temperature: 21.5, humidity: 48, pressure: 1011 },
    setting: { temperature: 21.5, humidity: 48, pressure: 1011 },
  },
];

export { deviceTypes, devices };
