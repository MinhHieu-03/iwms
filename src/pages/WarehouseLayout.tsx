import React, { useEffect, useMemo, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, Thermometer, Eye, Grid3X3, Building, Box } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Warehouse2DView from '@/components/WarehouseVisualization/Warehouse2DView';
import Warehouse3DView from '@/components/WarehouseVisualization/Warehouse3DView';
import { WarehouseHeatmap } from '@/components/WarehouseVisualization/WarehouseHeatmap';
import { warehouseAreas as fake, racks } from '@/data/warehouseData';
import apiClient from '@/lib/axios';
import { domain } from '@/lib/domain';
import { set } from 'react-hook-form';

interface AreaConfigType {
  _id: string;
  name: string;
  description: string;
  warehouse: {
    _id: string;
    name: string;
  };
  status: string;
}

const WarehouseLayout = () => {
  const { t } = useTranslation();
  const [warehouseAreas, setWarehouseAreas] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>('');

  const [selectedArea, setSelectedArea] = useState('');
  const [areaConfigs, setAreaConfigs] = useState<AreaConfigType[]>([]);

  const [highlightedRack, setHighlightedRack] = useState<string | null>(null);
  const [hoveredRack, setHoveredRack] = useState<string | null>(null);

  useEffect(() => {
    if (warehouseAreas.length > 0) {
      setSelectedWarehouse(warehouseAreas[0]._id);
      setSelectedArea('')
    } 
  }, [warehouseAreas]);

  useEffect(() => {
    const getWarehouseAreas = async () => {
      const { data } = await apiClient.get('/warehouse');
      if (data.metaData) {
        setWarehouseAreas(data.metaData);
      }
      console.log('Warehouse Areas Data:', data);
    };

    const getAreaConfigs = async () => {
      try {
        const { data } = await apiClient.get(domain.areaconfig.get_all);
        if (data.metaData) {
          setAreaConfigs(data.metaData);
        }
      } catch (error) {
        console.error('Failed to fetch area configs:', error);
      }
    };

    getWarehouseAreas();
    getAreaConfigs();
  }, []);
  // Get selected area from area configs and adapt to WarehouseArea format
  const areaOptions = useMemo(() => {
    const result =  areaConfigs.filter((area) => area.warehouse._id === selectedWarehouse) ||[];
    if (result.length) {
      setSelectedArea(result[0]._id);
    } else {
      setSelectedArea('');
    }
    return result;
  }, [areaConfigs, selectedWarehouse]); 
    
  const areaRacks = racks.filter((rack) => rack.areaId === selectedWarehouse);

  const handleRackClick = (rackId: string) => {
    setHighlightedRack(rackId);
    console.log(`Clicked rack: ${rackId}`);
  };

  const handleRackHover = (rackId: string | null) => {
    setHoveredRack(rackId);
  };

  const getAreaStats = () => {
    const totalRacks = areaRacks.length;
    const occupiedRacks = areaRacks.filter(
      (rack) => rack.status === 'occupied'
    ).length;
    const emptyRacks = areaRacks.filter(
      (rack) => rack.status === 'empty'
    ).length;
    const maintenanceRacks = areaRacks.filter(
      (rack) => rack.status === 'maintenance'
    ).length;
    const reservedRacks = areaRacks.filter(
      (rack) => rack.status === 'reserved'
    ).length;

    return {
      total: totalRacks,
      occupied: occupiedRacks,
      empty: emptyRacks,
      maintenance: maintenanceRacks,
      reserved: reservedRacks,
      occupancyRate:
        totalRacks > 0 ? Math.round((occupiedRacks / totalRacks) * 100) : 0,
    };
  };

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Area Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={selectedWarehouse}
            onValueChange={setSelectedWarehouse}
            className='w-full'
          >
            <TabsList className='grid w-full grid-cols-5 bg-muted/50'>
              {warehouseAreas.map((wh) => (
                <TabsTrigger
                  key={wh._id}
                  value={wh._id}
                  className='data-[state=active]:bg-warehouse-primary data-[state=active]:text-white text-xs'
                >
                  {wh.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      <Tabs value={selectedArea} onValueChange={setSelectedArea} className='w-full'>
        {areaOptions.length ? <TabsList
          className={`grid w-full bg-muted/50 ${
            areaOptions.length <= 5
              ? `grid-cols-${areaOptions.length}`
              : 'grid-cols-5'
          }`}
        >
          {areaOptions.map((area) => (
            <TabsTrigger
              value={area._id}
              key={area._id}
              className='data-[state=active]:bg-warehouse-primary data-[state=active]:text-white'
            >
              <Map className='h-4 w-4 mr-2' />
              {area.name}
            </TabsTrigger>
          ))}
        </TabsList>: "No Areas Available" }

        <TabsContent value={selectedArea} className='mt-6'>
          <Card>
            <CardContent>
              {selectedArea ? <Warehouse2DView
                area={selectedArea}
                hoveredRack={hoveredRack}
                onRackHover={handleRackHover}
              />: <p className='mt-4'>"Please select an area from the tabs above."</p>}
            </CardContent>
          </Card>
        </TabsContent>

        {/* <TabsContent value='3d' className='mt-6'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Box className='h-5 w-5' />
                3D Warehouse View - All Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='h-[600px] w-full'>
                <Warehouse3DView
                  areas={warehouseAreas}
                  racks={racks}
                  highlightedRack={highlightedRack}
                  hoveredRack={hoveredRack}
                  activeAreaId={selectedWarehouse}
                  onRackClick={handleRackClick}
                  onRackHover={handleRackHover}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='heatmap' className='mt-6'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Thermometer className='h-5 w-5' />
                Activity Heatmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <WarehouseHeatmap sections={mockSections} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='zones' className='mt-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {warehouseAreas.map((area) => {
              const areaRacksCount = racks.filter((r) => r.areaId === area.id);
              const occupiedCount = areaRacksCount.filter(
                (r) => r.status === 'occupied'
              ).length;
              const utilizationPercent = Math.round(
                (area.currentUtilization / area.capacity) * 100
              );

              return (
                <Card key={area.id}>
                  <CardHeader>
                    <CardTitle>{area.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-2'>
                      <div className='flex justify-between'>
                        <span>Type:</span>
                        <span className='capitalize'>{area.type}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span>Capacity:</span>
                        <span>{utilizationPercent}%</span>
                      </div>
                      <div className='flex justify-between'>
                        <span>Total Racks:</span>
                        <span>{areaRacksCount.length}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span>Occupied Racks:</span>
                        <span>{occupiedCount}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span>Status:</span>
                        <span
                          className={
                            area.status === 'active'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }
                        >
                          {area.status}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent> */}
      </Tabs>
    </div>
  );
};

export default WarehouseLayout;
