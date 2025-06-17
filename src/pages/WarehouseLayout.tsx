import React, { useEffect, useState } from 'react';
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

const WarehouseLayout = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('2d');
  const [warehouseAreas, setWarehouseAreas] = useState(fake);
  const [selectedAreaId, setSelectedAreaId] = useState(
    warehouseAreas[0]?.id || 'area-001'
  );
  const [highlightedRack, setHighlightedRack] = useState<string | null>(null);
  const [hoveredRack, setHoveredRack] = useState<string | null>(null);

  //  id: "area-001",
  // warehouseId: "wh-001",
  // name: "Inbound Area A1",
  // description: "Primary receiving dock",
  // type: "inbound",
  // status: "active",
  // capacity: 2000,
  // currentUtilization: 1650,
  // createdAt: "2024-01-15T08:00:00Z"

  const getWarehouseAreas = async () => {
    const { data } = await apiClient.get('/warehouse');
    if (data.metaData) {
      setWarehouseAreas(
        data.metaData.map((area) => ({
          // id: area._id || `area-${Math.random().toString(36).substr(2, 9)}`,
          id: "area-001",
          warehouseId: 'wh-001',
          name: area.name || 'Inbound Area A1',
          description: area.description || 'Primary receiving dock',
          type: 'inbound',
          status: 'active',
          capacity: 2000,
          currentUtilization: 1650,
          createdAt: '2024-01-15T08:00:00Z',
        }))
      );
    }
    console.log('Warehouse Areas Data:', data);
  };

  useEffect(() => {
    // Simulate fetching warehouse areas from an API
    getWarehouseAreas();
  }, []);

  // Get racks for the selected area
  const selectedArea =
    warehouseAreas.find((area) => area.id === selectedAreaId) ||
    warehouseAreas[0];
  const areaRacks = racks.filter((rack) => rack.areaId === selectedAreaId);

  // Mock sections for heatmap
  const mockSections = [
    {
      id: 'section-1',
      name: 'Section A',
      rows: 7,
      columns: 8,
      occupancy: 85,
    },
    {
      id: 'section-2',
      name: 'Section B',
      rows: 7,
      columns: 6,
      occupancy: 72,
    },
    {
      id: 'section-3',
      name: 'Section C',
      rows: 7,
      columns: 8,
      occupancy: 91,
    },
  ];

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

  const stats = getAreaStats();

  return (
    <div className='space-y-6'>
      {/* Area Statistics Summary Cards */}
      {/* <div className='grid grid-cols-2 md:grid-cols-6 gap-4'>
        <div className='text-center'>
          <div className='text-2xl font-bold text-blue-600'>{stats.total}</div>
          <div className='text-xs text-muted-foreground'>Total Racks</div>
        </div>
        <div className='text-center'>
          <div className='text-2xl font-bold text-green-600'>
            {stats.occupied}
          </div>
          <div className='text-xs text-muted-foreground'>Occupied</div>
        </div>
        <div className='text-center'>
          <div className='text-2xl font-bold text-gray-600'>{stats.empty}</div>
          <div className='text-xs text-muted-foreground'>Empty</div>
        </div>
        <div className='text-center'>
          <div className='text-2xl font-bold text-red-600'>
            {stats.maintenance}
          </div>
          <div className='text-xs text-muted-foreground'>Maintenance</div>
        </div>
        <div className='text-center'>
          <div className='text-2xl font-bold text-yellow-600'>
            {stats.reserved}
          </div>
          <div className='text-xs text-muted-foreground'>Reserved</div>
        </div>
        <div className='text-center'>
          <div className='text-2xl font-bold text-warehouse-primary'>
            {stats.occupancyRate}%
          </div>
          <div className='text-xs text-muted-foreground'>Occupancy</div>
        </div>
      </div> */}

      {/* Area Selection Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Warehouse Areas</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={selectedAreaId}
            onValueChange={setSelectedAreaId}
            className='w-full'
          >
            <TabsList className='grid w-full grid-cols-5 bg-muted/50'>
              {warehouseAreas.map((area) => (
                <TabsTrigger
                  key={area.id}
                  value={area.id}
                  className='data-[state=active]:bg-warehouse-primary data-[state=active]:text-white text-xs'
                >
                  {area.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
        {/* <TabsList className="grid w-full grid-cols-4 bg-muted/50">
          <TabsTrigger value="2d" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <Map className="h-4 w-4 mr-2" />
            2D Layout
          </TabsTrigger> */}
        {/* <TabsTrigger value="3d" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <Box className="h-4 w-4 mr-2" />
            3D View
          </TabsTrigger>
          <TabsTrigger value="heatmap" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <Thermometer className="h-4 w-4 mr-2" />
            Activity Heatmap
          </TabsTrigger>
          <TabsTrigger value="zones" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <Grid3X3 className="h-4 w-4 mr-2" />
            Zone Management
          </TabsTrigger> */}
        {/* </TabsList> */}

        <TabsContent value='2d' className='mt-6'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Map className='h-5 w-5' />
                2D Warehouse View - {selectedArea.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Warehouse2DView
                area={selectedArea}
                racks={areaRacks}
                highlightedRack={highlightedRack}
                hoveredRack={hoveredRack}
                onRackClick={handleRackClick}
                onRackHover={handleRackHover}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='3d' className='mt-6'>
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
                  activeAreaId={selectedAreaId}
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WarehouseLayout;
