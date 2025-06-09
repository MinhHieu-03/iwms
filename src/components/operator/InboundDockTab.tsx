import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, CheckCircle, Search, Edit, Trash2, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";
import { inboundOutboundOrders, InboundOutboundOrder } from "@/data/inboundOutboundData";
import InboundOrderForm from "@/components/InboundOrderForm";

interface InboundDockTabProps {
  selectedDock: string;
  setSelectedDock: (dock: string) => void;
}

interface InboundOrderFormData {
  taskId: string;
  sku: string;
  storeMethod: string;
  storeCode: string;
  packingMethod: string;
  packingCode: string;
}

const InboundDockTab = ({ selectedDock, setSelectedDock }: InboundDockTabProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<InboundOutboundOrder | undefined>();
  const [orders, setOrders] = useState<InboundOutboundOrder[]>(
    inboundOutboundOrders.filter(order => order.category === 'Inbound')
  );
  
  const itemsPerPage = 10;

  const getFilteredOrders = () => {
    return orders.filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.taskId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.robotCode.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || order.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  };

  const filteredOrders = getFilteredOrders();

  const getPaginatedOrders = () => {
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);
    return { totalPages, startIndex, paginatedOrders };
  };

  const handleCreateOrder = (orderData: InboundOrderFormData) => {
    const newOrder: InboundOutboundOrder = {
      ...orderData,
      storeMethod: orderData.storeMethod as 'Bin' | 'Carton',
      packingMethod: orderData.packingMethod as 'Carton' | 'Bag' | 'Kit',
      category: 'Inbound',
      id: `IN-${String(orders.length + 1).padStart(3, '0')}`,
      registrationTime: new Date().toISOString(),
      robotCode: 'AUTO-ASSIGNED',
      pickupLocation: 'STAGING-AREA',
      dropoffLocation: 'STORAGE-AREA',
      status: 'Pending',
      missionId: 'AUTO-GENERATED',
      partner: 'INTERNAL'
    };
    
    setOrders(prev => [...prev, newOrder]);
    toast({
      title: "Inbound Order Created",
      description: `Inbound order ${newOrder.id} has been created successfully.`,
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
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">{status}</Badge>;
      case "Completed":
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStats = () => {
    return {
      total: orders.length,
      pending: orders.filter(order => order.status === 'Pending').length,
      processing: orders.filter(order => order.status === 'Processing').length,
      completed: orders.filter(order => order.status === 'Completed').length,
    };
  };

  const stats = getStats();
  const { totalPages, startIndex, paginatedOrders } = getPaginatedOrders();

  return (
    <div className="space-y-6">
      {/* Dock Selection */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{t('select_dock')}:</span>
          <Select value={selectedDock} onValueChange={setSelectedDock}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((dock) => (
                <SelectItem key={dock} value={dock.toString()}>
                  {t('dock')} {dock}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={openCreateForm} className="bg-warehouse-primary hover:bg-warehouse-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          New Inbound Order
        </Button>
      </div>

      {/* Statistics Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Inbound</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.processing}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          </CardContent>
        </Card>
      </div> */

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inbound Orders - {t('dock')} {selectedDock}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
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

            {/* Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>STT</TableHead>
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
          </div>
        </CardContent>
      </Card>

      <InboundOrderForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateOrder}
      />
    </div>
  );
};

export default InboundDockTab;
