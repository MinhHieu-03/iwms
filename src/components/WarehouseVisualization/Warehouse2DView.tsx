
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
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.id} className="border rounded-lg p-4 bg-white shadow-sm">
            <h4 className="text-lg font-medium mb-3">{section.name}</h4>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid" style={{ 
                gridTemplateColumns: `repeat(${section.columns}, minmax(40px, 1fr))`,
                gap: '4px'
              }}>
                {Array.from({ length: section.rows }).map((_, row) =>
                  Array.from({ length: section.columns }).map((_, col) => {
                    const shelfId = `${section.id}-${row + 1}-${col + 1}`;
                    const occupancyFactor = section.occupancy / 100;
                    const isOccupied = Math.random() < occupancyFactor;
                    const isHighlighted = highlightedShelf === shelfId;
                    
                    return (
                      <button
                        key={shelfId}
                        className={`
                          aspect-square flex items-center justify-center text-xs font-medium
                          transition-all duration-200 ease-in-out
                          ${isOccupied ? 'bg-warehouse-secondary text-white' : 'bg-gray-100 text-gray-600'}
                          ${isHighlighted ? 'ring-2 ring-warehouse-highlight scale-105' : 'ring-1 ring-gray-200'}
                          ${isHighlighted ? 'shadow-md' : ''}
                          hover:shadow-md rounded-md
                        `}
                        onClick={() => onShelfClick(shelfId)}
                      >
                        {row + 1}-{col + 1}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Warehouse2DView;
