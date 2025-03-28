
import React from "react";
import { WarehouseSection } from "@/lib/mock-data";

interface Warehouse2DViewProps {
  sections: WarehouseSection[];
  highlightedShelf: string | null;
  onShelfClick: (shelfId: string) => void;
}

const Warehouse2DView: React.FC<Warehouse2DViewProps> = ({
  sections,
  highlightedShelf,
  onShelfClick,
}) => {
  return (
    <div className="p-4 h-full overflow-auto">
      <div className="space-y-8">
        {sections.map((section, sectionIndex) => {
          // Change from Section to Shelf
          const shelfName = `Shelf ${String.fromCharCode(65 + sectionIndex)}`;
          
          return (
          <div key={section.id} className="border rounded-lg p-4 bg-white shadow-sm">
            <h4 className="text-lg font-medium mb-3 text-warehouse-primary">{shelfName}</h4>
            <div className="grid grid-cols-1 gap-4">
              {/* Each row represents a physical row of shelves */}
              {Array.from({ length: section.rows }).map((_, row) => (
                <div key={`row-${row}`} className="flex items-center gap-2">
                  <div className="text-xs font-medium text-muted-foreground w-6">
                    R{row + 1}
                  </div>
                  <div className="flex-1 grid" style={{ 
                    gridTemplateColumns: `repeat(${section.columns}, minmax(40px, 1fr))`,
                    gap: '8px'
                  }}>
                    {Array.from({ length: section.columns }).map((_, col) => {
                      // Change the shelfId format to include the shelf letter
                      const shelfId = `${shelfName}-${row + 1}-${col + 1}`;
                      const occupancyFactor = section.occupancy / 100;
                      const isOccupied = Math.random() < occupancyFactor;
                      const isHighlighted = highlightedShelf === shelfId;
                      
                      return (
                        <button
                          key={shelfId}
                          className={`
                            aspect-square flex items-center justify-center text-xs font-medium
                            transition-all duration-200 ease-in-out
                            ${isOccupied ? 'bg-warehouse-secondary/80 text-white' : 'bg-gray-100/80 text-gray-600'}
                            ${isHighlighted ? 'ring-2 ring-warehouse-highlight scale-105 z-10' : 'ring-1 ring-gray-200'}
                            ${isHighlighted ? 'shadow-md' : ''}
                            hover:shadow-md rounded-md relative
                          `}
                          onClick={() => onShelfClick(shelfId)}
                        >
                          {/* Visual indication of a shelf */}
                          <div className="absolute inset-0 flex flex-col">
                            <div className="border-b border-gray-300/40 flex-1"></div>
                            <div className="border-b border-gray-300/40 flex-1"></div>
                            <div className="flex-1"></div>
                          </div>
                          <span className="z-10">{col + 1}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )})}
      </div>
    </div>
  );
};

export default Warehouse2DView;
