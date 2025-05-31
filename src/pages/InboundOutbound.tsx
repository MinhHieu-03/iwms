
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusBadge from "@/components/StatusBadge";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

const InboundOutbound = () => {
  const [currentTab, setCurrentTab] = useState("inbound");
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useLanguage();
  
  const itemsPerPage = 10;

  const inboundOrders = [
    { 
      id: "IN-291", 
      taskId: "TSK-001", 
      robotCode: "R001", 
      pickupLocation: "A-01-01", 
      dropoffLocation: "B-02-03", 
      status: "Pending", 
      missionId: "M001", 
      partner: "Tech Supplies Inc.", 
      category: "Electronics", 
      registrationTime: "2023-05-15T10:30:00" 
    },
    { 
      id: "IN-290", 
      taskId: "TSK-002", 
      robotCode: "R002", 
      pickupLocation: "A-02-01", 
      dropoffLocation: "C-01-02", 
      status: "Processing", 
      missionId: "M002", 
      partner: "Office Solutions", 
      category: "Office Supplies", 
      registrationTime: "2023-05-14T14:45:00" 
    },
    { 
      id: "IN-289", 
      taskId: "TSK-003", 
      robotCode: "R003", 
      pickupLocation: "B-01-01", 
      dropoffLocation: "A-03-01", 
      status: "Completed", 
      missionId: "M003", 
      partner: "Global Parts Ltd.", 
      category: "Industrial", 
      registrationTime: "2023-05-13T09:15:00" 
    },
    { 
      id: "IN-288", 
      taskId: "TSK-004", 
      robotCode: "R001", 
      pickupLocation: "C-01-01", 
      dropoffLocation: "B-01-02", 
      status: "Completed", 
      missionId: "M004", 
      partner: "Industrial Equipment Co.", 
      category: "Machinery", 
      registrationTime: "2023-05-12T15:20:00" 
    },
    { 
      id: "IN-287", 
      taskId: "TSK-005", 
      robotCode: "R002", 
      pickupLocation: "A-01-02", 
      dropoffLocation: "C-02-01", 
      status: "Processing", 
      missionId: "M005", 
      partner: "Tech Warehouse", 
      category: "Electronics", 
      registrationTime: "2023-05-12T11:10:00" 
    },
    { 
      id: "IN-286", 
      taskId: "TSK-006", 
      robotCode: "R003", 
      pickupLocation: "B-02-01", 
      dropoffLocation: "A-02-02", 
      status: "Pending", 
      missionId: "M006", 
      partner: "Smart Solutions", 
      category: "Smart Devices", 
      registrationTime: "2023-05-11T09:30:00" 
    },
    { 
      id: "IN-285", 
      taskId: "TSK-007", 
      robotCode: "R001", 
      pickupLocation: "C-02-02", 
      dropoffLocation: "B-03-01", 
      status: "Completed", 
      missionId: "M007", 
      partner: "Factory Direct", 
      category: "Manufacturing", 
      registrationTime: "2023-05-10T14:45:00" 
    },
    { 
      id: "IN-284", 
      taskId: "TSK-008", 
      robotCode: "R002", 
      pickupLocation: "A-03-02", 
      dropoffLocation: "C-01-03", 
      status: "Processing", 
      missionId: "M008", 
      partner: "Distribution Central", 
      category: "Logistics", 
      registrationTime: "2023-05-09T16:20:00" 
    },
    { 
      id: "IN-283", 
      taskId: "TSK-009", 
      robotCode: "R003", 
      pickupLocation: "B-01-03", 
      dropoffLocation: "A-01-03", 
      status: "Pending", 
      missionId: "M009", 
      partner: "Supply Chain Inc.", 
      category: "Supply Chain", 
      registrationTime: "2023-05-09T10:15:00" 
    },
    { 
      id: "IN-282", 
      taskId: "TSK-010", 
      robotCode: "R001", 
      pickupLocation: "C-03-01", 
      dropoffLocation: "B-02-02", 
      status: "Completed", 
      missionId: "M010", 
      partner: "Bulk Goods Ltd.", 
      category: "Bulk Items", 
      registrationTime: "2023-05-08T13:40:00" 
    }
  ];

  const outboundOrders = [
    { 
      id: "OUT-187", 
      taskId: "TSK-101", 
      robotCode: "R004", 
      pickupLocation: "B-01-01", 
      dropoffLocation: "DOCK-A", 
      status: "Completed", 
      missionId: "M101", 
      partner: "City Electronics", 
      category: "Electronics", 
      registrationTime: "2023-05-15T16:20:00" 
    },
    { 
      id: "OUT-186", 
      taskId: "TSK-102", 
      robotCode: "R005", 
      pickupLocation: "A-02-01", 
      dropoffLocation: "DOCK-B", 
      status: "Processing", 
      missionId: "M102", 
      partner: "Retail Group", 
      category: "Retail", 
      registrationTime: "2023-05-15T11:10:00" 
    },
    { 
      id: "OUT-185", 
      taskId: "TSK-103", 
      robotCode: "R006", 
      pickupLocation: "C-01-02", 
      dropoffLocation: "DOCK-C", 
      status: "Pending", 
      missionId: "M103", 
      partner: "Online Shop", 
      category: "E-commerce", 
      registrationTime: "2023-05-14T12:30:00" 
    },
    { 
      id: "OUT-184", 
      taskId: "TSK-104", 
      robotCode: "R004", 
      pickupLocation: "B-03-01", 
      dropoffLocation: "DOCK-A", 
      status: "Completed", 
      missionId: "M104", 
      partner: "Department Store", 
      category: "Retail", 
      registrationTime: "2023-05-13T15:45:00" 
    },
    { 
      id: "OUT-183", 
      taskId: "TSK-105", 
      robotCode: "R005", 
      pickupLocation: "A-01-03", 
      dropoffLocation: "DOCK-B", 
      status: "Processing", 
      missionId: "M105", 
      partner: "Office Depot", 
      category: "Office Supplies", 
      registrationTime: "2023-05-12T10:15:00" 
    },
    { 
      id: "OUT-182", 
      taskId: "TSK-106", 
      robotCode: "R006", 
      pickupLocation: "C-02-01", 
      dropoffLocation: "DOCK-C", 
      status: "Pending", 
      missionId: "M106", 
      partner: "Tech Mart", 
      category: "Electronics", 
      registrationTime: "2023-05-11T14:30:00" 
    },
    { 
      id: "OUT-181", 
      taskId: "TSK-107", 
      robotCode: "R004", 
      pickupLocation: "B-02-03", 
      dropoffLocation: "DOCK-A", 
      status: "Completed", 
      missionId: "M107", 
      partner: "Home Goods", 
      category: "Home & Garden", 
      registrationTime: "2023-05-10T09:20:00" 
    },
    { 
      id: "OUT-180", 
      taskId: "TSK-108", 
      robotCode: "R005", 
      pickupLocation: "A-03-01", 
      dropoffLocation: "DOCK-B", 
      status: "Processing", 
      missionId: "M108", 
      partner: "Furniture Plus", 
      category: "Furniture", 
      registrationTime: "2023-05-09T16:40:00" 
    },
    { 
      id: "OUT-179", 
      taskId: "TSK-109", 
      robotCode: "R006", 
      pickupLocation: "C-01-03", 
      dropoffLocation: "DOCK-C", 
      status: "Completed", 
      missionId: "M109", 
      partner: "Kitchen Supplies", 
      category: "Kitchen", 
      registrationTime: "2023-05-08T13:10:00" 
    },
    { 
      id: "OUT-178", 
      taskId: "TSK-110", 
      robotCode: "R004", 
      pickupLocation: "B-01-02", 
      dropoffLocation: "DOCK-A", 
      status: "Pending", 
      missionId: "M110", 
      partner: "Electronic World", 
      category: "Electronics", 
      registrationTime: "2023-05-07T11:05:00" 
    }
  ];

  // Get current orders based on page and tab
  const currentOrders = currentTab === "inbound" 
    ? inboundOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : outboundOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Calculate total pages
  const totalPages = Math.ceil((currentTab === "inbound" ? inboundOrders.length : outboundOrders.length) / itemsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
      <Tabs defaultValue="inbound" onValueChange={(value) => {
        setCurrentTab(value);
        setCurrentPage(1);  // Reset to page 1 when changing tabs
      }}>
        <TabsList className="mb-4">
          <TabsTrigger value="inbound">{t('inbound')}</TabsTrigger>
          <TabsTrigger value="outbound">{t('outbound')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="inbound">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">{t('inbound_orders')}</h2>
              <div className="flex gap-2">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  {t('inbound')}
                </Button>
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  {t('outbound')}
                </Button>
              </div>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>STT</TableHead>
                  <TableHead>Task ID</TableHead>
                  <TableHead>Robot Code</TableHead>
                  <TableHead>Pickup Location</TableHead>
                  <TableHead>Dropoff Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Mission ID</TableHead>
                  <TableHead>Partner</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Registration Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentOrders.map((order, index) => (
                  <TableRow key={order.id}>
                    <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                    <TableCell className="font-medium">{order.taskId}</TableCell>
                    <TableCell>{order.robotCode}</TableCell>
                    <TableCell>{order.pickupLocation}</TableCell>
                    <TableCell>{order.dropoffLocation}</TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell>{order.missionId}</TableCell>
                    <TableCell>{order.partner}</TableCell>
                    <TableCell>{order.category}</TableCell>
                    <TableCell>{new Date(order.registrationTime).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
        
        <TabsContent value="outbound">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">{t('outbound_orders')}</h2>
              <div className="flex gap-2">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  {t('inbound')}
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  {t('outbound')}
                </Button>
              </div>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>STT</TableHead>
                  <TableHead>Task ID</TableHead>
                  <TableHead>Robot Code</TableHead>
                  <TableHead>Pickup Location</TableHead>
                  <TableHead>Dropoff Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Mission ID</TableHead>
                  <TableHead>Partner</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Registration Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentOrders.map((order, index) => (
                  <TableRow key={order.id}>
                    <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                    <TableCell className="font-medium">{order.taskId}</TableCell>
                    <TableCell>{order.robotCode}</TableCell>
                    <TableCell>{order.pickupLocation}</TableCell>
                    <TableCell>{order.dropoffLocation}</TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell>{order.missionId}</TableCell>
                    <TableCell>{order.partner}</TableCell>
                    <TableCell>{order.category}</TableCell>
                    <TableCell>{new Date(order.registrationTime).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>

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
    </div>
  );
};

export default InboundOutbound;
