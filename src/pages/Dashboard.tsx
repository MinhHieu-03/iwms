import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Package, Users, Activity, AlertTriangle, CheckCircle, Clock, BarChart3, TrendingDown, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
const { t } = useTranslation();
  const userData = [
    { name: "doan nguyen", visits: 1200, orders: 800 },
    { name: "Jane Smith", visits: 1100, orders: 950 },
    { name: "Mike Johnson", visits: 1000, orders: 700 },
    { name: "Emily Brown", visits: 900, orders: 850 },
    { name: "David Wilson", visits: 1150, orders: 900 },
    { name: "Sarah Lee", visits: 1300, orders: 1000 },
  ];

  const productData = [
    { name: "Product A", sold: 1500 },
    { name: "Product B", sold: 1300 },
    { name: "Product C", sold: 1100 },
    { name: "Product D", sold: 900 },
    { name: "Product E", sold: 1000 },
  ];

  const performanceData = [
    { name: "Jan", efficiency: 85, throughput: 1200 },
    { name: "Feb", efficiency: 88, throughput: 1350 },
    { name: "Mar", efficiency: 92, throughput: 1450 },
    { name: "Apr", efficiency: 87, throughput: 1320 },
    { name: "May", efficiency: 94, throughput: 1580 },
    { name: "Jun", efficiency: 96, throughput: 1650 },
  ];

  const inventoryData = [
    { name: "Electronics", value: 35, color: "#8884d8" },
    { name: "Clothing", value: 25, color: "#82ca9d" },
    { name: "Books", value: 20, color: "#ffc658" },
    { name: "Home & Garden", value: 20, color: "#ff7300" },
  ];

  const todayStats = [
    { title: "Orders Processed", value: "147", change: "+12%", icon: Package, trend: "up" },
    { title: "Active Robots", value: "23/25", change: "92%", icon: Activity, trend: "stable" },
    { title: "Efficiency Rate", value: "94%", change: "+3%", icon: TrendingUp, trend: "up" },
    { title: "Pending Tasks", value: "8", change: "-15%", icon: Clock, trend: "down" },
  ];

  const recentAlerts = [
    { id: 1, type: "warning", message: "Low stock alert: SKU-12345", time: "2 min ago" },
    { id: 2, type: "success", message: "Mission completed successfully", time: "5 min ago" },
    { id: 3, type: "error", message: "Robot R-07 offline", time: "12 min ago" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted/50">
          <TabsTrigger value="overview" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <TrendingUp className="h-4 w-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="inventory" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <Package className="h-4 w-4 mr-2" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="alerts" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Alerts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {todayStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-muted-foreground'}`}>
                    {stat.change} from yesterday
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="efficiency" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="throughput" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-center space-x-2">
                      {alert.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                      {alert.type === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {alert.type === 'error' && <AlertTriangle className="h-4 w-4 text-red-500" />}
                      <div className="flex-1">
                        <p className="text-sm">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="efficiency" fill="#8884d8" />
                  <Bar dataKey="throughput" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={inventoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {inventoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      {alert.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      {alert.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {alert.type === 'error' && <AlertTriangle className="h-5 w-5 text-red-500" />}
                      <div>
                        <p className="font-medium">{alert.message}</p>
                        <p className="text-sm text-muted-foreground">{alert.time}</p>
                      </div>
                    </div>
                    <Badge variant={alert.type === 'error' ? 'destructive' : 'default'}>
                      {alert.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
