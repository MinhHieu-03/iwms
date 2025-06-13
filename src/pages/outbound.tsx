import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Package, Play, PackageCheck, Search } from "lucide-react";
import { mockOrders, type Order } from "@/data/operatorData";
import PickingDrawer from "@/components/PickingDrawer";
import { Input } from "antd";

const OrdersTab: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [showPickingModal, setShowPickingModal] = useState(false);
  const [searchText, setSearchText] = useState('');

  const filteredOrders = mockOrders.filter(order => 
    order.orderNumber.toLowerCase().includes(searchText.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleOrderSelect = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders(prev => [...prev, orderId]);
    } else {
      setSelectedOrders(prev => prev.filter(id => id !== orderId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(filteredOrders.map(order => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleStartPicking = () => {
    if (selectedOrders.length === 0) {
      toast({
        title: "No Orders Selected",
        description: "Please select at least one order to start picking",
        variant: "destructive",
      });
      return;
    }
    setShowPickingModal(true);

    toast({
      title: "Picking Started",
      description: `Started picking for ${selectedOrders.length} order(s)`,
    });
    setSelectedOrders([]);
  };

  const handleStartPacking = () => {
    if (selectedOrders.length === 0) {
      toast({
        title: "No Orders Selected", 
        description: "Please select at least one order to start packing",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Packing Started",
      description: `Started packing for ${selectedOrders.length} order(s)`,
    });
    setSelectedOrders([]);
  };

  const handleOrderClick = (orderId: string) => {
    // navigate(`/operator-interface/order/${orderId}`);
    // setSelectedOrders(filteredOrders.map(order => order.id));
  };

  const getPriorityBadge = (priority: Order['priority']) => {
    const variants = {
      low: "secondary",
      medium: "default", 
      high: "destructive",
      urgent: "destructive"
    } as const;

    const colors = {
      low: "bg-gray-100 text-gray-800",
      medium: "bg-blue-100 text-blue-800",
      high: "bg-orange-100 text-orange-800", 
      urgent: "bg-red-100 text-red-800"
    };

    return (
      <Badge variant={variants[priority]} className={colors[priority]}>
        {priority.toUpperCase()}
      </Badge>
    );
  };

  const getStatusBadge = (status: Order['status']) => {
    const variants = {
      pending: "secondary",
      picking: "default",
      packing: "default", 
      ready: "secondary",
      shipped: "secondary"
    } as const;

    const colors = {
      pending: "bg-gray-100 text-gray-800",
      picking: "bg-blue-100 text-blue-800",
      packing: "bg-orange-100 text-orange-800",
      ready: "bg-green-100 text-green-800",
      shipped: "bg-green-100 text-green-800"
    };

    return (
      <Badge variant={variants[status] || "secondary"} className={colors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Orders to Process
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleStartPicking}
                disabled={selectedOrders.length === 0}
                className="gap-2"
              >
                <Play className="h-4 w-4" />
                Start Picking
              </Button>
              <Button 
                onClick={handleStartPacking}
                disabled={selectedOrders.length === 0}
                variant="outline"
                className="gap-2"
              >
                <PackageCheck className="h-4 w-4" />
                Start Packing
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search orders..."
              prefix={<Search className="h-4 w-4 text-gray-400" />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: '300px' }}
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">                    <Checkbox
                      checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Order #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow 
                    key={order.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleOrderClick(order.id)}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedOrders.includes(order.id)}
                        onCheckedChange={(checked) => 
                          handleOrderSelect(order.id, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell className="font-medium">{order.orderNumber}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>{order.totalItems}</TableCell>
                    <TableCell>
                      {new Date(order.dueDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Picking Drawer Component */}
      <PickingDrawer
        open={showPickingModal}
        onClose={() => setShowPickingModal(false)}
      />
    </div>
  );
};

export default OrdersTab;
