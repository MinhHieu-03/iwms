
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    // Order statuses
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Processing': 'bg-blue-100 text-blue-800',
    'Completed': 'bg-green-100 text-green-800',
    'Canceled': 'bg-red-100 text-red-800',
    
    // Inventory statuses
    'In Stock': 'bg-green-100 text-green-800',
    'Low Stock': 'bg-yellow-100 text-yellow-800',
    'Out of Stock': 'bg-red-100 text-red-800',
    
    // Mission statuses
    'In Progress': 'bg-blue-100 text-blue-800',
    'Failed': 'bg-red-100 text-red-800',
    
    // Robot statuses
    'Available': 'bg-green-100 text-green-800',
    'Busy': 'bg-blue-100 text-blue-800',
    'Charging': 'bg-yellow-100 text-yellow-800',
    'Maintenance': 'bg-orange-100 text-orange-800',
  };

  return statusColors[status] || 'bg-gray-100 text-gray-800';
}

export function generateId(prefix: string): string {
  const characters = '123456789';
  let result = '';
  for (let i = 0; i < 3; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return `${prefix}-${result}`;
}

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateWarehouseData(rows: number, cols: number) {
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push({
        id: `cell-${r}-${c}`,
        row: r,
        col: c,
        occupied: Math.random() > 0.4,
        content: Math.random() > 0.4 ? `Item-${getRandomInt(100, 999)}` : null,
      });
    }
  }
  return cells;
}
