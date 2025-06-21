import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InboundTable from '@/components/inbound_table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ArrowDown,
  ArrowUp,
  Package,
  Truck,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Search,
  Edit,
  Trash2,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/components/ui/use-toast';
import {
  inboundOutboundOrders,
  InboundOutboundOrder,
} from '@/data/inboundOutboundData';
import OrderForm from '@/components/OrderForm';

const InboundOutbound = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('inbound');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<
    InboundOutboundOrder | undefined
  >();
  const [orders, setOrders] = useState<InboundOutboundOrder[]>(
    inboundOutboundOrders
  );

  const itemsPerPage = 10;

  // Filter and search logic for each tab
  const getFilteredOrders = (category?: 'Inbound' | 'Outbound') => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.taskId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.robotCode.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = !category || order.category === category;
      const matchesStatus =
        statusFilter === 'all' || order.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  };

  const allOrdersFiltered = getFilteredOrders();
  const inboundOrdersFiltered = getFilteredOrders('Inbound');
  const outboundOrdersFiltered = getFilteredOrders('Outbound');

  // Pagination
  const getPaginatedOrders = (filteredOrders: InboundOutboundOrder[]) => {
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedOrders = filteredOrders.slice(
      startIndex,
      startIndex + itemsPerPage
    );
    return { totalPages, startIndex, paginatedOrders };
  };

  const handleCreateOrder = (
    orderData: Omit<InboundOutboundOrder, 'id' | 'registrationTime'>
  ) => {
    const newOrder: InboundOutboundOrder = {
      ...orderData,
      id: `${orderData.category === 'Inbound' ? 'IN' : 'OUT'}-${String(
        orders.length + 1
      ).padStart(3, '0')}`,
      registrationTime: new Date().toISOString(),
    };

    setOrders((prev) => [...prev, newOrder]);
    toast({
      title: 'Order Created',
      description: `${orderData.category} order ${newOrder.id} has been created successfully.`,
    });
  };

  const handleEditOrder = (
    orderData: Omit<InboundOutboundOrder, 'id' | 'registrationTime'>
  ) => {
    if (!editingOrder) return;

    const updatedOrder: InboundOutboundOrder = {
      ...orderData,
      id: editingOrder.id,
      registrationTime: editingOrder.registrationTime,
    };

    setOrders((prev) =>
      prev.map((order) => (order.id === editingOrder.id ? updatedOrder : order))
    );
    setEditingOrder(undefined);
    toast({
      title: 'Order Updated',
      description: `Order ${updatedOrder.id} has been updated successfully.`,
    });
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
    toast({
      title: 'Order Deleted',
      description: `Order ${orderId} has been deleted.`,
      variant: 'destructive',
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
      case 'Pending':
        return (
          <Badge variant='outline' className='bg-yellow-100 text-yellow-800'>
            <Clock className='w-3 h-3 mr-1' />
            {status}
          </Badge>
        );
      case 'Processing':
        return (
          <Badge variant='secondary' className='bg-blue-100 text-blue-800'>
            <ArrowUp className='w-3 h-3 mr-1' />
            {status}
          </Badge>
        );
      case 'Completed':
        return (
          <Badge variant='default' className='bg-green-100 text-green-800'>
            <CheckCircle className='w-3 h-3 mr-1' />
            {status}
          </Badge>
        );
      default:
        return <Badge variant='outline'>{status}</Badge>;
    }
  };

  const getCategoryBadge = (category: string) => {
    return (
      <Badge
        variant={category === 'Inbound' ? 'secondary' : 'default'}
        className={
          category === 'Inbound'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-purple-100 text-purple-800'
        }
      >
        {category}
      </Badge>
    );
  };

  const getStats = (category?: 'Inbound' | 'Outbound') => {
    const filteredOrders = category
      ? orders.filter((order) => order.category === category)
      : orders;
    return {
      total: filteredOrders.length,
      pending: filteredOrders.filter((order) => order.status === 'Pending')
        .length,
      processing: filteredOrders.filter(
        (order) => order.status === 'Processing'
      ).length,
      completed: filteredOrders.filter((order) => order.status === 'Completed')
        .length,
    };
  };

  const allStats = getStats();
  const inboundStats = getStats('Inbound');
  const outboundStats = getStats('Outbound');

  // Component for rendering the detailed orders table
  const OrdersTable = ({
    filteredOrders,
    showCategory = false,
  }: {
    filteredOrders: InboundOutboundOrder[];
    showCategory?: boolean;
  }) => {
    const { totalPages, startIndex, paginatedOrders } =
      getPaginatedOrders(filteredOrders);

    return (
      <div className='space-y-4'>
        <div className='flex flex-col sm:flex-row gap-4'>
          <div className='flex-1'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
              <Input
                placeholder='Search by ID, Task, SKU, Partner...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-9'
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='All Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Status</SelectItem>
              <SelectItem value='Pending'>Pending</SelectItem>
              <SelectItem value='Processing'>Processing</SelectItem>
              <SelectItem value='Completed'>Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>STT</TableHead>
                {showCategory && <TableHead>Category</TableHead>}
                {/* <TableHead>Task ID</TableHead> */}
                <TableHead>SKU</TableHead>
                {/* <TableHead>Robot Code</TableHead> */}
                {/* <TableHead>Pickup Location</TableHead>
                <TableHead>Dropoff Location</TableHead> */}
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
                  {showCategory && (
                    <TableCell>{getCategoryBadge(order.category)}</TableCell>
                  )}
                  {/* <TableCell className="font-medium">{order.taskId}</TableCell> */}
                  <TableCell>{order.sku}</TableCell>
                  {/* <TableCell>{order.robotCode}</TableCell> */}
                  {/* <TableCell>{order.pickupLocation}</TableCell>
                  <TableCell>{order.dropoffLocation}</TableCell> */}
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{order.storeMethod}</TableCell>
                  <TableCell>{order.storeCode}</TableCell>
                  <TableCell>{order.packingMethod}</TableCell>
                  <TableCell>{order.packingCode}</TableCell>
                  <TableCell>{order.partner}</TableCell>
                  <TableCell>
                    <div className='flex gap-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => openEditForm(order)}
                      >
                        <Edit className='h-3 w-3' />
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handleDeleteOrder(order.id)}
                      >
                        <Trash2 className='h-3 w-3' />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className='flex items-center justify-between space-x-2 py-4'>
          <div className='text-sm text-muted-foreground'>
            Showing {startIndex + 1} to{' '}
            {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of{' '}
            {filteredOrders.length} entries
          </div>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              );
            })}
            {totalPages > 5 && <span className='px-2'>...</span>}
            {totalPages > 5 && (
              <Button
                variant={currentPage === totalPages ? 'default' : 'outline'}
                size='sm'
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </Button>
            )}
            <Button
              variant='outline'
              size='sm'
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // Reset pagination when changing tabs
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  return (
    <div className='space-y-6'>
      {/* Summary Cards */}
      {/* <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium'>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{allStats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium'>Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-yellow-600'>
              {allStats.pending}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium'>Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-blue-600'>
              {allStats.processing}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium'>Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-green-600'>
              {allStats.completed}
            </div>
          </CardContent>
        </Card>
      </div> */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className='w-full'
      >
        <TabsList className='grid w-full grid-cols-3 bg-muted/50'>
          <TabsTrigger
            value='inbound'
            className='data-[state=active]:bg-warehouse-primary data-[state=active]:text-white'
          >
            <ArrowDown className='h-4 w-4 mr-2' />
            {t('inbound')}
          </TabsTrigger>
          <TabsTrigger
            value='outbound'
            className='data-[state=active]:bg-warehouse-primary data-[state=active]:text-white'
          >
            <ArrowUp className='h-4 w-4 mr-2' />
            {t('outbound')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value='inbound' className='mt-6'>
          <InboundTable />
        </TabsContent>

        <TabsContent value='outbound' className='mt-6'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <ArrowUp className='h-5 w-5' />
                {t('outbound_shipments')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <OrdersTable filteredOrders={outboundOrdersFiltered} />
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
