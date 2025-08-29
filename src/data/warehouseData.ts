import { Node, Edge, MarkerType } from "@xyflow/react";

export interface Warehouse {
  id: string;
  name: string;
  description: string;
  location: string;
  status: "active" | "inactive" | "maintenance";
  totalAreas: number;
  totalRacks: number;
}

export interface WarehouseArea {
  id: string;
  _id: string;
  warehouseId: string;
  name: string;
  description: string;
  type: "storage" | "inbound" | "outbound" | "processing" | "quality_control";
  status: "active" | "inactive" | "maintenance";
  capacity: number;
  currentUtilization: number;
  createdAt: string;
}

export interface Rack {
  id: string;
  _id?: string;
  areaId: string;
  locationCode: string;
  location_code: string;
  row: number;
  column: number;
  level: number;
  skus: string[];
  status: "empty" | "occupied" | "maintenance" | "reserved";
  warehouse: string;
  area: string;
  capacity: number;
  currentLoad: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  createdAt: string;
  // Link to stored items from inbound/outbound operations
  storedItems?: StoredItem[];
}

export interface StoredItem {
  id: string;
  sku: string;
  productName: string;
  quantity: number;
  storeMethod: "Bin" | "Carton";
  storeCode: string;
  packingMethod: "Carton" | "Bag" | "Kit";
  packingCode: string;
  partner: string;
  inboundOrderId?: string;
  outboundOrderId?: string;
  status: "stored" | "picked" | "reserved";
  storedAt: string;
}

export interface PricingRule {
  id: string;
  name: string;
  description: string;
  type: "storage" | "handling" | "transport";
  unitType: "per_item" | "per_hour" | "per_day" | "per_month";
  basePrice: number;
  currency: string;
  conditions: {
    minVolume?: number;
    maxVolume?: number;
    itemType?: string;
    priority?: "low" | "medium" | "high";
  };
  status: "active" | "inactive";
  createdAt: string;
}

export interface StorageHierarchy {
  id: string;
  name: string;
  level: number;
  parent?: string;
  children?: StorageHierarchy[];
  capacity?: number;
  unitType: "plastic_bin" | "carton" | "box" | "kit" | "pallet";
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  description?: string;
}

export interface StorageFlow {
  id: string;
  name: string;
  sourceLevel: string;
  targetLevel: string;
  rules: {
    maxCapacity: number;
    itemTypes: string[];
    priority: "low" | "medium" | "high";
  };
  status: "active" | "inactive";
}

export interface MasterDataItem {
  id: string;
  sku: string;
  productName: string;
  category: string;
  storageModel: string;
  cartonQuantity: number;
  boxQuantity: number;
  kitQuantity: number;
  action: string;
  preferredLocation?: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
    weight: number;
  };
  specialRequirements?: string[];
  lastUpdated: string;
}

// Generate warehouses
export const warehouses: Warehouse[] = [
  {
    id: "wh-001",
    name: "Main Warehouse",
    description: "Primary distribution center",
    location: "Zone A",
    status: "active",
    totalAreas: 8,
    totalRacks: 200,
  },
  {
    id: "wh-002",
    name: "Secondary Warehouse",
    description: "Overflow storage facility",
    location: "Zone B",
    status: "active",
    totalAreas: 5,
    totalRacks: 150,
  },
  {
    id: "wh-003",
    name: "Quality Control Center",
    description: "QC and testing facility",
    location: "Zone C",
    status: "maintenance",
    totalAreas: 3,
    totalRacks: 80,
  },
];

// Generate warehouse areas
export const warehouseAreas: WarehouseArea[] = [
  {
    id: "area-001",
    warehouseId: "wh-001",
    name: "Inbound Area A1",
    description: "Primary receiving dock",
    type: "inbound",
    status: "active",
    capacity: 2000,
    currentUtilization: 1650,
    createdAt: "2024-01-15T08:00:00Z",
  },
  {
    id: "area-002",
    warehouseId: "wh-001",
    name: "Storage Zone A2",
    description: "High-density storage area",
    type: "storage",
    status: "active",
    capacity: 8000,
    currentUtilization: 6800,
    createdAt: "2024-01-15T08:00:00Z",
  },
  {
    id: "area-003",
    warehouseId: "wh-001",
    name: "Outbound Area A3",
    description: "Shipping and dispatch zone",
    type: "outbound",
    status: "active",
    capacity: 1500,
    currentUtilization: 1200,
    createdAt: "2024-01-15T08:00:00Z",
  },
  {
    id: "area-004",
    warehouseId: "wh-001",
    name: "Processing Zone A4",
    description: "Order picking and packing",
    type: "processing",
    status: "active",
    capacity: 2500,
    currentUtilization: 2100,
    createdAt: "2024-01-15T08:00:00Z",
  },
  {
    id: "area-005",
    warehouseId: "wh-002",
    name: "Storage Zone B1",
    description: "Overflow storage",
    type: "storage",
    status: "active",
    capacity: 5000,
    currentUtilization: 3800,
    createdAt: "2024-01-20T08:00:00Z",
  },
];

// Generate stored items based on inbound/outbound data structure
export const storedItems: StoredItem[] = Array.from({ length: 300 }, (_, i) => {
  const partners = [
    "Tech Supplies Inc.",
    "Office Solutions",
    "Global Parts Ltd.",
    "Industrial Equipment Co.",
    "Tech Warehouse",
    "Smart Solutions",
    "Factory Direct",
    "Distribution Central",
    "Supply Chain Inc.",
    "Bulk Goods Ltd.",
    "City Electronics",
    "Retail Group",
  ];

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports",
    "Books",
    "Tools",
  ];

  return {
    id: `stored-${(i + 1).toString().padStart(3, "0")}`,
    sku: `SKU${(12345678 + i).toString().slice(-8)}`,
    productName: `${
      categories[i % categories.length]
    } Product ${String.fromCharCode(65 + (i % 26))}${i + 1}`,
    quantity: Math.floor(Math.random() * 50) + 1,
    storeMethod: (["Bin", "Carton"] as const)[i % 2],
    storeCode: `${String.fromCharCode(65 + (i % 3))}${String(i + 1).padStart(
      3,
      "0"
    )}`,
    packingMethod: (["Carton", "Bag", "Kit"] as const)[i % 3],
    packingCode: `PK${String(i + 1).padStart(4, "0")}`,
    partner: partners[i % partners.length],
    inboundOrderId:
      i < 200
        ? `IN-${String(Math.floor(i / 4) + 1).padStart(3, "0")}`
        : undefined,
    outboundOrderId:
      i >= 100
        ? `OUT-${String(Math.floor((i - 100) / 3) + 1).padStart(3, "0")}`
        : undefined,
    status: (["stored", "picked", "reserved"] as const)[i % 3],
    storedAt: new Date(2024, 0, 15 + (i % 30), 8 + (i % 12)).toISOString(),
  };
});

// Generate racks with 7 rows and 6-8 columns, denser occupation
export const racks: Rack[] = (() => {
  const racks: Rack[] = [];
  const areaIds = ["area-001", "area-002", "area-003", "area-004", "area-005"];
  const statuses = ["empty", "occupied", "maintenance", "reserved"] as const;
  const warehouses = ["Main", "Secondary", "QC Center"];
  const areas = ["A", "B", "C", "D", "E"];
  const columnOptions = [6, 8];

  let rackIndex = 0;

  areaIds.forEach((areaId, areaIdx) => {
    const rackGroupsPerArea = areaIdx < 3 ? 4 : 3; // More rack groups for main areas

    for (let groupIdx = 0; groupIdx < rackGroupsPerArea; groupIdx++) {
      const columns = columnOptions[groupIdx % columnOptions.length];
      const rackLetter = String.fromCharCode(65 + (groupIdx % 5)); // A, B, C, D, E

      for (let row = 1; row <= 7; row++) {
        for (let col = 1; col <= columns; col++) {
          const occupationRate = areaIdx < 2 ? 0.85 : 0.65; // Higher occupation for main areas
          const isOccupied = Math.random() < occupationRate;
          const status = isOccupied
            ? "occupied"
            : Math.random() < 0.05
            ? "maintenance"
            : Math.random() < 0.1
            ? "reserved"
            : "empty";

          const capacity = 100 + (rackIndex % 200);
          const currentLoad =
            status === "occupied"
              ? Math.floor(capacity * (0.6 + Math.random() * 0.4))
              : status === "reserved"
              ? Math.floor(capacity * 0.2)
              : 0;

          // Assign stored items to occupied racks
          const rackStoredItems =
            status === "occupied"
              ? storedItems
                  .filter(
                    (item) =>
                      item.storeCode ===
                      `${rackLetter}${String(rackIndex + 1).padStart(3, "0")}`
                  )
                  .slice(0, 3)
              : [];

          racks.push({
            id: `rack-${(rackIndex + 1).toString().padStart(3, "0")}`,
            areaId: areaId,
            locationCode: `${rackLetter}${String(row).padStart(
              2,
              "0"
            )}-${String(col).padStart(2, "0")}`,
            row: row,
            column: col,
            level: Math.floor(rackIndex / 25) + 1,
            status: status,
            warehouse: warehouses[areaIdx % warehouses.length],
            area: areas[areaIdx % areas.length],
            capacity: capacity,
            currentLoad: currentLoad,
            dimensions: {
              width: 1.2 + (rackIndex % 3) * 0.3,
              height: 2.0 + (rackIndex % 4) * 0.5,
              depth: 0.8 + (rackIndex % 2) * 0.4,
            },
            createdAt: new Date(2024, 0, 15 + (rackIndex % 30)).toISOString(),
            storedItems: rackStoredItems,
          });

          rackIndex++;
        }
      }
    }
  });

  return racks;
})();

// Generate pricing rules
export const pricingRules: PricingRule[] = [
  {
    id: "price-001",
    name: "Standard Storage Rate",
    description: "Basic storage pricing for regular items",
    type: "storage",
    unitType: "per_day",
    basePrice: 2.5,
    currency: "USD",
    conditions: {
      maxVolume: 1000,
      priority: "medium",
    },
    status: "active",
    createdAt: "2024-01-15T08:00:00Z",
  },
  {
    id: "price-002",
    name: "Premium Handling",
    description: "Special handling for fragile items",
    type: "handling",
    unitType: "per_item",
    basePrice: 5.0,
    currency: "USD",
    conditions: {
      itemType: "fragile",
      priority: "high",
    },
    status: "active",
    createdAt: "2024-01-15T08:00:00Z",
  },
  {
    id: "price-003",
    name: "Bulk Storage Discount",
    description: "Discounted rate for high-volume storage",
    type: "storage",
    unitType: "per_month",
    basePrice: 45.0,
    currency: "USD",
    conditions: {
      minVolume: 5000,
      priority: "low",
    },
    status: "active",
    createdAt: "2024-01-15T08:00:00Z",
  },
];

// Generate storage hierarchy
export const storageHierarchy: StorageHierarchy[] = [
  {
    id: "hierarchy-001",
    name: "Plastic Bin",
    level: 0,
    unitType: "plastic_bin",
    capacity: 300,
    dimensions: { width: 60, height: 40, depth: 40 },
    description: "Standard plastic storage bin",
    children: [
      {
        id: "hierarchy-002",
        name: "Carton",
        level: 1,
        parent: "hierarchy-001",
        unitType: "carton",
        capacity: 20,
        dimensions: { width: 30, height: 20, depth: 20 },
        children: [
          {
            id: "hierarchy-005",
            name: "Box",
            level: 2,
            parent: "hierarchy-002",
            unitType: "box",
            capacity: 5,
            dimensions: { width: 15, height: 10, depth: 10 },
          },
          {
            id: "hierarchy-006",
            name: "Kit",
            level: 2,
            parent: "hierarchy-002",
            unitType: "kit",
            capacity: 1,
            dimensions: { width: 10, height: 5, depth: 5 },
          },
        ],
      },
      {
        id: "hierarchy-003",
        name: "Box",
        level: 1,
        parent: "hierarchy-001",
        unitType: "box",
        capacity: 5,
        dimensions: { width: 15, height: 10, depth: 10 },
        children: [
          {
            id: "hierarchy-007",
            name: "Kit",
            level: 2,
            parent: "hierarchy-003",
            unitType: "kit",
            capacity: 1,
            dimensions: { width: 10, height: 5, depth: 5 },
          },
        ],
      },
      {
        id: "hierarchy-004",
        name: "Kit",
        level: 1,
        parent: "hierarchy-001",
        unitType: "kit",
        capacity: 1,
        dimensions: { width: 10, height: 5, depth: 5 },
      },
    ],
  },
];

// Generate storage flows
export const storageFlows: StorageFlow[] = [
  {
    id: "flow-001",
    name: "Bin to Carton Flow",
    sourceLevel: "hierarchy-001",
    targetLevel: "hierarchy-002",
    rules: {
      maxCapacity: 20,
      itemTypes: ["electronics", "clothing"],
      priority: "medium",
    },
    status: "active",
  },
  {
    id: "flow-002",
    name: "Carton to Box Flow",
    sourceLevel: "hierarchy-002",
    targetLevel: "hierarchy-005",
    rules: {
      maxCapacity: 5,
      itemTypes: ["small_parts"],
      priority: "high",
    },
    status: "active",
  },
];

// Generate master data (100 entries)
export const masterData: MasterDataItem[] = Array.from(
  { length: 100 },
  (_, i) => {
    const categories = [
      "Electronics",
      "Clothing",
      "Home & Garden",
      "Sports",
      "Books",
    ];
    const storageModels = ["Plastic Bin", "Carton", "Box", "Kit"];
    const actions = [
      "Store in plastic bin",
      "Move to carton storage",
      "Requires special handling",
      "Standard processing",
      "Quality check required",
    ];

    return {
      id: `master-${(i + 1).toString().padStart(3, "0")}`,
      sku: `SKU${(i + 10000).toString()}`,
      productName: `Product ${String.fromCharCode(65 + (i % 26))}${i + 1}`,
      category: categories[i % categories.length],
      storageModel: storageModels[i % storageModels.length],
      cartonQuantity: 20 + (i % 100),
      boxQuantity: 100 + (i % 200),
      kitQuantity: 300 + (i % 500),
      action: actions[i % actions.length],
      preferredLocation: `Zone-${String.fromCharCode(65 + (i % 4))}`,
      dimensions: {
        width: 10 + (i % 20),
        height: 5 + (i % 15),
        depth: 8 + (i % 12),
        weight: 0.5 + (i % 10) * 0.1,
      },
      specialRequirements:
        i % 3 === 0
          ? ["fragile"]
          : i % 5 === 0
          ? ["temperature_controlled"]
          : [],
      lastUpdated: new Date(2024, 0, 1 + (i % 30)).toISOString(),
    };
  }
);

// ReactFlow node and edge data for Storage Hierarchy Visualization
export const storageHierarchyNodes: Node[] = [
  {
    id: "start",
    type: "customStart", // Use our custom start node type
    position: {
      x: 400, // Random position within a reasonable range
      y: 0,
    },
    data: {
      label: `Start Node`,
    },
  },
  {
    id: "plastic-bin",
    type: "customStorage",
    data: { label: "Plastic Bin" },
    position: { x: 400, y: 70 },
  },
  {
    id: "carton-1",
    type: "customStorage",
    data: { label: "Carton" },
    position: { x: 200, y: 200 },
  },
  {
    id: "box-1",
    type: "customStorage",
    data: { label: "Box" },
    position: { x: 400, y: 200 },
  },
  {
    id: "kit-1",
    type: "customStorage",
    data: { label: "Kit" },
    position: { x: 600, y: 200 },
  },
  {
    id: "box-2",
    type: "customStorage",
    data: { label: "Box" },
    position: { x: 150, y: 350 },
  },
  {
    id: "kit-2",
    type: "customStorage",
    data: { label: "Kit" },
    position: { x: 250, y: 350 },
  },
  {
    id: "kit-3",
    type: "customStorage",
    data: { label: "Kit" },
    position: { x: 400, y: 350 },
  },
  
  {
    id: "end",
    type: "customEnd", // Use our custom start node type
    position: {
      x: 400, // Random position within a reasonable range
      y: 440,
    },
    data: {
      label: `End`,
    },
  },
];

export const storageHierarchyEdges: Edge[] = [
  {
    id: "e-plastic-carton",
    source: "plastic-bin",
    sourceHandle: "output-1",
    target: "carton-1",
    // animated: true,
    style: { stroke: "#1976d2", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#1976d2" },
  },
  {
    id: "e-plastic-box",
    source: "plastic-bin",
    sourceHandle: "output-2",
    target: "box-1",
    // animated: true,
    style: { stroke: "#1976d2", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#1976d2" },
  },
  {
    id: "e-plastic-kit",
    source: "plastic-bin",
    sourceHandle: "output-3",
    target: "kit-1",
    // animated: true,
    style: { stroke: "#1976d2", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#1976d2" },
  },
  {
    id: "e-carton-box",
    source: "carton-1",
    sourceHandle: "output-1",
    target: "box-2",
    // animated: true,
    style: { stroke: "#7b1fa2", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#7b1fa2" },
  },
  {
    id: "e-carton-kit",
    source: "carton-1",
    sourceHandle: "output-2",
    target: "kit-2",
    // animated: true,
    style: { stroke: "#7b1fa2", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#7b1fa2" },
  },
  {
    id: "e-box-kit",
    source: "box-1",
    sourceHandle: "output-1",
    target: "kit-3",
    // animated: true,
    style: { stroke: "#388e3c", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#388e3c" },
  },
];
