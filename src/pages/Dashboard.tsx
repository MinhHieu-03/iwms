
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
import { inventoryAnalytics, orderAnalytics, missionAnalytics, warehouseSections } from "@/lib/mock-data";
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
    { name: "Section A", activity: 85 },
    { name: "Section C", activity: 72 },
    { name: "Section B", activity: 58 },
    { name: "Section D", activity: 47 },
  ];
  
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground uppercase">Robot Efficiency</span>
              <div className="flex items-end gap-2 mt-2">
                <span className="text-3xl font-bold">
                  {Math.round(missionAnalytics.robotPerformance.reduce(
                    (acc, robot) => acc + robot.efficiency, 0) / missionAnalytics.robotPerformance.length
                  )}%
                </span>
                <span className="text-sm text-warehouse-success font-medium">+2.5%</span>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Completed:</span>
                  <span className="font-medium text-warehouse-success">{missionAnalytics.completed}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Failed:</span>
                  <span className="font-medium text-warehouse-danger">{missionAnalytics.failed}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
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
          
          <div className="grid gap-6 md:grid-cols-2">
            {/* Robot Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Robot Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={missionAnalytics.robotPerformance}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="completed" name="Completed" fill="#06D6A0" />
                      <Bar dataKey="failed" name="Failed" fill="#EF476F" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
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
                    <p className="font-medium">Robot #3 completed mission #M-082</p>
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
                    <p className="font-medium">Restocking of Section A completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="inventory" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Warehouse Heatmap */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Warehouse Occupancy Heatmap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <WarehouseHeatmap sections={warehouseSections} />
                </div>
              </CardContent>
            </Card>
            
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
                      <Tooltip formatter={(value) => [`${(value * 100).toFixed(0)}%`, 'Turnover Rate']} />
                      <Bar dataKey="rate" fill="#7209B7" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="operations" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Order Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Pending', value: orderAnalytics.pending },
                          { name: 'Processing', value: orderAnalytics.processing },
                          { name: 'Completed', value: orderAnalytics.completed },
                          { name: 'Canceled', value: orderAnalytics.canceled }
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, value, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill="#FFD166" /> {/* Pending */}
                        <Cell fill="#4361EE" /> {/* Processing */}
                        <Cell fill="#06D6A0" /> {/* Completed */}
                        <Cell fill="#EF476F" /> {/* Canceled */}
                      </Pie>
                      <Tooltip formatter={(value, name) => [value, name]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Mission Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Mission Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Completed', value: missionAnalytics.completed },
                          { name: 'In Progress', value: missionAnalytics.inProgress },
                          { name: 'Pending', value: missionAnalytics.pending },
                          { name: 'Failed', value: missionAnalytics.failed }
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, value, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill="#06D6A0" /> {/* Completed */}
                        <Cell fill="#4361EE" /> {/* In Progress */}
                        <Cell fill="#FFD166" /> {/* Pending */}
                        <Cell fill="#EF476F" /> {/* Failed */}
                      </Pie>
                      <Tooltip formatter={(value, name) => [value, name]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Robot Efficiency Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Robot Efficiency Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: 'Jan', efficiency: 92 },
                      { month: 'Feb', efficiency: 93 },
                      { month: 'Mar', efficiency: 91 },
                      { month: 'Apr', efficiency: 94 },
                      { month: 'May', efficiency: 95 },
                      { month: 'Jun', efficiency: 97 },
                      { month: 'Jul', efficiency: 96 },
                      { month: 'Aug', efficiency: 98 },
                      { month: 'Sep', efficiency: 97 },
                      { month: 'Oct', efficiency: 98 },
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[85, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Efficiency']} />
                    <Line type="monotone" dataKey="efficiency" stroke="#7209B7" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
