
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
  areaId: string;
  locationCode: string;
  row: number;
  column: number;
  level: number;
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
    totalRacks: 120
  },
  {
    id: "wh-002", 
    name: "Secondary Warehouse",
    description: "Overflow storage facility",
    location: "Zone B",
    status: "active",
    totalAreas: 5,
    totalRacks: 80
  },
  {
    id: "wh-003",
    name: "Quality Control Center",
    description: "QC and testing facility",
    location: "Zone C", 
    status: "maintenance",
    totalAreas: 3,
    totalRacks: 30
  }
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
    capacity: 1000,
    currentUtilization: 650,
    createdAt: "2024-01-15T08:00:00Z"
  },
  {
    id: "area-002",
    warehouseId: "wh-001", 
    name: "Storage Zone A2",
    description: "High-density storage area",
    type: "storage",
    status: "active",
    capacity: 5000,
    currentUtilization: 3200,
    createdAt: "2024-01-15T08:00:00Z"
  },
  {
    id: "area-003",
    warehouseId: "wh-001",
    name: "Outbound Area A3", 
    description: "Shipping and dispatch zone",
    type: "outbound",
    status: "active",
    capacity: 800,
    currentUtilization: 420,
    createdAt: "2024-01-15T08:00:00Z"
  },
  {
    id: "area-004",
    warehouseId: "wh-001",
    name: "Processing Zone A4",
    description: "Order picking and packing",
    type: "processing", 
    status: "active",
    capacity: 1200,
    currentUtilization: 890,
    createdAt: "2024-01-15T08:00:00Z"
  },
  {
    id: "area-005",
    warehouseId: "wh-002",
    name: "Storage Zone B1",
    description: "Overflow storage",
    type: "storage",
    status: "active", 
    capacity: 3000,
    currentUtilization: 1800,
    createdAt: "2024-01-20T08:00:00Z"
  }
];

// Generate racks data (100 entries)
export const racks: Rack[] = Array.from({ length: 100 }, (_, i) => {
  const areaIds = ["area-001", "area-002", "area-003", "area-004", "area-005"];
  const statuses = ["empty", "occupied", "maintenance", "reserved"] as const;
  const warehouses = ["Main", "Secondary", "QC Center"];
  const areas = ["A", "B", "C", "D"];
  
  return {
    id: `rack-${(i + 1).toString().padStart(3, "0")}`,
    areaId: areaIds[i % areaIds.length],
    locationCode: `${areas[i % areas.length]}${(i % 20 + 1).toString().padStart(2, "0")}`,
    row: Math.floor(i / 10) + 1,
    column: (i % 10) + 1,
    level: Math.floor(i / 25) + 1,
    status: statuses[i % statuses.length],
    warehouse: warehouses[i % warehouses.length],
    area: areas[i % areas.length],
    capacity: 100 + (i % 400),
    currentLoad: Math.floor(Math.random() * 500),
    dimensions: {
      width: 1.2 + (i % 3) * 0.3,
      height: 2.0 + (i % 4) * 0.5,
      depth: 0.8 + (i % 2) * 0.4
    },
    createdAt: new Date(2024, 0, 15 + (i % 30)).toISOString()
  };
});

// Generate pricing rules
export const pricingRules: PricingRule[] = [
  {
    id: "price-001",
    name: "Standard Storage Rate",
    description: "Basic storage pricing for regular items",
    type: "storage",
    unitType: "per_day",
    basePrice: 2.50,
    currency: "USD",
    conditions: {
      maxVolume: 1000,
      priority: "medium"
    },
    status: "active",
    createdAt: "2024-01-15T08:00:00Z"
  },
  {
    id: "price-002",
    name: "Premium Handling",
    description: "Special handling for fragile items", 
    type: "handling",
    unitType: "per_item",
    basePrice: 5.00,
    currency: "USD",
    conditions: {
      itemType: "fragile",
      priority: "high"
    },
    status: "active",
    createdAt: "2024-01-15T08:00:00Z"
  },
  {
    id: "price-003",
    name: "Bulk Storage Discount",
    description: "Discounted rate for high-volume storage",
    type: "storage", 
    unitType: "per_month",
    basePrice: 45.00,
    currency: "USD",
    conditions: {
      minVolume: 5000,
      priority: "low"
    },
    status: "active",
    createdAt: "2024-01-15T08:00:00Z"
  }
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
            dimensions: { width: 15, height: 10, depth: 10 }
          },
          {
            id: "hierarchy-006", 
            name: "Kit",
            level: 2,
            parent: "hierarchy-002",
            unitType: "kit",
            capacity: 1,
            dimensions: { width: 10, height: 5, depth: 5 }
          }
        ]
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
            dimensions: { width: 10, height: 5, depth: 5 }
          }
        ]
      },
      {
        id: "hierarchy-004",
        name: "Kit",
        level: 1,
        parent: "hierarchy-001",
        unitType: "kit", 
        capacity: 1,
        dimensions: { width: 10, height: 5, depth: 5 }
      }
    ]
  }
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
      priority: "medium"
    },
    status: "active"
  },
  {
    id: "flow-002", 
    name: "Carton to Box Flow",
    sourceLevel: "hierarchy-002",
    targetLevel: "hierarchy-005",
    rules: {
      maxCapacity: 5,
      itemTypes: ["small_parts"],
      priority: "high" 
    },
    status: "active"
  }
];

// Generate master data (100 entries)
export const masterData: MasterDataItem[] = Array.from({ length: 100 }, (_, i) => {
  const categories = ["Electronics", "Clothing", "Home & Garden", "Sports", "Books"];
  const storageModels = ["Plastic Bin", "Carton", "Box", "Kit"];
  const actions = [
    "Store in plastic bin",
    "Move to carton storage", 
    "Requires special handling",
    "Standard processing",
    "Quality check required"
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
      weight: 0.5 + (i % 10) * 0.1
    },
    specialRequirements: i % 3 === 0 ? ["fragile"] : i % 5 === 0 ? ["temperature_controlled"] : [],
    lastUpdated: new Date(2024, 0, 1 + (i % 30)).toISOString()
  };
});
