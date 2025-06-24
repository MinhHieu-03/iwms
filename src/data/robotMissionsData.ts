
export interface RobotMission {
  id: string;
  missionNumber: string;
  robotCode: string;
  taskId: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed' | 'cancelled';
  type: 'inbound' | 'outbound' | 'transfer' | 'maintenance';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  templateId: string;
  templateName: string;
  
  // Location data aligned with warehouse structure
  pickupLocation: string;
  dropoffLocation: string;
  rackId?: string;
  position?: string;
  
  // Item data aligned with inbound/outbound
  sku?: string;
  productName?: string;
  quantity: number;
  storeMethod: 'Bin' | 'Carton';
  storeCode: string;
  packingMethod: 'Carton' | 'Bag' | 'Kit';
  packingCode: string;
  
  // Operational data
  partner?: string;
  assignedOperator?: string;
  orderId?: string;
  inboundRecordId?: string;
  
  // Timing
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  estimatedDuration: number; // in minutes
  actualDuration?: number; // in minutes
  
  // Performance metrics
  distanceTraveled?: number; // in meters
  batteryUsed?: number; // percentage
  errorCount: number;
  
  // Steps tracking
  currentStep: number;
  totalSteps: number;
  steps: MissionStep[];
}

export interface MissionStep {
  id: string;
  stepNumber: number;
  action: 'navigate' | 'pick' | 'place' | 'scan' | 'wait' | 'charge';
  location: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  startedAt?: string;
  completedAt?: string;
  duration?: number; // in seconds
  errorMessage?: string;
}

export interface MissionTemplate {
  id: string;
  name: string;
  description: string;
  category: 'inbound' | 'outbound' | 'transfer' | 'maintenance';
  estimatedDuration: number;
  steps: TemplateStep[];
  created: string;
  modified: string;
  usageCount: number;
  successRate: number; // percentage
  json: {
    nodes: any[];
    edges: any[];
  };
}

export interface TemplateStep {
  id: string;
  stepNumber: number;
  action: 'navigate' | 'pick' | 'place' | 'scan' | 'wait' | 'charge';
  description: string;
  estimatedDuration: number; // in seconds
  location?: string;
  conditions?: string[];
  errorHandling?: string;
}

// Generate comprehensive mission history (200 entries)
export const mockRobotMissions: RobotMission[] = Array.from({ length: 200 }, (_, i) => {
  const robots = ["R001", "R002", "R003", "R004", "R005", "R006"];
  const statuses = ['pending', 'in-progress', 'completed', 'failed', 'cancelled'] as const;
  const types = ['inbound', 'outbound', 'transfer', 'maintenance'] as const;
  const priorities = ['low', 'medium', 'high', 'urgent'] as const;
  const operators = ["doan nguyen", "Jane Smith", "Mike Johnson", "Sarah Wilson", "Tom Brown"];
  const partners = [
    'Tech Supplies Inc.', 'Office Solutions', 'Global Parts Ltd.',
    'Industrial Equipment Co.', 'City Electronics', 'Retail Group'
  ];
  
  const type = types[Math.floor(Math.random() * types.length)];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const templateId = type === 'inbound' ? `inbound-template-${(i % 3) + 1}` :
                   type === 'outbound' ? `outbound-template-${(i % 3) + 1}` :
                   type === 'transfer' ? `transfer-template-${(i % 2) + 1}` :
                   `maintenance-template-${(i % 2) + 1}`;
  
  const createdAt = new Date(2024, 0, 15 - Math.floor(i / 10), 8 + (i % 16), 15 + (i % 45));
  const startedAt = status !== 'pending' ? new Date(createdAt.getTime() + 5 * 60 * 1000) : undefined;
  const estimatedDuration = 15 + Math.floor(Math.random() * 45);
  const completedAt = status === 'completed' ? 
    new Date(startedAt!.getTime() + estimatedDuration * 60 * 1000) : undefined;
  
  // Generate steps based on type
  const generateSteps = (type: string, stepCount: number): MissionStep[] => {
    const baseSteps = type === 'inbound' ? [
      { action: 'navigate', location: 'Dock-A', description: 'Navigate to receiving dock' },
      { action: 'scan', location: 'Dock-A', description: 'Scan incoming items' },
      { action: 'pick', location: 'Dock-A', description: 'Pick up items from dock' },
      { action: 'navigate', location: `${String.fromCharCode(65 + (i % 3))}${String(Math.floor(i / 10) + 1).padStart(2, '0')}-${String((i % 6) + 1).padStart(2, '0')}`, description: 'Navigate to storage location' },
      { action: 'place', location: `${String.fromCharCode(65 + (i % 3))}${String(Math.floor(i / 10) + 1).padStart(2, '0')}-${String((i % 6) + 1).padStart(2, '0')}`, description: 'Place items in rack position' }
    ] : type === 'outbound' ? [
      { action: 'navigate', location: `${String.fromCharCode(65 + (i % 3))}${String(Math.floor(i / 10) + 1).padStart(2, '0')}-${String((i % 6) + 1).padStart(2, '0')}`, description: 'Navigate to storage location' },
      { action: 'scan', location: `${String.fromCharCode(65 + (i % 3))}${String(Math.floor(i / 10) + 1).padStart(2, '0')}-${String((i % 6) + 1).padStart(2, '0')}`, description: 'Scan items to pick' },
      { action: 'pick', location: `${String.fromCharCode(65 + (i % 3))}${String(Math.floor(i / 10) + 1).padStart(2, '0')}-${String((i % 6) + 1).padStart(2, '0')}`, description: 'Pick items from rack' },
      { action: 'navigate', location: 'Dock-B', description: 'Navigate to shipping dock' },
      { action: 'place', location: 'Dock-B', description: 'Place items at shipping dock' }
    ] : [
      { action: 'navigate', location: `${String.fromCharCode(65 + (i % 3))}${String(Math.floor(i / 5) + 1).padStart(2, '0')}-${String((i % 4) + 1).padStart(2, '0')}`, description: 'Navigate to source location' },
      { action: 'pick', location: `${String.fromCharCode(65 + (i % 3))}${String(Math.floor(i / 5) + 1).padStart(2, '0')}-${String((i % 4) + 1).padStart(2, '0')}`, description: 'Pick items' },
      { action: 'navigate', location: `${String.fromCharCode(68 + (i % 2))}${String(Math.floor(i / 7) + 1).padStart(2, '0')}-${String((i % 5) + 1).padStart(2, '0')}`, description: 'Navigate to destination' },
      { action: 'place', location: `${String.fromCharCode(68 + (i % 2))}${String(Math.floor(i / 7) + 1).padStart(2, '0')}-${String((i % 5) + 1).padStart(2, '0')}`, description: 'Place items' }
    ];
    
    return baseSteps.slice(0, stepCount).map((step, index) => ({
      id: `step-${i}-${index}`,
      stepNumber: index + 1,
      action: step.action as any,
      location: step.location,
      description: step.description,
      status: status === 'completed' ? 'completed' : 
              status === 'in-progress' && index <= (stepCount / 2) ? 'completed' :
              status === 'in-progress' && index === Math.floor(stepCount / 2) + 1 ? 'in-progress' : 'pending',
      startedAt: status === 'completed' || (status === 'in-progress' && index <= Math.floor(stepCount / 2)) ? 
        new Date(startedAt!.getTime() + index * 3 * 60 * 1000).toISOString() : undefined,
      completedAt: status === 'completed' || (status === 'in-progress' && index < Math.floor(stepCount / 2)) ? 
        new Date(startedAt!.getTime() + (index + 1) * 3 * 60 * 1000).toISOString() : undefined,
      duration: status === 'completed' || (status === 'in-progress' && index < Math.floor(stepCount / 2)) ? 
        120 + Math.floor(Math.random() * 120) : undefined
    }));
  };
  
  const steps = generateSteps(type, 4 + Math.floor(Math.random() * 3));
  const currentStep = status === 'completed' ? steps.length :
                    status === 'in-progress' ? Math.floor(steps.length / 2) + 1 :
                    status === 'failed' ? Math.floor(steps.length / 3) :
                    1;

  return {
    id: `mission-${(i + 1).toString().padStart(3, '0')}`,
    missionNumber: `M-2024-${(i + 1).toString().padStart(4, '0')}`,
    robotCode: robots[i % robots.length],
    taskId: `TSK-${(i + 1).toString().padStart(3, '0')}`,
    status,
    type,
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    templateId,
    templateName: type === 'inbound' ? `Inbound Storage Process ${(i % 3) + 1}` :
                 type === 'outbound' ? `Outbound Pickup Process ${(i % 3) + 1}` :
                 type === 'transfer' ? `Internal Transfer ${(i % 2) + 1}` :
                 `Maintenance Routine ${(i % 2) + 1}`,
    
    pickupLocation: type === 'inbound' ? 'Dock-A' : `${String.fromCharCode(65 + (i % 3))}${String(Math.floor(i / 10) + 1).padStart(2, '0')}-${String((i % 6) + 1).padStart(2, '0')}`,
    dropoffLocation: type === 'outbound' ? 'Dock-B' : `${String.fromCharCode(65 + (i % 3))}${String(Math.floor(i / 8) + 1).padStart(2, '0')}-${String((i % 6) + 1).padStart(2, '0')}`,
    rackId: type !== 'maintenance' ? `${String.fromCharCode(65 + (i % 3))}` : undefined,
    position: type !== 'maintenance' ? `${String(Math.floor(i / 10) + 1).padStart(2, '0')}-${String((i % 6) + 1).padStart(2, '0')}` : undefined,
    
    sku: type !== 'maintenance' ? `SKU${String(12345678 + i).slice(-8)}` : undefined,
    productName: type !== 'maintenance' ? `Product ${String.fromCharCode(65 + (i % 26))} ${i + 1}` : undefined,
    quantity: type !== 'maintenance' ? 1 + Math.floor(Math.random() * 10) : 0,
    storeMethod: (['Bin', 'Carton'] as const)[i % 2],
    storeCode: `${String.fromCharCode(65 + (i % 3))}${String(i + 1).padStart(3, '0')}`,
    packingMethod: (['Carton', 'Bag', 'Kit'] as const)[i % 3],
    packingCode: `PK${String(i + 1).padStart(4, '0')}`,
    
    partner: type !== 'maintenance' ? partners[i % partners.length] : undefined,
    assignedOperator: status !== 'pending' ? operators[i % operators.length] : undefined,
    orderId: type !== 'maintenance' ? `ord-${((i % 50) + 1).toString().padStart(3, '0')}` : undefined,
    inboundRecordId: type === 'inbound' ? `inb-${((i % 100) + 1).toString().padStart(3, '0')}` : undefined,
    
    createdAt: createdAt.toISOString(),
    startedAt: startedAt?.toISOString(),
    completedAt: completedAt?.toISOString(),
    estimatedDuration,
    actualDuration: status === 'completed' ? estimatedDuration + Math.floor(Math.random() * 20) - 10 : undefined,
    
    distanceTraveled: status === 'completed' ? 50 + Math.floor(Math.random() * 200) : undefined,
    batteryUsed: status === 'completed' ? 5 + Math.floor(Math.random() * 15) : undefined,
    errorCount: status === 'failed' ? 1 + Math.floor(Math.random() * 3) : Math.floor(Math.random() * 2),
    
    currentStep,
    totalSteps: steps.length,
    steps
  };
});

// Enhanced mission templates with more variety
export const mockMissionTemplates: MissionTemplate[] = [
  {
    id: "inbound-template-1",
    name: "Standard Inbound Storage",
    description: "Standard process for storing incoming goods from receiving dock to rack positions",
    category: "inbound",
    estimatedDuration: 25,
    steps: [
      { id: "step-1", stepNumber: 1, action: "navigate", description: "Navigate to receiving dock", estimatedDuration: 180, location: "Dock-A" },
      { id: "step-2", stepNumber: 2, action: "scan", description: "Scan and verify incoming items", estimatedDuration: 120 },
      { id: "step-3", stepNumber: 3, action: "pick", description: "Pick up items from dock", estimatedDuration: 90 },
      { id: "step-4", stepNumber: 4, action: "navigate", description: "Navigate to designated storage location", estimatedDuration: 240 },
      { id: "step-5", stepNumber: 5, action: "place", description: "Place items in rack position", estimatedDuration: 120 },
      { id: "step-6", stepNumber: 6, action: "scan", description: "Confirm placement and update inventory", estimatedDuration: 60 }
    ],
    created: "2023-11-01T10:00:00",
    modified: "2024-01-15T14:30:00",
    usageCount: 145,
    successRate: 96.5,
    json: {
      nodes: [
        { id: '1', position: { x: 100, y: 100 }, data: { label: 'Start' } },
        { id: '2', position: { x: 100, y: 200 }, data: { label: 'Navigate to Dock' } },
        { id: '3', position: { x: 100, y: 300 }, data: { label: 'Scan Items' } },
        { id: '4', position: { x: 100, y: 400 }, data: { label: 'Pick Items' } },
        { id: '5', position: { x: 100, y: 500 }, data: { label: 'Navigate to Storage' } },
        { id: '6', position: { x: 100, y: 600 }, data: { label: 'Place in Rack' } },
        { id: '7', position: { x: 100, y: 700 }, data: { label: 'Confirm Placement' } },
        { id: '8', position: { x: 100, y: 800 }, data: { label: 'End' } }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4' },
        { id: 'e4-5', source: '4', target: '5' },
        { id: 'e5-6', source: '5', target: '6' },
        { id: 'e6-7', source: '6', target: '7' },
        { id: 'e7-8', source: '7', target: '8' }
      ]
    }
  },
  {
    id: "inbound-template-2",
    name: "Express Inbound Processing",
    description: "Fast-track process for urgent incoming goods with minimal handling time",
    category: "inbound",
    estimatedDuration: 18,
    steps: [
      { id: "step-1", stepNumber: 1, action: "navigate", description: "Quick navigate to express dock", estimatedDuration: 120, location: "Express-Dock" },
      { id: "step-2", stepNumber: 2, action: "scan", description: "Priority scan of urgent items", estimatedDuration: 60 },
      { id: "step-3", stepNumber: 3, action: "pick", description: "Express pickup", estimatedDuration: 60 },
      { id: "step-4", stepNumber: 4, action: "navigate", description: "Direct route to priority storage", estimatedDuration: 180 },
      { id: "step-5", stepNumber: 5, action: "place", description: "Priority placement", estimatedDuration: 90 }
    ],
    created: "2023-12-01T09:00:00",
    modified: "2024-01-20T11:15:00",
    usageCount: 67,
    successRate: 98.2,
    json: {
      nodes: [
        { id: '1', position: { x: 100, y: 100 }, data: { label: 'Start' } },
        { id: '2', position: { x: 100, y: 200 }, data: { label: 'Express Dock' } },
        { id: '3', position: { x: 100, y: 300 }, data: { label: 'Priority Scan' } },
        { id: '4', position: { x: 100, y: 400 }, data: { label: 'Express Pick' } },
        { id: '5', position: { x: 100, y: 500 }, data: { label: 'Priority Storage' } },
        { id: '6', position: { x: 100, y: 600 }, data: { label: 'End' } }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4' },
        { id: 'e4-5', source: '4', target: '5' },
        { id: 'e5-6', source: '5', target: '6' }
      ]
    }
  },
  {
    id: "outbound-template-1",
    name: "Standard Outbound Fulfillment",
    description: "Standard process for picking and preparing goods for shipment",
    category: "outbound",
    estimatedDuration: 22,
    steps: [
      { id: "step-1", stepNumber: 1, action: "navigate", description: "Navigate to storage location", estimatedDuration: 200 },
      { id: "step-2", stepNumber: 2, action: "scan", description: "Scan and verify items to pick", estimatedDuration: 90 },
      { id: "step-3", stepNumber: 3, action: "pick", description: "Pick required items from rack", estimatedDuration: 120 },
      { id: "step-4", stepNumber: 4, action: "navigate", description: "Navigate to packing station", estimatedDuration: 180 },
      { id: "step-5", stepNumber: 5, action: "place", description: "Place items at packing station", estimatedDuration: 90 },
      { id: "step-6", stepNumber: 6, action: "scan", description: "Final verification scan", estimatedDuration: 60 }
    ],
    created: "2023-11-05T11:30:00",
    modified: "2024-01-18T16:45:00",
    usageCount: 203,
    successRate: 94.8,
    json: {
      nodes: [
        { id: '1', position: { x: 100, y: 100 }, data: { label: 'Start' } },
        { id: '2', position: { x: 100, y: 200 }, data: { label: 'Navigate to Storage' } },
        { id: '3', position: { x: 100, y: 300 }, data: { label: 'Scan Items' } },
        { id: '4', position: { x: 100, y: 400 }, data: { label: 'Pick Items' } },
        { id: '5', position: { x: 100, y: 500 }, data: { label: 'Navigate to Packing' } },
        { id: '6', position: { x: 100, y: 600 }, data: { label: 'Place at Station' } },
        { id: '7', position: { x: 100, y: 700 }, data: { label: 'Final Scan' } },
        { id: '8', position: { x: 100, y: 800 }, data: { label: 'End' } }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4' },
        { id: 'e4-5', source: '4', target: '5' },
        { id: 'e5-6', source: '5', target: '6' },
        { id: 'e6-7', source: '6', target: '7' },
        { id: 'e7-8', source: '7', target: '8' }
      ]
    }
  },
  {
    id: "transfer-template-1",
    name: "Internal Rack Transfer",
    description: "Move items between different rack locations within the warehouse",
    category: "transfer",
    estimatedDuration: 20,
    steps: [
      { id: "step-1", stepNumber: 1, action: "navigate", description: "Navigate to source location", estimatedDuration: 180 },
      { id: "step-2", stepNumber: 2, action: "scan", description: "Verify items to transfer", estimatedDuration: 90 },
      { id: "step-3", stepNumber: 3, action: "pick", description: "Pick items from source", estimatedDuration: 120 },
      { id: "step-4", stepNumber: 4, action: "navigate", description: "Navigate to destination", estimatedDuration: 240 },
      { id: "step-5", stepNumber: 5, action: "place", description: "Place items in new location", estimatedDuration: 120 }
    ],
    created: "2023-11-10T14:20:00",
    modified: "2024-01-12T10:30:00",
    usageCount: 89,
    successRate: 97.1,
    json: {
      nodes: [
        { id: '1', position: { x: 100, y: 100 }, data: { label: 'Start' } },
        { id: '2', position: { x: 100, y: 200 }, data: { label: 'Source Location' } },
        { id: '3', position: { x: 100, y: 300 }, data: { label: 'Verify Items' } },
        { id: '4', position: { x: 100, y: 400 }, data: { label: 'Pick Items' } },
        { id: '5', position: { x: 100, y: 500 }, data: { label: 'Destination' } },
        { id: '6', position: { x: 100, y: 600 }, data: { label: 'Place Items' } },
        { id: '7', position: { x: 100, y: 700 }, data: { label: 'End' } }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4' },
        { id: 'e4-5', source: '4', target: '5' },
        { id: 'e5-6', source: '5', target: '6' },
        { id: 'e6-7', source: '6', target: '7' }
      ]
    }
  },
  {
    id: "maintenance-template-1",
    name: "Daily Maintenance Routine",
    description: "Standard daily maintenance and system check routine",
    category: "maintenance",
    estimatedDuration: 30,
    steps: [
      { id: "step-1", stepNumber: 1, action: "navigate", description: "Navigate to charging station", estimatedDuration: 120, location: "Charging-Station" },
      { id: "step-2", stepNumber: 2, action: "charge", description: "Perform battery check and charge", estimatedDuration: 900 },
      { id: "step-3", stepNumber: 3, action: "scan", description: "System diagnostics scan", estimatedDuration: 300 },
      { id: "step-4", stepNumber: 4, action: "navigate", description: "Navigate through maintenance route", estimatedDuration: 480 }
    ],
    created: "2023-10-15T08:00:00",
    modified: "2024-01-25T09:00:00",
    usageCount: 156,
    successRate: 99.1,
    json: {
      nodes: [
        { id: '1', position: { x: 100, y: 100 }, data: { label: 'Start' } },
        { id: '2', position: { x: 100, y: 200 }, data: { label: 'Charging Station' } },
        { id: '3', position: { x: 100, y: 300 }, data: { label: 'Battery Check' } },
        { id: '4', position: { x: 100, y: 400 }, data: { label: 'System Diagnostics' } },
        { id: '5', position: { x: 100, y: 500 }, data: { label: 'Maintenance Route' } },
        { id: '6', position: { x: 100, y: 600 }, data: { label: 'End' } }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4' },
        { id: 'e4-5', source: '4', target: '5' },
        { id: 'e5-6', source: '5', target: '6' }
      ]
    }
  }
];

export const getMissionById = (id: string): RobotMission | undefined => {
  return mockRobotMissions.find(mission => mission.id === id);
};

export const getMissionsByStatus = (status: string): RobotMission[] => {
  return mockRobotMissions.filter(mission => mission.status === status);
};

export const getMissionsByRobot = (robotCode: string): RobotMission[] => {
  return mockRobotMissions.filter(mission => mission.robotCode === robotCode);
};

export const getTemplateById = (id: string): MissionTemplate | undefined => {
  return mockMissionTemplates.find(template => template.id === id);
};

export const getAllMissions = (): RobotMission[] => {
  return mockRobotMissions;
};

export const getAllTemplates = (): MissionTemplate[] => {
  return mockMissionTemplates;
};
