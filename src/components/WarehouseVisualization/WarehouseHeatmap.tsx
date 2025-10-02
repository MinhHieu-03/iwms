
import React from "react";
import { WarehouseSection } from "@/lib/mock-data";

interface WarehouseHeatmapProps {
  sections: WarehouseSection[];
}

export const WarehouseHeatmap: React.FC<WarehouseHeatmapProps> = ({ sections }) => {
  // Generate color based on occupancy percentage with modern colors
  const getHeatColor = (occupancy: number) => {
    // Modern color gradient
    if (occupancy < 20) return "bg-indigo-100";
    if (occupancy < 40) return "bg-blue-200";
    if (occupancy < 60) return "bg-teal-300";
    if (occupancy < 80) return "bg-amber-300";
    return "bg-rose-300";
  };
  
  const getOpacity = (occupancy: number) => {
    return (occupancy / 100) * 0.9 + 0.1; // Min opacity 0.1, max 1.0
  };
  
  return (
    <div className="p-4 overflow-auto max-h-[400px]">
      {sections.map((section, sectionIndex) => {
        // Change from Section to Shelf
        const shelfName = `Shelf ${String.fromCharCode(65 + sectionIndex)}`;
        
        return (
          <div key={section.id} className="mb-8 bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-md font-medium mb-3 text-warehouse-primary">{shelfName}</h3>
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
                    className={`h-6 rounded-md ${getHeatColor(cellOccupancy)} hover:brightness-110 transition-all`}
                    style={{ 
                      opacity: getOpacity(cellOccupancy),
                    }}
                    title={`Row ${row+1}, Col ${col+1}: ${Math.round(cellOccupancy)}% occupied`}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
