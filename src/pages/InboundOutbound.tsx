
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import StatusBadge from "@/components/StatusBadge";
import OrderForm from "@/components/OrderForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { inboundOutboundOrders, InboundOutboundOrder } from "@/data/inboundOutboundData";
import { Plus, Edit, Trash2 } from "lucide-react";

const InboundOutbound = () => {
  const [orders, setOrders] = useState<InboundOutboundOrder[]>(inboundOutboundOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Inbound' | 'Outbound'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Processing' | 'Completed'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<InboundOutboundOrder | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const { t } = useLanguage();
  
  const itemsPerPage = 10;

  // Filter orders based on filters and search
  const filteredOrders = orders.filter(order => {
    const matchesCategory = categoryFilter === 'All' || order.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    const matchesSearch = searchTerm === '' || 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.taskId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.partner.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesStatus && matchesSearch;
  });

  // Get current orders for pagination
  const currentOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle create order
  const handleCreateOrder = (formData: Omit<InboundOutboundOrder, 'id' | 'registrationTime'>) => {
    const newOrder: InboundOutboundOrder = {
      ...formData,
      id: `${formData.category.toUpperCase()}-${String(orders.length + 1).padStart(3, '0')}`,
      registrationTime: new Date().toISOString(),
    };
    setOrders([newOrder, ...orders]);
  };

  // Handle edit order
  const handleEditOrder = (formData: Omit<InboundOutboundOrder, 'id' | 'registrationTime'>) => {
    if (editingOrder) {
      setOrders(orders.map(order => 
        order.id === editingOrder.id 
          ? { ...formData, id: editingOrder.id, registrationTime: editingOrder.registrationTime }
          : order
      ));
      setEditingOrder(null);
    }
  };

  // Handle delete order
  const handleDeleteOrder = (orderId: string) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  // Open create form
  const openCreateForm = () => {
    setFormMode('create');
    setEditingOrder(null);
    setIsFormOpen(true);
  };

  // Open edit form
  const openEditForm = (order: InboundOutboundOrder) => {
    setFormMode('edit');
    setEditingOrder(order);
    setIsFormOpen(true);
  };

  // Generate pagination items
  const generatePaginationItems = () => {
    const items = [];
    
    // Always show first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink 
          isActive={currentPage === 1} 
          onClick={() => handlePageChange(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Add ellipsis if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis1">
          <span className="px-2">...</span>
        </PaginationItem>
      );
    }
    
    // Add pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            isActive={currentPage === i} 
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Add ellipsis if needed
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis2">
          <span className="px-2">...</span>
        </PaginationItem>
      );
    }
    
    // Always show last page if more than 1 page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink 
            isActive={currentPage === totalPages} 
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Orders Management</h2>
          <Button onClick={openCreateForm} className="flex items-center gap-2">
            <Plus size={16} />
            Create Order
          </Button>
        </div>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Search</label>
            <Input 
              placeholder="Search by ID, Task, SKU, Partner..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <Select value={categoryFilter} onValueChange={(value: 'All' | 'Inbound' | 'Outbound') => setCategoryFilter(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                <SelectItem value="Inbound">Inbound</SelectItem>
                <SelectItem value="Outbound">Outbound</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <Select value={statusFilter} onValueChange={(value: 'All' | 'Pending' | 'Processing' | 'Completed') => setStatusFilter(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <span className="text-sm text-muted-foreground">
              Showing {currentOrders.length} of {filteredOrders.length} orders
            </span>
          </div>
        </div>
        
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
              <TableHead>Registration Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentOrders.map((order, index) => (
              <TableRow key={order.id}>
                <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.category === 'Inbound' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {order.category}
                  </span>
                </TableCell>
                <TableCell className="font-medium">{order.taskId}</TableCell>
                <TableCell>{order.sku}</TableCell>
                <TableCell>{order.robotCode}</TableCell>
                <TableCell>{order.pickupLocation}</TableCell>
                <TableCell>{order.dropoffLocation}</TableCell>
                <TableCell>
                  <StatusBadge status={order.status} />
                </TableCell>
                <TableCell>{order.storeMethod}</TableCell>
                <TableCell>{order.storeCode}</TableCell>
                <TableCell>{order.packingMethod}</TableCell>
                <TableCell>{order.packingCode}</TableCell>
                <TableCell>{order.partner}</TableCell>
                <TableCell>{new Date(order.registrationTime).toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openEditForm(order)}
                    >
                      <Edit size={14} />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Fixed pagination at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} 
                className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {generatePaginationItems()}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)} 
                className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      
      {/* Add padding at the bottom to prevent content being hidden by the fixed pagination */}
      <div className="h-16"></div>

      {/* Order Form Dialog */}
      <OrderForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={formMode === 'create' ? handleCreateOrder : handleEditOrder}
        initialData={editingOrder || undefined}
        mode={formMode}
      />
    </div>
  );
};

export default InboundOutbound;
