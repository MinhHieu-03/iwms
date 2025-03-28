
import React from "react";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Inventory Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Total Items</span>
            <span className="font-medium">1,245</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">In Stock</span>
            <span className="font-medium text-green-600">1,028</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Low Stock</span>
            <span className="font-medium text-yellow-600">187</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Out of Stock</span>
            <span className="font-medium text-red-600">30</span>
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Warehouse Utilization</h2>
        <div className="flex flex-col items-center">
          <div className="relative h-32 w-32 mb-4">
            <div className="h-32 w-32 rounded-full border-8 border-warehouse-primary/20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">76%</span>
            </div>
          </div>
          <div className="w-full space-y-2">
            <div className="flex justify-between text-sm">
              <span>Free space:</span>
              <span>24%</span>
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-green-500 pl-3">
            <p className="text-sm text-gray-500">Today, 10:23 AM</p>
            <p className="font-medium">Inbound order #IN-291 received</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-3">
            <p className="text-sm text-gray-500">Today, 09:45 AM</p>
            <p className="font-medium">Robot #3 completed mission #M-082</p>
          </div>
          <div className="border-l-4 border-orange-500 pl-3">
            <p className="text-sm text-gray-500">Yesterday, 04:12 PM</p>
            <p className="font-medium">Outbound order #OUT-187 shipped</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
