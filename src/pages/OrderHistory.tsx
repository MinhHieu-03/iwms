
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Filter, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatusBadge from "@/components/StatusBadge";

type OrderType = {
  id: string;
  type: "inbound" | "outbound";
  date: string;
  customer: string; 
  operator: string;
  items: number;
  status: string;
};

const OrderHistory = () => {
  const [orders] = useState<OrderType[]>([
    {
      id: "IN-291",
      type: "inbound",
      date: "2023-05-15T10:30:00",
      customer: "Tech Supplies Inc.",
      operator: "doan nguyen",
      items: 24,
      status: "Completed"
    },
    {
      id: "OUT-187",
      type: "outbound",
      date: "2023-05-15T16:20:00",
      customer: "City Electronics",
      operator: "Jane Smith",
      items: 8,
      status: "Completed"
    },
    {
      id: "IN-290",
      type: "inbound",
      date: "2023-05-14T14:45:00",
      customer: "Office Solutions",
      operator: "Michael Johnson",
      items: 12,
      status: "Processing"
    },
    {
      id: "OUT-186",
      type: "outbound",
      date: "2023-05-15T11:10:00",
      customer: "Retail Group",
      operator: "Emily Williams",
      items: 15,
      status: "Processing"
    },
    {
      id: "IN-289",
      type: "inbound",
      date: "2023-05-13T09:15:00",
      customer: "Global Parts Ltd.",
      operator: "doan nguyen",
      items: 36,
      status: "Completed"
    },
    {
      id: "OUT-185",
      type: "outbound",
      date: "2023-05-14T12:30:00",
      customer: "Online Shop",
      operator: "Robert Brown",
      items: 5,
      status: "Pending"
    }
  ]);

  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    operator: "all",
    dateFrom: "",
    dateTo: ""
  });

  const filteredOrders = orders.filter(order => {
    // Filter by search term
    if (filters.search && !order.id.toLowerCase().includes(filters.search.toLowerCase()) && 
        !order.customer.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Filter by type
    if (filters.type !== "all" && order.type !== filters.type) {
      return false;
    }
    
    // Filter by operator
    if (filters.operator !== "all" && order.operator !== filters.operator) {
      return false;
    }
    
    // Filter by date range
    if (filters.dateFrom && new Date(order.date) < new Date(filters.dateFrom)) {
      return false;
    }
    
    if (filters.dateTo && new Date(order.date) > new Date(filters.dateTo)) {
      return false;
    }
    
    return true;
  });

  const uniqueOperators = [...new Set(orders.map(order => order.operator))];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/inbound-outbound">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-2xl font-bold">Order History</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Filters
            </span>
            <Button variant="outline" size="sm" className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search orders..." 
                className="pl-8"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="type" className="sr-only">Type</Label>
              <Select
                value={filters.type}
                onValueChange={(value) => setFilters({...filters, type: value})}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Order Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="inbound">Inbound</SelectItem>
                  <SelectItem value="outbound">Outbound</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="operator" className="sr-only">Operator</Label>
              <Select
                value={filters.operator}
                onValueChange={(value) => setFilters({...filters, operator: value})}
              >
                <SelectTrigger id="operator">
                  <SelectValue placeholder="Filter by Operator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Operators</SelectItem>
                  {uniqueOperators.map(operator => (
                    <SelectItem key={operator} value={operator}>
                      {operator}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="date-from" className="sr-only">From</Label>
              <Input
                id="date-from"
                type="date"
                placeholder="From date"
                value={filters.dateFrom}
                onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="date-to" className="sr-only">To</Label>
              <Input
                id="date-to"
                type="date"
                placeholder="To date"
                value={filters.dateTo}
                onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="rounded-md border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Order ID</th>
                  <th className="px-4 py-3 text-left font-medium">Type</th>
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                  <th className="px-4 py-3 text-left font-medium">Customer/Supplier</th>
                  <th className="px-4 py-3 text-left font-medium">Operator</th>
                  <th className="px-4 py-3 text-left font-medium">Items</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="px-4 py-3 font-medium">{order.id}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                        order.type === 'inbound' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {order.type === 'inbound' ? 'Inbound' : 'Outbound'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(order.date).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">{order.customer}</td>
                    <td className="px-4 py-3">{order.operator}</td>
                    <td className="px-4 py-3">{order.items}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderHistory;
