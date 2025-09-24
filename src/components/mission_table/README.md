# Mission Table Component

This component provides a comprehensive interface for managing missions in the IWMS system.

## Features

- **Data Display**: Shows mission data in a table format with sortable and filterable columns
- **Search & Filter**: Search by mission code, robot code, origin, destination, or description. Filter by state and type
- **CRUD Operations**: Create, read, update, and delete missions
- **Modal Views**: Detailed modals for creating, editing, and viewing mission details
- **Status Timeline**: Visual timeline showing mission status history
- **Export Functionality**: Export mission data to Excel
- **Mock Data Support**: Falls back to mock data when API is unavailable

## Data Structure

The mission table displays the following information:

- **Mission Code**: Unique identifier for the mission
- **Robot Code**: Code of the robot assigned to the mission
- **Origin/Destination**: Source and target locations
- **Type**: Mission type (Inbound, Outbound, Internal, Back to WHS, Transfer Gate)
- **State**: Current mission state (New, Processing, Done, Error, Done Picking)
- **Bin ID**: Associated bin identifier
- **Inventory**: Material information with quantities
- **Description**: Mission description
- **ETA**: Estimated time of arrival
- **Status History**: Timeline of status changes

## States

### Mission States
- `NEW`: Mission created but not started
- `PROCESSING`: Mission is currently being executed
- `DONE`: Mission completed successfully
- `ERROR`: Mission encountered an error
- `DONE_PICKING`: Mission picking phase completed

### Mission Types
- `INBOUND`: Incoming materials to warehouse
- `OUTBOUND`: Materials leaving warehouse
- `INTERNAL`: Internal warehouse operations
- `BACK_WHS`: Return to main warehouse
- `TRANSFER_GATE`: Transfer to gate for pickup

## Files

- `index.tsx`: Main table component with data management
- `const.tsx`: Data types, column definitions, and mock data
- `modal_create.tsx`: Modal for creating new missions
- `modal_update.tsx`: Modal for editing existing missions
- `modal_detail.tsx`: Modal for viewing mission details

## Usage

```tsx
import MissionTable from "@/components/mission_table";

const MissionPage = () => {
  return <MissionTable />;
};
```

## API Endpoints

The component expects the following API endpoints:

- `POST /mission/list`: List missions with pagination and filters
- `POST /mission`: Create new mission
- `PATCH /mission/:id`: Update existing mission
- `DELETE /mission`: Delete missions (batch operation)

## Mock Data

When API endpoints are not available, the component automatically falls back to mock data for development and testing purposes.