import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Map as MapIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { WarehouseArea, Rack } from '@/data/warehouseData';
import apiClient from '@/lib/axios';
import { Button, Popover, Skeleton } from 'antd';
import { get, keyBy } from 'lodash';
import RackConfigurationModal from './RackConfigurationModal';
import { useQuery } from '@tanstack/react-query';

export const STATUS_LOCATION = {
  AVAILABLE: "available",
  UNAVAILABLE: "unavailable",
  DISABLED: "disable",
  FILL: "fill",
  WAIT_FILL: "wait_fill",
  WAIT_OUTBOUND: "wait_outbound",
  configured: "configured",
};

export const STATUS_COLOR = {
  [STATUS_LOCATION.AVAILABLE]: "bg-gray-100",
  [STATUS_LOCATION.UNAVAILABLE]: "bg-gray-700",
  [STATUS_LOCATION.DISABLED]: "bg-red-500",
  [STATUS_LOCATION.FILL]: "bg-blue-500",
  [STATUS_LOCATION.WAIT_FILL]: "bg-yellow-300",
  [STATUS_LOCATION.WAIT_OUTBOUND]: "bg-green-300",
  [STATUS_LOCATION.configured]: "bg-gray-400",
};
interface Warehouse2DViewProps {
  area: string;
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
  index: number; // Index of the rack group
  rackId: string; // reack code, e.g., "A01-01"
  racks: Rack[]; // List of racks in this group
  area?: string; // id of area_config
  hoveredRack: string | null;
  onRackHover: (rackId: string | null) => void;
}> = ({
  rackId,
  racks,
  area,
  index,
}) => {
    const { t } = useTranslation();
    const [highlightedRack, setHighlightedRack] = React.useState<string[]>([]);
    const [showConfigure, setShowConfigure] = React.useState([]);
    const [show, setShow] = React.useState(false);

    const maxRow = Math.max(...racks.map((r) => r.row), 0);
    const maxCol = Math.max(...racks.map((r) => r.column), 0);
    const rackIdentifier = get(racks[0], '_id', '');


    const rackGrid = new Map<string, Rack>();
    racks.forEach((rack) => {
      rackGrid.set(rack.locationCode, rack);
    });

    const {
      data: locationData,
      isLoading: isLocationLoading,
      error: locationError,
    } = useQuery({
      queryKey: ['location-area', rackIdentifier],
      queryFn: async () => {
        console.log('Fetching location data for rack:', rackIdentifier);
        const { data } = await apiClient.get(`/location/area/${rackIdentifier}`);
        return keyBy(data.metaData, 'code');
      },
      enabled: open && !!rackIdentifier, // Only fetch when modal is open and rackIdentifier exists
      refetchInterval: 10 * 1000,
    });
    // action
    const onRackClick = (rackId: string) => {
      setHighlightedRack((prev) =>
        prev.includes(rackId)
          ? prev.filter((id) => id !== rackId)
          : [...prev, rackId]
      );
    };

    const getRackStatusColor = (locationData, configured) => {
      const stt = locationData?.status || 'available';
      if(configured && stt === STATUS_LOCATION.AVAILABLE) return 'bg-gray-400';
      console.log('getRackStatusColor:', stt, STATUS_COLOR[stt], locationData);
      if(STATUS_COLOR[stt]) {
        return STATUS_COLOR[stt] || 'bg-black-100';
      }
      return 'bg-black-100'; // Default color if status is not recognized
      // switch (stt) {
      //   case STATUS_LOCATION.FILL:
      //     return 'bg-blue-500/80 text-white';
      //   case STATUS_LOCATION.AVAILABLE:
      //     return 'bg-gray-100/80 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
      //   case STATUS_LOCATION.UNAVAILABLE:
      //     return 'bg-red-500/80 text-white';
      //   case STATUS_LOCATION.WAIT_FILL:
      //     return 'bg-yellow-500/80 text-white';
      //   default:
      //     return 'bg-gray-100/80 text-gray-600';
      // }
    };
    const handleConfigureRack = () => {
      setShowConfigure(highlightedRack);
      // Handle rack configuration logic here, e.g., open a modal or navigate to a configuration page
    };

    useEffect(() => {
      setTimeout(() => {
        setShow(true);
      }, 2000 * index); // Simulate a delay for the index to be set
    }, [index]);
    if (!show) {
      return <Skeleton />; // Don't render anything until show is true
    }
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
                      const cellId = `${rackId}/${row.toString().padStart(2, '0')}-${col.toString().padStart(2, '0')}`;
                      const rackData = rackGrid.get(cellId);
                      const ractStt = get(locationData, cellId, { status: 'available' });
                      if(ractStt.status === 'available' && rackData?.skus?.length) {
                        ractStt.status = STATUS_LOCATION.configured;
                      }
                      const rack = {
                        ...rackData,
                        ...ractStt,
                      }
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
                      return (
                        <Popover content={<Content rack={rack} />} key={`${rack.id}-${row}-${col}`}>
                          <button
                            className={`
                              w-10 h-10 flex items-center justify-center text-xs font-medium
                              transition-all duration-200 ease-in-out rounded border
                              ${getRackStatusColor(locationData?.[rack.locationCode], rack?.skus?.length)}
                              ${isHighlighted
                                ? 'ring-2 ring-warehouse-highlight scale-105 z-10 shadow-md'
                                : 'ring-1 ring-gray-200 dark:ring-gray-700'
                              }
                              hover:shadow-md relative
                            `}
                            onClick={() => onRackClick(rack.id)}
                          >
                            <span className='z-10'>{col}</span>
                          </button>
                        </Popover>
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
            setHighlightedRack([]);
          }}
          onInactive={(selectedRacks) => {
            console.log('Setting racks inactive:', selectedRacks);
            setShowConfigure([]);
            setHighlightedRack([]);
          }}
        />
      </Card>
    );
  };

const Content = ({ rack }) => {
  console.log('Rack_content:', rack);
  return (
    <div className='w-80 p-0'>
      <div className='bg-warehouse-primary text-white px-3 py-2 text-sm font-medium rounded-md'>
        {rack.locationCode}
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
              <span className='capitalize'>{rack.status.replace('_', ' ')}</span>
            </Badge>
          </div>
          {/* skus */}
          {rack?.skus?.length ? <div className='flex justify-between'>
            <span>SKU config:</span>
            <span>{rack.skus.join(', ')}</span>
          </div>: null}
          {rack?.inventory?.sku ? <div className='flex justify-between'>
            <span>SKU store:</span>
            <span>{rack?.inventory?.sku}</span>
          </div>: null}
          {rack?.inventory?.store ? <p className="mt-5 font-semibold">Store Item: </p>: null}
          {
            rack?.inventory?.store ? rack?.inventory?.store.map(({key, qty}) => {
              return (
                <div className='flex justify-between'>
                  <span>{key}:</span>
                  <span>{qty}</span>
                </div>
              )
            }) : null
          }
          {/* <div className='flex justify-between'>
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
          </div> */}
        </div>

        {/* {rack.status === 'occupied' &&
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
          )} */}
      </div>
    </div>
  )
}
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
              const locationCode = `${location_code}/${i.toString().padStart(2, '0')}-${j.toString().padStart(2, '0')}`;
              list.push({
                _id: _id,

                areaId: locationCode,
                id: locationCode,
                locationCode: locationCode,

                capacity: row * column,
                row: i.toString().padStart(2, '0'),
                column: j.toString().padStart(2, '0'),
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
            {t('warehouse.2d_view')}
          </CardTitle>

          <div className='flex flex-wrap gap-2 text-xs'>
            {Object.keys(STATUS_COLOR).map((status) => (<div key={status} className='flex items-center gap-1'>
              <div className={`w-3 h-3 ${STATUS_COLOR[status]} rounded`}></div>
              <span>{t(`status.${status}`)}</span>
            </div>))}
          </div>
        </div>
      </CardHeader>
      <div className='space-y-4'>
        {Array.from(rackGroups.entries()).map(([rackId, rackList], index) => (
          <RackGrid
            area={area}
            index={index}
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
