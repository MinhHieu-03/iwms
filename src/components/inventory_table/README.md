# Inventory Table Component

This component provides a comprehensive inventory management interface for the IWMS application.

## Features

- **Table Display**: Shows inventory items with SKU, product name, location, store items, and status
- **Search & Filter**: Search by SKU, product name, or location code; filter by status
- **CRUD Operations**: Create, read, update, and delete inventory items
- **Store Items Management**: Handle multiple store types (Plastic Bin, Bag, Item, Box, Pallet) with quantities
- **Status Management**: Track various inventory statuses (wait_fill, fill, in_progress, completed, low_stock, out_of_stock)
- **Detail View**: Comprehensive modal showing all inventory details
- **Responsive Design**: Mobile-friendly with proper column handling

## Data Structure

The inventory data follows this structure:

```typescript
interface InventoryDataType {
  _id: string;
  sku: string;
  product_name: string;
  locationId: string;
  locationCode: string;
  store: StoreItem[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface StoreItem {
  key: string; // e.g., "Plastic Bin", "Bag", "Item"
  qty: number;
}
```

## Status Types

- `wait_fill` - Waiting to be filled
- `fill` - Being filled
- `in_progress` - Processing in progress
- `completed` - Completed
- `low_stock` - Low stock warning
- `out_of_stock` - Out of stock

## Usage

```tsx
import InventoryTable from '@/components/inventory_table';

function InventoryPage() {
  return <InventoryTable />;
}
```

## API Endpoints

The component expects these API endpoints:

- `POST /inventory/list` - Get inventory list with pagination and filters
- `POST /inventory` - Create new inventory item
- `PATCH /inventory/:id` - Update inventory item
- `DELETE /inventory` - Delete inventory items

If API endpoints are not available, the component falls back to mock data.

## Files

- `index.tsx` - Main table component
- `const.tsx` - Data types, column definitions, and mock data
- `modal_create.tsx` - Create inventory modal
- `modal_update.tsx` - Edit inventory modal
- `modal_detail.tsx` - View inventory details modal

## Dependencies

- React
- Ant Design
- React i18next (for internationalization)
- Day.js (for date formatting)
- Lucide React (for icons)
