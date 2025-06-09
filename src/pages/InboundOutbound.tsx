import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDown, ArrowUp, Package, Truck, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

const InboundOutbound = () => {
const { t } = useTranslation();  const [activeTab, setActiveTab] = useState("inbound");

  const inboundData = [
    {
      id: "IB001",
      supplier: "TechCorp Inc.",
      expectedDate: "2024-01-15",
      status: "pending",
      items: 25,
      priority: "high",
      dock: "Dock A"
    },
    {
      id: "IB002",
      supplier: "Global Supply Co.",
      expectedDate: "2024-01-15",
      status: "in_progress",
      items: 150,
      priority: "medium",
      dock: "Dock B"
    },
    {
      id: "IB003",
      supplier: "Quick Parts Ltd.",
      expectedDate: "2024-01-16",
      status: "completed",
      items: 75,
      priority: "low",
      dock: "Dock C"
    }
  ];

  const outboundData = [
    {
      id: "OB001",
      customer: "Retail Chain A",
      scheduledDate: "2024-01-15",
      status: "pending",
      items: 45,
      priority: "high",
      dock: "Dock D"
    },
    {
      id: "OB002",
      customer: "E-commerce Hub",
      scheduledDate: "2024-01-15",
      status: "in_progress",
      items: 89,
      priority: "medium",
      dock: "Dock E"
    },
    {
      id: "OB003",
      customer: "Distribution Center",
      scheduledDate: "2024-01-16",
      status: "ready",
      items: 120,
      priority: "high",
      dock: "Dock F"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline"><Clock className="w-3 h-3 mr-1" />{status}</Badge>;
      case "in_progress":
        return <Badge variant="secondary"><ArrowUp className="w-3 h-3 mr-1" />{status}</Badge>;
      case "completed":
        return <Badge variant="default"><CheckCircle className="w-3 h-3 mr-1" />{status}</Badge>;
      case "ready":
        return <Badge variant="secondary"><Package className="w-3 h-3 mr-1" />{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">{priority}</Badge>;
      case "medium":
        return <Badge variant="default">{priority}</Badge>;
      case "low":
        return <Badge variant="secondary">{priority}</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-warehouse-primary/10 to-warehouse-secondary/10 rounded-lg p-6 border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-warehouse-primary/20 p-3 rounded-lg">
              <Truck className="h-8 w-8 text-warehouse-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t('inbound_outbound')}</h1>
              <p className="text-muted-foreground">Manage incoming and outgoing shipments with real-time tracking</p>
            </div>
          </div>
          <Button className="bg-warehouse-primary hover:bg-warehouse-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            New Shipment
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="inbound" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <ArrowDown className="h-4 w-4 mr-2" />
            {t('inbound')}
          </TabsTrigger>
          <TabsTrigger value="outbound" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <ArrowUp className="h-4 w-4 mr-2" />
            {t('outbound')}
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <Package className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inbound" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowDown className="h-5 w-5" />
                {t('inbound_shipments')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Shipment ID</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Expected Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Dock</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inboundData.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell className="font-medium">{shipment.id}</TableCell>
                      <TableCell>{shipment.supplier}</TableCell>
                      <TableCell>{shipment.expectedDate}</TableCell>
                      <TableCell>{getStatusBadge(shipment.status)}</TableCell>
                      <TableCell>{shipment.items}</TableCell>
                      <TableCell>{getPriorityBadge(shipment.priority)}</TableCell>
                      <TableCell>{shipment.dock}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outbound" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowUp className="h-5 w-5" />
                {t('outbound_shipments')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Shipment ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Scheduled Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Dock</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {outboundData.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell className="font-medium">{shipment.id}</TableCell>
                      <TableCell>{shipment.customer}</TableCell>
                      <TableCell>{shipment.scheduledDate}</TableCell>
                      <TableCell>{getStatusBadge(shipment.status)}</TableCell>
                      <TableCell>{shipment.items}</TableCell>
                      <TableCell>{getPriorityBadge(shipment.priority)}</TableCell>
                      <TableCell>{shipment.dock}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Throughput</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,247</div>
                <p className="text-sm text-muted-foreground">Items processed today</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Dock Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">85%</div>
                <p className="text-sm text-muted-foreground">Average dock usage</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Processing Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2.4h</div>
                <p className="text-sm text-muted-foreground">Average processing time</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InboundOutbound;
