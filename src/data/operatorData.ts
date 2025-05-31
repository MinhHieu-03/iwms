
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
}

export interface OrderItem {
  id: string;
  sku: string;
  productName: string;
  quantity: number;
  pickedQuantity: number;
  location: string;
  status: 'pending' | 'picking' | 'picked' | 'packing' | 'packed';
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
}

export const mockInboundRecords: InboundRecord[] = [
  {
    id: "inb-001",
    dock: "3",
    type: "Purchase Order",
    supplier: "ABC Supplier",
    expectedItems: 100,
    receivedItems: 85,
    status: "in-progress",
    createdAt: "2024-01-15T09:30:00",
    createdBy: "John Doe"
  },
  {
    id: "inb-002",
    dock: "3", 
    type: "Return",
    supplier: "XYZ Corp",
    expectedItems: 50,
    receivedItems: 50,
    status: "completed",
    createdAt: "2024-01-14T14:20:00",
    createdBy: "John Doe"
  }
];

export const mockOrders: Order[] = [
  {
    id: "ord-001",
    orderNumber: "ORD-2024-001",
    customer: "Customer A",
    priority: "high",
    status: "pending",
    totalItems: 3,
    createdAt: "2024-01-15T08:00:00",
    dueDate: "2024-01-16T18:00:00",
    items: [
      {
        id: "item-001",
        sku: "SKU-001",
        productName: "Product A",
        quantity: 2,
        pickedQuantity: 0,
        location: "A1-B2-C3",
        status: "pending"
      },
      {
        id: "item-002", 
        sku: "SKU-002",
        productName: "Product B",
        quantity: 1,
        pickedQuantity: 0,
        location: "A2-B1-C2",
        status: "pending"
      },
      {
        id: "item-003",
        sku: "SKU-003", 
        productName: "Product C",
        quantity: 3,
        pickedQuantity: 0,
        location: "A1-B3-C1",
        status: "pending"
      }
    ]
  },
  {
    id: "ord-002",
    orderNumber: "ORD-2024-002", 
    customer: "Customer B",
    priority: "medium",
    status: "picking",
    totalItems: 2,
    createdAt: "2024-01-15T10:30:00",
    dueDate: "2024-01-17T12:00:00",
    items: [
      {
        id: "item-004",
        sku: "SKU-004",
        productName: "Product D",
        quantity: 1,
        pickedQuantity: 1,
        location: "B1-A2-C1",
        status: "picked"
      },
      {
        id: "item-005",
        sku: "SKU-005", 
        productName: "Product E",
        quantity: 2,
        pickedQuantity: 0,
        location: "B2-A1-C3",
        status: "picking"
      }
    ]
  }
];
