import { Rack } from "@/data/warehouseData";

export interface Warehouse2DViewProps {
  area: string;
  hoveredRack: string | null;
  onRackHover: (rackId: string | null) => void;
}

export interface RackGridProps {
  index: number;
  rackId: string;
  racks: Rack[];
  area?: string;
  hoveredRack: string | null;
  onRackHover: (rackId: string | null) => void;
}

export interface RackContentProps {
  rack: any; // TODO: Define proper rack interface with all properties
}

export interface RackCellProps {
  rack: any;
  isHighlighted: boolean;
  onRackClick: (rackId: string) => void;
  getRackStatusColor: (locationData: any, configured: boolean) => string;
  locationData: any;
  col: number;
}
