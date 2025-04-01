
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    { id: "IN-291", supplier: "Tech Supplies Inc.", items: 24, status: "Pending", date: "2023-05-15T10:30:00" },
    { id: "IN-290", supplier: "Office Solutions", items: 12, status: "Processing", date: "2023-05-14T14:45:00" },
    { id: "IN-289", supplier: "Global Parts Ltd.", items: 36, status: "Completed", date: "2023-05-13T09:15:00" },
    { id: "IN-288", supplier: "Industrial Equipment Co.", items: 8, status: "Completed", date: "2023-05-12T15:20:00" },
    { id: "IN-287", supplier: "Tech Warehouse", items: 19, status: "Processing", date: "2023-05-12T11:10:00" },
    { id: "IN-286", supplier: "Smart Solutions", items: 42, status: "Pending", date: "2023-05-11T09:30:00" },
    { id: "IN-285", supplier: "Factory Direct", items: 15, status: "Completed", date: "2023-05-10T14:45:00" },
    { id: "IN-284", supplier: "Distribution Central", items: 28, status: "Processing", date: "2023-05-09T16:20:00" },
    { id: "IN-283", supplier: "Supply Chain Inc.", items: 13, status: "Pending", date: "2023-05-09T10:15:00" },
    { id: "IN-282", supplier: "Bulk Goods Ltd.", items: 31, status: "Completed", date: "2023-05-08T13:40:00" },
    { id: "IN-281", supplier: "Quick Ship Co.", items: 7, status: "Processing", date: "2023-05-07T11:25:00" },
    { id: "IN-280", supplier: "Global Imports", items: 22, status: "Completed", date: "2023-05-06T15:10:00" },
    { id: "IN-279", supplier: "Direct Supply", items: 16, status: "Pending", date: "2023-05-05T09:45:00" },
    { id: "IN-278", supplier: "Central Depot", items: 29, status: "Processing", date: "2023-05-04T14:30:00" },
    { id: "IN-277", supplier: "Quality Parts Inc.", items: 11, status: "Completed", date: "2023-05-03T10:20:00" },
    { id: "IN-276", supplier: "Wholesale Direct", items: 34, status: "Processing", date: "2023-05-02T16:15:00" },
    { id: "IN-275", supplier: "Component Supply Co.", items: 18, status: "Pending", date: "2023-05-01T11:05:00" },
    { id: "IN-274", supplier: "Rapid Logistics", items: 26, status: "Completed", date: "2023-04-30T13:50:00" },
    { id: "IN-273", supplier: "Premium Materials", items: 9, status: "Processing", date: "2023-04-29T09:30:00" },
    { id: "IN-272", supplier: "Tech Components", items: 21, status: "Completed", date: "2023-04-28T14:20:00" },
    { id: "IN-271", supplier: "Industrial Supply Co.", items: 14, status: "Pending", date: "2023-04-27T10:15:00" },
    { id: "IN-270", supplier: "Warehouse Supplies", items: 38, status: "Processing", date: "2023-04-26T15:40:00" }
  ];

  const outboundOrders = [
    { id: "OUT-187", customer: "City Electronics", items: 8, status: "Completed", date: "2023-05-15T16:20:00" },
    { id: "OUT-186", customer: "Retail Group", items: 15, status: "Processing", date: "2023-05-15T11:10:00" },
    { id: "OUT-185", customer: "Online Shop", items: 5, status: "Pending", date: "2023-05-14T12:30:00" },
    { id: "OUT-184", customer: "Department Store", items: 12, status: "Completed", date: "2023-05-13T15:45:00" },
    { id: "OUT-183", customer: "Office Depot", items: 20, status: "Processing", date: "2023-05-12T10:15:00" },
    { id: "OUT-182", customer: "Tech Mart", items: 7, status: "Pending", date: "2023-05-11T14:30:00" },
    { id: "OUT-181", customer: "Home Goods", items: 18, status: "Completed", date: "2023-05-10T09:20:00" },
    { id: "OUT-180", customer: "Furniture Plus", items: 4, status: "Processing", date: "2023-05-09T16:40:00" },
    { id: "OUT-179", customer: "Kitchen Supplies", items: 22, status: "Completed", date: "2023-05-08T13:10:00" },
    { id: "OUT-178", customer: "Electronic World", items: 9, status: "Pending", date: "2023-05-07T11:05:00" },
    { id: "OUT-177", customer: "Hardware Store", items: 14, status: "Processing", date: "2023-05-06T15:30:00" },
    { id: "OUT-176", customer: "Fashion Outlet", items: 32, status: "Completed", date: "2023-05-05T10:25:00" },
    { id: "OUT-175", customer: "Sports Gear", items: 17, status: "Pending", date: "2023-05-04T14:50:00" },
    { id: "OUT-174", customer: "Toy Kingdom", items: 25, status: "Processing", date: "2023-05-03T09:15:00" },
    { id: "OUT-173", customer: "BookStore Online", items: 11, status: "Completed", date: "2023-05-02T16:35:00" },
    { id: "OUT-172", customer: "Garden Center", items: 8, status: "Pending", date: "2023-05-01T11:40:00" },
    { id: "OUT-171", customer: "Auto Parts", items: 19, status: "Processing", date: "2023-04-30T13:20:00" },
    { id: "OUT-170", customer: "Beauty Supply", items: 13, status: "Completed", date: "2023-04-29T09:45:00" },
    { id: "OUT-169", customer: "Pet Shop", items: 6, status: "Pending", date: "2023-04-28T15:10:00" },
    { id: "OUT-168", customer: "Health Store", items: 21, status: "Processing", date: "2023-04-27T10:30:00" },
    { id: "OUT-167", customer: "Office Supply Co", items: 16, status: "Completed", date: "2023-04-26T14:15:00" },
    { id: "OUT-166", customer: "Discount Warehouse", items: 29, status: "Processing", date: "2023-04-25T11:50:00" }
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
              <button className="bg-warehouse-primary text-white px-4 py-2 rounded-md hover:bg-warehouse-dark transition-colors">
                {t('new_inbound_order')}
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left">{t('order_id')}</th>
                    <th className="px-4 py-2 text-left">{t('supplier')}</th>
                    <th className="px-4 py-2 text-left">{t('items')}</th>
                    <th className="px-4 py-2 text-left">{t('status')}</th>
                    <th className="px-4 py-2 text-left">{t('date')}</th>
                    <th className="px-4 py-2 text-left">{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order) => (
                    <tr key={order.id} className="border-b dark:border-gray-700">
                      <td className="px-4 py-3">{order.id}</td>
                      <td className="px-4 py-3">{order.supplier}</td>
                      <td className="px-4 py-3">{order.items}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-4 py-3">{new Date(order.date).toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <button className="text-blue-600 hover:text-blue-800 mr-2 dark:text-blue-400 dark:hover:text-blue-300">
                          {t('actions')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="outbound">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">{t('outbound_orders')}</h2>
              <button className="bg-warehouse-primary text-white px-4 py-2 rounded-md hover:bg-warehouse-dark transition-colors">
                {t('new_outbound_order')}
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left">{t('order_id')}</th>
                    <th className="px-4 py-2 text-left">{t('customer')}</th>
                    <th className="px-4 py-2 text-left">{t('items')}</th>
                    <th className="px-4 py-2 text-left">{t('status')}</th>
                    <th className="px-4 py-2 text-left">{t('date')}</th>
                    <th className="px-4 py-2 text-left">{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order) => (
                    <tr key={order.id} className="border-b dark:border-gray-700">
                      <td className="px-4 py-3">{order.id}</td>
                      <td className="px-4 py-3">{order.customer}</td>
                      <td className="px-4 py-3">{order.items}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-4 py-3">{new Date(order.date).toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <button className="text-blue-600 hover:text-blue-800 mr-2 dark:text-blue-400 dark:hover:text-blue-300">
                          {t('actions')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
