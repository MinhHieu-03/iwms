
export type InboundOutboundOrder = {
  id: string;
  taskId: string;
  robotCode: string;
  pickupLocation: string;
  dropoffLocation: string;
  status: 'Pending' | 'Processing' | 'Completed';
  missionId: string;
  partner: string;
  category: 'Inbound' | 'Outbound';
  registrationTime: string;
  sku: string;
  storeMethod: 'Bin' | 'Carton';
  storeCode: string;
  packingMethod: 'Carton' | 'Bag' | 'Kit';
  packingCode: string;
};

export const inboundOutboundOrders: InboundOutboundOrder[] = [
  // Inbound Orders (50 instances)
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `IN-${String(i + 1).padStart(3, '0')}`,
    taskId: `TSK-${String(i + 1).padStart(3, '0')}`,
    robotCode: `R${String((i % 6) + 1).padStart(3, '0')}`,
    pickupLocation: `${String.fromCharCode(65 + (i % 3))}-${String(Math.floor(i / 10) + 1).padStart(2, '0')}-${String((i % 5) + 1).padStart(2, '0')}`,
    dropoffLocation: `${String.fromCharCode(68 + (i % 3))}-${String(Math.floor(i / 8) + 1).padStart(2, '0')}-${String((i % 4) + 1).padStart(2, '0')}`,
    status: (['Pending', 'Processing', 'Completed'] as const)[i % 3],
    missionId: `M${String(i + 1).padStart(3, '0')}`,
    partner: [
      'Tech Supplies Inc.',
      'Office Solutions',
      'Global Parts Ltd.',
      'Industrial Equipment Co.',
      'Tech Warehouse',
      'Smart Solutions',
      'Factory Direct',
      'Distribution Central',
      'Supply Chain Inc.',
      'Bulk Goods Ltd.'
    ][i % 10],
    category: 'Inbound' as const,
    registrationTime: new Date(2023, 4, 15 - Math.floor(i / 7), 10 + (i % 12), 30 + (i % 30)).toISOString(),
    sku: `SKU${String(12345678 + i).slice(-8)}`,
    storeMethod: (['Bin', 'Carton'] as const)[i % 2],
    storeCode: `${String.fromCharCode(65 + (i % 3))}${String(i + 1).padStart(3, '0')}`,
    packingMethod: (['Carton', 'Bag', 'Kit'] as const)[i % 3],
    packingCode: `PK${String(i + 1).padStart(4, '0')}`
  })),
  
  // Outbound Orders (50 instances)
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `OUT-${String(i + 1).padStart(3, '0')}`,
    taskId: `TSK-${String(i + 51).padStart(3, '0')}`,
    robotCode: `R${String((i % 6) + 1).padStart(3, '0')}`,
    pickupLocation: `${String.fromCharCode(65 + (i % 3))}-${String(Math.floor(i / 10) + 1).padStart(2, '0')}-${String((i % 5) + 1).padStart(2, '0')}`,
    dropoffLocation: `DOCK-${String.fromCharCode(65 + (i % 3))}`,
    status: (['Pending', 'Processing', 'Completed'] as const)[i % 3],
    missionId: `M${String(i + 51).padStart(3, '0')}`,
    partner: [
      'City Electronics',
      'Retail Group',
      'Online Shop',
      'Department Store',
      'Office Depot',
      'Tech Mart',
      'Home Goods',
      'Furniture Plus',
      'Kitchen Supplies',
      'Electronic World'
    ][i % 10],
    category: 'Outbound' as const,
    registrationTime: new Date(2023, 4, 15 - Math.floor(i / 7), 16 + (i % 8), 20 + (i % 40)).toISOString(),
    sku: `SKU${String(87654321 + i).slice(-8)}`,
    storeMethod: (['Bin', 'Carton'] as const)[i % 2],
    storeCode: `${String.fromCharCode(68 + (i % 3))}${String(i + 1).padStart(3, '0')}`,
    packingMethod: (['Carton', 'Bag', 'Kit'] as const)[i % 3],
    packingCode: `PK${String(i + 51).padStart(4, '0')}`
  }))
];
