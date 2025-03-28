
import React from "react";
import { WarehouseSection } from "@/lib/mock-data";

interface WarehouseHeatmapProps {
  sections: WarehouseSection[];
}

export const WarehouseHeatmap: React.FC<WarehouseHeatmapProps> = ({ sections }) => {
  // Generate color based on occupancy percentage
  const getHeatColor = (occupancy: number) => {
    // Color gradient from green (low occupancy) to red (high occupancy)
    if (occupancy < 30) return "bg-green-100";
    if (occupancy < 50) return "bg-green-300";
    if (occupancy < 70) return "bg-yellow-300";
    if (occupancy < 85) return "bg-orange-300";
    return "bg-red-300";
  };
  
  const getOpacity = (occupancy: number) => {
    return (occupancy / 100) * 0.9 + 0.1; // Min opacity 0.1, max 1.0
  };
  
  return (
    <div className="p-4">
      {sections.map((section) => (
        <div key={section.id} className="mb-6">
          <h3 className="text-md font-medium mb-2">{section.name}</h3>
          <div 
            className="grid gap-1" 
            style={{ 
              gridTemplateColumns: `repeat(${section.columns}, minmax(20px, 1fr))`,
              gridTemplateRows: `repeat(${section.rows}, 1fr)`
            }}
          >
            {Array.from({ length: section.rows * section.columns }).map((_, i) => {
              const row = Math.floor(i / section.columns);
              const col = i % section.columns;
              // Determine cell occupancy - for heatmap we'll use section occupancy 
              // and distance from center to create a realistic heat pattern
              const centerRow = Math.floor(section.rows / 2);
              const centerCol = Math.floor(section.columns / 2);
              const distanceFromCenter = Math.sqrt(
                Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2)
              );
              const maxDistance = Math.sqrt(
                Math.pow(section.rows, 2) + Math.pow(section.columns, 2)
              ) / 2;
              const normalizedDistance = 1 - (distanceFromCenter / maxDistance);
              
              // Occupancy is higher near the center and influenced by section's overall occupancy
              const cellOccupancy = Math.min(100, section.occupancy * normalizedDistance * 1.5);
              
              return (
                <div 
                  key={`${section.id}-${row}-${col}`} 
                  className={`h-6 rounded-sm ${getHeatColor(cellOccupancy)} hover:opacity-80`}
                  style={{ 
                    opacity: getOpacity(cellOccupancy),
                  }}
                  title={`Row ${row+1}, Col ${col+1}: ${Math.round(cellOccupancy)}% occupied`}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
