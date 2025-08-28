# Issue Time Schedule Table Component

This component provides a comprehensive interface for managing issue time schedule data with full CRUD operations.

## Features

- 📋 **Data Display**: Comprehensive table showing all issue time schedule information
- 🔍 **Search & Filter**: Real-time search across multiple fields
- ➕ **Add Records**: Modal form for creating new schedule entries
- ✏️ **Edit Records**: Modal form for updating existing entries
- 👁️ **View Details**: Detailed view modal with formatted information
- 🗑️ **Delete Records**: Single and bulk delete operations
- 📄 **Pagination**: Efficient pagination with customizable page sizes
- 🌐 **Internationalization**: Full i18n support
- 📱 **Responsive**: Mobile-friendly design
- ⚡ **Real-time**: Live search and filtering

## Data Structure

The component handles the following data structure:

```typescript
interface IssueTimeScheduleDataType {
  _id?: string;
  key: string;
  section_c: string;          // Section code
  fact_c: string;             // Factory code  
  line_c: string;             // Line code
  prod_no: string;            // Product number
  cusdesch_cd1: string;       // Customer description 1
  cusdesch_cd2: string;       // Customer description 2
  intdesch_cd: string;        // Internal description
  issue_ord_no: string;       // Issue order number
  plan_issue_dt: string;      // Planned issue date/time
  A_reqd_time: string;        // Required time
  time_issue: string;         // Actual issue time
  userid: string;             // User ID
  ent_dt: string;             // Entry date
  upd_dt: string;             // Update date
}
```

## Usage

```tsx
import IssueTimeScheduleTable from "@/components/issue_time_schedule";

function MyPage() {
  return (
    <div>
      <IssueTimeScheduleTable />
    </div>
  );
}
```

## API Endpoints

The component expects the following API endpoints:

- `POST /issue-time-schedule/list` - Get paginated list
- `POST /issue-time-schedule` - Create new record
- `PUT /issue-time-schedule/:id` - Update existing record
- `DELETE /issue-time-schedule/:id` - Delete record

## Translations

Add the following translation keys to your i18n files:

```json
{
  "issue_time_schedule": {
    "table": {
      "title": "Issue Time Schedule",
      "section": "Section",
      "factory": "Factory", 
      "line": "Line",
      "product_no": "Product No.",
      "customer_desc_1": "Customer Desc 1",
      "customer_desc_2": "Customer Desc 2", 
      "internal_desc": "Internal Desc",
      "issue_order_no": "Issue Order No.",
      "plan_issue_date": "Plan Issue Date",
      "required_time": "Required Time",
      "issue_time": "Issue Time",
      "user_id": "User ID",
      "entry_date": "Entry Date",
      "update_date": "Update Date"
    },
    "form": {
      "section": "Section",
      "factory": "Factory",
      "line": "Line", 
      "product_no": "Product Number",
      "customer_desc_1": "Customer Description 1",
      "customer_desc_2": "Customer Description 2",
      "internal_desc": "Internal Description", 
      "issue_order_no": "Issue Order Number",
      "plan_issue_date": "Plan Issue Date",
      "required_time": "Required Time",
      "issue_time": "Issue Time",
      "user_id": "User ID",
      "entry_date": "Entry Date"
    },
    "modal": {
      "add_title": "Add Issue Time Schedule",
      "edit_title": "Edit Issue Time Schedule", 
      "detail_title": "Issue Time Schedule Details"
    }
  }
}
```

## Component Structure

```
issue_time_schedule/
├── index.tsx           # Main table component
├── const.tsx           # Constants, types, and mock data
├── modal_create.tsx    # Add record modal
├── modal_update.tsx    # Edit record modal  
├── modal_detail.tsx    # View details modal
└── README.md          # This file
```

## Dependencies

- React
- Ant Design
- dayjs
- react-i18next
- Lucide React (for icons)

## Mock Data

The component includes mock data for development and testing when the API is not available. This ensures the component works standalone during development.
