
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatusBadge from "@/components/StatusBadge";

const InboundOutbound = () => {
  const [currentTab, setCurrentTab] = useState("inbound");

  const inboundOrders = [
    { id: "IN-291", supplier: "Tech Supplies Inc.", items: 24, status: "Pending", date: "2023-05-15T10:30:00" },
    { id: "IN-290", supplier: "Office Solutions", items: 12, status: "Processing", date: "2023-05-14T14:45:00" },
    { id: "IN-289", supplier: "Global Parts Ltd.", items: 36, status: "Completed", date: "2023-05-13T09:15:00" },
  ];

  const outboundOrders = [
    { id: "OUT-187", customer: "City Electronics", items: 8, status: "Completed", date: "2023-05-15T16:20:00" },
    { id: "OUT-186", customer: "Retail Group", items: 15, status: "Processing", date: "2023-05-15T11:10:00" },
    { id: "OUT-185", customer: "Online Shop", items: 5, status: "Pending", date: "2023-05-14T12:30:00" },
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="inbound" onValueChange={(value) => setCurrentTab(value)}>
        <TabsList className="mb-4">
          <TabsTrigger value="inbound">Inbound</TabsTrigger>
          <TabsTrigger value="outbound">Outbound</TabsTrigger>
        </TabsList>
        
        <TabsContent value="inbound">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Inbound Orders</h2>
              <button className="bg-warehouse-primary text-white px-4 py-2 rounded-md hover:bg-warehouse-dark transition-colors">
                New Inbound Order
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Order ID</th>
                    <th className="px-4 py-2 text-left">Supplier</th>
                    <th className="px-4 py-2 text-left">Items</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inboundOrders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="px-4 py-3">{order.id}</td>
                      <td className="px-4 py-3">{order.supplier}</td>
                      <td className="px-4 py-3">{order.items}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-4 py-3">{new Date(order.date).toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <button className="text-blue-600 hover:text-blue-800 mr-2">
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          Edit
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
              <h2 className="text-xl font-semibold">Outbound Orders</h2>
              <button className="bg-warehouse-primary text-white px-4 py-2 rounded-md hover:bg-warehouse-dark transition-colors">
                New Outbound Order
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Order ID</th>
                    <th className="px-4 py-2 text-left">Customer</th>
                    <th className="px-4 py-2 text-left">Items</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {outboundOrders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="px-4 py-3">{order.id}</td>
                      <td className="px-4 py-3">{order.customer}</td>
                      <td className="px-4 py-3">{order.items}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-4 py-3">{new Date(order.date).toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <button className="text-blue-600 hover:text-blue-800 mr-2">
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          Edit
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
    </div>
  );
};

export default InboundOutbound;
