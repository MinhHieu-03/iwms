
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  BarChart, Bar, PieChart, Pie, Cell, 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from "recharts";
import { inventoryAnalytics, orderAnalytics, warehouseSections } from "@/lib/mock-data";
import { WarehouseHeatmap } from "@/components/WarehouseVisualization/WarehouseHeatmap";

const Dashboard = () => {
  // Calculate category percentage
  const totalItems = inventoryAnalytics.categories.reduce((acc, cat) => acc + cat.count, 0);
  
  const categoryData = inventoryAnalytics.categories.map(cat => ({
    name: cat.name,
    value: cat.count,
    percentage: Math.round((cat.count / totalItems) * 100)
  }));
  
  // Color palette for charts
  const COLORS = ['#4361EE', '#3CCFCF', '#FF6B6B', '#FFA62B', '#7209B7', '#06D6A0'];
  
  // Most active zones data
  const mostActiveZones = [
    { name: "Shelf A", activity: 85 },
    { name: "Shelf C", activity: 72 },
    { name: "Shelf B", activity: 58 },
    { name: "Shelf D", activity: 47 },
  ];
  
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gradient-to-br from-warehouse-primary to-warehouse-primary/80 text-white">
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-xs font-medium uppercase opacity-80">Total Inventory</span>
              <span className="text-3xl font-bold mt-2">{inventoryAnalytics.totalItems}</span>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>In Stock:</span>
                  <span className="font-medium">{inventoryAnalytics.itemsInStock}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Low Stock:</span>
                  <span className="font-medium">{inventoryAnalytics.lowStockItems}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Out of Stock:</span>
                  <span className="font-medium">{inventoryAnalytics.outOfStockItems}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground uppercase">Warehouse Utilization</span>
              <span className="text-3xl font-bold mt-2">{inventoryAnalytics.capacityUsed}%</span>
              <div className="mt-4">
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div 
                    className="bg-warehouse-secondary h-2.5 rounded-full" 
                    style={{ width: `${inventoryAnalytics.capacityUsed}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground uppercase">Total Orders</span>
              <span className="text-3xl font-bold mt-2">{orderAnalytics.totalOrders}</span>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Inbound:</span>
                  <span className="font-medium text-warehouse-primary">{orderAnalytics.inbound}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Outbound:</span>
                  <span className="font-medium text-warehouse-accent1">{orderAnalytics.outbound}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:w-[300px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Monthly Orders Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Monthly Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={orderAnalytics.monthlyOrders}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="inbound" 
                        stackId="1"
                        stroke="#4361EE" 
                        fill="#4361EE" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="outbound" 
                        stackId="1"
                        stroke="#FFA62B" 
                        fill="#FFA62B" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Inventory by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percentage}) => `${name}: ${percentage}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [`${value} items`, name]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="border-l-4 border-warehouse-primary pl-3">
                  <p className="text-sm text-gray-500">Today, 10:23 AM</p>
                  <p className="font-medium">Inbound order #IN-291 received</p>
                </div>
                <div className="border-l-4 border-warehouse-secondary pl-3">
                  <p className="text-sm text-gray-500">Today, 09:45 AM</p>
                  <p className="font-medium">Restock completed in Shelf B</p>
                </div>
                <div className="border-l-4 border-warehouse-accent1 pl-3">
                  <p className="text-sm text-gray-500">Yesterday, 04:12 PM</p>
                  <p className="font-medium">Outbound order #OUT-187 shipped</p>
                </div>
                <div className="border-l-4 border-warehouse-accent2 pl-3">
                  <p className="text-sm text-gray-500">Yesterday, 02:30 PM</p>
                  <p className="font-medium">Inventory audit completed</p>
                </div>
                <div className="border-l-4 border-warehouse-success pl-3">
                  <p className="text-sm text-gray-500">Yesterday, 09:15 AM</p>
                  <p className="font-medium">Restocking of Shelf A completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory" className="space-y-6">
          <div className="grid gap-6">
            {/* Warehouse Heatmap */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Warehouse Occupancy Heatmap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <WarehouseHeatmap sections={warehouseSections} />
                </div>
              </CardContent>
            </Card>
            
            <div className="grid gap-6 md:grid-cols-2">
              {/* Most Active Zones */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Most Active Zones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={mostActiveZones}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip />
                        <Bar dataKey="activity" fill="#3CCFCF">
                          {mostActiveZones.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Item Turnover */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Item Turnover Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: 'Electronics', rate: 0.82 },
                          { name: 'Furniture', rate: 0.45 },
                          { name: 'Appliances', rate: 0.63 }
                        ]}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 1]} tickFormatter={(tick) => `${tick * 100}%`} />
                        <Tooltip formatter={(value) => [`${(Number(value) * 100).toFixed(0)}%`, 'Turnover Rate']} />
                        <Bar dataKey="rate" fill="#7209B7" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
