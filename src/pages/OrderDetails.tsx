
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { ArrowLeft, Package, Play, PackageCheck } from "lucide-react";
import { mockOrders, type OrderItem } from "@/data/operatorData";

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const order = mockOrders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
        <Button onClick={() => navigate("/operator-interface")}>
          Back to Operator Interface
        </Button>
      </div>
    );
  }

  const handleItemSelect = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, itemId]);
    } else {
      setSelectedItems(prev => prev.filter(id => id !== itemId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(order.items.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleStartPicking = () => {
    if (selectedItems.length === 0) {
      toast({
        title: "No Items Selected",
        description: "Please select at least one item to start picking",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Picking Started",
      description: `Started picking for ${selectedItems.length} item(s)`,
    });
    setSelectedItems([]);
  };

  const handleStartPacking = () => {
    if (selectedItems.length === 0) {
      toast({
        title: "No Items Selected",
        description: "Please select at least one item to start packing", 
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Packing Started",
      description: `Started packing for ${selectedItems.length} item(s)`,
    });
    setSelectedItems([]);
  };

  const getStatusBadge = (status: OrderItem['status']) => {
    const variants = {
      pending: "secondary",
      picking: "default",
      picked: "default",
      packing: "default",
      packed: "success"
    } as const;

    return (
      <Badge variant={variants[status] || "secondary"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/operator-interface")}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </Button>
        <h2 className="text-2xl font-bold">Order Details</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              {order.orderNumber} - {order.customer}
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleStartPicking}
                disabled={selectedItems.length === 0}
                className="gap-2"
              >
                <Play className="h-4 w-4" />
                Start Picking
              </Button>
              <Button 
                onClick={handleStartPacking}
                disabled={selectedItems.length === 0}
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Priority</label>
              <Badge className="mt-1 block w-fit">
                {order.priority.toUpperCase()}
              </Badge>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <Badge variant="secondary" className="mt-1 block w-fit">
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Due Date</label>
              <p className="mt-1">{new Date(order.dueDate).toLocaleDateString()}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Total Items</label>
              <p className="mt-1">{order.totalItems}</p>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedItems.length === order.items.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Picked</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={(checked) => 
                          handleItemSelect(item.id, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.sku}</TableCell>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.pickedQuantity}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetails;
