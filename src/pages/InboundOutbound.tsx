
import React, { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDown, ArrowUp, Package, Truck, Clock, CheckCircle, AlertCircle, Plus, Search, Edit, Trash2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";
import { inboundOutboundOrders, InboundOutboundOrder } from "@/data/inboundOutboundData";
import OrderForm from "@/components/OrderForm";

const InboundOutbound = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("orders");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<InboundOutboundOrder | undefined>();
  const [orders, setOrders] = useState<InboundOutboundOrder[]>(inboundOutboundOrders);
  
  const itemsPerPage = 10;

  // Filter and search logic
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.taskId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.robotCode.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === "all" || order.category === categoryFilter;
      const matchesStatus = statusFilter === "all" || order.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [orders, searchTerm, categoryFilter, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const handleCreateOrder = (orderData: Omit<InboundOutboundOrder, 'id' | 'registrationTime'>) => {
    const newOrder: InboundOutboundOrder = {
      ...orderData,
      id: `${orderData.category === 'Inbound' ? 'IN' : 'OUT'}-${String(orders.length + 1).padStart(3, '0')}`,
      registrationTime: new Date().toISOString()
    };
    
    setOrders(prev => [...prev, newOrder]);
    toast({
      title: "Order Created",
      description: `${orderData.category} order ${newOrder.id} has been created successfully.`,
    });
  };

  const handleEditOrder = (orderData: Omit<InboundOutboundOrder, 'id' | 'registrationTime'>) => {
    if (!editingOrder) return;
    
    const updatedOrder: InboundOutboundOrder = {
      ...orderData,
      id: editingOrder.id,
      registrationTime: editingOrder.registrationTime
    };
    
    setOrders(prev => prev.map(order => order.id === editingOrder.id ? updatedOrder : order));
    setEditingOrder(undefined);
    toast({
      title: "Order Updated",
      description: `Order ${updatedOrder.id} has been updated successfully.`,
    });
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
    toast({
      title: "Order Deleted",
      description: `Order ${orderId} has been deleted.`,
      variant: "destructive",
    });
  };

  const openCreateForm = () => {
    setEditingOrder(undefined);
    setIsFormOpen(true);
  };

  const openEditForm = (order: InboundOutboundOrder) => {
    setEditingOrder(order);
    setIsFormOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />{status}</Badge>;
      case "Processing":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><ArrowUp className="w-3 h-3 mr-1" />{status}</Badge>;
      case "Completed":
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCategoryBadge = (category: string) => {
    return (
      <Badge variant={category === 'Inbound' ? 'secondary' : 'default'} className={category === 'Inbound' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}>
        {category}
      </Badge>
    );
  };

  const getInboundStats = () => {
    const inboundOrders = orders.filter(order => order.category === 'Inbound');
    return {
      total: inboundOrders.length,
      pending: inboundOrders.filter(order => order.status === 'Pending').length,
      processing: inboundOrders.filter(order => order.status === 'Processing').length,
      completed: inboundOrders.filter(order => order.status === 'Completed').length,
    };
  };

  const getOutboundStats = () => {
    const outboundOrders = orders.filter(order => order.category === 'Outbound');
    return {
      total: outboundOrders.length,
      pending: outboundOrders.filter(order => order.status === 'Pending').length,
      processing: outboundOrders.filter(order => order.status === 'Processing').length,
      completed: outboundOrders.filter(order => order.status === 'Completed').length,
    };
  };

  const inboundStats = getInboundStats();
  const outboundStats = getOutboundStats();

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
              <h1 className="text-2xl font-bold text-foreground">Orders Management</h1>
              <p className="text-muted-foreground">Manage incoming and outgoing orders with real-time tracking</p>
            </div>
          </div>
          <Button onClick={openCreateForm} className="bg-warehouse-primary hover:bg-warehouse-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="orders" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <Package className="h-4 w-4 mr-2" />
            All Orders
          </TabsTrigger>
          <TabsTrigger value="inbound" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <ArrowDown className="h-4 w-4 mr-2" />
            {t('inbound')}
          </TabsTrigger>
          <TabsTrigger value="outbound" className="data-[state=active]:bg-warehouse-primary data-[state=active]:text-white">
            <ArrowUp className="h-4 w-4 mr-2" />
            {t('outbound')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>All Orders</CardTitle>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search by ID, Task, SKU, Partner..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Inbound">Inbound</SelectItem>
                    <SelectItem value="Outbound">Outbound</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>STT</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Task ID</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Robot Code</TableHead>
                      <TableHead>Pickup Location</TableHead>
                      <TableHead>Dropoff Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Store Method</TableHead>
                      <TableHead>Store Code</TableHead>
                      <TableHead>Packing Method</TableHead>
                      <TableHead>Packing Code</TableHead>
                      <TableHead>Partner</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedOrders.map((order, index) => (
                      <TableRow key={order.id}>
                        <TableCell>{startIndex + index + 1}</TableCell>
                        <TableCell>{getCategoryBadge(order.category)}</TableCell>
                        <TableCell className="font-medium">{order.taskId}</TableCell>
                        <TableCell>{order.sku}</TableCell>
                        <TableCell>{order.robotCode}</TableCell>
                        <TableCell>{order.pickupLocation}</TableCell>
                        <TableCell>{order.dropoffLocation}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>{order.storeMethod}</TableCell>
                        <TableCell>{order.storeCode}</TableCell>
                        <TableCell>{order.packingMethod}</TableCell>
                        <TableCell>{order.packingCode}</TableCell>
                        <TableCell>{order.partner}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openEditForm(order)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteOrder(order.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {/* Pagination */}
              <div className="flex items-center justify-between space-x-2 py-4">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of {filteredOrders.length} entries
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    );
                  })}
                  {totalPages > 5 && <span className="px-2">...</span>}
                  {totalPages > 5 && (
                    <Button
                      variant={currentPage === totalPages ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inbound" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Inbound</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inboundStats.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{inboundStats.pending}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{inboundStats.processing}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{inboundStats.completed}</div>
              </CardContent>
            </Card>
          </div>
          
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
                    <TableHead>Order ID</TableHead>
                    <TableHead>Task ID</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Partner</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Robot Code</TableHead>
                    <TableHead>Pickup Location</TableHead>
                    <TableHead>Store Method</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.filter(order => order.category === 'Inbound').slice(0, 10).map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.taskId}</TableCell>
                      <TableCell>{order.sku}</TableCell>
                      <TableCell>{order.partner}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{order.robotCode}</TableCell>
                      <TableCell>{order.pickupLocation}</TableCell>
                      <TableCell>{order.storeMethod}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outbound" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Outbound</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{outboundStats.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{outboundStats.pending}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{outboundStats.processing}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{outboundStats.completed}</div>
              </CardContent>
            </Card>
          </div>
          
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
                    <TableHead>Order ID</TableHead>
                    <TableHead>Task ID</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Partner</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Robot Code</TableHead>
                    <TableHead>Dropoff Location</TableHead>
                    <TableHead>Packing Method</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.filter(order => order.category === 'Outbound').slice(0, 10).map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.taskId}</TableCell>
                      <TableCell>{order.sku}</TableCell>
                      <TableCell>{order.partner}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{order.robotCode}</TableCell>
                      <TableCell>{order.dropoffLocation}</TableCell>
                      <TableCell>{order.packingMethod}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <OrderForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={editingOrder ? handleEditOrder : handleCreateOrder}
        initialData={editingOrder}
        mode={editingOrder ? 'edit' : 'create'}
      />
    </div>
  );
};

export default InboundOutbound;
