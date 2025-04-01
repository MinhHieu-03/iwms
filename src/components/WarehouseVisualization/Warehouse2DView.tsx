
import React from "react";
import { WarehouseSection } from "@/lib/mock-data";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useLanguage } from "@/contexts/LanguageContext";

interface Warehouse2DViewProps {
  sections: WarehouseSection[];
  highlightedShelf: string | null;
  onShelfClick: (shelfId: string) => void;
}

// Mock item data for hover display
const getRandomItems = (shelfId: string, isOccupied: boolean) => {
  if (!isOccupied) return [];
  
  const itemTypes = ["Electronics", "Furniture", "Clothing", "Tools", "Food", "Books"];
  const count = Math.floor(Math.random() * 3) + 1;
  
  return Array.from({ length: count }).map((_, i) => ({
    id: `item-${shelfId}-${i}`,
    name: `${itemTypes[Math.floor(Math.random() * itemTypes.length)]} Item ${i+1}`,
    quantity: Math.floor(Math.random() * 10) + 1,
    status: Math.random() > 0.2 ? "In Stock" : "Low Stock"
  }));
};

const Warehouse2DView: React.FC<Warehouse2DViewProps> = ({
  sections,
  highlightedShelf,
  onShelfClick,
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="p-4 h-full overflow-auto">
      <div className="space-y-8">
        {sections.map((section, sectionIndex) => {
          // Change from Section to Shelf
          const shelfName = `${t('shelf')} ${String.fromCharCode(65 + sectionIndex)}`;
          
          return (
          <div key={section.id} className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm">
            <h4 className="text-lg font-medium mb-3 text-warehouse-primary">{shelfName}</h4>
            <div className="grid grid-cols-1 gap-4">
              {/* Each row represents a physical row of shelves */}
              {Array.from({ length: section.rows }).map((_, row) => (
                <div key={`row-${row}`} className="flex items-center gap-2">
                  <div className="text-xs font-medium text-muted-foreground w-6">
                    {t('row')}{row + 1}
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
                      const storedItems = getRandomItems(shelfId, isOccupied);
                      
                      return (
                        <HoverCard key={shelfId}>
                          <HoverCardTrigger asChild>
                            <button
                              className={`
                                aspect-square flex items-center justify-center text-xs font-medium
                                transition-all duration-200 ease-in-out
                                ${isOccupied ? 'bg-warehouse-secondary/80 text-white' : 'bg-gray-100/80 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}
                                ${isHighlighted ? 'ring-2 ring-warehouse-highlight scale-105 z-10' : 'ring-1 ring-gray-200 dark:ring-gray-700'}
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
                          </HoverCardTrigger>
                          <HoverCardContent className="w-64 p-0">
                            <div className="bg-warehouse-primary text-white px-3 py-2 text-sm font-medium rounded-t-md">
                              {shelfId}
                            </div>
                            <div className="p-3 dark:bg-gray-800">
                              {isOccupied ? (
                                <>
                                  <h5 className="font-medium mb-2">{t('stored_items')}:</h5>
                                  <div className="space-y-2">
                                    {storedItems.map(item => (
                                      <div key={item.id} className="flex justify-between text-sm border-b pb-1">
                                        <span>{item.name}</span>
                                        <div className="flex gap-2">
                                          <span className="text-gray-500 dark:text-gray-400">{t('quantity')}: {item.quantity}</span>
                                          <span className={item.status === "In Stock" ? "text-green-500" : "text-amber-500"}>
                                            {item.status === "In Stock" ? t('in_stock') : t('low_stock')}
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </>
                              ) : (
                                <div className="py-2 text-center text-gray-500 dark:text-gray-400">
                                  {t('no_items_stored')}
                                </div>
                              )}
                              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                {t('occupancy')}: {Math.round(isOccupied ? 70 + Math.random() * 30 : Math.random() * 10)}%
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
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
