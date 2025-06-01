
export interface InboundRecord {
  id: string;
  dock: string;
  type: string;
  supplier: string;
  expectedItems: number;
  receivedItems: number;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
  createdBy: string;
  // Enhanced fields linking to unified system
  taskId: string;
  robotCode?: string;
  missionId: string;
  storeMethod: 'Bin' | 'Carton';
  packingMethod: 'Carton' | 'Bag' | 'Kit';
  estimatedCompletionTime?: string;
}

export interface OrderItem {
  id: string;
  sku: string;
  productName: string;
  quantity: number;
  pickedQuantity: number;
  location: string;
  status: 'pending' | 'picking' | 'picked' | 'packing' | 'packed';
  // Enhanced fields
  storeMethod: 'Bin' | 'Carton';
  storeCode: string;
  packingMethod: 'Carton' | 'Bag' | 'Kit';
  packingCode: string;
  robotCode?: string;
  taskId?: string;
  pickingStartTime?: string;
  packingStartTime?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'picking' | 'packing' | 'ready' | 'shipped';
  items: OrderItem[];
  totalItems: number;
  createdAt: string;
  dueDate: string;
  // Enhanced fields
  missionId?: string;
  assignedOperator?: string;
  estimatedCompletionTime?: string;
  shippingAddress?: string;
  specialInstructions?: string;
}

export interface OperatorShift {
  id: string;
  operatorId: string;
  operatorName: string;
  shiftStart: string;
  shiftEnd?: string;
  dock: string;
  status: 'active' | 'ended' | 'break';
  performance: {
    ordersProcessed: number;
    itemsPicked: number;
    itemsPacked: number;
    accuracy: number;
  };
}

export interface OperatorPerformanceMetric {
  id: string;
  operatorId: string;
  date: string;
  dock: string;
  ordersProcessed: number;
  itemsPicked: number;
  itemsPacked: number;
  accuracy: number;
  timePerOrder: number; // in minutes
  shiftsWorked: number;
}

// Generate comprehensive inbound records (100 entries)
export const mockInboundRecords: InboundRecord[] = Array.from({ length: 100 }, (_, i) => {
  const docks = ["1", "2", "3", "4"];
  const types = ["Purchase Order", "Return", "Transfer", "Emergency", "Quality Return"];
  const suppliers = [
    "ABC Supplier", "XYZ Corp", "Global Logistics", "Prime Distribution",
    "Tech Components Ltd", "Industrial Parts Co", "Quality Supplies Inc",
    "Fast Delivery Co", "Reliable Sources", "Premium Goods Ltd"
  ];
  const operators = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson", "Tom Brown"];
  const statuses = ['pending', 'in-progress', 'completed', 'cancelled'] as const;
  const storeMethods = ['Bin', 'Carton'] as const;
  const packingMethods = ['Carton', 'Bag', 'Kit'] as const;

  const expectedItems = 50 + Math.floor(Math.random() * 200);
  const receivedItems = Math.floor(expectedItems * (0.8 + Math.random() * 0.2));
  const status = statuses[Math.floor(Math.random() * statuses.length)];

  return {
    id: `inb-${(i + 1).toString().padStart(3, '0')}`,
    dock: docks[i % docks.length],
    type: types[i % types.length],
    supplier: suppliers[i % suppliers.length],
    expectedItems,
    receivedItems: status === 'completed' ? receivedItems : Math.floor(receivedItems * 0.7),
    status,
    createdAt: new Date(2024, 0, 15 - Math.floor(i / 7), 8 + (i % 16), 30 + (i % 30)).toISOString(),
    createdBy: operators[i % operators.length],
    taskId: `TSK-INB-${(i + 1).toString().padStart(3, '0')}`,
    robotCode: Math.random() > 0.3 ? `R${String((i % 6) + 1).padStart(3, '0')}` : undefined,
    missionId: `M-INB-${(i + 1).toString().padStart(3, '0')}`,
    storeMethod: storeMethods[i % storeMethods.length],
    packingMethod: packingMethods[i % packingMethods.length],
    estimatedCompletionTime: status === 'in-progress' ? 
      new Date(Date.now() + (2 + Math.random() * 4) * 60 * 60 * 1000).toISOString() : undefined
  };
});

// Generate comprehensive orders (50 entries)
export const mockOrders: Order[] = Array.from({ length: 50 }, (_, i) => {
  const customers = [
    "Customer A", "Customer B", "Customer C", "Customer D", "Customer E",
    "Tech Solutions Inc", "Office Supplies Co", "Retail Chain Ltd",
    "E-commerce Platform", "Distribution Network", "Local Business",
    "Corporate Client", "Small Business", "Enterprise Account"
  ];
  const priorities = ['low', 'medium', 'high', 'urgent'] as const;
  const statuses = ['pending', 'picking', 'packing', 'ready', 'shipped'] as const;
  const operators = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson", "Tom Brown"];

  const priority = priorities[Math.floor(Math.random() * priorities.length)];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const itemCount = 2 + Math.floor(Math.random() * 6); // 2-7 items per order

  // Generate items for this order
  const items: OrderItem[] = Array.from({ length: itemCount }, (_, itemIndex) => {
    const storeMethods = ['Bin', 'Carton'] as const;
    const packingMethods = ['Carton', 'Bag', 'Kit'] as const;
    const itemStatuses = ['pending', 'picking', 'picked', 'packing', 'packed'] as const;
    
    const quantity = 1 + Math.floor(Math.random() * 10);
    const pickedQuantity = status === 'pending' ? 0 : 
                          Math.floor(quantity * (0.7 + Math.random() * 0.3));

    return {
      id: `item-${i}-${itemIndex}`,
      sku: `SKU${(12345000 + i * 10 + itemIndex).toString().slice(-8)}`,
      productName: `Product ${String.fromCharCode(65 + (itemIndex % 26))} ${i + 1}-${itemIndex + 1}`,
      quantity,
      pickedQuantity,
      location: `${String.fromCharCode(65 + (itemIndex % 5))}${String(Math.floor(itemIndex / 2) + 1).padStart(2, '0')}-${String((itemIndex % 8) + 1).padStart(2, '0')}`,
      status: itemStatuses[Math.min(itemStatuses.length - 1, Math.floor(Math.random() * (statuses.indexOf(status) + 2)))],
      storeMethod: storeMethods[itemIndex % storeMethods.length],
      storeCode: `${String.fromCharCode(65 + (itemIndex % 3))}${String(i * 10 + itemIndex + 1).padStart(3, '0')}`,
      packingMethod: packingMethods[itemIndex % packingMethods.length],
      packingCode: `PK${String(i * 10 + itemIndex + 1).padStart(4, '0')}`,
      robotCode: Math.random() > 0.4 ? `R${String((itemIndex % 6) + 1).padStart(3, '0')}` : undefined,
      taskId: `TSK-${i}-${itemIndex}`,
      pickingStartTime: status !== 'pending' ? 
        new Date(Date.now() - (2 + Math.random() * 6) * 60 * 60 * 1000).toISOString() : undefined,
      packingStartTime: ['packing', 'packed'].includes(status) ? 
        new Date(Date.now() - (1 + Math.random() * 3) * 60 * 60 * 1000).toISOString() : undefined
    };
  });

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + (priority === 'urgent' ? 1 : priority === 'high' ? 2 : priority === 'medium' ? 3 : 5));

  return {
    id: `ord-${(i + 1).toString().padStart(3, '0')}`,
    orderNumber: `ORD-2024-${(i + 1).toString().padStart(3, '0')}`,
    customer: customers[i % customers.length],
    priority,
    status,
    items,
    totalItems: itemCount,
    createdAt: new Date(2024, 0, 15 - Math.floor(i / 5), 8 + (i % 12), 15 + (i % 45)).toISOString(),
    dueDate: dueDate.toISOString(),
    missionId: `M-ORD-${(i + 1).toString().padStart(3, '0')}`,
    assignedOperator: status !== 'pending' ? operators[i % operators.length] : undefined,
    estimatedCompletionTime: status === 'picking' || status === 'packing' ? 
      new Date(Date.now() + (1 + Math.random() * 3) * 60 * 60 * 1000).toISOString() : undefined,
    shippingAddress: `${100 + i} ${['Main St', 'Oak Ave', 'Pine Rd', 'Elm St', 'Park Blvd'][i % 5]}, City ${i % 10 + 1}`,
    specialInstructions: i % 4 === 0 ? "Handle with care - fragile items" : 
                        i % 5 === 0 ? "Rush delivery required" : undefined
  };
});

// Generate operator shifts (30 entries)
export const mockOperatorShifts: OperatorShift[] = Array.from({ length: 30 }, (_, i) => {
  const operators = [
    { id: "op-001", name: "John Doe" },
    { id: "op-002", name: "Jane Smith" },
    { id: "op-003", name: "Mike Johnson" },
    { id: "op-004", name: "Sarah Wilson" },
    { id: "op-005", name: "Tom Brown" }
  ];
  const docks = ["1", "2", "3", "4"];
  const statuses = ['active', 'ended', 'break'] as const;

  const operator = operators[i % operators.length];
  const shiftStart = new Date(2024, 0, 15 - Math.floor(i / 6), 8 + (i % 3) * 8);
  const shiftEnd = Math.random() > 0.3 ? new Date(shiftStart.getTime() + 8 * 60 * 60 * 1000) : undefined;

  const ordersProcessed = Math.floor(Math.random() * 25) + 5;
  const itemsPicked = ordersProcessed * (3 + Math.floor(Math.random() * 5));
  const itemsPacked = Math.floor(itemsPicked * (0.8 + Math.random() * 0.2));

  return {
    id: `shift-${(i + 1).toString().padStart(3, '0')}`,
    operatorId: operator.id,
    operatorName: operator.name,
    shiftStart: shiftStart.toISOString(),
    shiftEnd: shiftEnd?.toISOString(),
    dock: docks[i % docks.length],
    status: shiftEnd ? 'ended' : statuses[Math.floor(Math.random() * statuses.length)],
    performance: {
      ordersProcessed,
      itemsPicked,
      itemsPacked,
      accuracy: 85 + Math.random() * 15 // 85-100% accuracy
    }
  };
});

// Generate operator performance metrics (100 entries)
export const mockOperatorPerformanceMetrics: OperatorPerformanceMetric[] = Array.from({ length: 100 }, (_, i) => {
  const operators = ["op-001", "op-002", "op-003", "op-004", "op-005"];
  const docks = ["1", "2", "3", "4"];

  const ordersProcessed = 5 + Math.floor(Math.random() * 20);
  const itemsPicked = ordersProcessed * (2 + Math.floor(Math.random() * 6));
  const itemsPacked = Math.floor(itemsPicked * (0.8 + Math.random() * 0.2));

  return {
    id: `perf-${(i + 1).toString().padStart(3, '0')}`,
    operatorId: operators[i % operators.length],
    date: new Date(2024, 0, 15 - Math.floor(i / 5)).toISOString(),
    dock: docks[i % docks.length],
    ordersProcessed,
    itemsPicked,
    itemsPacked,
    accuracy: 80 + Math.random() * 20, // 80-100% accuracy
    timePerOrder: 15 + Math.random() * 20, // 15-35 minutes per order
    shiftsWorked: Math.floor(Math.random() * 3) + 1 // 1-3 shifts per day
  };
});

// Export additional data for robot assignments and missions
export interface RobotAssignment {
  id: string;
  robotCode: string;
  taskId: string;
  missionId: string;
  status: 'assigned' | 'in-progress' | 'completed' | 'error';
  assignedAt: string;
  completedAt?: string;
  pickupLocation: string;
  dropoffLocation: string;
  operatorId?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export const mockRobotAssignments: RobotAssignment[] = Array.from({ length: 150 }, (_, i) => {
  const robots = ["R001", "R002", "R003", "R004", "R005", "R006"];
  const statuses = ['assigned', 'in-progress', 'completed', 'error'] as const;
  const priorities = ['low', 'medium', 'high', 'urgent'] as const;
  const operators = ["op-001", "op-002", "op-003", "op-004", "op-005"];

  const assignedAt = new Date(2024, 0, 15 - Math.floor(i / 10), 8 + (i % 16), 15 + (i % 45));
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const completedAt = status === 'completed' ? 
    new Date(assignedAt.getTime() + (30 + Math.random() * 120) * 60 * 1000) : undefined;

  return {
    id: `robot-assign-${(i + 1).toString().padStart(3, '0')}`,
    robotCode: robots[i % robots.length],
    taskId: `TSK-${(i + 1).toString().padStart(3, '0')}`,
    missionId: `M-${(i + 1).toString().padStart(3, '0')}`,
    status,
    assignedAt: assignedAt.toISOString(),
    completedAt: completedAt?.toISOString(),
    pickupLocation: `${String.fromCharCode(65 + (i % 5))}${String(Math.floor(i / 5) + 1).padStart(2, '0')}-${String((i % 8) + 1).padStart(2, '0')}`,
    dropoffLocation: `${String.fromCharCode(68 + (i % 3))}${String(Math.floor(i / 4) + 1).padStart(2, '0')}-${String((i % 6) + 1).padStart(2, '0')}`,
    operatorId: Math.random() > 0.3 ? operators[i % operators.length] : undefined,
    priority: priorities[Math.floor(Math.random() * priorities.length)]
  };
});
