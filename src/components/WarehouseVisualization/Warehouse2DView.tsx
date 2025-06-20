import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Map as MapIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { WarehouseArea, Rack } from '@/data/warehouseData';
import { use } from 'i18next';
import apiClient from '@/lib/axios';
import { Button } from 'antd';
import {get} from 'lodash';
import RackConfigurationModal from './RackConfigurationModal';
interface Warehouse2DViewProps {
  area: string;
  // racks: Rack[];
  hoveredRack: string | null;
  onRackHover: (rackId: string | null) => void;
}

// Group racks by their rack identifier (first part of locationCode)
const groupRacksByIdentifier = (racks: Rack[]) => {
  const groups = new Map<string, Rack[]>();

  racks.forEach((rack) => {
    // Extract rack identifier from locationCode (e.g., "A01-01" -> "A")
    const identifier = rack.locationCode.charAt(0);
    if (!groups.has(identifier)) {
      groups.set(identifier, []);
    }
    groups.get(identifier)!.push(rack);
  });

  return groups;
};

const RackGrid: React.FC<{
  rackId: string; // reack code, e.g., "A01-01"
  racks: Rack[]; // List of racks in this group
  area?: string; // id of area_config
  hoveredRack: string | null;
  onRackHover: (rackId: string | null) => void;
}> = ({
  rackId,
  racks,
  area,
  // highlightedRack,
  hoveredRack,
  // onRackClick,
  onRackHover,
}) => {
  const { t } = useTranslation();
  const [highlightedRack, setHighlightedRack] = React.useState<string[]>([]);
  const [showConfigure, setShowConfigure] = React.useState([]);

  const maxRow = Math.max(...racks.map((r) => r.row), 0);
  const maxCol = Math.max(...racks.map((r) => r.column), 0);
  const rackGrid = new Map<string, Rack>();
  const rackIdentifier = get(racks[0], '_id', '');
  racks.forEach((rack) => {
    rackGrid.set(`${rack.row}-${rack.column}`, rack);
  });

  // action
  const onRackClick = (rackId: string) => {
    console.log('Rack clicked:', rackId, highlightedRack);
    setHighlightedRack((prev) =>
      prev.includes(rackId)
        ? prev.filter((id) => id !== rackId)
        : [...prev, rackId]
    );
  };

  const getRackStatusColor = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'bg-blue-500/80 text-white';
      case 'empty':
        return 'bg-gray-100/80 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
      case 'maintenance':
        return 'bg-red-500/80 text-white';
      case 'reserved':
        return 'bg-yellow-500/80 text-white';
      default:
        return 'bg-gray-100/80 text-gray-600';
    }
  };
  const handleConfigureRack = () => {
    setShowConfigure(highlightedRack);
    // Handle rack configuration logic here, e.g., open a modal or navigate to a configuration page
  };
  return (
    <Card className='mb-4'>
      <CardHeader className='pb-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <CardTitle className='text-lg'>Rack {rackId}</CardTitle>
            <div className='text-sm text-muted-foreground'>
              ({racks.length} positions • {maxRow} rows × {maxCol} columns)
            </div>
          </div>
          <div>
            {highlightedRack.length ? (
              <Button onClick={handleConfigureRack}>
                {t('configure_rack')}
              </Button>
            ) : null}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          {Array.from({ length: maxRow }, (_, rowIndex) => {
            const row = rowIndex + 1;
            return (
              <div
                key={`row-${row}-${highlightedRack.length}`}
                className='flex items-center gap-2'
              >
                <div className='text-xs font-medium text-muted-foreground w-8'>
                  R{row}
                </div>
                <div className='flex gap-1'>
                  {Array.from({ length: maxCol }, (_, colIndex) => {
                    const col = colIndex + 1;
                    const rack = rackGrid.get(`${row}-${col}`);

                    if (!rack) {
                      return (
                        <div
                          key={`${row}-${col}`}
                          className='w-10 h-10 border border-dashed border-gray-300 rounded flex items-center justify-center text-xs text-gray-400'
                        >
                          -
                        </div>
                      );
                    }

                    const isHighlighted = highlightedRack.includes(rack.id);
                    const isHovered = hoveredRack === rack.id;
                    const storedItems = rack.storedItems || [];

                    return (
                      <HoverCard key={rack.id}>
                        <HoverCardTrigger asChild>
                          <button
                            className={`
                              w-10 h-10 flex items-center justify-center text-xs font-medium
                              transition-all duration-200 ease-in-out rounded border
                              ${getRackStatusColor(rack.status)}
                              ${
                                isHighlighted || isHovered
                                  ? 'ring-2 ring-warehouse-highlight scale-105 z-10 shadow-md'
                                  : 'ring-1 ring-gray-200 dark:ring-gray-700'
                              }
                              hover:shadow-md relative
                            `}
                            onClick={() => onRackClick(rack.id)}
                            onMouseEnter={() => onRackHover(rack.id)}
                            onMouseLeave={() => onRackHover(null)}
                          >
                            <span className='z-10'>{col}</span>
                          </button>
                        </HoverCardTrigger>
                        <HoverCardContent className='w-80 p-0'>
                          <div className='bg-warehouse-primary text-white px-3 py-2 text-sm font-medium rounded-t-md'>
                            {rack.locationCode} - Level {rack.level}
                          </div>
                          <div className='p-3 dark:bg-gray-800'>
                            <div className='space-y-2 text-sm'>
                              <div className='flex justify-between'>
                                <span>Status:</span>
                                <Badge
                                  variant={
                                    rack.status === 'occupied'
                                      ? 'default'
                                      : 'secondary'
                                  }
                                >
                                  {rack.status}
                                </Badge>
                              </div>
                              <div className='flex justify-between'>
                                <span>Capacity:</span>
                                <span>{rack.capacity}</span>
                              </div>
                              <div className='flex justify-between'>
                                <span>Current Load:</span>
                                <span>{rack.currentLoad}</span>
                              </div>
                              <div className='flex justify-between'>
                                <span>Utilization:</span>
                                <span>
                                  {Math.round(
                                    (rack.currentLoad / rack.capacity) * 100
                                  )}
                                  %
                                </span>
                              </div>
                              {/* <div className='text-xs text-gray-500'>
                                Dimensions: {rack.dimensions.width.toFixed(1)}×
                                {rack.dimensions.height.toFixed(1)}×
                                {rack.dimensions.depth.toFixed(1)}m
                              </div> */}
                            </div>

                            {rack.status === 'occupied' &&
                              storedItems.length > 0 && (
                                <>
                                  <hr className='my-2' />
                                  <h5 className='font-medium mb-2 text-sm'>
                                    {t('stored_items')}:
                                  </h5>
                                  <div className='space-y-1'>
                                    {storedItems.slice(0, 3).map((item) => (
                                      <div
                                        key={item.id}
                                        className='flex justify-between text-xs border-b pb-1'
                                      >
                                        <div className='flex flex-col'>
                                          <span className='font-medium'>
                                            {item.sku}
                                          </span>
                                          <span className='text-gray-500 dark:text-gray-400'>
                                            {item.productName}
                                          </span>
                                        </div>
                                        <div className='flex flex-col items-end'>
                                          <span className='text-gray-500 dark:text-gray-400'>
                                            Qty: {item.quantity}
                                          </span>
                                          <span
                                            className={
                                              item.status === 'stored'
                                                ? 'text-green-500'
                                                : item.status === 'picked'
                                                ? 'text-orange-500'
                                                : 'text-blue-500'
                                            }
                                          >
                                            {item.status}
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                    {storedItems.length > 3 && (
                                      <div className='text-xs text-gray-500 text-center pt-1'>
                                        +{storedItems.length - 3} more items
                                      </div>
                                    )}
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
      <RackConfigurationModal
        area={area}
        rackIdentifier={rackIdentifier}
        open={showConfigure.length > 0}
        selectedRacks={showConfigure}
        onCancel={() => setShowConfigure([])}
        onSubmit={(selectedRacks) => {
          console.log('Configuring racks:', selectedRacks);
          setShowConfigure([]);
        }}
        onInactive={(selectedRacks) => {
          console.log('Setting racks inactive:', selectedRacks);
          setShowConfigure([]);
        }}
      />
    </Card>
  );
};

const Warehouse2DView: React.FC<Warehouse2DViewProps> = ({
  area,
  hoveredRack,
  onRackHover,
}) => {
  const { t } = useTranslation();
  const [rackGroups, setRackGroups] = React.useState(new Map<string, Rack[]>());
  useEffect(() => {
    apiClient
      .get('/area', {
        area_config: area,
      })
      .then(({ data }) => {
        const convertData = {};
        data.metaData.map((item: Rack) => {
          const { row, column, location_code, _id } = item;
          const list = [];
          for (let i = 1; i <= row; i++) {
            for (let j = 1; j <= column; j++) {
              const locationCode = `${location_code}/${i
                .toString()
                .padStart(2, '0')}-${j.toString().padStart(2, '0')}`;
              list.push({
                _id: _id,
                areaId: locationCode,
                capacity: row * column,
                column: j,
                createdAt: '2024-01-14T17:00:00.000Z',
                currentLoad: 71,
                id: locationCode,
                level: 1,
                locationCode: locationCode,
                row: i,
                status: 'empty',
                warehouse: 'Main',
              });
            }
          }
          convertData[item.location_code] = list;
        });
        setRackGroups(new Map(Object.entries(convertData)));
      })
      .catch((error) => {
        console.error('Error fetching area data:', error);
      });
  }, [area]);

  return (
    <div className='space-y-4'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='flex items-center gap-2'>
            <MapIcon className='h-5 w-5' />
            2D Warehouse View
          </CardTitle>

          <div className='flex flex-wrap gap-2 text-xs'>
            <div className='flex items-center gap-1'>
              <div className='w-3 h-3 bg-blue-500 rounded'></div>
              <span>Occupied</span>
            </div>
            <div className='flex items-center gap-1'>
              <div className='w-3 h-3 bg-gray-300 rounded'></div>
              <span>Empty</span>
            </div>
            <div className='flex items-center gap-1'>
              <div className='w-3 h-3 bg-red-500 rounded'></div>
              <span>Maintenance</span>
            </div>
            <div className='flex items-center gap-1'>
              <div className='w-3 h-3 bg-yellow-500 rounded'></div>
              <span>Reserved</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <div className='space-y-4'>
        {Array.from(rackGroups.entries()).map(([rackId, rackList]) => (
          <RackGrid
            area={area}
            key={rackId}
            rackId={rackId}
            racks={rackList}
            hoveredRack={hoveredRack}
            onRackHover={onRackHover}
          />
        ))}
      </div>
    </div>
  );
};

export default Warehouse2DView;
