
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useLanguage } from "@/contexts/LanguageContext";
import { WarehouseArea, Rack } from "@/data/warehouseData";

interface Warehouse2DViewProps {
  area: WarehouseArea;
  racks: Rack[];
  highlightedRack: string | null;
  hoveredRack: string | null;
  onRackClick: (rackId: string) => void;
  onRackHover: (rackId: string | null) => void;
}

// Mock item data for hover display
const getRandomItems = (rack: Rack) => {
  if (rack.status === 'empty') return [];
  
  const itemTypes = ["Electronics", "Furniture", "Clothing", "Tools", "Food", "Books"];
  const count = Math.floor(Math.random() * 3) + 1;
  
  return Array.from({ length: count }).map((_, i) => ({
    id: `item-${rack.id}-${i}`,
    name: `${itemTypes[Math.floor(Math.random() * itemTypes.length)]} Item ${i+1}`,
    quantity: Math.floor(Math.random() * 10) + 1,
    status: Math.random() > 0.2 ? "In Stock" : "Low Stock"
  }));
};

// Group racks by their rack identifier (first part of locationCode)
const groupRacksByIdentifier = (racks: Rack[]) => {
  const groups = new Map<string, Rack[]>();
  
  racks.forEach(rack => {
    // Extract rack identifier from locationCode (e.g., "A01" -> "A")
    const identifier = rack.locationCode.charAt(0);
    if (!groups.has(identifier)) {
      groups.set(identifier, []);
    }
    groups.get(identifier)!.push(rack);
  });
  
  return groups;
};

const RackGrid: React.FC<{
  rackId: string;
  racks: Rack[];
  highlightedRack: string | null;
  hoveredRack: string | null;
  onRackClick: (rackId: string) => void;
  onRackHover: (rackId: string | null) => void;
}> = ({ rackId, racks, highlightedRack, hoveredRack, onRackClick, onRackHover }) => {
  const { t } = useLanguage();
  
  // Get the maximum row and column for this rack group
  const maxRow = Math.max(...racks.map(r => r.row), 0);
  const maxCol = Math.max(...racks.map(r => r.column), 0);
  
  // Create a grid map for quick lookup
  const rackGrid = new Map<string, Rack>();
  racks.forEach(rack => {
    rackGrid.set(`${rack.row}-${rack.column}`, rack);
  });

  const getRackStatusColor = (status: string) => {
    switch (status) {
      case 'occupied': return 'bg-blue-500/80 text-white';
      case 'empty': return 'bg-gray-100/80 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
      case 'maintenance': return 'bg-red-500/80 text-white';
      case 'reserved': return 'bg-yellow-500/80 text-white';
      default: return 'bg-gray-100/80 text-gray-600';
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Rack {rackId}</CardTitle>
        <div className="text-sm text-muted-foreground">
          {racks.length} positions • {maxRow} rows × {maxCol} columns
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {Array.from({ length: maxRow }, (_, rowIndex) => {
            const row = rowIndex + 1;
            return (
              <div key={`row-${row}`} className="flex items-center gap-2">
                <div className="text-xs font-medium text-muted-foreground w-8">
                  R{row}
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: maxCol }, (_, colIndex) => {
                    const col = colIndex + 1;
                    const rack = rackGrid.get(`${row}-${col}`);
                    
                    if (!rack) {
                      return (
                        <div 
                          key={`${row}-${col}`} 
                          className="w-10 h-10 border border-dashed border-gray-300 rounded flex items-center justify-center text-xs text-gray-400"
                        >
                          -
                        </div>
                      );
                    }

                    const isHighlighted = highlightedRack === rack.id;
                    const isHovered = hoveredRack === rack.id;
                    const storedItems = getRandomItems(rack);
                    
                    return (
                      <HoverCard key={rack.id}>
                        <HoverCardTrigger asChild>
                          <button
                            className={`
                              w-10 h-10 flex items-center justify-center text-xs font-medium
                              transition-all duration-200 ease-in-out rounded border
                              ${getRackStatusColor(rack.status)}
                              ${isHighlighted || isHovered ? 'ring-2 ring-warehouse-highlight scale-105 z-10 shadow-md' : 'ring-1 ring-gray-200 dark:ring-gray-700'}
                              hover:shadow-md relative
                            `}
                            onClick={() => onRackClick(rack.id)}
                            onMouseEnter={() => onRackHover(rack.id)}
                            onMouseLeave={() => onRackHover(null)}
                          >
                            <span className="z-10">{col}</span>
                          </button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-64 p-0">
                          <div className="bg-warehouse-primary text-white px-3 py-2 text-sm font-medium rounded-t-md">
                            {rack.locationCode} - Level {rack.level}
                          </div>
                          <div className="p-3 dark:bg-gray-800">
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Status:</span>
                                <Badge variant={rack.status === 'occupied' ? 'default' : 'secondary'}>
                                  {rack.status}
                                </Badge>
                              </div>
                              <div className="flex justify-between">
                                <span>Capacity:</span>
                                <span>{rack.capacity}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Current Load:</span>
                                <span>{rack.currentLoad}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Utilization:</span>
                                <span>{Math.round((rack.currentLoad / rack.capacity) * 100)}%</span>
                              </div>
                              <div className="text-xs text-gray-500">
                                Dimensions: {rack.dimensions.width}×{rack.dimensions.height}×{rack.dimensions.depth}m
                              </div>
                            </div>
                            
                            {rack.status === 'occupied' && storedItems.length > 0 && (
                              <>
                                <hr className="my-2" />
                                <h5 className="font-medium mb-2 text-sm">{t('stored_items')}:</h5>
                                <div className="space-y-1">
                                  {storedItems.slice(0, 3).map(item => (
                                    <div key={item.id} className="flex justify-between text-xs border-b pb-1">
                                      <span>{item.name}</span>
                                      <div className="flex gap-2">
                                        <span className="text-gray-500 dark:text-gray-400">Qty: {item.quantity}</span>
                                        <span className={item.status === "In Stock" ? "text-green-500" : "text-amber-500"}>
                                          {item.status}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

const Warehouse2DView: React.FC<Warehouse2DViewProps> = ({
  area,
  racks,
  highlightedRack,
  hoveredRack,
  onRackClick,
  onRackHover,
}) => {
  const { t } = useLanguage();
  
  // Group racks by their identifier
  const rackGroups = groupRacksByIdentifier(racks);

  return (
    <div className="space-y-4">
      {/* Area Header */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span>{area.name}</span>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{area.type}</Badge>
              <Badge variant={area.status === 'active' ? 'default' : 'secondary'}>
                {area.status}
              </Badge>
            </div>
          </CardTitle>
          <p className="text-sm text-muted-foreground">{area.description}</p>
          <div className="text-sm">
            Utilization: {area.currentUtilization}/{area.capacity} ({Math.round((area.currentUtilization / area.capacity) * 100)}%)
          </div>
        </CardHeader>
        <CardContent>
          {/* Legend */}
          <div className="flex flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Occupied</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-300 rounded"></div>
              <span>Empty</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Maintenance</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span>Reserved</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rack Grids */}
      <div className="space-y-4">
        {Array.from(rackGroups.entries()).map(([rackId, rackList]) => (
          <RackGrid
            key={rackId}
            rackId={rackId}
            racks={rackList}
            highlightedRack={highlightedRack}
            hoveredRack={hoveredRack}
            onRackClick={onRackClick}
            onRackHover={onRackHover}
          />
        ))}
      </div>
    </div>
  );
};

export default Warehouse2DView;
