
// Types
export type InventoryItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  location: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
};

export type OrderType = 'Inbound' | 'Outbound';

export type Order = {
  id: string;
  type: OrderType;
  status: 'Pending' | 'Processing' | 'Completed' | 'Canceled';
  createdAt: string;
  items: { id: string; name: string; quantity: number }[];
};

export type WarehouseSection = {
  id: string;
  name: string;
  rows: number;
  columns: number;
  occupancy: number;
};

export type Mission = {
  id: string;
  name: string;
  type: 'Pick' | 'Place' | 'Transfer';
  status: 'Pending' | 'In Progress' | 'Completed' | 'Failed';
  robot: string;
  origin: string;
  destination: string;
  eta?: string;
};

export type Robot = {
  id: string;
  name: string;
  status: 'Available' | 'Busy' | 'Charging' | 'Maintenance';
  batteryLevel: number;
  currentLocation: string;
};

// Inventory data
export const inventoryData: InventoryItem[] = [
  { id: 'INV-001', name: 'Laptop', category: 'Electronics', quantity: 25, location: 'A-1-2', status: 'In Stock' },
  { id: 'INV-002', name: 'Smartphone', category: 'Electronics', quantity: 42, location: 'A-2-3', status: 'In Stock' },
  { id: 'INV-003', name: 'Headphones', category: 'Electronics', quantity: 30, location: 'A-3-1', status: 'In Stock' },
  { id: 'INV-004', name: 'Tablet', category: 'Electronics', quantity: 5, location: 'A-4-2', status: 'Low Stock' },
  { id: 'INV-005', name: 'Desktop Computer', category: 'Electronics', quantity: 0, location: 'B-1-2', status: 'Out of Stock' },
  { id: 'INV-006', name: 'Office Chair', category: 'Furniture', quantity: 15, location: 'B-2-1', status: 'In Stock' },
  { id: 'INV-007', name: 'Desk', category: 'Furniture', quantity: 3, location: 'B-3-2', status: 'Low Stock' },
  { id: 'INV-008', name: 'Coffee Machine', category: 'Appliances', quantity: 10, location: 'C-1-3', status: 'In Stock' },
  { id: 'INV-009', name: 'Microwave', category: 'Appliances', quantity: 8, location: 'C-2-2', status: 'In Stock' },
  { id: 'INV-010', name: 'Refrigerator', category: 'Appliances', quantity: 0, location: 'C-3-1', status: 'Out of Stock' },
];

// Order data
export const orderData: Order[] = [
  {
    id: 'ORD-001',
    type: 'Inbound',
    status: 'Completed',
    createdAt: '2023-10-15T10:30:00Z',
    items: [
      { id: 'INV-001', name: 'Laptop', quantity: 10 },
      { id: 'INV-002', name: 'Smartphone', quantity: 15 },
    ],
  },
  {
    id: 'ORD-002',
    type: 'Outbound',
    status: 'Processing',
    createdAt: '2023-10-16T09:45:00Z',
    items: [
      { id: 'INV-003', name: 'Headphones', quantity: 5 },
      { id: 'INV-008', name: 'Coffee Machine', quantity: 2 },
    ],
  },
  {
    id: 'ORD-003',
    type: 'Inbound',
    status: 'Pending',
    createdAt: '2023-10-16T14:20:00Z',
    items: [
      { id: 'INV-005', name: 'Desktop Computer', quantity: 8 },
      { id: 'INV-010', name: 'Refrigerator', quantity: 3 },
    ],
  },
  {
    id: 'ORD-004',
    type: 'Outbound',
    status: 'Completed',
    createdAt: '2023-10-14T16:10:00Z',
    items: [
      { id: 'INV-007', name: 'Desk', quantity: 2 },
    ],
  },
  {
    id: 'ORD-005',
    type: 'Inbound',
    status: 'Canceled',
    createdAt: '2023-10-13T11:15:00Z',
    items: [
      { id: 'INV-004', name: 'Tablet', quantity: 12 },
      { id: 'INV-009', name: 'Microwave', quantity: 4 },
    ],
  },
];

// Warehouse sections
export const warehouseSections: WarehouseSection[] = [
  { id: 'A', name: 'Section A', rows: 4, columns: 5, occupancy: 75 },
  { id: 'B', name: 'Section B', rows: 3, columns: 4, occupancy: 50 },
  { id: 'C', name: 'Section C', rows: 5, columns: 3, occupancy: 90 },
  { id: 'D', name: 'Section D', rows: 4, columns: 4, occupancy: 30 },
];

// Robot data
export const robotData: Robot[] = [
  { id: 'ROB-001', name: 'Atlas', status: 'Available', batteryLevel: 85, currentLocation: 'A-1-2' },
  { id: 'ROB-002', name: 'Orion', status: 'Busy', batteryLevel: 72, currentLocation: 'B-3-1' },
  { id: 'ROB-003', name: 'Nova', status: 'Charging', batteryLevel: 25, currentLocation: 'Charging Station 2' },
  { id: 'ROB-004', name: 'Titan', status: 'Available', batteryLevel: 90, currentLocation: 'C-2-3' },
  { id: 'ROB-005', name: 'Cosmos', status: 'Maintenance', batteryLevel: 45, currentLocation: 'Maintenance Bay' },
];

// Mission data
export const missionData: Mission[] = [
  { 
    id: 'MSN-001', 
    name: 'Transfer Laptops', 
    type: 'Transfer', 
    status: 'In Progress', 
    robot: 'ROB-002', 
    origin: 'A-1-2', 
    destination: 'D-2-1',
    eta: '5 minutes'
  },
  { 
    id: 'MSN-002', 
    name: 'Pick Headphones', 
    type: 'Pick', 
    status: 'Pending', 
    robot: 'ROB-004', 
    origin: 'A-3-1', 
    destination: 'Staging Area'
  },
  { 
    id: 'MSN-003', 
    name: 'Place Office Chairs', 
    type: 'Place', 
    status: 'Completed', 
    robot: 'ROB-001', 
    origin: 'Receiving Dock', 
    destination: 'B-2-1'
  },
  { 
    id: 'MSN-004', 
    name: 'Transfer Coffee Machines', 
    type: 'Transfer', 
    status: 'Failed', 
    robot: 'ROB-005', 
    origin: 'C-1-3', 
    destination: 'B-1-2'
  },
  { 
    id: 'MSN-005', 
    name: 'Pick Tablets', 
    type: 'Pick', 
    status: 'Pending', 
    robot: 'ROB-001', 
    origin: 'A-4-2', 
    destination: 'Shipping Area'
  },
];

// Analytics data
export const inventoryAnalytics = {
  totalItems: 138,
  itemsInStock: 130,
  lowStockItems: 8,
  outOfStockItems: 0,
  capacityUsed: 65, // percentage
  categories: [
    { name: 'Electronics', count: 102 },
    { name: 'Furniture', count: 18 },
    { name: 'Appliances', count: 18 },
  ],
};

export const orderAnalytics = {
  totalOrders: 432,
  inbound: 230,
  outbound: 202,
  pending: 42,
  processing: 95,
  completed: 285,
  canceled: 10,
  monthlyOrders: [
    { month: 'Jan', inbound: 12, outbound: 15 },
    { month: 'Feb', inbound: 19, outbound: 17 },
    { month: 'Mar', inbound: 21, outbound: 18 },
    { month: 'Apr', inbound: 25, outbound: 20 },
    { month: 'May', inbound: 18, outbound: 23 },
    { month: 'Jun', inbound: 15, outbound: 25 },
    { month: 'Jul', inbound: 20, outbound: 17 },
    { month: 'Aug', inbound: 25, outbound: 14 },
    { month: 'Sep', inbound: 30, outbound: 12 },
    { month: 'Oct', inbound: 22, outbound: 19 },
    { month: 'Nov', inbound: 28, outbound: 15 },
    { month: 'Dec', inbound: 15, outbound: 7 },
  ],
};

export const missionAnalytics = {
  total: 1245,
  completed: 980,
  inProgress: 152,
  pending: 85,
  failed: 28,
  robotPerformance: [
    { name: 'Atlas', completed: 286, failed: 5, efficiency: 98 },
    { name: 'Orion', completed: 245, failed: 7, efficiency: 97 },
    { name: 'Nova', completed: 195, failed: 9, efficiency: 96 },
    { name: 'Titan', completed: 223, failed: 4, efficiency: 98 },
    { name: 'Cosmos', completed: 31, failed: 3, efficiency: 91 },
  ],
};
